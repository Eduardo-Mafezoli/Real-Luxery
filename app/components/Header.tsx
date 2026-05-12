"use client";

import Link from "next/link";
import { useState, useRef } from "react";
import {
  MagnifyingGlass,
  ShoppingCart,
  CaretDown,
} from "@phosphor-icons/react";

const produtosMenu = {
  feminino: [
    { label: "Vibradores", href: "/products?categoria=vibradores" },
    { label: "Estimuladores", href: "/products?categoria=estimuladores" },
    { label: "Kits Femininos", href: "/products?categoria=kits-femininos" },
    { label: "Lingeries", href: "/products?categoria=lingeries" },
  ],
  masculino: [
    { label: "Masturbadores", href: "/products?categoria=masturbadores" },
    { label: "Anéis & Extensores", href: "/products?categoria=aneis" },
    { label: "Kits Masculinos", href: "/products?categoria=kits-masculinos" },
    { label: "Acessórios", href: "/products?categoria=acessorios" },
  ],
  sadomasoquismo: [
    { label: "Algemas", href: "/products?categoria=algemas" },
    { label: "Chicote", href: "/products?categoria=chicote" },
    { label: "Mordaça", href: "/products?categoria=mordaca" },
  ],
  geral: [
    { label: "Óleos & Géis", href: "/products?categoria=oleos" },
    { label: "Novidades", href: "/products?categoria=novidades" },
    { label: "Promoções", href: "/products?categoria=promocoes" },
  ],
};

const blogMenu = [
  { label: "Dicas & Tutoriais", href: "/blog?categoria=dicas" },
  { label: "Reviews de Produtos", href: "/blog?categoria=reviews" },
  { label: "Saúde & Bem-estar", href: "/blog?categoria=saude" },
  { label: "Relacionamentos", href: "/blog?categoria=relacionamentos" },
];

