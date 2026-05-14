"use client";

import { useState } from "react";
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
import { useProducts } from "@/app/hooks";
import { generateSlug } from "@/app/utils";

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

export default function NewProductPage() {
  const { categorias } = useProducts();
  const [caracteristicas, setCaracteristicas] = useState([
    { label: "", valor: "" },
  ]);
  const [slugPreview, setSlugPreview] = useState("");

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ProductSchema>({
    resolver: zodResolver(productSchema) as Resolver<ProductSchema>,
    defaultValues: {
      nome: "",
      slug: "",
      descricao: "",
      preco: "",
      categoria: "",
      badge: "",
      ativo: true,
      esgotado: false,
    },
  });

  const slugValue = watch("slug");

  const onSubmit = async (data: ProductSchema) => {
    // TODO: productService.create(data)
    console.log({ ...data, caracteristicas });
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
          Novo produto
        </span>
      </div>

      <h1 className="font-titulo text-3xl text-(--color-texto)">
        Novo <span className="text-(--color-primaria)">produto</span>
      </h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-3 gap-6"
      >
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
                placeholder="Ex: Vibrador Premium Silicone"
                onChange={(e) => {
                  register("nome").onChange(e);
                  const slug = generateSlug(e.target.value);
                  setValue("slug", slug);
                  setSlugPreview(slug);
                }}
                className={`w-full px-4 py-3 border rounded text-sm outline-none transition-colors ${errors.nome ? "border-red-400" : "border-gray-200 focus:border-(--color-primaria)"}`}
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
                placeholder="vibrador-premium-silicone"
                className={`w-full px-4 py-3 border rounded text-sm outline-none transition-colors font-mono ${errors.slug ? "border-red-400" : "border-gray-200 focus:border-(--color-primaria)"}`}
              />
              {errors.slug ? (
                <div className="flex items-center gap-1.5 text-red-500">
                  <WarningCircle size={13} />
                  <span className="text-xs">{errors.slug.message}</span>
                </div>
              ) : (
                <span className="font-corpo text-xs text-[#888]">
                  URL: /products/{slugValue || slugPreview || "slug-do-produto"}
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
                placeholder="Descreva o produto detalhadamente..."
                className={`w-full px-4 py-3 border rounded text-sm outline-none transition-colors resize-none ${errors.descricao ? "border-red-400" : "border-gray-200 focus:border-(--color-primaria)"}`}
              />
              {errors.descricao && (
                <div className="flex items-center gap-1.5 text-red-500">
                  <WarningCircle size={13} />
                  <span className="text-xs">{errors.descricao.message}</span>
                </div>
              )}
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 flex flex-col gap-4">
            <h2 className="font-titulo text-lg text-(--color-texto)">
              Imagens
            </h2>
            <div className="border-2 border-dashed border-gray-200 rounded-xl p-8 flex flex-col items-center gap-3 hover:border-(--color-primaria) transition-colors cursor-pointer">
              <UploadSimple size={28} className="text-[#aaa]" />
              <p className="text-sm text-[#888]">
                Clique ou arraste as imagens aqui
              </p>
              <p className="font-corpo text-xs text-[#aaa]">
                PNG, JPG até 5MB — máximo 6 imagens
              </p>
              <button
                type="button"
                className="px-4 py-2 border border-gray-200 text-xs tracking-[2px] uppercase text-[#888] hover:border-(--color-primaria) hover:text-(--color-primaria) transition-colors"
              >
                Selecionar arquivos
              </button>
            </div>
          </div>

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

        <div className="flex flex-col gap-6">
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
                disabled={isSubmitting}
                className="w-full py-3 bg-(--color-primaria) text-white text-xs tracking-[2px] uppercase hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                {isSubmitting ? "Salvando..." : "Publicar produto"}
              </button>
              <Link
                href="/admin/products"
                className="w-full py-3 border border-gray-200 text-xs tracking-[2px] uppercase text-[#888] hover:border-gray-300 transition-colors text-center"
              >
                Cancelar
              </Link>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 flex flex-col gap-4">
            <h2 className="font-titulo text-lg text-(--color-texto)">Preço</h2>
            <div className="flex flex-col gap-2">
              <label className="text-xs tracking-[2px] uppercase text-(--color-texto) font-medium">
                Preço (R$)
              </label>
              <input
                {...register("preco")}
                type="text"
                placeholder="0,00"
                className={`w-full px-4 py-3 border rounded text-sm outline-none transition-colors ${errors.preco ? "border-red-400" : "border-gray-200 focus:border-(--color-primaria)"}`}
              />
              {errors.preco && (
                <div className="flex items-center gap-1.5 text-red-500">
                  <WarningCircle size={13} />
                  <span className="text-xs">{errors.preco.message}</span>
                </div>
              )}
            </div>
          </div>

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
                className={`w-full px-4 py-3 border rounded text-sm outline-none transition-colors ${errors.categoria ? "border-red-400" : "border-gray-200 focus:border-(--color-primaria)"}`}
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
        </div>
      </form>
    </div>
  );
}
