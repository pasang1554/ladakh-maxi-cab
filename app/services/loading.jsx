import { Card, CardContent } from "@/components/ui/card"

export default function ServicesLoading() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="bg-muted py-20">
        <div className="container mx-auto px-4">
          <div className="animate-pulse">
            <div className="h-10 w-48 bg-muted-foreground/20 rounded mx-auto mb-4" />
            <div className="h-6 w-96 bg-muted-foreground/20 rounded mx-auto" />
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Card key={i}>
                <div className="relative h-48">
                  <div className="absolute inset-0 bg-muted-foreground/20 animate-pulse" />
                </div>
                <CardContent className="p-6">
                  <div className="animate-pulse">
                    <div className="h-6 w-32 bg-muted-foreground/20 rounded mb-2" />
                    <div className="h-4 w-full bg-muted-foreground/20 rounded mb-4" />
                    <div className="flex justify-between items-center">
                      <div className="h-5 w-24 bg-muted-foreground/20 rounded" />
                      <div className="h-9 w-24 bg-muted-foreground/20 rounded" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="bg-primary text-primary-foreground rounded-lg p-8 text-center">
            <div className="animate-pulse">
              <div className="h-8 w-64 bg-primary-foreground/20 rounded mx-auto mb-4" />
              <div className="h-6 w-96 bg-primary-foreground/20 rounded mx-auto mb-8" />
              <div className="h-10 w-32 bg-primary-foreground/20 rounded mx-auto" />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
} 