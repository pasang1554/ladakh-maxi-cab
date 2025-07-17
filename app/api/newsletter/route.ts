import { NextResponse } from "next/server"
import { PrismaClient, Prisma } from "@prisma/client"
import { sendNewsletterConfirmation } from "@/lib/email"

const prisma = new PrismaClient()

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email } = body

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

    return NextResponse.json(subscription, { status: 201 })
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
      return NextResponse.json(
        { error: "Email already subscribed" },
        { status: 400 }
      )
    }
    console.error("Newsletter subscription error:", error)
    return NextResponse.json(
      { message: "Error subscribing to newsletter" },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const subscribers = await prisma.newsletter.findMany({
      orderBy: {
        createdAt: "desc",
      },
    })

    return NextResponse.json(subscribers)
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching subscribers" },
      { status: 500 }
    )
  }
} 