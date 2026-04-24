"use client";

import { ArrowRight, Star, Heart, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export function FeaturedProductsSection() {
  return (
    <div className="px-4 py-6 bg-transparent">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="text-2xl">⭐</span>
          <h2 className="text-2xl font-bold text-foreground">Featured Products</h2>
        </div>
        <Link href="/products" className="text-[var(--primary-color)] text-sm font-semibold hover:underline">
          View All →
        </Link>
      </div>
      <p className="text-sm text-muted-foreground mb-6">Hand-picked items just for you</p>
      
      <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide -mx-4 px-4">
        {[
          {
            id: "1",
            name: "Premium Wireless Headphones",
            image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop",
            price: 299.99,
            originalPrice: 399.99,
            category: "Electronics",
            rating: 4.8,
            reviews: 256,
            badge: "Best Seller",
            bgColor: "bg-yellow-400"
          },
          {
            id: "2",
            name: "Designer Leather Jacket",
            image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=300&h=300&fit=crop",
            price: 249.99,
            originalPrice: 349.99,
            category: "Fashion",
            rating: 4.9,
            reviews: 189,
            badge: "Trending",
            bgColor: "bg-card text-card-foreground"
          },
          {
            id: "3",
            name: "Modern Accent Chair",
            image: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=300&h=300&fit=crop",
            price: 449.99,
            originalPrice: 599.99,
            category: "Home & Furniture",
            rating: 4.7,
            reviews: 142,
            badge: "New Arrival",
            bgColor: "bg-orange-400"
          },
          {
            id: "4",
            name: "Professional Yoga Mat",
            image: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=300&h=300&fit=crop",
            price: 79.99,
            originalPrice: 99.99,
            category: "Sports",
            rating: 4.6,
            reviews: 328,
            badge: "",
            bgColor: "bg-border"
          }
        ].map((product) => (
          <Link key={product.id}
            href={`/products/${product.id}`}
            className="flex-shrink-0 w-[280px] group"
          >
            <div className="glass-card rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
              <div className={`relative ${product.bgColor} p-4 h-[200px] flex items-center justify-center`}>
                {product.badge && (
                  <span className="absolute top-3 left-3 bg-[var(--primary-color)] text-inverse text-xs font-bold px-3 py-1 rounded-full">
                    {product.badge}
                  </span>
                )}
                <ImageWithFallback
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="p-4 bg-background dark:bg-card text-card-foreground">
                <p className="text-xs text-muted-foreground mb-1">{product.category}</p>
                <h3 className="font-bold text-base text-foreground mb-2 line-clamp-1">
                  {product.name}
                </h3>
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`size-3 ${
                          i < Math.floor(product.rating)
                            ? "fill-[var(--primary-color)] text-[var(--primary-color)]"
                            : "text-muted dark:text-muted-foreground"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {product.rating} ({product.reviews})
                  </span>
                </div>
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <span className="text-xl font-bold text-foreground">
                      ${product.price}
                    </span>
                    <span className="text-sm text-muted-foreground dark:text-muted-foreground line-through ml-2">
                      ${product.originalPrice}
                    </span>
                  </div>
                </div>
                <button className="w-full bg-gradient-to-r from-[var(--primary-color)] to-orange-600 text-inverse font-semibold py-2.5 rounded-lg hover:shadow-lg transition-all">
                  Add to Cart
                </button>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export function CategoryGridSection({ title, category, items }: {
  title: string;
  category: string;
  items: { name: string; image: string }[];
}) {
  return (
    <div className="px-4 py-6 bg-transparent">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-foreground">{title}</h2>
        <Link href={`/products?category=${category}`} className="text-[var(--primary-color)] text-sm font-semibold hover:underline">
          View All →
        </Link>
      </div>
      <div className="grid grid-cols-4 gap-3">
        {items.map((item, index) => (
          <Link
            key={index}
            href={`/products?category=${category}&subcategory=${item.name}`}
            className="group"
          >
            <div className="relative rounded-xl overflow-hidden aspect-square shadow-md hover:shadow-lg transition-all">
              <ImageWithFallback
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                <span className="text-inverse text-xs font-semibold p-2 w-full text-center">
                  {item.name}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}


