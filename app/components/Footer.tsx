import Link from "next/link";
import {
  InstagramLogo,
  TiktokLogo,
  WhatsappLogo,
} from "@phosphor-icons/react/dist/ssr";

const institucionalLinks = [
  { label: "Sobre nós", href: "/sobre" },
  { label: "Privacidade", href: "/privacidade" },
  { label: "Termos de uso", href: "/termos" },
];

const produtosLinks = [
  { label: "Para Elas", href: "/produtos/para-elas" },
  { label: "Para Eles", href: "/produtos/para-eles" },
  { label: "Sadomasoquismo", href: "/produtos/sadomasoquismo" },
];

const atendimentoLinks = [
  { label: "WhatsApp", href: "https://wa.me/5588999999999", external: true },
  { label: "E-mail", href: "mailto:contato@realluxery.com", external: true },
  { label: "FAQ", href: "/faq" },
];

const redesSociais = [
  {
    label: "Instagram",
    href: "https://instagram.com/realluxery",
    icon: InstagramLogo,
  },
  { label: "TikTok", href: "https://tiktok.com/@realluxery", icon: TiktokLogo },
];

export default function Footer() {
  return (
    <footer className="bg-(--color-primaria) text-(--color-texto-claro) px-[2.5rem] pt-16 pb-8 mt-auto">
      {/* GRID */}
      <div className="grid grid-cols-4 gap-8 max-w-6xl mx-auto pb-12 border-b border-white/20">
        {/* INSTITUCIONAL */}
        <div className="flex flex-col gap-3">
          <h4 className="font-titulo text-sm tracking-[3px] uppercase font-semibold mb-1">
            Institucional
          </h4>
          {institucionalLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-xs tracking-wide opacity-80 hover:opacity-100 transition-opacity"
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* PRODUTOS */}
        <div className="flex flex-col gap-3">
          <h4 className="font-titulo text-sm tracking-[3px] uppercase font-semibold mb-1">
            Produtos
          </h4>
          {produtosLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-xs tracking-wide opacity-80 hover:opacity-100 transition-opacity"
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* ATENDIMENTO */}
        <div className="flex flex-col gap-3">
          <h4 className="font-titulo text-sm tracking-[3px] uppercase font-semibold mb-1">
            Atendimento
          </h4>
          {atendimentoLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              target={item.external ? "_blank" : undefined}
              rel={item.external ? "noopener noreferrer" : undefined}
              className="text-xs tracking-wide opacity-80 hover:opacity-100 transition-opacity"
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* REDES SOCIAIS */}
        <div className="flex flex-col gap-3">
          <h4 className="font-titulo text-sm tracking-[3px] uppercase font-semibold mb-1">
            Redes Sociais
          </h4>
          {redesSociais.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-xs opacity-80 hover:opacity-100 transition-opacity"
            >
              <item.icon size={16} />
              {item.label}
            </Link>
          ))}
        </div>
      </div>

      {/* BOTTOM */}
      <div className="flex justify-between items-center pt-6 max-w-6xl mx-auto">
        <p className="text-xs opacity-60 tracking-wide">
          &copy; 2026 Real Luxery. Todos os direitos reservados.
        </p>
        <p className="text-xs opacity-60">Feito com 🖤 no Ceará</p>
      </div>
    </footer>
  );
}
