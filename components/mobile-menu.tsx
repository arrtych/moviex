"use client"

import { useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { X, Home, Bookmark, Search, Activity, HardDrive, Users, User, Film } from "lucide-react"
import { Button } from "@/components/ui/button"

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const pathname = usePathname()

  // Close menu when route changes
  useEffect(() => {
    if (isOpen) {
      onClose()
    }
  }, [pathname, onClose, isOpen])

  // Prevent scrolling when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      // Add a small delay before re-enabling scrolling to ensure smooth transitions
      const timer = setTimeout(() => {
        document.body.style.overflow = ""
      }, 300)

      return () => clearTimeout(timer)
    }

    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  return (
    <div
      className={`fixed inset-0 z-50 bg-background/95 backdrop-blur-sm md:hidden transition-opacity duration-300 ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
    >
      <div className="container h-full flex flex-col">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center" onClick={onClose}>
            <span className="text-xl font-bold text-primary">MovieX</span>
          </Link>

          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-6 w-6" />
          </Button>
        </div>

        <nav className="flex flex-col space-y-6 mt-10">
          <Link href="/" className="flex items-center text-lg font-medium py-2" onClick={onClose}>
            <Home className="mr-4 h-5 w-5" />
            Home
          </Link>

          <Link href="/feed" className="flex items-center text-lg font-medium py-2" onClick={onClose}>
            <Activity className="mr-4 h-5 w-5" />
            Feed
          </Link>

          <Link href="/library" className="flex items-center text-lg font-medium py-2" onClick={onClose}>
            <HardDrive className="mr-4 h-5 w-5" />
            Library
          </Link>

          <Link href="/favorites" className="flex items-center text-lg font-medium py-2" onClick={onClose}>
            <Bookmark className="mr-4 h-5 w-5" />
            Favorites
          </Link>

          <Link href="/genres" className="flex items-center text-lg font-medium py-2" onClick={onClose}>
            <Film className="mr-4 h-5 w-5" />
            Genres
          </Link>

          <Link href="/actors" className="flex items-center text-lg font-medium py-2" onClick={onClose}>
            <Users className="mr-4 h-5 w-5" />
            Actors
          </Link>

          <Link href="/directors" className="flex items-center text-lg font-medium py-2" onClick={onClose}>
            <User className="mr-4 h-5 w-5" />
            Directors
          </Link>

          <Link href="/search" className="flex items-center text-lg font-medium py-2" onClick={onClose}>
            <Search className="mr-4 h-5 w-5" />
            Search
          </Link>
        </nav>
      </div>
    </div>
  )
}

