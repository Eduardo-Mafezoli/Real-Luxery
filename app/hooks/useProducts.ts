/**
 * useProducts — hook para acesso a dados de produtos
 *
 * Abstrai a camada de serviço e gerencia loading/error.
 * Quando o backend estiver pronto, só o service muda —
 * as pages que usam este hook não precisam ser alteradas.
 *
 * @module hooks/useProducts
 */

"use client";

import { useState, useEffect } from "react";
import { productService } from "@/app/services";
import type { Produto, Categoria } from "@/app/types";

/** Retorno do hook useProducts */
type UseProductsReturn = {
  produtos: Produto[];
  categorias: Categoria[];
  loading: boolean;
  error: string | null;
};

/**
 * Hook para listar todos os produtos e categorias
 * @param categoria - Filtra por categoria (opcional)
 */
export function useProducts(categoria?: string): UseProductsReturn {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const [prods, cats] = await Promise.all([
          categoria
            ? productService.getByCategoria(categoria)
            : productService.getAll(),
          productService.getCategorias(),
        ]);
        setProdutos(prods);
        setCategorias(cats);
      } catch {
        setError("Erro ao carregar produtos");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [categoria]);

  return { produtos, categorias, loading, error };
}

/** Retorno do hook useProduct (singular) */
type UseProductReturn = {
  produto: Produto | undefined;
  loading: boolean;
  error: string | null;
};

/**
 * Hook para buscar um produto pelo slug
 * @param slug - Identificador único do produto
 */
export function useProduct(slug: string): UseProductReturn {
  const [produto, setProduto] = useState<Produto | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const data = await productService.getBySlug(slug);
        setProduto(data);
      } catch {
        setError("Erro ao carregar produto");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [slug]);

  return { produto, loading, error };
}
