import Link from "next/link";

const items = [
  {
    href: "/calendar",
    title: "Economic Calendar",
    desc: "Choix libre des dates + filtres pays et impact.",
  },
  {
    href: "/news",
    title: "Market News",
    desc: "Headlines et recherche news.",
  },
  {
    href: "/charts",
    title: "Forex Charts",
    desc: "Historique daily et visualisation.",
  },
  {
    href: "/seasonality",
    title: "Seasonality",
    desc: "Moyennes mensuelles simples à partir de l’historique.",
  },
  {
    href: "/squawk",
    title: "Squawk Feed",
    desc: "Feed texte qui combine macro + news.",
  },
  {
    href: "/positioning",
    title: "Positioning",
    desc: "COT + retail positioning adapter.",
  },
];

export default function DashboardPage() {
  return (
    <main className="page-wrap">
      <div className="mb-8">
        <p className="text-sm uppercase tracking-[0.18em] text-white/45">
          Dashboard
        </p>
        <h1 className="mt-2 text-4xl font-semibold">Macro command center</h1>
        <p className="mt-4 max-w-2xl text-white/60">
          Point d’entrée de ton MVP. Tout est séparé proprement pour pouvoir
          ajouter plus tard auth, base de données, watchlists et IA.
        </p>
      </div>

      <div className="grid-3">
        {items.map((item) => (
          <div key={item.href} className="card p-6">
            <h2 className="text-xl font-semibold">{item.title}</h2>
            <p className="mt-3 text-sm leading-7 text-white/65">{item.desc}</p>
            <div className="mt-6">
              <Link
                href={item.href}
                className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white transition hover:bg-white/10"
              >
                Ouvrir
              </Link>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}