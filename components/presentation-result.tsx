"use client"

import { useState } from "react"
import { Download, Copy, Check, Presentation, ExternalLink, AlertCircle, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"

interface PresentationResultProps {
  data: {
    slides: any[]
    downloadUrl?: string
    previewUrl?: string
    error?: string
    requirements?: string
    usedFallback?: boolean
  }
  topic: string
}

export function PresentationResult({ data, topic }: PresentationResultProps) {
  const { toast } = useToast()
  const [copied, setCopied] = useState(false)

  const handleCopyContent = () => {
    const content = data.slides.map((slide) => `${slide.title}\n${slide.content}`).join("\n\n")

    navigator.clipboard.writeText(content)
    setCopied(true)

    toast({
      title: "Content copied",
      description: "Presentation content copied to clipboard",
    })

    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="w-full max-w-4xl mx-auto mt-8 mb-16 px-4">
      <Card className="bg-black/40 border-gray-800">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold mb-2">{topic}</h2>
              <p className="text-gray-400">{data.slides.length} slides generated</p>
            </div>

            <div className="flex gap-3 mt-4 md:mt-0">
              <Button variant="outline" size="sm" onClick={handleCopyContent}>
                {copied ? <Check className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
                Copy Content
              </Button>

              {data.downloadUrl ? (
                <Button size="sm" asChild>
                  <a href={data.downloadUrl} download>
                    <Download className="h-4 w-4 mr-2" />
                    Download {data.usedFallback ? "ZIP" : "PPT"}
                  </a>
                </Button>
              ) : (
                <Button size="sm" variant="outline" disabled>
                  <AlertCircle className="h-4 w-4 mr-2" />
                  Download Unavailable
                </Button>
              )}
            </div>
          </div>

          {data.error && (
            <div className="bg-red-900/20 border border-red-800 rounded-md p-4 mb-6">
              <p className="text-red-300 flex items-center">
                <AlertCircle className="h-4 w-4 mr-2" />
                {data.error}
              </p>
            </div>
          )}

          {data.requirements && (
            <div className="bg-gray-900/40 border border-gray-800 rounded-md p-4 mb-6">
              <p className="text-gray-300 flex items-start">
                <FileText className="h-4 w-4 mr-2 mt-1" />
                <span>
                  <strong className="block mb-1">Custom Requirements:</strong>
                  {data.requirements}
                </span>
              </p>
            </div>
          )}

          <div className="space-y-4 mt-6">
            <h3 className="text-lg font-medium mb-2">Slide Preview</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {data.slides.slice(0, 4).map((slide, index) => (
                <div key={index} className="border border-gray-800 rounded-md p-4 bg-black/60">
                  <h4 className="font-bold mb-2">{slide.title}</h4>
                  <p className="text-sm text-gray-400 line-clamp-3">{slide.content}</p>
                </div>
              ))}
            </div>

            {data.slides.length > 4 && (
              <p className="text-center text-sm text-gray-500 mt-2">+{data.slides.length - 4} more slides</p>
            )}
          </div>

          {data.previewUrl && (
            <div className="mt-6">
              <Button variant="outline" className="w-full" asChild>
                <a href={data.previewUrl} target="_blank" rel="noopener noreferrer">
                  <Presentation className="h-4 w-4 mr-2" />
                  View Full Presentation
                  <ExternalLink className="h-3 w-3 ml-2" />
                </a>
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
