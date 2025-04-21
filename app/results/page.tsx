"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { Loader2 } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { PresentationResult } from "@/components/presentation-result"
import { useToast } from "@/hooks/use-toast"

export default function ResultsPage() {
  const searchParams = useSearchParams()
  const topic = searchParams.get("topic") || ""
  const id = searchParams.get("id") || ""
  const [isLoading, setIsLoading] = useState(true)
  const [presentationData, setPresentationData] = useState<any>(null)
  const { toast } = useToast()

  useEffect(() => {
    const fetchPresentationData = async () => {
      if (!id) {
        setIsLoading(false)
        return
      }

      try {
        const response = await fetch(`/api/presentations/${id}`)
        const data = await response.json()

        if (!response.ok) {
          throw new Error(data.error || "Failed to fetch presentation")
        }

        setPresentationData(data)
      } catch (error) {
        console.error("Error fetching presentation:", error)
        toast({
          title: "Error",
          description: error instanceof Error ? error.message : "Failed to fetch presentation. Please try again.",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchPresentationData()
  }, [id, toast])

  return (
    <div className="flex flex-col min-h-screen gradient-background">
      <Navbar />

      <main className="flex-1 flex flex-col items-center justify-center px-4 py-12">
        {isLoading ? (
          <div className="text-center">
            <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
            <p className="text-gray-400">Loading your presentation...</p>
          </div>
        ) : presentationData ? (
          <PresentationResult data={presentationData} topic={topic} />
        ) : (
          <div className="text-center">
            <p className="text-gray-400">Presentation not found. Please try generating a new one.</p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}
