"use client";

import Link from "next/link";
import { ShoppingCart } from "@phosphor-icons/react";
import { useCartStore } from "@/app/store/useCartStore";

export default function CartBadge() {
  const totalItems = useCartStore((state) => state.totalItems());

  return (
    <Link
      href="/cart"
      className="relative text-(--color-texto-claro) hover:opacity-70 transition-opacity"
    >
      <ShoppingCart size={20} />
      {totalItems > 0 && (
        <span className="absolute -top-2 -right-2 w-4 h-4 bg-white text-(--color-primaria) text-[0.6rem] font-bold rounded-full flex items-center justify-center leading-none">
          {totalItems > 9 ? "9+" : totalItems}
        </span>
      )}
    </Link>
  );
}
