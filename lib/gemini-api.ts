import { GoogleGenerativeAI } from "@google/generative-ai"

// Initialize the Gemini API with the provided key
const apiKey = "AIzaSyD1gSIU9_DgKAwxXHQnSB8rNN7QJY7K8QA"
const genAI = new GoogleGenerativeAI(apiKey)

// Configure the model
const model = genAI.getGenerativeModel({
  model: "gemini-2.5-pro-exp-03-25",
})

const generationConfig = {
  temperature: 0.7,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 65536,
}

/**
 * Generate content using Gemini API
 * @param prompt The prompt to send to Gemini
 * @returns The generated text response
 */
export async function generateWithGemini(prompt: string): Promise<string> {
  try {
    // Start a chat session
    const chatSession = model.startChat({
      generationConfig,
      history: [],
    })

    // Send the message and get the response
    const result = await chatSession.sendMessage(prompt)
    return result.response.text()
  } catch (error) {
    console.error("Error generating content with Gemini:", error)
    throw new Error(`Gemini API error: ${error instanceof Error ? error.message : String(error)}`)
  }
}
