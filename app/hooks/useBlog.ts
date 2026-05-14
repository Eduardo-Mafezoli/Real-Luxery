/**
 * useBlog — hook para acesso a dados do blog
 *
 * Abstrai a camada de serviço e gerencia loading/error.
 *
 * @module hooks/useBlog
 */

"use client";

import { useState, useEffect } from "react";
import { blogService } from "@/app/services";
import type { Post, CategoriaBlog } from "@/app/types";

type UsePostsReturn = {
  posts: Post[];
  postDestaque: Post | undefined;
  categorias: CategoriaBlog[];
  loading: boolean;
  error: string | null;
};

/**
 * Hook para listar todos os posts do blog
 * @param categoria - Filtra por categoria (opcional)
 */
export function usePosts(categoria?: string): UsePostsReturn {
  const [posts, setPosts] = useState<Post[]>([]);
  const [postDestaque, setPostDestaque] = useState<Post | undefined>(undefined);
  const [categorias, setCategorias] = useState<CategoriaBlog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const [allPosts, destaque, cats] = await Promise.all([
          categoria
            ? blogService.getByCategoria(categoria)
            : blogService.getAll(),
          blogService.getDestaque(),
          blogService.getCategorias(),
        ]);
        setPosts(allPosts);
        setPostDestaque(destaque);
        setCategorias(cats);
      } catch {
        setError("Erro ao carregar posts");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [categoria]);

  return { posts, postDestaque, categorias, loading, error };
}

type UsePostReturn = {
  post: Post | undefined;
  loading: boolean;
  error: string | null;
};

/**
 * Hook para buscar um post pelo slug
 * @param slug - Identificador único do post
 */
export function usePost(slug: string): UsePostReturn {
  const [post, setPost] = useState<Post | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const data = await blogService.getBySlug(slug);
        setPost(data);
      } catch {
        setError("Erro ao carregar post");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [slug]);

  return { post, loading, error };
}
