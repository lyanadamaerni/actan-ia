"use client";

import { useEffect, useMemo, useState } from "react";

type NewsItem = {
  title: string;
  text: string;
  url: string;
  site: string;
  publishedDate: string;
  symbol: string;
};

export default function NewsClient() {
  const [items, setItems] = useState<NewsItem[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadNews() {
      const res = await fetch("/api/news?limit=25", { cache: "no-store" });
      const data = await res.json();
      setItems(data.items || []);
      setLoading(false);
    }

    loadNews();
  }, []);

  const filtered = useMemo(() => {
    return items.filter((item) => {
      const q = search.toLowerCase();
      return (
        item.title.toLowerCase().includes(q) ||
        item.text.toLowerCase().includes(q) ||
        item.site.toLowerCase().includes(q) ||
        item.symbol.toLowerCase().includes(q)
      );
    });
  }, [items, search]);

  return (
    <main className="page-wrap">
      <div className="card p-6">
        <div className="mb-6">
          <p className="text-sm uppercase tracking-[0.18em] text-white/45">
            Market News
          </p>
          <h1 className="mt-2 text-4xl font-semibold">News marché</h1>
        </div>

        <div className="mb-6">
          <input
            className="input"
            placeholder="Recherche news, source ou symbole"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {loading ? (
          <div className="rounded-2xl border border-white/10 bg-black/20 p-6 text-white/60">
            Chargement...
          </div>
        ) : (
          <div className="grid gap-4">
            {filtered.map((item, index) => (
              <article
                key={`${item.title}-${index}`}
                className="rounded-2xl border border-white/10 bg-black/20 p-5"
              >
                <div className="mb-3 flex flex-wrap gap-2">
                  {item.site ? <span className="badge">{item.site}</span> : null}
                  {item.symbol ? <span className="badge">{item.symbol}</span> : null}
                  {item.publishedDate ? (
                    <span className="badge">
                      {new Date(item.publishedDate).toLocaleString("fr-CH")}
                    </span>
                  ) : null}
                </div>

                <h2 className="text-lg font-semibold">{item.title}</h2>
                <p className="mt-3 text-sm leading-7 text-white/65">
                  {item.text || "Pas de résumé disponible."}
                </p>

                {item.url ? (
                  <div className="mt-4">
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white transition hover:bg-white/10"
                    >
                      Ouvrir la source
                    </a>
                  </div>
                ) : null}
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}