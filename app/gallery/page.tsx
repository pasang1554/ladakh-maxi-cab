'use client'

import { FadeIn, SlideIn } from "@/components/animations"
import { Card } from "@/components/ui/card"
import Image from "next/image"

const galleryImages = [
  {
    id: 1,
    title: "Pangong Lake",
    description: "The mesmerizing blue waters of Pangong Lake",
    image: "/gallery/pangong.jpg",
  },
  {
    id: 2,
    title: "Leh Palace",
    description: "The historic Leh Palace against mountain backdrop",
    image: "/gallery/leh-palace.jpg",
  },
  {
    id: 3,
    title: "Nubra Valley",
    description: "The scenic beauty of Nubra Valley",
    image: "/gallery/nubra.jpg",
  },
  {
    id: 4,
    title: "Thiksey Monastery",
    description: "The majestic Thiksey Monastery",
    image: "/gallery/thiksey.jpg",
  },
  {
    id: 5,
    title: "Khardung La",
    description: "The highest motorable pass",
    image: "/gallery/khardungla.jpg",
  },
  {
    id: 6,
    title: "Local Culture",
    description: "Traditional Ladakhi cultural performance",
    image: "/gallery/culture.jpg",
  },
  {
    id: 7,
    title: "Mountain Biking",
    description: "Adventure biking in Ladakh",
    image: "/gallery/biking.jpg",
  },
  {
    id: 8,
    title: "Camping",
    description: "Starlit camping in Ladakh",
    image: "/gallery/camping.jpg",
  },
  {
    id: 9,
    title: "Local Food",
    description: "Traditional Ladakhi cuisine",
    image: "/gallery/food.jpg",
  }
]

export default function GalleryPage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="bg-muted py-20">
        <div className="container mx-auto px-4">
          <FadeIn>
            <h1 className="text-4xl font-bold text-center mb-4">Photo Gallery</h1>
            <p className="text-muted-foreground text-center max-w-2xl mx-auto">
              Explore the breathtaking beauty of Ladakh through our collection of stunning photographs.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {galleryImages.map((image, index) => (
              <SlideIn key={image.id} delay={0.1 * (index + 1)}>
                <Card className="overflow-hidden group cursor-pointer">
                  <div className="relative h-64">
                    <Image
                      src={image.image}
                      alt={image.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      priority={index < 6}
                    />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 text-white">
                      <h3 className="text-xl font-semibold mb-2">{image.title}</h3>
                      <p className="text-sm">{image.description}</p>
                    </div>
                  </div>
                </Card>
              </SlideIn>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
} 