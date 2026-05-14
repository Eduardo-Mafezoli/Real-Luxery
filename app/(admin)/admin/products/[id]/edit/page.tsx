"use client";

import { use, useState } from "react";
import Link from "next/link";
import { useForm, type Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  ArrowLeft,
  UploadSimple,
  Plus,
  Trash,
  WarningCircle,
} from "@phosphor-icons/react";
import { produtos, categorias } from "@/app/data/products";
import { notFound } from "next/navigation";

const productSchema = z.object({
  nome: z.string().min(3, "Nome deve ter no mínimo 3 caracteres"),
  slug: z
    .string()
    .min(3, "Slug obrigatório")
    .regex(
      /^[a-z0-9-]+$/,
      "Slug deve conter apenas letras minúsculas, números e hífens",
    ),
  descricao: z.string().min(10, "Descrição deve ter no mínimo 10 caracteres"),
  preco: z
    .string()
    .min(1, "Preço obrigatório")
    .regex(/^\d+([.,]\d{1,2})?$/, "Preço inválido"),
  categoria: z.string().min(1, "Categoria obrigatória"),
  badge: z.string().optional(),
  ativo: z.boolean(),
  esgotado: z.boolean(),
});

type ProductSchema = z.infer<typeof productSchema>;

type Props = {
  params: Promise<{ id: string }>;
};

