import { Card, CardContent } from "@/components/ui/card"

export default function BlogPostLoading() {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Header Skeleton */}
      <div className="max-w-4xl mx-auto mb-12">
        <div className="h-8 w-48 bg-muted rounded-lg animate-pulse mb-4" />
        <div className="h-12 w-3/4 bg-muted rounded-lg animate-pulse mb-4" />
        <div className="flex items-center gap-4">
          <div className="h-4 w-24 bg-muted rounded-lg animate-pulse" />
          <div className="h-4 w-24 bg-muted rounded-lg animate-pulse" />
        </div>
      </div>

      {/* Featured Image Skeleton */}
      <div className="max-w-4xl mx-auto mb-12">
        <div className="aspect-video w-full rounded-lg bg-muted animate-pulse" />
      </div>

      {/* Content Skeleton */}
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="space-y-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="space-y-2">
                  <div className="h-4 w-full bg-muted rounded-lg animate-pulse" />
                  <div className="h-4 w-5/6 bg-muted rounded-lg animate-pulse" />
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Author Card */}
            <Card>
              <CardContent className="p-6">
                <div className="h-20 w-20 bg-muted rounded-full animate-pulse mx-auto mb-4" />
                <div className="h-6 w-32 bg-muted rounded-lg animate-pulse mx-auto mb-2" />
                <div className="h-4 w-48 bg-muted rounded-lg animate-pulse mx-auto" />
              </CardContent>
            </Card>

            {/* Related Posts */}
            <div>
              <div className="h-6 w-32 bg-muted rounded-lg animate-pulse mb-4" />
              <div className="space-y-4">
                {[...Array(3)].map((_, i) => (
                  <Card key={i}>
                    <CardContent className="p-4">
                      <div className="h-4 w-3/4 bg-muted rounded-lg animate-pulse mb-2" />
                      <div className="h-3 w-1/2 bg-muted rounded-lg animate-pulse" />
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Categories */}
            <div>
              <div className="h-6 w-32 bg-muted rounded-lg animate-pulse mb-4" />
              <div className="flex flex-wrap gap-2">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="h-8 w-24 bg-muted rounded-lg animate-pulse" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="max-w-2xl mx-auto mt-16">
        <Card>
          <CardContent className="p-8 text-center">
            <div className="h-8 w-48 bg-muted rounded-lg animate-pulse mx-auto mb-4" />
            <div className="h-6 w-96 bg-muted rounded-lg animate-pulse mx-auto mb-6" />
            <div className="space-y-4">
              <div className="h-10 w-full bg-muted rounded-lg animate-pulse" />
              <div className="h-10 w-32 bg-muted rounded-lg animate-pulse mx-auto" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 