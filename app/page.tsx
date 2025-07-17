'use client'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Bike, Car, Home, Utensils, Mountain, Map, BadgeCheck } from "lucide-react"
import Link from "next/link"
import { FadeIn, SlideIn, Scale, Stagger, StaggerItem } from "@/components/animations"
import { useState, useEffect } from "react"
import TourPackages from '../components/TourPackages'
import { FaWhatsapp } from 'react-icons/fa';

const featuredServices = [
  {
    title: "Bike Rentals",
    description: "Explore Ladakh's rugged terrain on two wheels with our premium bike rentals.",
    icon: Bike,
    link: "/services#bike-rentals",
    options: ["Royal Enfield", "Himalayan", "Bajaj Avenger", "Scooters"]
  },
  {
    title: "Car Rentals",
    description: "Comfortable and reliable vehicles for your Ladakh adventure.",
    icon: Car,
    link: "/services#car-rentals",
    options: ["SUV", "Sedan", "Tempo Traveller", "Innova", "Scorpio"]
  },
  {
    title: "Homestays",
    description: "Experience authentic Ladakhi hospitality in traditional homes.",
    icon: Home,
    link: "/services#homestays",
    options: ["Village Homestay", "Family Stay", "Eco Homestay", "Luxury Homestay"]
  },
  {
    title: "Local Cuisine",
    description: "Savor the flavors of Ladakh with our curated food tours.",
    icon: Utensils,
    link: "/services#local-cuisine",
    options: ["Momos", "Thukpa", "Butter Tea", "Chutagi", "Skyu", "Local Food Tour"]
  },
  {
    title: "Adventure & Trekking",
    description: "Join thrilling treks and adventure activities across Ladakh's breathtaking landscapes.",
    icon: Mountain,
    link: "/services#adventure-trekking",
    options: ["Markha Valley Trek", "Chadar Trek", "Stok Kangri", "River Rafting", "Mountain Biking"]
  },
  {
    title: "Guided Tours",
    description: "Discover Ladakh's culture and history with our expert local guides.",
    icon: Map,
    link: "/services#guided-tours",
    options: ["Monastery Tour", "Cultural Walk", "Photography Tour", "Wildlife Tour"]
  },
  {
    title: "Permits & Travel Assistance",
    description: "Get help with permits and travel arrangements for a hassle-free trip.",
    icon: BadgeCheck,
    link: "/services#permits-assistance",
    options: ["ILP Assistance", "Airport Pickup", "Custom Itinerary", "24/7 Support"]
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

const blogPosts = [
  {
    id: 1,
    slug: "essential-tips-for-riding-in-ladakh",
    // ...other fields
  },
  {
    id: 2,
    slug: "best-homestays-in-ladakh",
    title: "Best Homestays in Ladakh",
    excerpt: "Discover the most authentic and comfortable homestays for your Ladakh experience. Experience local culture and hospitality.",
    image: "/images/blog/homestays.jpg",
    date: "March 10, 2024",
    readTime: "4 min read",
    category: "Accommodation",
    content: `
      <p>Here is a detailed guide to the best homestays in Ladakh...</p>
      <ul>
        <li>Stok Village Homestay: Experience local life in a traditional Ladakhi home.</li>
        <li>Nubra Valley Guesthouse: Enjoy stunning views and warm hospitality.</li>
        <li>Leh Old Town Homestay: Stay in the heart of Leh with easy access to attractions.</li>
      </ul>
      <p>Each homestay offers a unique experience, blending comfort with authentic Ladakhi culture.</p>
    `,
    author: {
      name: "Tsering Dolma",
      role: "Local Host",
      image: "/images/blog/author2.jpg",
    }
  },
  // ...other posts
]

const carouselImages = [
  "/gallery/culture.jpg",
  "/gallery/biking.jpg",
  "/gallery/pangong.jpg",
  "/gallery/leh-palace.jpg",
  "/gallery/nubra.jpg",
  "/gallery/valley.jpg",
]

const teamMembers = [
  {
    name: "Sonam Wangchuk",
    role: "Founder & Local Expert",
    image: "/images/team/sonam.jpg",
    bio: "Sonam Wangchuk is a passionate Ladakhi entrepreneur and local expert with over 15 years of experience in the tourism industry. Dedicated to sustainable travel and authentic experiences.",
    phone: "+918492008932",
    email: "info@ladakhtourism.com",
    whatsapp: "918492008932",
  },
  {
    name: "Tsering Dolma",
    role: "Homestay Coordinator",
    image: "/images/team/tsering.jpg",
    bio: "Tsering connects travelers with authentic Ladakhi homestays and ensures every guest feels at home.",
    phone: "+919876543210",
    email: "tsering@ladakhtourism.com",
    whatsapp: "919876543210",
  },
  // Add more team members here...
];

// Sample festivals data
const festivals = [
  { name: "Hemis Festival", date: "2025-06-23", location: "Hemis Monastery" },
  { name: "Losar (Tibetan New Year)", date: "2025-12-10", location: "Leh & all Ladakh" },
  { name: "Sindhu Darshan", date: "2025-06-12", location: "Shey Manla, Leh" },
  { name: "Ladakh Festival", date: "2025-09-20", location: "Leh" },
  { name: "Dosmochey", date: "2025-02-19", location: "Leh, Likir, Diskit" },
];

export default function HomePage() {
  // Carousel state
  const [current, setCurrent] = useState(0)
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % carouselImages.length)
    }, 3500)
    return () => clearInterval(interval)
  }, [])

  // Weather state
  const [weather, setWeather] = useState<{ temp: number; desc: string; icon: string } | null>(null);
  const [weatherLoading, setWeatherLoading] = useState(true);
  useEffect(() => {
    async function fetchWeather() {
      setWeatherLoading(true);
      try {
        // Replace 'YOUR_API_KEY' with your OpenWeatherMap API key
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=Leh,IN&units=metric&appid=YOUR_API_KEY`
        );
        if (!res.ok) throw new Error("Weather fetch failed");
        const data = await res.json();
        setWeather({
          temp: data.main.temp,
          desc: data.weather[0].description,
          icon: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
        });
      } catch {
        // fallback sample data
        setWeather({ temp: 15, desc: "clear sky", icon: "https://openweathermap.org/img/wn/01d@2x.png" });
      } finally {
        setWeatherLoading(false);
      }
    }
    fetchWeather();
  }, []);

  return (
    <div>
      {/* Carousel Section */}
      <section className="relative h-[60vh] md:h-[80vh] flex items-center justify-center overflow-hidden">
        {carouselImages.map((img, idx) => (
          <img
            key={img}
            src={img}
            alt="Ladakh slide"
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${idx === current ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
            draggable={false}
          />
        ))}
        <img src="/gallery/old-ladakh-1.jpg" alt="Old Ladakh 1" className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 opacity-0 z-0" />
        <div className="absolute inset-0 bg-black/60 z-20" />
        <div className="relative z-30 text-center text-white px-4">
          <FadeIn>
            <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold mb-4 md:mb-6">
              Discover the Magic of Ladakh
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl mb-6 md:mb-8 max-w-2xl mx-auto">
              Experience the breathtaking landscapes and rich culture of Ladakh with our premium tourism services.
            </p>
          </FadeIn>
          <SlideIn direction="up" delay={0.2}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/services">
                <Button size="lg" variant="default" className="w-full sm:w-auto">
                  Explore Services
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="bg-white/10 hover:bg-white/20 w-full sm:w-auto">
                  Contact Us
                </Button>
              </Link>
            </div>
          </SlideIn>
        </div>
        {/* Carousel dots */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-30">
          {carouselImages.map((_, idx) => (
            <button
              key={idx}
              className={`w-3 h-3 rounded-full border border-white ${idx === current ? 'bg-white' : 'bg-transparent'}`}
              onClick={() => setCurrent(idx)}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </section>
      {/* Weather Widget Section */}
      <section className="py-6 bg-blue-50 border-b border-blue-100 flex justify-center">
        <div className="flex items-center gap-4">
          <img
            src={weather?.icon}
            alt={weather?.desc}
            className="w-12 h-12"
            style={{ display: weather ? "block" : "none" }}
          />
          <div>
            <div className="text-lg font-semibold">Weather in Leh, Ladakh</div>
            {weatherLoading ? (
              <div className="text-blue-700">Loading...</div>
            ) : weather ? (
              <div className="text-blue-900">{weather.temp}&deg;C, {weather.desc}</div>
            ) : (
              <div className="text-red-600">Weather unavailable</div>
            )}
          </div>
        </div>
      </section>
      {/* History of Ladakh Section */}
      <section className="py-12 md:py-16 bg-muted/50">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">History of Ladakh</h2>
          <p className="text-lg text-muted-foreground mb-4">
            Ladakh, often called the "Land of High Passes," is a region of breathtaking beauty and rich cultural heritage. Nestled between the Karakoram and Himalayan ranges, Ladakh has been a crossroads of ancient trade routes and a melting pot of Buddhist and Tibetan cultures for centuries. Its monasteries, palaces, and vibrant festivals reflect a unique history shaped by geography and tradition.
          </p>
          <p className="text-base text-muted-foreground">
            From the ancient kingdom of Maryul to its role as a vital stop on the Silk Road, Ladakh's history is filled with stories of resilience, spirituality, and adventure. Today, it welcomes travelers from around the world to experience its stunning landscapes, warm hospitality, and timeless traditions.
          </p>
        </div>
      </section>
      {/* Festivals Calendar Section */}
      <section className="py-12 md:py-16 bg-yellow-50 border-b border-yellow-100">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">Festivals Calendar 2025</h2>
          <p className="text-muted-foreground mb-6">Major festivals celebrated in Ladakh with dates and locations.</p>
          <div className="overflow-x-auto">
            <table className="min-w-full border rounded-lg bg-white">
              <thead>
                <tr className="bg-yellow-100">
                  <th className="py-2 px-4 text-left">Festival</th>
                  <th className="py-2 px-4 text-left">Date</th>
                  <th className="py-2 px-4 text-left">Location</th>
                </tr>
              </thead>
              <tbody>
                {festivals.map((fest) => (
                  <tr key={fest.name} className="border-t">
                    <td className="py-2 px-4">{fest.name}</td>
                    <td className="py-2 px-4">{new Date(fest.date).toLocaleDateString()}</td>
                    <td className="py-2 px-4">{fest.location}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
      {/* Tour Packages Section on Home - moved below calendar */}
      <div className="container mx-auto px-4 py-12">
        <TourPackages />
        <div className="flex justify-center mt-4">
          <Button asChild>
            <Link href="/services">See All Packages</Link>
          </Button>
        </div>
      </div>
      {/* Our Services Section */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 md:mb-12">Our Services</h2>
          <div className="grid gap-6 md:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {featuredServices.map((service, index) => (
              <div key={index} className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
                <service.icon className="h-10 w-10 mb-4 text-primary" />
                <h3 className="text-lg font-semibold mb-2">{service.title}</h3>
                <p className="text-muted-foreground text-sm mb-4 text-center">{service.description}</p>
                {service.options && (
                  <div className="flex flex-wrap gap-2 mb-4 justify-center">
                    {service.options.map((opt, i) => (
                      <span key={i} className="bg-primary/10 text-primary px-2 py-1 rounded-full text-xs">{opt}</span>
                    ))}
                  </div>
                )}
                <Link href={service.link} className="text-primary hover:underline font-medium">Learn More</Link>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Why Choose Us Section */}
      <section className="py-12 md:py-16 bg-primary/5">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Why Choose Us?</h2>
          <p className="text-lg text-muted-foreground mb-4">
            We are your one-stop solution for all tourism services in Ladakh:
            <br />
            <span className="font-medium text-primary">Bike Rentals, Car Rentals, Homestays, Food Tours, Trekking, Local Guides, Custom Tours, Permits, and 24/7 Support.</span>
          </p>
          <p className="text-base text-muted-foreground">
            Whether you're an adventurer, a family, or a solo traveler, we make your Ladakh experience safe, memorable, and hassle-free.
          </p>
        </div>
      </section>
      {/* Important Contacts Section */}
      <section className="py-12 md:py-16 bg-muted/50">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">Important Contacts</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="bg-white rounded-lg shadow p-4 flex flex-col">
              <span className="font-semibold">Ladakh Police</span>
              <a href="tel:100" className="text-blue-600 hover:underline">100</a>
            </div>
            <div className="bg-white rounded-lg shadow p-4 flex flex-col">
              <span className="font-semibold">Tourism Office (Leh)</span>
              <a href="tel:+911982252297" className="text-blue-600 hover:underline">+91 1982 252297</a>
            </div>
            <div className="bg-white rounded-lg shadow p-4 flex flex-col">
              <span className="font-semibold">SNM Hospital (Leh)</span>
              <a href="tel:+911982252010" className="text-blue-600 hover:underline">+91 1982 252010</a>
            </div>
            <div className="bg-white rounded-lg shadow p-4 flex flex-col">
              <span className="font-semibold">Emergency/Rescue</span>
              <a href="tel:112" className="text-blue-600 hover:underline">112</a>
            </div>
            <div className="bg-white rounded-lg shadow p-4 flex flex-col">
              <span className="font-semibold">Your Business/WhatsApp</span>
              <a href="tel:+918492008932" className="text-green-600 hover:underline">+91 84920 08932</a>
              <a href="https://wa.me/918492008932" target="_blank" rel="noopener" className="text-green-600 hover:underline">
                <FaWhatsapp className="inline-block w-5 h-5 mr-1 text-green-600" />Chat on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>
      {/* Meet the Team Section */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Meet the Team</h2>
          <div className="grid gap-8 md:grid-cols-2">
            {teamMembers.map((member, idx) => (
              <div key={idx} className="flex flex-col items-center bg-muted/50 rounded-lg p-6 shadow">
                <img src={member.image} alt={member.name} className="w-28 h-28 rounded-full object-cover mb-3 border-4 border-primary" />
                <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                <p className="text-primary font-medium mb-2">{member.role}</p>
                <p className="text-muted-foreground mb-3">{member.bio}</p>
                <div className="flex flex-col items-center gap-1">
                  <a href={`tel:${member.phone}`} className="text-blue-600 hover:underline">{member.phone}</a>
                  <a href={`mailto:${member.email}`} className="text-blue-600 hover:underline">{member.email}</a>
                  <a href={`https://wa.me/${member.whatsapp}`} target="_blank" rel="noopener" className="text-green-600 hover:underline">
                    <FaWhatsapp className="inline-block w-5 h-5 mr-1 text-green-600" />Chat on WhatsApp
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

