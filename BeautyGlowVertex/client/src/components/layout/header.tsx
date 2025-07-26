import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Search, Menu, X, Instagram, Youtube, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useScrollDirection } from "@/hooks/use-scroll";
import { motion } from "framer-motion";
import SearchBar from "@/components/blog/search-bar";

const navigation = [
  { name: "Home", href: "/" },
  { name: "Makeup", href: "/makeup" },
  { name: "Skincare", href: "/skincare" },
  { name: "Hair Care", href: "/haircare" },
  { name: "Fashion", href: "/fashion" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export default function Header() {
  const [location] = useLocation();
  const scrollDirection = useScrollDirection();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <motion.header
      className={`fixed top-0 w-full z-50 glass-effect border-b transition-transform duration-300 ${
        scrollDirection === "down" ? "-translate-y-full" : "translate-y-0"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <h1 className="text-2xl font-bold text-charcoal">
              Vertex <span className="gradient-text">Glow</span>
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`font-medium transition-colors duration-300 ${
                  location === item.href
                    ? "text-rose-gold"
                    : "text-charcoal hover:text-rose-gold"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Search Bar - Desktop */}
          <div className="hidden lg:block">
            <SearchBar />
          </div>

          {/* Social Icons - Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            <a
              href="#"
              className="text-medium-gray hover:text-rose-gold transition-colors duration-300"
            >
              <Instagram className="h-5 w-5" />
            </a>
            <a
              href="#"
              className="text-medium-gray hover:text-rose-gold transition-colors duration-300"
            >
              <Youtube className="h-5 w-5" />
            </a>
            <a
              href="#"
              className="text-medium-gray hover:text-rose-gold transition-colors duration-300"
            >
              <Globe className="h-5 w-5" />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden text-charcoal hover:text-rose-gold"
              >
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80">
              <div className="flex flex-col space-y-6 mt-6">
                {/* Mobile Search */}
                <SearchBar />
                
                {/* Mobile Navigation */}
                <nav className="flex flex-col space-y-4">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`font-medium py-2 transition-colors duration-300 ${
                        location === item.href
                          ? "text-rose-gold"
                          : "text-charcoal hover:text-rose-gold"
                      }`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                </nav>

                {/* Mobile Social Icons */}
                <div className="flex items-center space-x-6 pt-6 border-t">
                  <a
                    href="#"
                    className="text-medium-gray hover:text-rose-gold transition-colors duration-300"
                  >
                    <Instagram className="h-6 w-6" />
                  </a>
                  <a
                    href="#"
                    className="text-medium-gray hover:text-rose-gold transition-colors duration-300"
                  >
                    <Youtube className="h-6 w-6" />
                  </a>
                  <a
                    href="#"
                    className="text-medium-gray hover:text-rose-gold transition-colors duration-300"
                  >
                    <Globe className="h-6 w-6" />
                  </a>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.header>
  );
}
