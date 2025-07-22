import { Button } from "@/components/ui/button"
import { FadeIn, SlideIn } from "@/components/animations"
import Link from "next/link"

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <div className="text-center px-4">
        <FadeIn>
          <h1 className="text-9xl font-bold text-primary mb-4">404</h1>
          <h2 className="text-3xl font-semibold mb-4">Page Not Found</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-md mx-auto">
            Oops! The page you're looking for doesn't exist. Let's get you back on track.
          </p>
        </FadeIn>
        <SlideIn direction="up" delay={0.2}>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/">
              <Button size="lg">Go Home</Button>
            </Link>
            <Link href="/services">
              <Button variant="outline" size="lg">
                View Services
              </Button>
            </Link>
          </div>
        </SlideIn>
      </div>
    </div>
  )
} 