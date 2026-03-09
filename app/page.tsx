import Hero from "../components/Hero";

export default function HomePage() {
  return (
    <main>
      <Hero />

      <section className="page-wrap">
        <div className="grid-3">
          <div className="card p-6">
            <p className="text-xs uppercase tracking-[0.18em] text-white/45">
              Calendar
            </p>
            <h2 className="mt-3 text-2xl font-semibold">Date picker complet</h2>
            <p className="mt-3 text-sm leading-7 text-white/65">
              Tu peux choisir librement une date de début et une date de fin, ou
              basculer rapidement sur Today / This Week / Next Week.
            </p>
          </div>

          <div className="card p-6">
            <p className="text-xs uppercase tracking-[0.18em] text-white/45">
              Charts
            </p>
            <h2 className="mt-3 text-2xl font-semibold">Graphiques propres</h2>
            <p className="mt-3 text-sm leading-7 text-white/65">
              Page charting dédiée avec historique forex et base pour ajouter
              plus tard des overlays techniques.
            </p>
          </div>

          <div className="card p-6">
            <p className="text-xs uppercase tracking-[0.18em] text-white/45">
              Macro feed
            </p>
            <h2 className="mt-3 text-2xl font-semibold">News + squawk</h2>
            <p className="mt-3 text-sm leading-7 text-white/65">
              News marché, flux texte type squawk et tri rapide des événements
              à plus fort impact.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}