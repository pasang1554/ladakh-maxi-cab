import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import jwt from 'jsonwebtoken';
import { z } from 'zod';
import { sendBookingConfirmationEmail } from '../../../lib/email';

const prisma = new PrismaClient();

const bookingSchema = z.object({
  serviceId: z.string().min(1, 'Service ID is required'),
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone number must be at least 10 characters'),
  date: z.string().min(1, 'Date is required'),
  endDate: z.string().optional(),
  message: z.string().optional(),
});

// Helper function to get user from token
async function getUserFromToken(request: NextRequest) {
  const token = request.cookies.get('auth-token')?.value;
  
  if (!token) {
    return null;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key') as any;
    return decoded;
  } catch (error) {
    return null;
  }
}

export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const user = await getUserFromToken(request);
    if (!user) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const validatedData = bookingSchema.parse(body);

    // Calculate total amount based on service price and duration
    const service = await prisma.service.findUnique({
      where: { id: validatedData.serviceId },
    });

    if (!service) {
      return NextResponse.json(
        { error: "Service not found" },
        { status: 404 }
      );
    }

    if (!service.isAvailable) {
      return NextResponse.json(
        { error: "Service is not available" },
        { status: 400 }
      );
    }

    // Calculate duration and total amount
    const startDate = new Date(validatedData.date);
    const endDate = validatedData.endDate ? new Date(validatedData.endDate) : startDate;
    const days = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)) + 1;
    const totalAmount = service.price * days;

    const booking = await prisma.booking.create({
      data: {
        serviceId: validatedData.serviceId,
        userId: user.userId,
        name: validatedData.name,
        email: validatedData.email,
        phone: validatedData.phone,
        date: startDate,
        endDate: endDate,
        message: validatedData.message,
        totalAmount,
        status: "pending",
        paymentStatus: "pending",
      },
      include: {
        service: true,
      },
    });

    // Send booking confirmation email to the user
    await sendBookingConfirmationEmail({
      to: booking.email,
      name: booking.name,
      serviceName: booking.service.name,
      date: booking.date,
      endDate: booking.endDate,
      totalAmount: booking.totalAmount,
    });

    return NextResponse.json(booking, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation error', details: error.errors },
        { status: 400 }
      );
    }

    console.error('Booking error:', error);
    return NextResponse.json(
      { error: "Error creating booking" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    // Check authentication
    const user = await getUserFromToken(request);
    if (!user) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    let bookings;
    if (user.role === 'admin') {
      // Admin: return all bookings
      bookings = await prisma.booking.findMany({
        orderBy: { date: "desc" },
        include: { service: true, user: { select: { name: true, email: true, phone: true } } },
      });
    } else {
      // Regular user: return only their bookings
      bookings = await prisma.booking.findMany({
        where: { userId: user.userId },
        orderBy: { date: "desc" },
        include: { service: true },
      });
    }

    return NextResponse.json(bookings);
  } catch (error) {
    console.error('Fetch bookings error:', error);
    return NextResponse.json(
      { error: "Error fetching bookings" },
      { status: 500 }
    );
  }
} 