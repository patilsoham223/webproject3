import { Link } from "wouter";
import { Instagram, Youtube, Globe, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import NewsletterSignup from "@/components/blog/newsletter-signup";

const quickLinks = [
  { name: "About Us", href: "/about" },
  { name: "Contact", href: "/contact" },
  { name: "Write for Us", href: "/contact" },
  { name: "Advertise", href: "/contact" },
  { name: "Press Kit", href: "/contact" },
];

const categories = [
  { name: "Makeup Tutorials", href: "/makeup" },
  { name: "Skincare Tips", href: "/skincare" },
  { name: "Hair Care", href: "/haircare" },
  { name: "Fashion & Style", href: "/fashion" },
  { name: "Product Reviews", href: "/search?q=review" },
];

const legal = [
  { name: "Privacy Policy", href: "/privacy" },
  { name: "Terms of Service", href: "/terms" },
  { name: "Cookie Policy", href: "/privacy" },
  { name: "Disclaimer", href: "/terms" },
];

export default function Footer() {
  return (
    <footer className="bg-charcoal text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold mb-4">
              Vertex <span className="text-rose-gold">Glow</span>
            </h3>
            <p className="text-gray-300 mb-6">
              Your trusted source for beauty inspiration, honest reviews, and expert
              tutorials. Join our community of beauty enthusiasts.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="text-gray-300 hover:text-rose-gold transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-gray-300 hover:text-rose-gold transition-colors"
              >
                <Youtube className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-gray-300 hover:text-rose-gold transition-colors"
              >
                <Globe className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-gray-300 hover:text-rose-gold transition-colors"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-rose-gold transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Categories</h4>
            <ul className="space-y-2">
              {categories.map((category) => (
                <li key={category.name}>
                  <Link
                    href={category.href}
                    className="text-gray-300 hover:text-rose-gold transition-colors"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Stay Updated</h4>
            <p className="text-gray-300 mb-4">
              Get the latest beauty tips and trends delivered to your inbox.
            </p>
            <NewsletterSignup variant="footer" />
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-300 text-sm mb-4 md:mb-0">
            © 2024 Vertex Glow. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm">
            {legal.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-300 hover:text-rose-gold transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
