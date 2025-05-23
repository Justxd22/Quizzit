"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertTriangle } from "lucide-react"
import { AnimatedBackground } from "@/components/ui/animated-background"

export default function Home() {
  const [attempts, setAttempts] = useState<number | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    async function checkAttempts() {
      try {
        const response = await fetch("/api/attempts")

        if (!response.ok) {
          throw new Error("Failed to fetch attempts")
        }

        const data = await response.json()
        setAttempts(data.attempts)

        // Redirect if more than 3 attempts used
        if (data.max) {
          router.push("/attempts-exceeded")
        }
      } catch (error) {
        console.error("Error fetching attempts:", error)
      } finally {
        setLoading(false)
      }
    }

    checkAttempts()
  }, [router])

  return (
    <div className="relative min-h-screen w-full overflow-hidden flex items-center justify-center">
      <AnimatedBackground />
      <div className="absolute inset-0 bg-black/50" />
      <Card className="w-full max-w-md backdrop-blur-md bg-black/30 border border-sky-500/50 shadow-lg shadow-sky-500/20 text-white relative z-10">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center text-sky-400">Interactive Quiz Challenge</CardTitle>
          <CardDescription className="text-sky-300/80 text-center">
            Test your knowledge with our 10-question quiz
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-3 bg-black/40 rounded-lg border border-yellow-500/50 flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-yellow-500 shrink-0 mt-0.5" />
            <div className="text-sm text-yellow-200">
              <p className="font-semibold mb-1">Important:</p>
              <ul className="list-disc pl-4 space-y-1">
                <li>You will have 10 minutes to complete all questions</li>
                <li>Leaving the browser tab will be recorded</li>
                <li>Each question must be answered to proceed</li>
                <li>Your results will be shown after submission</li>
                <li>Any attempts to cheat is monitored and will result in instant failure :)</li>
              </ul>
            </div>
          </div>

          {/* Attempts indicator */}
          {!loading && attempts !== null && (
            <div className="mt-4 p-2 bg-black/40 rounded-lg border border-sky-500/50 text-center">
              <p className="text-sm text-sky-200">
                <span className="font-semibold">Attempts remaining:</span>{" "}
                <span className="text-sky-400 font-bold">{3 - attempts}</span>
              </p>
            </div>
          )}
        </CardContent>
        <CardFooter>
          <Link href="/quiz/run" className="w-full">
            <Button className="w-full bg-gradient-to-r from-sky-500 to-sky-400 hover:from-sky-400 hover:to-sky-300 text-white border border-sky-400/50">
              Start Quiz
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}
