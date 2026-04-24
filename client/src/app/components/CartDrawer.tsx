"use client";

import { X, ShoppingCart, Trash2, Plus, Minus, ArrowRight } from "lucide-react";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import Link from "next/link";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useCart, CartItem } from "../contexts/CartContext";

export function CartDrawer() {
  const { 
    items, 
    subtotal, 
    isDrawerOpen: isOpen, 
    closeDrawer: onClose, 
    updateQuantity: onUpdateQuantity, 
    removeItem: onRemoveItem 
  } = useCart();

  const shipping = subtotal > 100 ? 0 : 10;
  const total = subtotal + shipping;

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-inverse/60 z-40 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-[440px] bg-background shadow-2xl z-50 transform transition-transform duration-300 ease-out flex flex-col ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-border bg-background">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-gradient-to-br from-[var(--primary-color)] to-orange-600 rounded-xl shadow-lg">
              <ShoppingCart className="size-5 text-inverse" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-foreground">
                Shopping Cart
              </h2>
              <p className="text-sm text-muted-foreground">
                {items.length} {items.length === 1 ? "item" : "items"}
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="hover:bg-muted dark:hover:bg-card text-card-foreground rounded-xl text-muted-foreground"
          >
            <X className="size-5" />
          </Button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-5 space-y-3 bg-muted">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center px-6">
              <div className="p-8 bg-gradient-to-br from-orange-100 to-orange-200 dark:from-orange-900/20 dark:to-orange-800/20 rounded-full mb-6">
                <ShoppingCart className="size-20 text-orange-400 dark:text-orange-500" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">
                Your cart is empty
              </h3>
              <p className="text-muted-foreground mb-6">
                Add items to get started
              </p>
              <Button
                className="bg-gradient-to-r from-[var(--primary-color)] to-orange-600 hover:from-orange-600 hover:to-orange-700 text-inverse font-semibold px-8"
                asChild
              >
                <Link href="/products" onClick={onClose}>
                  Continue Shopping
                </Link>
              </Button>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={`${item.id}-${item.sku}`}
                className="flex gap-4 p-3 bg-background border border-gray-100 dark:border-gray-800 rounded-xl shadow-sm group relative"
              >
                <div className="relative size-20 sm:size-24 bg-muted dark:bg-card text-card-foreground rounded-lg overflow-hidden flex-shrink-0">
                  <ImageWithFallback
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>

                <div className="flex-1 flex flex-col justify-between py-1 min-w-0">
                  <div>
                    <div className="flex justify-between items-start gap-2">
                      <h3 className="text-sm font-bold text-foreground line-clamp-1 group-hover:text-primary transition-colors">
                        {item.name}
                      </h3>
                      <button
                        onClick={() => onRemoveItem(item.id, item.sku)}
                        className="text-muted-foreground hover:text-red-500 p-1 rounded-lg transition-colors"
                      >
                        <Trash2 className="size-4" />
                      </button>
                    </div>
                    {item.variant?.attributes && (
                      <div className="flex flex-wrap gap-1 mt-1">
                        {item.variant.attributes.map((attr: any) => (
                          <span key={attr.name} className="text-[10px] bg-muted text-muted-foreground px-1.5 py-0.5 rounded-md font-medium">
                            {attr.name}: {attr.value}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="flex items-center justify-between mt-auto">
                    <div className="flex items-center border border-border rounded-lg bg-muted overflow-hidden">
                      <button
                        onClick={() => onUpdateQuantity(item.id, item.sku, item.quantity - 1)}
                        className="p-1.5 hover:bg-background dark:hover:bg-card text-card-foreground text-muted-foreground transition-colors"
                      >
                        <Minus className="size-3.5" />
                      </button>
                      <span className="w-8 text-center text-xs font-bold text-foreground">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(item.id, item.sku, item.quantity + 1)}
                        className="p-1.5 hover:bg-background dark:hover:bg-card text-card-foreground text-muted-foreground transition-colors"
                      >
                        <Plus className="size-3.5" />
                      </button>
                    </div>
                    <span className="text-sm font-bold text-[var(--primary-color)]">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="p-5 border-t border-border bg-background space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-muted-foreground">
                <span className="text-sm">Subtotal</span>
                <span className="font-semibold text-foreground">
                  ${subtotal.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span className="text-sm">Shipping</span>
                <span className="font-semibold text-green-600">
                  {shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}
                </span>
              </div>
              <Separator className="bg-muted" />
              <div className="flex justify-between items-center pt-2">
                <span className="text-base font-bold text-foreground">
                  Total
                </span>
                <span className="text-xl font-black text-[var(--primary-color)]">
                  ${total.toFixed(2)}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Button
                variant="outline"
                className="h-12 font-bold border-2 hover:bg-muted dark:hover:bg-card text-card-foreground rounded-xl"
                asChild
              >
                <Link href="/cart" onClick={onClose}>
                  View Cart
                </Link>
              </Button>
              <Button
                className="h-12 font-bold bg-gradient-to-r from-[var(--primary-color)] to-orange-600 hover:from-orange-600 hover:to-orange-700 text-inverse shadow-lg shadow-orange-500/20 rounded-xl"
                asChild
              >
                <Link href="/checkout" onClick={onClose}>
                  Checkout
                  <ArrowRight className="size-4 ml-2" />
                </Link>
              </Button>
            </div>
            <p className="text-center text-[10px] text-muted-foreground dark:text-muted-foreground font-medium">
              ✨ Free shipping on orders over $100
            </p>
          </div>
        )}
      </div>
    </>
  );
}

