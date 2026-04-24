"use client";

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";
import { useAuth } from "./AuthContext";
import { cartApi } from "@/services/api";

export interface CartItem {
  id: string; // Product ID
  sku: string; // Variant SKU
  name: string;
  price: number;
  quantity: number;
  image: string;
  variant?: any;
}

interface CartContextType {
  items: CartItem[];
  isDrawerOpen: boolean;
  subtotal: number;
  addItem: (productId: string, sku: string, quantity?: number, fallbackItem?: Omit<CartItem, "quantity">) => Promise<void>;
  updateQuantity: (productId: string, sku: string, quantity: number) => Promise<void>;
  removeItem: (productId: string, sku: string) => Promise<void>;
  openDrawer: () => void;
  closeDrawer: () => void;
  clearCart: () => void;
  refreshCart: () => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

function mapApiItemToCartItem(apiItem: any): CartItem {
  const p = apiItem.product || {};
  const v = apiItem.variant || {};
  const images = p.images || [];
  return {
    id: apiItem.productId || p._id,
    sku: apiItem.sku,
    name: p.title || p.name || "",
    price: apiItem.price || v.sellingPrice || p.offerPrice || p.price || 0,
    quantity: apiItem.quantity,
    image: v.image || images[0] || "",
    variant: v,
  };
}

export function CartProvider({ children }: { children: ReactNode }) {
  const { token } = useAuth();
  const [items, setItems] = useState<CartItem[]>([]);
  const [subtotal, setSubtotal] = useState(0);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const calculateSubtotal = (cartItems: CartItem[]) => {
    return cartItems.reduce((acc, i) => acc + i.price * i.quantity, 0);
  };

  const refreshCart = useCallback(async () => {
    if (!token) return;
    try {
      const data = await cartApi.get();
      const mapped = (data.items || []).map(mapApiItemToCartItem);
      setItems(mapped);
      setSubtotal(data.subtotal ?? calculateSubtotal(mapped));
      setIsLoaded(true);
    } catch {
      setItems([]);
      setSubtotal(0);
      setIsLoaded(true);
    }
  }, [token]);

  useEffect(() => {
    if (token) {
      refreshCart();
    } else {
      // Load from local storage for non-logged in users
      const localCart = localStorage.getItem("cart");
      if (localCart) {
        try {
          const parsed = JSON.parse(localCart);
          const cartItems = parsed.items || [];
          setItems(cartItems);
          setSubtotal(parsed.subtotal || calculateSubtotal(cartItems));
        } catch {}
      }
      setIsLoaded(true);
    }
  }, [token, refreshCart]);

  // Persist local cart
  useEffect(() => {
    if (isLoaded && !token) {
      const sub = calculateSubtotal(items);
      setSubtotal(sub);
      localStorage.setItem("cart", JSON.stringify({ items, subtotal: sub }));
    }
  }, [items, token, isLoaded]);

  const addItem = useCallback(
    async (productId: string, sku: string, quantity: number = 1, fallbackItem?: Omit<CartItem, "quantity">) => {
      if (token) {
        try {
          await cartApi.add(productId, sku, quantity);
          await refreshCart();
        } catch (e: any) {
          console.error("Cart error:", e);
          throw new Error(e.response?.data?.message || "Failed to add item to cart");
        }
      } else {
        setItems((prev) => {
          const existing = prev.find((i) => i.id === productId && i.sku === sku);
          if (existing) {
            return prev.map((i) =>
              i.id === productId && i.sku === sku
                ? { ...i, quantity: i.quantity + quantity }
                : i
            );
          }
          if (fallbackItem) {
            return [...prev, { ...fallbackItem, quantity }];
          }
          return prev;
        });
      }
      setIsDrawerOpen(true);
    },
    [token, refreshCart]
  );

  const removeItem = useCallback(
    async (productId: string, sku: string) => {
      if (token) {
        try {
          await cartApi.remove(productId, sku);
          await refreshCart();
        } catch (e) {
          throw e;
        }
      } else {
        setItems((prev) => prev.filter((i) => !(i.id === productId && i.sku === sku)));
      }
    },
    [token, refreshCart]
  );

  const updateQuantity = useCallback(
    async (productId: string, sku: string, quantity: number) => {
      if (quantity < 1) {
        await removeItem(productId, sku);
        return;
      }
      if (token) {
        try {
          await cartApi.update(productId, sku, quantity);
          await refreshCart();
        } catch (e) {
          throw e;
        }
      } else {
        setItems((prev) =>
          prev.map((i) => (i.id === productId && i.sku === sku ? { ...i, quantity } : i))
        );
      }
    },
    [token, refreshCart, removeItem]
  );

  const openDrawer = () => setIsDrawerOpen(true);
  const closeDrawer = () => setIsDrawerOpen(false);
  const clearCart = useCallback(() => {
    setItems([]);
    setSubtotal(0);
    if (typeof window !== "undefined") {
      localStorage.removeItem("cart");
    }
  }, []);

  const value = {
    items,
    isDrawerOpen,
    subtotal,
    addItem,
    updateQuantity,
    removeItem,
    openDrawer,
    closeDrawer,
    clearCart,
    refreshCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}

