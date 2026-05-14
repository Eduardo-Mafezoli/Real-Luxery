"use client";

import { use, useState } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { useProduct, useProducts } from "@/app/hooks";
import { useCartStore } from "@/app/store/useCartStore";
import {
  ShoppingCart,
  ArrowLeft,
  Shield,
  Truck,
  Medal,
} from "@phosphor-icons/react";

type Props = {
  params: Promise<{ slug: string }>;
};

export default function ProductPage({ params }: Props) {
  const { slug } = use(params);
  const { produto, loading, error } = useProduct(slug);
  const { categorias } = useProducts();

  const [nota, setNota] = useState(0);
  const [hoverNota, setHoverNota] = useState(0);
  const [quantidade, setQuantidade] = useState(1);
  const [adicionado, setAdicionado] = useState(false);

  const addItem = useCartStore((state) => state.addItem);

  if (loading) {
    return (
      <div className="min-h-screen bg-(--color-fundo) flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 border-2 border-(--color-primaria) border-t-transparent rounded-full animate-spin" />
          <p className="text-sm text-[#888]">Carregando produto...</p>
        </div>
      </div>
    );
  }

  if (error || !produto) notFound();

  const categoria = categorias.find((c) => c.slug === produto.categoria);

  const handleAddToCart = () => {
    for (let i = 0; i < quantidade; i++) {
      addItem({
        slug: produto.slug,
        nome: produto.nome,
        preco: produto.preco,
        categoria: produto.categoria,
      });
    }
    setAdicionado(true);
    setTimeout(() => setAdicionado(false), 2000);
  };

  const mediaAvaliacoes =
    produto.avaliacoes && produto.avaliacoes.length > 0
      ? (
          produto.avaliacoes.reduce((acc, a) => acc + a.nota, 0) /
          produto.avaliacoes.length
        ).toFixed(1)
      : null;

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
            href="/products"
            className="hover:text-(--color-primaria) transition-colors"
          >
            Produtos
          </Link>
          <span>/</span>
          <Link
            href={`/products?categoria=${produto.categoria}`}
            className="hover:text-(--color-primaria) transition-colors"
          >
            {categoria?.label}
          </Link>
          <span>/</span>
          <span className="text-(--color-texto)">{produto.nome}</span>
        </div>
      </div>

      <div className="px-[6rem] py-16">
        <div className="grid grid-cols-2 gap-16 max-w-6xl mx-auto">
          {/* IMAGEM */}
          <div className="flex flex-col gap-4">
            <div className="relative aspect-square bg-gradient-to-br from-[#fdf0f1] to-[#f0d0d3] rounded-2xl overflow-hidden">
              {produto.badge && (
                <span
                  className={`absolute top-4 left-4 text-[0.65rem] tracking-[1px] uppercase px-3 py-1.5 rounded-sm text-white z-10 ${produto.badgeDark ? "bg-[#1a1a1a]" : "bg-(--color-primaria)"}`}
                >
                  {produto.badge}
                </span>
              )}
            </div>
            <div className="grid grid-cols-4 gap-3">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="aspect-square bg-gradient-to-br from-[#fdf0f1] to-[#f0d0d3] rounded-lg cursor-pointer hover:ring-2 hover:ring-(--color-primaria) transition-all"
                />
              ))}
            </div>
          </div>

          {/* INFO */}
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <span className="text-[0.65rem] tracking-[3px] uppercase text-(--color-primaria)">
                {categoria?.label}
              </span>
              <h1 className="font-titulo text-4xl text-(--color-texto) leading-tight">
                {produto.nome}
              </h1>
              {mediaAvaliacoes && (
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex gap-0.5">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span
                        key={star}
                        className={`text-sm ${star <= Math.round(Number(mediaAvaliacoes)) ? "text-(--color-primaria)" : "text-gray-200"}`}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                  <span className="font-corpo text-xs text-[#888]">
                    {mediaAvaliacoes} ({produto.avaliacoes?.length} avaliações)
                  </span>
                </div>
              )}
            </div>

            <div className="flex items-baseline gap-3">
              <p className="font-corpo text-4xl text-(--color-primaria) font-bold">
                R$ {produto.preco.toFixed(2).replace(".", ",")}
              </p>
              <p className="font-corpo text-xs text-[#888]">
                ou 12x de R$ {(produto.preco / 12).toFixed(2).replace(".", ",")}{" "}
                sem juros
              </p>
            </div>

            <p className="text-sm text-[#555] leading-relaxed">
              {produto.descricao}
            </p>

            {/* QUANTIDADE */}
            <div className="flex flex-col gap-2">
              <label className="text-xs tracking-[2px] uppercase text-(--color-texto) font-medium">
                Quantidade
              </label>
              <div className="flex items-center w-fit border border-gray-200 rounded">
                <button
                  onClick={() => setQuantidade((q) => Math.max(1, q - 1))}
                  className="px-4 py-2 text-sm hover:bg-gray-50 transition-colors"
                >
                  −
                </button>
                <span className="font-corpo px-6 py-2 text-sm border-x border-gray-200">
                  {quantidade}
                </span>
                <button
                  onClick={() => setQuantidade((q) => q + 1)}
                  className="px-4 py-2 text-sm hover:bg-gray-50 transition-colors"
                >
                  +
                </button>
              </div>
            </div>

            {/* BOTÕES */}
            <div className="flex flex-col gap-3">
              <button
                onClick={handleAddToCart}
                className={`flex items-center justify-center gap-2 py-4 text-xs tracking-[2px] uppercase transition-all
                  ${adicionado ? "bg-green-600 text-white" : "bg-(--color-primaria) text-white hover:opacity-90"}`}
              >
                <ShoppingCart size={18} />
                {adicionado
                  ? "Adicionado ao carrinho!"
                  : "Adicionar ao carrinho"}
              </button>
              <Link
                href="/cart"
                className="py-4 border border-(--color-primaria) text-(--color-primaria) text-xs tracking-[2px] uppercase hover:bg-(--color-primaria) hover:text-white transition-all text-center"
              >
                Comprar agora
              </Link>
            </div>

            {/* SELOS */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-100">
              <div className="flex flex-col items-center text-center gap-2">
                <Shield size={20} className="text-(--color-primaria)" />
                <span className="text-[0.65rem] text-[#888] leading-tight">
                  Compra discreta
                </span>
              </div>
              <div className="flex flex-col items-center text-center gap-2">
                <Truck size={20} className="text-(--color-primaria)" />
                <span className="text-[0.65rem] text-[#888] leading-tight">
                  Entrega rápida
                </span>
              </div>
              <div className="flex flex-col items-center text-center gap-2">
                <Medal size={20} className="text-(--color-primaria)" />
                <span className="text-[0.65rem] text-[#888] leading-tight">
                  Qualidade premium
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* CARACTERÍSTICAS + AVALIAÇÕES */}
        <div className="max-w-6xl mx-auto mt-20 grid grid-cols-2 gap-16 pt-12 border-t border-gray-100">
          <div>
            <h2 className="font-titulo text-2xl text-(--color-texto) mb-6">
              Características{" "}
              <span className="text-(--color-primaria)">técnicas</span>
            </h2>
            {produto.caracteristicas && produto.caracteristicas.length > 0 ? (
              <div className="flex flex-col divide-y divide-gray-100">
                {produto.caracteristicas.map((c) => (
                  <div key={c.label} className="flex justify-between py-3">
                    <span className="text-xs tracking-wide text-[#888] uppercase">
                      {c.label}
                    </span>
                    <span className="text-xs text-(--color-texto) font-medium">
                      {c.valor}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-[#888]">
                Características não disponíveis.
              </p>
            )}
          </div>

          <div>
            <h2 className="font-titulo text-2xl text-(--color-texto) mb-6">
              Avaliação <span className="text-(--color-primaria)">geral</span>
            </h2>
            {mediaAvaliacoes ? (
              <div className="flex items-center gap-6">
                <span className="font-corpo text-7xl text-(--color-primaria) font-bold leading-none">
                  {mediaAvaliacoes}
                </span>
                <div className="flex flex-col gap-2">
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span
                        key={star}
                        className={`text-2xl ${star <= Math.round(Number(mediaAvaliacoes)) ? "text-(--color-primaria)" : "text-gray-200"}`}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                  <span className="font-corpo text-xs text-[#888]">
                    Baseado em {produto.avaliacoes?.length} avaliações
                  </span>
                </div>
              </div>
            ) : (
              <p className="text-xs text-[#888]">Ainda sem avaliações.</p>
            )}
          </div>
        </div>

        {/* AVALIAÇÕES */}
        {produto.avaliacoes && produto.avaliacoes.length > 0 && (
          <div className="max-w-6xl mx-auto mt-16">
            <h2 className="font-titulo text-2xl text-(--color-texto) mb-8">
              O que dizem nossos{" "}
              <span className="text-(--color-primaria)">clientes</span>
            </h2>
            <div className="grid grid-cols-3 gap-6">
              {produto.avaliacoes.map((av, i) => (
                <div
                  key={i}
                  className="bg-white rounded-xl p-6 flex flex-col gap-4 shadow-sm"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex flex-col gap-1">
                      <span className="text-sm font-medium text-(--color-texto)">
                        {av.nome}
                      </span>
                      <span className="font-corpo text-[0.65rem] text-[#aaa]">
                        {av.data}
                      </span>
                    </div>
                    <div className="flex gap-0.5">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <span
                          key={star}
                          className={`text-sm ${star <= av.nota ? "text-(--color-primaria)" : "text-gray-200"}`}
                        >
                          ★
                        </span>
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-[#555] leading-relaxed">
                    {av.comentario}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* FORMULÁRIO AVALIAÇÃO */}
        <div className="max-w-6xl mx-auto mt-16">
          <h2 className="font-titulo text-2xl text-(--color-texto) mb-8">
            Deixe sua <span className="text-(--color-primaria)">avaliação</span>
          </h2>
          <div className="bg-white rounded-xl p-8 flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-xs tracking-[2px] uppercase text-(--color-texto) font-medium">
                Sua nota
              </label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => setNota(star)}
                    onMouseEnter={() => setHoverNota(star)}
                    onMouseLeave={() => setHoverNota(0)}
                    className={`text-3xl transition-colors ${star <= (hoverNota || nota) ? "text-(--color-primaria)" : "text-gray-200"}`}
                  >
                    ★
                  </button>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-xs tracking-[2px] uppercase text-(--color-texto) font-medium">
                Seu nome
              </label>
              <input
                type="text"
                placeholder="Como quer ser identificado"
                className="border border-gray-200 rounded px-4 py-3 text-sm outline-none focus:border-(--color-primaria) transition-colors"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-xs tracking-[2px] uppercase text-(--color-texto) font-medium">
                Comentário
              </label>
              <textarea
                rows={4}
                placeholder="Conte sua experiência com o produto..."
                className="border border-gray-200 rounded px-4 py-3 text-sm outline-none focus:border-(--color-primaria) transition-colors resize-none"
              />
            </div>
            <button className="self-start px-8 py-3 bg-(--color-primaria) text-white text-xs tracking-[2px] uppercase hover:opacity-90 transition-opacity">
              Enviar avaliação
            </button>
          </div>
        </div>

        {/* VOLTAR */}
        <div className="max-w-6xl mx-auto mt-12">
          <Link
            href="/products"
            className="flex items-center gap-2 text-xs tracking-[2px] uppercase text-(--color-primaria) hover:gap-3 transition-all"
          >
            <ArrowLeft size={14} />
            Voltar para produtos
          </Link>
        </div>
      </div>
    </div>
  );
}
