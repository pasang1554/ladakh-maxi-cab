'use client'

import { FadeIn, SlideIn } from "@/components/animations"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"

const services = [
  {
    id: 1,
    title: "Bike Rental",
    description: "Explore Ladakh's rugged terrain on two wheels with our premium bike rental service.",
    image: "/services/bike-rental.jpg",
    price: "₹1,500/day",
  },
  {
    id: 2,
    title: "Car Rental",
    description: "Comfortable and reliable car rental service for your Ladakh adventure.",
    image: "/services/car-rental.jpg",
    price: "₹3,500/day",
  },
  {
    id: 3,
    title: "Homestay",
    description: "Experience authentic Ladakhi hospitality with our carefully selected homestays.",
    image: "/services/homestay.jpg",
    price: "₹1,000/night",
  },
  {
    id: 4,
    title: "Local Cuisine",
    description: "Savor authentic Ladakhi cuisine with our curated food experiences.",
    image: "/services/food-tour.jpg",
    price: "₹500/meal",
  },
  {
    id: 5,
    title: "Trekking Guide",
    description: "Professional trekking guides for safe and memorable mountain adventures.",
    image: "/services/bike-rental.jpg",
    price: "₹2,000/day",
  },
  {
    id: 6,
    title: "Cultural Tours",
    description: "Immerse yourself in Ladakh's rich cultural heritage with guided tours.",
    image: "/services/car-rental.jpg",
    price: "₹1,500/tour",
  },
]

export default function ServicesPage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="bg-muted py-20">
        <div className="container mx-auto px-4">
          <FadeIn>
            <h1 className="text-4xl font-bold text-center mb-4">Our Services</h1>
            <p className="text-muted-foreground text-center max-w-2xl mx-auto">
              Discover our comprehensive range of tourism services designed to make your Ladakh experience unforgettable.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <SlideIn key={service.id} delay={0.1 * (index + 1)}>
                <Card className="overflow-hidden">
                  <div className="relative h-48">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                    <p className="text-muted-foreground mb-4">{service.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-semibold text-primary">{service.price}</span>
                      <Button>Book Now</Button>
                    </div>
                  </CardContent>
                </Card>
              </SlideIn>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="bg-primary text-primary-foreground rounded-lg p-8 text-center">
            <FadeIn>
              <h2 className="text-3xl font-bold mb-4">Ready to Plan Your Trip?</h2>
              <p className="text-lg mb-8 max-w-2xl mx-auto">
                Contact us to customize your perfect Ladakh adventure.
              </p>
              <Button variant="secondary" size="lg">
                Get in Touch
              </Button>
            </FadeIn>
          </div>
        </div>
      </section>
    </div>
  )
} 