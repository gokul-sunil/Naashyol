"use client";

import { useState } from "react";
import Link from "next/link";
import { Star, Heart, ShoppingCart, Eye } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useCart } from "../contexts/CartContext";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";

interface Product {
  id: string;
  name: string;
  image: string;
  price: number;
  originalPrice?: number;
  category: string;
  rating: number;
  reviews: number;
  badge?: string;
  inStock?: boolean;
  description?: string;
}

interface ProductCardProps {
  product: Product;
  onLike?: (productId: string, productName: string) => void;
  isLiked?: boolean;
  showQuickView?: boolean;
  variant?: "default" | "compact" | "grid";
}

export function ProductCard({
  product,
  onLike,
  isLiked = false,
  showQuickView = false,
  variant = "default",
}: ProductCardProps) {
  const { addItem } = useCart();
  const [showQuickViewModal, setShowQuickViewModal] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [isLiking, setIsLiking] = useState(false);

  const inStock = product.inStock !== false;
  const hasDiscount = product.originalPrice && product.originalPrice > product.price;
  const discountPercentage = hasDiscount
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  // Handle add to cart with animation and feedback
  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!inStock) {
      toast.error("Product out of stock", {
        description: "This item is currently unavailable",
      });
      return;
    }

    setIsAddingToCart(true);

    // For ProductCard, we might not have the SKU. 
    // In a real scenario, we should either:
    // 1. Redirect to product detail
    // 2. Fetch the product to get the default variant
    // For now, if SKU is missing, we'll try to find it or redirect.
    
    try {
      // If the product has a default SKU or we are in a context where we know it
      const sku = (product as any).sku || (product as any).defaultVariant?.sku;
      
      if (sku) {
        await addItem(product.id, sku, 1, {
          id: product.id,
          sku: sku,
          name: product.name,
          price: product.price,
          image: product.image,
        });
        toast.success(`Added to cart!`, {
          description: product.name,
          duration: 2000,
        });
      } else {
        // If no SKU but we have a product ID, we can try to use a default SKU if available
        // or just redirect as a last resort. 
        const defaultSku = (product as any).id; // Fallback to ID if no SKU
        
        await addItem(product.id, defaultSku, 1, {
          id: product.id,
          sku: defaultSku,
          name: product.name,
          price: product.price,
          image: product.image,
        });
        
        toast.success(`Added to cart!`, {
          description: product.name,
          duration: 2000,
        });
      }
    } catch (err: any) {
      toast.error(err.message || "Failed to add to cart");
    } finally {
      setIsAddingToCart(false);
    }
  };

  // Handle wishlist toggle with animation
  const handleToggleLike = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!onLike) return;

    setIsLiking(true);

    // Simulate a small delay for better UX feedback
    await new Promise((resolve) => setTimeout(resolve, 200));

    onLike(product.id, product.name);

    setIsLiking(false);
  };

  // Handle quick view
  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setShowQuickViewModal(true);
  };

  // Render stars for rating
  const renderStars = () => {
    return (
      <div className="flex items-center gap-0.5">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`size-3.5 ${
              i < Math.floor(product.rating)
                ? "fill-[var(--primary-color)] text-[var(--primary-color)]"
                : "text-muted dark:text-muted-foreground"
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <>
      <Link href={`/products/${product.id}`} className="block group">
        <div
          className={`glass-card rounded-xl sm:rounded-2xl overflow-hidden transition-all duration-300 h-full flex flex-col ${
            variant === "compact" ? "p-2 sm:p-3" : "p-3 sm:p-4"
          }`}
        >
          {/* Product Image Container */}
          <div className="relative mb-3 sm:mb-4 rounded-lg sm:rounded-xl overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900">
            <div className="aspect-square relative">
              {/* Badges */}
              <div className="absolute top-1.5 left-1.5 sm:top-2 sm:left-2 z-10 flex flex-col gap-1 sm:gap-2">
                {product.badge && (
                  <Badge className="bg-gradient-to-r from-[var(--primary-color)] to-orange-600 text-inverse text-[9px] sm:text-xs font-semibold px-2 sm:px-3 py-0.5 sm:py-1 shadow-lg border-0">
                    {product.badge}
                  </Badge>
                )}
                {!inStock && (
                  <Badge className="bg-red-500 text-inverse text-[9px] sm:text-xs font-semibold px-2 sm:px-3 py-0.5 sm:py-1 shadow-lg">
                    Out of Stock
                  </Badge>
                )}
              </div>

              {/* Product Image */}
              <ImageWithFallback
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />

              {/* Action Overlay - Always visible for better accessibility */}
              <div className="absolute inset-0 bg-black/5 dark:bg-black/10 opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2 pointer-events-none group-hover:pointer-events-auto">
                {/* Wishlist Button */}
                {onLike && (
                  <button
                    onClick={handleToggleLike}
                    disabled={isLiking}
                    className={`p-2 sm:p-3 rounded-full backdrop-blur-sm transition-all duration-300 transform hover:scale-110 active:scale-95 touch-manipulation ${\n                      isLiked
                        ? "bg-red-500 text-inverse"
                        : "bg-background/90 dark:bg-card text-card-foreground/90 text-foreground hover:bg-red-500 hover:text-inverse"
                    } ${isLiking ? "animate-pulse" : ""}`}
                    style={{
                      WebkitTapHighlightColor: 'rgba(239, 68, 68, 0.2)',
                      touchAction: 'manipulation',
                    }}
                    aria-label={isLiked ? "Remove from wishlist" : "Add to wishlist"}
                  >
                    <Heart
                      className={`size-4 sm:size-5 transition-all ${\n                        isLiked ? "fill-white" : ""\n                      }`}
                    />
                  </button>
                )}

                {/* Quick View Button */}
                {showQuickView && (
                  <button
                    onClick={handleQuickView}
                    className="p-2 sm:p-3 bg-background/90 dark:bg-card text-card-foreground/90 rounded-full backdrop-blur-sm hover:bg-[var(--primary-color)] hover:text-inverse transition-all duration-300 transform hover:scale-110 active:scale-95 touch-manipulation border border-white/10"
                    style={{
                      WebkitTapHighlightColor: 'rgba(247, 147, 26, 0.2)',
                      touchAction: 'manipulation',
                    }}
                    aria-label="Quick view"
                  >
                    <Eye className="size-4 sm:size-5" />
                  </button>
                )}

                {/* Quick Add to Cart Button */}
                <button
                  onClick={handleAddToCart}
                  disabled={!inStock || isAddingToCart}
                  className={`p-2 sm:p-3 rounded-full backdrop-blur-sm transition-all duration-300 transform hover:scale-110 active:scale-95 touch-manipulation border border-white/10 ${
                    !inStock
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-[var(--primary-color)] hover:bg-orange-600 text-inverse"
                  } ${isAddingToCart ? "animate-pulse" : ""}`}
                  style={{
                    WebkitTapHighlightColor: 'rgba(247, 147, 26, 0.2)',
                    touchAction: 'manipulation',
                  }}
                  aria-label="Add to cart"
                >
                  <ShoppingCart className="size-4 sm:size-5" />
                </button>
              </div>

              {/* Discount Badge */}
              {hasDiscount && inStock && (
                <div className="absolute top-1.5 right-1.5 sm:top-2 sm:right-2 bg-red-500 text-inverse text-[10px] sm:text-xs font-bold px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-lg shadow-lg">
                  -{discountPercentage}%
                </div>
              )}
            </div>
          </div>

          {/* Product Info */}
          <div className="flex-1 flex flex-col space-y-2 sm:space-y-3">
            {/* Category */}
            <span className="text-[10px] sm:text-xs text-[var(--primary-color)] font-semibold uppercase tracking-wide">
              {product.category}
            </span>

            {/* Product Name */}
            <h3 className="text-sm sm:text-base font-semibold text-foreground line-clamp-2 min-h-[2.5rem] sm:min-h-[3rem] leading-snug">
              {product.name}
            </h3>

            {/* Rating */}
            <div className="flex items-center gap-1 sm:gap-2">
              {renderStars()}
              <span className="text-[10px] sm:text-xs text-muted-foreground font-medium">
                {product.rating} ({product.reviews})
              </span>
            </div>

            {/* Price Section */}
            <div className="flex items-end justify-between pt-1 sm:pt-2 mt-auto">
              <div className="flex flex-col gap-0.5 sm:gap-1">
                <span className="text-lg sm:text-2xl font-bold text-[var(--primary-color)]">
                  ${product.price.toFixed(2)}
                </span>
                {hasDiscount && (
                  <span className="text-xs sm:text-sm text-muted-foreground dark:text-muted-foreground line-through">
                    ${product.originalPrice.toFixed(2)}
                  </span>
                )}
              </div>
              {hasDiscount && (
                <div className="bg-green-50 dark:bg-green-900/20 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-lg">
                  <span className="text-[10px] sm:text-xs font-bold text-green-600 dark:text-green-400">
                    SAVE ${(product.originalPrice - product.price).toFixed(2)}
                  </span>
                </div>
              )}
            </div>

            {/* Add to Cart Button (Mobile/Visible) */}
            <Button
              onClick={handleAddToCart}
              disabled={!inStock || isAddingToCart}
              className={`w-full mt-2 sm:mt-3 transition-all duration-300 h-8 sm:h-10 text-xs sm:text-sm active:scale-95 touch-manipulation border-0 ${
                !inStock
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-[var(--primary-color)] to-orange-600 hover:from-orange-600 hover:to-orange-700 text-inverse"
              } ${isAddingToCart ? "opacity-70" : ""}`}
              style={{
                WebkitTapHighlightColor: 'rgba(247, 147, 26, 0.2)',
                touchAction: 'manipulation',
              }}
            >
              <ShoppingCart className="size-3 sm:size-4 mr-1 sm:mr-2" />
              {!inStock
                ? "Out of Stock"
                : isAddingToCart
                ? "Adding..."
                : "Add to Cart"}
            </Button>
          </div>
        </div>
      </Link>

      {/* Quick View Modal */}
      {showQuickView && (
        <Dialog open={showQuickViewModal} onOpenChange={setShowQuickViewModal}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-foreground">
                {product.name}
              </DialogTitle>
              <DialogDescription>
                Quick view product details
              </DialogDescription>
            </DialogHeader>
            <div className="grid md:grid-cols-2 gap-6 py-4">
              {/* Image */}
              <div className="rounded-xl overflow-hidden bg-muted">
                <ImageWithFallback
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Details */}
              <div className="space-y-4">
                <div>
                  <span className="text-sm text-[var(--primary-color)] font-semibold uppercase">
                    {product.category}
                  </span>
                  <h3 className="text-xl font-bold text-foreground mt-1">
                    {product.name}
                  </h3>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-2">
                  {renderStars()}
                  <span className="text-sm text-muted-foreground">
                    {product.rating} ({product.reviews} reviews)
                  </span>
                </div>

                {/* Price */}
                <div className="flex items-center gap-3">
                  <span className="text-3xl font-bold text-[var(--primary-color)]">
                    ${product.price.toFixed(2)}
                  </span>
                  {hasDiscount && (
                    <>
                      <span className="text-xl text-muted-foreground line-through">
                        ${product.originalPrice.toFixed(2)}
                      </span>
                      <Badge className="bg-green-500">-{discountPercentage}%</Badge>
                    </>
                  )}
                </div>

                {/* Description */}
                {product.description && (
                  <p className="text-muted-foreground">
                    {product.description}
                  </p>
                )}

                {/* Stock Status */}
                <div>
                  {inStock ? (
                    <span className="text-green-600 font-medium">✓ In Stock</span>
                  ) : (
                    <span className="text-red-600 font-medium">✗ Out of Stock</span>
                  )}
                </div>

                {/* Actions */}
                <div className="flex gap-3 pt-4">
                  <Button
                    onClick={handleAddToCart}
                    disabled={!inStock || isAddingToCart}
                    className="flex-1 bg-gradient-to-r from-[var(--primary-color)] to-orange-600 hover:from-orange-600 hover:to-orange-700 text-inverse h-12 border-0"
                  >
                    <ShoppingCart className="size-5 mr-2" />
                    {!inStock ? "Out of Stock" : "Add to Cart"}
                  </Button>
                  <Link href={`/products/${product.id}`} className="flex-1">
                    <Button className="w-full h-12" variant="outline">
                      View Details
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}


