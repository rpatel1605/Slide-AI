import Link from "next/link"
import { Presentation } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Navbar() {
  return (
    <header className="w-full border-b border-gray-800 bg-black/50 backdrop-blur-sm">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2">
            <Presentation className="h-6 w-6" />
            <span className="text-xl font-bold">SlideAI</span>
          </Link>

          <nav className="hidden md:flex gap-6">
            <Link href="/" className="text-sm font-medium hover:text-white">
              HOME
            </Link>
            <Link href="/features" className="text-sm font-medium text-gray-400 hover:text-white">
              FEATURES
            </Link>
            <Link href="/examples" className="text-sm font-medium text-gray-400 hover:text-white">
              EXAMPLES
            </Link>
            <Link href="/pricing" className="text-sm font-medium text-gray-400 hover:text-white">
              PRICING
            </Link>
            <Link href="/about" className="text-sm font-medium text-gray-400 hover:text-white">
              ABOUT
            </Link>
          </nav>
        </div>

        <div>
          <Button asChild>
            <Link href="/">TRY SLIDEAI</Link>
          </Button>
        </div>
      </div>
    </header>
  )
}
