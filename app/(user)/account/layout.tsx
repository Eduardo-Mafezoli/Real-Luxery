import Link from "next/link";
import {
  User,
  Package,
  MapPin,
  Lock,
  ShieldCheck,
  CaretRight,
} from "@phosphor-icons/react/dist/ssr";

const navItems = [
  { label: "Meus dados", href: "/account", icon: User },
  { label: "Meus pedidos", href: "/account/orders", icon: Package },
  { label: "Endereços", href: "/account/addresses", icon: MapPin },
  { label: "Segurança", href: "/account/security", icon: Lock },
  { label: "Privacidade & LGPD", href: "/account/privacy", icon: ShieldCheck },
];

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-(--color-fundo)">
      {/* BREADCRUMB */}
      <div className="px-[6rem] py-4 border-b border-gray-200 bg-white">
        <div className="flex items-center gap-2 text-xs text-[#888]">
          <Link
            href="/"
            className="hover:text-(--color-primaria) transition-colors"
          >
            Início
          </Link>
          <span>/</span>
          <span className="text-(--color-texto)">Minha conta</span>
        </div>
      </div>

      <div className="px-[6rem] py-16 max-w-7xl mx-auto flex gap-12 items-start">
        {/* SIDEBAR */}
        <aside className="w-64 shrink-0">
          {/* AVATAR */}
          <div className="bg-white rounded-xl p-6 flex flex-col items-center gap-3 mb-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#fdf0f1] to-[#f0d0d3] flex items-center justify-center">
              <User size={28} className="text-(--color-primaria)" />
            </div>
            <div className="text-center">
              <p className="text-sm font-medium text-(--color-texto)">
                Nome do Usuário
              </p>
              <p className="text-xs text-[#888] mt-0.5">usuario@email.com</p>
            </div>
          </div>

          {/* NAV */}
          <nav className="bg-white rounded-xl overflow-hidden">
            {navItems.map((item, index) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center justify-between px-5 py-4 text-xs tracking-wide hover:bg-(--color-fundo) hover:text-(--color-primaria) transition-colors group
                  ${index !== navItems.length - 1 ? "border-b border-gray-50" : ""}
                  ${item.href === "/account/privacy" ? "text-[#888]" : "text-(--color-texto)"}`}
              >
                <div className="flex items-center gap-3">
                  <item.icon
                    size={16}
                    className="text-(--color-primaria) opacity-70 group-hover:opacity-100"
                  />
                  {item.label}
                </div>
                <CaretRight
                  size={12}
                  className="opacity-30 group-hover:opacity-70"
                />
              </Link>
            ))}

            {/* SAIR */}
            <button className="w-full flex items-center gap-3 px-5 py-4 text-xs tracking-wide text-red-400 hover:bg-red-50 transition-colors border-t border-gray-100">
              <Lock size={16} />
              Sair da conta
            </button>
          </nav>
        </aside>

        {/* CONTEÚDO */}
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}
