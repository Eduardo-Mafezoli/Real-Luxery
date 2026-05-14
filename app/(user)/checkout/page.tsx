"use client";

import { useState } from "react";
import Link from "next/link";
import {
  MapPin,
  CreditCard,
  CheckCircle,
  Plus,
  Lock,
  ArrowLeft,
  ArrowRight,
  Barcode,
  QrCode,
} from "@phosphor-icons/react";
import { useCartStore } from "@/app/store/useCartStore";

const enderecosSalvos = [
  {
    id: 1,
    label: "Casa",
    recipient: "Eduardo Mafezoli",
    street: "Rua das Flores, 123 - Apto 45",
    neighborhood: "Centro",
    city: "Fortaleza",
    state: "CE",
    zip: "60000-000",
  },
  {
    id: 2,
    label: "Trabalho",
    recipient: "Eduardo Mafezoli",
    street: "Av. Beira Mar, 4500",
    neighborhood: "Meireles",
    city: "Fortaleza",
    state: "CE",
    zip: "60165-121",
  },
];

type Etapa = 1 | 2 | 3;
type MetodoPagamento = "cartao" | "pix" | "boleto";

const steps = [
  { num: 1, label: "Endereço", icon: MapPin },
  { num: 2, label: "Pagamento", icon: CreditCard },
  { num: 3, label: "Confirmação", icon: CheckCircle },
];

