"use client";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { Package, ShoppingCart, Star, TrendUp } from "@phosphor-icons/react";

const vendasPorCategoria = [
  { name: "Para Ela", value: 45, color: "#a31621" },
  { name: "Para Ele", value: 28, color: "#c94050" },
  { name: "Sadomasoquismo", value: 15, color: "#e07080" },
  { name: "Geral", value: 12, color: "#f0b0b8" },
];

const produtosMaisVendidos = [
  { nome: "Vibrador Premium", categoria: "Para Ela", vendas: 47, estoque: 12 },
  { nome: "Kit Sensações", categoria: "Para Ela", vendas: 35, estoque: 8 },
  {
    nome: "Masturbador Premium",
    categoria: "Para Ele",
    vendas: 29,
    estoque: 15,
  },
  { nome: "Óleo Massagem", categoria: "Geral", vendas: 24, estoque: 32 },
  { nome: "Algemas Luxo", categoria: "Sadomasoquismo", vendas: 18, estoque: 5 },
];

const pedidosRecentes = [
  {
    id: "#RL-2026-041",
    cliente: "Ana S.",
    total: 189.9,
    status: "Processando",
    data: "13/05/2026",
  },
  {
    id: "#RL-2026-040",
    cliente: "Carlos M.",
    total: 349.8,
    status: "Em transporte",
    data: "12/05/2026",
  },
  {
    id: "#RL-2026-039",
    cliente: "Mariana R.",
    total: 89.9,
    status: "Entregue",
    data: "11/05/2026",
  },
  {
    id: "#RL-2026-038",
    cliente: "Pedro L.",
    total: 259.9,
    status: "Entregue",
    data: "10/05/2026",
  },
];

const statusColor: Record<string, string> = {
  Processando: "bg-yellow-50 text-yellow-600",
  "Em transporte": "bg-blue-50 text-blue-600",
  Entregue: "bg-green-50 text-green-600",
  Cancelado: "bg-red-50 text-red-500",
};

const metricas = [
  {
    label: "Vendas hoje",
    valor: "R$ 1.289,50",
    sub: "+12% vs ontem",
    icon: TrendUp,
    cor: "text-green-500",
  },
  {
    label: "Pedidos pendentes",
    valor: "8",
    sub: "3 aguardando envio",
    icon: ShoppingCart,
    cor: "text-yellow-500",
  },
  {
    label: "Produtos ativos",
    valor: "42",
    sub: "3 com estoque baixo",
    icon: Package,
    cor: "text-blue-500",
  },
  {
    label: "Avaliações novas",
    valor: "5",
    sub: "2 aguardando revisão",
    icon: Star,
    cor: "text-purple-500",
  },
];

export default function AdminDashboard() {
  return (
    <div className="flex flex-col gap-6">
      {/* HEADER */}
      <div>
        <h1 className="font-titulo text-3xl text-(--color-texto)">Dashboard</h1>
        <p className="font-corpo text-sm text-[#888] mt-1">
          Visão geral da Real Luxery — 13/05/2026
        </p>
      </div>

      {/* MÉTRICAS */}
      <div className="grid grid-cols-4 gap-4">
        {metricas.map((m) => (
          <div
            key={m.label}
            className="bg-white rounded-xl p-5 flex flex-col gap-3"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs text-[#888] tracking-wide">
                {m.label}
              </span>
              <m.icon size={18} className={m.cor} />
            </div>
            <p className="font-corpo text-2xl font-bold text-(--color-texto)">
              {m.valor}
            </p>
            <p className="font-corpo text-xs text-[#888]">{m.sub}</p>
          </div>
        ))}
      </div>

      {/* GRÁFICO + PRODUTOS EM ALTA */}
      <div className="grid grid-cols-2 gap-6">
        {/* GRÁFICO CIRCULAR */}
        <div className="bg-white rounded-xl p-6">
          <h2 className="font-titulo text-xl text-(--color-texto) mb-1">
            Vendas por{" "}
            <span className="text-(--color-primaria)">categoria</span>
          </h2>
          <p className="font-corpo text-xs text-[#888] mb-6">Últimos 30 dias</p>
          <ResponsiveContainer width="100%" height={240}>
            <PieChart>
              <Pie
                data={vendasPorCategoria}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={3}
                dataKey="value"
              >
                {vendasPorCategoria.map((entry, index) => (
                  <Cell key={index} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value) => [`${value}%`, "Participação"]}
                contentStyle={{
                  fontSize: "11px",
                  border: "1px solid #f0f0f0",
                  borderRadius: "8px",
                }}
              />
              <Legend
                iconType="circle"
                iconSize={8}
                formatter={(value) => (
                  <span style={{ fontSize: "11px", color: "#888" }}>
                    {value}
                  </span>
                )}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* PRODUTOS MAIS VENDIDOS */}
        <div className="bg-white rounded-xl p-6">
          <h2 className="font-titulo text-xl text-(--color-texto) mb-1">
            Mais <span className="text-(--color-primaria)">vendidos</span>
          </h2>
          <p className="font-corpo text-xs text-[#888] mb-6">Últimos 30 dias</p>
          <div className="flex flex-col divide-y divide-gray-50">
            {produtosMaisVendidos.map((produto, i) => (
              <div
                key={produto.nome}
                className="flex items-center justify-between py-3"
              >
                <div className="flex items-center gap-3">
                  <span className="font-corpo text-xs text-[#aaa] w-4">
                    {i + 1}
                  </span>
                  <div>
                    <p className="text-sm text-(--color-texto)">
                      {produto.nome}
                    </p>
                    <p className="font-corpo text-xs text-[#888]">
                      {produto.categoria}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="font-corpo text-xs text-[#888]">
                    {produto.vendas} vendas
                  </span>
                  <span
                    className={`font-corpo text-xs px-2 py-0.5 rounded-full ${produto.estoque <= 5 ? "bg-red-50 text-red-500" : "bg-green-50 text-green-600"}`}
                  >
                    {produto.estoque} em estoque
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* PEDIDOS RECENTES */}
      <div className="bg-white rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="font-titulo text-xl text-(--color-texto)">
              Pedidos <span className="text-(--color-primaria)">recentes</span>
            </h2>
          </div>
          <a
            href="/admin/orders"
            className="font-corpo text-xs tracking-[2px] uppercase text-(--color-primaria) hover:opacity-70 transition-opacity"
          >
            Ver todos →
          </a>
        </div>

        <div className="flex flex-col divide-y divide-gray-50">
          {pedidosRecentes.map((pedido) => (
            <div
              key={pedido.id}
              className="flex items-center justify-between py-4"
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
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
