import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Check } from "lucide-react"

export default function PricingPage() {
  return (
    <div className="flex flex-col min-h-screen gradient-background">
      <Navbar />

      <main className="flex-1 container py-16 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-4 text-white/90">Simple, Transparent Pricing</h1>
          <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto">
            Choose the plan that works best for you. All plans include access to our core AI presentation generation
            features.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <Card className="bg-black/40 border-gray-800">
              <CardHeader>
                <CardTitle className="text-2xl">Basic</CardTitle>
                <div className="mt-4 mb-2">
                  <span className="text-4xl font-bold">Free</span>
                  {/* <span className="text-gray-400 ml-2">/month</span> */}
                </div>
                <CardDescription className="text-gray-400">For occasional users</CardDescription>
              </CardHeader>
              <CardContent className="text-left">
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <span>10 presentations per month</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <span>Simple & Moderate complexity</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <span>Standard templates</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <span>Email support</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Get Started</Button>
              </CardFooter>
            </Card>

            <Card className="bg-black/40 border-gray-800 border-yellow-500/50 ring-1 ring-yellow-500/20">
              <CardHeader>
                <div className="py-1 px-3 bg-yellow-500/20 text-yellow-300 text-xs font-medium rounded-full w-fit mx-auto mb-2">
                  MOST POPULAR
                </div>
                <CardTitle className="text-2xl">Professional</CardTitle>
                <div className="mt-4 mb-2">
                  <span className="text-4xl font-bold">$19</span>
                  <span className="text-gray-400 ml-2">/month</span>
                </div>
                <CardDescription className="text-gray-400">For regular users</CardDescription>
              </CardHeader>
              <CardContent className="text-left">
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <span>30 presentations per month</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <span>All complexity levels</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <span>Premium templates</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <span>Priority email support</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Get Started</Button>
              </CardFooter>
            </Card>

            <Card className="bg-black/40 border-gray-800">
              <CardHeader>
                <CardTitle className="text-2xl">Enterprise</CardTitle>
                <div className="mt-4 mb-2">
                  <span className="text-4xl font-bold">$49</span>
                  <span className="text-gray-400 ml-2">/month</span>
                </div>
                <CardDescription className="text-gray-400">For teams & businesses</CardDescription>
              </CardHeader>
              <CardContent className="text-left">
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <span>Unlimited presentations</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <span>All complexity levels</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <span>Custom branding & templates</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <span>Dedicated support manager</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Contact Sales</Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
