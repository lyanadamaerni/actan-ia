export const dynamic = "force-dynamic";

export async function GET(request: Request) {

  const url = new URL(request.url)

  const from = url.searchParams.get("from")
  const to = url.searchParams.get("to")

  const response = await fetch(
    "https://api.tradingeconomics.com/calendar?c=guest:guest&f=json",
    { cache:"no-store" }
  )

  const data = await response.json()

  let events = data

  if(from && to){

    const start = new Date(from)
    const end = new Date(to)

    events = data.filter((event:any)=>{

      const date = new Date(event.Date)

      return date >= start && date <= end

    })

  }

  return Response.json({
    events
  })

}