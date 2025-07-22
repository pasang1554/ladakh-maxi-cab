import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

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
  return (
    <div className="min-h-screen bg-muted/50 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-10">Our Services</h1>

        {/* Top Destinations Section */}
        <section className="mb-10">
          <h2 className="text-2xl md:text-3xl font-semibold text-center mb-6">Top Destinations</h2>
          <div className="flex flex-wrap justify-center gap-4">
            {topDestinations.map((dest, idx) => (
              <Badge key={idx} className="text-base font-medium px-4 py-2 shadow-sm cursor-default">
                {dest}
              </Badge>
            ))}
          </div>
        </section>

        {/* Stats Section */}
        <section className="mb-12">
          <div className="flex flex-wrap justify-center gap-8">
            {stats.map((stat, idx) => (
              <div
                key={idx}
                className="bg-white rounded-lg shadow p-6 flex flex-col items-center min-w-[180px]"
              >
                <span className="text-2xl md:text-3xl font-bold text-primary mb-1">{stat.value}</span>
                <span className="text-base text-muted-foreground font-medium">{stat.label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Services Grid */}
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, idx) => (
            <div key={idx} className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col hover:scale-105 transition-transform">
              <div className="flex gap-2 p-2 justify-center bg-gray-100">
                {service.images.map((img, i) => (
                  <div key={i} className="relative w-28 h-28 sm:w-32 sm:h-32 rounded overflow-hidden border border-gray-200">
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
              <div className="p-6 flex-1 flex flex-col">
                <h2 className="text-xl font-semibold mb-2">{service.title}</h2>
                <p className="text-muted-foreground mb-4 flex-1">{service.description}</p>
                {service.models && (
                  <ul className="list-disc list-inside text-sm text-gray-700 mt-2">
                    {service.models.map((model, i) => (
                      <li key={i}>{model}</li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    {/* Contact Us Section */}
    <section className="bg-white py-12 mt-16 border-t">
      <div className="container mx-auto px-4 max-w-2xl">
        <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">Contact Us</h2>
        <Card className="mb-8">
          <CardContent className="py-6 text-center">
            <div className="mb-2 font-semibold">Ladakh Cabs</div>
            <div className="mb-2">Email: <a href="mailto:connect@ladakhcabs.in" className="text-primary hover:underline">connect@ladakhcabs.in</a></div>
            <div className="mb-2">Address: Skalzangling, Airport Road, Leh – Ladakh</div>
            <div className="mb-2">Call: <a href="tel:+917051282979" className="text-primary hover:underline">+91 – 7051282979</a>, <a href="tel:9419539184" className="text-primary hover:underline">9419539184</a></div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="py-6">
            <form className="flex flex-col gap-4">
              <div className="flex gap-4 flex-col sm:flex-row">
                <div className="flex-1">
                  <Label className="mb-1">First Name</Label>
                  <Input type="text" placeholder="First Name" />
                </div>
                <div className="flex-1">
                  <Label className="mb-1">Last Name</Label>
                  <Input type="text" placeholder="Last Name" />
                </div>
              </div>
              <div>
                <Label className="mb-1">Email Address</Label>
                <Input type="email" placeholder="Email Address" />
              </div>
              <div>
                <Label className="mb-1">Subject</Label>
                <Input type="text" placeholder="Subject" />
              </div>
              <div>
                <Label className="mb-1">Your Message</Label>
                <Textarea rows={4} placeholder="Your Message" />
              </div>
              <Button type="submit" className="w-full mt-2">Send Message</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
    {/* FAQ Section */}
    <section className="bg-muted/50 py-12 border-t mt-8">
      <div className="container mx-auto px-4 max-w-3xl">
        <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">Frequently Asked Questions</h2>
        <div className="space-y-6">
          <Card>
            <CardContent className="p-6">
              <div className="font-semibold mb-2">Are Ladakh Cabs Truly Genuine?</div>
              <div>Yes, Ladakh Cabs is a trusted and established service provider in Leh-Ladakh, known for reliability and customer satisfaction.</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="font-semibold mb-2">Do we provide customer service before, during, and after the tour?</div>
              <div>Absolutely! Our team is available to assist you at every stage of your journey for a seamless experience.</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="font-semibold mb-2">Do we have qualified drivers and high-quality vehicles?</div>
              <div>Yes, all our drivers are experienced and our vehicles are well-maintained for your safety and comfort.</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="font-semibold mb-2">Do you accept online or cash payments?</div>
              <div>We accept both online and cash payments for your convenience.</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="font-semibold mb-2">Will we assist with the paperwork for Leh-Ladakh?</div>
              <div>Yes, we help you with all necessary permits and paperwork required for your trip.</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="font-semibold mb-2">How we can book any services and contact you for details?</div>
              <div>You can book our services or contact us directly through the form above, by phone, or by email. We’re here to help!</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
} 