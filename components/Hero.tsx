import Link from "next/link";

export default function Hero() {
  const today = new Date().toLocaleDateString("fr-CH", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  return (
    <section className="page-wrap">
      <div className="grid items-center gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <div>
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.18em] text-white/70">
            <span className="inline-block h-2 w-2 rounded-full bg-emerald-400" />
            Données du jour — {today}
          </div>

          <h1 className="max-w-4xl text-5xl font-semibold leading-tight tracking-tight md:text-7xl">
            Actan IA
            <span className="mt-3 block bg-gradient-to-r from-blue-300 via-cyan-200 to-violet-300 bg-clip-text text-transparent">
              calendrier, news, charting, seasonality, squawk et positioning
            </span>
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-white/65">
            MVP FinTech propre avec backend Next.js, filtres de dates, flux macro,
            charting forex et pages prêtes à évoluer vers un vrai SaaS.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/calendar"
              className="rounded-2xl bg-white px-6 py-4 text-sm font-semibold text-black transition hover:scale-[1.02]"
            >
              Ouvrir le calendrier
            </Link>

            <Link
              href="/news"
              className="rounded-2xl border border-white/15 bg-white/5 px-6 py-4 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Voir les news
            </Link>

            <Link
              href="/dashboard"
              className="rounded-2xl border border-blue-400/30 bg-blue-500/10 px-6 py-4 text-sm font-semibold text-blue-200 transition hover:bg-blue-500/20"
            >
              Aller au dashboard
            </Link>
          </div>
        </div>

        <div className="card p-6">
          <p className="text-sm uppercase tracking-[0.18em] text-white/45">
            Aperçu
          </p>
          <div className="mt-4 space-y-4">
            <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
              <h3 className="font-semibold">Calendar</h3>
              <p className="mt-2 text-sm text-white/60">
                Filtres de dates libres, recherche, pays et impact.
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
              <h3 className="font-semibold">Charts + Seasonality</h3>
              <p className="mt-2 text-sm text-white/60">
                Historique forex + calcul saisonnier simple.
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
              <h3 className="font-semibold">Squawk + Positioning</h3>
              <p className="mt-2 text-sm text-white/60">
                Feed texte macro et panneaux positioning prêts à brancher.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}