'use client'
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { FaCar, FaMotorcycle, FaHome, FaUtensils, FaHiking, FaMapMarkedAlt, FaStar, FaUserFriends, FaCheckCircle, FaHeadset } from 'react-icons/fa';
import Link from "next/link";
import { useState } from "react";

const topDestinations = [
  "Monastery",
  "Pangong Lake",
  "Nubra Valley",
  "Sham Valley",
  "Tso Moriri",
  "Khardungla Pass",
];

const stats = [
  { label: "Happy Customers", value: "1,200+" },
  { label: "Years of Experience", value: "10+" },
  { label: "Satisfaction", value: "100%" },
];

const carModels = [
  "Toyota Innova",
  "Toyota Innova Crysta",
  "Tata Aria",
  "Mahindra Xylo",
  "Scorpio",
  "Mahindra XUV",
  "Maruti EECO",
  "Force Tempo Traveler",
  "Omni Van 4 Seater",
];

const services = [
  {
    title: "Car Rental",
    images: [
      "/services/car.jpg"
    ],
    description: "Comfortable and reliable cars for exploring Ladakh's beautiful landscapes.",
    models: carModels,
  },
  {
    title: "Bike Rental",
    images: [
      "/services/bike.jpg"
    ],
    description: "Premium bikes for adventure seekers who want to experience Ladakh on two wheels."
  },
  {
    title: "Homestay",
    images: [
      "/services/homestay.jpg"
    ],
    description: "Stay with local families and experience authentic Ladakhi hospitality."
  },
  {
    title: "Local Food",
    images: [
      "/services/food.jpg"
    ],
    description: "Taste the unique flavors of Ladakh with our curated local food experiences."
  },
  {
    title: "Tours",
    images: [
      "/services/tours.jpg"
    ],
    description: "Guided tours to the most breathtaking and culturally rich spots in Ladakh."
  },
  {
    title: "Adventure",
    images: [
      "/services/adventure.jpg"
    ],
    description: "Thrilling adventure activities including trekking, rafting, and more."
  },
  {
    title: "Trekking",
    images: [
      "/services/treeking.jpg"
    ],
    description: "Join our trekking expeditions to explore Ladakh's stunning trails and valleys."
  },
];

