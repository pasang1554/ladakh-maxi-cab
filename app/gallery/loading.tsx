import { Card, CardContent } from "@/components/ui/card"

export default function GalleryLoading() {
  return (
    <div className="min-h-screen">
      {/* Header Skeleton */}
      <section className="bg-muted py-20">
        <div className="container mx-auto px-4">
          <div className="animate-pulse">
            <div className="h-10 w-48 bg-muted-foreground/20 rounded mx-auto mb-4" />
            <div className="h-6 w-96 bg-muted-foreground/20 rounded mx-auto" />
          </div>
        </div>
      </section>

      {/* Category Filter Skeleton */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4">
            {[...Array(5)].map((_, index) => (
              <div
                key={index}
                className="h-10 w-24 bg-muted-foreground/20 rounded animate-pulse"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid Skeleton */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, index) => (
              <Card key={index} className="overflow-hidden">
                <div className="animate-pulse">
                  <div className="h-64 bg-muted-foreground/20" />
                  <CardContent className="p-4">
                    <div className="h-6 w-3/4 bg-muted-foreground/20 rounded mb-2" />
                    <div className="h-4 w-full bg-muted-foreground/20 rounded" />
                  </CardContent>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section Skeleton */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="bg-primary text-primary-foreground rounded-lg p-8 text-center">
            <div className="animate-pulse">
              <div className="h-8 w-64 bg-primary-foreground/20 rounded mx-auto mb-4" />
              <div className="h-6 w-96 bg-primary-foreground/20 rounded mx-auto mb-8" />
              <div className="h-12 w-32 bg-primary-foreground/20 rounded mx-auto" />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
} 