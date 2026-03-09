export const dynamic = "force-dynamic";

export async function GET() {
  return Response.json({
    cot: {
      live: false,
      source: "CFTC weekly report",
      note: "Brancher ici un ingester officiel COT ou un export hebdomadaire traité côté backend.",
      rows: [
        {
          market: "USD INDEX",
          net: "demo",
          long: "demo",
          short: "demo",
        },
        {
          market: "EUR",
          net: "demo",
          long: "demo",
          short: "demo",
        },
      ],
    },
    retail: {
      live: false,
      source: "Provider adapter required",
      note: "Aucun provider officiel public gratuit documenté n’a été câblé ici pour le retail positioning live.",
      rows: [
        {
          market: "DXY",
          longPct: "demo",
          shortPct: "demo",
          bias: "demo",
        },
        {
          market: "EURUSD",
          longPct: "demo",
          shortPct: "demo",
          bias: "demo",
        },
      ],
    },
    generatedAt: new Date().toISOString(),
  });
}