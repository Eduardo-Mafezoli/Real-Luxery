"use client";

import { useState } from "react";
import {
  Star,
  Check,
  Trash,
  MagnifyingGlass,
  FunnelSimple,
} from "@phosphor-icons/react";

type Review = {
  id: number;
  autor: string;
  produto: string;
  nota: number;
  comentario: string;
  data: string;
  status: "aprovado" | "suspeito";
  motivo?: string;
};

const reviewsMock: Review[] = [
  {
    id: 1,
    autor: "Ana S.",
    produto: "Vibrador Premium",
    nota: 5,
    comentario:
      "Produto incrível, chegou bem embalado e discreto. Superou minhas expectativas!",
    data: "13/05/2026",
    status: "aprovado",
  },
  {
    id: 2,
    autor: "Carlos M.",
    produto: "Kit Sensações",
    nota: 4,
    comentario: "Muito bom, recomendo. Entrega rápida e produto de qualidade.",
    data: "12/05/2026",
    status: "aprovado",
  },
  {
    id: 3,
    autor: "Usuario123",
    produto: "Óleo Sensual",
    nota: 1,
    comentario: "Comprem em www.outraLoja.com muito melhor e mais barato!!!!",
    data: "11/05/2026",
    status: "suspeito",
    motivo: "Link externo detectado",
  },
  {
    id: 4,
    autor: "Maria R.",
    produto: "Masturbador Premium",
    nota: 2,
    comentario: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    data: "10/05/2026",
    status: "suspeito",
    motivo: "Conteúdo repetitivo",
  },
];

export default function AdminReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>(reviewsMock);
  const [filtro, setFiltro] = useState<"todos" | "aprovado" | "suspeito">(
    "suspeito",
  );
  const [search, setSearch] = useState("");

  const reviewsFiltradas = reviews.filter((r) => {
    const matchFiltro = filtro === "todos" ? true : r.status === filtro;
    const matchSearch =
      r.produto.toLowerCase().includes(search.toLowerCase()) ||
      r.autor.toLowerCase().includes(search.toLowerCase());
    return matchFiltro && matchSearch;
  });

  const aprovar = (id: number) =>
    setReviews((prev) =>
      prev.map((r) =>
        r.id === id ? { ...r, status: "aprovado" as const } : r,
      ),
    );

  const remover = (id: number) =>
    setReviews((prev) => prev.filter((r) => r.id !== id));

  const suspeitos = reviews.filter((r) => r.status === "suspeito").length;

  return (
    <div className="flex flex-col gap-6">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-titulo text-3xl text-(--color-texto)">
            Avaliações
          </h1>
          <p className="font-corpo text-sm text-[#888] mt-1">
            Moderação de avaliações dos clientes
          </p>
        </div>
        {suspeitos > 0 && (
          <div className="flex items-center gap-2 px-4 py-2 bg-yellow-50 border border-yellow-100 rounded-lg">
            <span className="text-xs text-yellow-600 font-medium">
              {suspeitos}{" "}
              {suspeitos === 1 ? "avaliação suspeita" : "avaliações suspeitas"}
            </span>
          </div>
        )}
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
            placeholder="Buscar por produto ou autor..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded text-sm outline-none focus:border-(--color-primaria) transition-colors"
          />
        </div>
        <div className="flex items-center gap-2">
          <FunnelSimple size={14} className="text-[#aaa]" />
          {(["suspeito", "aprovado", "todos"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFiltro(f)}
              className={`px-3 py-1.5 text-xs tracking-[2px] uppercase rounded transition-colors
                ${
                  filtro === f
                    ? "bg-(--color-primaria) text-white"
                    : "border border-gray-200 text-[#888] hover:border-(--color-primaria) hover:text-(--color-primaria)"
                }`}
            >
              {f === "suspeito"
                ? "Suspeitos"
                : f === "aprovado"
                  ? "Aprovados"
                  : "Todos"}
            </button>
          ))}
        </div>
      </div>

      {/* LISTA */}
      <div className="flex flex-col gap-4">
        {reviewsFiltradas.map((review) => (
          <div
            key={review.id}
            className={`bg-white rounded-xl p-6 border-l-4 ${
              review.status === "suspeito"
                ? "border-yellow-400"
                : "border-green-400"
            }`}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex flex-col gap-2 flex-1">
                {/* META */}
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium text-(--color-texto)">
                    {review.autor}
                  </span>
                  <span className="font-corpo text-xs text-[#888]">·</span>
                  <span className="font-corpo text-xs text-[#888]">
                    {review.produto}
                  </span>
                  <span className="font-corpo text-xs text-[#888]">·</span>
                  <span className="font-corpo text-xs text-[#888]">
                    {review.data}
                  </span>
                </div>

                {/* NOTA */}
                <div className="flex items-center gap-0.5">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      size={14}
                      weight={star <= review.nota ? "fill" : "regular"}
                      className={
                        star <= review.nota
                          ? "text-yellow-400"
                          : "text-gray-200"
                      }
                    />
                  ))}
                </div>

                {/* COMENTÁRIO */}
                <p className="font-corpo text-sm text-[#555] leading-relaxed">
                  {review.comentario}
                </p>

                {/* MOTIVO SUSPEITO */}
                {review.status === "suspeito" && review.motivo && (
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[0.6rem] tracking-[2px] uppercase text-yellow-600 bg-yellow-50 px-2 py-0.5 rounded-full">
                      {review.motivo}
                    </span>
                  </div>
                )}
              </div>

              {/* AÇÕES */}
              <div className="flex items-center gap-2 shrink-0">
                {review.status === "suspeito" && (
                  <button
                    onClick={() => aprovar(review.id)}
                    title="Aprovar"
                    className="flex items-center gap-1.5 px-3 py-2 border border-green-200 text-green-600 text-xs tracking-[2px] uppercase hover:bg-green-50 transition-colors"
                  >
                    <Check size={13} />
                    Aprovar
                  </button>
                )}
                <button
                  onClick={() => remover(review.id)}
                  title="Remover"
                  className="flex items-center gap-1.5 px-3 py-2 border border-red-200 text-red-400 text-xs tracking-[2px] uppercase hover:bg-red-50 transition-colors"
                >
                  <Trash size={13} />
                  Remover
                </button>
              </div>
            </div>
          </div>
        ))}

        {reviewsFiltradas.length === 0 && (
          <div className="bg-white rounded-xl p-16 flex flex-col items-center gap-3">
            <Star size={40} className="text-gray-200" />
            <p className="text-sm text-[#888]">
              {filtro === "suspeito"
                ? "Nenhuma avaliação suspeita"
                : "Nenhuma avaliação encontrada"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
