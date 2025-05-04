import type React from 'react'
import { Toaster } from '@/components/ui/toaster'
import Header from '@/components/header'

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <Toaster />
    </>
  )
}
