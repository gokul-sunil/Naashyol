"use client";

import { Star, Heart, ShoppingCart, BookOpen, Home, Dumbbell, Sparkles } from "lucide-react";
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

export function BooksPage() {
  const categoryName = "Books";
  const products = getProductsByCategory(categoryName);
  const { addItem } = useCart();

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50 dark:from-gray-950 dark:via-amber-950/20 dark:to-yellow-950/20">
      {/* Books Section */}
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
              <Link href="/category?category=Books">
                View All
                <svg xmlns="http://www.w3.org/2000/svg" className="size-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
              </Link>
            </Button>
          </div>
          <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 gap-3">
            {[
              { name: "Fiction", image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400" },
              { name: "Non-Fiction", image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400" },
              { name: "Self-Help", image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400" },
              { name: "Biographies", image: "https://images.unsplash.com/photo-1519682337058-a94d519337bc?w=400" },
              { name: "Science", image: "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400" },
              { name: "History", image: "https://images.unsplash.com/photo-1461360370896-922624d12aa1?w=400" },
              { name: "Children", image: "https://images.unsplash.com/photo-1503455637927-730bce8583c0?w=400" },
              { name: "Comics", image: "https://images.unsplash.com/photo-1612178537253-bccd437b730e?w=400" },
              { name: "Poetry", image: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=400" },
              { name: "Mystery", image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400" },
              { name: "Romance", image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=400" },
              { name: "Thriller", image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400" },
              { name: "Fantasy", image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400" },
              { name: "Horror", image: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400" },
              { name: "Cookbooks", image: "https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?w=400" },
              { name: "Travel", image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400" },
            ].map((product) => (
              <Link key={product.name}
                href={`/category?category=Books&subcategory=${encodeURIComponent(product.name)}`}
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
      <section className="relative bg-gradient-to-br from-amber-600 via-orange-600 to-yellow-600 dark:from-amber-900 dark:via-orange-900 dark:to-yellow-900 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-inverse mb-4">
              Books & Literature
            </h1>
            <p className="text-xl text-inverse/90 mb-8">
              Discover your next great read
            </p>
            <Button
              size="lg"
              className="bg-background text-amber-600 hover:bg-muted rounded-2xl"
              asChild
            >
              <Link href="/products?category=Books">Shop All Books</Link>
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
                Browse Genres
              </h2>
              <p className="text-muted-foreground">
                Find exactly what you're looking for
              </p>
            </div>
            <Button variant="ghost" className="text-[var(--primary-color)]" asChild>
              <Link href="/category?category=Books">
                View All
                <svg xmlns="http://www.w3.org/2000/svg" className="size-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
              </Link>
            </Button>
          </div>
          <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 gap-3">
            {[
              { name: "Fiction", image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400" },
              { name: "Non-Fiction", image: "https://images.unsplash.com/photo-1589998059171-988d887df646?w=400" },
              { name: "Self-Help", image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400" },
              { name: "Biography", image: "https://images.unsplash.com/photo-1471107340929-a87cd0f5b5f3?w=400" },
              { name: "Mystery", image: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400" },
              { name: "Romance", image: "https://images.unsplash.com/photo-1474552226712-ac0f0961a954?w=400" },
              { name: "Science Fiction", image: "https://images.unsplash.com/photo-1619946794135-5bc917a27793?w=400" },
              { name: "Fantasy", image: "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400" },
              { name: "History", image: "https://images.unsplash.com/photo-1461360228754-6e81c478b882?w=400" },
              { name: "Business", image: "https://images.unsplash.com/photo-1589998059171-988d887df646?w=400" },
              { name: "Cookbooks", image: "https://images.unsplash.com/photo-1606787366850-de6330128bfc?w=400" },
              { name: "Travel", image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400" },
              { name: "Poetry", image: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=400" },
              { name: "Children", image: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=400" },
              { name: "Young Adult", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400" },
              { name: "Education", image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=400" },
              { name: "Comics", image: "https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?w=400" },
              { name: "Art & Design", image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=400" },
            ].map((category) => (
              <Link key={category.name}
                href={`/category?category=Books&subcategory=${encodeURIComponent(category.name)}`}
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
      <section className="py-12 bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 dark:from-gray-950 dark:via-amber-950/20 dark:to-orange-950/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-amber-600 via-orange-600 to-red-600 dark:from-amber-800 dark:via-orange-800 dark:to-red-800 p-12 md:p-16">
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
                BESTSELLER COLLECTION 2026
              </p>
              <h2 className="text-4xl md:text-6xl font-bold text-inverse mb-6">
                Book Bundle Sale
              </h2>
              <p className="text-inverse/90 text-lg mb-8">
                Expand your library with our exclusive book collection. Limited time offer!
              </p>
              <div className="flex items-center gap-4">
                <Badge className="bg-[var(--primary-color)] hover:bg-orange-600 text-inverse text-2xl px-6 py-2">
                  30% OFF
                </Badge>
                <Button size="lg" className="bg-[var(--primary-color)] hover:bg-orange-600 text-inverse">
                  <ShoppingCart className="size-5 mr-2" />
                  Grab Deals
                </Button>
              </div>
            </div>
            <div className="absolute right-0 top-0 bottom-0 w-1/2 opacity-20">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800"
                alt="Books"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Shop by Genre Section */}
      <section className="py-12 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-foreground mb-8">
            Popular Genres
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                name: "Fiction & Literature",
                image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=800",
                description: "Explore fiction collection",
              },
              {
                name: "Business & Finance",
                image: "https://images.unsplash.com/photo-1589998059171-988d887df646?w=800",
                description: "Discover business books",
              },
              {
                name: "Self Development",
                image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800",
                description: "Browse self-help guides",
              },
            ].map((genre) => (
              <Link key={genre.name}
                href={`/products?genre=${genre.name.toLowerCase()}`}
                className="group relative overflow-hidden rounded-3xl aspect-[4/3] hover:shadow-2xl transition-all duration-300 hover:scale-105"
              >
                <ImageWithFallback
                  src={genre.image}
                  alt={genre.name}
                  className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                <div className="absolute bottom-6 left-6">
                  <h3 className="text-3xl font-bold text-inverse mb-1">{genre.name}</h3>
                  <p className="text-inverse/90 text-sm">{genre.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Shop by Genre Section */}
      <section className="py-12 bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 dark:from-gray-950 dark:via-amber-950/20 dark:to-orange-950/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-foreground mb-8">
            Shop by Genre
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <Link href="/products?subcategory=Fiction"
              className="group relative overflow-hidden rounded-3xl aspect-[4/3] hover:shadow-2xl transition-all duration-300 hover:scale-105"
            >
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1512820790803-83ca734da794?w=800"
                alt="Fiction"
                className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/70 via-indigo-900/30 to-transparent" />
              <div className="absolute bottom-6 left-6">
                <h3 className="text-3xl font-bold text-inverse mb-1">Fiction</h3>
                <p className="text-inverse/90 text-sm">Escape into imaginary worlds</p>
              </div>
            </Link>

            <Link href="/products?subcategory=Non-Fiction"
              className="group relative overflow-hidden rounded-3xl aspect-[4/3] hover:shadow-2xl transition-all duration-300 hover:scale-105"
            >
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800"
                alt="Non-Fiction"
                className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-amber-900/70 via-amber-900/30 to-transparent" />
              <div className="absolute bottom-6 left-6">
                <h3 className="text-3xl font-bold text-inverse mb-1">Non-Fiction</h3>
                <p className="text-inverse/90 text-sm">Discover real stories & facts</p>
              </div>
            </Link>

            <Link href="/products?subcategory=Children"
              className="group relative overflow-hidden rounded-3xl aspect-[4/3] hover:shadow-2xl transition-all duration-300 hover:scale-105"
            >
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1503455637927-730bce8583c0?w=800"
                alt="Children's Books"
                className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-orange-900/70 via-orange-900/30 to-transparent" />
              <div className="absolute bottom-6 left-6">
                <h3 className="text-3xl font-bold text-inverse mb-1">Children's Books</h3>
                <p className="text-inverse/90 text-sm">Inspire young readers</p>
              </div>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}


