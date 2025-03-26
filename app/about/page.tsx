import { FadeIn, SlideIn } from "@/components/animations"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import { Award, Heart, MapPin, Users } from "lucide-react"

const teamMembers = [
  {
    name: "Tenzin Pasang",
    role: "Founder & CEO",
    image: "/team/tenzin.jpg",
    bio: "A Ladakhi native with 15 years of experience in tourism and hospitality.",
  },
  {
    name: "Sahil",
    role: "Head of Operations",
    image: "/team/sahil.jpg",
    bio: "Expert in sustainable tourism and community development.",
  },
  {
    name: "Rigzin Tashi",
    role: "Adventure Guide",
    image: "/team/rigzin.jpg",
    bio: "Certified mountaineer with expertise in high-altitude expeditions.",
  },
  {
    name: "Dolma Yangchen",
    role: "Cultural Expert",
    image: "/team/dolma.jpg",
    bio: "Specialist in Ladakhi culture and traditional practices.",
  },
]

const values = [
  {
    icon: Heart,
    title: "Passion",
    description: "We're passionate about sharing the beauty and culture of Ladakh with the world.",
  },
  {
    icon: MapPin,
    title: "Local Expertise",
    description: "Our team consists of Ladakhi natives who know every corner of the region.",
  },
  {
    icon: Users,
    title: "Community",
    description: "We believe in sustainable tourism that benefits local communities.",
  },
  {
    icon: Award,
    title: "Excellence",
    description: "We strive for excellence in every aspect of our services.",
  },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center">
        <div className="absolute inset-0">
          <Image
            src="/about/hero.jpg"
            alt="Ladakh Mountains"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="relative container mx-auto px-4 text-center text-white">
          <FadeIn>
            <h1 className="text-5xl font-bold mb-4">Our Story</h1>
            <p className="text-xl max-w-2xl mx-auto">
              Discover how we're making Ladakh's beauty accessible to travelers worldwide.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <FadeIn>
              <div>
                <h2 className="text-3xl font-bold mb-6">Our Journey</h2>
                <p className="text-muted-foreground mb-6">
                  Founded in 2015, we started with a simple mission: to share the magic of Ladakh with the world while preserving its unique culture and environment.
                </p>
                <p className="text-muted-foreground mb-8">
                  Today, we're proud to be one of Ladakh's leading travel companies, offering authentic experiences that connect travelers with the heart and soul of this incredible region.
                </p>
                <Button size="lg">Learn More</Button>
              </div>
            </FadeIn>
            <SlideIn>
              <div className="relative h-[400px] rounded-lg overflow-hidden">
                <Image
                  src="/about/story.jpg"
                  alt="Our Journey"
                  fill
                  className="object-cover"
                />
              </div>
            </SlideIn>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <FadeIn>
              <h2 className="text-3xl font-bold mb-4">Our Values</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                These core values guide everything we do at Ladakh Travel.
              </p>
            </FadeIn>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <SlideIn key={value.title} delay={0.1 * (index + 1)}>
                <Card>
                  <CardContent className="p-6 text-center">
                    <value.icon className="h-12 w-12 text-primary mx-auto mb-4" />
                    <h3 className="font-semibold mb-2">{value.title}</h3>
                    <p className="text-sm text-muted-foreground">{value.description}</p>
                  </CardContent>
                </Card>
              </SlideIn>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <FadeIn>
              <h2 className="text-3xl font-bold mb-4">Meet Our Team</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                The passionate individuals behind Ladakh Travel.
              </p>
            </FadeIn>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <SlideIn key={member.name} delay={0.1 * (index + 1)}>
                <Card>
                  <div className="relative h-64">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <CardContent className="p-6 text-center">
                    <h3 className="font-semibold">{member.name}</h3>
                    <p className="text-sm text-primary mb-2">{member.role}</p>
                    <p className="text-sm text-muted-foreground">{member.bio}</p>
                  </CardContent>
                </Card>
              </SlideIn>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <FadeIn>
            <h2 className="text-3xl font-bold mb-4">Ready to Start Your Journey?</h2>
            <p className="text-lg mb-8 max-w-2xl mx-auto">
              Let us help you create unforgettable memories in Ladakh.
            </p>
            <Button variant="secondary" size="lg">
              Plan Your Trip
            </Button>
          </FadeIn>
        </div>
      </section>
    </div>
  )
} 