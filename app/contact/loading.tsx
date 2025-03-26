import { Card, CardContent } from "@/components/ui/card"

export default function ContactLoading() {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Header Skeleton */}
      <div className="text-center mb-12">
        <div className="h-12 w-64 bg-muted rounded-lg animate-pulse mx-auto mb-4" />
        <div className="h-6 w-96 bg-muted rounded-lg animate-pulse mx-auto" />
      </div>

      {/* Contact Information Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
        {[...Array(4)].map((_, i) => (
          <Card key={i}>
            <CardContent className="p-6 text-center">
              <div className="h-8 w-8 bg-muted rounded-lg animate-pulse mx-auto mb-4" />
              <div className="h-6 w-24 bg-muted rounded-lg animate-pulse mx-auto mb-2" />
              <div className="h-6 w-48 bg-muted rounded-lg animate-pulse mx-auto mb-1" />
              <div className="h-4 w-32 bg-muted rounded-lg animate-pulse mx-auto" />
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Contact Form Skeleton */}
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardContent className="p-8">
            <div className="h-8 w-48 bg-muted rounded-lg animate-pulse mb-6" />
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <div className="h-4 w-16 bg-muted rounded-lg animate-pulse" />
                  <div className="h-10 w-full bg-muted rounded-lg animate-pulse" />
                </div>
                <div className="space-y-2">
                  <div className="h-4 w-16 bg-muted rounded-lg animate-pulse" />
                  <div className="h-10 w-full bg-muted rounded-lg animate-pulse" />
                </div>
              </div>
              <div className="space-y-2">
                <div className="h-4 w-16 bg-muted rounded-lg animate-pulse" />
                <div className="h-10 w-full bg-muted rounded-lg animate-pulse" />
              </div>
              <div className="space-y-2">
                <div className="h-4 w-16 bg-muted rounded-lg animate-pulse" />
                <div className="h-40 w-full bg-muted rounded-lg animate-pulse" />
              </div>
              <div className="h-10 w-full bg-muted rounded-lg animate-pulse" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Map Section Skeleton */}
      <div className="mt-16">
        <div className="h-8 w-48 bg-muted rounded-lg animate-pulse mx-auto mb-8" />
        <div className="aspect-video w-full rounded-lg bg-muted animate-pulse" />
      </div>
    </div>
  )
} 