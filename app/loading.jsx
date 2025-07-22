import { Card, CardContent } from "@/components/ui/card"

export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section Skeleton */}
      <div className="text-center mb-12">
        <div className="h-12 w-64 bg-muted rounded-lg animate-pulse mx-auto mb-4" />
        <div className="h-6 w-96 bg-muted rounded-lg animate-pulse mx-auto" />
      </div>

      {/* Services Grid Skeleton */}
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-12">
        {[...Array(6)].map((_, i) => (
          <Card key={i} className="overflow-hidden">
            <div className="h-48 bg-muted animate-pulse" />
            <CardContent className="p-6">
              <div className="h-8 w-8 bg-muted rounded-full animate-pulse mb-4" />
              <div className="h-6 w-3/4 bg-muted rounded-lg animate-pulse mb-2" />
              <div className="h-4 w-full bg-muted rounded-lg animate-pulse mb-4" />
              <div className="space-y-2">
                {[...Array(4)].map((_, j) => (
                  <div key={j} className="h-4 w-full bg-muted rounded-lg animate-pulse" />
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Testimonials Section Skeleton */}
      <div className="mb-12">
        <div className="h-8 w-48 bg-muted rounded-lg animate-pulse mx-auto mb-8" />
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(3)].map((_, i) => (
            <Card key={i}>
              <CardContent className="p-6">
                <div className="h-4 w-full bg-muted rounded-lg animate-pulse mb-4" />
                <div className="h-4 w-2/3 bg-muted rounded-lg animate-pulse mb-2" />
                <div className="h-4 w-1/2 bg-muted rounded-lg animate-pulse" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* CTA Section Skeleton */}
      <div className="text-center">
        <div className="h-8 w-64 bg-muted rounded-lg animate-pulse mx-auto mb-4" />
        <div className="h-6 w-96 bg-muted rounded-lg animate-pulse mx-auto mb-8" />
        <div className="h-10 w-32 bg-muted rounded-lg animate-pulse mx-auto" />
      </div>
    </div>
  )
} 