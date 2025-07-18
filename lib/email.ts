import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);
// It's best to use a verified domain with Resend, but a default can be used for testing.
const fromEmail = process.env.FROM_EMAIL || 'onboarding@resend.dev';

interface ContactEmailProps {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export const sendContactEmail = async ({ name, email, phone, message }: ContactEmailProps) => {
  await resend.emails.send({
    from: `Contact Form <${fromEmail}>`,
    to: 'ladakhmaxicabs1171@gmail.com',
    subject: 'New Contact Form Submission',
    reply_to: email,
    html: `<p>New contact submission from <strong>${name}</strong> (${email}, ${phone}):</p><p>${message}</p>`,
  });
};

interface BookingEmailProps {
  name: string;
  email: string;
  phone: string;
  packageName: string;
  message?: string;
}

export const sendBookingEmail = async ({ name, email, phone, packageName, message }: BookingEmailProps) => {
  await resend.emails.send({
    from: `New Booking <${fromEmail}>`,
    to: 'ladakhmaxicabs1171@gmail.com', // Your requested email for booking notifications
    subject: `New Tour Booking: ${packageName}`,
    reply_to: email,
    html: `
      <h1>New Tour Package Booking</h1>
      <p>A new booking request has been received.</p>
      <hr />
      <h2>Booking Details:</h2>
      <p><strong>Package:</strong> ${packageName}</p>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      ${message ? `<p><strong>Message:</strong> ${message}</p>` : ''}
    `,
  });
};