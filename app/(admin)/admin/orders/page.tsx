"use client";

import { useState } from "react";
import {
  MagnifyingGlass,
  FunnelSimple,
  ArrowRight,
  CheckCircle,
  Circle,
  PencilSimple,
  WarningCircle,
} from "@phosphor-icons/react";

const pedidos = [
  {
    id: "#RL-2026-041",
    cliente: "Ana S.",
    endereco: "Rua das Flores, 123 - Apto 45, Centro, Fortaleza/CE",
    cep: "60000-000",
    total: 189.9,
    status: "Processando",
    data: "13/05/2026",
    itens: [{ nome: "Vibrador Premium", qty: 1, preco: 189.9 }],
    timeline: [
      { label: "Pedido realizado", concluido: true, data: "13/05/2026 14:32" },
      {
        label: "Pagamento confirmado",
        concluido: true,
        data: "13/05/2026 14:45",
      },
      { label: "Em separação", concluido: false, data: null },
      { label: "Em transporte", concluido: false, data: null },
      { label: "Entregue", concluido: false, data: null },
    ],
  },
  {
    id: "#RL-2026-040",
    cliente: "Carlos M.",
    endereco: "Av. Beira Mar, 4500, Meireles, Fortaleza/CE",
    cep: "60165-121",
    total: 349.8,
    status: "Em transporte",
    data: "12/05/2026",
    itens: [
      { nome: "Kit Sensações", qty: 1, preco: 249.9 },
      { nome: "Óleo Sensual", qty: 1, preco: 99.9 },
    ],
    timeline: [
      { label: "Pedido realizado", concluido: true, data: "12/05/2026 10:15" },
      {
        label: "Pagamento confirmado",
        concluido: true,
        data: "12/05/2026 10:30",
      },
      { label: "Em separação", concluido: true, data: "12/05/2026 14:00" },
      { label: "Em transporte", concluido: true, data: "13/05/2026 08:00" },
      { label: "Entregue", concluido: false, data: null },
    ],
  },
  {
    id: "#RL-2026-039",
    cliente: "Mariana R.",
    endereco: "Rua Monsenhor Bruno, 890, Aldeota, Fortaleza/CE",
    cep: "60115-191",
    total: 89.9,
    status: "Entregue",
    data: "11/05/2026",
    itens: [{ nome: "Óleo Massagem Sensual", qty: 1, preco: 89.9 }],
    timeline: [
      { label: "Pedido realizado", concluido: true, data: "11/05/2026 09:00" },
      {
        label: "Pagamento confirmado",
        concluido: true,
        data: "11/05/2026 09:15",
      },
      { label: "Em separação", concluido: true, data: "11/05/2026 11:00" },
      { label: "Em transporte", concluido: true, data: "12/05/2026 08:00" },
      { label: "Entregue", concluido: true, data: "13/05/2026 11:22" },
    ],
  },
];

const statusColor: Record<string, string> = {
  Processando: "bg-yellow-50 text-yellow-600",
  "Em separação": "bg-orange-50 text-orange-600",
  "Em transporte": "bg-blue-50 text-blue-600",
  Entregue: "bg-green-50 text-green-600",
  Cancelado: "bg-red-50 text-red-500",
};

type RastreioState = {
  codigo: string;
  salvo: boolean;
  editando: boolean;
  inputTemp: string;
};

