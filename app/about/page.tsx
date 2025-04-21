import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen gradient-background">
      <Navbar />

      <main className="flex-1 container py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold mb-8 text-white/90">About SlideAI</h1>

          <div className="prose prose-invert max-w-none">
            <p className="text-xl text-gray-300 mb-8">
              SlideAI is revolutionizing the way presentations are created, making it faster and easier than ever to
              produce professional-quality slide decks.
            </p>

            <h2 className="text-3xl font-semibold mt-12 mb-6">Our Mission</h2>
            <p className="text-gray-300">
              Our mission is to democratize presentation creation by leveraging the power of artificial intelligence. We
              believe that everyone should be able to create compelling presentations without spending hours on
              research, content creation, and design.
            </p>

            <h2 className="text-3xl font-semibold mt-12 mb-6">Our Technology</h2>
            <p className="text-gray-300">
              SlideAI uses cutting-edge AI technology to generate comprehensive, well-structured presentations on any
              topic. Our platform combines natural language processing, content generation, and design principles to
              create presentations that are informative, engaging, and visually appealing.
            </p>

            <h2 className="text-3xl font-semibold mt-12 mb-6">Our Team</h2>
            <p className="text-gray-300">
              We are a team of AI enthusiasts, designers, and presentation experts who are passionate about making
              presentation creation more efficient and accessible. With backgrounds in machine learning, UX design, and
              public speaking, our team brings a diverse set of skills to the table.
            </p>

            <h2 className="text-3xl font-semibold mt-12 mb-6">Our Values</h2>
            <ul className="list-disc pl-6 text-gray-300 space-y-2">
              <li>
                <strong>Innovation:</strong> We continuously push the boundaries of what's possible with AI.
              </li>
              <li>
                <strong>Quality:</strong> We are committed to delivering high-quality presentations that meet
                professional standards.
              </li>
              <li>
                <strong>Accessibility:</strong> We strive to make our platform accessible to users of all technical
                backgrounds.
              </li>
              <li>
                <strong>Time-Efficiency:</strong> We value your time and aim to save you hours of work.
              </li>
              <li>
                <strong>User-Centric:</strong> We design our platform with the user's needs and preferences in mind.
              </li>
            </ul>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
