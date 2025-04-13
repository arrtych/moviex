"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Activity, Bookmark, HardDrive, Settings } from "lucide-react"

export default function MobileNavigation() {
  const pathname = usePathname()

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-background/90 backdrop-blur-md border-t md:hidden">
      <div className="flex items-center justify-around h-16">
        <Link
          href="/"
          className={`flex flex-col items-center justify-center w-full h-full ${pathname === "/" ? "text-primary" : "text-muted-foreground"}`}
        >
          <Home className="h-5 w-5" />
          <span className="text-xs mt-1">Home</span>
        </Link>

        <Link
          href="/feed"
          className={`flex flex-col items-center justify-center w-full h-full ${pathname === "/feed" ? "text-primary" : "text-muted-foreground"}`}
        >
          <Activity className="h-5 w-5" />
          <span className="text-xs mt-1">Feed</span>
        </Link>

        <Link
          href="/library"
          className={`flex flex-col items-center justify-center w-full h-full ${pathname === "/library" ? "text-primary" : "text-muted-foreground"}`}
        >
          <HardDrive className="h-5 w-5" />
          <span className="text-xs mt-1">Library</span>
        </Link>

        <Link
          href="/favorites"
          className={`flex flex-col items-center justify-center w-full h-full ${pathname === "/favorites" ? "text-primary" : "text-muted-foreground"}`}
        >
          <Bookmark className="h-5 w-5" />
          <span className="text-xs mt-1">Favorites</span>
        </Link>

        <Link
          href="/settings"
          className={`flex flex-col items-center justify-center w-full h-full ${pathname === "/settings" ? "text-primary" : "text-muted-foreground"}`}
        >
          <Settings className="h-5 w-5" />
          <span className="text-xs mt-1">Settings</span>
        </Link>
      </div>
    </div>
  )
}

