export const dynamic = "force-dynamic";

type RawNewsItem = {
  title?: string;
  text?: string;
  url?: string;
  site?: string;
  publishedDate?: string;
  symbol?: string;
};

export async function GET() {
  try {
    const response = await fetch(
      "https://financialmodelingprep.com/stable/news/stock-latest?page=0&limit=20&apikey=demo",
      { cache: "no-store" }
    );

    if (!response.ok) {
      return Response.json(
        { error: "Impossible de charger les news." },
        { status: 500 }
      );
    }

    const data: RawNewsItem[] = await response.json();

    const items = data.map((item) => ({
      title: item.title || "Untitled",
      text: item.text || "",
      url: item.url || "",
      site: item.site || "",
      publishedDate: item.publishedDate || "",
      symbol: item.symbol || "",
    }));

    return Response.json({
      generatedAt: new Date().toISOString(),
      items,
    });
  } catch (error) {
    return Response.json(
      { error: "Erreur serveur news.", details: String(error) },
      { status: 500 }
    );
  }
}