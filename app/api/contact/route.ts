import { NextResponse } from "next/server"
import { z } from "zod"
import { prisma } from "@/lib/db"
import { sendContactEmail } from "@/lib/email"

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  message: z.string().min(10, "Message must be at least 10 characters"),
})

export async function GET() {
  try {
    const messages = await prisma.contact.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    })
    return NextResponse.json(messages)
  } catch (error) {
    console.error('Failed to fetch messages:', error)
    return NextResponse.json(
      { error: 'Failed to fetch messages' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    // Parse the request body
    const body = await request.json()
    
    // Validate the data
    const validatedData = contactSchema.parse(body)
    
    // Save to database
    const savedMessage = await prisma.contact.create({
      data: validatedData
    })

    // Send email notification
    try {
      await sendContactEmail({
        name: validatedData.name,
        email: validatedData.email,
        phone: validatedData.phone,
        message: validatedData.message
      })
    } catch (error) {
      console.error('Failed to send email:', error)
      // Continue execution even if email fails
    }

    // Return success response
    return NextResponse.json({
      success: true,
      message: "Thank you for your message. We'll get back to you soon!",
      data: savedMessage
    }, { status: 201 })

  } catch (error) {
    // Handle validation errors
    if (error instanceof z.ZodError) {
      return NextResponse.json({
        success: false,
        message: "Validation failed",
        errors: error.errors
      }, { status: 400 })
    }

    // Handle other errors
    console.error('Contact form error:', error)
    return NextResponse.json({
      success: false,
      message: "Something went wrong. Please try again later."
    }, { status: 500 })
  }
} 