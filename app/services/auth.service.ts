/**
 * Auth Service
 *
 * Camada de autenticação.
 * Atualmente apenas loga no console — será substituído
 * por chamadas à API de autenticação com JWT.
 *
 * @module services/auth.service
 */

import type {
  LoginSchema,
  RegisterSchema,
  ForgotPasswordSchema,
  ResetPasswordSchema,
} from "@/app/lib/validations/auth";

export const authService = {
  /**
   * Realiza login do usuário
   * @param data - Email e senha
   * @returns Token JWT no futuro
   */
  login: async (data: LoginSchema): Promise<void> => {
    // TODO: POST /api/auth/login
    console.log("login:", data);
  },

  /**
   * Registra novo usuário
   * @param data - Dados de cadastro
   */
  register: async (data: RegisterSchema): Promise<void> => {
    // TODO: POST /api/auth/register
    console.log("register:", data);
  },

  /**
   * Envia email de recuperação de senha
   * @param data - Email do usuário
   * @remarks Sempre retorna sucesso por segurança (anti user enumeration)
   */
  forgotPassword: async (data: ForgotPasswordSchema): Promise<void> => {
    // TODO: POST /api/auth/forgot-password
    console.log("forgotPassword:", data);
  },

  /**
   * Verifica código alfanumérico de recuperação
   * @param code - Código de 8 caracteres
   */
  verifyCode: async (code: string): Promise<void> => {
    // TODO: POST /api/auth/verify-code
    console.log("verifyCode:", code);
  },

  /**
   * Redefine a senha do usuário
   * @param data - Nova senha
   */
  resetPassword: async (data: ResetPasswordSchema): Promise<void> => {
    // TODO: POST /api/auth/reset-password
    console.log("resetPassword:", data);
  },

  /**
   * Realiza logout do usuário
   * Invalida o refresh token no backend
   */
  logout: async (): Promise<void> => {
    // TODO: POST /api/auth/logout
    console.log("logout");
  },
};
