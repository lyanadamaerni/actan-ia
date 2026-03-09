"use client";

import { useEffect, useState } from "react";

type PositioningResponse = {
  cot: {
    live: boolean;
    source: string;
    note: string;
    rows: Array<{
      market: string;
      net: string;
      long: string;
      short: string;
    }>;
  };
  retail: {
    live: boolean;
    source: string;
    note: string;
    rows: Array<{
      market: string;
      longPct: string;
      shortPct: string;
      bias: string;
    }>;
  };
};

export default function PositioningClient() {
  const [data, setData] = useState<PositioningResponse | null>(null);

  useEffect(() => {
    async function load() {
      const res = await fetch("/api/positioning", { cache: "no-store" });
      const json = await res.json();
      setData(json);
    }

    load();
  }, []);

  if (!data) {
    return (
      <main className="page-wrap">
        <div className="card p-6">Chargement...</div>
      </main>
    );
  }

  return (
    <main className="page-wrap">
      <div className="grid-2">
        <div className="card p-6">
          <p className="text-sm uppercase tracking-[0.18em] text-white/45">
            COT
          </p>
          <h1 className="mt-2 text-3xl font-semibold">Commitment of Traders</h1>
          <p className="mt-3 text-white/60">{data.cot.note}</p>

          <div className="mt-6 table-wrap">
            <table className="table">
              <thead>
                <tr>
                  <th>Market</th>
                  <th>Net</th>
                  <th>Long</th>
                  <th>Short</th>
                </tr>
              </thead>
              <tbody>
                {data.cot.rows.map((row, index) => (
                  <tr key={`${row.market}-${index}`}>
                    <td>{row.market}</td>
                    <td>{row.net}</td>
                    <td>{row.long}</td>
                    <td>{row.short}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="mt-4 text-sm text-white/50">
            Le COT n’est pas temps réel.
          </p>
        </div>

        <div className="card p-6">
          <p className="text-sm uppercase tracking-[0.18em] text-white/45">
            Retail Positioning
          </p>
          <h1 className="mt-2 text-3xl font-semibold">DXY / FX sentiment adapter</h1>
          <p className="mt-3 text-white/60">{data.retail.note}</p>

          <div className="mt-6 table-wrap">
            <table className="table">
              <thead>
                <tr>
                  <th>Market</th>
                  <th>Long %</th>
                  <th>Short %</th>
                  <th>Bias</th>
                </tr>
              </thead>
              <tbody>
                {data.retail.rows.map((row, index) => (
                  <tr key={`${row.market}-${index}`}>
                    <td>{row.market}</td>
                    <td>{row.longPct}</td>
                    <td>{row.shortPct}</td>
                    <td>{row.bias}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="mt-4 text-sm text-white/50">
            Cette partie est volontairement un adapter propre à brancher plus tard.
          </p>
        </div>
      </div>
    </main>
  );
}