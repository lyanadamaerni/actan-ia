import Link from "next/link";

const items = [
  {
    title: "Economic Calendar",
    desc: "Accède à la semaine macro en cours avec filtres pays, recherche et impact.",
    href: "/calendar",
  },
  {
    title: "Market News",
    desc: "Consulte les dernières news marché et ouvre les sources externes.",
    href: "/news",
  },
  {
    title: "Next Features",
    desc: "Zone prévue pour journal de trading, IA, watchlist et alertes.",
    href: "/",
  },
];

export default function DashboardPage() {
  return (
    <main className="mx-auto max-w-7xl px-6 py-16">
      <div className="mb-10">
        <p className="text-sm uppercase tracking-[0.18em] text-white/45">
          Dashboard
        </p>
        <h1 className="mt-2 text-4xl font-semibold text-white">
          Macro command center
        </h1>
        <p className="mt-4 max-w-2xl text-white/60">
          Vue centrale du MVP. Cette page sert de hub et de base pour les
          prochaines briques produit.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {items.map((item) => (
          <div
            key={item.title}
            className="rounded-[26px] border border-white/10 bg-white/5 p-6"
          >
            <h2 className="text-xl font-semibold text-white">{item.title}</h2>
            <p className="mt-3 text-sm leading-7 text-white/60">{item.desc}</p>

            <div className="mt-6">
              <Link
                href={item.href}
                className="inline-flex rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white transition hover:bg-white/10"
              >
                Ouvrir
              </Link>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        <div className="rounded-[26px] border border-blue-400/20 bg-blue-500/10 p-6">
          <p className="text-xs uppercase tracking-[0.18em] text-blue-200/70">
            Backend
          </p>
          <h3 className="mt-2 text-xl font-semibold text-white">
            Routes API internes
          </h3>
          <p className="mt-3 text-sm leading-7 text-white/70">
            Le frontend ne parle pas directement aux APIs externes. Les données
            passent par les Route Handlers Next.js, ce qui est plus propre et
            plus simple à faire évoluer. :contentReference[oaicite:1]{index=1}
          </p>
        </div>

        <div className="rounded-[26px] border border-emerald-400/20 bg-emerald-500/10 p-6">
          <p className="text-xs uppercase tracking-[0.18em] text-emerald-200/70">
            Data
          </p>
          <h3 className="mt-2 text-xl font-semibold text-white">
            Base macro du MVP
          </h3>
          <p className="mt-3 text-sm leading-7 text-white/70">
            Le calendrier économique Trading Economics est documenté comme
            quasi temps réel, et le filtrage par plage de dates est prévu dans
            leur API. :contentReference[oaicite:2]{index=2}
          </p>
        </div>
      </div>
    </main>
  );
}