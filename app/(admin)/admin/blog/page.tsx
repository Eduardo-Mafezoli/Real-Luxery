"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Plus,
  PencilSimple,
  Trash,
  MagnifyingGlass,
  Eye,
  EyeSlash,
} from "@phosphor-icons/react";
import { posts, categoriasBlog } from "@/app/data/blog";

export default function AdminBlogPage() {
  const [search, setSearch] = useState("");
  const [categoriaFiltro, setCategoriaFiltro] = useState("");
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const postsFiltrados = posts.filter((p) => {
    const matchSearch = p.titulo.toLowerCase().includes(search.toLowerCase());
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
          <h1 className="font-titulo text-3xl text-(--color-texto)">Blog</h1>
          <p className="font-corpo text-sm text-[#888] mt-1">
            {posts.length} posts cadastrados
          </p>
        </div>
        <Link
          href="/admin/blog/new"
          className="flex items-center gap-2 px-5 py-2.5 bg-(--color-primaria) text-white text-xs tracking-[2px] uppercase hover:opacity-90 transition-opacity"
        >
          <Plus size={14} />
          Novo post
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
            placeholder="Buscar post..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded text-sm outline-none focus:border-(--color-primaria) transition-colors"
          />
        </div>
        <select
          value={categoriaFiltro}
          onChange={(e) => setCategoriaFiltro(e.target.value)}
          className="border border-gray-200 rounded px-3 py-2 text-xs outline-none focus:border-(--color-primaria) text-[#888]"
        >
          <option value="">Todas as categorias</option>
          {categoriasBlog.map((c) => (
            <option key={c.slug} value={c.slug}>
              {c.label}
            </option>
          ))}
        </select>
      </div>

      {/* TABELA */}
      <div className="bg-white rounded-xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="text-left px-6 py-4 text-[0.65rem] tracking-[3px] uppercase text-[#888] font-medium">
                Post
              </th>
              <th className="text-left px-6 py-4 text-[0.65rem] tracking-[3px] uppercase text-[#888] font-medium">
                Categoria
              </th>
              <th className="text-left px-6 py-4 text-[0.65rem] tracking-[3px] uppercase text-[#888] font-medium">
                Data
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
            {postsFiltrados.map((post) => (
              <tr
                key={post.slug}
                className="hover:bg-gray-50 transition-colors"
              >
                <td className="px-6 py-4">
                  <div className="flex flex-col gap-0.5">
                    <p className="text-sm font-medium text-(--color-texto)">
                      {post.titulo}
                    </p>
                    <p className="font-corpo text-xs text-[#888]">
                      {post.slug}
                    </p>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="font-corpo text-xs text-[#888]">
                    {
                      categoriasBlog.find((c) => c.slug === post.categoria)
                        ?.label
                    }
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="font-corpo text-xs text-[#888]">
                    {post.data}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="font-corpo text-xs px-2 py-1 rounded-full bg-green-50 text-green-600">
                    Publicado
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      title="Despublicar"
                      className="p-1.5 text-[#aaa] hover:text-yellow-500 transition-colors"
                    >
                      <EyeSlash size={16} />
                    </button>
                    <Link
                      href={`/admin/blog/${post.slug}/edit`}
                      className="p-1.5 text-[#aaa] hover:text-(--color-primaria) transition-colors"
                    >
                      <PencilSimple size={16} />
                    </Link>
                    <button
                      onClick={() => setDeleteId(post.slug)}
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

        {postsFiltrados.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 gap-2">
            <p className="text-sm text-[#888]">Nenhum post encontrado</p>
          </div>
        )}
      </div>

      {/* MODAL DELETE */}
      {deleteId && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
          <div className="bg-white rounded-xl p-8 max-w-sm w-full mx-4 flex flex-col gap-4">
            <h3 className="font-titulo text-xl text-(--color-texto)">
              Remover post?
            </h3>
            <p className="font-corpo text-sm text-[#888]">
              Esta ação não pode ser desfeita. O post será removido
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
