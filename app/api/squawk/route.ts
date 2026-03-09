export const dynamic = "force-dynamic";

type SquawkItem = {
  type: "calendar" | "news";
  time: string;
  title: string;
  subtitle: string;
  impact?: string;
  url?: string;
};

export async function GET() {
  try {
    const today = new Date().toISOString().split("T")[0];
    const next = new Date();
    next.setDate(next.getDate() + 3);
    const nextISO = next.toISOString().split("T")[0];

    const [calendarRes, newsRes] = await Promise.all([
      fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/api/calendar?from=${today}&to=${nextISO}`,
        { cache: "no-store" }
      ),
      fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/api/news?limit=10`,
        { cache: "no-store" }
      ),
    ]);

    const calendarData = await calendarRes.json();
    const newsData = await newsRes.json();

    const calendarItems: SquawkItem[] = (calendarData.events || [])
      .filter((item: any) => (item.Importance || 1) >= 2)
      .slice(0, 15)
      .map((item: any) => ({
        type: "calendar",
        time: item.Date,
        title: item.Event,
        subtitle: item.Country,
        impact: item.Importance === 3 ? "High" : "Medium",
      }));

    const newsItems: SquawkItem[] = (newsData.items || [])
      .slice(0, 10)
      .map((item: any) => ({
        type: "news",
        time: item.publishedDate,
        title: item.title,
        subtitle: item.site || "Source",
        url: item.url,
      }));

    const items = [...calendarItems, ...newsItems].sort(
      (a, b) => new Date(b.time).getTime() - new Date(a.time).getTime()
    );

    return Response.json({
      items,
      generatedAt: new Date().toISOString(),
    });
  } catch (error) {
    return Response.json(
      { error: "Erreur squawk.", details: String(error) },
      { status: 500 }
    );
  }
}