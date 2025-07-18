import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { sendBookingEmail } from "@/lib/email";

const bookingSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  package: z.string().min(1, "Package name is required"),
  message: z.string().optional(),
});

// A server-side map to prevent price tampering from the client
const packagePrices: { [key: string]: number } = {
  'Silver Package': 20000,
  'Gold Package': 35000,
  'Diamond Package': 38000,
};

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validation = bookingSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json({ error: "Invalid input", issues: validation.error.flatten() }, { status: 400 });
    }

    const { name, email, phone, package: packageName, message } = validation.data;

    const totalAmount = packagePrices[packageName];
    if (totalAmount === undefined) {
      return NextResponse.json({ error: "Invalid package selected" }, { status: 400 });
    }

    // Save the booking to the database
    const booking = await prisma.booking.create({
      data: {
        name, email, phone,
        serviceId: packageName,
        message: message || "",
        date: new Date(), // NOTE: The form is missing a date field. Using today's date as a placeholder.
        status: 'PENDING',
        paymentStatus: 'PENDING',
        totalAmount,
      },
    });

    // Send email notification to the admin
    await sendBookingEmail({ name, email, phone, packageName, message });

    return NextResponse.json({ message: "Booking request sent successfully!", bookingId: booking.id }, { status: 201 });

  } catch (error) {
    console.error('Tour booking error:', error);
    return NextResponse.json({ error: "An internal server error occurred." }, { status: 500 });
  }
}