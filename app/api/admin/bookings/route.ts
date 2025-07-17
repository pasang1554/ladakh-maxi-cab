import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

// Log environment variable for debugging (do not do this in production)
console.log('DATABASE_URL:', process.env.DATABASE_URL);

let prisma: PrismaClient;
try {
  prisma = new PrismaClient();
} catch (err) {
  console.error('Failed to instantiate PrismaClient:', err);
  throw err;
}

export async function GET(request: NextRequest) {
  try {
    // In a real app, you would check admin authentication here
    // For now, we'll allow access to view all bookings
    const bookings = await prisma.booking.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        user: {
          select: {
            name: true,
            email: true,
            phone: true,
          },
        },
      },
    });
    return NextResponse.json(bookings);
  } catch (error: any) {
    console.error('Admin fetch bookings error:', error);
    // Log error stack for more details
    if (error && error.stack) {
      console.error('Error stack:', error.stack);
    }
    return NextResponse.json(
      { error: error?.message || "Error fetching bookings" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { bookingId, status, paymentStatus } = body;
    const booking = await prisma.booking.update({
      where: { id: bookingId },
      data: {
        status: status || undefined,
        paymentStatus: paymentStatus || undefined,
      },
      include: {
        user: {
          select: {
            name: true,
            email: true,
            phone: true,
          },
        },
      },
    });
    return NextResponse.json(booking);
  } catch (error: any) {
    console.error('Admin update booking error:', error);
    if (error && error.stack) {
      console.error('Error stack:', error.stack);
    }
    return NextResponse.json(
      { error: error?.message || "Error updating booking" },
      { status: 500 }
    );
  }
} 