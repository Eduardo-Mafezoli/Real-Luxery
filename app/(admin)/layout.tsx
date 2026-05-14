import Link from "next/link";
import {
  ChartPieIcon,
  PackageIcon,
  ArticleIcon,
  ShoppingCartIcon,
  StarIcon,
  GearIcon,
  SignOutIcon,
} from "@phosphor-icons/react/dist/ssr";

const navItems = [
  { label: "Dashboard", href: "/admin", icon: ChartPieIcon },
  { label: "Produtos", href: "/admin/products", icon: PackageIcon },
  { label: "Pedidos", href: "/admin/orders", icon: ShoppingCartIcon },
  { label: "Blog", href: "/admin/blog", icon: ArticleIcon },
  { label: "Avaliações", href: "/admin/reviews", icon: StarIcon },
  { label: "Configurações", href: "/admin/settings", icon: GearIcon },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex bg-[#f8f8f8]">
      {/* SIDEBAR */}
      <aside className="w-60 shrink-0 bg-(--color-primaria) flex flex-col min-h-screen fixed left-0 top-0">
        {/* LOGO */}
        <div className="px-6 py-6 border-b border-white/10">
          <Link
            href="/"
            className="text-white font-titulo text-xl font-bold tracking-widest uppercase"
          >
            Real Luxery
          </Link>
          <p className="text-[0.6rem] text-white/50 tracking-[3px] uppercase mt-0.5">
            Admin Panel
          </p>
        </div>

        {/* NAV */}
        <nav className="flex-1 px-3 py-6 flex flex-col gap-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-all text-xs tracking-wide"
            >
              <item.icon size={16} />
              {item.label}
            </Link>
          ))}
        </nav>

        {/* BOTTOM */}
        <div className="px-3 py-4 border-t border-white/10">
          <div className="flex items-center gap-3 px-4 py-3 mb-1">
            <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center">
              <span className="text-[0.6rem] text-white font-bold">A</span>
            </div>
            <div>
              <p className="text-xs text-white font-medium">Admin</p>
              <p className="text-[0.6rem] text-white/50">
                admin@realluxery.com
              </p>
            </div>
          </div>
          <button className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-all text-xs tracking-wide">
            <SignOutIcon size={16} />
            Sair
          </button>
        </div>
      </aside>

      {/* CONTEÚDO */}
      <main className="flex-1 ml-60 min-h-screen">
        {/* TOPBAR */}
        <div className="bg-white border-b border-gray-100 px-8 py-4 flex items-center justify-between sticky top-0 z-40">
          <div />
          <div className="flex items-center gap-3">
            <span className="font-corpo text-xs text-[#888]">
              Bem-vindo, Admin
            </span>
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#fdf0f1] to-[#f0d0d3] flex items-center justify-center">
              <span className="text-xs text-(--color-primaria) font-bold">
                A
              </span>
            </div>
          </div>
        </div>

        {/* PAGE CONTENT */}
        <div className="p-8">{children}</div>
      </main>
    </div>
  );
}
