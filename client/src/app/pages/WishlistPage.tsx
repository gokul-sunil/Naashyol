"use client";

import { Heart, ShoppingCart, Trash2, ArrowRight, Star } from "lucide-react";
import Link from "next/link";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { toast } from "sonner";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { useCart } from "../contexts/CartContext";
import { useWishlist } from "../contexts/WishlistContext";

export function WishlistPage() {
  const { addItem } = useCart();
  const { wishlist, removeFromWishlist } = useWishlist();

  const handleRemove = (id: string) => {
    removeFromWishlist(id);
  };

  const handleAddToCart = (id: string) => {
    const product = wishlist.find((item) => item.id === id);
    if (product) {
      addItem(product.id, (product as any).sku || product.id, 1, {
        id: product.id,
        sku: (product as any).sku || product.id,
        name: product.name,
        price: product.price,
        image: product.image,
      });
      toast.success("Added to cart!");
    }
  };

  if (wishlist.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 flex items-center justify-center p-4 pb-24 md:pb-4">
        <div className="glass-card p-12 text-center max-w-md rounded-3xl border border-gray-200/50 dark:border-gray-700/50 shadow-xl">
          <div className="p-6 bg-gradient-to-br from-pink-100 to-pink-200 dark:from-pink-900/30 dark:to-pink-800/30 rounded-full w-fit mx-auto mb-6">
            <Heart className="size-16 text-pink-400 dark:text-pink-500" />
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-2">
            Your wishlist is empty
          </h2>
          <p className="text-muted-foreground mb-6">
            Start adding products you love
          </p>
          <Button className="bg-gradient-to-r from-[var(--primary-color)] to-orange-600 hover:from-orange-600 hover:to-orange-700 text-inverse shadow-lg hover:shadow-xl transition-all border-0" asChild>
            <Link href="/products">Browse Products</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 pb-24 md:pb-0">
      {/* Hero Header */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-pink-600 dark:from-pink-600 dark:to-pink-800"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnptLTEyIDEyYzMuMzE0IDAgNiAyLjY4NiA2IDZzLTIuNjg2IDYtNiA2LTYtMi42ODYtNi02IDIuNjg2LTYgNi02eiIgZmlsbD0iI2ZmZiIgZmlsbC1vcGFjaXR5PSIuMDUiLz48L2c+PC9zdmc+')] opacity-30"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          <div className="flex items-center gap-4">
            <div className="p-4 bg-background/20 backdrop-blur-sm rounded-2xl">
              <Heart className="size-8 md:size-10 text-inverse" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-inverse drop-shadow-lg">My Wishlist</h1>
              <p className="text-inverse/90 text-sm md:text-base mt-1">
                {wishlist.length} {wishlist.length === 1 ? "item" : "items"} saved
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {wishlist.map((product) => (
            <div
              key={product.id}
              className="glass-card group overflow-hidden hover:shadow-2xl transition-all duration-300 rounded-2xl border border-gray-200/50 dark:border-gray-700/50"
            >
              <Link href={`/products/${product.id}`} className="relative block aspect-square overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900">
                <Button
                  size="icon"
                  variant="secondary"
                  className="absolute top-3 right-3 z-10 glass-sm hover:bg-red-50 dark:hover:bg-red-900/20 size-9 rounded-xl"
                  onClick={(e) => {
                    e.preventDefault();
                    handleRemove(product.id);
                  }}
                >
                  <Trash2 className="size-4 text-red-600" />
                </Button>
                <ImageWithFallback
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </Link>
              <div className="p-4">
                <Badge variant="outline" className="mb-2 text-xs bg-gradient-to-r from-[var(--primary-color)]/10 to-orange-600/10 text-[var(--primary-color)] border-[var(--primary-color)]/20">
                  {product.category}
                </Badge>
                <h3 className="font-semibold text-foreground mb-2 line-clamp-2">
                  <Link
                    href={`/products/${product.id}`}
                    className="hover:text-[var(--primary-color)] transition-colors"
                  >
                    {product.name}
                  </Link>
                </h3>
                <div className="flex items-center gap-1 mb-3">
                  {product.rating && [...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`size-4 ${
                        i < Math.floor(product.rating || 0)
                          ? "fill-[var(--primary-color)] text-[var(--primary-color)]"
                          : "text-muted dark:text-muted-foreground"
                      }`}
                    />
                  ))}
                  {product.reviews && (
                    <span className="text-sm text-muted-foreground">
                      ({product.reviews})
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xl font-bold text-[var(--primary-color)]">
                    ${product.price}
                  </span>
                  {product.originalPrice && (
                    <>
                      <span className="text-sm text-muted-foreground line-through">
                        ${product.originalPrice}
                      </span>
                      <Badge className="ml-auto bg-gradient-to-r from-green-500 to-green-600 text-inverse text-xs">
                        {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                      </Badge>
                    </>
                  )}
                </div>
                <Button
                  className="w-full bg-gradient-to-r from-[var(--primary-color)] to-orange-600 hover:from-orange-600 hover:to-orange-700 text-inverse shadow-md hover:shadow-lg transition-all border-0"
                  onClick={() => handleAddToCart(product.id)}
                >
                  <ShoppingCart className="size-4 mr-2" />
                  Add to Cart
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}


