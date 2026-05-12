"use client";

import Link from "next/link";
import { useCartStore } from "@/app/store/useCartStore";
import {
  Trash,
  Minus,
  Plus,
  ShoppingCart,
  ArrowLeft,
} from "@phosphor-icons/react";

export default function CartPage() {
  const { items, removeItem, updateQuantidade, total, totalItems } =
    useCartStore();

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-(--color-fundo) flex flex-col items-center justify-center gap-6">
        <ShoppingCart size={64} className="text-gray-200" />
        <div className="flex flex-col items-center gap-2">
          <h1 className="font-titulo text-3xl text-(--color-texto)">
            Seu carrinho está vazio
          </h1>
          <p className="text-sm text-[#888]">
            Adicione produtos para continuar
          </p>
        </div>
        <Link
          href="/products"
          className="px-8 py-3 bg-(--color-primaria) text-white text-xs tracking-[2px] uppercase hover:opacity-90 transition-opacity"
        >
          Ver produtos
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-(--color-fundo)">
      {/* HEADER DA PÁGINA */}
      <div className="px-[6rem] py-4 border-b border-gray-200 bg-white">
        <div className="flex items-center gap-2 text-xs text-[#888]">
          <Link
            href="/"
            className="hover:text-(--color-primaria) transition-colors"
          >
            Início
          </Link>
          <span>/</span>
          <span className="text-(--color-texto)">Carrinho</span>
        </div>
      </div>

      <div className="px-[6rem] py-16 max-w-7xl mx-auto">
        <div className="flex items-baseline justify-between mb-12">
          <h1 className="font-titulo text-4xl text-(--color-texto)">
            Meu <span className="text-(--color-primaria)">Carrinho</span>
          </h1>
          <span className="font-corpo text-sm text-[#888]">
            {totalItems()} {totalItems() === 1 ? "item" : "itens"}
          </span>
        </div>

        <div className="flex gap-12 items-start">
          {/* LISTA DE ITENS */}
          <div className="flex-1 flex flex-col gap-4">
            {items.map((item) => (
              <div
                key={item.slug}
                className="bg-white rounded-xl p-6 flex items-center gap-6"
              >
                {/* IMAGEM PLACEHOLDER */}
                <div className="w-24 h-24 rounded-lg bg-gradient-to-br from-[#fdf0f1] to-[#f0d0d3] shrink-0" />

                {/* INFO */}
                <div className="flex-1 flex flex-col gap-1">
                  <span className="text-[0.6rem] tracking-[2px] uppercase text-(--color-primaria) opacity-70">
                    {item.categoria}
                  </span>
                  <h3 className="font-titulo text-lg text-(--color-texto)">
                    {item.nome}
                  </h3>
                  <p className="font-corpo text-sm font-semibold text-(--color-primaria) mt-1">
                    R$ {item.preco.toFixed(2).replace(".", ",")}
                  </p>
                </div>

                {/* QUANTIDADE */}
                <div className="flex items-center border border-gray-200 rounded">
                  <button
                    onClick={() =>
                      updateQuantidade(item.slug, item.quantidade - 1)
                    }
                    className="px-3 py-2 hover:bg-gray-50 transition-colors text-sm"
                  >
                    <Minus size={12} />
                  </button>
                  <span className="font-corpo px-4 py-2 text-sm border-x border-gray-200 min-w-[40px] text-center">
                    {item.quantidade}
                  </span>
                  <button
                    onClick={() =>
                      updateQuantidade(item.slug, item.quantidade + 1)
                    }
                    className="px-3 py-2 hover:bg-gray-50 transition-colors text-sm"
                  >
                    <Plus size={12} />
                  </button>
                </div>

                {/* SUBTOTAL */}
                <div className="text-right min-w-[100px]">
                  <p className="font-corpo text-sm font-semibold text-(--color-texto)">
                    R${" "}
                    {(item.preco * item.quantidade)
                      .toFixed(2)
                      .replace(".", ",")}
                  </p>
                </div>

                {/* REMOVER */}
                <button
                  onClick={() => removeItem(item.slug)}
                  className="text-gray-300 hover:text-red-400 transition-colors ml-2"
                >
                  <Trash size={18} />
                </button>
              </div>
            ))}

            {/* VOLTAR */}
            <div className="mt-4">
              <Link
                href="/products"
                className="flex items-center gap-2 text-xs tracking-[2px] uppercase text-(--color-primaria) hover:gap-3 transition-all"
              >
                <ArrowLeft size={14} />
                Continuar comprando
              </Link>
            </div>
          </div>

          {/* RESUMO */}
          <div className="w-80 shrink-0 bg-white rounded-xl p-6 flex flex-col gap-4 sticky top-8">
            <h2 className="font-titulo text-xl text-(--color-texto)">
              Resumo do pedido
            </h2>

            <div className="flex flex-col gap-3 py-4 border-y border-gray-100">
              <div className="flex justify-between items-center">
                <span className="text-xs text-[#888]">Subtotal</span>
                <span className="font-corpo text-sm text-(--color-texto)">
                  R$ {total().toFixed(2).replace(".", ",")}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-[#888]">Frete</span>
                <span className="font-corpo text-sm text-green-600 font-medium">
                  Calcular no checkout
                </span>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-sm font-semibold text-(--color-texto)">
                Total
              </span>
              <span className="font-corpo text-xl font-bold text-(--color-primaria)">
                R$ {total().toFixed(2).replace(".", ",")}
              </span>
            </div>

            <p className="font-corpo text-xs text-[#888]">
              ou 12x de R$ {(total() / 12).toFixed(2).replace(".", ",")} sem
              juros
            </p>

            <Link
              href="/checkout"
              className="w-full py-4 bg-(--color-primaria) text-white text-xs tracking-[2px] uppercase text-center hover:opacity-90 transition-opacity mt-2"
            >
              Finalizar compra
            </Link>

            <div className="flex flex-col gap-2 pt-2 border-t border-gray-100">
              {[
                "Compra 100% segura",
                "Embalagem discreta",
                "Entrega para todo Brasil",
              ].map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <div className="w-1 h-1 rounded-full bg-(--color-primaria) opacity-50" />
                  <span className="text-[0.65rem] text-[#888]">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
