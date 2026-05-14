"use client";

import { useState } from "react";
import {
  PackageIcon,
  ArrowRightIcon,
  CheckCircleIcon,
  CircleIcon,
} from "@phosphor-icons/react";
import Link from "next/link";

const pedidosExemplo = [
  {
    id: "#RL-2026-001",
    data: "10/05/2026",
    status: "Entregue",
    total: 189.9,
    itens: [{ nome: "Vibrador Premium", preco: 189.9, qty: 1 }],
    timeline: [
      { label: "Pedido realizado", data: "10/05/2026 14:32", concluido: true },
      {
        label: "Pagamento confirmado",
        data: "10/05/2026 14:45",
        concluido: true,
      },
      { label: "Em separação", data: "11/05/2026 09:10", concluido: true },
      { label: "Em transporte", data: "12/05/2026 08:00", concluido: true },
      { label: "Entregue", data: "13/05/2026 11:22", concluido: true },
    ],
  },
  {
    id: "#RL-2026-002",
    data: "05/05/2026",
    status: "Em transporte",
    total: 349.8,
    itens: [
      { nome: "Kit Sensações", preco: 249.9, qty: 1 },
      { nome: "Óleo Sensual", preco: 99.9, qty: 1 },
    ],
    timeline: [
      { label: "Pedido realizado", data: "05/05/2026 10:15", concluido: true },
      {
        label: "Pagamento confirmado",
        data: "05/05/2026 10:30",
        concluido: true,
      },
      { label: "Em separação", data: "06/05/2026 08:45", concluido: true },
      { label: "Em transporte", data: "07/05/2026 07:30", concluido: true },
      { label: "Entregue", data: null, concluido: false },
    ],
  },
  {
    id: "#RL-2026-003",
    data: "01/05/2026",
    status: "Processando",
    total: 89.9,
    itens: [{ nome: "Óleo Massagem Sensual", preco: 89.9, qty: 1 }],
    timeline: [
      { label: "Pedido realizado", data: "01/05/2026 20:10", concluido: true },
      {
        label: "Pagamento confirmado",
        data: "01/05/2026 20:25",
        concluido: true,
      },
      { label: "Em separação", data: null, concluido: false },
      { label: "Em transporte", data: null, concluido: false },
      { label: "Entregue", data: null, concluido: false },
    ],
  },
];

const statusColor: Record<string, string> = {
  Entregue: "bg-green-50 text-green-600",
  "Em transporte": "bg-blue-50 text-blue-600",
  Processando: "bg-yellow-50 text-yellow-600",
  Cancelado: "bg-red-50 text-red-500",
};

export default function OrdersPage() {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <div className="flex flex-col gap-6">
      <div className="bg-white rounded-xl p-8">
        <div className="mb-6">
          <h1 className="font-titulo text-3xl text-(--color-texto)">
            Meus <span className="text-(--color-primaria)">pedidos</span>
          </h1>
          <p className="text-sm text-[#888] mt-1">
            Acompanhe o histórico e status das suas compras
          </p>
        </div>

        {pedidosExemplo.length > 0 ? (
          <div className="flex flex-col divide-y divide-gray-100">
            {pedidosExemplo.map((pedido) => (
              <div key={pedido.id}>
                {/* LINHA DO PEDIDO */}
                <button
                  onClick={() =>
                    setOpenId(openId === pedido.id ? null : pedido.id)
                  }
                  className="w-full flex items-center justify-between py-5 text-left hover:bg-gray-50 px-2 rounded-lg transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#fdf0f1] to-[#f0d0d3] flex items-center justify-center shrink-0">
                      <PackageIcon
                        size={18}
                        className="text-(--color-primaria)"
                      />
                    </div>
                    <div className="flex flex-col gap-0.5">
                      <span className="text-sm font-medium text-(--color-texto)">
                        {pedido.id}
                      </span>
                      <span className="font-corpo text-xs text-[#888]">
                        {pedido.data} · {pedido.itens.length}{" "}
                        {pedido.itens.length === 1 ? "item" : "itens"}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-6">
                    <span
                      className={`text-xs px-3 py-1 rounded-full font-medium ${statusColor[pedido.status]}`}
                    >
                      {pedido.status}
                    </span>
                    <span className="font-corpo text-sm font-semibold text-(--color-texto)">
                      R$ {pedido.total.toFixed(2).replace(".", ",")}
                    </span>
                    <ArrowRightIcon
                      size={16}
                      className={`text-[#aaa] transition-transform duration-300 ${openId === pedido.id ? "rotate-90" : ""}`}
                    />
                  </div>
                </button>

                {/* ACCORDION */}
                {openId === pedido.id && (
                  <div className="px-2 pb-6 flex gap-12">
                    {/* ITENS */}
                    <div className="flex-1 flex flex-col gap-3">
                      <p className="text-xs tracking-[2px] uppercase text-[#aaa] font-medium mb-1">
                        Itens do pedido
                      </p>
                      {pedido.itens.map((item, i) => (
                        <div
                          key={i}
                          className="flex justify-between items-center py-3 border-b border-gray-50"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#fdf0f1] to-[#f0d0d3]" />
                            <div>
                              <p className="text-sm text-(--color-texto)">
                                {item.nome}
                              </p>
                              <p className="font-corpo text-xs text-[#888]">
                                Qtd: {item.qty}
                              </p>
                            </div>
                          </div>
                          <p className="font-corpo text-sm font-semibold text-(--color-primaria)">
                            R$ {item.preco.toFixed(2).replace(".", ",")}
                          </p>
                        </div>
                      ))}

                      <div className="flex justify-between items-center pt-2">
                        <span className="text-xs text-[#888]">
                          Total do pedido
                        </span>
                        <span className="font-corpo text-sm font-bold text-(--color-texto)">
                          R$ {pedido.total.toFixed(2).replace(".", ",")}
                        </span>
                      </div>
                    </div>

                    {/* TIMELINE */}
                    <div className="w-56 shrink-0">
                      <p className="text-xs tracking-[2px] uppercase text-[#aaa] font-medium mb-4">
                        Rastreamento
                      </p>
                      <div className="flex flex-col">
                        {pedido.timeline.map((step, i) => (
                          <div key={i} className="flex gap-3">
                            <div className="flex flex-col items-center">
                              {step.concluido ? (
                                <CheckCircleIcon
                                  size={18}
                                  weight="fill"
                                  className="text-(--color-primaria) shrink-0"
                                />
                              ) : (
                                <CircleIcon
                                  size={18}
                                  className="text-gray-200 shrink-0"
                                />
                              )}
                              {i < pedido.timeline.length - 1 && (
                                <div
                                  className={`w-[2px] flex-1 my-1 ${step.concluido ? "bg-(--color-primaria)" : "bg-gray-100"}`}
                                  style={{ minHeight: 24 }}
                                />
                              )}
                            </div>
                            <div className="pb-4">
                              <p
                                className={`text-xs font-medium ${step.concluido ? "text-(--color-texto)" : "text-[#aaa]"}`}
                              >
                                {step.label}
                              </p>
                              {step.data && (
                                <p className="font-corpo text-[0.65rem] text-[#aaa] mt-0.5">
                                  {step.data}
                                </p>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 gap-4">
            <PackageIcon size={48} className="text-gray-200" />
            <p className="text-sm text-[#888]">
              Você ainda não fez nenhum pedido
            </p>
            <Link
              href="/products"
              className="text-xs tracking-[2px] uppercase text-(--color-primaria) border-b border-(--color-primaria)"
            >
              Ver produtos
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
