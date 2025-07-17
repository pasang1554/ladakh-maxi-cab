import { notFound } from "next/navigation"
import { blogPosts } from "../posts"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { FadeIn, SlideIn, Scale } from "@/components/animations"

type BlogPost = typeof blogPosts[number];

interface BlogPostPageProps {
  params: { slug: string };
}

export default function BlogPost({ params }: { params: { slug: string } }) {
  const post = blogPosts.find((p: BlogPost) => p.slug === params.slug)
  if (!post) return notFound()

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <FadeIn>
            <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground mb-6">
              <span>{post.date}</span>
              <span>•</span>
              <span>{post.readTime}</span>
              <span>•</span>
              <span className="bg-primary/10 text-primary px-2 py-1 rounded-full text-xs">
                {post.category}
              </span>
            </div>
            <h1 className="text-4xl font-bold mb-6">{post.title}</h1>
          </FadeIn>
          <SlideIn direction="up" delay={0.2}>
            <div className="relative h-[400px] rounded-lg mb-8 overflow-hidden">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>
          </SlideIn>
        </div>

        {/* Content */}
        <div className="grid gap-8 md:grid-cols-3">
          <div className="md:col-span-2">
            <FadeIn delay={0.3}>
              <div
                className="prose prose-lg dark:prose-invert max-w-none"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            </FadeIn>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            <Scale>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-2xl font-bold text-primary">
                        {post.author?.name?.charAt(0) || "A"}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-semibold">{post.author?.name || "Author"}</h3>
                      <p className="text-sm text-muted-foreground">{post.author?.role || "Travel Writer"}</p>
                    </div>
                  </div>
                  <p className="text-muted-foreground mb-4">
                    {post.author?.name || "The author"} shares insights and tips for your Ladakh journey.
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
                    {blogPosts.filter((p: BlogPost) => p.slug !== post.slug).slice(0, 4).map((related: BlogPost) => (
                      <Link key={related.slug} href={`/blog/${related.slug}`} className="block hover:text-primary">
                        {related.title}
                      </Link>
                    ))}
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
        <div className="flex justify-center mt-8 gap-2">
          <button className="px-4 py-2 rounded bg-primary text-white">Page 1</button>
          <button className="px-4 py-2 rounded bg-muted text-primary">Page 2</button>
          <button className="px-4 py-2 rounded bg-muted text-primary">Page 3</button>
        </div>
      </div>
    </div>
  )
} 