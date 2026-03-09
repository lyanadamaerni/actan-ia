export const dynamic = "force-dynamic";

type FmpBar = {
  date: string;
  open?: number;
  high?: number;
  low?: number;
  close?: number;
  volume?: number;
};

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const symbol = (url.searchParams.get("symbol") || "EURUSD").toUpperCase();
    const limit = url.searchParams.get("limit") || "365";

    const response = await fetch(
      `https://financialmodelingprep.com/stable/historical-price-eod/light?symbol=${symbol}&apikey=demo`,
      { cache: "no-store" }
    );

    if (!response.ok) {
      return Response.json(
        { error: "Impossible de charger l'historique forex." },
        { status: 500 }
      );
    }

    const data: FmpBar[] = await response.json();

    const bars = (data || [])
      .filter((item) => item.date && typeof item.close === "number")
      .slice(0, Number(limit))
      .reverse();

    return Response.json({
      symbol,
      bars,
      generatedAt: new Date().toISOString(),
    });
  } catch (error) {
    return Response.json(
      { error: "Erreur serveur historique forex.", details: String(error) },
      { status: 500 }
    );
  }
}