import { type NextRequest, NextResponse } from "next/server"
import { generateWithGemini } from "@/lib/gemini-api"
import { createPresentation } from "@/lib/presentation-generator"
import { createSimplePresentation } from "@/lib/simple-presentation-generator"
import { writeFileSync } from "fs"
import { join } from "path"


// Directory to store generated presentations
const PRESENTATIONS_DIR = join(process.cwd(), "public", "presentations")

async function fetchGoogleSearchResults(query: string): Promise<string> {
  const apiKey = "AIzaSyBvzBfQMnvXmLmllrxDWy_3dPil3Hcjo64";
  const cx = "31efa1d6688854443";
  const url = `https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=${cx}&q=${encodeURIComponent(query)}`;

  const response = await fetch(url);
  const data = await response.json();

  if (!data.items || data.items.length === 0) {
    return "No useful results found on Google.";
  }

  // Summarize top 3 results
  return data.items
    .slice(0, 3)
    .map((item: any) => `Title: ${item.title}\nSnippet: ${item.snippet}`)
    .join("\n\n");
}


export async function POST(request: NextRequest) {
  try {
    const { topic, complexity, requirements } = await request.json()

    if (!topic) {
      return NextResponse.json({ error: "Topic is required" }, { status: 400 })
    }

    // Determine the number of slides based on complexity
    let slideCount = "4-6"
    let promptPrefix = "Create a basic"

    if (complexity === "simple") {
      slideCount = "3-5"
      promptPrefix = "Create a simple"
    } else if (complexity === "moderate") {
      slideCount = "10-12"
      promptPrefix = "Create a detailed"
    } else if (complexity === "complex") {
      slideCount = "12-18"
      promptPrefix = "Create a comprehensive"
    }

    // Add requirements to the prompt if provided
    const requirementsText = requirements ? `\nInclude the following specific requirements: ${requirements}` : ""

    // Generate presentation content using Gemini API
    const prompt = `${promptPrefix} give detailed 4-5 lines per title  presentation about ${topic}.  
(search from net if required )Format your response as a JSON array of slide objects, where each slide has a "title" and "content" property.  
Include an introduction slide, ${slideCount} slides with key points, and a conclusion slide.  
Make the content informative, well-structured, and suitable for a professional presentation.  
Keep each slide's content concise but informative.  More info about the topic is ->${requirementsText}
IMPORTANT: Your response must be a valid JSON array that can be parsed with JSON.parse()
    `

    let presentationContent = await generateWithGemini(prompt);
    console.log(presentationContent);

// Fallback to Google Search if Gemini fails or returns weak content
if (!presentationContent || presentationContent.length < 3) {
  const searchSummary = await fetchGoogleSearchResults(topic);
  const fallbackPrompt = `${promptPrefix} presentation about "${topic}". Based on the following extracted Google search results:\n\n${searchSummary}\n\nFormat your response as a JSON array of slide objects, where each slide has a "title" and "content" property. ${requirementsText}`;

  presentationContent = await generateWithGemini(fallbackPrompt);
}


    // Parse the AI response
    let slides
    try {
      // Extract JSON from the response if needed
      const jsonMatch = presentationContent.match(/\[[\s\S]*\]/)
      const jsonString = jsonMatch ? jsonMatch[0] : presentationContent

      // Add fallback in case parsing fails
      try {
        slides = JSON.parse(jsonString)
      } catch (parseError) {
        console.error("JSON parse error:", parseError)
        // Try to extract JSON with a more lenient approach
        const fixedJson = jsonString.replace(/(\w+):/g, '"$1":').replace(/'/g, '"')
        try {
          slides = JSON.parse(fixedJson)
        } catch (secondParseError) {
          console.error("Second JSON parse error:", secondParseError)
          // Create a simple fallback structure if parsing fails
          slides = [
            { title: "Introduction to " + topic, content: "An overview of " + topic },
            { title: "Key Points", content: "Main aspects of " + topic },
            { title: "Conclusion", content: "Summary of " + topic },
          ]
        }
      }
    } catch (error) {
      console.error("Error parsing AI response:", error)
      return NextResponse.json({ error: "Failed to parse presentation content" }, { status: 500 })
    }

    // Generate PowerPoint file
    let pptxBuffer
    let usedFallback = false
    let extension = "pptx"

    try {
      console.log("Attempting to create presentation with PptxGenJS...")
      pptxBuffer = await createPresentation(topic, slides)
      console.log("Successfully created presentation with PptxGenJS")
    } catch (pptxError) {
      console.error("PowerPoint generation error details:", pptxError)
      console.log("Using fallback presentation generator...")
      try {
        // Use simple fallback generator
        pptxBuffer = await createSimplePresentation(topic, slides)
        usedFallback = true
        extension = "zip"
        console.log("Successfully created presentation with fallback generator")
      } catch (fallbackError) {
        console.error("Fallback generation also failed:", fallbackError)
        return NextResponse.json(
          {
            error:
              "Failed to generate presentation file: " +
              (fallbackError instanceof Error ? fallbackError.message : String(fallbackError)),
          },
          { status: 500 },
        )
      }
    }

    // Generate a unique filename
    const filename = `${topic.replace(/[^a-z0-9]/gi, "-").toLowerCase()}-${Date.now()}.${extension}`
    const filePath = join(PRESENTATIONS_DIR, filename)

    // Ensure the presentations directory exists
    try {
      const fs = require('fs')
      if (!fs.existsSync(PRESENTATIONS_DIR)) {
        fs.mkdirSync(PRESENTATIONS_DIR, { recursive: true })
      }
    } catch (error) {
      console.error("Error creating presentations directory:", error)
      return NextResponse.json({ error: "Failed to create storage directory" }, { status: 500 })
    }

    // Save the file locally
    try {
      // Convert ArrayBuffer to Buffer if needed
      const nodeBuffer = pptxBuffer instanceof ArrayBuffer 
        ? Buffer.from(new Uint8Array(pptxBuffer))
        : pptxBuffer;
      
      writeFileSync(filePath, nodeBuffer);
    } catch (error) {
      console.error("Error saving presentation file:", error);
      return NextResponse.json({ error: "Failed to save presentation file" }, { status: 500 });
    }

    // Generate a unique ID for this presentation
    const presentationId = `pres_${Date.now()}_${Math.random().toString(36).substring(2, 10)}`

    // Return the presentation data
    const presentationData = {
      id: presentationId,
      slides,
      downloadUrl: `/presentations/${filename}`,
      usedFallback,
      requirements: requirements || null,
    }

    // Store the presentation data in our in-memory store
    try {
      await fetch(`${request.nextUrl.origin}/api/presentations/${presentationId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(presentationData),
      })
    } catch (storeError) {
      console.error("Error storing presentation data:", storeError)
      // Continue anyway, as we're returning the data directly
    }

    return NextResponse.json(presentationData)
  } catch (error) {
    console.error("Error generating presentation:", error)
    return NextResponse.json(
      { error: "Failed to generate presentation: " + (error instanceof Error ? error.message : String(error)) },
      { status: 500 },
    )
  }
}
