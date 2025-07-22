'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { toast } from 'sonner'
import { MessageCircle, Phone, Mail, MapPin, Clock, X } from 'lucide-react'
import { FaWhatsapp } from 'react-icons/fa'

export default function WhatsAppChat({ 
  phoneNumber = "+918492008932", 
  businessName = "Ladakh Tourism" 
}) {
  const [isOpen, setIsOpen] = useState(false)
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')
  const [showNumber, setShowNumber] = useState(false)

  const handleWhatsAppChat = () => {
    if (!name.trim() || !message.trim()) {
      toast.error('Please fill in your name and message')
      return
    }

    const encodedMessage = encodeURIComponent(
      `Hello! I'm ${name}. ${message}\n\nI'm interested in your Ladakh tourism services.`
    )
    
    const whatsappUrl = `https://wa.me/${phoneNumber.replace(/\D/g, '')}?text=${encodedMessage}`
    
    window.open(whatsappUrl, '_blank')
    setIsOpen(false)
    setName('')
    setMessage('')
    toast.success('Opening WhatsApp chat...')
  }

  const handleQuickChat = (quickMessage) => {
    const encodedMessage = encodeURIComponent(quickMessage)
    const whatsappUrl = `https://wa.me/${phoneNumber.replace(/\D/g, '')}?text=${encodedMessage}`
    window.open(whatsappUrl, '_blank')
    toast.success('Opening WhatsApp chat...')
  }

  return (
    <>
      {/* WhatsApp Float Button */}
      <div className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50 flex flex-col items-end">
        {showNumber && (
          <div className="mb-2 px-3 py-1 rounded shadow bg-white text-green-700 text-sm font-semibold border border-green-200 animate-fade-in flex items-center gap-2">
            <FaWhatsapp className="w-4 h-4 text-green-600" />
            Contact: {phoneNumber.replace('+91', '')}
          </div>
        )}
        <Button
          onClick={() => setIsOpen(true)}
          onMouseEnter={() => setShowNumber(true)}
          onMouseLeave={() => setShowNumber(false)}
          onFocus={() => setShowNumber(true)}
          onBlur={() => setShowNumber(false)}
          onTouchStart={() => setShowNumber(true)}
          onTouchEnd={() => setShowNumber(false)}
          className="bg-green-600 hover:bg-green-700 text-white rounded-full w-12 h-12 md:w-14 md:h-14 shadow-lg"
          size="lg"
        >
          <FaWhatsapp className="h-6 w-6 md:h-7 md:w-7" />
        </Button>
      </div>

      {/* WhatsApp Chat Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-2 md:p-4">
          <Card className="w-full max-w-sm md:max-w-md mx-auto max-h-[90vh] overflow-y-auto">
            <CardHeader className="bg-green-600 text-white">
              <div className="flex justify-between items-center">
                <CardTitle className="flex items-center gap-2 text-sm md:text-base">
                  <MessageCircle className="h-4 w-4 md:h-5 md:w-5" />
                  Chat with {businessName}
                </CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsOpen(false)}
                  className="text-white hover:bg-green-700"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-4 md:p-6">
              <div className="space-y-3 md:space-y-4">
                {/* Quick Chat Options */}
                <div>
                  <h4 className="font-semibold mb-2 md:mb-3 text-sm md:text-base">Quick Chat Options:</h4>
                  <div className="grid gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleQuickChat("Hi! I'm interested in booking a tour in Ladakh. Can you help me?")}
                      className="text-left justify-start text-xs md:text-sm h-auto p-2 md:p-3"
                    >
                       Book a Tour
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleQuickChat("Hi! I want to rent a bike/car in Ladakh. What are the options?")}
                      className="text-left justify-start text-xs md:text-sm h-auto p-2 md:p-3"
                    >
                       Rent Vehicle
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleQuickChat("Hi! I need help with accommodation in Ladakh. Any recommendations?")}
                      className="text-left justify-start text-xs md:text-sm h-auto p-2 md:p-3"
                    >
                       Accommodation
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleQuickChat("Hi! I have some questions about Ladakh travel. Can you help?")}
                      className="text-left justify-start text-xs md:text-sm h-auto p-2 md:p-3"
                    >
                       General Questions
                    </Button>
                  </div>
                </div>

                <div className="border-t pt-3 md:pt-4">
                  <h4 className="font-semibold mb-2 md:mb-3 text-sm md:text-base">Or send a custom message:</h4>
                  <div className="space-y-2 md:space-y-3">
                    <Input
                      placeholder="Your name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="text-sm"
                    />
                    <Textarea
                      placeholder="Your message..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      rows={3}
                      className="text-sm"
                    />
                    <Button
                      onClick={handleWhatsAppChat}
                      className="w-full bg-green-600 hover:bg-green-700 text-sm"
                    >
                      <MessageCircle className="h-3 w-3 md:h-4 md:w-4 mr-2" />
                      Send via WhatsApp
                    </Button>
                  </div>
                </div>

                {/* Contact Info */}
                <div className="border-t pt-3 md:pt-4">
                  <h4 className="font-semibold mb-2 md:mb-3 text-sm md:text-base">Contact Information:</h4>
                  <div className="space-y-1 md:space-y-2 text-xs md:text-sm">
                    <div className="flex items-center gap-2">
                      <Phone className="h-3 w-3 md:h-4 md:w-4 text-green-600" />
                      <span>{phoneNumber}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="h-3 w-3 md:h-4 md:w-4 text-green-600" />
                      <span>Ladakhmaxicabs1171@gmail.com</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-3 w-3 md:h-4 md:w-4 text-green-600" />
                      <span>Leh, Ladakh, India</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-3 w-3 md:h-4 md:w-4 text-green-600" />
                      <span>24/7 Available</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  )
} 