export default function AdminOrdersPage() {
  const [openId, setOpenId] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [statusFiltro, setStatusFiltro] = useState("");
  const [rastreios, setRastreios] = useState<Record<string, RastreioState>>({});

  const pedidosFiltrados = pedidos.filter((p) => {
    const matchSearch =
      p.id.toLowerCase().includes(search.toLowerCase()) ||
      p.cliente.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFiltro ? p.status === statusFiltro : true;
    return matchSearch && matchStatus;
  });

  const getRastreio = (id: string): RastreioState =>
    rastreios[id] ?? {
      codigo: "",
      salvo: false,
      editando: false,
      inputTemp: "",
    };

  const salvarCodigo = (id: string) => {
    const r = getRastreio(id);
    if (!r.inputTemp.trim()) return;
    setRastreios((prev) => ({
      ...prev,
      [id]: {
        codigo: r.inputTemp.trim().toUpperCase(),
        salvo: true,
        editando: false,
        inputTemp: "",
      },
    }));
  };

  const iniciarEdicao = (id: string) => {
    const r = getRastreio(id);
    setRastreios((prev) => ({
      ...prev,
      [id]: { ...r, editando: true, inputTemp: r.codigo },
    }));
  };

  const cancelarEdicao = (id: string) => {
    const r = getRastreio(id);
    setRastreios((prev) => ({
      ...prev,
      [id]: { ...r, editando: false, inputTemp: "" },
    }));
  };

  const confirmarEdicao = (id: string) => {
    const r = getRastreio(id);
    if (!r.inputTemp.trim()) return;
    setRastreios((prev) => ({
      ...prev,
      [id]: {
        codigo: r.inputTemp.trim().toUpperCase(),
        salvo: true,
        editando: false,
        inputTemp: "",
      },
    }));
  };

  return (
    <div className="flex flex-col gap-6">
      {/* HEADER */}
      <div>
        <h1 className="font-titulo text-3xl text-(--color-texto)">Pedidos</h1>
        <p className="font-corpo text-sm text-[#888] mt-1">
          Gerencie e acompanhe todos os pedidos
        </p>
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
            placeholder="Buscar por ID ou cliente..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded text-sm outline-none focus:border-(--color-primaria) transition-colors"
          />
        </div>
        <div className="flex items-center gap-2">
          <FunnelSimple size={14} className="text-[#aaa]" />
          <select
            value={statusFiltro}
            onChange={(e) => setStatusFiltro(e.target.value)}
            className="border border-gray-200 rounded px-3 py-2 text-xs outline-none focus:border-(--color-primaria) text-[#888]"
          >
            <option value="">Todos os status</option>
            <option value="Processando">Processando</option>
            <option value="Em separação">Em separação</option>
            <option value="Em transporte">Em transporte</option>
            <option value="Entregue">Entregue</option>
            <option value="Cancelado">Cancelado</option>
          </select>
        </div>
      </div>

      {/* LISTA */}
      <div className="bg-white rounded-xl overflow-hidden">
        <div className="flex flex-col divide-y divide-gray-50">
          {pedidosFiltrados.map((pedido) => {
            const rastreio = getRastreio(pedido.id);
            return (
              <div key={pedido.id}>
                {/* LINHA */}
                <button
                  onClick={() =>
                    setOpenId(openId === pedido.id ? null : pedido.id)
                  }
                  className="w-full flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition-colors text-left"
                >
                  <div className="flex flex-col gap-0.5">
                    <span className="text-sm font-medium text-(--color-texto)">
                      {pedido.id}
                    </span>
                    <span className="font-corpo text-xs text-[#888]">
                      {pedido.cliente} · {pedido.data}
                    </span>
                  </div>
                  <div className="flex items-center gap-6">
                    <span
                      className={`font-corpo text-xs px-3 py-1 rounded-full ${statusColor[pedido.status]}`}
                    >
                      {pedido.status}
                    </span>
                    <span className="font-corpo text-sm font-semibold text-(--color-texto)">
                      R$ {pedido.total.toFixed(2).replace(".", ",")}
                    </span>
                    <ArrowRight
                      size={16}
                      className={`text-[#aaa] transition-transform duration-300 ${openId === pedido.id ? "rotate-90" : ""}`}
                    />
                  </div>
                </button>

                {/* ACCORDION */}
                {openId === pedido.id && (
                  <div className="px-6 pb-6 grid grid-cols-3 gap-8 bg-gray-50">
                    {/* ITENS */}
                    <div className="flex flex-col gap-3">
                      <p className="text-xs tracking-[2px] uppercase text-[#aaa] font-medium pt-4">
                        Itens
                      </p>
                      {pedido.itens.map((item, i) => (
                        <div
                          key={i}
                          className="flex justify-between items-center py-2 border-b border-gray-100"
                        >
                          <div>
                            <p className="text-sm text-(--color-texto)">
                              {item.nome}
                            </p>
                            <p className="font-corpo text-xs text-[#888]">
                              Qtd: {item.qty}
                            </p>
                          </div>
                          <p className="font-corpo text-sm font-semibold text-(--color-primaria)">
                            R$ {item.preco.toFixed(2).replace(".", ",")}
                          </p>
                        </div>
                      ))}
                      <div className="flex justify-between pt-1">
                        <span className="font-corpo text-xs text-[#888]">
                          Total
                        </span>
                        <span className="font-corpo text-sm font-bold text-(--color-texto)">
                          R$ {pedido.total.toFixed(2).replace(".", ",")}
                        </span>
                      </div>
                    </div>

                    {/* ENDEREÇO */}
                    <div className="flex flex-col gap-3">
                      <p className="text-xs tracking-[2px] uppercase text-[#aaa] font-medium pt-4">
                        Endereço de entrega
                      </p>
                      <div className="flex flex-col gap-1">
                        <p className="text-sm font-medium text-(--color-texto)">
                          {pedido.cliente}
                        </p>
                        <p className="font-corpo text-xs text-[#888] leading-relaxed">
                          {pedido.endereco}
                        </p>
                        <p className="font-corpo text-xs text-[#888]">
                          CEP: {pedido.cep}
                        </p>
                      </div>
                    </div>

                    {/* TIMELINE */}
                    <div className="flex flex-col gap-3">
                      <p className="text-xs tracking-[2px] uppercase text-[#aaa] font-medium pt-4">
                        Rastreamento
                      </p>
                      <div className="flex flex-col">
                        {pedido.timeline.map((step, i) => (
                          <div key={i} className="flex gap-3">
                            <div className="flex flex-col items-center">
                              {step.concluido ? (
                                <CheckCircle
                                  size={16}
                                  weight="fill"
                                  className="text-(--color-primaria) shrink-0"
                                />
                              ) : (
                                <Circle
                                  size={16}
                                  className="text-gray-200 shrink-0"
                                />
                              )}
                              {i < pedido.timeline.length - 1 && (
                                <div
                                  className={`w-[2px] flex-1 my-1 ${step.concluido ? "bg-(--color-primaria)" : "bg-gray-100"}`}
                                  style={{ minHeight: 16 }}
                                />
                              )}
                            </div>
                            <div className="pb-3">
                              <p
                                className={`text-xs ${step.concluido ? "text-(--color-texto)" : "text-[#aaa]"}`}
                              >
                                {step.label}
                              </p>
                              {step.data && (
                                <p className="font-corpo text-[0.6rem] text-[#aaa]">
                                  {step.data}
                                </p>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* AÇÃO */}
                      {pedido.status === "Processando" && (
                        <p className="font-corpo text-xs text-[#888] mt-1">
                          Aguardando confirmação do pagamento via gateway.
                        </p>
                      )}

                      {pedido.status === "Em separação" && (
                        <p className="font-corpo text-xs text-[#888] mt-1">
                          Produto em separação. Poste nos Correios e registre o
                          código ao enviar.
                        </p>
                      )}

                      {pedido.status === "Em transporte" && (
                        <div className="flex flex-col gap-2 mt-1">
                          <label className="text-xs tracking-[2px] uppercase text-(--color-texto) font-medium">
                            Código de rastreio
                          </label>

                          {/* JÁ SALVO E NÃO EDITANDO */}
                          {rastreio.salvo && !rastreio.editando && (
                            <div className="flex flex-col gap-1">
                              <div className="flex items-center gap-2 px-3 py-2 bg-green-50 border border-green-100 rounded">
                                <span className="font-mono text-xs text-green-700 flex-1">
                                  {rastreio.codigo}
                                </span>
                                <span className="text-[0.6rem] text-green-600 tracking-wide">
                                  Registrado
                                </span>
                              </div>
                              <button
                                onClick={() => iniciarEdicao(pedido.id)}
                                className="flex items-center gap-1.5 text-[0.65rem] text-[#aaa] hover:text-(--color-primaria) transition-colors self-start mt-1"
                              >
                                <PencilSimple size={11} />
                                Corrigir código
                              </button>
                              <p className="font-corpo text-[0.6rem] text-[#aaa]">
                                Cliente notificado. Acompanhamento automático
                                via Correios.
                              </p>
                            </div>
                          )}

                          {/* EDITANDO CÓDIGO JÁ SALVO */}
                          {rastreio.salvo && rastreio.editando && (
                            <div className="flex flex-col gap-2">
                              <div className="flex items-center gap-2 p-2 bg-yellow-50 border border-yellow-100 rounded">
                                <WarningCircle
                                  size={13}
                                  className="text-yellow-500 shrink-0"
                                />
                                <span className="text-[0.6rem] text-yellow-700">
                                  Alterações no código de rastreio ficam
                                  registradas no log do sistema.
                                </span>
                              </div>
                              <div className="flex gap-2">
                                <input
                                  type="text"
                                  value={rastreio.inputTemp}
                                  onChange={(e) =>
                                    setRastreios((prev) => ({
                                      ...prev,
                                      [pedido.id]: {
                                        ...getRastreio(pedido.id),
                                        inputTemp: e.target.value.toUpperCase(),
                                      },
                                    }))
                                  }
                                  className="flex-1 px-3 py-2 border border-yellow-300 rounded text-xs outline-none focus:border-yellow-500 transition-colors font-mono"
                                />
                                <button
                                  onClick={() => confirmarEdicao(pedido.id)}
                                  disabled={!rastreio.inputTemp.trim()}
                                  className="px-3 py-2 bg-(--color-primaria) text-white text-xs tracking-[2px] uppercase hover:opacity-90 transition-opacity disabled:opacity-40"
                                >
                                  Salvar
                                </button>
                                <button
                                  onClick={() => cancelarEdicao(pedido.id)}
                                  className="px-3 py-2 border border-gray-200 text-xs tracking-[2px] uppercase text-[#888] hover:border-gray-300 transition-colors"
                                >
                                  Cancelar
                                </button>
                              </div>
                            </div>
                          )}

                          {/* AINDA NÃO SALVO */}
                          {!rastreio.salvo && (
                            <div className="flex flex-col gap-2">
                              <div className="flex gap-2">
                                <input
                                  type="text"
                                  placeholder="Ex: BR123456789BR"
                                  value={rastreio.inputTemp}
                                  onChange={(e) =>
                                    setRastreios((prev) => ({
                                      ...prev,
                                      [pedido.id]: {
                                        ...getRastreio(pedido.id),
                                        inputTemp: e.target.value.toUpperCase(),
                                      },
                                    }))
                                  }
                                  className="flex-1 px-3 py-2 border border-gray-200 rounded text-xs outline-none focus:border-(--color-primaria) transition-colors font-mono"
                                />
                                <button
                                  onClick={() => salvarCodigo(pedido.id)}
                                  disabled={!rastreio.inputTemp.trim()}
                                  className="px-3 py-2 bg-(--color-primaria) text-white text-xs tracking-[2px] uppercase hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed"
                                >
                                  Salvar
                                </button>
                              </div>
                              <p className="font-corpo text-[0.6rem] text-[#aaa]">
                                O cliente será notificado automaticamente após
                                salvar.
                              </p>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
