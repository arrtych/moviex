import type React from 'react'
import { Toaster } from '@/components/ui/toaster'

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      "test123"
      <Toaster />
    </>
  )
}