export default function ServicesPage() {
  const [theme, setTheme] = useState('light');
  const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light');

  const serviceIcons = {
    'Car Rental': <FaCar className="text-primary text-2xl mb-2" />,
    'Bike Rental': <FaMotorcycle className="text-primary text-2xl mb-2" />,
    'Homestay': <FaHome className="text-primary text-2xl mb-2" />,
    'Local Food': <FaUtensils className="text-primary text-2xl mb-2" />,
    'Tours': <FaMapMarkedAlt className="text-primary text-2xl mb-2" />,
    'Adventure': <FaHiking className="text-primary text-2xl mb-2" />,
    'Trekking': <FaHiking className="text-primary text-2xl mb-2" />,
  };

  return (
    <div className={theme === 'dark' ? 'dark bg-gradient-to-b from-gray-900 via-gray-800 to-gray-700 text-white' : 'bg-gradient-to-b from-blue-50 via-white to-yellow-50'}>
      <div className="min-h-screen bg-muted/50 dark:bg-gray-900 py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-10 text-primary dark:text-yellow-300">Our Services</h1>

          {/* Top Destinations Section */}
          <section className="mb-10 animate-fade-in-up">
            <h2 className="text-2xl md:text-3xl font-semibold text-center mb-6 text-primary dark:text-yellow-300">Top Destinations</h2>
            <div className="flex flex-wrap justify-center gap-4">
              {topDestinations.map((dest, idx) => (
                <Badge key={idx} className="text-base font-medium px-4 py-2 shadow-sm cursor-default bg-gradient-to-r from-primary/10 to-yellow-100 dark:from-yellow-900 dark:to-gray-800 text-primary dark:text-yellow-200">
                  {dest}
                </Badge>
              ))}
            </div>
          </section>

          {/* Stats Section */}
          <section className="mb-12 animate-fade-in-up">
            <div className="flex flex-wrap justify-center gap-8">
              {stats.map((stat, idx) => (
                <div
                  key={idx}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 flex flex-col items-center min-w-[180px] border border-primary/10 hover:shadow-xl transition"
                >
                  <span className="text-2xl md:text-3xl font-bold text-primary dark:text-yellow-300 mb-1">{stat.value}</span>
                  <span className="text-base text-muted-foreground dark:text-gray-300 font-medium">{stat.label}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Services Grid */}
          <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 animate-fade-in-up">
            {services.map((service, idx) => (
              <div key={idx} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden flex flex-col hover:scale-105 hover:shadow-2xl transition-transform border border-primary/10">
                <div className="flex flex-col items-center bg-gradient-to-br from-blue-50 to-yellow-50 dark:from-gray-800 dark:to-yellow-900 p-4">
                  {serviceIcons[service.title]}
                  <div className="flex gap-2 justify-center">
                    {service.images.map((img, i) => (
                      <div key={i} className="relative w-20 h-20 sm:w-24 sm:h-24 rounded overflow-hidden border border-gray-200 dark:border-gray-700">
                        <Image
                          src={img}
                          alt={service.title + ' image ' + (i+1)}
                          layout="fill"
                          objectFit="cover"
                          className="w-full h-full"
                          priority={idx === 0 && i === 0}
                        />
                      </div>
                    ))}
                  </div>
                </div>
                <div className="p-4 flex-1 flex flex-col">
                  <h2 className="text-lg font-bold mb-1 text-primary dark:text-yellow-200">{service.title}</h2>
                  <p className="text-muted-foreground dark:text-gray-300 mb-2 flex-1 text-sm">{service.description}</p>
                  {service.models && (
                    <ul className="list-disc list-inside text-xs text-gray-700 dark:text-gray-200 mt-2">
                      {service.models.map((model, i) => (
                        <li key={i}>{model}</li>
                      ))}
                    </ul>
                  )}
                  <Button variant="outline" className="mt-4 self-start">Book {service.title}</Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Contact Us Section */}
      <section className="bg-gradient-to-br from-yellow-50 to-blue-50 dark:from-gray-800 dark:to-yellow-900 py-12 mt-16 border-t rounded-xl shadow-inner animate-fade-in-up">
        <div className="container mx-auto px-4 max-w-2xl">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center text-primary dark:text-yellow-300">Contact Us</h2>
          <Card className="mb-8 bg-white dark:bg-gray-800">
            <CardContent className="py-6 text-center">
              <div className="mb-2 font-semibold text-primary dark:text-yellow-200">Ladakh Cabs</div>
              <div className="mb-2">Email: <a href="mailto:connect@ladakhcabs.in" className="text-primary dark:text-yellow-200 hover:underline">connect@ladakhcabs.in</a></div>
              <div className="mb-2 text-muted-foreground dark:text-gray-300">Address: Skalzangling, Airport Road, Leh – Ladakh</div>
              <div className="mb-2">Call: <a href="tel:+917051282979" className="text-primary dark:text-yellow-200 hover:underline">+91 – 7051282979</a>, <a href="tel:9419539184" className="text-primary dark:text-yellow-200 hover:underline">9419539184</a></div>
            </CardContent>
          </Card>
          <Card className="bg-white dark:bg-gray-800">
            <CardContent className="py-6">
              <form className="flex flex-col gap-4">
                <div className="flex gap-4 flex-col sm:flex-row">
                  <div className="flex-1">
                    <Label className="mb-1 text-primary dark:text-yellow-200">First Name</Label>
                    <Input type="text" placeholder="First Name" className="dark:bg-gray-900 dark:text-white" />
                  </div>
                  <div className="flex-1">
                    <Label className="mb-1 text-primary dark:text-yellow-200">Last Name</Label>
                    <Input type="text" placeholder="Last Name" className="dark:bg-gray-900 dark:text-white" />
                  </div>
                </div>
                <div>
                  <Label className="mb-1 text-primary dark:text-yellow-200">Email Address</Label>
                  <Input type="email" placeholder="Email Address" className="dark:bg-gray-900 dark:text-white" />
                </div>
                <div>
                  <Label className="mb-1 text-primary dark:text-yellow-200">Subject</Label>
                  <Input type="text" placeholder="Subject" className="dark:bg-gray-900 dark:text-white" />
                </div>
                <div>
                  <Label className="mb-1 text-primary dark:text-yellow-200">Your Message</Label>
                  <Textarea rows={4} placeholder="Your Message" className="dark:bg-gray-900 dark:text-white" />
                </div>
                <Button type="submit" className="w-full mt-2">Send Message</Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>
      {/* FAQ Section */}
      <section className="bg-muted/50 dark:bg-gray-900 py-12 border-t mt-8 rounded-xl shadow-inner animate-fade-in-up">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center text-primary dark:text-yellow-300">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <Card className="bg-white dark:bg-gray-800">
              <CardContent className="p-6 flex items-start gap-3">
                <FaCheckCircle className="text-primary dark:text-yellow-200 text-xl mt-1" />
                <div>
                  <div className="font-semibold mb-2 text-primary dark:text-yellow-200">Are Ladakh Cabs Truly Genuine?</div>
                  <div className="text-muted-foreground dark:text-gray-300">Yes, Ladakh Cabs is a trusted and established service provider in Leh-Ladakh, known for reliability and customer satisfaction.</div>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-white dark:bg-gray-800">
              <CardContent className="p-6 flex items-start gap-3">
                <FaUserFriends className="text-primary dark:text-yellow-200 text-xl mt-1" />
                <div>
                  <div className="font-semibold mb-2 text-primary dark:text-yellow-200">Do we provide customer service before, during, and after the tour?</div>
                  <div className="text-muted-foreground dark:text-gray-300">Absolutely! Our team is available to assist you at every stage of your journey for a seamless experience.</div>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-white dark:bg-gray-800">
              <CardContent className="p-6 flex items-start gap-3">
                <FaCar className="text-primary dark:text-yellow-200 text-xl mt-1" />
                <div>
                  <div className="font-semibold mb-2 text-primary dark:text-yellow-200">Do we have qualified drivers and high-quality vehicles?</div>
                  <div className="text-muted-foreground dark:text-gray-300">Yes, all our drivers are experienced and our vehicles are well-maintained for your safety and comfort.</div>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-white dark:bg-gray-800">
              <CardContent className="p-6 flex items-start gap-3">
                <FaStar className="text-yellow-500 text-xl mt-1" />
                <div>
                  <div className="font-semibold mb-2 text-primary dark:text-yellow-200">Do you accept online or cash payments?</div>
                  <div className="text-muted-foreground dark:text-gray-300">We accept both online and cash payments for your convenience.</div>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-white dark:bg-gray-800">
              <CardContent className="p-6 flex items-start gap-3">
                <FaMapMarkedAlt className="text-green-500 text-xl mt-1" />
                <div>
                  <div className="font-semibold mb-2 text-primary dark:text-yellow-200">Will we assist with the paperwork for Leh-Ladakh?</div>
                  <div className="text-muted-foreground dark:text-gray-300">Yes, we help you with all necessary permits and paperwork required for your trip.</div>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-white dark:bg-gray-800">
              <CardContent className="p-6 flex items-start gap-3">
                <FaHeadset className="text-primary dark:text-yellow-200 text-xl mt-1" />
                <div>
                  <div className="font-semibold mb-2 text-primary dark:text-yellow-200">How we can book any services and contact you for details?</div>
                  <div className="text-muted-foreground dark:text-gray-300">You can book our services or contact us directly through the form above, by phone, or by email. We’re here to help!</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
} 