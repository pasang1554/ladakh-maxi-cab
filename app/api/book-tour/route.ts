import { NextRequest, NextResponse } from 'next/server';
import { sendEmail } from '@/lib/email';

export async function POST(req: NextRequest) {
  try {
    const { name, email, phone, message, package: pkg } = await req.json();
    const subject = `New Tour Booking: ${pkg}`;
    const text = `Package: ${pkg}\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\nMessage: ${message}`;
    await sendEmail({
      to: 'ladakhmaxicabs1171@gmail.com',
      subject,
      text,
    });
    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ error: 'Failed to send booking' }, { status: 500 });
  }
} 