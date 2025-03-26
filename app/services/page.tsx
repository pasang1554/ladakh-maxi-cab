import { FadeIn, SlideIn, Scale } from "@/components/animations"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Bike, Car, Home, Utensils } from "lucide-react"

const services = [
  {
    id: "bike-rental",
    title: "Bike Rental",
    description: "Explore Ladakh's breathtaking landscapes on two wheels. We offer a wide range of bikes suitable for all terrains.",
    image: "/services/bike-rental.jpg",
    price: 1500,
    icon: Bike,
    features: [
      "24/7 Roadside Assistance",
      "Helmet & Safety Gear Included",
      "Insurance Coverage",
      "Flexible Rental Periods",
    ],
  },
  {
    id: "car-rental",
    title: "Car Rental",
    description: "Comfortable and reliable vehicles for your Ladakh adventure. Choose from our fleet of SUVs and luxury cars.",
    image: "/services/car-rental.jpg",
    price: 3500,
    icon: Car,
    features: [
      "Professional Driver Available",
      "GPS Navigation",
      "Comfortable Seating",
      "Air Conditioning",
    ],
  },
  {
    id: "homestay",
    title: "Homestay",
    description: "Experience authentic Ladakhi hospitality in our carefully selected homestays across the region.",
    image: "/services/homestay.jpg",
    price: 2000,
    icon: Home,
    features: [
      "Traditional Meals",
      "Cultural Activities",
      "Local Guide",
      "Comfortable Rooms",
    ],
  },
  {
    id: "food-tour",
    title: "Food Tour",
    description: "Discover Ladakh's unique cuisine through guided food tours and cooking experiences.",
    image: "/services/food-tour.jpg",
    price: 1000,
    icon: Utensils,
    features: [
      "Local Restaurant Visits",
      "Cooking Demonstrations",
      "Food Tastings",
      "Cultural Insights",
    ],
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
              Discover our comprehensive range of services designed to make your Ladakh adventure unforgettable.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <SlideIn key={service.id} delay={0.1 * (index + 1)}>
                <Card className="group hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="relative h-48 rounded-lg overflow-hidden mb-4">
                      <img
                        src={service.image}
                        alt={service.title}
                        className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors" />
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      <service.icon className="h-5 w-5 text-primary" />
                      <h3 className="font-semibold text-lg">{service.title}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">
                      {service.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="font-semibold">₹{service.price}/day</span>
                      <Button>Book Now</Button>
                    </div>
                  </CardContent>
                </Card>
              </SlideIn>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <FadeIn>
              <h2 className="text-3xl font-bold mb-4">Why Choose Us?</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                We provide the best services to ensure your Ladakh adventure is safe, comfortable, and memorable.
              </p>
            </FadeIn>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "Expert Guides",
                description: "Our experienced guides know every corner of Ladakh.",
              },
              {
                title: "Safety First",
                description: "We prioritize your safety with proper equipment and protocols.",
              },
              {
                title: "Local Experience",
                description: "Authentic experiences that connect you with local culture.",
              },
              {
                title: "24/7 Support",
                description: "Round-the-clock assistance for your peace of mind.",
              },
            ].map((feature, index) => (
              <SlideIn key={feature.title} delay={0.1 * (index + 1)}>
                <Card>
                  <CardContent className="pt-6 text-center">
                    <h3 className="font-semibold mb-2">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
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
              <h2 className="text-3xl font-bold mb-4">Ready to Start Your Adventure?</h2>
              <p className="text-lg mb-8 max-w-2xl mx-auto">
                Contact us today to plan your perfect Ladakh trip. We're here to help make your dreams come true.
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