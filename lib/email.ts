import { Resend } from "resend"

if (!process.env.RESEND_API_KEY) {
  throw new Error("Missing RESEND_API_KEY environment variable")
}

export const resend = new Resend(process.env.RESEND_API_KEY)

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
    await resend.emails.send({
      from: "Himalayan Adventures <newsletter@himalayanadventures.com>",
      to: [email],
      subject: "Welcome to our Newsletter!",
      html: `
        <h2>Welcome to Himalayan Adventures Newsletter!</h2>
        <p>Thank you for subscribing to our newsletter. You'll now receive updates about:</p>
        <ul>
          <li>Latest travel tips and guides</li>
          <li>Special offers and promotions</li>
          <li>New destinations and experiences</li>
          <li>Community stories and adventures</li>
        </ul>
        <p>Best regards,<br>The Himalayan Adventures Team</p>
      `,
    })

    return { success: true }
  } catch (error) {
    console.error("Error sending newsletter confirmation:", error)
    return { success: false, error }
  }
} 