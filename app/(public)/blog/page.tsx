"use client";

import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { Suspense } from "react";
import { posts, categoriasBlog } from "@/app/data/blog";

function BlogContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const categoriaAtiva = searchParams.get("categoria");

  const setCategoriaAtiva = (slug: string | null) => {
    if (slug) {
      router.push(`/blog?categoria=${slug}`);
    } else {
      router.push("/blog");
    }
  };

  const postsFiltrados = categoriaAtiva
    ? posts.filter((p) => p.categoria === categoriaAtiva)
    : posts;

  const postDestaque = posts.find((p) => p.destaque);
  const postsGrid = postsFiltrados.filter((p) => !p.destaque || categoriaAtiva);

  return (
    <div className="min-h-screen bg-(--color-fundo)">
      {/* HERO DO BLOG */}
      {!categoriaAtiva && postDestaque && (
        <div className="bg-(--color-primaria) px-[6rem] py-20">
          <div className="max-w-6xl mx-auto grid grid-cols-2 gap-16 items-center">
            <div className="flex flex-col gap-4">
              <span className="text-[0.65rem] tracking-[4px] uppercase text-white opacity-70">
                Artigo em destaque
              </span>
              <h1 className="font-titulo text-5xl text-white leading-tight font-bold">
                {postDestaque.titulo}
              </h1>
              <p className="text-sm text-white opacity-80 leading-relaxed">
                {postDestaque.resumo}
              </p>
              <div className="flex items-center gap-4 text-[0.65rem] text-white opacity-60">
                <span>{postDestaque.data}</span>
                <span>·</span>
                <span>{postDestaque.tempoLeitura} de leitura</span>
              </div>
              <Link
                href={`/blog/${postDestaque.slug}`}
                className="self-start mt-2 px-8 py-3 bg-white text-(--color-primaria) text-xs tracking-[2px] uppercase font-medium hover:opacity-90 transition-opacity"
              >
                Ler artigo
              </Link>
            </div>
            <div className="aspect-video bg-white/10 rounded-2xl" />
          </div>
        </div>
      )}

      {/* CONTEÚDO */}
      <div className="px-[6rem] py-16 max-w-6xl mx-auto">
        {/* FILTROS */}
        <div className="flex items-center gap-3 mb-12 flex-wrap">
          <button
            onClick={() => setCategoriaAtiva(null)}
            className={`px-4 py-2 text-xs tracking-[2px] uppercase rounded transition-all
              ${
                !categoriaAtiva
                  ? "bg-(--color-primaria) text-white"
                  : "border border-gray-200 text-(--color-texto) hover:border-(--color-primaria) hover:text-(--color-primaria)"
              }`}
          >
            Todos
          </button>
          {categoriasBlog.map((cat) => (
            <button
              key={cat.slug}
              onClick={() => setCategoriaAtiva(cat.slug)}
              className={`px-4 py-2 text-xs tracking-[2px] uppercase rounded transition-all
                ${
                  categoriaAtiva === cat.slug
                    ? "bg-(--color-primaria) text-white"
                    : "border border-gray-200 text-(--color-texto) hover:border-(--color-primaria) hover:text-(--color-primaria)"
                }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* HEADER */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="font-titulo text-3xl text-(--color-texto)">
              {categoriaAtiva
                ? categoriasBlog.find((c) => c.slug === categoriaAtiva)?.label
                : "Todos os artigos"}
            </h2>
            <p className="text-xs text-[#888] mt-1">
              {postsFiltrados.length} artigo
              {postsFiltrados.length !== 1 ? "s" : ""} encontrado
              {postsFiltrados.length !== 1 ? "s" : ""}
            </p>
          </div>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-3 gap-6">
          {postsGrid.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group bg-white rounded-xl overflow-hidden hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-[rgba(163,22,33,0.08)] transition-all duration-200"
            >
              <div className="w-full aspect-video bg-gradient-to-br from-[#f5d0d3] to-[#e8c5c8]" />
              <div className="p-6 flex flex-col gap-3">
                <span className="text-[0.65rem] tracking-[3px] uppercase text-(--color-primaria) font-medium">
                  {categoriasBlog.find((c) => c.slug === post.categoria)?.label}
                </span>
                <h3 className="font-titulo text-xl text-(--color-texto) group-hover:text-(--color-primaria) transition-colors leading-snug">
                  {post.titulo}
                </h3>
                <p className="text-xs text-[#888] leading-relaxed line-clamp-2">
                  {post.resumo}
                </p>
                <div className="flex items-center gap-3 text-[0.65rem] text-[#aaa] mt-1">
                  <span>{post.data}</span>
                  <span>·</span>
                  <span>{post.tempoLeitura} de leitura</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function BlogPage() {
  return (
    <Suspense>
      <BlogContent />
    </Suspense>
  );
}
