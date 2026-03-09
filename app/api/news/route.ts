export const dynamic = "force-dynamic";

type RawNews = {
  title?: string;
  text?: string;
  url?: string;
  site?: string;
  publishedDate?: string;
  symbol?: string;
};

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const limit = url.searchParams.get("limit") || "20";

    const response = await fetch(
      `https://financialmodelingprep.com/stable/news/stock-latest?page=0&limit=${limit}&apikey=demo`,
      { cache: "no-store" }
    );

    if (!response.ok) {
      return Response.json(
        { error: "Impossible de charger les news." },
        { status: 500 }
      );
    }

    const data: RawNews[] = await response.json();

    return Response.json({
      items: data.map((item) => ({
        title: item.title || "Untitled",
        text: item.text || "",
        url: item.url || "",
        site: item.site || "",
        publishedDate: item.publishedDate || "",
        symbol: item.symbol || "",
      })),
      generatedAt: new Date().toISOString(),
    });
  } catch (error) {
    return Response.json(
      { error: "Erreur serveur news.", details: String(error) },
      { status: 500 }
    );
  }
}