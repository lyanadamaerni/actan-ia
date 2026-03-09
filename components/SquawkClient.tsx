"use client";

import { useEffect, useState } from "react";

type SquawkItem = {
  type: "calendar" | "news";
  time: string;
  title: string;
  subtitle: string;
  impact?: string;
  url?: string;
};

export default function SquawkClient() {
  const [items, setItems] = useState<SquawkItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadFeed() {
      const res = await fetch("/api/squawk", { cache: "no-store" });
      const data = await res.json();
      setItems(data.items || []);
      setLoading(false);
    }

    loadFeed();
    const timer = setInterval(loadFeed, 60000);

    return () => clearInterval(timer);
  }, []);

  return (
    <main className="page-wrap">
      <div className="card p-6">
        <div className="mb-6">
          <p className="text-sm uppercase tracking-[0.18em] text-white/45">
            Squawk
          </p>
          <h1 className="mt-2 text-4xl font-semibold">Feed texte macro</h1>
          <p className="mt-3 max-w-2xl text-white/60">
            V1 propre : ce n’est pas un flux audio, mais un feed texte rafraîchi
            automatiquement.
          </p>
        </div>

        {loading ? (
          <div className="rounded-2xl border border-white/10 bg-black/20 p-6 text-white/60">
            Chargement...
          </div>
        ) : (
          <div className="grid gap-4">
            {items.map((item, index) => (
              <div
                key={`${item.title}-${index}`}
                className="rounded-2xl border border-white/10 bg-black/20 p-5"
              >
                <div className="mb-2 flex flex-wrap gap-2">
                  <span className="badge">{item.type}</span>
                  {item.impact ? (
                    <span
                      className={
                        item.impact === "High"
                          ? "badge badge-high"
                          : "badge badge-medium"
                      }
                    >
                      {item.impact}
                    </span>
                  ) : null}
                  <span className="badge">
                    {new Date(item.time).toLocaleString("fr-CH")}
                  </span>
                </div>

                <h2 className="text-lg font-semibold">{item.title}</h2>
                <p className="mt-2 text-sm text-white/60">{item.subtitle}</p>

                {item.url ? (
                  <div className="mt-4">
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white transition hover:bg-white/10"
                    >
                      Ouvrir
                    </a>
                  </div>
                ) : null}
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}