'use client'

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { FadeIn, SlideIn, Scale, Stagger, StaggerItem } from "@/components/animations"
import { useState } from "react"
import { blogPosts } from "./posts"

export default function BlogPage() {
  // Newsletter state
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterLoading, setNewsletterLoading] = useState(false);
  const [newsletterMessage, setNewsletterMessage] = useState("");

  async function handleNewsletterSubscribe(e: React.FormEvent) {
    e.preventDefault();
    setNewsletterLoading(true);
    setNewsletterMessage("");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: newsletterEmail }),
      });
      const data = await res.json();
      if (res.ok) {
        setNewsletterMessage("Thank you for subscribing!");
        setNewsletterEmail("");
      } else {
        setNewsletterMessage(data.message || data.error || "Subscription failed.");
      }
    } catch (err) {
      setNewsletterMessage("Something went wrong. Please try again later.");
    } finally {
      setNewsletterLoading(false);
    }
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto">
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
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {blogPosts.map((post: typeof blogPosts[number], index: number) => (
              <StaggerItem key={post.id}>
                <Scale>
                  <Card className="overflow-hidden h-full flex flex-col">
                    <div className="relative h-48 bg-cover bg-center overflow-hidden">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover blog-card-image"
                      />
                    </div>
                    <CardContent className="p-6 flex-1 flex flex-col">
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                        <span>{post.date}</span>
                        <span>•</span>
                        <span>{post.readTime}</span>
                        <span>•</span>
                        <span className="bg-primary/10 text-primary px-2 py-1 rounded-full text-xs">
                          {post.category}
                        </span>
                      </div>
                      <h2 className="text-xl font-semibold mb-2 line-clamp-2">{post.title}</h2>
                      <p className="text-muted-foreground mb-6 flex-1 line-clamp-3">{post.excerpt}</p>
                      <Link href={`/blog/${post.slug}`}>
                        <Button variant="ghost" className="w-full mt-auto">
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
            <form onSubmit={handleNewsletterSubscribe} className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 rounded-md border border-input bg-background"
                value={newsletterEmail}
                onChange={e => setNewsletterEmail(e.target.value)}
                required
                disabled={newsletterLoading}
              />
              <Button type="submit" disabled={newsletterLoading || !newsletterEmail}>
                {newsletterLoading ? "Subscribing..." : "Subscribe"}
              </Button>
            </form>
            {newsletterMessage && (
              <div className="mt-4 text-sm text-center text-primary">
                {newsletterMessage}
              </div>
            )}
          </SlideIn>
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-8 gap-2">
          <button className="px-4 py-2 rounded bg-primary text-white">Page 1</button>
          <button className="px-4 py-2 rounded bg-muted text-primary">Page 2</button>
          <button className="px-4 py-2 rounded bg-muted text-primary">Page 3</button>
        </div>
      </div>
    </div>
  )
} 