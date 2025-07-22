import { Card, CardContent } from "@/components/ui/card"

export default function ContactMessagesLoading() {
  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="h-8 w-48 bg-muted-foreground/20 rounded animate-pulse mb-8" />
        
        <div className="grid gap-6">
          {[...Array(5)].map((_, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="animate-pulse">
                  <div className="flex justify-between items-start mb-4">
                    <div className="space-y-2">
                      <div className="h-6 w-32 bg-muted-foreground/20 rounded" />
                      <div className="h-4 w-48 bg-muted-foreground/20 rounded" />
                      <div className="h-4 w-36 bg-muted-foreground/20 rounded" />
                    </div>
                    <div className="h-4 w-32 bg-muted-foreground/20 rounded" />
                  </div>
                  <div className="space-y-2">
                    <div className="h-4 w-full bg-muted-foreground/20 rounded" />
                    <div className="h-4 w-3/4 bg-muted-foreground/20 rounded" />
                    <div className="h-4 w-1/2 bg-muted-foreground/20 rounded" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
} 