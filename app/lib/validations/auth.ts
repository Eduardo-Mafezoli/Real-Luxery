import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Preencha todos os campos")
    .check(z.email({ error: "Email ou senha inválidos" })),
  password: z.string().min(1, "Preencha todos os campos"),
});

export const registerSchema = z
  .object({
    name: z
      .string()
      .min(2, "Nome deve ter no mínimo 2 caracteres")
      .max(100, "Nome muito longo"),
    email: z
      .string()
      .min(1, "E-mail obrigatório")
      .check(z.email({ error: "E-mail inválido" })),
    password: z
      .string()
      .min(8, "Senha deve ter no mínimo 8 caracteres")
      .regex(/[A-Z]/, "Deve conter ao menos uma letra maiúscula")
      .regex(/[0-9]/, "Deve conter ao menos um número")
      .regex(/[^a-zA-Z0-9]/, "Deve conter ao menos um caractere especial"),
    confirmPassword: z.string().min(1, "Confirmação de senha obrigatória"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  });

export const forgotPasswordSchema = z.object({
  email: z
    .string()
    .min(1, "E-mail obrigatório")
    .check(z.email({ error: "E-mail inválido" })),
});

export const verifyTokenSchema = z.object({
  code: z
    .string()
    .length(8, "O código deve ter 8 caracteres")
    .regex(/^[a-zA-Z0-9]+$/, "Código inválido"),
});

export const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, "Senha deve ter no mínimo 8 caracteres")
      .regex(/[A-Z]/, "Deve conter ao menos uma letra maiúscula")
      .regex(/[0-9]/, "Deve conter ao menos um número")
      .regex(/[^a-zA-Z0-9]/, "Deve conter ao menos um caractere especial"),
    confirmPassword: z.string().min(1, "Confirmação de senha obrigatória"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  });

export type LoginSchema = z.infer<typeof loginSchema>;
export type RegisterSchema = z.infer<typeof registerSchema>;
export type ForgotPasswordSchema = z.infer<typeof forgotPasswordSchema>;
export type VerifyTokenSchema = z.infer<typeof verifyTokenSchema>;
export type ResetPasswordSchema = z.infer<typeof resetPasswordSchema>;
