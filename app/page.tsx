"use client"

import type React from "react"

import { useState } from "react"
import { ArrowRight, Presentation, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { PresentationResult } from "@/components/presentation-result"
import { useToast } from "@/hooks/use-toast"

export default function Home() {
  const [topic, setTopic] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [presentationData, setPresentationData] = useState<any>(null)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!topic.trim()) {
      toast({
        title: "Please enter a topic",
        description: "You need to provide a topic to generate a presentation",
        variant: "destructive",
      })
      return
    }

    // Navigate to the complexity selection page with the topic
    window.location.href = `/complexity?topic=${encodeURIComponent(topic)}`
  }

  return (
    <div className="flex flex-col min-h-screen gradient-background">
      <Navbar />

      <main className="flex-1 flex flex-col items-center justify-center px-4 relative">
        <div className="max-w-5xl w-full text-center mb-8 mt-[-100px]">
          <h1 className="text-8xl font-bold tracking-tighter mb-4 text-white/80">SlideAI</h1>

          <div className="search-container max-w-2xl mx-auto mt-12 mb-8">
            <form onSubmit={handleSubmit} className="relative">
              <Input
                type="text"
                placeholder="Enter your presentation topic..."
                className="w-full py-6 px-4 bg-black/40 border-gray-700 rounded-full text-white"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                disabled={isGenerating}
              />
              <Button
                type="submit"
                size="icon"
                className="absolute right-1 top-1 rounded-full h-10 w-10"
                disabled={isGenerating}
              >
                {isGenerating ? <Loader2 className="h-4 w-4 animate-spin" /> : <ArrowRight className="h-4 w-4" />}
              </Button>
            </form>
          </div>

          <p className="text-lg text-gray-400 max-w-xl mx-auto">
            We are thrilled to introduce SlideAI, our advanced presentation generator, blending superior content
            creation with beautiful slide designs.
          </p>

          <div className="flex justify-center gap-4 mt-8">
            <Button variant="outline" className="border-gray-700 hover:bg-gray-800">
              LEARN MORE
            </Button>
            <Button>
              <Presentation className="mr-2 h-4 w-4" />
              TRY EXAMPLES
            </Button>
          </div>
        </div>

        {isGenerating && (
          <div className="mt-12 text-center">
            <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
            <p className="text-gray-400">Generating your presentation...</p>
          </div>
        )}

        {presentationData && !isGenerating && <PresentationResult data={presentationData} topic={topic} />}
      </main>

      <Footer />
    </div>
  )
}
