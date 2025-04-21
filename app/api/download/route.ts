import { type NextRequest, NextResponse } from "next/server"
import { join } from "path"
import { readFileSync } from "fs"

// Directory where presentations are stored
const PRESENTATIONS_DIR = join(process.cwd(), "public", "presentations")

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url)
    const filename = url.searchParams.get("filename")

    if (!filename) {
      return NextResponse.json({ error: "Filename is required" }, { status: 400 })
    }

    // Construct the file path
    const filePath = join(PRESENTATIONS_DIR, filename)

    // Check if file exists
    try {
      const fileContent = readFileSync(filePath)
      
      // Determine content type based on file extension
      let contentType = 'application/zip'
      let disposition = 'attachment'

      // Return the file with appropriate headers
      return new NextResponse(fileContent, {
        headers: {
          'Content-Type': contentType,
          'Content-Disposition': `${disposition}; filename="${filename}"`,
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache',
          'Expires': '0'
        },
      })
    } catch (error) {
      console.error("Error reading file:", error)
      return NextResponse.json({ error: "File not found" }, { status: 404 })
    }
  } catch (error) {
    console.error("Error downloading file:", error)
    return NextResponse.json({ error: "Failed to download file" }, { status: 500 })
  }
}
