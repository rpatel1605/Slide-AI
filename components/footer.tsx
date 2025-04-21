import Link from "next/link"
import { Presentation } from "lucide-react"

export function Footer() {
  return (
    <footer className="w-full border-t border-gray-800 py-6 bg-black/50">
      <div className="container flex flex-col md:flex-row justify-between items-center">
        <div className="flex items-center gap-2 mb-4 md:mb-0">
          <Presentation className="h-5 w-5" />
          <span className="text-lg font-bold">SlideAI</span>
          <span className="text-xs text-gray-500 ml-2">© 2025</span>
        </div>

        <div className="flex gap-6 text-sm text-gray-400">
          <Link href="#" className="hover:text-white">
            Terms
          </Link>
          <Link href="#" className="hover:text-white">
            Privacy
          </Link>
          <Link href="#" className="hover:text-white">
            Contact
          </Link>
        </div>
      </div>
    </footer>
  )
}
