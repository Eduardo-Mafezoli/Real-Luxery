"use client";

import Link from "next/link";
import { useState } from "react";
import { useForm, UseFormRegister } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Lock,
  Eye,
  EyeSlash,
  WarningCircle,
  CheckCircle,
  ArrowLeft,
} from "@phosphor-icons/react";
import {
  resetPasswordSchema,
  type ResetPasswordSchema,
} from "@/app/lib/validations/auth";

export default function ResetPasswordPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordSchema>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const onSubmit = async (data: ResetPasswordSchema) => {
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
            Nova senha, novo acesso.
          </h1>
          <p className="text-sm text-(--color-texto-claro) opacity-70 leading-relaxed max-w-sm">
            Escolha uma senha forte para manter sua conta segura e sua
            privacidade protegida.
          </p>
          <div className="flex flex-col gap-3 mt-4">
            {[
              "Mínimo 8 caracteres",
              "Ao menos uma letra maiúscula",
              "Ao menos um número e caractere especial",
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
                  Redefinir senha
                </h2>
                <p className="text-sm text-[#888]">
                  Escolha uma nova senha para sua conta.
                </p>
              </div>

              <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-5"
              >
                {/* NOVA SENHA */}
                <div className="flex flex-col gap-2">
                  <label className="text-xs tracking-[2px] uppercase text-(--color-texto) font-medium">
                    Nova senha
                  </label>
                  <div className="relative">
                    <Lock
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
                        <EyeSlash size={16} />
                      ) : (
                        <Eye size={16} />
                      )}
                    </button>
                  </div>
                  {errors.password && (
                    <div className="flex items-center gap-1.5 text-red-500">
                      <WarningCircle size={13} />
                      <span className="text-xs">{errors.password.message}</span>
                    </div>
                  )}
                </div>

                {/* CONFIRMAR SENHA */}
                <div className="flex flex-col gap-2">
                  <label className="text-xs tracking-[2px] uppercase text-(--color-texto) font-medium">
                    Confirmar nova senha
                  </label>
                  <div className="relative">
                    <Lock
                      size={16}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-[#aaa]"
                    />
                    <input
                      {...register("confirmPassword")}
                      type={showConfirm ? "text" : "password"}
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
                      onClick={() => setShowConfirm(!showConfirm)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-[#aaa] hover:text-(--color-primaria) transition-colors"
                    >
                      {showConfirm ? <EyeSlash size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <div className="flex items-center gap-1.5 text-red-500">
                      <WarningCircle size={13} />
                      <span className="text-xs">
                        {errors.confirmPassword.message}
                      </span>
                    </div>
                  )}
                </div>

                {/* INDICADOR DE FORÇA */}
                <PasswordStrength register={register} />

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 bg-(--color-primaria) text-(--color-texto-claro) text-xs tracking-[2px] uppercase font-medium hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Salvando..." : "Redefinir senha"}
                </button>
              </form>
            </>
          ) : (
            <div className="flex flex-col gap-6">
              <h2 className="font-titulo text-4xl text-(--color-texto) font-bold">
                Senha redefinida!
              </h2>
              <div className="flex flex-col gap-4 p-6 bg-white rounded-xl border border-gray-100">
                <CheckCircle size={32} className="text-green-500" />
                <p className="text-sm text-[#555] leading-relaxed">
                  Sua senha foi redefinida com sucesso. Você já pode entrar na
                  sua conta com a nova senha.
                </p>
              </div>
              <Link
                href="/login"
                className="w-full py-3.5 bg-(--color-primaria) text-white text-xs tracking-[2px] uppercase text-center hover:opacity-90 transition-opacity"
              >
                Entrar na conta
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function PasswordStrength({
  register,
}: {
  register: UseFormRegister<ResetPasswordSchema>;
}) {
  const [value, setValue] = useState("");

  const checks = [
    { label: "8+ caracteres", valid: value.length >= 8 },
    { label: "Letra maiúscula", valid: /[A-Z]/.test(value) },
    { label: "Número", valid: /[0-9]/.test(value) },
    { label: "Caractere especial", valid: /[^a-zA-Z0-9]/.test(value) },
  ];

  const score = checks.filter((c) => c.valid).length;
  const strengthLabel = ["", "Fraca", "Razoável", "Boa", "Forte"][score];
  const strengthColor = [
    "",
    "bg-red-400",
    "bg-yellow-400",
    "bg-blue-400",
    "bg-green-500",
  ][score];

  return (
    <div className="flex flex-col gap-2">
      <input
        type="password"
        className="hidden"
        {...register("password")}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setValue(e.target.value)
        }
        onInput={(e: React.FormEvent<HTMLInputElement>) =>
          setValue((e.target as HTMLInputElement).value)
        }
      />

      {value.length > 0 && (
        <>
          <div className="flex gap-1">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className={`h-1 flex-1 rounded-full transition-all duration-300 ${i <= score ? strengthColor : "bg-gray-200"}`}
              />
            ))}
          </div>
          <div className="flex justify-between items-center">
            <div className="flex flex-wrap gap-2">
              {checks.map((check) => (
                <span
                  key={check.label}
                  className={`text-[0.6rem] tracking-wide ${check.valid ? "text-green-500" : "text-[#aaa]"}`}
                >
                  {check.valid ? "✓" : "·"} {check.label}
                </span>
              ))}
            </div>
            <span
              className={`text-[0.65rem] font-medium ${
                score === 4
                  ? "text-green-500"
                  : score === 3
                    ? "text-blue-400"
                    : score === 2
                      ? "text-yellow-500"
                      : "text-red-400"
              }`}
            >
              {strengthLabel}
            </span>
          </div>
        </>
      )}
    </div>
  );
}
