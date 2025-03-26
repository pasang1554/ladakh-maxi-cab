import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { FadeIn, SlideIn, Scale, Stagger, StaggerItem } from "@/components/animations"

const blogPosts = [
  {
    id: 1,
    title: "Essential Tips for Riding in Ladakh",
    excerpt: "Everything you need to know about riding motorcycles in the high-altitude region of Ladakh.",
    image: "/images/blog/bike-tips.jpg",
    date: "March 15, 2024",
    readTime: "5 min read",
    category: "Travel Tips",
  },
  {
    id: 2,
    title: "Best Homestays in Ladakh",
    excerpt: "Discover the most authentic and comfortable homestays for your Ladakh experience.",
    image: "/images/blog/homestays.jpg",
    date: "March 10, 2024",
    readTime: "4 min read",
    category: "Accommodation",
  },
  {
    id: 3,
    title: "Must-Try Local Dishes",
    excerpt: "A guide to the most delicious traditional dishes you should try in Ladakh.",
    image: "/images/blog/food.jpg",
    date: "March 5, 2024",
    readTime: "6 min read",
    category: "Food",
  },
  {
    id: 4,
    title: "Best Time to Visit Ladakh",
    excerpt: "Learn about the different seasons and choose the perfect time for your Ladakh trip.",
    image: "/images/blog/seasons.jpg",
    date: "March 1, 2024",
    readTime: "5 min read",
    category: "Travel Tips",
  },
]

export default function BlogPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <FadeIn>
            <h1 className="text-4xl font-bold mb-4">Blog</h1>
            <p className="text-xl text-muted-foreground">
              Discover travel tips, local insights, and stories from Ladakh.
            </p>
          </FadeIn>
        </div>

        {/* Blog Posts Grid */}
        <Stagger>
          <div className="grid gap-8 md:grid-cols-2">
            {blogPosts.map((post, index) => (
              <StaggerItem key={post.id}>
                <Scale>
                  <Card className="overflow-hidden">
                    <div
                      className="relative h-48 bg-cover bg-center"
                      style={{
                        backgroundImage: `url('${post.image}')`,
                      }}
                    />
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                        <span>{post.date}</span>
                        <span>•</span>
                        <span>{post.readTime}</span>
                        <span>•</span>
                        <span>{post.category}</span>
                      </div>
                      <h2 className="text-2xl font-semibold mb-2">{post.title}</h2>
                      <p className="text-muted-foreground mb-6">{post.excerpt}</p>
                      <Link href={`/blog/${post.id}`}>
                        <Button variant="ghost" className="w-full">
                          Read More
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                </Scale>
              </StaggerItem>
            ))}
          </div>
        </Stagger>

        {/* Newsletter Section */}
        <div className="mt-16 text-center">
          <FadeIn>
            <h2 className="text-2xl font-bold mb-4">Stay Updated</h2>
            <p className="text-muted-foreground mb-8">
              Subscribe to our newsletter for the latest travel tips and stories from Ladakh.
            </p>
          </FadeIn>
          <SlideIn direction="up" delay={0.2}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 rounded-md border border-input bg-background"
              />
              <Button>Subscribe</Button>
            </div>
          </SlideIn>
        </div>
      </div>
    </div>
  )
} 