import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Bike, Car, Home, Utensils } from "lucide-react"
import Link from "next/link"
import { FadeIn, SlideIn, Scale, Stagger, StaggerItem } from "@/components/animations"

const featuredServices = [
  {
    title: "Bike Rentals",
    description: "Explore Ladakh's rugged terrain on two wheels with our premium bike rentals.",
    icon: Bike,
    link: "/services#bike-rentals",
  },
  {
    title: "Car Rentals",
    description: "Comfortable and reliable vehicles for your Ladakh adventure.",
    icon: Car,
    link: "/services#car-rentals",
  },
  {
    title: "Homestays",
    description: "Experience authentic Ladakhi hospitality in traditional homes.",
    icon: Home,
    link: "/services#homestays",
  },
  {
    title: "Local Cuisine",
    description: "Savor the flavors of Ladakh with our curated food tours.",
    icon: Utensils,
    link: "/services#local-cuisine",
  },
]

const testimonials = [
  {
    text: "The bike rental service was excellent. The bikes were well-maintained and the staff was very helpful.",
    author: "Rajesh Kumar",
    location: "Delhi",
    rating: 5,
  },
  {
    text: "Our homestay experience was unforgettable. The family was so welcoming and the food was amazing!",
    author: "Priya Sharma",
    location: "Mumbai",
    rating: 5,
  },
  {
    text: "The local cuisine tour was a highlight of our trip. We got to try so many authentic dishes.",
    author: "Amit Patel",
    location: "Bangalore",
    rating: 5,
  },
]

export default function HomePage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/images/hero.jpg')",
          }}
        >
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="relative z-10 text-center text-white px-4">
          <FadeIn>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Discover the Magic of Ladakh
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
              Experience the breathtaking landscapes and rich culture of Ladakh with our premium tourism services.
            </p>
          </FadeIn>
          <SlideIn direction="up" delay={0.2}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/services">
                <Button size="lg" variant="default">
                  Explore Services
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="bg-white/10 hover:bg-white/20">
                  Contact Us
                </Button>
              </Link>
            </div>
          </SlideIn>
          </div>
        </section>

      {/* Featured Services */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <FadeIn>
            <h2 className="text-3xl font-bold text-center mb-12">Our Services</h2>
          </FadeIn>
          <Stagger>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {featuredServices.map((service, index) => (
                <StaggerItem key={index}>
                  <Scale>
                    <Card className="h-full">
                      <CardContent className="p-6">
                        <service.icon className="h-12 w-12 mb-4 text-primary" />
                        <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                        <p className="text-muted-foreground mb-4">{service.description}</p>
                        <Link href={service.link}>
                          <Button variant="ghost" className="w-full">
                            Learn More
                          </Button>
                        </Link>
                </CardContent>
              </Card>
                  </Scale>
                </StaggerItem>
              ))}
            </div>
          </Stagger>
          </div>
        </section>

      {/* Testimonials */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <FadeIn>
            <h2 className="text-3xl font-bold text-center mb-12">What Our Guests Say</h2>
          </FadeIn>
          <Stagger>
            <div className="grid gap-8 md:grid-cols-3">
              {testimonials.map((testimonial, index) => (
                <StaggerItem key={index}>
                  <Scale>
                    <Card>
                      <CardContent className="p-6">
                        <div className="flex mb-4">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <svg
                              key={i}
                              className="h-5 w-5 text-yellow-400"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                        <p className="text-muted-foreground mb-4">{testimonial.text}</p>
                    <div>
                          <p className="font-semibold">{testimonial.author}</p>
                          <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                  </div>
                </CardContent>
              </Card>
                  </Scale>
                </StaggerItem>
              ))}
            </div>
          </Stagger>
          </div>
        </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <FadeIn>
            <h2 className="text-3xl font-bold mb-4">Ready to Start Your Adventure?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Contact us today to plan your perfect Ladakh experience.
            </p>
          </FadeIn>
          <SlideIn direction="up" delay={0.2}>
            <Link href="/contact">
              <Button size="lg" variant="secondary">
                Get in Touch
              </Button>
                  </Link>
          </SlideIn>
        </div>
      </section>
    </div>
  )
}

