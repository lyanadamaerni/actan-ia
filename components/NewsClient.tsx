"use client";

import { useEffect, useMemo, useState } from "react";

type NewsItem = {
  title: string;
  text: string;
  url: string;
  site?: string;
  publishedDate?: string;
  symbol?: string;
};

export default function NewsClient() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function loadNews() {
      try {
        const res = await fetch("/api/news", { cache: "no-store" });
        const data = await res.json();
        setNews(data.items || []);
      } catch (error) {
        console.error("News fetch error:", error);
      } finally {
        setLoading(false);
      }
    }

    loadNews();
  }, []);

  const filteredNews = useMemo(() => {
    return news.filter((item) => {
      const q = search.toLowerCase();
      return (
        item.title.toLowerCase().includes(q) ||
        item.text.toLowerCase().includes(q) ||
        (item.symbol || "").toLowerCase().includes(q) ||
        (item.site || "").toLowerCase().includes(q)
      );
    });
  }, [news, search]);

  return (
    <section className="mx-auto max-w-7xl px-6 pb-16">
      <div className="rounded-[28px] border border-white/10 bg-white/5 p-6 shadow-2xl shadow-black/30">
        <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.18em] text-white/45">
              Market news
            </p>
            <h1 className="mt-2 text-3xl font-semibold text-white">
              Headlines de marché
            </h1>
            <p className="mt-2 max-w-2xl text-sm text-white/60">
              Flux news récent avec recherche rapide.
            </p>
          </div>

          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Recherche news, source ou symbole"
            className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none placeholder:text-white/30 lg:max-w-sm"
          />
        </div>

        {loading ? (
          <div className="rounded-2xl border border-white/10 bg-black/20 p-6 text-sm text-white/60">
            Chargement des news...
          </div>
        ) : filteredNews.length === 0 ? (
          <div className="rounded-2xl border border-white/10 bg-black/20 p-6 text-sm text-white/60">
            Aucune news trouvée avec cette recherche.
          </div>
        ) : (
          <div className="grid gap-4">
            {filteredNews.map((item, index) => (
              <article
                key={`${item.title}-${index}`}
                className="rounded-[24px] border border-white/10 bg-black/20 p-5 transition hover:border-white/20 hover:bg-black/30"
              >
                <div className="mb-3 flex flex-wrap items-center gap-2">
                  {item.site ? (
                    <span className="rounded-full border border-blue-400/20 bg-blue-500/10 px-3 py-1 text-xs text-blue-200">
                      {item.site}
                    </span>
                  ) : null}

                  {item.symbol ? (
                    <span className="rounded-full border border-violet-400/20 bg-violet-500/10 px-3 py-1 text-xs text-violet-200">
                      {item.symbol}
                    </span>
                  ) : null}

                  {item.publishedDate ? (
                    <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/60">
                      {new Date(item.publishedDate).toLocaleString("fr-CH")}
                    </span>
                  ) : null}
                </div>

                <h2 className="text-lg font-semibold text-white">
                  {item.title}
                </h2>

                <p className="mt-3 text-sm leading-7 text-white/65">
                  {item.text || "Pas de résumé disponible."}
                </p>

                {item.url ? (
                  <div className="mt-4">
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white transition hover:bg-white/10"
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
    </section>
  );
}