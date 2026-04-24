"use client";

import Link from "next/link";
import {
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
const logoImage = null;
import { toast } from "sonner";
import { useState } from "react";

export function Footer() {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState("");

  const handleSubscribe = () => {
    if (!email.trim()) {
      toast.error("Please enter your email address");
      return;
    }
    if (!email.includes("@")) {
      toast.error("Please enter a valid email address");
      return;
    }
    toast.success("Thank you for subscribing!", {
      description: "You'll receive our latest updates and offers.",
    });
    setEmail("");
  };

  return (
    <footer className="glass-navbar border-t border-border mt-auto">
      {/* Newsletter Section */}
      <div className="gradient-bg-orange relative overflow-hidden">
        <div className="absolute inset-0 bg-inverse/10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold text-inverse mb-2">
                📧 Subscribe to Our Newsletter
              </h3>
              <p className="text-inverse/90">
                Get the latest deals and exclusive offers delivered to your
                inbox
              </p>
            </div>
            <div className="flex gap-3">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSubscribe();
                  }
                }}
                className="glass-input bg-background/90 h-12 border-white/30"
              />
              <Button
                onClick={handleSubscribe}
                className="bg-card text-card-foreground hover:bg-card text-card-foreground text-inverse px-8 h-12 glass-button transition-all hover:scale-105"
              >
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <Link href="/" className="flex items-center mb-4">
              <img
                src={logoImage}
                alt="N4ASHYOL"
                className="h-10 w-auto object-contain dark:brightness-0 dark:invert"
              />
            </Link>
            <p className="text-sm mb-4 text-muted-foreground">
              Your trusted marketplace for premium products. Quality guaranteed,
              delivered with care.
            </p>
            <div className="flex gap-3">
              <a
                href="#"
                className="size-9 glass-card rounded-full flex items-center justify-center hover:bg-[var(--primary-color)] hover:text-inverse transition-all hover:scale-110 text-muted-foreground"
              >
                <Facebook className="size-4" />
              </a>
              <a
                href="#"
                className="size-9 glass-card rounded-full flex items-center justify-center hover:bg-primary hover:text-inverse transition-all hover:scale-110 text-muted-foreground"
              >
                <Twitter className="size-4" />
              </a>
              <a
                href="#"
                className="size-9 glass-card rounded-full flex items-center justify-center hover:bg-primary hover:text-inverse transition-all hover:scale-110 text-muted-foreground"
              >
                <Instagram className="size-4" />
              </a>
              <a
                href="#"
                className="size-9 glass-card rounded-full flex items-center justify-center hover:bg-primary hover:text-inverse transition-all hover:scale-110 text-muted-foreground"
              >
                <Youtube className="size-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-foreground font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/products"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Shop All Products
                </Link>
              </li>
              <li>
                <Link href="/account"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  My Account
                </Link>
              </li>
              <li>
                <Link href="/orders"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Track Order
                </Link>
              </li>
              <li>
                <Link href="/wishlist"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Wishlist
                </Link>
              </li>
              <li>
                <Link href="/rewards"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Rewards Program
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-foreground font-semibold mb-4">Customer Service</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/help-center" className="text-muted-foreground hover:text-primary transition-colors">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/shipping-info" className="text-muted-foreground hover:text-primary transition-colors">
                  Shipping Info
                </Link>
              </li>
              <li>
                <Link href="/returns-refunds" className="text-muted-foreground hover:text-primary transition-colors">
                  Returns & Refunds
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="text-muted-foreground hover:text-primary transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms-conditions" className="text-muted-foreground hover:text-primary transition-colors">
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-foreground font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="size-5 text-[var(--primary-color)] flex-shrink-0 mt-0.5" />
                <span className="text-muted-foreground">123 Market Street, San Francisco, CA 94103</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="size-5 text-[var(--primary-color)] flex-shrink-0" />
                <span className="text-muted-foreground">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="size-5 text-[var(--primary-color)] flex-shrink-0" />
                <span className="text-muted-foreground">support@n4ashyol.com</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <Separator className="bg-border" />

      {/* Bottom Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>© {currentYear} N4ASHYOL. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy-policy" className="hover:text-primary transition-colors">
              Privacy
            </Link>
            <Link href="/terms-conditions" className="hover:text-primary transition-colors">
              Terms
            </Link>
            <Link href="/help-center" className="hover:text-primary transition-colors">
              Help
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}


