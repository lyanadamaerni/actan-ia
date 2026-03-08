"use client";

import { useEffect, useMemo, useState } from "react";

type CalendarEvent = {
  CalendarId?: string;
  Date: string;
  Country: string;
  Event: string;
  Category?: string;
  Importance?: number;
  Actual?: string;
  Previous?: string;
  Forecast?: string;
};

function impactLabel(value?: number) {
  if (value === 3) return "High";
  if (value === 2) return "Medium";
  return "Low";
}

function impactClasses(value?: number) {
  if (value === 3) return "border-red-400/20 bg-red-500/10 text-red-200";
  if (value === 2) return "border-amber-400/20 bg-amber-500/10 text-amber-200";
  return "border-emerald-400/20 bg-emerald-500/10 text-emerald-200";
}

export default function CalendarClient() {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [country, setCountry] = useState("All");
  const [minImportance, setMinImportance] = useState(1);

  useEffect(() => {
    async function loadCalendar() {
      try {
        const res = await fetch("/api/calendar", { cache: "no-store" });
        const data = await res.json();
        setEvents(data.events || []);
      } catch (error) {
        console.error("Calendar fetch error:", error);
      } finally {
        setLoading(false);
      }
    }

    loadCalendar();
  }, []);

  const countries = useMemo(() => {
    const list = Array.from(new Set(events.map((item) => item.Country))).sort();
    return ["All", ...list];
  }, [events]);

  const filteredEvents = useMemo(() => {
    return events.filter((item) => {
      const matchesSearch =
        item.Event.toLowerCase().includes(search.toLowerCase()) ||
        item.Country.toLowerCase().includes(search.toLowerCase()) ||
        (item.Category || "").toLowerCase().includes(search.toLowerCase());

      const matchesCountry = country === "All" || item.Country === country;
      const matchesImportance = (item.Importance || 1) >= minImportance;

      return matchesSearch && matchesCountry && matchesImportance;
    });
  }, [events, search, country, minImportance]);

  return (
    <section className="mx-auto max-w-7xl px-6 pb-16">
      <div className="rounded-[28px] border border-white/10 bg-white/5 p-6 shadow-2xl shadow-black/30">
        <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.18em] text-white/45">
              Economic calendar
            </p>
            <h1 className="mt-2 text-3xl font-semibold text-white">
              Semaine macro en cours
            </h1>
            <p className="mt-2 max-w-2xl text-sm text-white/60">
              Données filtrées automatiquement sur la période actuelle.
            </p>
          </div>

          <div className="grid gap-3 md:grid-cols-3">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Recherche événement ou pays"
              className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none placeholder:text-white/30"
            />

            <select
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none"
            >
              {countries.map((item) => (
                <option key={item} value={item} className="bg-slate-900">
                  {item}
                </option>
              ))}
            </select>

            <select
              value={minImportance}
              onChange={(e) => setMinImportance(Number(e.target.value))}
              className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none"
            >
              <option value={1} className="bg-slate-900">
                Tous les impacts
              </option>
              <option value={2} className="bg-slate-900">
                Medium et High
              </option>
              <option value={3} className="bg-slate-900">
                High seulement
              </option>
            </select>
          </div>
        </div>

        {loading ? (
          <div className="rounded-2xl border border-white/10 bg-black/20 p-6 text-sm text-white/60">
            Chargement du calendrier...
          </div>
        ) : filteredEvents.length === 0 ? (
          <div className="rounded-2xl border border-white/10 bg-black/20 p-6 text-sm text-white/60">
            Aucun événement trouvé avec ces filtres.
          </div>
        ) : (
          <div className="overflow-hidden rounded-[24px] border border-white/10">
            <div className="hidden grid-cols-[170px_160px_1fr_130px_110px_110px_110px] gap-4 bg-white/5 px-5 py-4 text-xs uppercase tracking-[0.16em] text-white/40 lg:grid">
              <div>Date</div>
              <div>Country</div>
              <div>Event</div>
              <div>Impact</div>
              <div>Actual</div>
              <div>Prev.</div>
              <div>Forecast</div>
            </div>

            <div className="divide-y divide-white/10">
              {filteredEvents.map((event, index) => (
                <div
                  key={`${event.CalendarId || event.Event}-${index}`}
                  className="grid gap-3 px-5 py-4 lg:grid-cols-[170px_160px_1fr_130px_110px_110px_110px] lg:items-center"
                >
                  <div className="text-sm text-white/70">
                    {new Date(event.Date).toLocaleString("fr-CH")}
                  </div>

                  <div className="text-sm font-medium text-white">
                    {event.Country}
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-white">
                      {event.Event}
                    </p>
                    <p className="text-xs text-white/45">{event.Category}</p>
                  </div>

                  <div>
                    <span
                      className={`inline-flex rounded-full border px-3 py-1 text-xs ${impactClasses(
                        event.Importance
                      )}`}
                    >
                      {impactLabel(event.Importance)}
                    </span>
                  </div>

                  <div className="text-sm text-white/70">
                    {event.Actual || "-"}
                  </div>
                  <div className="text-sm text-white/70">
                    {event.Previous || "-"}
                  </div>
                  <div className="text-sm text-white/70">
                    {event.Forecast || "-"}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}