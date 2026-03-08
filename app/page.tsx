import Hero from "../components/Hero";
import StatCard from "../components/StatCard";

export default function Home() {
  return (
    <main>
      <Hero />

      <section className="mx-auto grid max-w-7xl gap-6 px-6 pb-16 md:grid-cols-3">
        <StatCard
          title="Calendar"
          value="Live Week"
          subtitle="Événements économiques filtrés sur la période actuelle avec recherche, filtres et niveau d’impact."
        />

        <StatCard
          title="News"
          value="Fresh Feed"
          subtitle="News marché récentes récupérées via API backend avec recherche front et liens de sortie."
        />

        <StatCard
          title="Base MVP"
          value="Clean Stack"
          subtitle="Frontend propre, backend Next.js, composants réutilisables et structure prête à évoluer."
        />
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-20">
        <div className="rounded-[30px] border border-white/10 bg-white/5 p-8">
          <p className="text-sm uppercase tracking-[0.18em] text-white/45">
            Vision produit
          </p>
          <h2 className="mt-3 text-3xl font-semibold text-white">
            Actan IA comme base de plateforme FinTech
          </h2>
          <p className="mt-4 max-w-3xl text-base leading-8 text-white/65">
            Cette version se concentre sur le cœur d’un MVP propre : navigation,
            calendrier, news et dashboard. La suite logique sera d’ajouter un
            journal de trading, une couche IA d’explication macro, des alertes,
            puis une base de données utilisateur.
          </p>
        </div>
      </section>
    </main>
  );
}