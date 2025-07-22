import "./globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "sonner"
import { Navbar } from "@/components/navbar"
import WhatsAppChat from "@/components/whatsapp-chat"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Ladakh Tourism",
  description: "Discover the beauty of Ladakh with our curated travel experiences.",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <Navbar />
          {children}
          <WhatsAppChat phoneNumber="+918492008932" businessName="Ladakh Tourism" />
          <Toaster position="top-center" richColors />
        </ThemeProvider>
      </body>
    </html>
  )
} 