import { NextResponse } from "next/server"
import { z } from "zod"
import { prisma } from "@/lib/db"
import { sendNewsletterConfirmation } from "@/lib/email"

const newsletterSchema = z.object({
  email: z.string().email("Invalid email address"),
})

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email } = newsletterSchema.parse(body)

    // Check if email already exists
    const existing = await prisma.newsletter.findUnique({
      where: { email },
    })

    if (existing) {
      return NextResponse.json(
        { message: "You are already subscribed to our newsletter" },
        { status: 400 }
      )
    }

    // Save to database
    const subscription = await prisma.newsletter.create({
      data: { email },
    })

    // Send confirmation email
    const emailResult = await sendNewsletterConfirmation(email)

    if (!emailResult.success) {
      console.error("Failed to send newsletter confirmation:", emailResult.error)
      // Don't throw error, just log it
    }

    return NextResponse.json(
      { message: "Successfully subscribed to newsletter" },
      { status: 200 }
    )
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { errors: error.errors },
        { status: 400 }
      )
    }

    console.error("Newsletter subscription error:", error)
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    )
  }
} 