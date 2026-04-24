"use client";

import { Star, Heart, ShoppingCart, Smartphone, Laptop, Headphones, Camera, Watch, Tablet, Home, Dumbbell, Sparkles } from "lucide-react";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import Link from "next/link";

import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { PageHeader } from "../components/PageHeader";
import { FlashDealsSection } from "../components/FlashDealsSection";
import { ShopByCategorySection } from "../components/ShopByCategorySection";
import { getProductsByCategory, getSubcategoriesByCategory, getBrandsByCategory } from "../data/products";
import { useCart } from "../contexts/CartContext";
import { useWishlist } from "../contexts/WishlistContext";
import { toast } from "sonner";

export function ElectronicsPage() {
  const categoryName = "Electronics";
  const products = getProductsByCategory(categoryName);
  const subcategories = getSubcategoriesByCategory(categoryName);
  const brands = getBrandsByCategory(categoryName);
  const { addItem } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  // Get subcategory images from actual products
  const subcategoryData = subcategories.map((subcat) => {
    const product = products.find((p) => p.subcategory === subcat);
    return {
      name: subcat,
      image: product?.image || "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=500",
    };
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-indigo-50 dark:from-gray-950 dark:via-blue-950/20 dark:to-indigo-950/20">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-cyan-600 to-indigo-600 dark:from-blue-900 dark:via-cyan-900 dark:to-indigo-900 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-inverse mb-4">
              Electronics & Technology
            </h1>
            <p className="text-xl text-inverse/90 mb-8">
              Discover the latest in tech innovation
            </p>
            <Button
              size="lg"
              className="bg-background text-blue-600 hover:bg-muted rounded-2xl"
              asChild
            >
              <Link href="/products?category=Electronics">Shop All Electronics</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Category Grid Section */}
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
              <Link href="/category?category=Electronics">
                View All
                <svg xmlns="http://www.w3.org/2000/svg" className="size-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
              </Link>
            </Button>
          </div>
          <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 gap-3">
            {[
              { name: "Smartphones", image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400" },
              { name: "Laptops", image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400" },
              { name: "Headphones", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400" },
              { name: "Smart Watches", image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=400" },
              { name: "Cameras", image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=400" },
              { name: "Gaming", image: "https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=400" },
              { name: "Tablets", image: "https://images.unsplash.com/photo-1561154464-82e9adf32764?w=400" },
              { name: "Smart Home", image: "https://images.unsplash.com/photo-1558089687-e5c0c58d7c49?w=400" },
              { name: "TV & Audio", image: "https://images.unsplash.com/photo-1593784991095-a205069470b6?w=400" },
              { name: "Drones", image: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=400" },
              { name: "Accessories", image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400" },
              { name: "Power Banks", image: "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=400" },
              { name: "Speakers", image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400" },
              { name: "Keyboards", image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400" },
              { name: "Monitors", image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400" },
              { name: "Printers", image: "https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?w=400" },
              { name: "Mice", image: "https://images.unsplash.com/photo-1527814050087-3793815479db?w=400" },
              { name: "Storage", image: "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=400" },
            ].map((category) => (
              <Link key={category.name}
                href={`/category?category=Electronics&subcategory=${encodeURIComponent(category.name)}`}
                className="group flex flex-col items-center"
              >
                <div className="relative w-full aspect-square rounded-2xl overflow-hidden mb-2 bg-muted hover:shadow-xl transition-all duration-300 hover:scale-105">
                  <ImageWithFallback
                    src={category.image}
                    alt={category.name}
                    className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <p className="text-xs text-center text-foreground font-medium line-clamp-2">
                  {category.name}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Flash Deals & Offers Section */}
      <FlashDealsSection />

      {/* Shop by Category Section */}
      <ShopByCategorySection />

      {/* Promotional Hot Deals Carousel */}
      <section className="py-12 bg-gradient-to-br from-blue-50 via-cyan-50 to-indigo-50 dark:from-gray-950 dark:via-blue-950/20 dark:to-indigo-950/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 dark:from-blue-800 dark:via-indigo-800 dark:to-purple-800 p-12 md:p-16">
            <div className="absolute top-4 left-4">
              <Badge className="bg-[var(--primary-color)] hover:bg-orange-600 text-inverse border-0">
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
                PREMIUM QUALITY ELECTRONICS
              </p>
              <h2 className="text-4xl md:text-6xl font-bold text-inverse mb-6">
                Gaming Tech Sale
              </h2>
              <p className="text-inverse/90 text-lg mb-8">
                Upgrade your setup with our exclusive electronics collection. Limited time offer!
              </p>
              <div className="flex items-center gap-4">
                <Badge className="bg-[var(--primary-color)] hover:bg-orange-600 text-inverse text-2xl px-6 py-2 border-0">
                  40% OFF
                </Badge>
                <Button size="lg" className="bg-[var(--primary-color)] hover:bg-orange-600 text-inverse border-0">
                  <ShoppingCart className="size-5 mr-2" />
                  Grab Deals
                </Button>
              </div>
            </div>
            <div className="absolute right-0 top-0 bottom-0 w-1/2 opacity-20">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=800"
                alt="Gaming Setup"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Shop by Tech Giants Section */}
      <section className="py-12 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-foreground mb-8">
            Shop by Tech Giants
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                name: "Apple Devices",
                image: "https://images.unsplash.com/photo-1611472173362-3f53dbd65d80?w=800",
                description: "Discover Apple collection",
              },
              {
                name: "Gaming Gear",
                image: "https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=800",
                description: "Explore gaming collection",
              },
              {
                name: "Smart Tech",
                image: "https://images.unsplash.com/photo-1558089687-e5c0c58d7c49?w=800",
                description: "Browse smart devices",
              },
            ].map((category) => (
              <Link key={category.name}
                href={`/products?collection=${category.name.toLowerCase()}`}
                className="group relative overflow-hidden rounded-3xl aspect-[4/3] hover:shadow-2xl transition-all duration-300 hover:scale-105"
              >
                <ImageWithFallback
                  src={category.image}
                  alt={category.name}
                  className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                <div className="absolute bottom-6 left-6">
                  <h3 className="text-3xl font-bold text-inverse mb-1">{category.name}</h3>
                  <p className="text-inverse/90 text-sm">{category.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Shop for Loved Ones Section */}
      <section className="py-12 bg-gradient-to-br from-blue-50 via-cyan-50 to-indigo-50 dark:from-gray-950 dark:via-blue-950/20 dark:to-indigo-950/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-foreground mb-8">
            Shop for Loved Ones
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <Link href="/products?gender=men"
              className="group relative overflow-hidden rounded-3xl aspect-[4/3] hover:shadow-2xl transition-all duration-300 hover:scale-105"
            >
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1635913906376-53130718255a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZW5zJTIwZmFzaGlvbiUyMG1vZGVsfGVufDF8fHx8MTc3MTUwMDQwM3ww&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Men's Collection"
                className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/70 via-blue-900/30 to-transparent" />
              <div className="absolute bottom-6 left-6">
                <h3 className="text-3xl font-bold text-inverse mb-1">Men</h3>
                <p className="text-inverse/90 text-sm">Discover men's collection</p>
              </div>
            </Link>

            <Link href="/products?gender=women"
              className="group relative overflow-hidden rounded-3xl aspect-[4/3] hover:shadow-2xl transition-all duration-300 hover:scale-105"
            >
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1655026950620-b39ab24e9b4b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21lbnMlMjBmYXNoaW9uJTIwbW9kZWx8ZW58MXx8fHwxNzcxNTAwNDAzfDA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Women's Collection"
                className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500 grayscale"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
              <div className="absolute bottom-6 left-6">
                <h3 className="text-3xl font-bold text-inverse mb-1">Women</h3>
                <p className="text-inverse/90 text-sm">Explore women's collection</p>
              </div>
            </Link>

            <Link href="/products?collection=genz"
              className="group relative overflow-hidden rounded-3xl aspect-[4/3] hover:shadow-2xl transition-all duration-300 hover:scale-105"
            >
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1610738572401-5dfeeb660c7d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnZW4lMjB6JTIweY91dGglMjBmYXNoaW9ufGVufDF8fHx8MTc3MTUwMDQwM3ww&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Gen Z Fashion"
                className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-green-900/70 via-green-900/30 to-transparent" />
              <div className="absolute bottom-6 left-6">
                <div className="inline-block bg-green-400 text-foreground font-bold px-3 py-1 rounded-full text-sm mb-2">
                  spoyl
                </div>
                <h3 className="text-3xl font-bold text-inverse mb-1">Gen Z Drips</h3>
                <p className="text-inverse/90 text-sm">Trending Gen Z styles</p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-12 bg-gradient-to-br from-blue-50 via-cyan-50 to-indigo-50 dark:from-gray-950 dark:via-blue-950/20 dark:to-indigo-950/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-foreground">
              Featured Electronics
            </h2>
            <Link href="/products?category=Electronics">
              <Button variant="outline">View All</Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <Link key={product.id}
                href={`/products/${product.id}`}
                className="group relative bg-background dark:bg-card text-card-foreground rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden hover:scale-105"
              >
                {product.badge && (
                  <Badge className="absolute top-4 left-4 z-10 bg-[var(--primary-color)] hover:bg-orange-600 text-inverse border-0">
                    {product.badge}
                  </Badge>
                )}
                <Button
                  size="icon"
                  variant="ghost"
                  className="absolute top-4 right-4 z-10 size-10 rounded-full bg-background/90 dark:bg-card text-card-foreground/90 hover:bg-background dark:hover:bg-card text-card-foreground"
                  onClick={(e) => {
                    e.preventDefault();
                    toggleWishlist({
                      id: product.id,
                      name: product.name,
                      price: product.price,
                      originalPrice: product.originalPrice,
                      image: product.image,
                      category: product.category,
                      rating: product.rating,
                      reviews: product.reviews,
                    });
                  }}
                >
                  <Heart
                    className="size-5 text-muted-foreground dark:text-muted"
                    fill={isInWishlist(product.id) ? "var(--primary-color)" : "none"}
                  />
                </Button>
                <div className="aspect-square overflow-hidden">
                  <ImageWithFallback
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-semibold text-lg text-foreground mb-2 line-clamp-1">
                    {product.name}
                  </h3>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`size-4 ${
                            i < Math.floor(product.rating)
                              ? "fill-[var(--primary-color)] text-[var(--primary-color)]"
                              : "text-muted dark:text-muted-foreground"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-muted-foreground">
                      ({product.reviews})
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-2xl font-bold text-foreground">
                          ${product.price}
                        </span>
                        {product.originalPrice && (
                          <span className="text-sm text-muted-foreground line-through">
                            ${product.originalPrice}
                          </span>
                        )}
                      </div>
                      {product.originalPrice && (
                        <span className="text-xs text-green-600 dark:text-green-400 font-semibold">
                          Save ${(product.originalPrice - product.price).toFixed(2)}
                        </span>
                      )}
                    </div>
                    <Button
                      size="icon"
                      className="size-12 rounded-full bg-[var(--primary-color)] hover:bg-orange-600 text-inverse border-0"
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
                        toast.success(`${product.name} added to cart!`);
                      }}
                    >
                      <ShoppingCart className="size-5" />
                    </Button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}


