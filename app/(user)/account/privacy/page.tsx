"use client";

import { useState } from "react";
import {
  ShieldCheck,
  DownloadSimple,
  Trash,
  Eye,
  WarningCircle,
} from "@phosphor-icons/react";

export default function PrivacyPage() {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteInput, setDeleteInput] = useState("");

  return (
    <div className="flex flex-col gap-6">
      {/* HEADER */}
      <div className="bg-white rounded-xl p-8">
        <div className="flex items-center gap-3 mb-2">
          <ShieldCheck size={24} className="text-(--color-primaria)" />
          <h1 className="font-titulo text-3xl text-(--color-texto)">
            Privacidade & <span className="text-(--color-primaria)">LGPD</span>
          </h1>
        </div>
        <p className="text-sm text-[#888]">
          Seus direitos garantidos pela Lei Geral de Proteção de Dados (Lei nº
          13.709/2018)
        </p>
      </div>

      {/* SEUS DIREITOS */}
      <div className="bg-white rounded-xl p-8">
        <h2 className="font-titulo text-xl text-(--color-texto) mb-4">
          Seus direitos
        </h2>
        <div className="grid grid-cols-2 gap-4">
          {[
            {
              titulo: "Acesso",
              descricao:
                "Você pode ver todos os dados que temos sobre você a qualquer momento.",
            },
            {
              titulo: "Correção",
              descricao:
                "Você pode corrigir dados incorretos ou desatualizados na aba Meus dados.",
            },
            {
              titulo: "Portabilidade",
              descricao:
                "Você pode exportar seus dados em formato legível a qualquer momento.",
            },
            {
              titulo: "Exclusão",
              descricao:
                "Você pode solicitar a exclusão completa da sua conta e dados.",
            },
            {
              titulo: "Revogação",
              descricao:
                "Você pode revogar consentimentos dados anteriormente.",
            },
            {
              titulo: "Oposição",
              descricao:
                "Você pode se opor ao tratamento de dados em certas situações.",
            },
          ].map((right) => (
            <div
              key={right.titulo}
              className="p-4 border border-gray-100 rounded-lg"
            >
              <p className="text-xs font-semibold text-(--color-primaria) tracking-[2px] uppercase mb-1">
                {right.titulo}
              </p>
              <p className="text-xs text-[#888] leading-relaxed">
                {right.descricao}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* VER MEUS DADOS */}
      <div className="bg-white rounded-xl p-8">
        <div className="flex items-start justify-between">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <Eye size={18} className="text-(--color-primaria)" />
              <h2 className="font-titulo text-xl text-(--color-texto)">
                Meus dados coletados
              </h2>
            </div>
            <p className="text-sm text-[#888]">
              Veja quais dados temos armazenados sobre você
            </p>
          </div>
        </div>

        <div className="mt-6 flex flex-col divide-y divide-gray-50">
          {[
            {
              categoria: "Dados pessoais",
              itens: "Nome, e-mail, telefone, CPF, data de nascimento",
            },
            {
              categoria: "Endereços",
              itens: "Endereços de entrega cadastrados",
            },
            {
              categoria: "Pedidos",
              itens: "Histórico de compras e status de entrega",
            },
            {
              categoria: "Navegação",
              itens: "Cookies de sessão e preferências",
            },
          ].map((item) => (
            <div
              key={item.categoria}
              className="py-4 flex justify-between items-start"
            >
              <span className="text-xs font-medium text-(--color-texto) tracking-wide">
                {item.categoria}
              </span>
              <span className="font-corpo text-xs text-[#888] text-right max-w-xs">
                {item.itens}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* EXPORTAR DADOS */}
      <div className="bg-white rounded-xl p-8">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <DownloadSimple size={18} className="text-(--color-primaria)" />
              <h2 className="font-titulo text-xl text-(--color-texto)">
                Exportar meus dados
              </h2>
            </div>
            <p className="text-sm text-[#888]">
              Baixe uma cópia de todos os seus dados em formato JSON
            </p>
          </div>
          <button className="px-6 py-2.5 border border-(--color-primaria) text-(--color-primaria) text-xs tracking-[2px] uppercase hover:bg-(--color-primaria) hover:text-white transition-all flex items-center gap-2">
            <DownloadSimple size={14} />
            Exportar dados
          </button>
        </div>
      </div>

      {/* DELETAR CONTA */}
      <div className="bg-white rounded-xl p-8 border-2 border-red-100">
        <div className="flex items-center gap-2 mb-2">
          <Trash size={18} className="text-red-400" />
          <h2 className="font-titulo text-xl text-red-500">
            Excluir minha conta
          </h2>
        </div>
        <p className="text-sm text-[#888] mb-6 leading-relaxed">
          Esta ação é{" "}
          <strong className="text-(--color-texto)">
            permanente e irreversível
          </strong>
          . Todos os seus dados, histórico de pedidos e informações pessoais
          serão removidos permanentemente dos nossos servidores em até 30 dias,
          conforme a LGPD.
        </p>

        {!showDeleteConfirm ? (
          <button
            onClick={() => setShowDeleteConfirm(true)}
            className="px-6 py-2.5 border border-red-300 text-red-400 text-xs tracking-[2px] uppercase hover:bg-red-50 transition-colors"
          >
            Solicitar exclusão da conta
          </button>
        ) : (
          <div className="flex flex-col gap-4 p-5 bg-red-50 rounded-lg border border-red-100">
            <div className="flex items-center gap-2 text-red-500">
              <WarningCircle size={16} />
              <span className="text-xs font-medium">
                Digite <strong>EXCLUIR MINHA CONTA</strong> para confirmar
              </span>
            </div>
            <input
              type="text"
              value={deleteInput}
              onChange={(e) => setDeleteInput(e.target.value)}
              placeholder="EXCLUIR MINHA CONTA"
              className="w-full px-4 py-3 border border-red-200 rounded text-sm outline-none focus:border-red-400 transition-colors bg-white"
            />
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowDeleteConfirm(false);
                  setDeleteInput("");
                }}
                className="px-6 py-2 border border-gray-200 text-xs tracking-[2px] uppercase text-[#888] hover:border-gray-300 transition-colors"
              >
                Cancelar
              </button>
              <button
                disabled={deleteInput !== "EXCLUIR MINHA CONTA"}
                className="px-6 py-2 bg-red-500 text-white text-xs tracking-[2px] uppercase hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Confirmar exclusão
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
