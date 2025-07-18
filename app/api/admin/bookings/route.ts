import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { z } from "zod";
import { Prisma } from "@prisma/client";
import { getServerSession } from "next-auth/next";
// NOTE: Assuming you have your NextAuth configuration exported from a file like this.
import { authOptions } from "@/lib/auth";

// This line is crucial for Vercel deployment.
// It ensures the route is treated as dynamic and not statically generated at build time.
export const dynamic = "force-dynamic";

/**
 * Handles GET requests to fetch all bookings.
 * In a real-world application, you should protect this route to ensure only admins can access it.
 */
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // In your NextAuth callbacks, you should be adding the 'role' to the session user object.
    // @ts-ignore - Assuming session.user has a 'role' property for authorization.
    if (session.user?.role !== "admin") {
      return NextResponse.json(
        { error: "Forbidden: You do not have admin privileges." },
        { status: 403 }
      );
    }

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '10', 10);
    const search = searchParams.get('search') || '';

    const skip = (page - 1) * limit;

    const where: Prisma.BookingWhereInput = search
      ? {
          OR: [
            {
              user: {
                name: {
                  contains: search,
                },
              },
            },
            {
              user: {
                email: {
                  contains: search,
                },
              },
            },
          ],
        }
      : {};

    // Fetch a paginated list of bookings
    const bookings = await prisma.booking.findMany({
      where,
      skip: skip,
      take: limit,
      orderBy: {
        createdAt: "desc",
      },
      include: {
        user: {
          // Include related user's information for display in an admin dashboard
          select: {
            name: true,
            email: true,
            phone: true,
          },
        },
      },
    });

    // Get the total count of bookings for pagination purposes
    const totalBookings = await prisma.booking.count({ where });

    return NextResponse.json({
      bookings,
      pagination: {
        total: totalBookings,
        totalPages: Math.ceil(totalBookings / limit),
        currentPage: page,
      },
    });
  } catch (error) {
    console.error("Failed to fetch bookings:", error);
    return NextResponse.json(
      { error: "An internal server error occurred while fetching bookings." },
      { status: 500 }
    );
  }
}

// Schema for validating the update request body.
// Assumes some potential enum values for status and paymentStatus.
const updateBookingSchema = z
  .object({
    bookingId: z.string().min(1, "Booking ID is required"),
    status: z.enum(["pending", "confirmed", "cancelled", "completed"]).optional(),
    paymentStatus: z.enum(["pending", "paid", "refunded"]).optional(),
  })
  .refine((data) => data.status || data.paymentStatus, {
    message: "Either status or paymentStatus must be provided to update.",
  });

/**
 * Handles PUT requests to update a booking's status or payment status.
 * This should also be protected by admin-only authentication.
 */
export async function PUT(request: NextRequest) {
  let parsedBody;
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // @ts-ignore - Assuming session.user has a 'role' property for authorization.
    if (session.user?.role !== "admin") {
      return NextResponse.json(
        { error: "Forbidden: You do not have admin privileges." },
        { status: 403 }
      );
    }

    const body = await request.json();
    const validation = updateBookingSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { error: "Invalid input", issues: validation.error.flatten() },
        { status: 400 }
      );
    }

    parsedBody = validation.data;
    const { bookingId, status, paymentStatus } = parsedBody;

    const updatedBooking = await prisma.booking.update({
      where: { id: bookingId },
      data: {
        status,
        paymentStatus,
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
    return NextResponse.json(updatedBooking);
  } catch (error: any) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      // P2025 is the error code for "Record to update not found".
      if (error.code === "P2025") {
        return NextResponse.json(
          { error: `Booking with ID '${parsedBody?.bookingId}' not found.` },
          { status: 404 }
        );
      }
    }
    console.error("Failed to update booking:", error);
    return NextResponse.json(
      { error: "An internal server error occurred while updating the booking." },
      { status: 500 }
    );
  }
}