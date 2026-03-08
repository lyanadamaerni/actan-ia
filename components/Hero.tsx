import Link from "next/link";

export default function Hero() {
  const today = new Date().toLocaleDateString("fr-CH", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  return (
    <section className="mx-auto max-w-7xl px-6 pt-16 pb-10">
      <div className="grid items-center gap-10 lg:grid-cols-[1.15fr_0.85fr]">
        <div>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.2em] text-white/70">
            <span className="inline-block h-2 w-2 rounded-full bg-emerald-400" />
            Données du jour — {today}
          </div>

          <h1 className="max-w-4xl text-5xl font-semibold leading-tight tracking-tight text-white md:text-7xl">
            Actan IA
            <span className="mt-2 block bg-gradient-to-r from-blue-300 via-cyan-200 to-violet-300 bg-clip-text text-transparent">
              analyse le macro, les news et le calendrier économique
            </span>
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-white/65">
            Un MVP FinTech propre pour suivre les événements macroéconomiques,
            filtrer les news de marché et poser les bases d’une vraie plateforme
            d’analyse.
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
              Voir les news marché
            </Link>

            <Link
              href="/dashboard"
              className="rounded-2xl border border-blue-400/30 bg-blue-500/10 px-6 py-4 text-sm font-semibold text-blue-200 transition hover:bg-blue-500/20"
            >
              Aller au dashboard
            </Link>
          </div>
        </div>

        <div className="rounded-[28px] border border-white/10 bg-white/5 p-6 shadow-2xl shadow-black/40">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <p className="text-sm text-white/50">Vue rapide</p>
              <h2 className="text-xl font-semibold text-white">
                Macro command center
              </h2>
            </div>
            <div className="rounded-xl border border-emerald-400/20 bg-emerald-500/10 px-3 py-1 text-xs text-emerald-300">
              Live
            </div>
          </div>

          <div className="space-y-4">
            <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
              <p className="text-xs uppercase tracking-[0.18em] text-white/40">
                Calendar
              </p>
              <p className="mt-2 text-sm text-white/70">
                Événements filtrés sur la semaine en cours.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
              <p className="text-xs uppercase tracking-[0.18em] text-white/40">
                News
              </p>
              <p className="mt-2 text-sm text-white/70">
                Headlines récentes avec recherche et ouverture de lien.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
              <p className="text-xs uppercase tracking-[0.18em] text-white/40">
                Dashboard
              </p>
              <p className="mt-2 text-sm text-white/70">
                Résumé produit, accès rapide et base pour les prochaines
                fonctionnalités IA.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}