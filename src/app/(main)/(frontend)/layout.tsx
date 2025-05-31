import type React from 'react'
import Header from '@/components/header'
import MobileNavigation from '@/components/mobile-navigation'
import { Toaster } from '@/components/ui/toaster'

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 pb-16 md:pb-0">{children}</main>
      <MobileNavigation />
      <Toaster />
    </div>
  )
}