export default function CheckoutPage() {
  const { items, total, totalItems } = useCartStore();
  const [etapa, setEtapa] = useState<Etapa>(1);
  const [enderecoSelecionado, setEnderecoSelecionado] = useState<number | null>(
    1,
  );
  const [novoEndereco, setNovoEndereco] = useState(false);
  const [metodoPagamento, setMetodoPagamento] =
    useState<MetodoPagamento>("cartao");
  const [pedidoConfirmado, setPedidoConfirmado] = useState(false);

  const enderecoAtual = enderecosSalvos.find(
    (e) => e.id === enderecoSelecionado,
  );

  if (items.length === 0 && !pedidoConfirmado) {
    return (
      <div className="min-h-screen bg-(--color-fundo) flex flex-col items-center justify-center gap-6">
        <p className="font-titulo text-2xl text-(--color-texto)">
          Seu carrinho está vazio
        </p>
        <Link
          href="/products"
          className="px-8 py-3 bg-(--color-primaria) text-white text-xs tracking-[2px] uppercase hover:opacity-90 transition-opacity"
        >
          Ver produtos
        </Link>
      </div>
    );
  }

  if (pedidoConfirmado) {
    return (
      <div className="min-h-screen bg-(--color-fundo) flex flex-col items-center justify-center gap-8 px-8">
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="w-20 h-20 rounded-full bg-green-50 flex items-center justify-center">
            <CheckCircle size={40} weight="fill" className="text-green-500" />
          </div>
          <h1 className="font-titulo text-4xl text-(--color-texto)">
            Pedido <span className="text-(--color-primaria)">confirmado!</span>
          </h1>
          <p className="font-corpo text-sm text-[#888] max-w-sm">
            Seu pedido foi recebido e está sendo processado. Você receberá um
            e-mail de confirmação em breve.
          </p>
          <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg border border-gray-100">
            <span className="font-corpo text-xs text-[#888]">
              Número do pedido:
            </span>
            <span className="font-mono text-xs font-bold text-(--color-texto)">
              #RL-2026-042
            </span>
          </div>
        </div>
        <div className="flex gap-4">
          <Link
            href="/account/orders"
            className="px-6 py-3 border border-(--color-primaria) text-(--color-primaria) text-xs tracking-[2px] uppercase hover:bg-(--color-primaria) hover:text-white transition-all"
          >
            Ver pedidos
          </Link>
          <Link
            href="/products"
            className="px-6 py-3 bg-(--color-primaria) text-white text-xs tracking-[2px] uppercase hover:opacity-90 transition-opacity"
          >
            Continuar comprando
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-(--color-fundo)">
      {/* BREADCRUMB */}
      <div className="bg-white border-b border-gray-100 px-[6rem] py-4">
        <div className="flex items-center gap-2 text-xs text-[#888]">
          <Link
            href="/"
            className="hover:text-(--color-primaria) transition-colors"
          >
            Início
          </Link>
          <span>/</span>
          <Link
            href="/cart"
            className="hover:text-(--color-primaria) transition-colors"
          >
            Carrinho
          </Link>
          <span>/</span>
          <span className="text-(--color-texto)">Checkout</span>
        </div>
      </div>

      <div className="px-[6rem] py-12 max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-10">
          <h1 className="font-titulo text-4xl text-(--color-texto)">
            Finalizar <span className="text-(--color-primaria)">compra</span>
          </h1>
          <div className="flex items-center gap-2 text-xs text-[#888]">
            <Lock size={12} />
            <span>Compra 100% segura</span>
          </div>
        </div>

        {/* STEPPER */}
        <div className="flex items-center mb-10">
          {steps.map((step, i) => (
            <div
              key={step.num}
              className="flex items-center flex-1 last:flex-none"
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center transition-all
                  ${
                    etapa > step.num
                      ? "bg-green-500"
                      : etapa === step.num
                        ? "bg-(--color-primaria)"
                        : "bg-gray-100"
                  }`}
                >
                  {etapa > step.num ? (
                    <CheckCircle
                      size={16}
                      weight="fill"
                      className="text-white"
                    />
                  ) : (
                    <step.icon
                      size={14}
                      className={
                        etapa >= step.num ? "text-white" : "text-[#aaa]"
                      }
                    />
                  )}
                </div>
                <span
                  className={`text-xs tracking-wide font-medium ${etapa >= step.num ? "text-(--color-texto)" : "text-[#aaa]"}`}
                >
                  {step.label}
                </span>
              </div>
              {i < steps.length - 1 && (
                <div
                  className={`flex-1 h-[1px] mx-4 ${etapa > step.num ? "bg-green-400" : "bg-gray-200"}`}
                />
              )}
            </div>
          ))}
        </div>

        <div className="flex gap-10 items-start">
          {/* CONTEÚDO */}
          <div className="flex-1">
            {/* ETAPA 1 — ENDEREÇO */}
            {etapa === 1 && (
              <div className="flex flex-col gap-4">
                <div className="bg-white rounded-xl p-6">
                  <h2 className="font-titulo text-xl text-(--color-texto) mb-4">
                    Endereço de entrega
                  </h2>

                  <div className="grid grid-cols-2 gap-3 mb-4">
                    {enderecosSalvos.map((endereco) => (
                      <button
                        key={endereco.id}
                        onClick={() => {
                          setEnderecoSelecionado(endereco.id);
                          setNovoEndereco(false);
                        }}
                        className={`p-4 rounded-xl border-2 text-left transition-all
                          ${
                            enderecoSelecionado === endereco.id && !novoEndereco
                              ? "border-(--color-primaria) bg-[#fdf9f9]"
                              : "border-gray-100 hover:border-gray-200"
                          }`}
                      >
                        <p className="text-xs font-semibold text-(--color-primaria) tracking-[2px] uppercase mb-2">
                          {endereco.label}
                        </p>
                        <p className="text-sm text-(--color-texto)">
                          {endereco.recipient}
                        </p>
                        <p className="font-corpo text-xs text-[#888] mt-1">
                          {endereco.street}
                        </p>
                        <p className="font-corpo text-xs text-[#888]">
                          {endereco.neighborhood} · {endereco.city}/
                          {endereco.state}
                        </p>
                        <p className="font-corpo text-xs text-[#888]">
                          CEP: {endereco.zip}
                        </p>
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={() => {
                      setNovoEndereco(!novoEndereco);
                      setEnderecoSelecionado(null);
                    }}
                    className="flex items-center gap-2 text-xs tracking-[2px] uppercase text-(--color-primaria) hover:opacity-70 transition-opacity"
                  >
                    <Plus size={12} />
                    Usar outro endereço
                  </button>

                  {novoEndereco && (
                    <div className="grid grid-cols-2 gap-4 mt-4 pt-4 border-t border-gray-100">
                      {[
                        { label: "CEP", placeholder: "00000-000", col: 1 },
                        {
                          label: "Destinatário",
                          placeholder: "Nome completo",
                          col: 1,
                        },
                        { label: "Rua", placeholder: "Nome da rua", col: 2 },
                        { label: "Número", placeholder: "123", col: 1 },
                        {
                          label: "Complemento",
                          placeholder: "Opcional",
                          col: 1,
                        },
                        { label: "Bairro", placeholder: "Bairro", col: 1 },
                        { label: "Cidade", placeholder: "Cidade", col: 1 },
                        { label: "Estado", placeholder: "UF", col: 1 },
                      ].map((field) => (
                        <div
                          key={field.label}
                          className={field.col === 2 ? "col-span-2" : ""}
                        >
                          <label className="text-xs tracking-[2px] uppercase text-(--color-texto) font-medium block mb-2">
                            {field.label}
                          </label>
                          <input
                            type="text"
                            placeholder={field.placeholder}
                            className="w-full px-4 py-3 border border-gray-200 rounded text-sm outline-none focus:border-(--color-primaria) transition-colors"
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex justify-between">
                  <Link
                    href="/cart"
                    className="flex items-center gap-2 text-xs tracking-[2px] uppercase text-[#888] hover:text-(--color-primaria) transition-colors"
                  >
                    <ArrowLeft size={14} />
                    Voltar ao carrinho
                  </Link>
                  <button
                    disabled={!enderecoSelecionado && !novoEndereco}
                    onClick={() => setEtapa(2)}
                    className="flex items-center gap-2 px-8 py-3 bg-(--color-primaria) text-white text-xs tracking-[2px] uppercase hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Continuar
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            )}

            {/* ETAPA 2 — PAGAMENTO */}
            {etapa === 2 && (
              <div className="flex flex-col gap-4">
                <div className="bg-white rounded-xl p-6">
                  <h2 className="font-titulo text-xl text-(--color-texto) mb-4">
                    Forma de pagamento
                  </h2>

                  {/* MÉTODOS */}
                  <div className="flex gap-3 mb-6">
                    {(
                      [
                        { id: "cartao", label: "Cartão", icon: CreditCard },
                        { id: "pix", label: "PIX", icon: QrCode },
                        { id: "boleto", label: "Boleto", icon: Barcode },
                      ] as const
                    ).map((m) => (
                      <button
                        key={m.id}
                        onClick={() => setMetodoPagamento(m.id)}
                        className={`flex-1 flex flex-col items-center gap-2 py-4 rounded-xl border-2 transition-all
                          ${
                            metodoPagamento === m.id
                              ? "border-(--color-primaria) bg-[#fdf9f9]"
                              : "border-gray-100 hover:border-gray-200"
                          }`}
                      >
                        <m.icon
                          size={20}
                          className={
                            metodoPagamento === m.id
                              ? "text-(--color-primaria)"
                              : "text-[#aaa]"
                          }
                        />
                        <span
                          className={`text-xs tracking-wide font-medium ${metodoPagamento === m.id ? "text-(--color-primaria)" : "text-[#888]"}`}
                        >
                          {m.label}
                        </span>
                      </button>
                    ))}
                  </div>

                  {/* CARTÃO */}
                  {metodoPagamento === "cartao" && (
                    <div className="flex flex-col gap-4">
                      <div className="flex flex-col gap-2">
                        <label className="text-xs tracking-[2px] uppercase text-(--color-texto) font-medium">
                          Número do cartão
                        </label>
                        <input
                          type="text"
                          placeholder="0000 0000 0000 0000"
                          maxLength={19}
                          className="w-full px-4 py-3 border border-gray-200 rounded text-sm outline-none focus:border-(--color-primaria) transition-colors font-mono"
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label className="text-xs tracking-[2px] uppercase text-(--color-texto) font-medium">
                          Nome no cartão
                        </label>
                        <input
                          type="text"
                          placeholder="Como está impresso no cartão"
                          className="w-full px-4 py-3 border border-gray-200 rounded text-sm outline-none focus:border-(--color-primaria) transition-colors uppercase"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col gap-2">
                          <label className="text-xs tracking-[2px] uppercase text-(--color-texto) font-medium">
                            Validade
                          </label>
                          <input
                            type="text"
                            placeholder="MM/AA"
                            maxLength={5}
                            className="w-full px-4 py-3 border border-gray-200 rounded text-sm outline-none focus:border-(--color-primaria) transition-colors font-mono"
                          />
                        </div>
                        <div className="flex flex-col gap-2">
                          <label className="text-xs tracking-[2px] uppercase text-(--color-texto) font-medium">
                            CVV
                          </label>
                          <input
                            type="text"
                            placeholder="000"
                            maxLength={4}
                            className="w-full px-4 py-3 border border-gray-200 rounded text-sm outline-none focus:border-(--color-primaria) transition-colors font-mono"
                          />
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                        <label className="text-xs tracking-[2px] uppercase text-(--color-texto) font-medium">
                          Parcelamento
                        </label>
                        <select className="w-full px-4 py-3 border border-gray-200 rounded text-sm outline-none focus:border-(--color-primaria) transition-colors">
                          {[1, 2, 3, 6, 12].map((n) => (
                            <option key={n} value={n}>
                              {n}x de R${" "}
                              {(total() / n).toFixed(2).replace(".", ",")}
                              {n <= 3 ? " sem juros" : " com juros"}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="flex items-center gap-2 p-3 bg-(--color-fundo) rounded-lg">
                        <Lock size={13} className="text-[#aaa] shrink-0" />
                        <p className="font-corpo text-xs text-[#888]">
                          Seus dados de pagamento são criptografados e nunca
                          armazenados em nossos servidores.
                        </p>
                      </div>
                    </div>
                  )}

                  {/* PIX */}
                  {metodoPagamento === "pix" && (
                    <div className="flex flex-col items-center gap-4 py-6">
                      <div className="w-40 h-40 bg-gray-100 rounded-xl flex items-center justify-center">
                        <QrCode size={80} className="text-gray-300" />
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-(--color-texto) font-medium">
                          QR Code gerado após confirmação
                        </p>
                        <p className="font-corpo text-xs text-[#888] mt-1">
                          Você terá 30 minutos para realizar o pagamento
                        </p>
                      </div>
                      <div className="flex items-center gap-2 px-4 py-2 bg-green-50 rounded-lg">
                        <span className="font-corpo text-xs text-green-600">
                          PIX tem aprovação instantânea
                        </span>
                      </div>
                    </div>
                  )}

                  {/* BOLETO */}
                  {metodoPagamento === "boleto" && (
                    <div className="flex flex-col items-center gap-4 py-6">
                      <Barcode size={64} className="text-gray-300" />
                      <div className="text-center">
                        <p className="text-sm text-(--color-texto) font-medium">
                          Boleto gerado após confirmação
                        </p>
                        <p className="font-corpo text-xs text-[#888] mt-1">
                          Vencimento em 3 dias úteis
                        </p>
                        <p className="font-corpo text-xs text-[#888]">
                          O pedido é confirmado após a compensação do boleto
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex justify-between">
                  <button
                    onClick={() => setEtapa(1)}
                    className="flex items-center gap-2 text-xs tracking-[2px] uppercase text-[#888] hover:text-(--color-primaria) transition-colors"
                  >
                    <ArrowLeft size={14} />
                    Voltar
                  </button>
                  <button
                    onClick={() => setEtapa(3)}
                    className="flex items-center gap-2 px-8 py-3 bg-(--color-primaria) text-white text-xs tracking-[2px] uppercase hover:opacity-90 transition-opacity"
                  >
                    Continuar
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            )}

            {/* ETAPA 3 — CONFIRMAÇÃO */}
            {etapa === 3 && (
              <div className="flex flex-col gap-4">
                <div className="bg-white rounded-xl p-6 flex flex-col gap-5">
                  <h2 className="font-titulo text-xl text-(--color-texto)">
                    Revisar pedido
                  </h2>

                  {/* ENDEREÇO */}
                  <div className="flex flex-col gap-2 p-4 bg-(--color-fundo) rounded-lg">
                    <div className="flex items-center justify-between">
                      <p className="text-xs tracking-[2px] uppercase text-(--color-primaria) font-medium">
                        Endereço de entrega
                      </p>
                      <button
                        onClick={() => setEtapa(1)}
                        className="text-xs text-[#888] hover:text-(--color-primaria) transition-colors"
                      >
                        Alterar
                      </button>
                    </div>
                    {enderecoAtual && (
                      <div>
                        <p className="text-sm text-(--color-texto)">
                          {enderecoAtual.recipient}
                        </p>
                        <p className="font-corpo text-xs text-[#888]">
                          {enderecoAtual.street}
                        </p>
                        <p className="font-corpo text-xs text-[#888]">
                          {enderecoAtual.neighborhood} · {enderecoAtual.city}/
                          {enderecoAtual.state} · CEP: {enderecoAtual.zip}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* PAGAMENTO */}
                  <div className="flex flex-col gap-2 p-4 bg-(--color-fundo) rounded-lg">
                    <div className="flex items-center justify-between">
                      <p className="text-xs tracking-[2px] uppercase text-(--color-primaria) font-medium">
                        Pagamento
                      </p>
                      <button
                        onClick={() => setEtapa(2)}
                        className="text-xs text-[#888] hover:text-(--color-primaria) transition-colors"
                      >
                        Alterar
                      </button>
                    </div>
                    <p className="text-sm text-(--color-texto)">
                      {metodoPagamento === "cartao" && "Cartão de crédito"}
                      {metodoPagamento === "pix" &&
                        "PIX — aprovação instantânea"}
                      {metodoPagamento === "boleto" &&
                        "Boleto bancário — vence em 3 dias úteis"}
                    </p>
                  </div>

                  {/* ITENS */}
                  <div className="flex flex-col gap-3">
                    <p className="text-xs tracking-[2px] uppercase text-[#aaa] font-medium">
                      Itens do pedido
                    </p>
                    {items.map((item) => (
                      <div
                        key={item.slug}
                        className="flex items-center justify-between py-3 border-b border-gray-50"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#fdf0f1] to-[#f0d0d3]" />
                          <div>
                            <p className="text-sm text-(--color-texto)">
                              {item.nome}
                            </p>
                            <p className="font-corpo text-xs text-[#888]">
                              Qtd: {item.quantidade}
                            </p>
                          </div>
                        </div>
                        <p className="font-corpo text-sm font-semibold text-(--color-primaria)">
                          R${" "}
                          {(item.preco * item.quantidade)
                            .toFixed(2)
                            .replace(".", ",")}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex justify-between">
                  <button
                    onClick={() => setEtapa(2)}
                    className="flex items-center gap-2 text-xs tracking-[2px] uppercase text-[#888] hover:text-(--color-primaria) transition-colors"
                  >
                    <ArrowLeft size={14} />
                    Voltar
                  </button>
                  <button
                    onClick={() => setPedidoConfirmado(true)}
                    className="flex items-center gap-2 px-8 py-3 bg-(--color-primaria) text-white text-xs tracking-[2px] uppercase hover:opacity-90 transition-opacity"
                  >
                    <Lock size={14} />
                    Confirmar pedido
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* RESUMO LATERAL */}
          <div className="w-80 shrink-0 flex flex-col gap-4 sticky top-8">
            <div className="bg-white rounded-xl p-6 flex flex-col gap-4">
              <h2 className="font-titulo text-xl text-(--color-texto)">
                Resumo
              </h2>

              <div className="flex flex-col gap-3 py-4 border-y border-gray-100">
                <div className="flex justify-between items-center">
                  <span className="font-corpo text-xs text-[#888]">
                    {totalItems()} {totalItems() === 1 ? "item" : "itens"}
                  </span>
                  <span className="font-corpo text-sm text-(--color-texto)">
                    R$ {total().toFixed(2).replace(".", ",")}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-corpo text-xs text-[#888]">Frete</span>
                  <span className="font-corpo text-xs text-green-600 font-medium">
                    Calculado na próxima etapa
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

              <div className="flex flex-col gap-2 pt-2 border-t border-gray-100">
                {[
                  "Compra 100% segura",
                  "Embalagem discreta",
                  "Entrega para todo Brasil",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2">
                    <div className="w-1 h-1 rounded-full bg-(--color-primaria) opacity-50" />
                    <span className="font-corpo text-[0.65rem] text-[#888]">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
