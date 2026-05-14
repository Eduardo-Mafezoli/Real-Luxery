/**
 * Tipos do domínio User
 *
 * Define a estrutura de usuários e endereços.
 * Dados sensíveis (CPF, telefone) nunca são expostos ao admin.
 *
 * @module types/user
 */

/**
 * Tipo do endereço de entrega
 */
export type TipoEndereco = "casa" | "trabalho" | "outro";

/**
 * Representa um endereço de entrega do usuário
 */
export type Endereco = {
  id: number;
  /** Rótulo do endereço — ex: "Casa", "Trabalho" */
  label: string;
  type: TipoEndereco;
  /** Nome do destinatário */
  recipient: string;
  street: string;
  number: string;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;
  zip: string;
  /** Se true, é o endereço padrão para entregas */
  isDefault: boolean;
};

/**
 * Representa os dados pessoais do usuário
 * @remarks CPF e data de nascimento são opcionais e nunca
 * são expostos ao painel admin (princípio de minimização LGPD)
 */
export type UserProfile = {
  id: string;
  name: string;
  email: string;
  phone?: string;
  /** Formato: 000.000.000-00 */
  cpf?: string;
  /** Formato: DD/MM/AAAA */
  birthDate?: string;
  /** Lista de endereços cadastrados */
  addresses: Endereco[];
};

/**
 * Roles disponíveis no sistema
 */
export type UserRole = "customer" | "admin";
