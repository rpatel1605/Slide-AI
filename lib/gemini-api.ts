import {
  GoogleGenerativeAI,
  FunctionDeclarationSchema,
  Part,
  FunctionDeclaration,
  Content,
  GenerateContentResponse,
  SchemaType,
  Tool
} from "@google/generative-ai";

// --- SECURITY WARNING ---
// These API Keys must be moved to secure backend storage in production!
const GEMINI_API_KEY = "AIzaSyD1gSIU9_DgKAwxXHQnSB8rNN7QJY7K8QA";
const SERPER_API_KEY = "ebd9f342d7ef893775f2ca69f03b993f353cf479";

// --- Initialize Gemini ---
let genAI: GoogleGenerativeAI | null = null;
try {
  genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
} catch (error) {
  console.error("Failed to initialize GoogleGenerativeAI. Check API Key.", error);
}

const model = genAI?.getGenerativeModel({
  model: "gemini-2.5-flash-preview-04-17",
});

const generationConfig = {
  temperature: 0.7,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
};

// --- Define Search Tool (Serper) ---
const tools: Tool[] = [{
  functionDeclarations: [
    {
      name: "internet_search",
      description: "Searches the internet using Serper.dev for recent information, specific facts, or topics outside base knowledge.",
      parameters: {
        type: SchemaType.OBJECT,
        properties: {
          search_query: {
            type: SchemaType.STRING,
            description: "The specific query to search the internet for."
          }
        },
        required: ["search_query"]
      }
    }
  ]
}];

// --- Serper Search Function ---
interface SearchSnippet {
  title: string;
  link: string;
  snippet: string;
}

async function performInternetSearch(query: string): Promise<{ results?: SearchSnippet[]; info?: string; error?: string }> {
  if (!SERPER_API_KEY) {
    console.warn("Search skipped: Serper API key not configured.");
    return { info: "Search functionality is not configured." };
  }

  console.log(`Performing Serper search for: ${query}`);
  try {
    const response = await fetch('https://google.serper.dev/search', {
      method: 'POST',
      headers: {
        'X-API-KEY': SERPER_API_KEY,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ q: query })
    });

    if (!response.ok) {
      const errorBody = await response.text();
      throw new Error(`Serper API error: ${response.status} ${response.statusText} - ${errorBody}`);
    }

    const results = await response.json() as { organic?: any[] };

    const snippets: SearchSnippet[] = results.organic?.map((item: any) => ({
      title: item.title,
      link: item.link,
      snippet: item.snippet
    })).slice(0, 5) ?? [];

    console.log("Serper search results processed:", snippets);
    return snippets.length > 0 ? { results: snippets } : { info: "No relevant search results found." };

  } catch (error) {
    console.error("Error during Serper internet search:", error);
    return { error: "Failed to perform search." };
  }
}

// --- Main Generation Function ---
export async function generateWithGemini(prompt: string, history: Content[] = []): Promise<string> {
  if (!genAI || !model) {
    throw new Error("Gemini AI SDK not initialized. Check API Key or initialization logic.");
  }

  try {
    const chatSession = model.startChat({
      generationConfig,
      tools,
      history,
    });

    console.log("Sending initial prompt to Gemini:", prompt);
    let result = await chatSession.sendMessage(prompt);

    let safetyBreak = 0;
    const maxLoops = 5;

    while (safetyBreak < maxLoops) {
      const response: GenerateContentResponse = result.response;
      const candidate = response.candidates?.[0];
      if (!candidate) {
        throw new Error("No candidate found in Gemini response.");
      }

      const functionCallPart = candidate.content?.parts?.find(part => part.functionCall);
      if (!functionCallPart?.functionCall) {
        break;
      }

      safetyBreak++;
      const functionCall = functionCallPart.functionCall;
      console.log(`Gemini requested function call (${safetyBreak}):`, functionCall.name, "with args:", functionCall.args);

      let functionResponsePart: Part | null = null;

      if (functionCall.name === 'internet_search') {
        const searchQuery = (functionCall.args as { search_query?: string }).search_query;

        if (typeof searchQuery !== 'string' || !searchQuery) {
          functionResponsePart = {
            functionResponse: {
              name: 'internet_search',
              response: { error: "Invalid or missing 'search_query'." }
            }
          };
        } else {
          const searchResults = await performInternetSearch(searchQuery);
          functionResponsePart = {
            functionResponse: {
              name: 'internet_search',
              response: searchResults
            }
          };
        }
      } else {
        functionResponsePart = {
          functionResponse: {
            name: functionCall.name,
            response: { error: `Function ${functionCall.name} not implemented.` }
          }
        };
      }

      if (functionResponsePart) {
        result = await chatSession.sendMessage([functionResponsePart]);
      } else {
        throw new Error("Internal error processing function call response.");
      }
    }

    if (safetyBreak >= maxLoops) {
      throw new Error("Exceeded maximum function call attempts.");
    }

    const finalResponse = result.response;
    if (!finalResponse) {
      throw new Error("Final response missing.");
    }

    let finalText: string | undefined;
    try {
      finalText = finalResponse.text();
    } catch (e) {
      const candidateText = finalResponse.candidates?.[0]?.content?.parts?.map(p => p.text).join('');
      if (candidateText) {
        finalText = candidateText;
      } else {
        throw new Error(`Failed to get a final response. Finish Reason: ${finalResponse.candidates?.[0]?.finishReason ?? 'Unknown'}`);
      }
    }

    if (finalText !== undefined && finalText !== null) {
      console.log("Gemini final text response received.");
      return finalText;
    } else {
      throw new Error("Gemini final text was undefined or null.");
    }

  } catch (error) {
    console.error("Error during Gemini generation:", error);
    throw new Error(`Gemini processing error: ${error instanceof Error ? error.message : String(error)}`);
  }
}

// --- Optional Example Usage ---
// (Uncomment if you want to test locally in Node.js)
/*
async function runExample() {
  try {
    const prompt = "Tell me about the latest SpaceX launch.";
    const response = await generateWithGemini(prompt);
    console.log("\n--- Final Response ---");
    console.log(response);
    console.log("----------------------\n");
  } catch (error) {
    console.error("Example Error:", error);
  }
}

// runExample();
*/
