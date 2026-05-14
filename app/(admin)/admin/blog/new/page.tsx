"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm, type Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowLeft, WarningCircle } from "@phosphor-icons/react";
import { categoriasBlog } from "@/app/data/blog";

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

const generateSlug = (name: string) =>
  name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");

export default function NewBlogPage() {
  const [slugPreview, setSlugPreview] = useState("");

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<BlogSchema>({
    resolver: zodResolver(blogSchema) as Resolver<BlogSchema>,
    defaultValues: {
      titulo: "",
      slug: "",
      resumo: "",
      conteudo: "",
      categoria: "",
      publicado: true,
    },
  });

  const slugValue = watch("slug");
  const conteudoValue = watch("conteudo");

  const onSubmit = async (data: BlogSchema) => {
    console.log(data);
  };

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
          Novo post
        </span>
      </div>

      <h1 className="font-titulo text-3xl text-(--color-texto)">
        Novo <span className="text-(--color-primaria)">post</span>
      </h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-3 gap-6"
      >
        {/* COLUNA PRINCIPAL */}
        <div className="col-span-2 flex flex-col gap-6">
          {/* INFORMAÇÕES BÁSICAS */}
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
                placeholder="Ex: 5 dicas para uma vida sexual mais saudável"
                onChange={(e) => {
                  register("titulo").onChange(e);
                  const slug = generateSlug(e.target.value);
                  setValue("slug", slug);
                  setSlugPreview(slug);
                }}
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
                placeholder="5-dicas-vida-sexual"
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
                  URL: /blog/{slugValue || slugPreview || "slug-do-post"}
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
                placeholder="Breve descrição do post que aparece nos cards..."
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
              placeholder="Escreva o conteúdo completo do post aqui..."
              className={`w-full px-4 py-3 border rounded text-sm outline-none transition-colors resize-none
                ${errors.conteudo ? "border-red-400" : "border-gray-200 focus:border-(--color-primaria)"}`}
            />
            {errors.conteudo && (
              <div className="flex items-center gap-1.5 text-red-500">
                <WarningCircle size={13} />
                <span className="text-xs">{errors.conteudo.message}</span>
              </div>
            )}
            <p className="font-corpo text-xs text-[#888]">
              Suporte a Markdown será adicionado em breve.
            </p>
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
                <span className="text-sm text-(--color-texto)">Publicado</span>
                <p className="font-corpo text-xs text-[#888] mt-0.5">
                  Visível no blog
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  {...register("publicado")}
                  className="sr-only peer"
                  defaultChecked
                />
                <div className="w-10 h-5 bg-gray-200 rounded-full peer peer-checked:bg-(--color-primaria) peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all" />
              </label>
            </div>

            <div className="flex flex-col gap-3 pt-3 border-t border-gray-100">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 bg-(--color-primaria) text-white text-xs tracking-[2px] uppercase hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                {isSubmitting ? "Publicando..." : "Publicar post"}
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
                {categoriasBlog.map((c) => (
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
        </div>
      </form>
    </div>
  );
}
