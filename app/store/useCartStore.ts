import { create } from "zustand";
import { persist } from "zustand/middleware";

export type CartItem = {
  slug: string;
  nome: string;
  preco: number;
  quantidade: number;
  categoria: string;
};

type CartStore = {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "quantidade">) => void;
  removeItem: (slug: string) => void;
  updateQuantidade: (slug: string, quantidade: number) => void;
  clearCart: () => void;
  total: () => number;
  totalItems: () => number;
};

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (item) => {
        const items = get().items;
        const existing = items.find((i) => i.slug === item.slug);

        if (existing) {
          set({
            items: items.map((i) =>
              i.slug === item.slug ? { ...i, quantidade: i.quantidade + 1 } : i,
            ),
          });
        } else {
          set({ items: [...items, { ...item, quantidade: 1 }] });
        }
      },

      removeItem: (slug) => {
        set({ items: get().items.filter((i) => i.slug !== slug) });
      },

      updateQuantidade: (slug, quantidade) => {
        if (quantidade <= 0) {
          get().removeItem(slug);
          return;
        }
        set({
          items: get().items.map((i) =>
            i.slug === slug ? { ...i, quantidade } : i,
          ),
        });
      },

      clearCart: () => set({ items: [] }),

      total: () =>
        get().items.reduce((acc, i) => acc + i.preco * i.quantidade, 0),

      totalItems: () => get().items.reduce((acc, i) => acc + i.quantidade, 0),
    }),
    {
      name: "cart-storage",
    },
  ),
);
