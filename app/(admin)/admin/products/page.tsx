"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Plus,
  PencilSimple,
  Trash,
  MagnifyingGlass,
  FunnelSimple,
  Warning,
} from "@phosphor-icons/react";
import { produtos, categorias } from "@/app/data/products";

export default function AdminProductsPage() {
  const [search, setSearch] = useState("");
  const [categoriaFiltro, setCategoriaFiltro] = useState("");
  const [estoqueFilter, setEstoqueFilter] = useState("");
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const produtosFiltrados = produtos.filter((p) => {
    const matchSearch = p.nome.toLowerCase().includes(search.toLowerCase());
    const matchCategoria = categoriaFiltro
      ? p.categoria === categoriaFiltro
      : true;
    return matchSearch && matchCategoria;
  });

  return (
    <div className="flex flex-col gap-6">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-titulo text-3xl text-(--color-texto)">
            Produtos
          </h1>
          <p className="font-corpo text-sm text-[#888] mt-1">
            {produtos.length} produtos cadastrados
          </p>
        </div>
        <Link
          href="/admin/products/new"
          className="flex items-center gap-2 px-5 py-2.5 bg-(--color-primaria) text-white text-xs tracking-[2px] uppercase hover:opacity-90 transition-opacity"
        >
          <Plus size={14} />
          Novo produto
        </Link>
      </div>

      {/* FILTROS */}
      <div className="bg-white rounded-xl p-4 flex items-center gap-4">
        <div className="relative flex-1">
          <MagnifyingGlass
            size={14}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-[#aaa]"
          />
          <input
            type="text"
            placeholder="Buscar produto..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded text-sm outline-none focus:border-(--color-primaria) transition-colors"
          />
        </div>

        <div className="flex items-center gap-2">
          <FunnelSimple size={14} className="text-[#aaa]" />
          <select
            value={categoriaFiltro}
            onChange={(e) => setCategoriaFiltro(e.target.value)}
            className="border border-gray-200 rounded px-3 py-2 text-xs outline-none focus:border-(--color-primaria) transition-colors text-[#888]"
          >
            <option value="">Todas as categorias</option>
            {categorias.map((c) => (
              <option key={c.slug} value={c.slug}>
                {c.label}
              </option>
            ))}
          </select>

          <select
            value={estoqueFilter}
            onChange={(e) => setEstoqueFilter(e.target.value)}
            className="border border-gray-200 rounded px-3 py-2 text-xs outline-none focus:border-(--color-primaria) transition-colors text-[#888]"
          >
            <option value="">Todos os estoques</option>
            <option value="baixo">Estoque baixo</option>
            <option value="esgotado">Esgotado</option>
          </select>
        </div>
      </div>

      {/* TABELA */}
      <div className="bg-white rounded-xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="text-left px-6 py-4 text-[0.65rem] tracking-[3px] uppercase text-[#888] font-medium">
                Produto
              </th>
              <th className="text-left px-6 py-4 text-[0.65rem] tracking-[3px] uppercase text-[#888] font-medium">
                Categoria
              </th>
              <th className="text-left px-6 py-4 text-[0.65rem] tracking-[3px] uppercase text-[#888] font-medium">
                Preço
              </th>
              <th className="text-left px-6 py-4 text-[0.65rem] tracking-[3px] uppercase text-[#888] font-medium">
                Status
              </th>
              <th className="text-right px-6 py-4 text-[0.65rem] tracking-[3px] uppercase text-[#888] font-medium">
                Ações
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {produtosFiltrados.map((produto) => (
              <tr
                key={produto.slug}
                className="hover:bg-gray-50 transition-colors"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#fdf0f1] to-[#f0d0d3] shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-(--color-texto)">
                        {produto.nome}
                      </p>
                      <p className="font-corpo text-xs text-[#888]">
                        {produto.slug}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="font-corpo text-xs text-[#888]">
                    {
                      categorias.find((c) => c.slug === produto.categoria)
                        ?.label
                    }
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="font-corpo text-sm font-semibold text-(--color-texto)">
                    R$ {produto.preco.toFixed(2).replace(".", ",")}
                  </span>
                </td>
                <td className="px-6 py-4">
                  {produto.badge ? (
                    <span
                      className={`font-corpo text-xs px-2 py-1 rounded-full ${produto.badgeDark ? "bg-[#1a1a1a] text-white" : "bg-(--color-primaria) text-white"}`}
                    >
                      {produto.badge}
                    </span>
                  ) : (
                    <span className="font-corpo text-xs px-2 py-1 rounded-full bg-green-50 text-green-600">
                      Ativo
                    </span>
                  )}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      title="Marcar como esgotado"
                      className="p-1.5 text-[#aaa] hover:text-yellow-500 transition-colors"
                    >
                      <Warning size={16} />
                    </button>
                    <Link
                      href={`/admin/products/${produto.slug}/edit`}
                      className="p-1.5 text-[#aaa] hover:text-(--color-primaria) transition-colors"
                    >
                      <PencilSimple size={16} />
                    </Link>
                    <button
                      onClick={() => setDeleteId(produto.slug)}
                      className="p-1.5 text-[#aaa] hover:text-red-400 transition-colors"
                    >
                      <Trash size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {produtosFiltrados.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 gap-2">
            <p className="text-sm text-[#888]">Nenhum produto encontrado</p>
          </div>
        )}
      </div>

      {/* MODAL CONFIRMAR DELETE */}
      {deleteId && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
          <div className="bg-white rounded-xl p-8 max-w-sm w-full mx-4 flex flex-col gap-4">
            <h3 className="font-titulo text-xl text-(--color-texto)">
              Remover produto?
            </h3>
            <p className="font-corpo text-sm text-[#888]">
              Esta ação não pode ser desfeita. O produto será removido
              permanentemente.
            </p>
            <div className="flex gap-3 mt-2">
              <button
                onClick={() => setDeleteId(null)}
                className="flex-1 py-2.5 border border-gray-200 text-xs tracking-[2px] uppercase text-[#888] hover:border-gray-300 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={() => setDeleteId(null)}
                className="flex-1 py-2.5 bg-red-500 text-white text-xs tracking-[2px] uppercase hover:opacity-90 transition-opacity"
              >
                Remover
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
