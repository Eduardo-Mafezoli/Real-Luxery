"use client";

import { use } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { usePost, usePosts } from "@/app/hooks";
import { ArrowLeft, Clock, User } from "@phosphor-icons/react";

type Props = {
  params: Promise<{ slug: string }>;
};

export default function BlogPostPage({ params }: Props) {
  const { slug } = use(params);
  const { post, loading, error } = usePost(slug);
  const { categorias, posts } = usePosts();

  if (loading) {
    return (
      <div className="min-h-screen bg-(--color-fundo) flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 border-2 border-(--color-primaria) border-t-transparent rounded-full animate-spin" />
          <p className="text-sm text-[#888]">Carregando post...</p>
        </div>
      </div>
    );
  }

  if (error || !post) notFound();

  const categoria = categorias.find((c) => c.slug === post.categoria);
  const relacionados = posts
    .filter((p) => p.categoria === post.categoria && p.slug !== post.slug)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-(--color-fundo)">
      {/* BREADCRUMB */}
      <div className="px-[6rem] py-4 border-b border-gray-200 bg-white">
        <div className="flex items-center gap-2 text-xs text-[#888]">
          <Link
            href="/"
            className="hover:text-(--color-primaria) transition-colors"
          >
            Início
          </Link>
          <span>/</span>
          <Link
            href="/blog"
            className="hover:text-(--color-primaria) transition-colors"
          >
            Blog
          </Link>
          <span>/</span>
          <Link
            href={`/blog?categoria=${post.categoria}`}
            className="hover:text-(--color-primaria) transition-colors"
          >
            {categoria?.label}
          </Link>
          <span>/</span>
          <span className="text-(--color-texto)">{post.titulo}</span>
        </div>
      </div>

      {/* HERO */}
      <div className="bg-(--color-primaria) px-[6rem] py-16">
        <div className="max-w-3xl mx-auto flex flex-col gap-4">
          <span className="text-[0.65rem] tracking-[4px] uppercase text-white opacity-70">
            {categoria?.label}
          </span>
          <h1 className="font-titulo text-5xl text-white leading-tight font-bold">
            {post.titulo}
          </h1>
          <p className="text-sm text-white opacity-80 leading-relaxed">
            {post.resumo}
          </p>
          <div className="flex items-center gap-4 text-[0.65rem] text-white opacity-60 mt-2">
            <span className="flex items-center gap-1">
              <User size={12} />
              {post.autor}
            </span>
            <span>·</span>
            <span>{post.data}</span>
            <span>·</span>
            <span className="flex items-center gap-1">
              <Clock size={12} />
              {post.tempoLeitura} de leitura
            </span>
          </div>
        </div>
      </div>

      {/* THUMB */}
      <div className="px-[6rem]">
        <div className="max-w-3xl mx-auto -mt-8">
          <div className="w-full aspect-video bg-gradient-to-br from-[#f5d0d3] to-[#e8c5c8] rounded-2xl shadow-xl" />
        </div>
      </div>

      {/* CONTEÚDO */}
      <div className="px-[6rem] py-16">
        <div className="max-w-3xl mx-auto">
          <div className="prose prose-sm max-w-none">
            {post.conteudo.split("\n\n").map((paragrafo, i) => (
              <p key={i} className="text-sm text-[#444] leading-relaxed mb-6">
                {paragrafo}
              </p>
            ))}
          </div>

          {/* CATEGORIA */}
          <div className="flex items-center gap-3 mt-12 pt-8 border-t border-gray-100">
            <span className="text-xs text-[#888] tracking-wide">
              Categoria:
            </span>
            <Link
              href={`/blog?categoria=${post.categoria}`}
              className="hover:text-(--color-primaria) transition-colors text-xs"
            >
              {categoria?.label}
            </Link>
          </div>

          {/* VOLTAR */}
          <div className="mt-8">
            <Link
              href="/blog"
              className="flex items-center gap-2 text-xs tracking-[2px] uppercase text-(--color-primaria) hover:gap-3 transition-all"
            >
              <ArrowLeft size={14} />
              Voltar para o blog
            </Link>
          </div>
        </div>
      </div>

      {/* RELACIONADOS */}
      {relacionados.length > 0 && (
        <div className="px-[6rem] py-16 bg-white">
          <div className="max-w-6xl mx-auto">
            <h2 className="font-titulo text-2xl text-(--color-texto) mb-8">
              Artigos{" "}
              <span className="text-(--color-primaria)">relacionados</span>
            </h2>
            <div className="grid grid-cols-3 gap-6">
              {relacionados.map((rel) => (
                <Link
                  key={rel.slug}
                  href={`/blog/${rel.slug}`}
                  className="group bg-(--color-fundo) rounded-xl overflow-hidden hover:-translate-y-1.5 hover:shadow-xl transition-all duration-200"
                >
                  <div className="aspect-video bg-gradient-to-br from-[#f5d0d3] to-[#e8c5c8]" />
                  <div className="p-5 flex flex-col gap-2">
                    <span className="text-[0.65rem] tracking-[3px] uppercase text-(--color-primaria)">
                      {categorias.find((c) => c.slug === rel.categoria)?.label}
                    </span>
                    <h3 className="font-titulo text-base text-(--color-texto) group-hover:text-(--color-primaria) transition-colors leading-snug">
                      {rel.titulo}
                    </h3>
                    <span className="text-[0.65rem] text-[#aaa]">
                      {rel.tempoLeitura} de leitura
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
