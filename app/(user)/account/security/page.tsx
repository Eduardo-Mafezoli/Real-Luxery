"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Eye,
  EyeSlash,
  Lock,
  CheckCircle,
  WarningCircle,
  ShieldCheck,
} from "@phosphor-icons/react";

const securitySchema = z
  .object({
    currentPassword: z.string().min(1, "Senha atual obrigatória"),
    newPassword: z
      .string()
      .min(8, "Senha deve ter no mínimo 8 caracteres")
      .regex(/[A-Z]/, "Deve conter ao menos uma letra maiúscula")
      .regex(/[0-9]/, "Deve conter ao menos um número")
      .regex(/[^a-zA-Z0-9]/, "Deve conter ao menos um caractere especial"),
    confirmPassword: z.string().min(1, "Confirmação obrigatória"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  });

type SecuritySchema = z.infer<typeof securitySchema>;

export default function SecurityPage() {
  const [show, setShow] = useState({
    current: false,
    new: false,
    confirm: false,
  });
  const [saved, setSaved] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<SecuritySchema>({
    resolver: zodResolver(securitySchema),
  });

  const onSubmit = async (data: SecuritySchema) => {
    console.log(data);
    setSaved(true);
    reset();
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="flex flex-col gap-6">
      {/* ALTERAR SENHA */}
      <div className="bg-white rounded-xl p-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="font-titulo text-3xl text-(--color-texto)">
              Segurança
            </h1>
            <p className="text-sm text-[#888] mt-1">
              Gerencie sua senha e segurança da conta
            </p>
          </div>
          {saved && (
            <div className="flex items-center gap-2 text-green-600 bg-green-50 px-4 py-2 rounded-lg">
              <CheckCircle size={16} />
              <span className="text-xs">Senha alterada com sucesso</span>
            </div>
          )}
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-5 max-w-md"
        >
          {/* SENHA ATUAL */}
          <div className="flex flex-col gap-2">
            <label className="text-xs tracking-[2px] uppercase text-(--color-texto) font-medium">
              Senha atual
            </label>
            <div className="relative">
              <Lock
                size={16}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-[#aaa]"
              />
              <input
                {...register("currentPassword")}
                type={show.current ? "text" : "password"}
                placeholder="••••••••"
                className={`w-full pl-10 pr-12 py-3 border rounded text-sm outline-none transition-colors
                  ${
                    errors.currentPassword
                      ? "border-red-400 focus:border-red-400"
                      : "border-gray-200 focus:border-(--color-primaria)"
                  }`}
              />
              <button
                type="button"
                onClick={() => setShow((s) => ({ ...s, current: !s.current }))}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#aaa] hover:text-(--color-primaria) transition-colors"
              >
                {show.current ? <EyeSlash size={16} /> : <Eye size={16} />}
              </button>
            </div>
            {errors.currentPassword && (
              <div className="flex items-center gap-1.5 text-red-500">
                <WarningCircle size={13} />
                <span className="text-xs">
                  {errors.currentPassword.message}
                </span>
              </div>
            )}
          </div>

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
                {...register("newPassword")}
                type={show.new ? "text" : "password"}
                placeholder="••••••••"
                className={`w-full pl-10 pr-12 py-3 border rounded text-sm outline-none transition-colors
                  ${
                    errors.newPassword
                      ? "border-red-400 focus:border-red-400"
                      : "border-gray-200 focus:border-(--color-primaria)"
                  }`}
              />
              <button
                type="button"
                onClick={() => setShow((s) => ({ ...s, new: !s.new }))}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#aaa] hover:text-(--color-primaria) transition-colors"
              >
                {show.new ? <EyeSlash size={16} /> : <Eye size={16} />}
              </button>
            </div>
            {errors.newPassword && (
              <div className="flex items-center gap-1.5 text-red-500">
                <WarningCircle size={13} />
                <span className="text-xs">{errors.newPassword.message}</span>
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
                type={show.confirm ? "text" : "password"}
                placeholder="••••••••"
                className={`w-full pl-10 pr-12 py-3 border rounded text-sm outline-none transition-colors
                  ${
                    errors.confirmPassword
                      ? "border-red-400 focus:border-red-400"
                      : "border-gray-200 focus:border-(--color-primaria)"
                  }`}
              />
              <button
                type="button"
                onClick={() => setShow((s) => ({ ...s, confirm: !s.confirm }))}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#aaa] hover:text-(--color-primaria) transition-colors"
              >
                {show.confirm ? <EyeSlash size={16} /> : <Eye size={16} />}
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

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              disabled={isSubmitting || !isDirty}
              className="px-8 py-3 bg-(--color-primaria) text-white text-xs tracking-[2px] uppercase hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Salvando..." : "Alterar senha"}
            </button>
          </div>
        </form>
      </div>

      {/* SESSÕES ATIVAS */}
      <div className="bg-white rounded-xl p-8">
        <h2 className="font-titulo text-xl text-(--color-texto) mb-1">
          Sessões ativas
        </h2>
        <p className="text-sm text-[#888] mb-6">
          Dispositivos onde sua conta está conectada
        </p>

        <div className="flex flex-col gap-3">
          {[
            {
              device: "Chrome — Windows 11",
              location: "Fortaleza, CE",
              current: true,
              time: "Agora",
            },
            {
              device: "Safari — iPhone 15",
              location: "Fortaleza, CE",
              current: false,
              time: "Há 2 dias",
            },
          ].map((session, i) => (
            <div
              key={i}
              className="flex items-center justify-between p-4 border border-gray-100 rounded-lg"
            >
              <div className="flex items-center gap-3">
                <ShieldCheck
                  size={18}
                  className={
                    session.current ? "text-(--color-primaria)" : "text-[#aaa]"
                  }
                />
                <div>
                  <p className="text-sm text-(--color-texto)">
                    {session.device}
                  </p>
                  <p className="font-corpo text-xs text-[#888]">
                    {session.location} · {session.time}
                  </p>
                </div>
              </div>
              {session.current ? (
                <span className="text-[0.65rem] tracking-[2px] uppercase text-green-600 bg-green-50 px-2 py-1 rounded-full">
                  Atual
                </span>
              ) : (
                <button className="text-xs text-red-400 hover:opacity-70 transition-opacity">
                  Encerrar
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
