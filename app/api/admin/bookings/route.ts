import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

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
  } catch (error) {
    console.error('Admin fetch bookings error:', error);
    return NextResponse.json(
      { error: "Error fetching bookings" },
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
  } catch (error) {
    console.error('Admin update booking error:', error);
    return NextResponse.json(
      { error: "Error updating booking" },
      { status: 500 }
    );
  }
} 