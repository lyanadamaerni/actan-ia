import Link from "next/link";

const items = [
  { href: "/", label: "Home" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/calendar", label: "Calendar" },
  { href: "/news", label: "News" },
  { href: "/charts", label: "Charts" },
  { href: "/seasonality", label: "Seasonality" },
  { href: "/squawk", label: "Squawk" },
  { href: "/positioning", label: "Positioning" },
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/30 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/10 text-lg font-bold text-white">
            A
          </div>
          <div>
            <p className="text-sm uppercase tracking-[0.22em] text-blue-300">
              Actan IA
            </p>
            <p className="text-xs text-white/45">Macro Intelligence</p>
          </div>
        </Link>

        <nav className="hidden gap-2 lg:flex">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-xl px-4 py-2 text-sm text-white/70 transition hover:bg-white/10 hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/calendar"
          className="rounded-xl border border-blue-400/25 bg-blue-500/10 px-4 py-2 text-sm font-semibold text-blue-200 transition hover:bg-blue-500/20"
        >
          Live Macro
        </Link>
      </div>
    </header>
  );
}