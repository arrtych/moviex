import Link from "next/link"
import Image from "next/image"
import type { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export const metadata: Metadata = {
  title: "Forgot Password | MovieX",
  description: "Reset your MovieX password",
}

export default function ForgotPasswordPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="flex flex-col space-y-2 text-center">
          <Link href="/" className="inline-block">
            <div className="flex items-center justify-center">
              <div className="relative h-12 w-12 mr-2">
                <Image src="/placeholder.svg?key=qy6my" alt="MovieX Logo" fill className="object-contain" />
              </div>
              <h1 className="text-3xl font-bold text-primary">MovieX</h1>
            </div>
          </Link>
          <h1 className="text-2xl font-semibold tracking-tight">Forgot your password?</h1>
          <p className="text-sm text-muted-foreground">
            Enter your email address and we'll send you a link to reset your password
          </p>
        </div>

        <div className="bg-card p-6 rounded-lg shadow-md">
          <form className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                placeholder="name@example.com"
                type="email"
                autoCapitalize="none"
                autoComplete="email"
                autoCorrect="off"
                className="h-11"
              />
            </div>
            <Button type="submit" className="w-full h-11">
              Send Reset Link
            </Button>
          </form>

          <div className="mt-6 text-center text-sm">
            <Link href="/login" className="font-medium text-primary hover:underline">
              Back to login
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
