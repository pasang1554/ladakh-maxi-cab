import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState } from "react";
import { FaRegSun, FaRegMoon, FaUser } from 'react-icons/fa';

const blogPosts = [
  {
    id: 2,
    slug: "best-homestays-in-ladakh",
    title: "Best Homestays in Ladakh",
    excerpt: "Discover the most authentic and comfortable homestays for your Ladakh experience. Experience local culture and hospitality.",
    image: "/images/blog/homestays.jpg",
    date: "March 10, 2024",
    readTime: "4 min read",
    category: "Accommodation",
    author: {
      name: "Tsering Dolma",
      role: "Local Host",
      image: "/images/blog/author2.jpg",
    }
  },
  // Add more blog posts here as needed
];

export default function BlogPage() {
  const [theme, setTheme] = useState('light');
  const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light');

  return (
    <div className={theme === 'dark' ? 'dark bg-gradient-to-b from-gray-900 via-gray-800 to-gray-700 text-white' : 'bg-gradient-to-b from-blue-50 via-white to-yellow-50'}>
      <div className="container mx-auto px-4 py-12 min-h-screen">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-10">Ladakh Blog</h1>
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 animate-fade-in-up">
          {blogPosts.map((post, idx) => (
            <Card key={idx} className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col hover:scale-105 hover:shadow-2xl transition-transform border border-primary/10">
              <div className="relative w-full h-48">
                <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
              </div>
              <CardContent className="p-6 flex-1 flex flex-col">
                <div className="flex items-center gap-2 mb-2">
                  <span className="bg-primary/10 text-primary px-2 py-1 rounded-full text-xs">{post.category}</span>
                  <span className="text-xs text-muted-foreground">{post.date}</span>
                  <span className="text-xs text-muted-foreground">{post.readTime}</span>
                </div>
                <h2 className="text-lg font-bold mb-2 text-primary">{post.title}</h2>
                <p className="text-muted-foreground mb-4 flex-1 text-sm">{post.excerpt}</p>
                <div className="flex items-center gap-2 mb-4">
                  {post.author?.image ? (
                    <img src={post.author.image} alt={post.author.name} className="w-8 h-8 rounded-full object-cover" />
                  ) : (
                    <FaUser className="w-8 h-8 text-primary" />
                  )}
                  <div>
                    <div className="font-semibold text-xs">{post.author?.name}</div>
                    <div className="text-xs text-muted-foreground">{post.author?.role}</div>
                  </div>
                </div>
                <Button asChild variant="outline" className="w-full mt-auto">
                  <Link href={`/blog/${post.slug}`}>Read More</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
} 