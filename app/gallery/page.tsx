'use client'

import { FadeIn, SlideIn } from "@/components/animations"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useState } from "react"
import Image from "next/image"

const categories = ["All", "Landscapes", "Culture", "Adventure", "Food"]

const galleryItems = [
  {
    id: 1,
    title: "Ladakh Mountains",
    description: "The stunning mountains of Ladakh",
    image: "/gallery/adventure.jpg",
    category: "Landscapes",
  },
  {
    id: 2,
    title: "Ladakh Culture",
    description: "Rich cultural heritage of Ladakh",
    image: "/gallery/adventure.jpg",
    category: "Culture",
  },
  {
    id: 3,
    title: "Adventure in Ladakh",
    description: "Exciting adventures in Ladakh",
    image: "/gallery/adventure.jpg",
    category: "Adventure",
  },
  {
    id: 4,
    title: "Ladakh Cuisine",
    description: "Traditional Ladakhi food",
    image: "/gallery/adventure.jpg",
    category: "Food",
  },
  {
    id: 5,
    title: "Ladakh Valley",
    description: "Beautiful valleys of Ladakh",
    image: "/gallery/adventure.jpg",
    category: "Landscapes",
  },
  {
    id: 6,
    title: "Ladakh Traditions",
    description: "Traditional practices of Ladakh",
    image: "/gallery/adventure.jpg",
    category: "Culture",
  },
]

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedImage, setSelectedImage] = useState<typeof galleryItems[0] | null>(null)

  const filteredItems = selectedCategory === "All"
    ? galleryItems
    : galleryItems.filter(item => item.category === selectedCategory)

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="bg-muted py-20">
        <div className="container mx-auto px-4">
          <FadeIn>
            <h1 className="text-4xl font-bold text-center mb-4">Photo Gallery</h1>
            <p className="text-muted-foreground text-center max-w-2xl mx-auto">
              Explore the beauty of Ladakh through our curated collection of photographs.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map((item, index) => (
              <SlideIn key={item.id} delay={0.1 * (index + 1)}>
                <Card
                  className="group cursor-pointer overflow-hidden"
                  onClick={() => setSelectedImage(item)}
                >
                  <div className="relative h-64">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </CardContent>
                </Card>
              </SlideIn>
            ))}
          </div>
        </div>
      </section>

      {/* Image Lightbox */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-4xl w-full">
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 text-white hover:text-white/80"
              onClick={() => setSelectedImage(null)}
            >
              ✕
            </Button>
            <div className="relative h-[80vh]">
              <Image
                src={selectedImage.image}
                alt={selectedImage.title}
                fill
                className="object-contain"
              />
            </div>
            <div className="mt-4 text-center text-white">
              <h3 className="text-xl font-semibold">{selectedImage.title}</h3>
              <p className="text-sm text-white/80">{selectedImage.description}</p>
            </div>
          </div>
        </div>
      )}

      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="bg-primary text-primary-foreground rounded-lg p-8 text-center">
            <FadeIn>
              <h2 className="text-3xl font-bold mb-4">Want to See More?</h2>
              <p className="text-lg mb-8 max-w-2xl mx-auto">
                Follow us on social media for daily updates and more stunning photos from Ladakh.
              </p>
              <Button variant="secondary" size="lg">
                Follow Us
              </Button>
            </FadeIn>
          </div>
        </div>
      </section>
    </div>
  )
} 