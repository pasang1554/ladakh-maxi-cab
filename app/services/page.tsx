'use client'

import { useState, useEffect } from 'react'
import { FadeIn, SlideIn } from "@/components/animations"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Image from "next/image"
import { toast } from 'sonner'
import { Calendar, MapPin, Star, Users, Bike, Car, Home, Utensils, Mountain, Map } from 'lucide-react'
import TourPackages from '../../components/TourPackages'

interface Service {
  id: string
  title: string
  description: string
  image: string
  price: number
  category: string
  features: string[]
  isAvailable: boolean
}

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    loadServices()
  }, [])

  const loadServices = async () => {
    try {
      const response = await fetch('/api/services')
      if (response.ok) {
        const data = await response.json()
        setServices(data)
      } else {
        toast.error('Failed to load services')
      }
    } catch (error) {
      toast.error('Error loading services')
    } finally {
      setIsLoading(false)
    }
  }

  const categories = ['all', 'bike', 'cars', 'homestay', 'food', 'trekking', 'tours']
  const filteredServices = services.filter(service => 
    service.isAvailable
  )

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-lg">Loading services...</p>
        </div>
      </div>
    );
  }

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

      {/* Services with Tabs */}
      <section className="py-8 md:py-16">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 lg:grid-cols-7 mb-6 md:mb-8 overflow-x-auto">
              {categories.map((category) => (
                <TabsTrigger key={category} value={category} className="capitalize text-xs md:text-sm whitespace-nowrap">
                  {category === 'all' ? 'All' : (
                    <span className="flex items-center gap-1 md:gap-2">
                      <span className="flex items-center justify-center w-4 h-4 md:w-5 md:h-5">
                        {/* Add icons here if needed */}
                      </span>
                      <span className="hidden sm:inline">{category === 'cars' ? 'Cars' : category}</span>
                    </span>
                  )}
                </TabsTrigger>
              ))}
            </TabsList>

            {categories.map((category) => (
              <TabsContent key={category} value={category}>
                {category === 'bike' && (
                  <div className="mb-8">
                    <h2 className="text-2xl font-bold mb-4 text-primary">Popular Bike Rentals in Ladakh</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      {/* Royal Enfield Himalayan 411 */}
                      <div className="flex gap-4 bg-white rounded-xl shadow-2xl p-6 border-2 border-green-200 hover:border-green-400 transition-all duration-200 min-h-[140px] md:min-h-[180px]">
                        <img src="/services/bike.jpg" alt="Royal Enfield Himalayan 411" className="w-40 h-32 md:w-48 md:h-36 object-cover rounded-lg shadow" />
                        <div className="flex flex-col justify-center">
                          <h3 className="font-semibold text-lg">Royal Enfield Himalayan 411 cc (BS6/BS4)</h3>
                          <p className="text-sm text-muted-foreground">Perfect for high-altitude terrain & off-road</p>
                          <div className="text-green-700 font-bold mt-1">💰 ₹2,500–2,800/day</div>
                          <div className="text-xs mt-1">🔗 Available at: Mototour Ladakh, Reddit-recommended, Zaildar, Endeavour</div>
                        </div>
                      </div>
                      {/* Royal Enfield Himalayan 450 */}
                      <div className="flex gap-4 bg-white rounded-xl shadow-2xl p-6 border-2 border-green-200 hover:border-green-400 transition-all duration-200 min-h-[140px] md:min-h-[180px]">
                        <img src="/services/bike.jpg" alt="Royal Enfield Himalayan 450" className="w-40 h-32 md:w-48 md:h-36 object-cover rounded-lg shadow" />
                        <div className="flex flex-col justify-center">
                          <h3 className="font-semibold text-lg">Royal Enfield Himalayan 450 / 450‑RS</h3>
                          <p className="text-sm text-muted-foreground">Latest ADV variant with more torque and control</p>
                          <div className="text-green-700 font-bold mt-1">💰 ₹2,800–3,200/day</div>
                          <div className="text-xs mt-1">🔗 Seen on Reddit and top Ladakh tours</div>
                        </div>
                      </div>
                      {/* Royal Enfield Classic 350 */}
                      <div className="flex gap-4 bg-white rounded-xl shadow-2xl p-6 border-2 border-green-200 hover:border-green-400 transition-all duration-200 min-h-[140px] md:min-h-[180px]">
                        <img src="/services/bike.jpg" alt="Royal Enfield Classic 350" className="w-40 h-32 md:w-48 md:h-36 object-cover rounded-lg shadow" />
                        <div className="flex flex-col justify-center">
                          <h3 className="font-semibold text-lg">Royal Enfield Classic 350 (Standard / Reborn)</h3>
                          <p className="text-sm text-muted-foreground">Most iconic cruiser, comfortable for long rides</p>
                          <div className="text-green-700 font-bold mt-1">💰 ₹1,500–2,200/day</div>
                          <div className="text-xs mt-1">🔗 Available at: Discover with Dheeraj, Thrillophilia, Zaildar Ladakh Trip</div>
                        </div>
                      </div>
                      {/* Royal Enfield Classic / Standard 500 */}
                      <div className="flex gap-4 bg-white rounded-xl shadow-2xl p-6 border-2 border-green-200 hover:border-green-400 transition-all duration-200 min-h-[140px] md:min-h-[180px]">
                        <img src="/services/bike.jpg" alt="Royal Enfield Classic 500" className="w-40 h-32 md:w-48 md:h-36 object-cover rounded-lg shadow" />
                        <div className="flex flex-col justify-center">
                          <h3 className="font-semibold text-lg">Royal Enfield Classic / Standard 500 (incl. Thunderbird)</h3>
                          <p className="text-sm text-muted-foreground">Now discontinued, but still rented as vintage feel</p>
                          <div className="text-green-700 font-bold mt-1">💰 ₹2,000–2,100/day</div>
                          <div className="text-xs mt-1">🔗 Mototour Ladakh, Endeavour</div>
                        </div>
                      </div>
                      {/* Royal Enfield Meteor 350 */}
                      <div className="flex gap-4 bg-white rounded-xl shadow-2xl p-6 border-2 border-green-200 hover:border-green-400 transition-all duration-200 min-h-[140px] md:min-h-[180px]">
                        <img src="/services/bike.jpg" alt="Royal Enfield Meteor 350" className="w-40 h-32 md:w-48 md:h-36 object-cover rounded-lg shadow" />
                        <div className="flex flex-col justify-center">
                          <h3 className="font-semibold text-lg">Royal Enfield Meteor 350</h3>
                          <p className="text-sm text-muted-foreground">New-gen cruiser with smoother engine & styling</p>
                          <div className="text-green-700 font-bold mt-1">💰 ₹2,200–2,500/day</div>
                          <div className="text-xs mt-1">🔗 Available at: Royal Brothers, Zaildar, Stonehead Bikes</div>
                        </div>
                      </div>
                      {/* Royal Enfield Interceptor 650 */}
                      <div className="flex gap-4 bg-white rounded-xl shadow-2xl p-6 border-2 border-green-200 hover:border-green-400 transition-all duration-200 min-h-[140px] md:min-h-[180px]">
                        <img src="/services/bike.jpg" alt="Royal Enfield Interceptor 650" className="w-40 h-32 md:w-48 md:h-36 object-cover rounded-lg shadow" />
                        <div className="flex flex-col justify-center">
                          <h3 className="font-semibold text-lg">Royal Enfield Interceptor 650</h3>
                          <p className="text-sm text-muted-foreground">Twin-cylinder power, great for Leh–Manali highway</p>
                          <div className="text-green-700 font-bold mt-1">💰 ₹3,000–3,500/day</div>
                          <div className="text-xs mt-1">🔗 Thrillophilia, Dheeraj Sharma’s travel blog</div>
                        </div>
                      </div>
                      {/* Royal Enfield Scram 411 */}
                      <div className="flex gap-4 bg-white rounded-xl shadow-2xl p-6 border-2 border-green-200 hover:border-green-400 transition-all duration-200 min-h-[140px] md:min-h-[180px]">
                        <img src="/services/bike.jpg" alt="Royal Enfield Scram 411" className="w-40 h-32 md:w-48 md:h-36 object-cover rounded-lg shadow" />
                        <div className="flex flex-col justify-center">
                          <h3 className="font-semibold text-lg">Royal Enfield Scram 411</h3>
                          <p className="text-sm text-muted-foreground">Himalayan base, but street-styled and agile</p>
                          <div className="text-green-700 font-bold mt-1">💰 ₹2,500–2,800/day</div>
                          <div className="text-xs mt-1">🔗 Local rentals in Leh and Zaildar Ladakh Trip</div>
                        </div>
                      </div>
                      {/* Royal Enfield Hunter 350 */}
                      <div className="flex gap-4 bg-white rounded-xl shadow-2xl p-6 border-2 border-green-200 hover:border-green-400 transition-all duration-200 min-h-[140px] md:min-h-[180px]">
                        <img src="/services/bike.jpg" alt="Royal Enfield Hunter 350" className="w-40 h-32 md:w-48 md:h-36 object-cover rounded-lg shadow" />
                        <div className="flex flex-col justify-center">
                          <h3 className="font-semibold text-lg">Royal Enfield Hunter 350</h3>
                          <p className="text-sm text-muted-foreground">Lighter and nimble, suited for city and nearby places</p>
                          <div className="text-green-700 font-bold mt-1">💰 ₹1,800–2,000/day</div>
                          <div className="text-xs mt-1">🔗 Reddit mentions, Zaildar, Mototour Ladakh</div>
                        </div>
                      </div>
                      {/* KTM Adventure 250 / 390 */}
                      <div className="flex gap-4 bg-white rounded-xl shadow-2xl p-6 border-2 border-green-200 hover:border-green-400 transition-all duration-200 min-h-[140px] md:min-h-[180px]">
                        <img src="/services/bike.jpg" alt="KTM Adventure 250 / 390" className="w-40 h-32 md:w-48 md:h-36 object-cover rounded-lg shadow" />
                        <div className="flex flex-col justify-center">
                          <h3 className="font-semibold text-lg">KTM Adventure 250 / 390</h3>
                          <p className="text-sm text-muted-foreground">Lightweight off-road beast</p>
                          <div className="text-green-700 font-bold mt-1">💰 ₹2,400–3,500/day</div>
                          <div className="text-xs mt-1">🔗 Endeavour Ladakh, ExploreUT</div>
                        </div>
                      </div>
                      {/* Bajaj Dominar 400 */}
                      <div className="flex gap-4 bg-white rounded-xl shadow-2xl p-6 border-2 border-green-200 hover:border-green-400 transition-all duration-200 min-h-[140px] md:min-h-[180px]">
                        <img src="/services/bike.jpg" alt="Bajaj Dominar 400" className="w-40 h-32 md:w-48 md:h-36 object-cover rounded-lg shadow" />
                        <div className="flex flex-col justify-center">
                          <h3 className="font-semibold text-lg">Bajaj Dominar 400</h3>
                          <p className="text-sm text-muted-foreground">Highway performer with good suspension</p>
                          <div className="text-green-700 font-bold mt-1">💰 ₹1,800–2,200/day</div>
                          <div className="text-xs mt-1">🔗 Stonehead Bikes, ExploreUT</div>
                        </div>
                      </div>
                      {/* Hero Xpulse 200 */}
                      <div className="flex gap-4 bg-white rounded-xl shadow-2xl p-6 border-2 border-green-200 hover:border-green-400 transition-all duration-200 min-h-[140px] md:min-h-[180px]">
                        <img src="/services/bike.jpg" alt="Hero Xpulse 200" className="w-40 h-32 md:w-48 md:h-36 object-cover rounded-lg shadow" />
                        <div className="flex flex-col justify-center">
                          <h3 className="font-semibold text-lg">Hero Xpulse 200</h3>
                          <p className="text-sm text-muted-foreground">Budget dual-sport, excellent for trails</p>
                          <div className="text-green-700 font-bold mt-1">💰 ₹1,000–1,500/day</div>
                          <div className="text-xs mt-1">🔗 Available in all major bike rental shops</div>
                        </div>
                      </div>
                      {/* Bajaj Avenger 220 */}
                      <div className="flex gap-4 bg-white rounded-xl shadow-2xl p-6 border-2 border-green-200 hover:border-green-400 transition-all duration-200 min-h-[140px] md:min-h-[180px]">
                        <img src="/services/bike.jpg" alt="Bajaj Avenger 220" className="w-40 h-32 md:w-48 md:h-36 object-cover rounded-lg shadow" />
                        <div className="flex flex-col justify-center">
                          <h3 className="font-semibold text-lg">Bajaj Avenger 220</h3>
                          <p className="text-sm text-muted-foreground">Comfortable cruiser with pillion support</p>
                          <div className="text-green-700 font-bold mt-1">💰 ₹1,200–1,800/day</div>
                          <div className="text-xs mt-1">🔗 Available at Endeavour, Zaildar</div>
                        </div>
                      </div>
                      {/* Honda Activa / Dio */}
                      <div className="flex gap-4 bg-white rounded-xl shadow-2xl p-6 border-2 border-green-200 hover:border-green-400 transition-all duration-200 min-h-[140px] md:min-h-[180px]">
                        <img src="/services/bike.jpg" alt="Honda Activa / Dio" className="w-40 h-32 md:w-48 md:h-36 object-cover rounded-lg shadow" />
                        <div className="flex flex-col justify-center">
                          <h3 className="font-semibold text-lg">Honda Activa / Dio</h3>
                          <p className="text-sm text-muted-foreground">Automatic, easy to ride, ideal for city exploration</p>
                          <div className="text-green-700 font-bold mt-1">💰 ₹700–1,000/day</div>
                          <div className="text-xs mt-1">🔗 Found in every rental shop in Leh</div>
                        </div>
                      </div>
                      {/* TVS Jupiter / Wego */}
                      <div className="flex gap-4 bg-white rounded-xl shadow-2xl p-6 border-2 border-green-200 hover:border-green-400 transition-all duration-200 min-h-[140px] md:min-h-[180px]">
                        <img src="/services/bike.jpg" alt="TVS Jupiter / Wego" className="w-40 h-32 md:w-48 md:h-36 object-cover rounded-lg shadow" />
                        <div className="flex flex-col justify-center">
                          <h3 className="font-semibold text-lg">TVS Jupiter / Wego</h3>
                          <p className="text-sm text-muted-foreground">Reliable, light scooters</p>
                          <div className="text-green-700 font-bold mt-1">💰 ₹700–1,000/day</div>
                          <div className="text-xs mt-1">🔗 Zaildar Ladakh Trip, Mototour Ladakh</div>
                        </div>
                      </div>
                    </div>
                    {/* Rental Tips */}
                    <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-lg mt-6">
                      <h4 className="font-semibold text-blue-700 mb-2">📝 Rental Tips:</h4>
                      <ul className="list-disc list-inside text-sm text-blue-900 space-y-1">
                        <li>Always go with Leh-registered bikes — outside bikes are restricted in Nubra, Pangong, etc.</li>
                        <li>Check for helmet, luggage carrier, and backup support before renting.</li>
                        <li>Rentals generally include unlimited km, but some may limit daily usage to 150–200 km.</li>
                        <li>Carry valid ID + driving license (International DL if you're a foreign national).</li>
                        <li>Use Google Maps offline and carry extra fuel for Nubra–Pangong route.</li>
                      </ul>
                    </div>
                  </div>
                )}
                {category === 'cars' && (
                  <div className="mb-8">
                    {/* Vehicle Class Legend */}
                    <div className="mb-6">
                      <h3 className="text-xl font-bold text-blue-700 mb-2">🚖 Vehicle Class Legend</h3>
                      <table className="min-w-full border rounded bg-white text-sm mb-2">
                        <thead className="bg-blue-100">
                          <tr>
                            <th className="py-2 px-4 text-left">Class</th>
                            <th className="py-2 px-4 text-left">Vehicle Type</th>
                            <th className="py-2 px-4 text-left">Seating Capacity</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr><td className="py-2 px-4">A+</td><td className="py-2 px-4">Innova Crysta</td><td className="py-2 px-4">6–7</td></tr>
                          <tr><td className="py-2 px-4">A</td><td className="py-2 px-4">Innova / XUV / Aria</td><td className="py-2 px-4">6–7</td></tr>
                          <tr><td className="py-2 px-4">B</td><td className="py-2 px-4">Scorpio / Tavera / Ertiga</td><td className="py-2 px-4">6–7</td></tr>
                          <tr><td className="py-2 px-4">C</td><td className="py-2 px-4">Sumo / Eeco</td><td className="py-2 px-4">6–7</td></tr>
                          <tr><td className="py-2 px-4">TT</td><td className="py-2 px-4">Tempo Traveller (Deluxe / Non AC)</td><td className="py-2 px-4">12–13</td></tr>
                        </tbody>
                      </table>
                    </div>
                    {/* Taxi Union Fixed Rates Section */}
                    <div className="mb-6">
                      <h3 className="text-xl font-bold text-blue-700 mb-2">🚗 Taxi Union Fixed Rates (Round Trip / Return to Leh)</h3>
                      <div className="space-y-4">
                        <div>
                          <span className="font-semibold">🏔️ 1. Leh to Nubra Valley (2 days)</span>
                          <table className="min-w-full border rounded bg-white text-sm mt-1 mb-2">
                            <thead className="bg-blue-50">
                              <tr><th className="py-1 px-2">Vehicle Type</th><th className="py-1 px-2">Price</th></tr>
                            </thead>
                            <tbody>
                              <tr><td className="py-1 px-2">A+ (Crysta)</td><td className="py-1 px-2">₹11,807</td></tr>
                              <tr><td className="py-1 px-2">A (Innova)</td><td className="py-1 px-2">₹11,807</td></tr>
                              <tr><td className="py-1 px-2">B (Scorpio)</td><td className="py-1 px-2">₹10,793</td></tr>
                              <tr><td className="py-1 px-2">C (Sumo)</td><td className="py-1 px-2">₹9,725</td></tr>
                              <tr><td className="py-1 px-2">TT (Tempo Traveller)</td><td className="py-1 px-2">₹15,376</td></tr>
                            </tbody>
                          </table>
                        </div>
                        <div>
                          <span className="font-semibold">🏞️ 2. Leh to Pangong Lake (1 day)</span>
                          <table className="min-w-full border rounded bg-white text-sm mt-1 mb-2">
                            <thead className="bg-blue-50">
                              <tr><th className="py-1 px-2">Vehicle Type</th><th className="py-1 px-2">Price</th></tr>
                            </thead>
                            <tbody>
                              <tr><td className="py-1 px-2">A+ (Crysta)</td><td className="py-1 px-2">₹10,636</td></tr>
                              <tr><td className="py-1 px-2">A (Innova)</td><td className="py-1 px-2">₹10,636</td></tr>
                              <tr><td className="py-1 px-2">B (Scorpio)</td><td className="py-1 px-2">₹9,725</td></tr>
                              <tr><td className="py-1 px-2">C (Sumo)</td><td className="py-1 px-2">₹8,808</td></tr>
                              <tr><td className="py-1 px-2">TT (Tempo Traveller)</td><td className="py-1 px-2">₹13,087</td></tr>
                            </tbody>
                          </table>
                        </div>
                        <div>
                          <span className="font-semibold">⛰️ 3. Leh → Sham Valley (Hall of Fame, Magnetic Hill, Sangam, Alchi)</span>
                          <table className="min-w-full border rounded bg-white text-sm mt-1 mb-2">
                            <thead className="bg-blue-50">
                              <tr><th className="py-1 px-2">Vehicle Type</th><th className="py-1 px-2">Price</th></tr>
                            </thead>
                            <tbody>
                              <tr><td className="py-1 px-2">A+ (Crysta)</td><td className="py-1 px-2">₹6,827</td></tr>
                              <tr><td className="py-1 px-2">A (Innova)</td><td className="py-1 px-2">₹6,206</td></tr>
                              <tr><td className="py-1 px-2">B (Scorpio)</td><td className="py-1 px-2">₹5,393</td></tr>
                              <tr><td className="py-1 px-2">C (Sumo)</td><td className="py-1 px-2">₹5,346</td></tr>
                              <tr><td className="py-1 px-2">TT (Tempo Traveller)</td><td className="py-1 px-2">₹8,225</td></tr>
                            </tbody>
                          </table>
                        </div>
                        <div>
                          <span className="font-semibold">🌄 4. Leh Local Sightseeing (Palace, Shanti Stupa, Thiksey, Hemis)</span>
                          <table className="min-w-full border rounded bg-white text-sm mt-1 mb-2">
                            <thead className="bg-blue-50">
                              <tr><th className="py-1 px-2">Vehicle Type</th><th className="py-1 px-2">Price</th></tr>
                            </thead>
                            <tbody>
                              <tr><td className="py-1 px-2">A+ (Crysta)</td><td className="py-1 px-2">₹3,098</td></tr>
                              <tr><td className="py-1 px-2">A (Innova)</td><td className="py-1 px-2">₹3,098</td></tr>
                              <tr><td className="py-1 px-2">B (Scorpio)</td><td className="py-1 px-2">₹3,823</td></tr>
                              <tr><td className="py-1 px-2">C (Sumo)</td><td className="py-1 px-2">₹3,823</td></tr>
                              <tr><td className="py-1 px-2">TT (Tempo Traveller)</td><td className="py-1 px-2">₹5,400</td></tr>
                            </tbody>
                          </table>
                        </div>
                        <div>
                          <span className="font-semibold">🛣️ 5. 3-Day Circuit: Leh → Nubra → Pangong → Leh (via Shyok)</span>
                          <table className="min-w-full border rounded bg-white text-sm mt-1 mb-2">
                            <thead className="bg-blue-50">
                              <tr><th className="py-1 px-2">Vehicle Type</th><th className="py-1 px-2">Price</th></tr>
                            </thead>
                            <tbody>
                              <tr><td className="py-1 px-2">A+ (Crysta)</td><td className="py-1 px-2">₹22,410</td></tr>
                              <tr><td className="py-1 px-2">A (Innova)</td><td className="py-1 px-2">₹22,410</td></tr>
                              <tr><td className="py-1 px-2">B (Scorpio)</td><td className="py-1 px-2">₹20,368</td></tr>
                              <tr><td className="py-1 px-2">C (Sumo)</td><td className="py-1 px-2">₹18,442</td></tr>
                              <tr><td className="py-1 px-2">TT (Tempo Traveller)</td><td className="py-1 px-2">₹29,529</td></tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                      {/* Summary Table */}
                      <div className="overflow-x-auto mt-6">
                        <table className="min-w-full border rounded-lg bg-white text-sm">
                          <thead className="bg-blue-100">
                            <tr>
                              <th className="py-2 px-4 text-left">Route</th>
                              <th className="py-2 px-4 text-left">Crysta (A+)</th>
                              <th className="py-2 px-4 text-left">Innova (A)</th>
                              <th className="py-2 px-4 text-left">Scorpio (B)</th>
                              <th className="py-2 px-4 text-left">Sumo (C)</th>
                              <th className="py-2 px-4 text-left">Tempo Traveller (TT)</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr><td className="py-2 px-4">Leh → Nubra (2 days)</td><td className="py-2 px-4">₹11,807</td><td className="py-2 px-4">₹11,807</td><td className="py-2 px-4">₹10,793</td><td className="py-2 px-4">₹9,725</td><td className="py-2 px-4">₹15,376</td></tr>
                            <tr><td className="py-2 px-4">Leh → Pangong (1 day)</td><td className="py-2 px-4">₹10,636</td><td className="py-2 px-4">₹10,636</td><td className="py-2 px-4">₹9,725</td><td className="py-2 px-4">₹8,808</td><td className="py-2 px-4">₹13,087</td></tr>
                            <tr><td className="py-2 px-4">Leh → Sham Valley (Alchi etc.)</td><td className="py-2 px-4">₹6,827</td><td className="py-2 px-4">₹6,206</td><td className="py-2 px-4">₹5,393</td><td className="py-2 px-4">₹5,346</td><td className="py-2 px-4">₹8,225</td></tr>
                            <tr><td className="py-2 px-4">Leh Local (Hemis, Stupa etc.)</td><td className="py-2 px-4">₹3,098</td><td className="py-2 px-4">₹3,098</td><td className="py-2 px-4">₹3,823</td><td className="py-2 px-4">₹3,823</td><td className="py-2 px-4">₹5,400</td></tr>
                            <tr><td className="py-2 px-4">Nubra → Pangong → Leh (3d)</td><td className="py-2 px-4">₹22,410</td><td className="py-2 px-4">₹22,410</td><td className="py-2 px-4">₹20,368</td><td className="py-2 px-4">₹18,442</td><td className="py-2 px-4">₹29,529</td></tr>
                          </tbody>
                        </table>
                      </div>
                      {/* Important Notes */}
                      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-lg mt-6">
                        <h4 className="font-semibold text-yellow-700 mb-2">✅ Important Notes:</h4>
                        <ul className="list-disc list-inside text-sm text-yellow-900 space-y-1">
                          <li>🚫 Only Ladakh Taxi Union vehicles (Leh number) are allowed beyond Leh into Nubra, Pangong, Tso Moriri.</li>
                          <li>🧾 Prices are fixed by the Ladakh Taxi Union, though some negotiation may be possible for multi-day hires.</li>
                          <li>🔄 Prices are round-trip unless otherwise mentioned.</li>
                          <li>🧳 Tempo Travellers are best for large groups (8–13 people) and include driver + luggage space.</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
                  {filteredServices
                    .filter(service => category === 'all' || service.category === category)
                    .map((service, index) => (
                      <Card key={service.id} className="overflow-hidden hover:shadow-lg transition-shadow h-full flex flex-col">
                        <div className="relative h-40 sm:h-48">
                          <Image
                            src={service.image}
                            alt={service.title}
                            fill
                            className="object-cover"
                            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                            priority={index < 6}
                          />
                        </div>
                        <CardContent className="flex-1 flex flex-col p-4">
                          <h3 className="text-lg font-semibold mb-2">{service.title}</h3>
                          <p className="text-muted-foreground text-sm mb-2 flex-1">{service.description}</p>
                          <div className="flex flex-wrap gap-2 mb-2">
                            {service.features.map((feature, i) => (
                              <Badge key={i} variant="secondary">{feature}</Badge>
                            ))}
                          </div>
                          <div className="flex items-center justify-between mt-auto">
                            <span className="text-primary font-bold text-lg">₹{service.price}</span>
                            <Button size="sm">Book Now</Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* Tour Packages Section */}
      <TourPackages />
    </div>
  )
} 