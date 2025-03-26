'use client'

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { format } from "date-fns"
import { useEffect, useState } from "react"
import { toast } from "sonner"
import { Trash2 } from "lucide-react"

type Message = {
  id: string
  name: string
  email: string
  phone: string
  message: string
  createdAt: string
}

export default function ContactMessagesPage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    // Simple authentication check
    const isAdmin = localStorage.getItem('isAdmin')
    if (!isAdmin) {
      const password = prompt('Please enter admin password:')
      if (password === 'ladakh123') {
        localStorage.setItem('isAdmin', 'true')
        setIsAuthenticated(true)
        fetchMessages()
      } else {
        setError('Authentication failed')
      }
    } else {
      setIsAuthenticated(true)
      fetchMessages()
    }
  }, [])

  async function fetchMessages() {
    try {
      const response = await fetch('/api/contact')
      if (!response.ok) {
        throw new Error('Failed to fetch messages')
      }
      const data = await response.json()
      setMessages(data)
    } catch (err) {
      setError('Failed to load messages. Please try again later.')
      toast.error('Failed to load messages')
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    try {
      setDeletingId(id)
      const response = await fetch(`/api/contact/${id}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        throw new Error('Failed to delete message')
      }

      toast.success('Message deleted successfully')
      setMessages(messages.filter(msg => msg.id !== id))
    } catch (error) {
      toast.error('Failed to delete message')
    } finally {
      setDeletingId(null)
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen py-12">
        <div className="container mx-auto px-4">
          <Card>
            <CardContent className="p-6 text-center">
              <p className="text-destructive">{error || 'Please authenticate to view messages.'}</p>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="min-h-screen py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-8">Contact Messages</h1>
          <div className="grid gap-6">
            {[1, 2, 3].map((i) => (
              <Card key={i}>
                <CardContent className="p-6">
                  <div className="animate-pulse">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <div className="h-6 w-32 bg-muted-foreground/20 rounded mb-2" />
                        <div className="h-4 w-48 bg-muted-foreground/20 rounded mb-1" />
                        <div className="h-4 w-36 bg-muted-foreground/20 rounded" />
                      </div>
                      <div className="h-4 w-32 bg-muted-foreground/20 rounded" />
                    </div>
                    <div className="h-16 w-full bg-muted-foreground/20 rounded" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-8">Contact Messages</h1>
          <Card>
            <CardContent className="p-6 text-center">
              <p className="text-destructive">{error}</p>
              <Button
                onClick={() => {
                  setError(null)
                  setIsLoading(true)
                  fetchMessages()
                }}
                className="mt-4"
              >
                Try Again
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Contact Messages</h1>
          <Button
            onClick={() => {
              setIsLoading(true)
              fetchMessages()
            }}
          >
            Refresh
          </Button>
        </div>
        
        {messages.length === 0 ? (
          <Card>
            <CardContent className="p-6 text-center">
              <p className="text-muted-foreground">No messages yet.</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6">
            {messages.map((message) => (
              <Card key={message.id}>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-semibold text-lg">{message.name}</h3>
                      <p className="text-sm text-muted-foreground">{message.email}</p>
                      <p className="text-sm text-muted-foreground">{message.phone}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <p className="text-sm text-muted-foreground">
                        {format(new Date(message.createdAt), 'MMM d, yyyy h:mm a')}
                      </p>
                      <Button
                        variant="destructive"
                        size="icon"
                        onClick={() => handleDelete(message.id)}
                        disabled={deletingId === message.id}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <p className="whitespace-pre-wrap">{message.message}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
} 