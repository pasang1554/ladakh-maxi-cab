import { Card, CardContent } from "@/components/ui/card"

export default function ServicesLoading() {
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

      {/* Services Grid Skeleton */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[...Array(4)].map((_, index) => (
              <Card key={index} className="overflow-hidden">
                <CardContent className="p-6">
                  <div className="animate-pulse">
                    <div className="h-48 bg-muted-foreground/20 rounded-lg mb-4" />
                    <div className="flex items-center gap-2 mb-2">
                      <div className="h-5 w-5 bg-muted-foreground/20 rounded" />
                      <div className="h-6 w-32 bg-muted-foreground/20 rounded" />
                    </div>
                    <div className="h-4 w-full bg-muted-foreground/20 rounded mb-4" />
                    <div className="flex items-center justify-between">
                      <div className="h-6 w-24 bg-muted-foreground/20 rounded" />
                      <div className="h-10 w-24 bg-muted-foreground/20 rounded" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section Skeleton */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="animate-pulse">
              <div className="h-8 w-48 bg-muted-foreground/20 rounded mx-auto mb-4" />
              <div className="h-4 w-96 bg-muted-foreground/20 rounded mx-auto" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[...Array(4)].map((_, index) => (
              <Card key={index}>
                <CardContent className="pt-6 text-center">
                  <div className="animate-pulse">
                    <div className="h-6 w-32 bg-muted-foreground/20 rounded mx-auto mb-2" />
                    <div className="h-4 w-full bg-muted-foreground/20 rounded" />
                  </div>
                </CardContent>
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