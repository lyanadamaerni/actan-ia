"use client";

import { useEffect, useRef, useState } from "react";
import { createChart, IChartApi, LineSeries } from "lightweight-charts";

type Bar = {
  date: string;
  close: number;
};

export default function ChartClient() {
  const [symbol, setSymbol] = useState("EURUSD");
  const [bars, setBars] = useState<Bar[]>([]);
  const chartRef = useRef<HTMLDivElement | null>(null);
  const instanceRef = useRef<IChartApi | null>(null);

  useEffect(() => {
    async function loadHistory() {
      const res = await fetch(`/api/forex-history?symbol=${symbol}&limit=365`, {
        cache: "no-store",
      });
      const data = await res.json();
      setBars(data.bars || []);
    }

    loadHistory();
  }, [symbol]);

  useEffect(() => {
    if (!chartRef.current) return;
    if (!bars.length) return;

    chartRef.current.innerHTML = "";

    const chart = createChart(chartRef.current, {
      width: chartRef.current.clientWidth,
      height: 420,
      layout: {
        background: { color: "transparent" },
        textColor: "rgba(255,255,255,0.7)",
      },
      grid: {
        vertLines: { color: "rgba(255,255,255,0.06)" },
        horzLines: { color: "rgba(255,255,255,0.06)" },
      },
      rightPriceScale: {
        borderColor: "rgba(255,255,255,0.1)",
      },
      timeScale: {
        borderColor: "rgba(255,255,255,0.1)",
      },
    });

    const series = chart.addSeries(LineSeries, {
      lineWidth: 2,
      color: "#60a5fa",
    });

    series.setData(
      bars.map((bar) => ({
        time: bar.date,
        value: bar.close,
      }))
    );

    chart.timeScale().fitContent();
    instanceRef.current = chart;

    const onResize = () => {
      if (chartRef.current && instanceRef.current) {
        instanceRef.current.applyOptions({
          width: chartRef.current.clientWidth,
        });
      }
    };

    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      chart.remove();
      instanceRef.current = null;
    };
  }, [bars]);

  return (
    <main className="page-wrap">
      <div className="card p-6">
        <div className="mb-6 flex flex-wrap items-end gap-4">
          <div>
            <p className="text-sm uppercase tracking-[0.18em] text-white/45">
              Charting
            </p>
            <h1 className="mt-2 text-4xl font-semibold">Forex chart</h1>
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

        <div ref={chartRef} className="w-full" />

        <p className="mt-4 text-sm text-white/55">
          Historique daily simple pour MVP.
        </p>
      </div>
    </main>
  );
}