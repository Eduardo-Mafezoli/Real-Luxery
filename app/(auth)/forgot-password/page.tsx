"use client";

import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Envelope,
  ArrowLeft,
  WarningCircle,
  CheckCircle,
} from "@phosphor-icons/react";
import {
  forgotPasswordSchema,
  type ForgotPasswordSchema,
} from "@/app/lib/validations/auth";

export default function ForgotPasswordPage() {
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordSchema>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data: ForgotPasswordSchema) => {
    // conectar com backend depois
    console.log(data);
    setSubmitted(true);
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
            Recupere seu acesso.
          </h1>
          <p className="text-sm text-(--color-texto-claro) opacity-70 leading-relaxed max-w-sm">
            Enviaremos um link seguro para o seu e-mail para que você possa
            redefinir sua senha com segurança.
          </p>
          <div className="flex flex-col gap-3 mt-4">
            {[
              "Link expira em 15 minutos",
              "Enviado apenas para e-mails cadastrados",
              "Processo 100% seguro",
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
            href="/login"
            className="flex items-center gap-2 text-xs tracking-[2px] uppercase text-[#888] hover:text-(--color-primaria) transition-colors self-start"
          >
            <ArrowLeft size={14} />
            Voltar ao login
          </Link>

          {!submitted ? (
            <>
              <div className="flex flex-col gap-2">
                <h2 className="font-titulo text-4xl text-(--color-texto) font-bold">
                  Esqueceu a senha?
                </h2>
                <p className="text-sm text-[#888]">
                  Digite seu e-mail e enviaremos um link para redefinir sua
                  senha.
                </p>
              </div>

              <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-5"
              >
                <div className="flex flex-col gap-2">
                  <label className="text-xs tracking-[2px] uppercase text-(--color-texto) font-medium">
                    E-mail
                  </label>
                  <div className="relative">
                    <Envelope
                      size={16}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-[#aaa]"
                    />
                    <input
                      {...register("email")}
                      type="email"
                      placeholder="seu@email.com"
                      className={`w-full pl-10 pr-4 py-3 border rounded text-sm outline-none transition-colors bg-white
                        ${
                          errors.email
                            ? "border-red-400 focus:border-red-400"
                            : "border-gray-200 focus:border-(--color-primaria)"
                        }`}
                    />
                  </div>
                  {errors.email && (
                    <div className="flex items-center gap-1.5 text-red-500">
                      <WarningCircle size={13} />
                      <span className="text-xs">{errors.email.message}</span>
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 bg-(--color-primaria) text-(--color-texto-claro) text-xs tracking-[2px] uppercase font-medium hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Enviando..." : "Enviar link de recuperação"}
                </button>
              </form>
            </>
          ) : (
            /* ESTADO APÓS ENVIO — sempre genérico por segurança */
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <h2 className="font-titulo text-4xl text-(--color-texto) font-bold">
                  Verifique seu e-mail
                </h2>
              </div>
              <div className="flex flex-col gap-4 p-6 bg-white rounded-xl border border-gray-100">
                <CheckCircle size={32} className="text-green-500" />
                <p className="text-sm text-[#555] leading-relaxed">
                  Se este e-mail estiver cadastrado em nossa plataforma, você
                  receberá um link de recuperação em breve.
                </p>
                <p className="text-xs text-[#888] leading-relaxed">
                  Não recebeu? Verifique sua pasta de spam ou aguarde alguns
                  minutos.
                </p>
              </div>
              <Link
                href="/login"
                className="text-xs tracking-[2px] uppercase text-(--color-primaria) hover:opacity-70 transition-opacity"
              >
                Voltar ao login
              </Link>
            </div>
          )}

          <p className="text-sm text-[#888] text-center">
            Lembrou a senha?{" "}
            <Link
              href="/login"
              className="text-(--color-primaria) font-medium hover:opacity-70 transition-opacity"
            >
              Entrar
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
