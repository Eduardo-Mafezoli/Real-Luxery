"use client";

import { use, useState } from "react";
import Link from "next/link";
import { useForm, type Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  ArrowLeft,
  WarningCircle,
  CheckCircle,
  Eye,
  EyeSlash,
} from "@phosphor-icons/react";
import { usePost, usePosts } from "@/app/hooks";
import { notFound } from "next/navigation";

const blogSchema = z.object({
  titulo: z.string().min(5, "Título deve ter no mínimo 5 caracteres"),
  slug: z
    .string()
    .min(3, "Slug obrigatório")
    .regex(
      /^[a-z0-9-]+$/,
      "Slug deve conter apenas letras minúsculas, números e hífens",
    ),
  resumo: z
    .string()
    .min(10, "Resumo deve ter no mínimo 10 caracteres")
    .max(200, "Resumo muito longo"),
  conteudo: z.string().min(50, "Conteúdo deve ter no mínimo 50 caracteres"),
  categoria: z.string().min(1, "Categoria obrigatória"),
  publicado: z.boolean(),
});

type BlogSchema = z.infer<typeof blogSchema>;

type Props = {
  params: Promise<{ id: string }>;
};

export default function EditBlogPage({ params }: Props) {
  const { id } = use(params);
  const { post, loading } = usePost(id);
  const { categorias } = usePosts();
  const [saved, setSaved] = useState(false);
  const [publicado, setPublicado] = useState(true);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<BlogSchema>({
    resolver: zodResolver(blogSchema) as Resolver<BlogSchema>,
    defaultValues: {
      titulo: post?.titulo ?? "",
      slug: post?.slug ?? "",
      resumo: post?.resumo ?? "",
      conteudo: post?.conteudo ?? "",
      categoria: post?.categoria ?? "",
      publicado: post?.publicado ?? true,
    },
  });

  const slugValue = watch("slug");
  const conteudoValue = watch("conteudo");

  const onSubmit = async (data: BlogSchema) => {
    // TODO: blogService.update(id, data)
    console.log(data);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-2 border-(--color-primaria) border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!post) notFound();

  return (
    <div className="flex flex-col gap-6">
      {/* HEADER */}
      <div className="flex items-center gap-4">
        <Link
          href="/admin/blog"
          className="flex items-center gap-2 text-xs tracking-[2px] uppercase text-[#888] hover:text-(--color-primaria) transition-colors"
        >
          <ArrowLeft size={14} />
          Blog
        </Link>
        <span className="text-[#ddd]">/</span>
        <span className="text-xs tracking-[2px] uppercase text-(--color-texto)">
          Editar post
        </span>
      </div>

      <div className="flex items-center justify-between">
        <h1 className="font-titulo text-3xl text-(--color-texto)">
          Editar <span className="text-(--color-primaria)">post</span>
        </h1>
        {saved && (
          <div className="flex items-center gap-2 text-green-600 bg-green-50 px-4 py-2 rounded-lg">
            <CheckCircle size={16} />
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
                Título
              </label>
              <input
                {...register("titulo")}
                type="text"
                className={`w-full px-4 py-3 border rounded text-sm outline-none transition-colors
                  ${errors.titulo ? "border-red-400" : "border-gray-200 focus:border-(--color-primaria)"}`}
              />
              {errors.titulo && (
                <div className="flex items-center gap-1.5 text-red-500">
                  <WarningCircle size={13} />
                  <span className="text-xs">{errors.titulo.message}</span>
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
                  URL: /blog/{slugValue}
                </span>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs tracking-[2px] uppercase text-(--color-texto) font-medium">
                Resumo{" "}
                <span className="text-[#aaa] normal-case tracking-normal">
                  — aparece na listagem
                </span>
              </label>
              <textarea
                {...register("resumo")}
                rows={3}
                className={`w-full px-4 py-3 border rounded text-sm outline-none transition-colors resize-none
                  ${errors.resumo ? "border-red-400" : "border-gray-200 focus:border-(--color-primaria)"}`}
              />
              {errors.resumo && (
                <div className="flex items-center gap-1.5 text-red-500">
                  <WarningCircle size={13} />
                  <span className="text-xs">{errors.resumo.message}</span>
                </div>
              )}
            </div>
          </div>

          {/* CONTEÚDO */}
          <div className="bg-white rounded-xl p-6 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h2 className="font-titulo text-lg text-(--color-texto)">
                Conteúdo
              </h2>
              <span className="font-corpo text-xs text-[#888]">
                {conteudoValue?.length ?? 0} caracteres
              </span>
            </div>
            <textarea
              {...register("conteudo")}
              rows={16}
              className={`w-full px-4 py-3 border rounded text-sm outline-none transition-colors resize-none
                ${errors.conteudo ? "border-red-400" : "border-gray-200 focus:border-(--color-primaria)"}`}
            />
            {errors.conteudo && (
              <div className="flex items-center gap-1.5 text-red-500">
                <WarningCircle size={13} />
                <span className="text-xs">{errors.conteudo.message}</span>
              </div>
            )}
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
                  {publicado ? "Publicado" : "Rascunho"}
                </span>
                <p className="font-corpo text-xs text-[#888] mt-0.5">
                  {publicado
                    ? "Visível no blog"
                    : "Oculto — não aparece no blog"}
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  {...register("publicado")}
                  checked={publicado}
                  onChange={(e) => setPublicado(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-10 h-5 bg-gray-200 rounded-full peer peer-checked:bg-(--color-primaria) peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all" />
              </label>
            </div>

            <button
              type="button"
              onClick={() => setPublicado(!publicado)}
              className={`w-full py-2.5 flex items-center justify-center gap-2 border text-xs tracking-[2px] uppercase transition-colors
                ${
                  publicado
                    ? "border-yellow-200 text-yellow-600 hover:bg-yellow-50"
                    : "border-green-200 text-green-600 hover:bg-green-50"
                }`}
            >
              {publicado ? (
                <>
                  <EyeSlash size={14} /> Despublicar
                </>
              ) : (
                <>
                  <Eye size={14} /> Publicar
                </>
              )}
            </button>

            <div className="flex flex-col gap-3 pt-2 border-t border-gray-100">
              <button
                type="submit"
                disabled={isSubmitting || !isDirty}
                className="w-full py-3 bg-(--color-primaria) text-white text-xs tracking-[2px] uppercase hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                {isSubmitting ? "Salvando..." : "Salvar alterações"}
              </button>
              <Link
                href="/admin/blog"
                className="w-full py-3 border border-gray-200 text-xs tracking-[2px] uppercase text-[#888] hover:border-gray-300 transition-colors text-center"
              >
                Cancelar
              </Link>
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
          </div>

          {/* ZONA DE PERIGO */}
          <div className="bg-white rounded-xl p-6 border-2 border-red-100">
            <h2 className="font-titulo text-lg text-red-500 mb-2">
              Zona de perigo
            </h2>
            <p className="font-corpo text-xs text-[#888] mb-4">
              Remover este post permanentemente. Esta ação não pode ser
              desfeita.
            </p>
            <button
              type="button"
              className="w-full py-2.5 border border-red-300 text-red-400 text-xs tracking-[2px] uppercase hover:bg-red-50 transition-colors"
            >
              Remover post
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
