import { Card, CardContent } from "@/components/ui/card"

export default function BlogLoading() {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Header Skeleton */}
      <div className="text-center mb-12">
        <div className="h-12 w-64 bg-muted rounded-lg animate-pulse mx-auto mb-4" />
        <div className="h-6 w-96 bg-muted rounded-lg animate-pulse mx-auto" />
      </div>

      {/* Blog Posts Grid Skeleton */}
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {[...Array(6)].map((_, i) => (
          <Card key={i} className="overflow-hidden">
            <div className="h-48 bg-muted animate-pulse" />
            <CardContent className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="h-4 w-24 bg-muted rounded-lg animate-pulse" />
                <div className="h-4 w-16 bg-muted rounded-lg animate-pulse" />
              </div>
              <div className="h-6 w-full bg-muted rounded-lg animate-pulse mb-2" />
              <div className="h-4 w-3/4 bg-muted rounded-lg animate-pulse mb-4" />
              <div className="h-10 w-32 bg-muted rounded-lg animate-pulse" />
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Newsletter Section Skeleton */}
      <div className="mt-16 text-center">
        <div className="h-8 w-48 bg-muted rounded-lg animate-pulse mx-auto mb-4" />
        <div className="h-6 w-96 bg-muted rounded-lg animate-pulse mx-auto mb-8" />
        <div className="max-w-md mx-auto">
          <div className="h-10 w-full bg-muted rounded-lg animate-pulse mb-4" />
          <div className="h-10 w-32 bg-muted rounded-lg animate-pulse mx-auto" />
        </div>
      </div>
    </div>
  )
} 