"use client";

import { Star, Heart, ShoppingCart, Dumbbell, Home, Sparkles } from "lucide-react";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import Link from "next/link";
import {   } from "next/navigation";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { PageHeader } from "../components/PageHeader";
import { FlashDealsSection } from "../components/FlashDealsSection";
import { ShopByCategorySection } from "../components/ShopByCategorySection";
import { getProductsByCategory } from "../data/products";
import { useCart } from "../contexts/CartContext";
import { useWishlist } from "../contexts/WishlistContext";
import { toast } from "sonner";

export function SportsPage() {
  const categoryName = "Sports";
  const products = getProductsByCategory(categoryName);
  const { addItem } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-amber-50 dark:from-gray-950 dark:via-red-950/20 dark:to-orange-950/20">
      {/* Sports Products Section */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-2">
                Shop by Category
              </h2>
              <p className="text-muted-foreground">
                Find exactly what you're looking for
              </p>
            </div>
            <Button variant="ghost" className="text-[var(--primary-color)]" asChild>
              <Link href="/category?category=Sports">
                View All
                <svg xmlns="http://www.w3.org/2000/svg" className="size-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
              </Link>
            </Button>
          </div>
          <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 gap-3">
            {[
              { name: "Running Shoes", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400" },
              { name: "Yoga Mats", image: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=400" },
              { name: "Dumbbells", image: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=400" },
              { name: "Sports Wear", image: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=400" },
              { name: "Bicycles", image: "https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=400" },
              { name: "Basketballs", image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=400" },
              { name: "Fitness Trackers", image: "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=400" },
              { name: "Protein Shakes", image: "https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=400" },
              { name: "Gym Bags", image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400" },
              { name: "Resistance Bands", image: "https://images.unsplash.com/photo-1598289431512-b97b0917affc?w=400" },
              { name: "Tennis Rackets", image: "https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=400" },
              { name: "Swimming Gear", image: "https://images.unsplash.com/photo-1530549387789-4c1017266635?w=400" },
              { name: "Boxing Gloves", image: "https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?w=400" },
              { name: "Skateboards", image: "https://images.unsplash.com/photo-1547447134-cd3f5c716030?w=400" },
              { name: "Golf Clubs", image: "https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=400" },
              { name: "Water Bottles", image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400" },
            ].map((product) => (
              <Link key={product.name}
                href={`/category?category=Sports&subcategory=${encodeURIComponent(product.name)}`}
                className="group flex flex-col items-center"
              >
                <div className="relative w-full aspect-square rounded-2xl overflow-hidden mb-2 bg-muted hover:shadow-xl transition-all duration-300 hover:scale-105">
                  <ImageWithFallback
                    src={product.image}
                    alt={product.name}
                    className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <p className="text-xs text-center text-foreground font-medium line-clamp-2">
                  {product.name}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-orange-600 via-red-600 to-pink-600 dark:from-orange-900 dark:via-red-900 dark:to-pink-900 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-inverse mb-4">
              Sports & Fitness
            </h1>
            <p className="text-xl text-inverse/90 mb-8">
              Elevate your fitness journey with premium gear
            </p>
            <Button
              size="lg"
              className="bg-background text-orange-600 hover:bg-muted rounded-2xl"
              asChild
            >
              <Link href="/products?category=Sports">Shop All Sports</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Flash Deals & Offers Section */}
      <FlashDealsSection />

      {/* ========== MARKER: ELECTRONICS SECTION STARTS HERE ========== */}
      <div className="bg-yellow-400 dark:bg-yellow-600 py-4 text-center">
        <h3 className="text-2xl font-bold text-foreground">⬇️ ELECTRONICS SECTION BELOW ⬇️</h3>
      </div>

      {/* Electronics Products Section */}
      <section className="py-12 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-foreground mb-2">
              Electronics Products
            </h2>
            <p className="text-muted-foreground">
              Discover our complete collection of premium products
            </p>
          </div>
          <div className="grid grid-cols-5 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-9 gap-4">
            <Link href="/products?category=Smartphones"
              className="group flex flex-col items-center"
            >
              <div className="relative w-full aspect-square rounded-2xl overflow-hidden mb-2 bg-muted hover:shadow-xl transition-all duration-300 hover:scale-105">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400"
                  alt="Smartphones"
                  className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <p className="text-xs text-center text-foreground font-medium line-clamp-2">
                Smartphones
              </p>
            </Link>
            <Link href="/products?category=Laptops"
              className="group flex flex-col items-center"
            >
              <div className="relative w-full aspect-square rounded-2xl overflow-hidden mb-2 bg-muted hover:shadow-xl transition-all duration-300 hover:scale-105">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400"
                  alt="Laptops"
                  className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <p className="text-xs text-center text-foreground font-medium line-clamp-2">
                Laptops
              </p>
            </Link>
            <Link href="/products?category=Headphones"
              className="group flex flex-col items-center"
            >
              <div className="relative w-full aspect-square rounded-2xl overflow-hidden mb-2 bg-muted hover:shadow-xl transition-all duration-300 hover:scale-105">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400"
                  alt="Headphones"
                  className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <p className="text-xs text-center text-foreground font-medium line-clamp-2">
                Headphones
              </p>
            </Link>
            <Link href="/products?category=Cameras"
              className="group flex flex-col items-center"
            >
              <div className="relative w-full aspect-square rounded-2xl overflow-hidden mb-2 bg-muted hover:shadow-xl transition-all duration-300 hover:scale-105">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=400"
                  alt="Cameras"
                  className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <p className="text-xs text-center text-foreground font-medium line-clamp-2">
                Cameras
              </p>
            </Link>
            <Link href="/products?category=Smartwatches"
              className="group flex flex-col items-center"
            >
              <div className="relative w-full aspect-square rounded-2xl overflow-hidden mb-2 bg-muted hover:shadow-xl transition-all duration-300 hover:scale-105">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=400"
                  alt="Smartwatches"
                  className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <p className="text-xs text-center text-foreground font-medium line-clamp-2">
                Smartwatches
              </p>
            </Link>
            <Link href="/products?category=Gaming%20Consoles"
              className="group flex flex-col items-center"
            >
              <div className="relative w-full aspect-square rounded-2xl overflow-hidden mb-2 bg-muted hover:shadow-xl transition-all duration-300 hover:scale-105">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=400"
                  alt="Gaming Consoles"
                  className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <p className="text-xs text-center text-foreground font-medium line-clamp-2">
                Gaming Consoles
              </p>
            </Link>
            <Link href="/products?category=TVs"
              className="group flex flex-col items-center"
            >
              <div className="relative w-full aspect-square rounded-2xl overflow-hidden mb-2 bg-muted hover:shadow-xl transition-all duration-300 hover:scale-105">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1593784991095-a205069470b6?w=400"
                  alt="TVs"
                  className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <p className="text-xs text-center text-foreground font-medium line-clamp-2">
                TVs
              </p>
            </Link>
            <Link href="/products?category=Tablets"
              className="group flex flex-col items-center"
            >
              <div className="relative w-full aspect-square rounded-2xl overflow-hidden mb-2 bg-muted hover:shadow-xl transition-all duration-300 hover:scale-105">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1585790050230-5dd28404f8f3?w=400"
                  alt="Tablets"
                  className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <p className="text-xs text-center text-foreground font-medium line-clamp-2">
                Tablets
              </p>
            </Link>
            <Link href="/products?category=Speakers"
              className="group flex flex-col items-center"
            >
              <div className="relative w-full aspect-square rounded-2xl overflow-hidden mb-2 bg-muted hover:shadow-xl transition-all duration-300 hover:scale-105">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400"
                  alt="Speakers"
                  className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <p className="text-xs text-center text-foreground font-medium line-clamp-2">
                Speakers
              </p>
            </Link>
            <Link href="/products?category=Drones"
              className="group flex flex-col items-center"
            >
              <div className="relative w-full aspect-square rounded-2xl overflow-hidden mb-2 bg-muted hover:shadow-xl transition-all duration-300 hover:scale-105">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=400"
                  alt="Drones"
                  className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <p className="text-xs text-center text-foreground font-medium line-clamp-2">
                Drones
              </p>
            </Link>
            <Link href="/products?category=Keyboards"
              className="group flex flex-col items-center"
            >
              <div className="relative w-full aspect-square rounded-2xl overflow-hidden mb-2 bg-muted hover:shadow-xl transition-all duration-300 hover:scale-105">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400"
                  alt="Keyboards"
                  className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <p className="text-xs text-center text-foreground font-medium line-clamp-2">
                Keyboards
              </p>
            </Link>
            <Link href="/products?category=Gaming%20Mouse"
              className="group flex flex-col items-center"
            >
              <div className="relative w-full aspect-square rounded-2xl overflow-hidden mb-2 bg-muted hover:shadow-xl transition-all duration-300 hover:scale-105">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1527814050087-3793815479db?w=400"
                  alt="Gaming Mouse"
                  className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <p className="text-xs text-center text-foreground font-medium line-clamp-2">
                Gaming Mouse
              </p>
            </Link>
            <Link href="/products?category=Storage"
              className="group flex flex-col items-center"
            >
              <div className="relative w-full aspect-square rounded-2xl overflow-hidden mb-2 bg-muted hover:shadow-xl transition-all duration-300 hover:scale-105">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=400"
                  alt="Storage"
                  className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <p className="text-xs text-center text-foreground font-medium line-clamp-2">
                Storage
              </p>
            </Link>
            <Link href="/products?category=Cables%20%26%20Chargers"
              className="group flex flex-col items-center"
            >
              <div className="relative w-full aspect-square rounded-2xl overflow-hidden mb-2 bg-muted hover:shadow-xl transition-all duration-300 hover:scale-105">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=400"
                  alt="Cables & Chargers"
                  className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <p className="text-xs text-center text-foreground font-medium line-clamp-2">
                Cables & Chargers
              </p>
            </Link>
            <Link href="/products?category=Power%20Banks"
              className="group flex flex-col items-center"
            >
              <div className="relative w-full aspect-square rounded-2xl overflow-hidden mb-2 bg-muted hover:shadow-xl transition-all duration-300 hover:scale-105">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=400"
                  alt="Power Banks"
                  className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <p className="text-xs text-center text-foreground font-medium line-clamp-2">
                Power Banks
              </p>
            </Link>
            <Link href="/products?category=Webcams"
              className="group flex flex-col items-center"
            >
              <div className="relative w-full aspect-square rounded-2xl overflow-hidden mb-2 bg-muted hover:shadow-xl transition-all duration-300 hover:scale-105">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1589739900243-c63304f77f34?w=400"
                  alt="Webcams"
                  className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <p className="text-xs text-center text-foreground font-medium line-clamp-2">
                Webcams
              </p>
            </Link>
            <Link href="/products?category=Routers"
              className="group flex flex-col items-center"
            >
              <div className="relative w-full aspect-square rounded-2xl overflow-hidden mb-2 bg-muted hover:shadow-xl transition-all duration-300 hover:scale-105">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1606904825846-647eb07f5be2?w=400"
                  alt="Routers"
                  className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <p className="text-xs text-center text-foreground font-medium line-clamp-2">
                Routers
              </p>
            </Link>
            <Link href="/products?category=Microphones"
              className="group flex flex-col items-center"
            >
              <div className="relative w-full aspect-square rounded-2xl overflow-hidden mb-2 bg-muted hover:shadow-xl transition-all duration-300 hover:scale-105">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=400"
                  alt="Microphones"
                  className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <p className="text-xs text-center text-foreground font-medium line-clamp-2">
                Microphones
              </p>
            </Link>
          </div>
        </div>
      </section>

      {/* Shop by Category Section */}
      <ShopByCategorySection />

      {/* Shop for Loved Ones Section */}
      <section className="py-12 bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 dark:from-gray-950 dark:via-orange-950/20 dark:to-red-950/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-foreground mb-8">
            Shop by Activity
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <Link href="/products?subcategory=Gym & Fitness"
              className="group relative overflow-hidden rounded-3xl aspect-[4/3] hover:shadow-2xl transition-all duration-300 hover:scale-105"
            >
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800"
                alt="Gym & Fitness"
                className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-red-900/70 via-red-900/30 to-transparent" />
              <div className="absolute bottom-6 left-6">
                <h3 className="text-3xl font-bold text-inverse mb-1">Gym & Fitness</h3>
                <p className="text-inverse/90 text-sm">Build strength & endurance</p>
              </div>
            </Link>

            <Link href="/products?subcategory=Outdoor Sports"
              className="group relative overflow-hidden rounded-3xl aspect-[4/3] hover:shadow-2xl transition-all duration-300 hover:scale-105"
            >
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1551958219-acbc608c6377?w=800"
                alt="Outdoor Sports"
                className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/70 via-blue-900/30 to-transparent" />
              <div className="absolute bottom-6 left-6">
                <h3 className="text-3xl font-bold text-inverse mb-1">Outdoor Sports</h3>
                <p className="text-inverse/90 text-sm">Adventure awaits outdoors</p>
              </div>
            </Link>

            <Link href="/products?subcategory=Yoga & Wellness"
              className="group relative overflow-hidden rounded-3xl aspect-[4/3] hover:shadow-2xl transition-all duration-300 hover:scale-105"
            >
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800"
                alt="Yoga & Wellness"
                className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-purple-900/70 via-purple-900/30 to-transparent" />
              <div className="absolute bottom-6 left-6">
                <h3 className="text-3xl font-bold text-inverse mb-1">Yoga & Wellness</h3>
                <p className="text-inverse/90 text-sm">Mind, body & soul balance</p>
              </div>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}


