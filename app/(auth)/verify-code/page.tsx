"use client";

import Link from "next/link";
import { useState, useRef } from "react";
import { ArrowLeft, WarningCircle } from "@phosphor-icons/react";

export default function VerifyCodePage() {
  const [codes, setCodes] = useState(["", "", "", "", "", "", "", ""]);
  const [error, setError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const inputs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (index: number, value: string) => {
    if (!/^[a-zA-Z0-9]?$/.test(value)) return;

    const newCodes = [...codes];
    newCodes[index] = value.toUpperCase();
    setCodes(newCodes);
    setError(false);

    if (value && index < 7) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !codes[index] && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasted = e.clipboardData
      .getData("text")
      .replace(/[^a-zA-Z0-9]/g, "")
      .toUpperCase()
      .slice(0, 8);
    const newCodes = [...codes];
    pasted.split("").forEach((char, i) => {
      newCodes[i] = char;
    });
    setCodes(newCodes);
    inputs.current[Math.min(pasted.length, 7)]?.focus();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const code = codes.join("");
    if (code.length < 8) {
      setError(true);
      return;
    }
    setIsSubmitting(true);
    // conectar com backend depois
    console.log("code:", code);
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen flex">
      {/* LADO ESQUERDO */}
      <div className="hidden lg:flex w-1/2 bg-(--color-primaria) flex-col justify-between p-16">
        <Link
          href="/"
          className="text-(--color-texto-claro) font-titulo text-2xl font-bold tracking-widest uppercase"
        >
          Real Luxery
        </Link>
        <div className="flex flex-col gap-6">
          <h1 className="font-titulo text-6xl text-(--color-texto-claro) font-bold leading-tight">
            Verifique seu e-mail.
          </h1>
          <p className="text-sm text-(--color-texto-claro) opacity-70 leading-relaxed max-w-sm">
            Enviamos um código de 8 caracteres para o seu e-mail. Digite-o
            abaixo para continuar.
          </p>
          <div className="flex flex-col gap-3 mt-4">
            {[
              "Código válido por 15 minutos",
              "Verifique sua caixa de spam",
              "Cada código é de uso único",
            ].map((item) => (
              <div key={item} className="flex items-center gap-3">
                <div className="w-1 h-1 rounded-full bg-(--color-texto-claro) opacity-60" />
                <span className="text-xs text-(--color-texto-claro) opacity-60 tracking-wide">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>
        <p className="text-xs text-(--color-texto-claro) opacity-40 tracking-wide">
          &copy; 2026 Real Luxery. Todos os direitos reservados.
        </p>
      </div>

      {/* LADO DIREITO */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-8 py-16 bg-(--color-fundo)">
        <div className="w-full max-w-sm flex flex-col gap-8">
          <Link
            href="/forgot-password"
            className="flex items-center gap-2 text-xs tracking-[2px] uppercase text-[#888] hover:text-(--color-primaria) transition-colors self-start"
          >
            <ArrowLeft size={14} />
            Voltar
          </Link>

          <div className="flex flex-col gap-2">
            <h2 className="font-titulo text-4xl text-(--color-texto) font-bold">
              Digite o código
            </h2>
            <p className="text-sm text-[#888]">
              Enviamos um código de 8 caracteres para seu e-mail.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            {/* INPUTS */}
            <div className="flex gap-2 justify-between">
              {codes.map((code, index) => (
                <input
                  key={index}
                  ref={(el) => {
                    inputs.current[index] = el;
                  }}
                  type="text"
                  inputMode="text"
                  maxLength={1}
                  value={code}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  onPaste={handlePaste}
                  className={`w-10 h-12 text-center text-sm font-bold tracking-wider border rounded-lg outline-none transition-all uppercase
                    ${
                      error
                        ? "border-red-400 bg-red-50"
                        : code
                          ? "border-(--color-primaria) bg-white"
                          : "border-gray-200 bg-white focus:border-(--color-primaria)"
                    }`}
                />
              ))}
            </div>

            {error && (
              <div className="flex items-center gap-2">
                <WarningCircle size={13} className="text-red-400" />
                <span className="text-xs text-red-500">
                  Digite todos os 8 caracteres do código
                </span>
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting || codes.some((c) => !c)}
              className="w-full py-3.5 bg-(--color-primaria) text-white text-xs tracking-[2px] uppercase hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Verificando..." : "Verificar código"}
            </button>
          </form>

          <div className="text-center">
            <p className="text-xs text-[#888]">
              Não recebeu o código?{" "}
              <button className="text-(--color-primaria) hover:opacity-70 transition-opacity">
                Reenviar
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