export default function Header() {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleEnter = (menu: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setOpenMenu(menu);
  };

  const handleLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setOpenMenu(null);
    }, 200);
  };

  return (
    <header className="bg-(--color-primaria)">
      <nav className="flex justify-between items-center px-[2.5rem] py-[1rem]">
        {/* LOGO */}
        <Link
          href="/"
          className="text-(--color-texto-claro) font-titulo text-2xl font-bold tracking-widest uppercase"
        >
          Real Luxery
        </Link>

        {/* LINKS */}
        <ul className="flex gap-10 list-none items-center">
          {/* INÍCIO */}
          <li>
            <Link
              href="/"
              className="relative flex items-center text-(--color-texto-claro) text-xs tracking-widest uppercase
    after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[1px] after:bg-(--color-texto-claro)
    after:transition-all after:duration-300 hover:after:w-full"
            >
              Início
            </Link>
          </li>

          {/* PRODUTOS */}
          <li
            className="relative"
            onMouseEnter={() => handleEnter("produtos")}
            onMouseLeave={handleLeave}
          >
            <button
              className="flex items-center gap-1 text-(--color-texto-claro) text-xs tracking-widest uppercase 
              relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-(--color-texto-claro)
              after:transition-all after:duration-300 hover:after:w-full bg-transparent border-none cursor-pointer"
            >
              Produtos
              <CaretDown
                size={12}
                className={`transition-transform duration-300 ${openMenu === "produtos" ? "rotate-180" : ""}`}
              />
            </button>

            <div
              onMouseEnter={() => handleEnter("produtos")}
              onMouseLeave={handleLeave}
              className={`absolute top-[calc(100%+0.75rem)] left-1/2 -translate-x-1/2 bg-white shadow-2xl z-50 min-w-[760px]
                transition-all duration-300 origin-top
                ${openMenu === "produtos" ? "opacity-100 scale-y-100 pointer-events-auto" : "opacity-0 scale-y-95 pointer-events-none"}`}
            >
              {/* CABEÇALHO DO DROPDOWN */}
              <div className="grid grid-cols-4 gap-0">
                <div className="p-6 border-r border-gray-100">
                  <p className="text-[10px] tracking-[3px] uppercase text-(--color-primaria) font-semibold mb-4">
                    Para Ela
                  </p>
                  <ul className="flex flex-col gap-3">
                    {produtosMenu.feminino.map((item) => (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          className="text-xs tracking-wide text-(--color-texto) hover:text-(--color-primaria) transition-colors"
                        >
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-6 border-r border-gray-100">
                  <p className="text-[10px] tracking-[3px] uppercase text-(--color-primaria) font-semibold mb-4">
                    Para Ele
                  </p>
                  <ul className="flex flex-col gap-3">
                    {produtosMenu.masculino.map((item) => (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          className="text-xs tracking-wide text-(--color-texto) hover:text-(--color-primaria) transition-colors"
                        >
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-6 border-r border-gray-100">
                  <p className="text-[10px] tracking-[3px] uppercase text-(--color-primaria) font-semibold mb-4">
                    Sadomasoquismo
                  </p>
                  <ul className="flex flex-col gap-3">
                    {produtosMenu.sadomasoquismo.map((item) => (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          className="text-xs tracking-wide text-(--color-texto) hover:text-(--color-primaria) transition-colors"
                        >
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-6 bg-(--color-fundo)">
                  <p className="text-[10px] tracking-[3px] uppercase text-(--color-primaria) font-semibold mb-4">
                    Geral
                  </p>
                  <ul className="flex flex-col gap-3">
                    {produtosMenu.geral.map((item) => (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          className="text-xs tracking-wide text-(--color-texto) hover:text-(--color-primaria) transition-colors"
                        >
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* RODAPÉ DO DROPDOWN */}
              <div className="bg-(--color-primaria) px-6 py-3 flex justify-between items-center">
                <p className="text-[10px] text-(--color-texto-claro) tracking-widest uppercase opacity-80">
                  Entrega discreta em todo o Brasil
                </p>
                <Link
                  href="/products"
                  className="text-[10px] text-(--color-texto-claro) tracking-widest uppercase border-b border-(--color-texto-claro) hover:opacity-70 transition-opacity"
                >
                  Ver todos →
                </Link>
              </div>
            </div>
          </li>

          {/* BLOG */}
          <li
            className="relative"
            onMouseEnter={() => handleEnter("blog")}
            onMouseLeave={handleLeave}
          >
            <button
              className="flex items-center gap-1 text-(--color-texto-claro) text-xs tracking-widest uppercase
              relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-(--color-texto-claro)
              after:transition-all after:duration-300 hover:after:w-full bg-transparent border-none cursor-pointer"
            >
              Blog
              <CaretDown
                size={12}
                className={`transition-transform duration-300 ${openMenu === "blog" ? "rotate-180" : ""}`}
              />
            </button>

            <div
              onMouseEnter={() => handleEnter("blog")}
              onMouseLeave={handleLeave}
              className={`absolute top-[calc(100%+0.75rem)] left-1/2 -translate-x-1/2 bg-white shadow-2xl z-50 min-w-[320px]
    transition-all duration-300 origin-top
    ${openMenu === "blog" ? "opacity-100 scale-y-100 pointer-events-auto" : "opacity-0 scale-y-95 pointer-events-none"}`}
            >
              <ul className="flex flex-col py-3">
                {blogMenu.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="block px-6 py-2.5 text-xs tracking-widest uppercase text-(--color-texto) hover:bg-(--color-fundo) hover:text-(--color-primaria) transition-colors"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>

              {/* RODAPÉ */}
              <div className="bg-(--color-primaria) px-6 py-3 flex justify-between items-center">
                <p className="text-[10px] text-(--color-texto-claro) tracking-widest uppercase opacity-80">
                  Conteúdo novo toda semana
                </p>
                <Link
                  href="/blog"
                  className="text-[10px] text-(--color-texto-claro) tracking-widest uppercase border-b border-(--color-texto-claro) hover:opacity-70 transition-opacity"
                >
                  Ver todos →
                </Link>
              </div>
            </div>
          </li>
        </ul>

        {/* AÇÕES */}
        <div className="flex items-center gap-4">
          <button className="text-(--color-texto-claro) hover:opacity-70 transition-opacity">
            <MagnifyingGlass size={20} />
          </button>
          <Link
            href="/carrinho"
            className="text-(--color-texto-claro) hover:opacity-70 transition-opacity"
          >
            <ShoppingCart size={20} />
          </Link>
          <Link
            href="/login"
            className="text-(--color-texto-claro) border border-(--color-texto-claro) px-4 py-1.5 text-xs tracking-widest uppercase hover:bg-(--color-texto-claro) hover:text-(--color-primaria) transition-all"
          >
            Login
          </Link>
        </div>
      </nav>
    </header>
  );
}
