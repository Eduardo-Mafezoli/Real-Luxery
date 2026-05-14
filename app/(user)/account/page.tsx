"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { CheckCircle } from "@phosphor-icons/react";
import { maskCpf, maskPhone, maskDate } from "@/app/utils";

const personalDataSchema = z.object({
  name: z
    .string()
    .min(2, "Nome deve ter no mínimo 2 caracteres")
    .max(100, "Nome muito longo"),
  email: z
    .string()
    .min(1, "E-mail obrigatório")
    .check(z.email({ error: "E-mail inválido" })),
  phone: z
    .string()
    .min(10, "Telefone inválido")
    .max(15, "Telefone inválido")
    .regex(/^[0-9()\-\s+]+$/, "Telefone inválido")
    .optional()
    .or(z.literal("")),
  cpf: z
    .string()
    .regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, "CPF inválido")
    .optional()
    .or(z.literal("")),
  birthDate: z
    .string()
    .regex(/^\d{2}\/\d{2}\/\d{4}$/, "Data inválida")
    .optional()
    .or(z.literal("")),
});

type PersonalDataSchema = z.infer<typeof personalDataSchema>;

export default function AccountPage() {
  const [saved, setSaved] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<PersonalDataSchema>({
    resolver: zodResolver(personalDataSchema),
    defaultValues: {
      name: "Nome do Usuário",
      email: "usuario@email.com",
      phone: "",
      cpf: "",
      birthDate: "",
    },
  });

  const onSubmit = async (data: PersonalDataSchema) => {
    // TODO: authService.updateProfile(data)
    console.log(data);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="bg-white rounded-xl p-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="font-titulo text-3xl text-(--color-texto)">
              Meus <span className="text-(--color-primaria)">dados</span>
            </h1>
            <p className="text-sm text-[#888] mt-1">
              Gerencie suas informações pessoais
            </p>
          </div>
          {saved && (
            <div className="flex items-center gap-2 text-green-600 bg-green-50 px-4 py-2 rounded-lg">
              <CheckCircle size={16} />
              <span className="text-xs">Salvo com sucesso</span>
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
          {/* NOME + EMAIL */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-xs tracking-[2px] uppercase text-(--color-texto) font-medium">
                Nome completo
              </label>
              <input
                {...register("name")}
                type="text"
                className={`w-full px-4 py-3 border rounded text-sm outline-none transition-colors
                  ${errors.name ? "border-red-400 focus:border-red-400" : "border-gray-200 focus:border-(--color-primaria)"}`}
              />
              {errors.name && (
                <span className="text-xs text-red-500">
                  {errors.name.message}
                </span>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs tracking-[2px] uppercase text-(--color-texto) font-medium">
                E-mail
              </label>
              <input
                {...register("email")}
                type="email"
                className={`w-full px-4 py-3 border rounded text-sm outline-none transition-colors
                  ${errors.email ? "border-red-400 focus:border-red-400" : "border-gray-200 focus:border-(--color-primaria)"}`}
              />
              {errors.email && (
                <span className="text-xs text-red-500">
                  {errors.email.message}
                </span>
              )}
            </div>
          </div>

          {/* TELEFONE + CPF */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-xs tracking-[2px] uppercase text-(--color-texto) font-medium">
                Telefone
              </label>
              <input
                {...register("phone")}
                type="tel"
                placeholder="(85) 99999-9999"
                maxLength={15}
                onChange={(e) => {
                  setValue("phone", maskPhone(e.target.value), {
                    shouldDirty: true,
                  });
                }}
                className={`w-full px-4 py-3 border rounded text-sm outline-none transition-colors
                  ${errors.phone ? "border-red-400 focus:border-red-400" : "border-gray-200 focus:border-(--color-primaria)"}`}
              />
              {errors.phone && (
                <span className="text-xs text-red-500">
                  {errors.phone.message}
                </span>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs tracking-[2px] uppercase text-(--color-texto) font-medium">
                CPF
              </label>
              <input
                {...register("cpf")}
                type="text"
                placeholder="000.000.000-00"
                maxLength={14}
                onChange={(e) => {
                  setValue("cpf", maskCpf(e.target.value), {
                    shouldDirty: true,
                  });
                }}
                className={`w-full px-4 py-3 border rounded text-sm outline-none transition-colors
                  ${errors.cpf ? "border-red-400 focus:border-red-400" : "border-gray-200 focus:border-(--color-primaria)"}`}
              />
              {errors.cpf && (
                <span className="text-xs text-red-500">
                  {errors.cpf.message}
                </span>
              )}
            </div>
          </div>

          {/* DATA DE NASCIMENTO */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-xs tracking-[2px] uppercase text-(--color-texto) font-medium">
                Data de nascimento
              </label>
              <input
                {...register("birthDate")}
                type="text"
                placeholder="DD/MM/AAAA"
                maxLength={10}
                onChange={(e) => {
                  setValue("birthDate", maskDate(e.target.value), {
                    shouldDirty: true,
                  });
                }}
                className="w-full px-4 py-3 border border-gray-200 rounded text-sm outline-none focus:border-(--color-primaria) transition-colors"
              />
              {errors.birthDate && (
                <span className="text-xs text-red-500">
                  {errors.birthDate.message}
                </span>
              )}
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              disabled={isSubmitting || !isDirty}
              className="px-8 py-3 bg-(--color-primaria) text-white text-xs tracking-[2px] uppercase hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Salvando..." : "Salvar alterações"}
            </button>
          </div>
        </form>
      </div>

      {/* AVISO LGPD */}
      <div className="bg-white rounded-xl p-6 border-l-4 border-(--color-primaria)">
        <p className="text-xs text-[#888] leading-relaxed">
          Seus dados são protegidos conforme a{" "}
          <span className="font-medium text-(--color-texto)">
            Lei Geral de Proteção de Dados (LGPD)
          </span>
          . Para exportar ou excluir seus dados, acesse{" "}
          <a
            href="/account/privacy"
            className="text-(--color-primaria) hover:opacity-70"
          >
            Privacidade & LGPD
          </a>
          .
        </p>
      </div>
    </div>
  );
}
