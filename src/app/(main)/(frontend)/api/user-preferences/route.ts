import { NextResponse } from 'next/server'
import type { UserPreferences } from '@/types/movie'

export async function GET() {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 100))

  const userPreferences: UserPreferences = {
    theme: 'dark',
    language: 'en',
  }

  return NextResponse.json(userPreferences)
}
