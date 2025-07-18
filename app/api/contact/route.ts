import { NextResponse } from "next/server"
import { z } from "zod"
import { prisma } from "@/lib/prisma"
import { sendContactEmail } from "@/lib/email"

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  message: z.string().min(10, "Message must be at least 10 characters"),
})

export async function GET() {
  try {
    const contacts = await prisma.contact.findMany({
      orderBy: {
        createdAt: "desc"
      }
    })
    return NextResponse.json(contacts)
  } catch (error) {
    console.error('Failed to fetch contacts:', error)
    return NextResponse.json(
      { error: 'Failed to fetch contacts' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()

    const validation = contactSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json({
        error: "Invalid input", issues: validation.error.flatten()
      }, { status: 400 });
    }

    const { name, email, phone, message } = validation.data;
    const contact = await prisma.contact.create({
      data: {
        name,
        email,
        phone,
        message,
      },
    })

    // Send email notification
    try {
      await sendContactEmail({
        name,
        email,
        phone,
        message,
      })
    } catch (error) {
      console.error('Failed to send email:', error)
      // Continue execution even if email fails
    }

    return NextResponse.json(contact, { status: 201 })
  } catch (error) {
    // Handle other errors
    console.error('Contact form error:', error)
    return NextResponse.json({
      error: "Something went wrong. Please try again later."
    }, { status: 500 })
  }
} 