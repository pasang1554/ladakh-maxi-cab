'use client'

import { FadeIn, SlideIn } from "@/components/animations"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { MapPin, Phone, Mail, Clock, MessageCircle } from "lucide-react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { toast } from "sonner"
import { FaWhatsapp } from "react-icons/fa"

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  message: z.string().min(10, "Message must be at least 10 characters"),
})

type ContactFormData = z.infer<typeof contactSchema>

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  })

  const onSubmit = async (data: ContactFormData) => {
    try {
      setIsSubmitting(true)
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (response.ok) {
        toast.success("Thank you for your message! We'll get back to you soon.")
        reset() // Clear the form
      } else {
        toast.error(result.message || "Something went wrong. Please try again.")
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again later.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="bg-muted py-12 md:py-20">
        <div className="container mx-auto px-4">
          <FadeIn>
            <h1 className="text-3xl md:text-4xl font-bold text-center mb-4">Contact Us</h1>
            <p className="text-muted-foreground text-center max-w-2xl mx-auto text-sm md:text-base">
              Get in touch with us for any questions about our services or to plan your Ladakh adventure.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
            {[
              {
                icon: MapPin,
                title: "Visit Us",
                content: "123 Main Street, Leh, Ladakh 194101, India",
              },
              {
                icon: Phone,
                title: "Call Us",
                content: "+91 8492008932",
              },
              {
                icon: Mail,
                title: "Email Us",
                content: "Ladakhmaxicabs1171@gmail.com",
              },
              {
                icon: Clock,
                title: "Working Hours",
                content: "Mon - Sat: 9:00 AM - 6:00 PM",
              },
            ].map((item, index) => (
              <SlideIn key={item.title} delay={0.1 * (index + 1)}>
                <Card>
                  <CardContent className="p-4 md:p-6 text-center">
                    <item.icon className="h-6 w-6 md:h-8 md:w-8 text-primary mx-auto mb-3 md:mb-4" />
                    <h3 className="font-semibold mb-2 text-sm md:text-base">{item.title}</h3>
                    <p className="text-xs md:text-sm text-muted-foreground">{item.content}</p>
                  </CardContent>
                </Card>
              </SlideIn>
            ))}
          </div>
        </div>
      </section>

      {/* WhatsApp Section */}
      <section className="py-12 md:py-16 bg-green-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <FadeIn>
              <div className="bg-green-600 text-white rounded-lg p-6 md:p-8 mb-6 md:mb-8">
                <FaWhatsapp className="h-12 w-12 md:h-16 md:w-16 mx-auto mb-4 text-green-500" />
                <h2 className="text-2xl md:text-3xl font-bold mb-4">Chat with Us on WhatsApp</h2>
                <p className="text-lg md:text-xl mb-4 md:mb-6">
                  Get instant responses and quick assistance for all your Ladakh travel queries!
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 mb-4 md:mb-6">
                  <div className="bg-white/10 rounded-lg p-3 md:p-4">
                    <h3 className="font-semibold mb-2 text-sm md:text-base">🏔️ Book Tours</h3>
                    <p className="text-xs md:text-sm">Get instant quotes and book your adventure</p>
                  </div>
                  <div className="bg-white/10 rounded-lg p-3 md:p-4">
                    <h3 className="font-semibold mb-2 text-sm md:text-base">🚗 Rent Vehicles</h3>
                    <p className="text-xs md:text-sm">Bikes, cars, and SUVs for your journey</p>
                  </div>
                  <div className="bg-white/10 rounded-lg p-3 md:p-4">
                    <h3 className="font-semibold mb-2 text-sm md:text-base">🏠 Accommodation</h3>
                    <p className="text-xs md:text-sm">Find the perfect place to stay</p>
                  </div>
                </div>
                <Button
                  size="lg"
                  className="bg-white text-green-600 hover:bg-gray-100 w-full sm:w-auto"
                  onClick={() => {
                    const message = encodeURIComponent("Hi! I'm interested in your Ladakh tourism services. Can you help me?")
                    window.open(`https://wa.me/918492008932?text=${message}`, '_blank')
                  }}
                >
                  <MessageCircle className="h-4 w-4 md:h-5 md:w-5 mr-2" />
                  Start WhatsApp Chat
                </Button>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-12 md:py-16 bg-muted">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <Card>
              <CardContent className="p-6 md:p-8">
                <h2 className="text-xl md:text-2xl font-bold mb-6">Send us a Message</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 md:space-y-6">
                  <div>
                    <Input
                      placeholder="Your Name"
                      {...register("name")}
                      className={errors.name ? "border-destructive" : ""}
                    />
                    {errors.name && (
                      <p className="text-destructive text-sm mt-1">{errors.name.message}</p>
                    )}
                  </div>
                  <div>
                    <Input
                      type="email"
                      placeholder="Your Email"
                      {...register("email")}
                      className={errors.email ? "border-destructive" : ""}
                    />
                    {errors.email && (
                      <p className="text-destructive text-sm mt-1">{errors.email.message}</p>
                    )}
                  </div>
                  <div>
                    <Input
                      type="tel"
                      placeholder="Your Phone"
                      {...register("phone")}
                      className={errors.phone ? "border-destructive" : ""}
                    />
                    {errors.phone && (
                      <p className="text-destructive text-sm mt-1">{errors.phone.message}</p>
                    )}
                  </div>
                  <div>
                    <Textarea
                      placeholder="Your Message"
                      {...register("message")}
                      className={errors.message ? "border-destructive" : ""}
                      rows={4}
                    />
                    {errors.message && (
                      <p className="text-destructive text-sm mt-1">{errors.message.message}</p>
                    )}
                  </div>
                  <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="h-[300px] md:h-[400px] rounded-lg overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d26086.465939878766!2d77.57231673955077!3d34.16561999999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38fdeb21445fed85%3A0xd1bb09975086f710!2sLeh!5e0!3m2!1sen!2sin!4v1638859988000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
            />
          </div>
        </div>
      </section>
    </div>
  )
} 