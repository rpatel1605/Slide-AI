import { type NextRequest, NextResponse } from "next/server"

// In a real application, you would store presentations in a database
// For this demo, we'll use an in-memory store
const presentationStore: Record<string, any> = {}

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = params.id

    // Check if we have the presentation in our store
    if (presentationStore[id]) {
      return NextResponse.json(presentationStore[id])
    }

    // If not found, return a 404
    return NextResponse.json({ error: "Presentation not found" }, { status: 404 })
  } catch (error) {
    console.error("Error fetching presentation:", error)
    return NextResponse.json(
      { error: "Failed to fetch presentation: " + (error instanceof Error ? error.message : String(error)) },
      { status: 500 },
    )
  }
}

// Add a POST method to store presentation data
export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = params.id
    const data = await request.json()

    // Store the presentation data
    presentationStore[id] = data

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error storing presentation:", error)
    return NextResponse.json(
      { error: "Failed to store presentation: " + (error instanceof Error ? error.message : String(error)) },
      { status: 500 },
    )
  }
}
