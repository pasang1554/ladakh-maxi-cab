import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);
const fromEmail = process.env.FROM_EMAIL || 'onboarding@resend.dev';

export const sendContactEmail = async ({ name, email, phone, message }) => {
  await resend.emails.send({
    from: `Contact Form <${fromEmail}>`,
    to: 'ladakhmaxicabs1171@gmail.com',
    subject: 'New Contact Form Submission',
    replyTo: email,
    html: `<p>New contact submission from <strong>${name}</strong> (${email}, ${phone}):</p><p>${message}</p>`,
  });
};

export const sendBookingEmail = async ({ name, email, phone, packageName, message }) => {
  await resend.emails.send({
    from: `New Booking <${fromEmail}>`,
    to: 'ladakhmaxicabs1171@gmail.com',
    subject: `New Tour Booking: ${packageName}`,
    replyTo: email,
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

export const sendBookingConfirmationEmail = async ({ name, email, phone, packageName, message }) => {
  await resend.emails.send({
    from: `Booking Confirmation <${fromEmail}>`,
    to: email,
    subject: `Booking Confirmation: ${packageName}`,
    html: `
      <h1>Booking Confirmation</h1>
      <p>Thank you for your booking request!</p>
      <hr />
      <h2>Booking Details:</h2>
      <p><strong>Package:</strong> ${packageName}</p>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      ${message ? `<p><strong>Message:</strong> ${message}</p>` : ''}
      <p>We will contact you soon to confirm your booking.</p>
    `,
  });
};

export const sendPasswordResetEmail = async (email, resetToken) => {
  const resetUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/reset-password?token=${resetToken}`;
  await resend.emails.send({
    from: `Password Reset <${fromEmail}>`,
    to: email,
    subject: 'Password Reset Request',
    html: `
      <h1>Password Reset Request</h1>
      <p>You requested a password reset for your account.</p>
      <p>Click the link below to reset your password:</p>
      <a href="${resetUrl}" style="display: inline-block; padding: 10px 20px; background-color: #007bff; color: white; text-decoration: none; border-radius: 5px;">Reset Password</a>
      <p>If you didn't request this, please ignore this email.</p>
    `,
  });
};

export const sendNewsletterConfirmation = async (email) => {
  await resend.emails.send({
    from: `Newsletter <${fromEmail}>`,
    to: email,
    subject: 'Newsletter Subscription Confirmed',
    html: `
      <h1>Newsletter Subscription Confirmed</h1>
      <p>Thank you for subscribing to our newsletter!</p>
      <p>You will now receive updates about Ladakh tourism, special offers, and travel tips.</p>
    `,
  });
}; 