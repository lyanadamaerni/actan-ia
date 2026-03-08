export const dynamic = "force-dynamic";

type RawCalendarEvent = {
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

function formatDate(date: Date) {
  return date.toISOString().split("T")[0];
}

function getDateRange(range: string) {

  const today = new Date()

  let start = new Date(today)
  let end = new Date(today)

  if (range === "today") {

    start = today
    end = today

  } else if (range === "nextWeek") {

    start = new Date(today)
    start.setDate(today.getDate() + 7)

    end = new Date(today)
    end.setDate(today.getDate() + 14)

  } else {

    // semaine actuelle

    start = today

    end = new Date(today)
    end.setDate(today.getDate() + 7)

  }

  return {
    initDate: formatDate(start),
    endDate: formatDate(end)
  }

}

export async function GET(request: Request) {

  try {

    const { searchParams } = new URL(request.url)

    const rangeParam = searchParams.get("range") || "thisWeek"

    const { initDate, endDate } = getDateRange(rangeParam)

    const response = await fetch(
      "https://api.tradingeconomics.com/calendar?c=guest:guest&f=json",
      { cache: "no-store" }
    )

    if (!response.ok) {

      return Response.json(
        { error: "Impossible de charger le calendrier." },
        { status: 500 }
      )

    }

    const data: RawCalendarEvent[] = await response.json()

    const filteredEvents = data
      .filter((event) => {

        const eventDate = new Date(event.Date)

        return (
          eventDate >= new Date(initDate) &&
          eventDate <= new Date(endDate)
        )

      })
      .sort(
        (a, b) =>
          new Date(a.Date).getTime() -
          new Date(b.Date).getTime()
      )
      .slice(0, 150)

    return Response.json({

      generatedAt: new Date().toISOString(),

      filter: {
        range: rangeParam,
        initDate,
        endDate
      },

      count: filteredEvents.length,

      events: filteredEvents

    })

  } catch (error) {

    return Response.json(
      {
        error: "Erreur serveur calendrier",
        details: String(error)
      },
      { status: 500 }
    )

  }

}