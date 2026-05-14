"use client";

import Link from "next/link";
import {
  Lock,
  Truck,
  Medal,
  CreditCard,
  Play,
  VideoCamera,
  ShieldCheck,
} from "@phosphor-icons/react";
import { useProducts } from "@/app/hooks";
import { usePosts } from "@/app/hooks";
import { formatCurrency } from "@/app/utils";

const selos = [
  {
    icone: Lock,
    titulo: "Compra Discreta",
    descricao: "Embalagem sem identificação e nota fiscal neutra.",
  },
  {
    icone: Truck,
    titulo: "Entrega Rápida",
    descricao: "Enviamos para todo o Brasil com agilidade e segurança.",
  },
  {
    icone: Medal,
    titulo: "Qualidade Premium",
    descricao: "Produtos selecionados com os melhores materiais do mercado.",
  },
  {
    icone: CreditCard,
    titulo: "Parcelamento 12x",
    descricao: "Parcele suas compras sem juros no cartão de crédito.",
  },
];

export default function Home() {
  const { produtos } = useProducts();
  const { posts } = usePosts();

  // Destaques: primeiros 4 produtos ativos
  const produtosDestaque = produtos.slice(0, 4);

  // Blog: 3 posts mais recentes
  const blogRecentes = posts.slice(0, 3);

  return (
    <main>
      {/* HERO */}
      <section className="flex items-center min-h-[calc(100vh-70px)] px-[6rem] w-full gap-20 bg-(--color-fundo)">
        <div className="w-1/2 flex flex-col gap-6">
          <span className="text-[0.7rem] tracking-[4px] uppercase text-(--color-primaria) font-medium">
            Nova coleção disponível
          </span>
          <h1 className="font-titulo text-[4.5rem] leading-[1.05] text-(--color-texto) font-bold">
            Prazer com{" "}
            <span className="text-(--color-primaria)">elegância</span>
            <br />e discrição
          </h1>
          <p className="text-sm leading-[1.8] text-[#555] max-w-[480px]">
            Descubra uma experiência única em produtos selecionados com
            qualidade premium e entrega discreta em todo o Brasil.
          </p>
          <div className="flex gap-4 mt-2">
            <Link
              href="/products"
              className="px-8 py-3 bg-(--color-primaria) text-(--color-texto-claro) text-[0.75rem] tracking-[2px] uppercase hover:opacity-85 transition-opacity"
            >
              Conhecer produtos
            </Link>
            <Link
              href="/register"
              className="px-8 py-3 border border-(--color-primaria) text-(--color-primaria) text-[0.75rem] tracking-[2px] uppercase hover:bg-(--color-primaria) hover:text-(--color-texto-claro) transition-all"
            >
              Registre-se agora
            </Link>
          </div>
        </div>

        <div className="w-1/2 flex flex-col gap-3">
          <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-[rgba(163,22,33,0.15)]">
            <div className="relative w-full aspect-video bg-[#1a0a0b] cursor-pointer group">
              <div className="absolute inset-0 bg-gradient-to-br from-[rgba(163,22,33,0.3)] to-[rgba(0,0,0,0.4)] z-10" />
              <div className="w-full h-full bg-gradient-to-br from-[#3a0a0e] to-[#1a0a0b]" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
                <div className="relative">
                  <div className="w-[72px] h-[72px] bg-(--color-primaria) rounded-full flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-200">
                    <Play size={28} weight="fill" />
                  </div>
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[72px] h-[72px] rounded-full bg-[rgba(163,22,33,0.4)] animate-ping" />
                </div>
              </div>
              <div className="absolute bottom-4 left-4 z-20 flex items-center gap-2 text-white text-xs tracking-wide opacity-90">
                <VideoCamera size={16} />
                Conheça a Real Luxery
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 text-[#888] text-xs tracking-wide pl-1">
            <ShieldCheck size={16} className="text-(--color-primaria)" />
            Compra 100% discreta e segura
          </div>
        </div>
      </section>

      {/* SELOS */}
      <section className="py-20 px-[6rem] bg-white">
        <div className="grid grid-cols-4 gap-6 max-w-6xl mx-auto">
          {selos.map((selo) => (
            <div
              key={selo.titulo}
              className="flex flex-col items-center text-center gap-4 p-8 rounded-xl hover:-translate-y-1 hover:shadow-xl hover:shadow-[rgba(163,22,33,0.08)] transition-all duration-200"
            >
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#fdf0f1] to-[#f5d0d3] flex items-center justify-center text-(--color-primaria)">
                <selo.icone size={28} />
              </div>
              <h4 className="font-titulo text-base tracking-wide text-(--color-texto)">
                {selo.titulo}
              </h4>
              <p className="text-xs text-[#888] leading-relaxed">
                {selo.descricao}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* TOP PRODUTOS */}
      <section className="py-20 px-[6rem] bg-(--color-fundo)">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-12">
            <h2 className="font-titulo text-[2.5rem] text-(--color-texto)">
              Mais <span className="text-(--color-primaria)">Desejados</span>
            </h2>
            <Link
              href="/products"
              className="text-xs tracking-[2px] uppercase text-(--color-primaria) hover:gap-3 flex items-center gap-2 transition-all"
            >
              Ver todos →
            </Link>
          </div>

          {produtosDestaque.length > 0 ? (
            <div className="grid grid-cols-4 gap-6">
              {produtosDestaque.map((produto) => (
                <Link
                  key={produto.slug}
                  href={`/products/${produto.slug}`}
                  className="bg-white rounded-xl overflow-hidden hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-[rgba(163,22,33,0.1)] transition-all duration-200"
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
                    <h3 className="font-titulo text-base text-(--color-texto)">
                      {produto.nome}
                    </h3>
                    <p className="text-sm font-semibold text-(--color-primaria)">
                      {formatCurrency(produto.preco)}
                    </p>
                    <button className="mt-2 py-2 border border-(--color-primaria) text-(--color-primaria) text-[0.7rem] tracking-[1px] uppercase hover:bg-(--color-primaria) hover:text-white transition-all">
                      Adicionar ao carrinho
                    </button>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="bg-white rounded-xl overflow-hidden animate-pulse"
                >
                  <div className="aspect-square bg-gray-100" />
                  <div className="p-4 flex flex-col gap-2">
                    <div className="h-4 bg-gray-100 rounded w-2/3" />
                    <div className="h-3 bg-gray-100 rounded w-1/3" />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* BLOG */}
      <section className="py-20 px-[6rem] bg-(--color-fundo)">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-12">
            <h2 className="font-titulo text-[2.5rem] text-(--color-texto)">
              Do nosso <span className="text-(--color-primaria)">Blog</span>
            </h2>
            <Link
              href="/blog"
              className="text-xs tracking-[2px] uppercase text-(--color-primaria) flex items-center gap-2 hover:gap-3 transition-all"
            >
              Ver todos →
            </Link>
          </div>

          {blogRecentes.length > 0 ? (
            <div className="grid grid-cols-3 gap-6">
              {blogRecentes.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group flex flex-col gap-4 bg-white rounded-xl overflow-hidden hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-[rgba(163,22,33,0.08)] transition-all duration-200"
                >
                  <div className="w-full aspect-video bg-gradient-to-br from-[#f5d0d3] to-[#e8c5c8]" />
                  <div className="px-5 pb-6 flex flex-col gap-3">
                    <span className="text-[0.65rem] tracking-[3px] uppercase text-(--color-primaria) font-medium">
                      {post.categoria}
                    </span>
                    <h3 className="font-titulo text-xl text-(--color-texto) group-hover:text-(--color-primaria) transition-colors leading-snug">
                      {post.titulo}
                    </h3>
                    <p className="text-xs text-[#888] leading-relaxed">
                      {post.resumo}
                    </p>
                    <span className="text-[0.65rem] tracking-wide text-[#aaa] mt-1">
                      {post.tempoLeitura} de leitura
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="bg-white rounded-xl overflow-hidden animate-pulse"
                >
                  <div className="aspect-video bg-gray-100" />
                  <div className="p-5 flex flex-col gap-2">
                    <div className="h-3 bg-gray-100 rounded w-1/4" />
                    <div className="h-5 bg-gray-100 rounded w-3/4" />
                    <div className="h-3 bg-gray-100 rounded w-full" />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CALL TO ACTION */}
      <section className="py-24 px-[6rem] bg-(--color-primaria)">
        <div className="max-w-4xl mx-auto flex flex-col items-center text-center gap-8">
          <span className="text-[0.7rem] tracking-[4px] uppercase text-(--color-texto-claro) opacity-70">
            Estamos aqui para você
          </span>
          <h2 className="font-titulo text-[3.5rem] leading-tight text-(--color-texto-claro) font-bold">
            Pronto para explorar o prazer com elegância?
          </h2>
          <p className="text-sm leading-relaxed text-(--color-texto-claro) opacity-80 max-w-xl">
            Nossa equipe está disponível para tirar todas as suas dúvidas com
            total discrição e respeito. Fale com a gente ou explore nossa
            coleção agora.
          </p>
          <div className="flex gap-4 mt-2">
            <Link
              href="/products"
              className="px-8 py-3 bg-(--color-texto-claro) text-(--color-primaria) text-[0.75rem] tracking-[2px] uppercase font-medium hover:opacity-90 transition-opacity"
            >
              Ver produtos
            </Link>
            <Link
              href="https://wa.me/5588999999999"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 border border-(--color-texto-claro) text-(--color-texto-claro) text-[0.75rem] tracking-[2px] uppercase hover:bg-(--color-texto-claro) hover:text-(--color-primaria) transition-all"
            >
              Falar no WhatsApp
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
