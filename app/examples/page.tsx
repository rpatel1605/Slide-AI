import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Download, Eye } from "lucide-react"

export default function ExamplesPage() {
  const examples = [
    {
      title: "Artificial Intelligence Overview",
      slides: 12,
      complexity: "Moderate",
      image: "/placeholder.svg?height=200&width=300",
      downloadUrl: "#",
    },
    {
      title: "Climate Change: Global Impact",
      slides: 15,
      complexity: "Complex",
      image: "/placeholder.svg?height=200&width=300",
      downloadUrl: "#",
    },
    {
      title: "Introduction to Blockchain",
      slides: 8,
      complexity: "Moderate",
      image: "/placeholder.svg?height=200&width=300",
      downloadUrl: "#",
    },
    {
      title: "Digital Marketing Basics",
      slides: 5,
      complexity: "Simple",
      image: "/placeholder.svg?height=200&width=300",
      downloadUrl: "#",
    },
    {
      title: "Space Exploration History",
      slides: 14,
      complexity: "Complex",
      image: "/placeholder.svg?height=200&width=300",
      downloadUrl: "#",
    },
    {
      title: "Effective Communication Skills",
      slides: 7,
      complexity: "Simple",
      image: "/placeholder.svg?height=200&width=300",
      downloadUrl: "#",
    },
  ]

  return (
    <div className="flex flex-col min-h-screen gradient-background">
      <Navbar />

      <main className="flex-1 container py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-5xl font-bold mb-8 text-white/90">Example Presentations</h1>
          <p className="text-xl text-gray-300 mb-12">
            Browse through these sample presentations to see what SlideAI can create for you.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {examples.map((example, index) => (
              <Card key={index} className="bg-black/40 border-gray-800 overflow-hidden">
                <div className="h-40 bg-gray-800 flex items-center justify-center">
                  <img
                    src={example.image || "/placeholder.svg"}
                    alt={example.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{example.title}</h3>
                  <div className="flex justify-between text-sm text-gray-400 mb-4">
                    <span>{example.slides} slides</span>
                    <span>{example.complexity}</span>
                  </div>
                  <div className="flex gap-3 mt-4">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Eye className="h-4 w-4 mr-2" />
                      Preview
                    </Button>
                    <Button size="sm" className="flex-1">
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
