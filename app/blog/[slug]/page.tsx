import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { FadeIn, SlideIn, Scale } from "@/components/animations"

// This would typically come from a CMS or database
const blogPost = {
  id: 1,
  title: "Essential Tips for Riding in Ladakh",
  content: `
    <p>Ladakh, with its high-altitude terrain and challenging roads, offers an unforgettable experience for motorcycle enthusiasts. Here are some essential tips to make your riding adventure safe and enjoyable.</p>

    <h2>1. Acclimatization is Key</h2>
    <p>Before starting your ride, spend at least 2-3 days in Leh to acclimatize to the high altitude. This will help prevent altitude sickness and ensure you're in the best condition for riding.</p>

    <h2>2. Choose the Right Bike</h2>
    <p>For Ladakh's terrain, we recommend bikes with:</p>
    <ul>
      <li>Engine capacity of 350cc or higher</li>
      <li>Good ground clearance</li>
      <li>Reliable suspension</li>
      <li>Comfortable riding position</li>
    </ul>

    <h2>3. Pack Wisely</h2>
    <p>Essential items to pack:</p>
    <ul>
      <li>Warm riding gear</li>
      <li>Basic tools and spare parts</li>
      <li>First aid kit</li>
      <li>Emergency food and water</li>
    </ul>

    <h2>4. Plan Your Routes</h2>
    <p>Popular routes include:</p>
    <ul>
      <li>Leh to Nubra Valley</li>
      <li>Leh to Pangong Lake</li>
      <li>Leh to Tso Moriri</li>
    </ul>

    <h2>5. Safety First</h2>
    <p>Always wear proper safety gear and follow these guidelines:</p>
    <ul>
      <li>Wear a full-face helmet</li>
      <li>Use proper riding boots</li>
      <li>Carry a basic tool kit</li>
      <li>Keep emergency contact numbers handy</li>
    </ul>
  `,
  date: "March 15, 2024",
  readTime: "5 min read",
  category: "Travel Tips",
  author: {
    name: "Rajesh Kumar",
    role: "Experienced Rider",
    image: "/images/blog/author.jpg",
  },
  image: "/images/blog/bike-tips.jpg",
}

export default function BlogPost() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <FadeIn>
            <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground mb-6">
              <span>{blogPost.date}</span>
              <span>•</span>
              <span>{blogPost.readTime}</span>
              <span>•</span>
              <span>{blogPost.category}</span>
            </div>
            <h1 className="text-4xl font-bold mb-6">{blogPost.title}</h1>
          </FadeIn>
          <SlideIn direction="up" delay={0.2}>
            <div
              className="relative h-[400px] bg-cover bg-center rounded-lg mb-8"
              style={{
                backgroundImage: `url('${blogPost.image}')`,
              }}
            />
          </SlideIn>
        </div>

        {/* Content */}
        <div className="grid gap-8 md:grid-cols-3">
          <div className="md:col-span-2">
            <FadeIn delay={0.3}>
              <div
                className="prose prose-lg dark:prose-invert max-w-none"
                dangerouslySetInnerHTML={{ __html: blogPost.content }}
              />
            </FadeIn>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            <Scale>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div
                      className="w-16 h-16 rounded-full bg-cover bg-center"
                      style={{
                        backgroundImage: `url('${blogPost.author.image}')`,
                      }}
                    />
                    <div>
                      <h3 className="font-semibold">{blogPost.author.name}</h3>
                      <p className="text-sm text-muted-foreground">{blogPost.author.role}</p>
                    </div>
                  </div>
                  <p className="text-muted-foreground mb-4">
                    {blogPost.author.name} is an experienced rider who has explored Ladakh extensively.
                    He shares his knowledge to help others have a safe and memorable riding experience.
                  </p>
                  <Button variant="outline" className="w-full">
                    Follow Author
                  </Button>
                </CardContent>
              </Card>
            </Scale>

            <Scale>
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-4">Related Posts</h3>
                  <div className="space-y-4">
                    <Link href="/blog/2" className="block hover:text-primary">
                      Best Homestays in Ladakh
                    </Link>
                    <Link href="/blog/3" className="block hover:text-primary">
                      Must-Try Local Dishes
                    </Link>
                    <Link href="/blog/4" className="block hover:text-primary">
                      Best Time to Visit Ladakh
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </Scale>
          </div>
        </div>

        {/* Newsletter */}
        <div className="mt-16 text-center">
          <FadeIn>
            <h2 className="text-2xl font-bold mb-4">Stay Updated</h2>
            <p className="text-muted-foreground mb-8">
              Subscribe to our newsletter for more travel tips and stories from Ladakh.
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