export default function EditProductPage({ params }: Props) {
  const { id } = use(params);
  const produto = produtos.find((p) => p.slug === id);

  if (!produto) notFound();

  const [caracteristicas, setCaracteristicas] = useState(
    produto.caracteristicas ?? [{ label: "", valor: "" }],
  );
  const [saved, setSaved] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<ProductSchema>({
    resolver: zodResolver(productSchema) as Resolver<ProductSchema>,
    defaultValues: {
      nome: produto.nome,
      slug: produto.slug,
      descricao: produto.descricao,
      preco: produto.preco.toFixed(2).replace(".", ","),
      categoria: produto.categoria,
      badge: produto.badge ?? "",
      ativo: true,
      esgotado: false,
    },
  });

  const slugValue = watch("slug");

  const onSubmit = async (data: ProductSchema) => {
    console.log({ ...data, caracteristicas });
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const addCaracteristica = () =>
    setCaracteristicas([...caracteristicas, { label: "", valor: "" }]);

  const removeCaracteristica = (index: number) =>
    setCaracteristicas(caracteristicas.filter((_, i) => i !== index));

  const updateCaracteristica = (
    index: number,
    field: "label" | "valor",
    value: string,
  ) => {
    const updated = [...caracteristicas];
    updated[index][field] = value;
    setCaracteristicas(updated);
  };

  return (
    <div className="flex flex-col gap-6">
      {/* HEADER */}
      <div className="flex items-center gap-4">
        <Link
          href="/admin/products"
          className="flex items-center gap-2 text-xs tracking-[2px] uppercase text-[#888] hover:text-(--color-primaria) transition-colors"
        >
          <ArrowLeft size={14} />
          Produtos
        </Link>
        <span className="text-[#ddd]">/</span>
        <span className="text-xs tracking-[2px] uppercase text-(--color-texto)">
          Editar produto
        </span>
      </div>

      <div className="flex items-center justify-between">
        <h1 className="font-titulo text-3xl text-(--color-texto)">
          Editar <span className="text-(--color-primaria)">{produto.nome}</span>
        </h1>
        {saved && (
          <div className="flex items-center gap-2 text-green-600 bg-green-50 px-4 py-2 rounded-lg">
            <span className="text-xs">Salvo com sucesso</span>
          </div>
        )}
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-3 gap-6"
      >
        {/* COLUNA PRINCIPAL */}
        <div className="col-span-2 flex flex-col gap-6">
          <div className="bg-white rounded-xl p-6 flex flex-col gap-5">
            <h2 className="font-titulo text-lg text-(--color-texto)">
              Informações básicas
            </h2>

            <div className="flex flex-col gap-2">
              <label className="text-xs tracking-[2px] uppercase text-(--color-texto) font-medium">
                Nome do produto
              </label>
              <input
                {...register("nome")}
                type="text"
                className={`w-full px-4 py-3 border rounded text-sm outline-none transition-colors
                  ${errors.nome ? "border-red-400" : "border-gray-200 focus:border-(--color-primaria)"}`}
              />
              {errors.nome && (
                <div className="flex items-center gap-1.5 text-red-500">
                  <WarningCircle size={13} />
                  <span className="text-xs">{errors.nome.message}</span>
                </div>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs tracking-[2px] uppercase text-(--color-texto) font-medium">
                Slug (URL)
              </label>
              <input
                {...register("slug")}
                type="text"
                className={`w-full px-4 py-3 border rounded text-sm outline-none transition-colors font-mono
                  ${errors.slug ? "border-red-400" : "border-gray-200 focus:border-(--color-primaria)"}`}
              />
              {errors.slug ? (
                <div className="flex items-center gap-1.5 text-red-500">
                  <WarningCircle size={13} />
                  <span className="text-xs">{errors.slug.message}</span>
                </div>
              ) : (
                <span className="font-corpo text-xs text-[#888]">
                  URL: /products/{slugValue}
                </span>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs tracking-[2px] uppercase text-(--color-texto) font-medium">
                Descrição
              </label>
              <textarea
                {...register("descricao")}
                rows={4}
                className={`w-full px-4 py-3 border rounded text-sm outline-none transition-colors resize-none
                  ${errors.descricao ? "border-red-400" : "border-gray-200 focus:border-(--color-primaria)"}`}
              />
              {errors.descricao && (
                <div className="flex items-center gap-1.5 text-red-500">
                  <WarningCircle size={13} />
                  <span className="text-xs">{errors.descricao.message}</span>
                </div>
              )}
            </div>
          </div>

          {/* IMAGENS */}
          <div className="bg-white rounded-xl p-6 flex flex-col gap-4">
            <h2 className="font-titulo text-lg text-(--color-texto)">
              Imagens
            </h2>
            <div className="grid grid-cols-4 gap-3 mb-3">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="relative aspect-square bg-gradient-to-br from-[#fdf0f1] to-[#f0d0d3] rounded-lg group cursor-pointer"
                >
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 rounded-lg transition-colors flex items-center justify-center">
                    <Trash
                      size={16}
                      className="text-white opacity-0 group-hover:opacity-100 transition-opacity"
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="border-2 border-dashed border-gray-200 rounded-xl p-6 flex flex-col items-center gap-2 hover:border-(--color-primaria) transition-colors cursor-pointer">
              <UploadSimple size={22} className="text-[#aaa]" />
              <p className="font-corpo text-xs text-[#aaa]">
                Adicionar mais imagens
              </p>
            </div>
          </div>

          {/* CARACTERÍSTICAS */}
          <div className="bg-white rounded-xl p-6 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h2 className="font-titulo text-lg text-(--color-texto)">
                Características técnicas
              </h2>
              <button
                type="button"
                onClick={addCaracteristica}
                className="flex items-center gap-1.5 text-xs tracking-[2px] uppercase text-(--color-primaria) hover:opacity-70 transition-opacity"
              >
                <Plus size={12} />
                Adicionar
              </button>
            </div>
            <div className="flex flex-col gap-3">
              {caracteristicas.map((c, i) => (
                <div key={i} className="flex gap-3 items-center">
                  <input
                    type="text"
                    placeholder="Ex: Material"
                    value={c.label}
                    onChange={(e) =>
                      updateCaracteristica(i, "label", e.target.value)
                    }
                    className="flex-1 px-4 py-2.5 border border-gray-200 rounded text-sm outline-none focus:border-(--color-primaria) transition-colors"
                  />
                  <input
                    type="text"
                    placeholder="Ex: Silicone médico"
                    value={c.valor}
                    onChange={(e) =>
                      updateCaracteristica(i, "valor", e.target.value)
                    }
                    className="flex-1 px-4 py-2.5 border border-gray-200 rounded text-sm outline-none focus:border-(--color-primaria) transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => removeCaracteristica(i)}
                    className="p-2 text-[#aaa] hover:text-red-400 transition-colors"
                  >
                    <Trash size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* COLUNA LATERAL */}
        <div className="flex flex-col gap-6">
          {/* PUBLICAÇÃO */}
          <div className="bg-white rounded-xl p-6 flex flex-col gap-4">
            <h2 className="font-titulo text-lg text-(--color-texto)">
              Publicação
            </h2>

            <div className="flex items-center justify-between">
              <div>
                <span className="text-sm text-(--color-texto)">
                  Produto ativo
                </span>
                <p className="font-corpo text-xs text-[#888] mt-0.5">
                  Visível no catálogo
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  {...register("ativo")}
                  className="sr-only peer"
                  defaultChecked
                />
                <div className="w-10 h-5 bg-gray-200 rounded-full peer peer-checked:bg-(--color-primaria) peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all" />
              </label>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-gray-100">
              <div>
                <span className="text-sm text-(--color-texto)">Esgotado</span>
                <p className="font-corpo text-xs text-[#888] mt-0.5">
                  Aparece mas não pode ser comprado
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  {...register("esgotado")}
                  className="sr-only peer"
                />
                <div className="w-10 h-5 bg-gray-200 rounded-full peer peer-checked:bg-yellow-400 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all" />
              </label>
            </div>

            <div className="flex flex-col gap-3 pt-3 border-t border-gray-100">
              <button
                type="submit"
                disabled={isSubmitting || !isDirty}
                className="w-full py-3 bg-(--color-primaria) text-white text-xs tracking-[2px] uppercase hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                {isSubmitting ? "Salvando..." : "Salvar alterações"}
              </button>
              <Link
                href="/admin/products"
                className="w-full py-3 border border-gray-200 text-xs tracking-[2px] uppercase text-[#888] hover:border-gray-300 transition-colors text-center"
              >
                Cancelar
              </Link>
            </div>
          </div>

          {/* PREÇO */}
          <div className="bg-white rounded-xl p-6 flex flex-col gap-4">
            <h2 className="font-titulo text-lg text-(--color-texto)">Preço</h2>
            <div className="flex flex-col gap-2">
              <label className="text-xs tracking-[2px] uppercase text-(--color-texto) font-medium">
                Preço (R$)
              </label>
              <input
                {...register("preco")}
                type="text"
                className={`w-full px-4 py-3 border rounded text-sm outline-none transition-colors
                  ${errors.preco ? "border-red-400" : "border-gray-200 focus:border-(--color-primaria)"}`}
              />
              {errors.preco && (
                <div className="flex items-center gap-1.5 text-red-500">
                  <WarningCircle size={13} />
                  <span className="text-xs">{errors.preco.message}</span>
                </div>
              )}
            </div>
          </div>

          {/* ORGANIZAÇÃO */}
          <div className="bg-white rounded-xl p-6 flex flex-col gap-4">
            <h2 className="font-titulo text-lg text-(--color-texto)">
              Organização
            </h2>
            <div className="flex flex-col gap-2">
              <label className="text-xs tracking-[2px] uppercase text-(--color-texto) font-medium">
                Categoria
              </label>
              <select
                {...register("categoria")}
                className={`w-full px-4 py-3 border rounded text-sm outline-none transition-colors
                  ${errors.categoria ? "border-red-400" : "border-gray-200 focus:border-(--color-primaria)"}`}
              >
                <option value="">Selecionar categoria</option>
                {categorias.map((c) => (
                  <option key={c.slug} value={c.slug}>
                    {c.label}
                  </option>
                ))}
              </select>
              {errors.categoria && (
                <div className="flex items-center gap-1.5 text-red-500">
                  <WarningCircle size={13} />
                  <span className="text-xs">{errors.categoria.message}</span>
                </div>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs tracking-[2px] uppercase text-(--color-texto) font-medium">
                Badge (opcional)
              </label>
              <select
                {...register("badge")}
                className="w-full px-4 py-3 border border-gray-200 rounded text-sm outline-none focus:border-(--color-primaria) transition-colors"
              >
                <option value="">Nenhum</option>
                <option value="Novo">Novo</option>
                <option value="Exclusivo">Exclusivo</option>
                <option value="15% OFF">15% OFF</option>
              </select>
            </div>
          </div>

          {/* ZONA DE PERIGO */}
          <div className="bg-white rounded-xl p-6 border-2 border-red-100">
            <h2 className="font-titulo text-lg text-red-500 mb-2">
              Zona de perigo
            </h2>
            <p className="font-corpo text-xs text-[#888] mb-4">
              Remover este produto permanentemente. Esta ação não pode ser
              desfeita.
            </p>
            <button
              type="button"
              className="w-full py-2.5 border border-red-300 text-red-400 text-xs tracking-[2px] uppercase hover:bg-red-50 transition-colors"
            >
              Remover produto
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
