"use client";

import { useEffect, useMemo, useState } from "react";

type Bar = {
  date: string;
  close: number;
};

export default function SeasonalityClient() {
  const [symbol, setSymbol] = useState("EURUSD");
  const [bars, setBars] = useState<Bar[]>([]);

  useEffect(() => {
    async function loadHistory() {
      const res = await fetch(`/api/forex-history?symbol=${symbol}&limit=1500`, {
        cache: "no-store",
      });
      const data = await res.json();
      setBars(data.bars || []);
    }

    loadHistory();
  }, [symbol]);

  const seasonality = useMemo(() => {
    const months = Array.from({ length: 12 }, (_, i) => ({
      month: i + 1,
      values: [] as number[],
    }));

    for (let i = 1; i < bars.length; i++) {
      const prev = bars[i - 1];
      const current = bars[i];
      if (!prev.close || !current.close) continue;

      const month = new Date(current.date).getMonth();
      const change = ((current.close - prev.close) / prev.close) * 100;
      months[month].values.push(change);
    }

    return months.map((m) => {
      const avg =
        m.values.length > 0
          ? m.values.reduce((a, b) => a + b, 0) / m.values.length
          : 0;

      return {
        month: m.month,
        avg: Number(avg.toFixed(3)),
      };
    });
  }, [bars]);

  const monthNames = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
  ];

  return (
    <main className="page-wrap">
      <div className="card p-6">
        <div className="mb-6 flex flex-wrap items-end gap-4">
          <div>
            <p className="text-sm uppercase tracking-[0.18em] text-white/45">
              Seasonality
            </p>
            <h1 className="mt-2 text-4xl font-semibold">Saisonnalité simple</h1>
          </div>

          <div className="ml-auto w-full max-w-xs">
            <select
              className="select"
              value={symbol}
              onChange={(e) => setSymbol(e.target.value)}
            >
              <option value="EURUSD">EURUSD</option>
              <option value="GBPUSD">GBPUSD</option>
              <option value="USDJPY">USDJPY</option>
              <option value="AUDUSD">AUDUSD</option>
              <option value="NZDUSD">NZDUSD</option>
              <option value="USDCAD">USDCAD</option>
              <option value="USDCHF">USDCHF</option>
            </select>
          </div>
        </div>

        <div className="grid-3">
          {seasonality.map((item) => (
            <div key={item.month} className="rounded-2xl border border-white/10 bg-black/20 p-4">
              <p className="text-sm text-white/45">{monthNames[item.month - 1]}</p>
              <p className="mt-2 text-2xl font-semibold">{item.avg}%</p>
            </div>
          ))}
        </div>

        <p className="mt-6 text-sm text-white/55">
          Calcul simple basé sur les variations journalières regroupées par mois.
        </p>
      </div>
    </main>
  );
}