import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { CheckCircle, Zap, Palette, Clock, BarChart, FileText } from "lucide-react"

export default function FeaturesPage() {
  return (
    <div className="flex flex-col min-h-screen gradient-background">
      <Navbar />

      <main className="flex-1 container py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-5xl font-bold mb-8 text-white/90">Features</h1>
          <p className="text-xl text-gray-300 mb-12">
            SlideAI offers powerful features to help you create professional presentations in minutes.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            <div className="bg-black/40 border border-gray-800 rounded-lg p-6">
              <div className="flex items-start mb-4">
                <Zap className="h-8 w-8 text-yellow-400 mr-4" />
                <h3 className="text-2xl font-semibold">AI-Powered Content</h3>
              </div>
              <p className="text-gray-300">
                Our advanced AI generates comprehensive, well-researched content for any topic, saving you hours of
                research and writing.
              </p>
            </div>

            <div className="bg-black/40 border border-gray-800 rounded-lg p-6">
              <div className="flex items-start mb-4">
                <Palette className="h-8 w-8 text-purple-400 mr-4" />
                <h3 className="text-2xl font-semibold">Beautiful Designs</h3>
              </div>
              <p className="text-gray-300">
                Professional slide layouts with modern design principles ensure your presentations look polished and
                engaging.
              </p>
            </div>

            <div className="bg-black/40 border border-gray-800 rounded-lg p-6">
              <div className="flex items-start mb-4">
                <Clock className="h-8 w-8 text-blue-400 mr-4" />
                <h3 className="text-2xl font-semibold">Time-Saving</h3>
              </div>
              <p className="text-gray-300">
                Create complete presentations in minutes instead of hours. Focus on delivery rather than creation.
              </p>
            </div>

            <div className="bg-black/40 border border-gray-800 rounded-lg p-6">
              <div className="flex items-start mb-4">
                <BarChart className="h-8 w-8 text-green-400 mr-4" />
                <h3 className="text-2xl font-semibold">Complexity Options</h3>
              </div>
              <p className="text-gray-300">
                Choose from simple, moderate, or complex presentations depending on your needs and audience.
              </p>
            </div>

            <div className="bg-black/40 border border-gray-800 rounded-lg p-6">
              <div className="flex items-start mb-4">
                <CheckCircle className="h-8 w-8 text-red-400 mr-4" />
                <h3 className="text-2xl font-semibold">Customization</h3>
              </div>
              <p className="text-gray-300">
                Specify exactly what you want in your presentation with our customization options for tailored results.
              </p>
            </div>

            <div className="bg-black/40 border border-gray-800 rounded-lg p-6">
              <div className="flex items-start mb-4">
                <FileText className="h-8 w-8 text-orange-400 mr-4" />
                <h3 className="text-2xl font-semibold">Multiple Formats</h3>
              </div>
              <p className="text-gray-300">
                Download your presentations in PowerPoint format or copy the content for use in other applications.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
