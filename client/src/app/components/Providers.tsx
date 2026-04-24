"use client";

import { ThemeProvider } from "../contexts/ThemeContext";
import { FilterProvider } from "../contexts/FilterContext";
import { AuthProvider } from "../contexts/AuthContext";
import { CartProvider } from "../contexts/CartContext";
import { WishlistProvider } from "../contexts/WishlistContext";
import { Toaster } from "./ui/sonner";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <FilterProvider>
        <AuthProvider>
          <WishlistProvider>
            <CartProvider>
              {children}
              <Toaster />
            </CartProvider>
          </WishlistProvider>
        </AuthProvider>
      </FilterProvider>
    </ThemeProvider>
  );
}


