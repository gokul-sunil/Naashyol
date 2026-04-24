"use client";

import { Star, Heart, ShoppingCart, Sofa, Lamp, Coffee, Flower, Home, Armchair, Dumbbell } from "lucide-react";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import Link from "next/link"; import {   } from "next/navigation";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { PageHeader } from "../components/PageHeader";
import { FlashDealsSection } from "../components/FlashDealsSection";
import { ShopByCategorySection } from "../components/ShopByCategorySection";
import { PromotionalCards } from "../components/PromotionalCards";
import { getProductsByCategory, getSubcategoriesByCategory } from "../data/products";
import { useCart } from "../contexts/CartContext";
import { toast } from "sonner";

export function HomeGardenPage() {
  const categoryName = "Home & Garden";
  const products = getProductsByCategory(categoryName);
  const subcategories = getSubcategoriesByCategory(categoryName);
  const { addItem } = useCart();

  // Get subcategory images from actual products
  const subcategoryData = subcategories.map((subcat) => {
    const product = products.find((p) => p.subcategory === subcat);
    return {
      name: subcat,
      image: product?.image || "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500",
    };
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 dark:from-gray-950 dark:via-green-950/20 dark:to-emerald-950/20">
      {/* Home & Garden Products Section */}
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
              <Link href="/category?category=Home%20%26%20Garden">
                View All
                <svg xmlns="http://www.w3.org/2000/svg" className="size-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
              </Link>
            </Button>
          </div>
          <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 gap-3">
            {[
              { name: "Furniture", image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400" },
              { name: "Bedding", image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400" },
              { name: "Lighting", image: "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=400" },
              { name: "Decor", image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400" },
              { name: "Kitchen", image: "https://images.unsplash.com/photo-1556912173-46c336c7fd55?w=400" },
              { name: "Storage", image: "https://images.unsplash.com/photo-1595428773653-30a35a1c7a1b?w=400" },
              { name: "Rugs", image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400" },
              { name: "Curtains", image: "https://images.unsplash.com/photo-1631889993959-41b4e9c6e3c5?w=400" },
              { name: "Plants", image: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=400" },
              { name: "Garden Tools", image: "https://images.unsplash.com/photo-1585659722983-3a675dabf23d?w=400" },
              { name: "Outdoor", image: "https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?w=400" },
              { name: "Bathroom", image: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=400" },
              { name: "Tableware", image: "https://images.unsplash.com/photo-1578500494198-246f612d3b3d?w=400" },
              { name: "Mirrors", image: "https://images.unsplash.com/photo-1618220179428-22790b461013?w=400" },
              { name: "Wall Art", image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=400" },
              { name: "Cushions", image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400" },
            ].map((product) => (
              <Link key={product.name}
                href={`/category?category=${encodeURIComponent('Home & Garden')}&subcategory=${encodeURIComponent(product.name)}`}
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
      <section className="relative bg-gradient-to-br from-green-600 via-emerald-600 to-teal-600 dark:from-green-900 dark:via-emerald-900 dark:to-teal-900 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-inverse mb-4">
              Home & Garden Essentials
            </h1>
            <p className="text-xl text-inverse/90 mb-8">
              Transform your space with our curated collection
            </p>
            <Button
              size="lg"
              className="bg-background text-green-600 hover:bg-muted rounded-2xl"
              asChild
            >
              <Link href="/products?category=Home & Garden">
                Shop All Home & Garden
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Flash Deals & Offers Section */}
      <section className="py-12 bg-red-500 dark:bg-red-900 border-8 border-yellow-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 bg-yellow-300 p-8">
            <h2 className="text-3xl font-bold text-foreground mb-2">
              🔥🔥🔥 Flash Deals & Offers 🔥🔥🔥
            </h2>
            <p className="text-foreground text-2xl">
              Don't miss out on these amazing limited-time offers
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link href="/sports" className="group block">
              <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-orange-500 via-red-600 to-red-700 p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 min-h-[240px] flex flex-col justify-between">
                <div>
                  <Badge className="bg-background/20 hover:bg-background/30 text-inverse border-white/30 backdrop-blur-sm mb-4">
                    <Dumbbell className="size-4 mr-1" />
                    Sports
                  </Badge>
                  <h3 className="text-2xl font-bold text-inverse mb-2">
                    Fitness Gear Sale
                  </h3>
                  <p className="text-inverse/90 text-sm mb-6">
                    Get fit with premium sports equipment at great prices
                  </p>
                </div>
                <div className="flex items-center justify-between">
                  <Button className="bg-background hover:bg-muted text-foreground font-semibold rounded-2xl">
                    Shop
                  </Button>
                  <div className="text-2xl font-bold text-inverse">
                    30% OFF
                  </div>
                </div>
              </div>
            </Link>

            <Link href="/home-garden" className="group block">
              <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-teal-500 via-teal-600 to-teal-700 p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 min-h-[240px] flex flex-col justify-between">
                <div>
                  <Badge className="bg-background/20 hover:bg-background/30 text-inverse border-white/30 backdrop-blur-sm mb-4">
                    <Home className="size-4 mr-1" />
                    Home
                  </Badge>
                  <h3 className="text-2xl font-bold text-inverse mb-2">
                    Home Essentials
                  </h3>
                  <p className="text-inverse/90 text-sm mb-6">
                    Upgrade your living space with quality items
                  </p>
                </div>
                <div className="flex items-center justify-between">
                  <Button className="bg-background hover:bg-muted text-foreground font-semibold rounded-2xl">
                    Browse
                  </Button>
                  <div className="text-2xl font-bold text-inverse">
                    Free Ship
                  </div>
                </div>
              </div>
            </Link>

            <Link href="/beauty" className="group block">
              <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-pink-500 via-pink-600 to-pink-700 p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 min-h-[240px] flex flex-col justify-between">
                <div>
                  <Badge className="bg-background/20 hover:bg-background/30 text-inverse border-white/30 backdrop-blur-sm mb-4">
                    <Flower className="size-4 mr-1" />
                    Beauty
                  </Badge>
                  <h3 className="text-2xl font-bold text-inverse mb-2">
                    Beauty Essentials
                  </h3>
                  <p className="text-inverse/90 text-sm mb-6">
                    Premium skincare and cosmetics for glowing skin
                  </p>
                </div>
                <div className="flex items-center justify-between">
                  <Button className="bg-background hover:bg-muted text-foreground font-semibold rounded-2xl">
                    Explore
                  </Button>
                  <div className="text-2xl font-bold text-inverse">
                    15% OFF
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Electronics Products Section */}
      <section className="py-12 bg-blue-500 dark:bg-blue-900 border-8 border-purple-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8 bg-purple-300 p-8">
            <h2 className="text-3xl font-bold text-foreground mb-2">
              ⚡⚡⚡ Electronics Products ⚡⚡⚡
            </h2>
            <p className="text-foreground text-2xl">
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

      {/* Featured Home & Garden Products */}
      <section className="py-12 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-2">
                Featured Home & Garden Products
              </h2>
              <p className="text-muted-foreground">
                Discover our curated collection of {products.length} premium items
              </p>
            </div>
            <Link href="/products?category=Home & Garden">
              <Button variant="outline" className="[border-radius:0!important]">
                View All Products
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {products.map((product) => (
              <Link key={product.id}
                href={`/products/${product.id}`}
                className="group relative bg-background dark:bg-card text-card-foreground [border-radius:0!important] shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden hover:scale-105 border-2 border-gray-200 dark:border-gray-700"
              >
                {/* Product Image */}
                <div className="relative aspect-square overflow-hidden bg-muted">
                  <ImageWithFallback
                    src={product.image}
                    alt={product.name}
                    className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-300"
                  />
                  {product.badge && (
                    <Badge className="absolute top-2 left-2 bg-[var(--primary-color)] text-inverse [border-radius:0!important] z-10 border-0">
                      {product.badge}
                    </Badge>
                  )}
                  {product.originalPrice && (
                    <Badge className="absolute top-2 right-2 bg-red-500 text-inverse [border-radius:0!important] z-10">
                      Sale
                    </Badge>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Quick Actions */}
                  <div className="absolute bottom-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        addItem(product.id, (product as any).sku || product.id, 1, {
                          id: product.id,
                          sku: (product as any).sku || product.id,
                          name: product.name,
                          price: product.price,
                          image: product.image,
                        });
                        toast.success("Added to cart!");
                      }}
                      className="p-2 bg-[var(--primary-color)] hover:bg-orange-600 text-inverse [border-radius:0!important] shadow-lg transition-colors border-0"
                    >
                      <ShoppingCart className="size-4" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        toast.success("Added to wishlist!");
                      }}
                      className="p-2 bg-background dark:bg-card text-card-foreground text-foreground hover:bg-muted dark:hover:bg-card text-card-foreground [border-radius:0!important] shadow-lg transition-colors"
                    >
                      <Heart className="size-4" />
                    </button>
                  </div>
                </div>

                {/* Product Info */}
                <div className="p-3 sm:p-4">
                  <h3 className="font-semibold text-sm sm:text-base text-foreground mb-1 line-clamp-2 group-hover:text-[var(--primary-color)] transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-xs text-muted-foreground mb-2">
                    {product.subcategory}
                  </p>
                  
                  {/* Rating */}
                  <div className="flex items-center gap-1 mb-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`size-3 sm:size-4 ${
                            i < Math.floor(product.rating)
                              ? "fill-[var(--primary-color)] text-[var(--primary-color)]"
                              : "fill-gray-300 text-muted dark:fill-gray-600 dark:text-muted-foreground"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-xs text-muted-foreground">
                      ({product.reviews})
                    </span>
                  </div>

                  {/* Price */}
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-lg sm:text-xl font-bold text-[var(--primary-color)]">
                        ${product.price.toFixed(2)}
                      </span>
                      {product.originalPrice && (
                        <span className="ml-2 text-xs sm:text-sm text-muted-foreground line-through">
                          ${product.originalPrice.toFixed(2)}
                        </span>
                      )}
                    </div>
                    {product.inStock ? (
                      <Badge variant="outline" className="text-xs bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 border-green-200 dark:border-green-800 [border-radius:0!important]">
                        In Stock
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="text-xs bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 border-red-200 dark:border-red-800 [border-radius:0!important]">
                        Out of Stock
                      </Badge>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Shop for Loved Ones Section */}
      <section className="py-12 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 dark:from-gray-950 dark:via-green-950/20 dark:to-emerald-950/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-foreground mb-8">
            Shop by Room
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <Link href="/products?subcategory=Living Room"
              className="group relative overflow-hidden rounded-3xl aspect-[4/3] hover:shadow-2xl transition-all duration-300 hover:scale-105"
            >
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800"
                alt="Living Room"
                className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/70 via-blue-900/30 to-transparent" />
              <div className="absolute bottom-6 left-6">
                <h3 className="text-3xl font-bold text-inverse mb-1">Living Room</h3>
                <p className="text-inverse/90 text-sm">Furniture & decor essentials</p>
              </div>
            </Link>

            <Link href="/products?subcategory=Bedroom"
              className="group relative overflow-hidden rounded-3xl aspect-[4/3] hover:shadow-2xl transition-all duration-300 hover:scale-105"
            >
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800"
                alt="Bedroom"
                className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-purple-900/70 via-purple-900/30 to-transparent" />
              <div className="absolute bottom-6 left-6">
                <h3 className="text-3xl font-bold text-inverse mb-1">Bedroom</h3>
                <p className="text-inverse/90 text-sm">Comfort & style for rest</p>
              </div>
            </Link>

            <Link href="/products?subcategory=Kitchen"
              className="group relative overflow-hidden rounded-3xl aspect-[4/3] hover:shadow-2xl transition-all duration-300 hover:scale-105"
            >
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1556911220-bff31c812dba?w=800"
                alt="Kitchen"
                className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-orange-900/70 via-orange-900/30 to-transparent" />
              <div className="absolute bottom-6 left-6">
                <h3 className="text-3xl font-bold text-inverse mb-1">Kitchen</h3>
                <p className="text-inverse/90 text-sm">Modern kitchen essentials</p>
              </div>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}


