"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Loader2, FileText, LayoutGrid, Layers } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { useToast } from "@/hooks/use-toast"
import { Textarea } from "@/components/ui/textarea"

export default function ComplexityPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const topic = searchParams.get("topic") || ""
  const [isGenerating, setIsGenerating] = useState(false)
  const [selectedOption, setSelectedOption] = useState<string | null>(null)
  const [showRequirementsInput, setShowRequirementsInput] = useState(false)
  const [requirements, setRequirements] = useState("")
  const { toast } = useToast()

  const handleComplexitySelect = (complexity: string) => {
    setSelectedOption(complexity)
    setShowRequirementsInput(true)
  }

  const handleGeneratePresentation = async () => {
    if (!selectedOption) {
      toast({
        title: "Please select an option",
        description: "You need to select a complexity level to generate a presentation",
        variant: "destructive",
      })
      return
    }

    setIsGenerating(true)

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          topic,
          complexity: selectedOption,
          requirements: requirements.trim() || undefined,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to generate presentation")
      }

      if (!data.slides) {
        throw new Error("Invalid response data")
      }

      // Navigate to results page with the data
      router.push(`/results?topic=${encodeURIComponent(topic)}&id=${encodeURIComponent(data.id)}`)
    } catch (error) {
      console.error("Error generating presentation:", error)
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to generate presentation. Please try again.",
        variant: "destructive",
      })
      setIsGenerating(false)
    }
  }

  return (
    <div className="flex flex-col min-h-screen gradient-background">
      <Navbar />

      <main className="flex-1 flex flex-col items-center justify-center px-4 py-12">
        <div className="max-w-5xl w-full text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 text-white/80">Create Your Presentation</h1>
          <p className="text-lg text-gray-400 max-w-xl mx-auto mb-8">Topic: &quot;{topic}&quot;</p>

          {!showRequirementsInput ? (
            <>
              <h2 className="text-2xl font-semibold mb-6 text-white/80">Step 1: Choose Presentation Complexity</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                <Card
                  className="bg-black/40 border-gray-800 cursor-pointer transition-all hover:border-gray-600"
                  onClick={() => handleComplexitySelect("simple")}
                >
                  <CardHeader>
                    <FileText className="h-8 w-8 mb-2 mx-auto text-gray-400" />
                    <CardTitle className="text-xl text-center">Simple</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-gray-400 text-center">
                      3-5 slides with essential information
                    </CardDescription>
                  </CardContent>
                  <CardFooter className="flex justify-center">
                    <p className="text-sm text-gray-500">Quick overview</p>
                  </CardFooter>
                </Card>

                <Card
                  className="bg-black/40 border-gray-800 cursor-pointer transition-all hover:border-gray-600"
                  onClick={() => handleComplexitySelect("moderate")}
                >
                  <CardHeader>
                    <LayoutGrid className="h-8 w-8 mb-2 mx-auto text-gray-400" />
                    <CardTitle className="text-xl text-center">Moderate</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-gray-400 text-center">
                      10-12 slides with detailed content
                    </CardDescription>
                  </CardContent>
                  <CardFooter className="flex justify-center">
                    <p className="text-sm text-gray-500">Balanced presentation</p>
                  </CardFooter>
                </Card>

                <Card
                  className="bg-black/40 border-gray-800 cursor-pointer transition-all hover:border-gray-600"
                  onClick={() => handleComplexitySelect("complex")}
                >
                  <CardHeader>
                    <Layers className="h-8 w-8 mb-2 mx-auto text-gray-400" />
                    <CardTitle className="text-xl text-center">Complex</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-gray-400 text-center">
                      12-18 slides with comprehensive information
                    </CardDescription>
                  </CardContent>
                  <CardFooter className="flex justify-center">
                    <p className="text-sm text-gray-500">In-depth analysis</p>
                  </CardFooter>
                </Card>
              </div>
            </>
          ) : (
            <div className="max-w-2xl mx-auto">
              <h2 className="text-2xl font-semibold mb-6 text-white/80">Step 2: Specify Your Requirements</h2>
              <p className="text-gray-400 mb-6">
                Tell us what specific content or sections you want in your {selectedOption} presentation. This will help
                us tailor the presentation to your needs.
              </p>

              <div className="bg-black/40 border border-gray-800 rounded-lg p-6 mb-8">
                <label htmlFor="requirements" className="block text-sm font-medium text-gray-400 mb-2">
                  Specific Requirements (Optional)
                </label>
                <Textarea
                  id="requirements"
                  placeholder="E.g., Include a section on historical background, focus on recent developments, add statistics about market growth, etc."
                  className="w-full bg-black/60 border-gray-700 text-white mb-4"
                  rows={5}
                  value={requirements}
                  onChange={(e) => setRequirements(e.target.value)}
                />

                <div className="flex justify-between items-center mt-6">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setShowRequirementsInput(false)
                      setSelectedOption(null)
                    }}
                  >
                    Back
                  </Button>

                  <Button className="px-8" onClick={handleGeneratePresentation} disabled={isGenerating}>
                    {isGenerating ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      "Generate Presentation"
                    )}
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
