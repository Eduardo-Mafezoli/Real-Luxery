"use client";

import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  EyeIcon,
  EyeSlashIcon,
  LockIcon,
  EnvelopeIcon,
  UserIcon,
  WarningCircleIcon,
  ArrowLeftIcon,
} from "@phosphor-icons/react";
import {
  registerSchema,
  type RegisterSchema,
} from "@/app/lib/validations/auth";

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterSchema) => {
    // conectar com backend depois
    console.log(data);
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
            Seu prazer começa aqui.
          </h1>
          <p className="text-sm text-(--color-texto-claro) opacity-70 leading-relaxed max-w-sm">
            Crie sua conta e tenha acesso a uma experiência única de compra com
            total privacidade e discrição.
          </p>
          <div className="flex flex-col gap-3 mt-4">
            {[
              "Cadastro 100% seguro",
              "Sem spam, prometemos",
              "Acesso a ofertas exclusivas",
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
          {/* VOLTAR */}
          <Link
            href="/"
            className="flex items-center gap-2 text-xs tracking-[2px] uppercase text-[#888] hover:text-(--color-primaria) transition-colors self-start"
          >
            <ArrowLeftIcon size={14} />
            Voltar
          </Link>

          {/* HEADER */}
          <div className="flex flex-col gap-2">
            <h2 className="font-titulo text-4xl text-(--color-texto) font-bold">
              Criar conta
            </h2>
            <p className="text-sm text-[#888]">
              Preencha os dados abaixo para começar
            </p>
          </div>

          {/* FORM */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-5"
          >
            {/* NOME */}
            <div className="flex flex-col gap-2">
              <label className="text-xs tracking-[2px] uppercase text-(--color-texto) font-medium">
                Nome completo
              </label>
              <div className="relative">
                <UserIcon
                  size={16}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-[#aaa]"
                />
                <input
                  {...register("name")}
                  type="text"
                  placeholder="Seu nome"
                  className={`w-full pl-10 pr-4 py-3 border rounded text-sm outline-none transition-colors bg-white
                    ${
                      errors.name
                        ? "border-red-400 focus:border-red-400"
                        : "border-gray-200 focus:border-(--color-primaria)"
                    }`}
                />
              </div>
              {errors.name && (
                <div className="flex items-center gap-1.5 text-red-500">
                  <WarningCircleIcon size={13} />
                  <span className="text-xs">{errors.name.message}</span>
                </div>
              )}
            </div>

            {/* EMAIL */}
            <div className="flex flex-col gap-2">
              <label className="text-xs tracking-[2px] uppercase text-(--color-texto) font-medium">
                E-mail
              </label>
              <div className="relative">
                <EnvelopeIcon
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
                  <WarningCircleIcon size={13} />
                  <span className="text-xs">{errors.email.message}</span>
                </div>
              )}
            </div>

            {/* SENHA */}
            <div className="flex flex-col gap-2">
              <label className="text-xs tracking-[2px] uppercase text-(--color-texto) font-medium">
                Senha
              </label>
              <div className="relative">
                <LockIcon
                  size={16}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-[#aaa]"
                />
                <input
                  {...register("password")}
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className={`w-full pl-10 pr-12 py-3 border rounded text-sm outline-none transition-colors bg-white
                    ${
                      errors.password
                        ? "border-red-400 focus:border-red-400"
                        : "border-gray-200 focus:border-(--color-primaria)"
                    }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#aaa] hover:text-(--color-primaria) transition-colors"
                >
                  {showPassword ? (
                    <EyeSlashIcon size={16} />
                  ) : (
                    <EyeIcon size={16} />
                  )}
                </button>
              </div>
              {errors.password && (
                <div className="flex items-center gap-1.5 text-red-500">
                  <WarningCircleIcon size={13} />
                  <span className="text-xs">{errors.password.message}</span>
                </div>
              )}
            </div>

            {/* CONFIRMAR SENHA */}
            <div className="flex flex-col gap-2">
              <label className="text-xs tracking-[2px] uppercase text-(--color-texto) font-medium">
                Confirmar senha
              </label>
              <div className="relative">
                <LockIcon
                  size={16}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-[#aaa]"
                />
                <input
                  {...register("confirmPassword")}
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className={`w-full pl-10 pr-12 py-3 border rounded text-sm outline-none transition-colors bg-white
                    ${
                      errors.confirmPassword
                        ? "border-red-400 focus:border-red-400"
                        : "border-gray-200 focus:border-(--color-primaria)"
                    }`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#aaa] hover:text-(--color-primaria) transition-colors"
                >
                  {showConfirmPassword ? (
                    <EyeSlashIcon size={16} />
                  ) : (
                    <EyeIcon size={16} />
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <div className="flex items-center gap-1.5 text-red-500">
                  <WarningCircleIcon size={13} />
                  <span className="text-xs">
                    {errors.confirmPassword.message}
                  </span>
                </div>
              )}
            </div>

            {/* TERMOS */}
            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                id="terms"
                className="mt-0.5 accent-(--color-primaria)"
                required
              />
              <label
                htmlFor="terms"
                className="text-xs text-[#888] leading-relaxed"
              >
                Concordo com os{" "}
                <Link
                  href="/termos"
                  className="text-(--color-primaria) hover:opacity-70"
                >
                  Termos de uso
                </Link>{" "}
                e a{" "}
                <Link
                  href="/privacidade"
                  className="text-(--color-primaria) hover:opacity-70"
                >
                  Política de privacidade
                </Link>
              </label>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 bg-(--color-primaria) text-(--color-texto-claro) text-xs tracking-[2px] uppercase font-medium hover:opacity-90 transition-opacity mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Criando conta..." : "Criar conta"}
            </button>
          </form>

          <div className="flex items-center gap-4">
            <div className="flex-1 h-[1px] bg-gray-200" />
            <span className="text-xs text-[#aaa]">ou</span>
            <div className="flex-1 h-[1px] bg-gray-200" />
          </div>

          <p className="text-sm text-[#888] text-center">
            Já tem uma conta?{" "}
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
