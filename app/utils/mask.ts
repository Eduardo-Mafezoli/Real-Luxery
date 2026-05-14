/**
 * Utilitários de máscaras de input
 *
 * Funções puras para aplicar máscaras em campos de formulário.
 * Usadas nos formulários de dados pessoais e checkout.
 *
 * @module utils/mask
 */

/**
 * Aplica máscara de CPF
 * @example maskCpf("12345678901") → "123.456.789-01"
 */
export const maskCpf = (value: string): string => {
  let v = value.replace(/\D/g, "");
  v = v.replace(/(\d{3})(\d)/, "$1.$2");
  v = v.replace(/(\d{3})(\d)/, "$1.$2");
  v = v.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
  return v.slice(0, 14);
};

/**
 * Aplica máscara de telefone celular ou fixo
 * @example maskPhone("85999999999") → "(85) 99999-9999"
 */
export const maskPhone = (value: string): string => {
  let v = value.replace(/\D/g, "");
  if (v.length <= 10) {
    v = v.replace(/(\d{2})(\d{4})(\d{0,4})/, "($1) $2-$3");
  } else {
    v = v.replace(/(\d{2})(\d{5})(\d{0,4})/, "($1) $2-$3");
  }
  return v;
};

/**
 * Aplica máscara de data no formato DD/MM/AAAA
 * @example maskDate("13052026") → "13/05/2026"
 */
export const maskDate = (value: string): string => {
  let v = value.replace(/\D/g, "");
  if (v.length >= 3) v = v.slice(0, 2) + "/" + v.slice(2);
  if (v.length >= 6) v = v.slice(0, 5) + "/" + v.slice(5);
  return v.slice(0, 10);
};

/**
 * Aplica máscara de CEP
 * @example maskCep("60000000") → "60000-000"
 */
export const maskCep = (value: string): string => {
  let v = value.replace(/\D/g, "");
  v = v.replace(/(\d{5})(\d)/, "$1-$2");
  return v.slice(0, 9);
};

/**
 * Aplica máscara de número de cartão de crédito
 * @example maskCard("4111111111111111") → "4111 1111 1111 1111"
 */
export const maskCard = (value: string): string => {
  let v = value.replace(/\D/g, "");
  v = v.replace(/(\d{4})(?=\d)/g, "$1 ");
  return v.slice(0, 19);
};

/**
 * Aplica máscara de validade de cartão MM/AA
 * @example maskExpiry("1226") → "12/26"
 */
export const maskExpiry = (value: string): string => {
  let v = value.replace(/\D/g, "");
  v = v.replace(/(\d{2})(\d)/, "$1/$2");
  return v.slice(0, 5);
};
