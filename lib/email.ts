import nodemailer from 'nodemailer';

export async function sendEmail({ to, subject, text }: { to: string, subject: string, text: string }) {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT),
    secure: true, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to,
    subject,
    text,
  });
}

type ContactEmailData = {
  name: string
  email: string
  phone: string
  message: string
}

export async function sendContactEmail(data: ContactEmailData) {
  // For now, just log the message
  console.log('New contact form submission:')
  console.log('From:', data.name)
  console.log('Email:', data.email)
  console.log('Phone:', data.phone)
  console.log('Message:', data.message)
  
  return { success: true }
}

export async function sendNewsletterConfirmation(email: string) {
  try {
    await sendEmail({
      to: email,
      subject: "Welcome to our Newsletter!",
      text: `
        Welcome to Himalayan Adventures Newsletter!\n\nThank you for subscribing to our newsletter. You'll now receive updates about:\n- Latest travel tips and guides\n- Special offers and promotions\n- New destinations and experiences\n- Community stories and adventures\n\nBest regards,\nThe Himalayan Adventures Team
      `,
    });
    return { success: true }
  } catch (error) {
    console.error("Error sending newsletter confirmation:", error)
    return { success: false, error }
  }
}

export async function sendPasswordResetEmail(to: string, resetLink: string) {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT),
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to,
    subject: 'Password Reset Request',
    html: `
      <p>You requested a password reset.</p>
      <p>Click <a href="${resetLink}">here</a> to reset your password. This link will expire in 1 hour.</p>
    `,
  });
} 