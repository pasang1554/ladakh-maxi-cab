'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { Calendar, User, Phone, Mail, CreditCard, Clock, CheckCircle, XCircle } from 'lucide-react'

interface Booking {
  id: string
  serviceId: string
  userId: string
  name: string
  email: string
  phone: string
  date: string
  endDate?: string
  message?: string
  status: string
  totalAmount: number
  paymentStatus: string
  createdAt: string
  user: {
    name: string
    email: string
    phone?: string
  }
}

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchBookings()
  }, [])

  const fetchBookings = async () => {
    try {
      const response = await fetch('/api/admin/bookings')
      if (response.ok) {
        const data = await response.json()
        setBookings(data)
      } else {
        toast.error('Failed to fetch bookings')
      }
    } catch (error) {
      toast.error('Error fetching bookings')
    } finally {
      setIsLoading(false)
    }
  }

  const updateBookingStatus = async (bookingId: string, status: string, paymentStatus?: string) => {
    try {
      const response = await fetch('/api/admin/bookings', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          bookingId,
          status,
          paymentStatus,
        }),
      })

      if (response.ok) {
        toast.success('Booking updated successfully')
        fetchBookings() // Refresh the list
      } else {
        toast.error('Failed to update booking')
      }
    } catch (error) {
      toast.error('Error updating booking')
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800'
      case 'cancelled':
        return 'bg-red-100 text-red-800'
      case 'completed':
        return 'bg-blue-100 text-blue-800'
      default:
        return 'bg-yellow-100 text-yellow-800'
    }
  }

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
        return 'bg-green-100 text-green-800'
      case 'refunded':
        return 'bg-orange-100 text-orange-800'
      default:
        return 'bg-yellow-100 text-yellow-800'
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
    }).format(amount)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-lg">Loading bookings...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Booking Management</h1>
          <p className="text-gray-600">Manage all customer bookings and track their status</p>
        </div>

        <div className="grid gap-6">
          {bookings.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <Clock className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No Bookings Yet</h3>
                <p className="text-gray-600">When customers make bookings, they will appear here.</p>
              </CardContent>
            </Card>
          ) : (
            bookings.map((booking) => (
              <Card key={booking.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <User className="h-5 w-5" />
                        {booking.name}
                      </CardTitle>
                      <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                        <span className="flex items-center gap-1">
                          <Mail className="h-4 w-4" />
                          {booking.email}
                        </span>
                        <span className="flex items-center gap-1">
                          <Phone className="h-4 w-4" />
                          {booking.phone}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-primary">
                        {formatCurrency(booking.totalAmount)}
                      </div>
                      <div className="text-sm text-gray-500">
                        Booking ID: {booking.id.slice(-8)}
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold mb-2">Booking Details</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-gray-500" />
                          <span>Start: {formatDate(booking.date)}</span>
                        </div>
                        {booking.endDate && (
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-gray-500" />
                            <span>End: {formatDate(booking.endDate)}</span>
                          </div>
                        )}
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-gray-500" />
                          <span>Created: {formatDate(booking.createdAt)}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold mb-2">Status</h4>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Badge className={getStatusColor(booking.status)}>
                            {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2">
                          <CreditCard className="h-4 w-4 text-gray-500" />
                          <Badge className={getPaymentStatusColor(booking.paymentStatus)}>
                            {booking.paymentStatus.charAt(0).toUpperCase() + booking.paymentStatus.slice(1)}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>

                  {booking.message && (
                    <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                      <h4 className="font-semibold mb-1">Message:</h4>
                      <p className="text-sm text-gray-700">{booking.message}</p>
                    </div>
                  )}

                  <div className="mt-4 flex gap-2">
                    {booking.status === 'pending' && (
                      <>
                        <Button
                          size="sm"
                          onClick={() => updateBookingStatus(booking.id, 'confirmed')}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Confirm
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => updateBookingStatus(booking.id, 'cancelled')}
                          className="border-red-300 text-red-600 hover:bg-red-50"
                        >
                          <XCircle className="h-4 w-4 mr-1" />
                          Cancel
                        </Button>
                      </>
                    )}
                    {booking.status === 'confirmed' && (
                      <Button
                        size="sm"
                        onClick={() => updateBookingStatus(booking.id, 'completed')}
                        className="bg-blue-600 hover:bg-blue-700"
                      >
                        Mark Complete
                      </Button>
                    )}
                    {booking.paymentStatus === 'pending' && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => updateBookingStatus(booking.id, booking.status, 'paid')}
                      >
                        Mark Paid
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  )
} 