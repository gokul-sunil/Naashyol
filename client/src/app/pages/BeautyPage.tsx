"use client";

import { Star, Heart, ShoppingCart, Sparkles, Home, Dumbbell } from "lucide-react";
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
import { toast } from "sonner";

export function BeautyPage() {
  const categoryName = "Beauty";
  const products = getProductsByCategory(categoryName);
  const { addItem } = useCart();

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-rose-50 dark:from-gray-950 dark:via-pink-950/20 dark:to-purple-950/20">
      {/* Beauty Products Section */}
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
              <Link href="/category?category=Beauty">
                View All
                <svg xmlns="http://www.w3.org/2000/svg" className="size-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
              </Link>
            </Button>
          </div>
          <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 gap-3">
            {[
              { name: "Skincare", image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400" },
              { name: "Makeup", image: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=400" },
              { name: "Perfumes", image: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=400" },
              { name: "Hair Care", image: "https://images.unsplash.com/photo-1522338242992-e1a54906a8da?w=400" },
              { name: "Nail Polish", image: "https://images.unsplash.com/photo-1610992015732-2449b76344bc?w=400" },
              { name: "Face Masks", image: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=400" },
              { name: "Lip Balm", image: "https://images.unsplash.com/photo-1590156206916-ab87dc6b5ea0?w=400" },
              { name: "Eye Shadow", image: "https://images.unsplash.com/photo-1631214524020-7e18db7f0796?w=400" },
              { name: "Foundation", image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400" },
              { name: "Brushes", image: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=400" },
              { name: "Moisturizers", image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400" },
              { name: "Serums", image: "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=400" },
              { name: "Lipstick", image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=400" },
              { name: "Blush", image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400" },
              { name: "Mascara", image: "https://images.unsplash.com/photo-1631730486572-226d1f595b97?w=400" },
              { name: "Body Lotion", image: "https://images.unsplash.com/photo-1571875257727-256c39da42af?w=400" },
            ].map((product) => (
              <Link key={product.name}
                href={`/category?category=Beauty&subcategory=${encodeURIComponent(product.name)}`}
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
      <section className="relative bg-gradient-to-br from-pink-600 via-purple-600 to-rose-600 dark:from-pink-900 dark:via-purple-900 dark:to-rose-900 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-inverse mb-4">
              Beauty & Cosmetics
            </h1>
            <p className="text-xl text-inverse/90 mb-8">
              Discover your beauty essentials
            </p>
            <Button
              size="lg"
              className="bg-background text-pink-600 hover:bg-muted rounded-2xl"
              asChild
            >
              <Link href="/products?category=Beauty">Shop All Beauty</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Flash Deals & Offers Section */}
      <FlashDealsSection />

      {/* Promotional Hot Deals Carousel */}
      <section className="py-12 bg-gradient-to-br from-pink-50 via-purple-50 to-rose-50 dark:from-gray-950 dark:via-pink-950/20 dark:to-purple-950/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-pink-600 via-purple-600 to-rose-600 dark:from-pink-800 dark:via-purple-800 dark:to-rose-800 p-12 md:p-16">
            <div className="absolute top-4 left-4">
              <Badge className="bg-[var(--primary-color)] hover:bg-orange-600 text-inverse">
                Hot Deal
              </Badge>
            </div>
            <div className="absolute top-4 right-4">
              <Badge variant="secondary" className="bg-background/20 text-inverse border-white/30">
                2 / 4
              </Badge>
            </div>
            <div className="relative z-10 max-w-2xl">
              <p className="text-inverse/90 text-sm font-medium mb-4 uppercase tracking-wider">
                PREMIUM BEAUTY ESSENTIALS
              </p>
              <h2 className="text-4xl md:text-6xl font-bold text-inverse mb-6">
                Skincare Bundle Sale
              </h2>
              <p className="text-inverse/90 text-lg mb-8">
                Pamper yourself with our exclusive beauty collection. Limited time offer!
              </p>
              <div className="flex items-center gap-4">
                <Badge className="bg-[var(--primary-color)] hover:bg-orange-600 text-inverse text-2xl px-6 py-2">
                  40% OFF
                </Badge>
                <Button size="lg" className="bg-[var(--primary-color)] hover:bg-orange-600 text-inverse">
                  <ShoppingCart className="size-5 mr-2" />
                  Grab Deals
                </Button>
              </div>
            </div>
            <div className="absolute right-0 top-0 bottom-0 w-1/2 opacity-20">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1556228720-195a672e8a03?w=800"
                alt="Beauty Products"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Shop by Category Section */}
      <ShopByCategorySection />

      {/* Shop for Loved Ones Section */}
      <section className="py-12 bg-gradient-to-br from-pink-50 via-purple-50 to-rose-50 dark:from-gray-950 dark:via-pink-950/20 dark:to-purple-950/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-foreground mb-8">
            Shop by Category
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <Link href="/products?subcategory=Skincare"
              className="group relative overflow-hidden rounded-3xl aspect-[4/3] hover:shadow-2xl transition-all duration-300 hover:scale-105"
            >
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1556228720-195a672e8a03?w=800"
                alt="Skincare"
                className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-pink-900/70 via-pink-900/30 to-transparent" />
              <div className="absolute bottom-6 left-6">
                <h3 className="text-3xl font-bold text-inverse mb-1">Skincare</h3>
                <p className="text-inverse/90 text-sm">Nourish your natural glow</p>
              </div>
            </Link>

            <Link href="/products?subcategory=Makeup"
              className="group relative overflow-hidden rounded-3xl aspect-[4/3] hover:shadow-2xl transition-all duration-300 hover:scale-105"
            >
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=800"
                alt="Makeup"
                className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-purple-900/70 via-purple-900/30 to-transparent" />
              <div className="absolute bottom-6 left-6">
                <h3 className="text-3xl font-bold text-inverse mb-1">Makeup</h3>
                <p className="text-inverse/90 text-sm">Express your beauty</p>
              </div>
            </Link>

            <Link href="/products?subcategory=Fragrances"
              className="group relative overflow-hidden rounded-3xl aspect-[4/3] hover:shadow-2xl transition-all duration-300 hover:scale-105"
            >
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1541643600914-78b084683601?w=800"
                alt="Fragrances"
                className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-rose-900/70 via-rose-900/30 to-transparent" />
              <div className="absolute bottom-6 left-6">
                <h3 className="text-3xl font-bold text-inverse mb-1">Fragrances</h3>
                <p className="text-inverse/90 text-sm">Signature scents for you</p>
              </div>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}


