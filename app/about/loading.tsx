import { Card, CardContent } from "@/components/ui/card"

export default function AboutLoading() {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Header Skeleton */}
      <div className="text-center mb-12">
        <div className="h-12 w-64 bg-muted rounded-lg animate-pulse mx-auto mb-4" />
        <div className="h-6 w-96 bg-muted rounded-lg animate-pulse mx-auto" />
      </div>

      {/* Story Section Skeleton */}
      <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
        <div className="h-[400px] rounded-lg bg-muted animate-pulse" />
        <div>
          <div className="h-8 w-48 bg-muted rounded-lg animate-pulse mb-6" />
          <div className="space-y-4">
            <div className="h-4 w-full bg-muted rounded-lg animate-pulse" />
            <div className="h-4 w-5/6 bg-muted rounded-lg animate-pulse" />
            <div className="h-4 w-4/6 bg-muted rounded-lg animate-pulse" />
          </div>
        </div>
      </div>

      {/* Values Section Skeleton */}
      <div className="mb-16">
        <div className="h-8 w-48 bg-muted rounded-lg animate-pulse mx-auto mb-12" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[...Array(4)].map((_, i) => (
            <Card key={i}>
              <CardContent className="p-6 text-center">
                <div className="h-12 w-12 bg-muted rounded-lg animate-pulse mx-auto mb-4" />
                <div className="h-6 w-32 bg-muted rounded-lg animate-pulse mx-auto mb-2" />
                <div className="h-4 w-full bg-muted rounded-lg animate-pulse" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Team Section Skeleton */}
      <div>
        <div className="h-8 w-48 bg-muted rounded-lg animate-pulse mx-auto mb-12" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[...Array(3)].map((_, i) => (
            <Card key={i}>
              <div className="h-64 bg-muted animate-pulse rounded-t-lg" />
              <CardContent className="p-6">
                <div className="h-6 w-3/4 bg-muted rounded-lg animate-pulse mb-1" />
                <div className="h-4 w-1/2 bg-muted rounded-lg animate-pulse mb-2" />
                <div className="h-4 w-full bg-muted rounded-lg animate-pulse" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* CTA Section Skeleton */}
      <div className="mt-16 text-center">
        <div className="h-8 w-64 bg-muted rounded-lg animate-pulse mx-auto mb-4" />
        <div className="h-6 w-96 bg-muted rounded-lg animate-pulse mx-auto mb-8" />
        <div className="h-10 w-32 bg-muted rounded-lg animate-pulse mx-auto" />
      </div>
    </div>
  )
} 