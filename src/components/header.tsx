"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Search, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useMovies } from "@/context/movie-context";
import MobileMenu from "./mobile-menu";
import ProfileDropdown from "./profile-dropdown";
import OverlaySearch from "./overlay-search";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { notifications } = useMovies();

  const unreadNotifications = notifications.filter(
    (notification) => !notification.read
  ).length;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearchToggle = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/90 backdrop-blur-md shadow-md"
          : "bg-gradient-to-b from-background to-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden mr-2"
              onClick={toggleMobileMenu}
            >
              <Menu className="h-6 w-6" />
            </Button>

            <Link href="/" className="flex items-center">
              <span className="text-xl font-bold text-primary">MovieX</span>
            </Link>

            <nav className="hidden md:flex ml-10 space-x-8">
              <Link
                href="/"
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  pathname === "/" ? "text-primary" : "text-muted-foreground"
                }`}
              >
                Home
              </Link>
              <Link
                href="/feed"
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  pathname === "/feed"
                    ? "text-primary"
                    : "text-muted-foreground"
                }`}
              >
                Feed
              </Link>
              <Link
                href="/library"
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  pathname === "/library"
                    ? "text-primary"
                    : "text-muted-foreground"
                }`}
              >
                Library
              </Link>
              <Link
                href="/favorites"
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  pathname === "/favorites"
                    ? "text-primary"
                    : "text-muted-foreground"
                }`}
              >
                Favorites
              </Link>
              <Link
                href="/genres"
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  pathname === "/genres"
                    ? "text-primary"
                    : "text-muted-foreground"
                }`}
              >
                Genres
              </Link>
              <Link
                href="/actors"
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  pathname === "/actors"
                    ? "text-primary"
                    : "text-muted-foreground"
                }`}
              >
                Actors
              </Link>
              <Link
                href="/directors"
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  pathname === "/directors"
                    ? "text-primary"
                    : "text-muted-foreground"
                }`}
              >
                Directors
              </Link>
            </nav>
          </div>

          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" onClick={handleSearchToggle}>
              <Search className="h-5 w-5" />
            </Button>

            <Link href="/notifications" className="relative">
              <Button variant="ghost" size="icon">
                <Bell className="h-5 w-5" />
                {unreadNotifications > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-white">
                    {unreadNotifications > 9 ? "9+" : unreadNotifications}
                  </span>
                )}
              </Button>
            </Link>

            <ProfileDropdown />
          </div>
        </div>
      </div>

      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
      <OverlaySearch
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </header>
  );
}
