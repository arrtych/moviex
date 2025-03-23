import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import Header from "@/components/header"
import { MovieProvider } from "@/context/movie-context"
import MobileNavigation from "@/components/mobile-navigation"
import QueryProvider from "@/providers/query-provider"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "MovieX - Personal Film Library",
  description: "Track and manage your personal film collection",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen bg-background text-foreground antialiased`}>
        <QueryProvider>
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
            <MovieProvider>
              <div className="flex min-h-screen flex-col">
                <Header />
                <main className="flex-1 pb-16 md:pb-0">{children}</main>
                <MobileNavigation />
                <Toaster />
              </div>
            </MovieProvider>
          </ThemeProvider>
        </QueryProvider>
      </body>
    </html>
  )
}



import './globals.css'