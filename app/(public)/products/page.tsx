"use client";

import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { Suspense } from "react";
import { useProducts } from "@/app/hooks";
import { FunnelSimple } from "@phosphor-icons/react";

const grupos = [
  { slug: "para-elas", label: "Para Ela" },
  { slug: "para-eles", label: "Para Ele" },
  { slug: "sadomasoquismo", label: "Sadomasoquismo" },
  { slug: "geral", label: "Geral" },
];

function ProdutosContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const categoriaAtiva = searchParams.get("categoria") ?? undefined;

  const { produtos, categorias, loading, error } = useProducts(categoriaAtiva);

  const setCategoriaAtiva = (slug: string | null) => {
    if (slug) {
      router.push(`/products?categoria=${slug}`);
    } else {
      router.push("/products");
    }
  };

  return (
    <div className="flex min-h-screen bg-(--color-fundo)">
      {/* SIDEBAR */}
      <aside className="w-64 shrink-0 border-r border-gray-200 bg-white px-6 py-10">
        <div className="flex items-center gap-2 mb-8">
          <FunnelSimple size={16} className="text-(--color-primaria)" />
          <span className="text-xs tracking-[3px] uppercase text-(--color-texto) font-semibold">
            Filtros
          </span>
        </div>

        <button
          onClick={() => setCategoriaAtiva(null)}
          className={`w-full text-left text-xs tracking-wide py-2 px-3 rounded mb-6 transition-all
            ${
              !categoriaAtiva
                ? "bg-(--color-primaria) text-white"
                : "text-(--color-texto) hover:text-(--color-primaria)"
            }`}
        >
          Todos os produtos
        </button>

        {grupos.map((grupo) => (
          <div key={grupo.slug} className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <div className="h-[1px] w-3 bg-gray-200" />
              <p className="text-[9px] tracking-[3px] uppercase text-gray-300 font-medium">
                {grupo.label}
              </p>
              <div className="h-[1px] flex-1 bg-gray-200" />
            </div>
            <ul className="flex flex-col gap-1">
              {categorias
                .filter((c) => c.grupo === grupo.slug)
                .map((cat) => (
                  <li key={cat.slug}>
                    <button
                      onClick={() => setCategoriaAtiva(cat.slug)}
                      className={`w-full text-left text-xs tracking-wide py-1.5 px-3 rounded transition-all
                        ${
                          categoriaAtiva === cat.slug
                            ? "bg-(--color-primaria) text-white"
                            : "text-(--color-texto) hover:text-(--color-primaria)"
                        }`}
                    >
                      {cat.label}
                    </button>
                  </li>
                ))}
            </ul>
          </div>
        ))}
      </aside>

      {/* CONTEÚDO */}
      <main className="flex-1 px-10 py-10">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="font-titulo text-3xl text-(--color-texto)">
              {categoriaAtiva
                ? categorias.find((c) => c.slug === categoriaAtiva)?.label
                : "Todos os Produtos"}
            </h1>
            <p className="text-xs text-[#888] mt-1">
              {loading
                ? "Carregando..."
                : `${produtos.length} produto${produtos.length !== 1 ? "s" : ""} encontrado${produtos.length !== 1 ? "s" : ""}`}
            </p>
          </div>
        </div>

        {/* ERRO */}
        {error && (
          <div className="flex items-center justify-center h-64">
            <p className="text-sm text-red-400">{error}</p>
          </div>
        )}

        {/* LOADING */}
        {loading && (
          <div className="grid grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="bg-white rounded-xl overflow-hidden animate-pulse"
              >
                <div className="aspect-square bg-gray-100" />
                <div className="p-4 flex flex-col gap-2">
                  <div className="h-3 bg-gray-100 rounded w-1/3" />
                  <div className="h-5 bg-gray-100 rounded w-2/3" />
                  <div className="h-3 bg-gray-100 rounded w-full" />
                  <div className="h-4 bg-gray-100 rounded w-1/4 mt-1" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* PRODUTOS */}
        {!loading && !error && produtos.length > 0 && (
          <div className="grid grid-cols-3 gap-6">
            {produtos.map((produto) => (
              <Link
                key={produto.slug}
                href={`/products/${produto.slug}`}
                className="group bg-white rounded-xl overflow-hidden hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-[rgba(163,22,33,0.1)] transition-all duration-200"
              >
                <div className="relative aspect-square bg-gradient-to-br from-[#fdf0f1] to-[#f0d0d3]">
                  {produto.badge && (
                    <span
                      className={`absolute top-3 left-3 text-[0.65rem] tracking-[1px] uppercase px-2 py-1 rounded-sm text-white ${produto.badgeDark ? "bg-[#1a1a1a]" : "bg-(--color-primaria)"}`}
                    >
                      {produto.badge}
                    </span>
                  )}
                </div>
                <div className="p-4 flex flex-col gap-2">
                  <span className="text-[0.6rem] tracking-[2px] uppercase text-(--color-primaria) opacity-70">
                    {
                      categorias.find((c) => c.slug === produto.categoria)
                        ?.label
                    }
                  </span>
                  <h3 className="font-titulo text-lg text-(--color-texto) group-hover:text-(--color-primaria) transition-colors">
                    {produto.nome}
                  </h3>
                  <p className="text-xs text-[#888] leading-relaxed line-clamp-2">
                    {produto.descricao}
                  </p>
                  <p className="text-sm font-semibold text-(--color-primaria) mt-1">
                    R$ {produto.preco.toFixed(2).replace(".", ",")}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* VAZIO */}
        {!loading && !error && produtos.length === 0 && (
          <div className="flex flex-col items-center justify-center h-64 gap-4">
            <p className="text-sm text-[#888]">
              Nenhum produto encontrado nessa categoria.
            </p>
            <button
              onClick={() => setCategoriaAtiva(null)}
              className="text-xs tracking-[2px] uppercase text-(--color-primaria) border-b border-(--color-primaria)"
            >
              Ver todos
            </button>
          </div>
        )}
      </main>
    </div>
  );
}

export default function ProdutosPage() {
  return (
    <Suspense>
      <ProdutosContent />
    </Suspense>
  );
}
