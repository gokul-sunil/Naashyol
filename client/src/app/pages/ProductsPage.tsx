import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Star, Heart, Eye, X, Tag, Home, Leaf, UtensilsCrossed, Sofa, SlidersHorizontal } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Checkbox } from "../components/ui/checkbox";
import { Slider } from "../components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "../components/ui/sheet";
import { Separator } from "../components/ui/separator";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { useCart } from "../contexts/CartContext";
import { useWishlist } from "../contexts/WishlistContext";
import { toast } from "sonner";
import Slider1 from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useFilter } from "../contexts/FilterContext";
import { FashionAdCarousel } from "../components/FashionAdCarousel";
import { FlashDealsSection } from "../components/FlashDealsSection";
import { ShopByCategorySection } from "../components/ShopByCategorySection";
import { allProducts } from "../data/products";

export function ProductsPage() {
  const location = usePathname();
  const searchParams = new URLSearchParams(location.search);
  const categoryParam = searchParams.get("category");
  const subcategoryParam = searchParams.get("subcategory");
  const [selectedPriceRange, setSelectedPriceRange] = useState<string>("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedMinRating, setSelectedMinRating] = useState<number | null>(null);
  const [sortBy, setSortBy] = useState("featured");
  const { isFilterOpen, closeFilter } = useFilter();
  const [isFilterVisible, setIsFilterVisible] = useState(true);
  const [isFilterSheetOpen, setIsFilterSheetOpen] = useState(false);
  const { addItem } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const categories = [
    "Electronics",
    "Fashion",
    "Home & Garden",
    "Sports",
    "Beauty",
    "Books",
    "Toys",
    "Automotive",
  ];

  const priceRanges = [
    { label: "Under $25", value: "0-25" },
    { label: "$25 - $50", value: "25-50" },
    { label: "$50 - $100", value: "50-100" },
    { label: "$100 - $200", value: "100-200" },
    { label: "Over $200", value: "200-9999" },
  ];

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedPriceRange("");
    setSelectedMinRating(null);
  };

  const applyFilters = () => {
    toast.success("Filters applied successfully!");
  };

  // Filter products based on category or subcategory parameter
  let products = allProducts;

  if (categoryParam) {
    products = products.filter(product => product.category === categoryParam);
  }

  if (subcategoryParam) {
    products = products.filter(product => product.subcategory === subcategoryParam);
  }

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Categories */}
      <div>
        <h3 className="font-semibold text-foreground mb-3">Categories</h3>
        <div className="space-y-2">
          {categories.map((category) => (
            <div key={category} className="flex items-center gap-2">
              <Checkbox
                id={`category-${category}`}
                checked={selectedCategories.includes(category)}
                onCheckedChange={() => toggleCategory(category)}
              />
              <Label
                htmlFor={`category-${category}`}
                className="text-sm cursor-pointer text-foreground dark:text-muted"
              >
                {category}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* Price Range */}
      <div>
        <h3 className="font-semibold text-foreground mb-3">Price Range</h3>
        <div className="space-y-4">
          <Select
            value={selectedPriceRange}
            onValueChange={setSelectedPriceRange}
            className="w-full glass-input"
          >
            <SelectTrigger>
              <SelectValue placeholder="Select price range" />
            </SelectTrigger>
            <SelectContent className="glass-lg">
              {priceRanges.map((range) => (
                <SelectItem key={range.value} value={range.value}>
                  {range.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <Separator />

      {/* Rating */}
      <div>
        <h3 className="font-semibold text-foreground mb-3">Rating</h3>
        <div className="space-y-2">
          {[5, 4, 3].map((rating) => (
            <div key={rating} className="flex items-center gap-2">
              <Checkbox
                id={`rating-${rating}`}
                checked={selectedMinRating === rating}
                onCheckedChange={() => setSelectedMinRating(rating)}
              />
              <Label
                htmlFor={`rating-${rating}`}
                className="flex items-center gap-1 text-sm cursor-pointer"
              >
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`size-4 ${i < rating
                        ? "fill-[var(--primary-color)] text-[var(--primary-color)]"
                        : "text-muted"
                      }`}
                  />
                ))}
                <span className="ml-1">& Up</span>
              </Label>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* Availability */}
      <div>
        <h3 className="font-semibold text-foreground mb-3">Availability</h3>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Checkbox id="in-stock" />
            <Label htmlFor="in-stock" className="text-sm cursor-pointer text-foreground dark:text-muted">
              In Stock
            </Label>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox id="on-sale" />
            <Label htmlFor="on-sale" className="text-sm cursor-pointer text-foreground dark:text-muted">
              On Sale
            </Label>
          </div>
        </div>
      </div>

      <Button
        variant="outline"
        className="w-full"
        onClick={clearFilters}
      >
        Clear All Filters
      </Button>
    </div>
  );

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Animated Background Gradients - macOS style */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-gradient-to-br from-orange-500/25 via-red-500/15 to-pink-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-gradient-to-br from-purple-500/20 via-blue-500/15 to-cyan-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-gradient-to-br from-pink-500/15 via-orange-500/15 to-yellow-500/10 rounded-full blur-3xl"></div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Header with Glass Effect */}
        <div className="glass-navbar border-b border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 md:py-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
              {categoryParam ? `${categoryParam} Products` : "All Products"}
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground dark:text-muted">
              Discover our complete collection of premium products
            </p>
          </div>
        </div>

        {/* Fashion Category Sections */}
        {categoryParam === "Fashion" && (
          <>
            {/* Category Grid Section */}
            <section className="py-4 sm:py-6 md:py-8 relative">
              <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-8 xl:grid-cols-10 gap-2 sm:gap-3">
                  {[
                    { name: "EID", image: "https://images.unsplash.com/photo-1767775498862-d4740ce574ce?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlaWQlMjBmZXN0aXZhbCUyMGNsb3RoaW5nfGVufDF8fHx8MTc3MTUwMDM5OHww&ixlib=rb-4.1.0&q=80&w=1080" },
                    { name: "Tshirts, Shirts", image: "https://images.unsplash.com/photo-1516442443906-71605254b628?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZW5zJTIwdHNoaXJ0cyUyMHNoaXJ0c3xlbnwxfHx8fDE3NzE1MDAzOTh8MA&ixlib=rb-4.1.0&q=80&w=1080" },
                    { name: "Jeans", image: "https://images.unsplash.com/photo-1713880442898-0f151fba5e16?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibHVlJTIwamVhbnMlMjBkZW5pbXxlbnwxfHx8fDE3NzE0MzI2Mjd8MA&ixlib=rb-4.1.0&q=80&w=1080" },
                    { name: "Sports Shoes", image: "https://images.unsplash.com/photo-1695459468644-717c8ae17eed?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcG9ydHMlMjBzaG9lcyUyMHNuZWFrZXJzfGVufDF8fHx8MTc3MTQ3ODY4N3ww&ixlib=rb-4.1.0&q=80&w=1080" },
                    { name: "Watches", image: "https://images.unsplash.com/photo-1600003014755-ba31aa59c4b6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjB3YXRjaGVzfGVufDF8fHx8MTc3MTUwMDM5OXww&ixlib=rb-4.1.0&q=80&w=1080" },
                    { name: "Kids Clothing", image: "https://images.unsplash.com/photo-1733924304841-7320116fbe69?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxraWRzJTIwY2xvdGhpbmclMjBjaGlsZHJlbnxlbnwxfHx8fDE3NzEzOTkxODd8MA&ixlib=rb-4.1.0&q=80&w=1080" },
                    { name: "Backpacks", image: "https://images.unsplash.com/photo-1655303219938-3a771279c801?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWNrcGFjayUyMHNjaG9vbCUyMGJhZ3xlbnwxfHx8fDE3NzE0NTM4OTR8MA&ixlib=rb-4.1.0&q=80&w=1080" },
                    { name: "Kurtas", image: "https://images.unsplash.com/photo-1727835523550-18478cacefa2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBrdXJ0YSUyMGV0aG5pY3xlbnwxfHx8fDE3NzE1MDA0MDB8MA&ixlib=rb-4.1.0&q=80&w=1080" },
                    { name: "Casual Wear", image: "https://images.unsplash.com/photo-1640989818014-b4363bd44443?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXN1YWwlMjB3ZWFyJTIwbWVuc3xlbnwxfHx8fDE3NzE1MDA0MDB8MA&ixlib=rb-4.1.0&q=80&w=1080" },
                    { name: "Tracksuits", image: "https://images.unsplash.com/photo-1768929096095-8f379b34278b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcG9ydHMlMjB0cmFja3N1aXQlMjBhY3RpdmV3ZWFyfGVufDF8fHx8MTc3MTUwMDQwMHww&ixlib=rb-4.1.0&q=80&w=1080" },
                    { name: "Trendy street", image: "https://images.unsplash.com/photo-1768610284447-2ec9e61bd63b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHJlZXQlMjBmYXNoaW9uJTIwdHJlbmR5fGVufDF8fHx8MTc3MTUwMDQwMXww&ixlib=rb-4.1.0&q=80&w=1080" },
                    { name: "Kurta Sets", image: "https://images.unsplash.com/photo-1766994063823-ed214f883548?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrdXJ0YSUyMHNldCUyMGluZGlhbnxlbnwxfHx8fDE3NzE1MDA0MDF8MA&ixlib=rb-4.1.0&q=80&w=1080" },
                    { name: "Dresses, tops", image: "https://images.unsplash.com/photo-1730952756912-9a3ac64c5491?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21lbnMlMjBkcmVzc2VzJTIwdG9wc3xlbnwxfHx8fDE3NzE1MDA0MDF8MA&ixlib=rb-4.1.0&q=80&w=1080" },
                    { name: "Casual shoes", image: "https://images.unsplash.com/photo-1559744463-b288e9628d92?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXN1YWwlMjBzaG9lcyUyMGZvb3R3ZWFyfGVufDF8fHx8MTc3MTUwMDQwMXww&ixlib=rb-4.1.0&q=80&w=1080" },
                    { name: "Trolley Bags", image: "https://images.unsplash.com/photo-1760648311436-d18d39f499bd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cm9sbGV5JTIwbHVnZ2FnZSUyMGJhZ3xlbnwxfHx8fDE3NzE1MDA0MDJ8MA&ixlib=rb-4.1.0&q=80&w=1080" },
                    { name: "Jewellery", image: "https://images.unsplash.com/photo-1718871186381-6d59524a64f6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqZXdlbHJ5JTIwYWNjZXNzb3JpZXMlMjBnb2xkfGVufDF8fHx8MTc3MTQ0ODY1OHww&ixlib=rb-4.1.0&q=80&w=1080" },
                    { name: "Sarees", image: "https://images.unsplash.com/photo-1758120221788-d576fa58f520?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBzYXJlZSUyMHRyYWRpdGlvbmFsfGVufDF8fHx8MTc3MTQ4MDEwNnww&ixlib=rb-4.1.0&q=80&w=1080" },
                    { name: "Jackets, Sweaters", image: "https://images.unsplash.com/photo-1740442535747-6c292f995539?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqYWNrZXRzJTIwc3dlYXRlcnMlMjB3aW50ZXJ8ZW58MXx8fHwxNzcxNTAwNDAyfDA&ixlib=rb-4.1.0&q=80&w=1080" },
                  ].map((category) => (
                    <Link key={category.name}
                      href={`/category?category=Fashion&subcategory=${encodeURIComponent(category.name)}`}
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

            {/* Fashion Advertisement Carousel */}
            <section className="py-12 relative">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <FashionAdCarousel />
              </div>
            </section>

            {/* Flash Deals & Offers Section - Fashion Only */}
            <FlashDealsSection />

            {/* Shop for Loved Ones Section */}
            <section className="py-12 relative">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl font-bold text-foreground mb-8">
                  Shop for Loved Ones
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  <Link href="/category?category=Fashion&gender=men"
                    className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-400 to-blue-500 aspect-[4/3] hover:shadow-2xl transition-all duration-300 hover:scale-105"
                  >
                    <ImageWithFallback
                      src="https://images.unsplash.com/photo-1635913906376-53130718255a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZW5zJTIwZmFzaGlvbiUyMG1vZGVsfGVufDF8fHx8MTc3MTUwMDQwM3ww&ixlib=rb-4.1.0&q=80&w=1080"
                      alt="Men's Fashion"
                      className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                    <div className="absolute bottom-6 left-6">
                      <h3 className="text-3xl font-bold text-inverse mb-1">Men</h3>
                      <p className="text-inverse/90 text-sm">Discover men's collection</p>
                    </div>
                  </Link>

                  <Link href="/category?category=Fashion&gender=women"
                    className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-pink-400 to-pink-500 aspect-[4/3] hover:shadow-2xl transition-all duration-300 hover:scale-105"
                  >
                    <ImageWithFallback
                      src="https://images.unsplash.com/photo-1655026950620-b39ab24e9b4b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21lbnMlMjBmYXNoaW9uJTIwbW9kZWx8ZW58MXx8fHwxNzcxNTAwNDAzfDA&ixlib=rb-4.1.0&q=80&w=1080"
                      alt="Women's Fashion"
                      className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                    <div className="absolute bottom-6 left-6">
                      <h3 className="text-3xl font-bold text-inverse mb-1">Women</h3>
                      <p className="text-inverse/90 text-sm">Explore women's collection</p>
                    </div>
                  </Link>

                  <Link href="/category?category=Fashion&collection=genz"
                    className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-green-400 to-emerald-500 aspect-[4/3] hover:shadow-2xl transition-all duration-300 hover:scale-105"
                  >
                    <ImageWithFallback
                      src="https://images.unsplash.com/photo-1610738572401-5dfeeb660c7d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnZW4lMjB6JTIweyBvdXQglMjBmYXNoaW9ufGVufDF8fHx8MTc3MTUwMDQwM3ww&ixlib=rb-4.1.0&q=80&w=1080"
                      alt="Gen Z Fashion"
                      className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
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

            {/* Shop by Category Section - Fashion Only */}
            <ShopByCategorySection />
          </>
        )}

        {/* Electronics Category Sections */}
        {categoryParam === "Electronics" && (
          <>
            {/* Category Grid Section */}
            <section className="py-8 bg-background">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 gap-3">
                  {[
                    { name: "Smartphones", image: "https://images.unsplash.com/photo-1741061961703-0739f3454314?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWFydHBob25lJTIwbW9iaWxlJTIwcGhvbmV8ZW58MXx8fHwxNzcxNTQwMzE2fDA&ixlib=rb-4.1.0&q=80&w=1080" },
                    { name: "Laptops", image: "https://images.unsplash.com/photo-1693206578601-21cdc341d2c8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYXB0b3AlMjBjb21wdXRlciUyMG5vdGVib29rfGVufDF8fHx8MTc3MTU2MDYxMnww&ixlib=rb-4.1.0&q=80&w=1080" },
                    { name: "Headphones", image: "https://images.unsplash.com/photo-1572119244337-bcb4aae995af?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFkcGhvbmVzJTIwYXVkaW8lMjBlYXJwaG9uZXN8ZW58MXx8fHwxNzcxNTYwNjEyfDA&ixlib=rb-4.1.0&q=80&w=1080" },
                    { name: "Cameras", image: "https://images.unsplash.com/photo-1735994895660-32291564eb2e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYW1lcmElMjBkc2xyJTIwcGhvdG9ncmFwaHl8ZW58MXx8fHwxNzcxNTYwNjEyfDA&ixlib=rb-4.1.0&q=80&w=1080" },
                    { name: "Smartwatches", image: "https://images.unsplash.com/photo-1557438159-51eec7a6c9e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWFydCUyMHdhdGNoJTIwd2VhcmFibGV8ZW58MXx8fHwxNzcxNTYwNjEyfDA&ixlib=rb-4.1.0&q=80&w=1080" },
                    { name: "Gaming Consoles", image: "https://images.unsplash.com/photo-1665041974623-d398d035023e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYW1pbmclMjBjb25zb2xlJTIwcGxheXN0YXRpb258ZW58MXx8fHwxNzcxNTYwNjEyfDA&ixlib=rb-4.1.0&q=80&w=1080" },
                    { name: "TVs", image: "https://images.unsplash.com/photo-1556889487-b6f8d3fc728b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWxldmlzaW9uJTIwdHYlMjBzY3JlZW58ZW58MXx8fHwxNzcxNDc1OTA1fDA&ixlib=rb-4.1.0&q=80&w=1080" },
                    { name: "Tablets", image: "https://images.unsplash.com/photo-1561154464-82e9adf32764?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0YWJsZXQlMjBpcGFkJTIwZGV2aWNlfGVufDF8fHx8MTc3MTU0MTQ3MHww&ixlib=rb-4.1.0&q=80&w=1080" },
                    { name: "Speakers", image: "https://images.unsplash.com/photo-1645020089957-608f1f0dfb61?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcGVha2VyJTIwYmx1ZXRvb3RoJTIwYXVkaW98ZW58MXx8fHwxNzcxNTUzMzExfDA&ixlib=rb-4.1.0&q=80&w=1080" },
                    { name: "Drones", image: "https://images.unsplash.com/photo-1626020628008-e05290afad21?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkcm9uZSUyMHF1YWRjb3B0ZXIlMjBmbHlpbmd8ZW58MXx8fHwxNzcxNDU1MDk4fDA&ixlib=rb-4.1.0&q=80&w=1080" },
                    { name: "Keyboards", image: "https://images.unsplash.com/photo-1656711081969-9d16ebc2d210?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrZXlib2FyZCUyMG1lY2hhbmljYWwlMjBnYW1pbmd8ZW58MXx8fHwxNzcxNDQ2NTIwfDA&ixlib=rb-4.1.0&q=80&w=1080" },
                    { name: "Gaming Mouse", image: "https://images.unsplash.com/photo-1756928626912-17d51297f43d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3VzZSUyMGdhbWluZyUyMGNvbXB1dGVyfGVufDF8fHx8MTc3MTU2MDYxNHww&ixlib=rb-4.1.0&q=80&w=1080" },
                    { name: "Storage", image: "https://images.unsplash.com/photo-1689287428295-52e64882c4f1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXJkJTIwZHJpdmUlMjBzdG9yYWdlJTIwc3NkfGVufDF8fHx8MTc3MTU2MDYxNHww&ixlib=rb-4.1.0&q=80&w=1080" },
                    { name: "Cables & Chargers", image: "https://images.unsplash.com/photo-1657252084959-a0c1a26744df?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1c2IlMjBjYWJsZSUyMGNoYXJnZXJ8ZW58MXx8fHwxNzcxNTYwNjE1fDA&ixlib=rb-4.1.0&q=80&w=1080" },
                    { name: "Power Banks", image: "https://images.unsplash.com/photo-1736513963979-90b024508341?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3dlciUyMGJhbmslMjBwb3J0YWJsZSUyMGNoYXJnZXJ8ZW58MXx8fHwxNzcxNDg0Nzg1fDA&ixlib=rb-4.1.0&q=80&w=1080" },
                    { name: "Webcams", image: "https://images.unsplash.com/photo-1762681290673-ba1ad4ea0875?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWJjYW0lMjB2aWRlbyUyMGNhbWVyYXxlbnwxfHx8fDE3NzE1MzM3NTR8MA&ixlib=rb-4.1.0&q=80&w=1080" },
                    { name: "Routers", image: "https://images.unsplash.com/photo-1770393698717-fbbebdeccd5d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb3V0ZXIlMjB3aWZpJTIwbmV0d29ya3xlbnwxfHx8fDE3NzE1NjA2MTV8MA&ixlib=rb-4.1.0&q=80&w=1080" },
                    { name: "Microphones", image: "https://images.unsplash.com/photo-1608613108344-07ce970d61da?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaWNyb3Bob25lJTIwcmVjb3JkaW5nJTIwYXVkaW98ZW58MXx8fHwxNzcxNTYwNjE2fDA&ixlib=rb-4.1.0&q=80&w=1080" },
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

            {/* Flash Deals & Offers Section - Electronics Only */}
            <FlashDealsSection />

            {/* Shop by Category Section - Electronics Only */}
            <ShopByCategorySection />
          </>
        )}

        {/* Home & Garden Category Sections */}
        {categoryParam === "Home & Garden" && (
          <>
            {/* Flash Deals & Offers Section - Home & Garden Only */}
            <section className="py-12 bg-background">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                  <h2 className="text-4xl font-bold text-foreground mb-3">
                    Flash Deals & Offers
                  </h2>
                  <p className="text-muted-foreground text-lg">
                    Don't miss out on these amazing limited-time offers
                  </p>
                </div>

                <Slider1
                  dots={true}
                  infinite={true}
                  speed={500}
                  slidesToShow={3}
                  slidesToScroll={1}
                  autoplay={true}
                  autoplaySpeed={3000}
                  responsive={[
                    {
                      breakpoint: 1024,
                      settings: {
                        slidesToShow: 2,
                        slidesToScroll: 1,
                      }
                    },
                    {
                      breakpoint: 768,
                      settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                      }
                    }
                  ]}
                  className="flash-deals-carousel"
                >
                  {/* Home Essentials Card */}
                  <div className="px-3">
                    <div className="relative rounded-3xl p-8 bg-gradient-to-br from-teal-500 to-teal-600 dark:from-teal-600 dark:to-teal-700 overflow-hidden shadow-xl h-[280px] flex flex-col justify-between">
                      <div className="absolute top-4 left-4 bg-background/20 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-2">
                        <Home className="w-4 h-4 text-inverse" />
                        <span className="text-inverse text-sm font-medium">Home</span>
                      </div>
                      <div className="mt-12 mb-auto">
                        <h3 className="text-2xl font-bold text-inverse mb-2">
                          Home Essentials
                        </h3>
                        <p className="text-inverse/90 text-sm">
                          Upgrade your living space with quality items
                        </p>
                      </div>
                      <div className="flex items-center justify-between mt-8">
                        <Link href="/category?category=Home%20%26%20Garden&subcategory=Home%20Decor"
                          className="bg-background text-teal-600 px-6 py-2 rounded-full font-semibold hover:bg-teal-50 transition-colors"
                        >
                          Browse
                        </Link>
                        <span className="text-inverse text-2xl font-bold">
                          Free Ship
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Garden Tools Card */}
                  <div className="px-3">
                    <div className="relative rounded-3xl p-8 bg-gradient-to-br from-green-600 to-green-700 dark:from-green-700 dark:to-green-800 overflow-hidden shadow-xl h-[280px] flex flex-col justify-between">
                      <div className="absolute top-4 left-4 bg-background/20 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-2">
                        <Leaf className="w-4 h-4 text-inverse" />
                        <span className="text-inverse text-sm font-medium">Garden</span>
                      </div>
                      <div className="mt-12 mb-auto">
                        <h3 className="text-2xl font-bold text-inverse mb-2">
                          Garden Tools
                        </h3>
                        <p className="text-inverse/90 text-sm">
                          Premium gardening equipment at great prices
                        </p>
                      </div>
                      <div className="flex items-center justify-between mt-8">
                        <Link href="/category?category=Home%20%26%20Garden&subcategory=Garden%20Tools"
                          className="bg-background text-green-700 px-6 py-2 rounded-full font-semibold hover:bg-green-50 transition-colors"
                        >
                          Shop
                        </Link>
                        <span className="text-inverse text-2xl font-bold">
                          25% OFF
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Kitchen Appliances Card */}
                  <div className="px-3">
                    <div className="relative rounded-3xl p-8 bg-gradient-to-br from-orange-500 to-orange-600 dark:from-orange-600 dark:to-orange-700 overflow-hidden shadow-xl h-[280px] flex flex-col justify-between">
                      <div className="absolute top-4 left-4 bg-background/20 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-2">
                        <UtensilsCrossed className="w-4 h-4 text-inverse" />
                        <span className="text-inverse text-sm font-medium">Kitchen</span>
                      </div>
                      <div className="mt-12 mb-auto">
                        <h3 className="text-2xl font-bold text-inverse mb-2">
                          Kitchen Deals
                        </h3>
                        <p className="text-inverse/90 text-sm">
                          Modern appliances for your cooking needs
                        </p>
                      </div>
                      <div className="flex items-center justify-between mt-8">
                        <Link href="/category?category=Home%20%26%20Garden&subcategory=Kitchen%20Appliances"
                          className="bg-background text-orange-600 px-6 py-2 rounded-full font-semibold hover:bg-orange-50 transition-colors"
                        >
                          Explore
                        </Link>
                        <span className="text-inverse text-2xl font-bold">
                          20% OFF
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Furniture Card */}
                  <div className="px-3">
                    <div className="relative rounded-3xl p-8 bg-gradient-to-br from-purple-600 to-purple-700 dark:from-purple-700 dark:to-purple-800 overflow-hidden shadow-xl h-[280px] flex flex-col justify-between">
                      <div className="absolute top-4 left-4 bg-background/20 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-2">
                        <Sofa className="w-4 h-4 text-inverse" />
                        <span className="text-inverse text-sm font-medium">Furniture</span>
                      </div>
                      <div className="mt-12 mb-auto">
                        <h3 className="text-2xl font-bold text-inverse mb-2">
                          Furniture Sale
                        </h3>
                        <p className="text-inverse/90 text-sm">
                          Transform your space with modern designs
                        </p>
                      </div>
                      <div className="flex items-center justify-between mt-8">
                        <Link href="/category?category=Home%20%26%20Garden&subcategory=Furniture"
                          className="bg-background text-purple-700 px-6 py-2 rounded-full font-semibold hover:bg-purple-50 transition-colors"
                        >
                          Shop
                        </Link>
                        <span className="text-inverse text-2xl font-bold">
                          30% OFF
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Bedding Card */}
                  <div className="px-3">
                    <div className="relative rounded-3xl p-8 bg-gradient-to-br from-blue-600 to-blue-700 dark:from-blue-700 dark:to-blue-800 overflow-hidden shadow-xl h-[280px] flex flex-col justify-between">
                      <div className="absolute top-4 left-4 bg-background/20 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-2">
                        <Home className="w-4 h-4 text-inverse" />
                        <span className="text-inverse text-sm font-medium">Bedroom</span>
                      </div>
                      <div className="mt-12 mb-auto">
                        <h3 className="text-2xl font-bold text-inverse mb-2">
                          Bedding Sale
                        </h3>
                        <p className="text-inverse/90 text-sm">
                          Premium bedding for a perfect night's sleep
                        </p>
                      </div>
                      <div className="flex items-center justify-between mt-8">
                        <Link href="/category?category=Home%20%26%20Garden&subcategory=Bedding"
                          className="bg-background text-blue-700 px-6 py-2 rounded-full font-semibold hover:bg-blue-50 transition-colors"
                        >
                          Shop
                        </Link>
                        <span className="text-inverse text-2xl font-bold">
                          35% OFF
                        </span>
                      </div>
                    </div>
                  </div>
                </Slider1>
              </div>
            </section>

            {/* Category Grid Section */}
            <section className="py-8 bg-muted/30">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-8">
                  <h2 className="text-3xl font-bold text-foreground mb-2">
                    Shop by Category
                  </h2>
                  <p className="text-muted-foreground">
                    Browse our complete collection of home & garden products
                  </p>
                </div>
                <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 gap-3">
                  {[
                    { name: "Furniture", image: "https://images.unsplash.com/photo-1768946052273-0a2dd7f3e365?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBmdXJuaXR1cmUlMjBzb2ZhfGVufDF8fHx8MTc3MTUzMjk1MHww&ixlib=rb-4.1.0&q=80&w=1080" },
                    { name: "Kitchen Appliances", image: "https://images.unsplash.com/photo-1762186540963-efa1702b3379?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxraXRjaGVuJTIwYXBwbGlhbmNlcyUyMGJsZW5kZXJ8ZW58MXx8fHwxNzcxNTM1Mjk2fDA&ixlib=rb-4.1.0&q=80&w=1080" },
                    { name: "Bedding", image: "https://images.unsplash.com/photo-1629455281771-21b9a5176722?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWRyb29tJTIwYmVkZGluZyUyMHNoZWV0c3xlbnwxfHx8fDE3NzE1NjA4NTR8MA&ixlib=rb-4.1.0&q=80&w=1080" },
                    { name: "Home Decor", image: "https://images.unsplash.com/photo-1765809436270-ae2d938849b2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob21lJTIwZGVjb3IlMjB2YXNlfGVufDF8fHx8MTc3MTU2MDg1NHww&ixlib=rb-4.1.0&q=80&w=1080" },
                    { name: "Lighting", image: "https://images.unsplash.com/photo-1763060722627-e06bfa20faaf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBsaWdodGluZyUyMGxhbXB8ZW58MXx8fHwxNzcxNTYwODU1fDA&ixlib=rb-4.1.0&q=80&w=1080" },
                    { name: "Indoor Plants", image: "https://images.unsplash.com/photo-1637311252429-634d760e08b2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRvb3IlMjBwbGFudHMlMjBob3VzZXBsYW50c3xlbnwxfHx8fDE3NzE1NjA4NTV8MA&ixlib=rb-4.1.0&q=80&w=1080" },
                    { name: "Garden Tools", image: "https://images.unsplash.com/photo-1640306107674-23b73a335f12?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYXJkZW4lMjB0b29scyUyMHNob3ZlbHxlbnwxfHx8fDE3NzE1NjA4NTV8MA&ixlib=rb-4.1.0&q=80&w=1080" },
                    { name: "Storage", image: "https://images.unsplash.com/photo-1768875845344-5663fa9acf15?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdG9yYWdlJTIwY29udGFpbmVycyUyMG9yZ2FuaXphdGlvbnxlbnwxfHx8fDE3NzE1NjA4NTV8MA&ixlib=rb-4.1.0&q=80&w=1080" },
                    { name: "Curtains", image: "https://images.unsplash.com/photo-1671328920741-ea6f4233dc07?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aW5kb3clMjBjdXJ0YWlucyUyMGRyYXBlc3xlbnwxfHx8fDE3NzE1NjA4NTV8MA&ixlib=rb-4.1.0&q=80&w=1080" },
                    { name: "Rugs", image: "https://images.unsplash.com/photo-1644977624606-4f7dc0093e7e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcmVhJTIwcnVncyUyMGNhcnBldHxlbnwxfHx8fDE3NzE1NjA4NTZ8MA&ixlib=rb-4.1.0&q=80&w=1080" },
                    { name: "Cookware", image: "https://images.unsplash.com/photo-1623059265421-2dc2a04f10f6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb29rd2FyZSUyMHBvdHMlMjBwYW5zfGVufDF8fHx8MTc3MTQ5NjA5NXww&ixlib=rb-4.1.0&q=80&w=1080" },
                    { name: "Bathroom", image: "https://images.unsplash.com/photo-1766727923667-4686db7e9bcb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYXRocm9vbSUyMGFjY2Vzc29yaWVzJTIwdG93ZWxzfGVufDF8fHx8MTc3MTU2MDg1Nnww&ixlib=rb-4.1.0&q=80&w=1080" },
                    { name: "Outdoor Furniture", image: "https://images.unsplash.com/photo-1560990883-9b76fec399a9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvdXRkb29yJTIwcGF0aW8lMjBmdXJuaXR1cmV8ZW58MXx8fHwxNzcxNTU1ODY1fDA&ixlib=rb-4.1.0&q=80&w=1080" },
                    { name: "Wall Art", image: "https://images.unsplash.com/photo-1554907984-15263bfd63bd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3YWxsJTIwYXJ0JTIwZnJhbWVzfGVufDF8fHx8MTc3MTU2MDg1N3ww&ixlib=rb-4.1.0&q=80&w=1080" },
                    { name: "Cleaning", image: "https://images.unsplash.com/photo-1649073005971-37babef31983?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjbGVhbmluZyUyMHN1cHBsaWVzJTIwcHJvZHVjdHN8ZW58MXx8fHwxNzcxNDY5OTQ3fDA&ixlib=rb-4.1.0&q=80&w=1080" },
                    { name: "Dining", image: "https://images.unsplash.com/photo-1611633332753-d1e2f695aa3c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaW5pbmclMjB0YWJsZSUyMGNoYWlyc3xlbnwxfHx8fDE3NzE1NjA4NTd8MA&ixlib=rb-4.1.0&q=80&w=1080" },
                    { name: "Office", image: "https://images.unsplash.com/photo-1700451761308-ec56f93c82be?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvZmZpY2UlMjBkZXNrJTIwd29ya3NwYWNlfGVufDF8fHx8MTc3MTUzNjE5Nnww&ixlib=rb-4.1.0&q=80&w=1080" },
                    { name: "Garden Plants", image: "https://images.unsplash.com/photo-1693767074374-92078f096d88?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYXJkZW4lMjBvdXRkb29yJTIwcGxhbnRzfGVufDF8fHx8MTc3MTUyNjI2NXww&ixlib=rb-4.1.0&q=80&w=1080" },
                  ].map((category) => (
                    <Link key={category.name}
                      href={`/category?category=Home%20%26%20Garden&subcategory=${encodeURIComponent(category.name)}`}
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
          </>
        )}

        {/* All other categories & no-category (All Products) */}
        {((categoryParam && categoryParam !== "Fashion" && categoryParam !== "Electronics" && categoryParam !== "Home & Garden") || !categoryParam) && (
          <>
            {/* Flash Deals - All Products only */}
            {!categoryParam && <FlashDealsSection />}

            {/* Electronics Section - All Products only */}
            {!categoryParam && (
              <section className="py-12 bg-muted/30">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="mb-8">
                    <h2 className="text-3xl font-bold text-foreground mb-2">
                      Electronics Products
                    </h2>
                    <p className="text-muted-foreground">
                      Discover our complete collection of premium products
                    </p>
                  </div>

                  <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 gap-4">
                    {[
                      { name: "Smartphones", image: "https://images.unsplash.com/photo-1741061961703-0739f3454314?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWFydHBob25lJTIwbW9iaWxlJTIwcGhvbmV8ZW58MXx8fHwxNzcxNTQwMzE2fDA&ixlib=rb-4.1.0&q=80&w=1080" },
                      { name: "Laptops", image: "https://images.unsplash.com/photo-1693206578601-21cdc341d2c8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYXB0b3AlMjBjb21wdXRlciUyMG5vdGVib29rfGVufDF8fHx8MTc3MTU2MDYxMnww&ixlib=rb-4.1.0&q=80&w=1080" },
                      { name: "Headphones", image: "https://images.unsplash.com/photo-1572119244337-bcb4aae995af?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFkcGhvbmVzJTIwYXVkaW8lMjBlYXJwaG9uZXN8ZW58MXx8fHwxNzcxNTYwNjEyfDA&ixlib=rb-4.1.0&q=80&w=1080" },
                      { name: "Cameras", image: "https://images.unsplash.com/photo-1735994895660-32291564eb2e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYW1lcmElMjBkc2xyJTIwcGhvdG9ncmFwaHl8ZW58MXx8fHwxNzcxNTYwNjEyfDA&ixlib=rb-4.1.0&q=80&w=1080" },
                      { name: "Smartwatches", image: "https://images.unsplash.com/photo-1557438159-51eec7a6c9e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWFydCUyMHdhdGNoJTIwd2VhcmFibGV8ZW58MXx8fHwxNzcxNTYwNjEyfDA&ixlib=rb-4.1.0&q=80&w=1080" },
                      { name: "Gaming Consoles", image: "https://images.unsplash.com/photo-1665041974623-d398d035023e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYW1pbmclMjBjb25zb2xlJTIwcGxheXN0YXRpb258ZW58MXx8fHwxNzcxNTYwNjEyfDA&ixlib=rb-4.1.0&q=80&w=1080" },
                      { name: "TVs", image: "https://images.unsplash.com/photo-1556889487-b6f8d3fc728b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWxldmlzaW9uJTIwdHYlMjBzY3JlZW58ZW58MXx8fHwxNzcxNDc1OTA1fDA&ixlib=rb-4.1.0&q=80&w=1080" },
                      { name: "Tablets", image: "https://images.unsplash.com/photo-1561154464-82e9adf32764?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0YWJsZXQlMjBpcGFkJTIwZGV2aWNlfGVufDF8fHx8MTc3MTU0MTQ3MHww&ixlib=rb-4.1.0&q=80&w=1080" },
                      { name: "Speakers", image: "https://images.unsplash.com/photo-1645020089957-608f1f0dfb61?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcGVha2VyJTIwYmx1ZXRvb3RoJTIwYXVkaW98ZW58MXx8fHwxNzcxNTUzMzExfDA&ixlib=rb-4.1.0&q=80&w=1080" },
                      { name: "Drones", image: "https://images.unsplash.com/photo-1626020628008-e05290afad21?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkcm9uZSUyMHF1YWRjb3B0ZXIlMjBmbHlpbmd8ZW58MXx8fHwxNzcxNDU1MDk4fDA&ixlib=rb-4.1.0&q=80&w=1080" },
                      { name: "Keyboards", image: "https://images.unsplash.com/photo-1656711081969-9d16ebc2d210?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrZXlib2FyZCUyMG1lY2hhbmljYWwlMjBnYW1pbmd8ZW58MXx8fHwxNzcxNDQ2NTIwfDA&ixlib=rb-4.1.0&q=80&w=1080" },
                      { name: "Gaming Mouse", image: "https://images.unsplash.com/photo-1756928626912-17d51297f43d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3VzZSUyMGdhbWluZyUyMGNvbXB1dGVyfGVufDF8fHx8MTc3MTU2MDYxNHww&ixlib=rb-4.1.0&q=80&w=1080" },
                      { name: "Storage", image: "https://images.unsplash.com/photo-1689287428295-52e64882c4f1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXJkJTIwZHJpdmUlMjBzdG9yYWdlJTIwc3NkfGVufDF8fHx8MTc3MTU2MDYxNHww&ixlib=rb-4.1.0&q=80&w=1080" },
                      { name: "Cables & Chargers", image: "https://images.unsplash.com/photo-1657252084959-a0c1a26744df?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1c2IlMjBjYWJsZSUyMGNoYXJnZXJ8ZW58MXx8fHwxNzcxNTYwNjE1fDA&ixlib=rb-4.1.0&q=80&w=1080" },
                      { name: "Power Banks", image: "https://images.unsplash.com/photo-1736513963979-90b024508341?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3dlciUyMGJhbmslMjBwb3J0YWJsZSUyMGNoYXJnZXJ8ZW58MXx8fHwxNzcxNDg0Nzg1fDA&ixlib=rb-4.1.0&q=80&w=1080" },
                      { name: "Webcams", image: "https://images.unsplash.com/photo-1762681290673-ba1ad4ea0875?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWJjYW0lMjB2aWRlbyUyMGNhbWVyYXxlbnwxfHx8fDE3NzE1MzM3NTR8MA&ixlib=rb-4.1.0&q=80&w=1080" },
                      { name: "Routers", image: "https://images.unsplash.com/photo-1770393698717-fbbebdeccd5d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb3V0ZXIlMjB3aWZpJTIwbmV0d29ya3xlbnwxfHx8fDE3NzE1NjA2MTV8MA&ixlib=rb-4.1.0&q=80&w=1080" },
                      { name: "Microphones", image: "https://images.unsplash.com/photo-1608613108344-07ce970d61da?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaWNyb3Bob25lJTIwcmVjb3JkaW5nJTIwYXVkaW98ZW58MXx8fHwxNzcxNTYwNjE2fDA&ixlib=rb-4.1.0&q=80&w=1080" },
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
            )}

            {/* Fashion Section - All Products only */}
            {!categoryParam && (
              <section className="py-12 bg-background">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="mb-8">
                    <h2 className="text-3xl font-bold text-foreground mb-2">
                      Fashion Products
                    </h2>
                    <p className="text-muted-foreground">
                      Discover our complete collection of premium products
                    </p>
                  </div>

                  <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 gap-4">
                    {[
                      { name: "EID", image: "https://images.unsplash.com/photo-1767775498862-d4740ce574ce?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlaWQlMjBmZXN0aXZhbCUyMGNsb3RoaW5nfGVufDF8fHx8MTc3MTUwMDM5OHww&ixlib=rb-4.1.0&q=80&w=1080" },
                      { name: "Tshirts, Shirts", image: "https://images.unsplash.com/photo-1516442443906-71605254b628?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZW5zJTIwdHNoaXJ0cyUyMHNoaXJ0c3xlbnwxfHx8fDE3NzE1MDAzOTh8MA&ixlib=rb-4.1.0&q=80&w=1080" },
                      { name: "Jeans", image: "https://images.unsplash.com/photo-1713880442898-0f151fba5e16?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibHVlJTIwamVhbnMlMjBkZW5pbXxlbnwxfHx8fDE3NzE0MzI2Mjd8MA&ixlib=rb-4.1.0&q=80&w=1080" },
                      { name: "Sports Shoes", image: "https://images.unsplash.com/photo-1695459468644-717c8ae17eed?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcG9ydHMlMjBzaG9lcyUyMHNuZWFrZXJzfGVufDF8fHx8MTc3MTQ3ODY4N3ww&ixlib=rb-4.1.0&q=80&w=1080" },
                      { name: "Watches", image: "https://images.unsplash.com/photo-1600003014755-ba31aa59c4b6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjB3YXRjaGVzfGVufDF8fHx8MTc3MTUwMDM5OXww&ixlib=rb-4.1.0&q=80&w=1080" },
                      { name: "Kids Clothing", image: "https://images.unsplash.com/photo-1733924304841-7320116fbe69?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxraWRzJTIwY2xvdGhpbmclMjBjaGlsZHJlbnxlbnwxfHx8fDE3NzEzOTkxODd8MA&ixlib=rb-4.1.0&q=80&w=1080" },
                      { name: "Backpacks", image: "https://images.unsplash.com/photo-1655303219938-3a771279c801?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWNrcGFjayUyMHNjaG9vbCUyMGJhZ3xlbnwxfHx8fDE3NzE0NTM4OTR8MA&ixlib=rb-4.1.0&q=80&w=1080" },
                      { name: "Kurtas", image: "https://images.unsplash.com/photo-1727835523550-18478cacefa2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBrdXJ0YSUyMGV0aG5pY3xlbnwxfHx8fDE3NzE1MDA0MDB8MA&ixlib=rb-4.1.0&q=80&w=1080" },
                      { name: "Casual Wear", image: "https://images.unsplash.com/photo-1640989818014-b4363bd44443?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXN1YWwlMjB3ZWFyJTIwbWVuc3xlbnwxfHx8fDE3NzE1MDA0MDB8MA&ixlib=rb-4.1.0&q=80&w=1080" },
                      { name: "Tracksuits", image: "https://images.unsplash.com/photo-1768929096095-8f379b34278b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcG9ydHMlMjB0cmFja3N1aXQlMjBhY3RpdmV3ZWFyfGVufDF8fHx8MTc3MTUwMDQwMHww&ixlib=rb-4.1.0&q=80&w=1080" },
                      { name: "Trendy street", image: "https://images.unsplash.com/photo-1768610284447-2ec9e61bd63b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHJlZXQlMjBmYXNoaW9uJTIwdHJlbmR5fGVufDF8fHx8MTc3MTUwMDQwMXww&ixlib=rb-4.1.0&q=80&w=1080" },
                      { name: "Kurta Sets", image: "https://images.unsplash.com/photo-1766994063823-ed214f883548?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrdXJ0YSUyMHNldCUyMGluZGlhbnxlbnwxfHx8fDE3NzE1MDA0MDF8MA&ixlib=rb-4.1.0&q=80&w=1080" },
                      { name: "Dresses, tops", image: "https://images.unsplash.com/photo-1730952756912-9a3ac64c5491?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21lbnMlMjBkcmVzc2VzJTIwdG9wc3xlbnwxfHx8fDE3NzE1MDA0MDF8MA&ixlib=rb-4.1.0&q=80&w=1080" },
                      { name: "Casual shoes", image: "https://images.unsplash.com/photo-1559744463-b288e9628d92?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXN1YWwlMjBzaG9lcyUyMGZvb3R3ZWFyfGVufDF8fHx8MTc3MTUwMDQwMXww&ixlib=rb-4.1.0&q=80&w=1080" },
                      { name: "Trolley Bags", image: "https://images.unsplash.com/photo-1760648311436-d18d39f499bd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cm9sbGV5JTIwbHVnZ2FnZSUyMGJhZ3xlbnwxfHx8fDE3NzE1MDA0MDJ8MA&ixlib=rb-4.1.0&q=80&w=1080" },
                      { name: "Jewellery", image: "https://images.unsplash.com/photo-1718871186381-6d59524a64f6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqZXdlbHJ5JTIwYWNjZXNzb3JpZXMlMjBnb2xkfGVufDF8fHx8MTc3MTQ0ODY1OHww&ixlib=rb-4.1.0&q=80&w=1080" },
                      { name: "Sarees", image: "https://images.unsplash.com/photo-1758120221788-d576fa58f520?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBzYXJlZSUyMHRyYWRpdGlvbmFsfGVufDF8fHx8MTc3MTQ4MDEwNnww&ixlib=rb-4.1.0&q=80&w=1080" },
                      { name: "Jackets, Sweaters", image: "https://images.unsplash.com/photo-1740442535747-6c292f995539?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqYWNrZXRzJTIwc3dlYXRlcnMlMjB3aW50ZXJ8ZW58MXx8fHwxNzcxNTAwNDAyfDA&ixlib=rb-4.1.0&q=80&w=1080" },
                    ].map((category) => (
                      <Link key={category.name}
                        href={`/category?category=Fashion&subcategory=${encodeURIComponent(category.name)}`}
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
            )}

            {/* Shop by Category Section - All Products only */}
            {!categoryParam && <ShopByCategorySection />}

            {/* Home & Garden Section - All Products only */}
            {!categoryParam && (
              <section className="py-12 bg-muted/30">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="mb-8">
                    <h2 className="text-3xl font-bold text-foreground mb-2">
                      Home & Garden Products
                    </h2>
                    <p className="text-muted-foreground">
                      Discover our complete collection of premium products
                    </p>
                  </div>

                  <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 gap-4">
                    {[
                      { name: "Furniture", image: "https://images.unsplash.com/photo-1768946052273-0a2dd7f3e365?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBmdXJuaXR1cmUlMjBzb2ZhfGVufDF8fHx8MTc3MTUzMjk1MHww&ixlib=rb-4.1.0&q=80&w=1080" },
                      { name: "Kitchen Appliances", image: "https://images.unsplash.com/photo-1762186540963-efa1702b3379?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxraXRjaGVuJTIwYXBwbGlhbmNlcyUyMGJsZW5kZXJ8ZW58MXx8fHwxNzcxNTM1Mjk2fDA&ixlib=rb-4.1.0&q=80&w=1080" },
                      { name: "Bedding", image: "https://images.unsplash.com/photo-1629455281771-21b9a5176722?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWRyb29tJTIwYmVkZGluZyUyMHNoZWV0c3xlbnwxfHx8fDE3NzE1NjA4NTR8MA&ixlib=rb-4.1.0&q=80&w=1080" },
                      { name: "Home Decor", image: "https://images.unsplash.com/photo-1765809436270-ae2d938849b2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob21lJTIwZGVjb3IlMjB2YXNlfGVufDF8fHx8MTc3MTU2MDg1NHww&ixlib=rb-4.1.0&q=80&w=1080" },
                      { name: "Lighting", image: "https://images.unsplash.com/photo-1763060722627-e06bfa20faaf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBsaWdodGluZyUyMGxhbXB8ZW58MXx8fHwxNzcxNTYwODU1fDA&ixlib=rb-4.1.0&q=80&w=1080" },
                      { name: "Indoor Plants", image: "https://images.unsplash.com/photo-1637311252429-634d760e08b2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRvb3IlMjBwbGFudHMlMjBob3VzZXBsYW50c3xlbnwxfHx8fDE3NzE1NjA4NTV8MA&ixlib=rb-4.1.0&q=80&w=1080" },
                      { name: "Garden Tools", image: "https://images.unsplash.com/photo-1640306107674-23b73a335f12?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYXJkZW4lMjB0b29scyUyMHNob3ZlbHxlbnwxfHx8fDE3NzE1NjA4NTV8MA&ixlib=rb-4.1.0&q=80&w=1080" },
                      { name: "Storage", image: "https://images.unsplash.com/photo-1768875845344-5663fa9acf15?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdG9yYWdlJTIwY29udGFpbmVycyUyMG9yZ2FuaXphdGlvbnxlbnwxfHx8fDE3NzE1NjA4NTV8MA&ixlib=rb-4.1.0&q=80&w=1080" },
                      { name: "Curtains", image: "https://images.unsplash.com/photo-1671328920741-ea6f4233dc07?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aW5kb3clMjBjdXJ0YWlucyUyMGRyYXBlc3xlbnwxfHx8fDE3NzE1NjA4NTV8MA&ixlib=rb-4.1.0&q=80&w=1080" },
                      { name: "Rugs", image: "https://images.unsplash.com/photo-1644977624606-4f7dc0093e7e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcmVhJTIwcnVncyUyMGNhcnBldHxlbnwxfHx8fDE3NzE1NjA4NTZ8MA&ixlib=rb-4.1.0&q=80&w=1080" },
                      { name: "Cookware", image: "https://images.unsplash.com/photo-1623059265421-2dc2a04f10f6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb29rd2FyZSUyMHBvdHMlMjBwYW5zfGVufDF8fHx8MTc3MTQ5NjA5NXww&ixlib=rb-4.1.0&q=80&w=1080" },
                      { name: "Bathroom", image: "https://images.unsplash.com/photo-1766727923667-4686db7e9bcb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYXRocm9vbSUyMGFjY2Vzc29yaWVzJTIwdG93ZWxzfGVufDF8fHx8MTc3MTU2MDg1Nnww&ixlib=rb-4.1.0&q=80&w=1080" },
                      { name: "Outdoor Furniture", image: "https://images.unsplash.com/photo-1560990883-9b76fec399a9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvdXRkb29yJTIwcGF0aW8lMjBmdXJuaXR1cmV8ZW58MXx8fHwxNzcxNTU1ODY1fDA&ixlib=rb-4.1.0&q=80&w=1080" },
                      { name: "Wall Art", image: "https://images.unsplash.com/photo-1554907984-15263bfd63bd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3YWxsJTIwYXJ0JTIwZnJhbWVzfGVufDF8fHx8MTc3MTU2MDg1N3ww&ixlib=rb-4.1.0&q=80&w=1080" },
                      { name: "Cleaning", image: "https://images.unsplash.com/photo-1649073005971-37babef31983?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjbGVhbmluZyUyMHN1cHBsaWVzJTIwcHJvZHVjdHN8ZW58MXx8fHwxNzcxNDY5OTQ3fDA&ixlib=rb-4.1.0&q=80&w=1080" },
                      { name: "Dining", image: "https://images.unsplash.com/photo-1611633332753-d1e2f695aa3c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaW5pbmclMjB0YWJsZSUyMGNoYWlyc3xlbnwxfHx8fDE3NzE1NjA4NTd8MA&ixlib=rb-4.1.0&q=80&w=1080" },
                      { name: "Office", image: "https://images.unsplash.com/photo-1700451761308-ec56f93c82be?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvZmZpY2UlMjBkZXNrJTIwd29ya3NwYWNlfGVufDF8fHx8MTc3MTUzNjE5Nnww&ixlib=rb-4.1.0&q=80&w=1080" },
                      { name: "Garden Plants", image: "https://images.unsplash.com/photo-1693767074374-92078f096d88?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYXJkZW4lMjBvdXRkb29yJTIwcGxhbnRzfGVufDF8fHx8MTc3MTUyNjI2NXww&ixlib=rb-4.1.0&q=80&w=1080" },
                    ].map((subcategory) => (
                      <Link key={subcategory.name}
                        href={`/category?category=Home%20%26%20Garden&subcategory=${encodeURIComponent(subcategory.name)}`}
                        className="group flex flex-col items-center"
                      >
                        <div className="relative w-full aspect-square rounded-2xl overflow-hidden mb-2 bg-muted hover:shadow-xl transition-all duration-300 hover:scale-105">
                          <ImageWithFallback
                            src={subcategory.image}
                            alt={subcategory.name}
                            className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-300"
                          />
                        </div>
                        <p className="text-xs text-center text-foreground font-medium line-clamp-2">
                          {subcategory.name}
                        </p>
                      </Link>
                    ))}
                  </div>
                </div>
              </section>
            )}

            {/* Trending Fashion Categories - All Products only */}
            {!categoryParam && (
              <section className="py-12 bg-muted/30">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="grid grid-cols-5 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-9 xl:grid-cols-10 gap-4">
                    {[
                      { name: "EID", image: "https://images.unsplash.com/photo-1583391265449-f2b8e7e30314?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlaWQlMjBmYXNoaW9uJTIwb3V0Zml0fGVufDB8fHx8MTcwNjc0NzI4MHww&ixlib=rb-4.1.0&q=80&w=1080" },
                      { name: "Tshirts, Shirts", image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0c2hpcnQlMjBzaGlydCUyMG1lbnxlbnwwfHx8fDE3MDY3NDcyODB8MA&ixlib=rb-4.1.0&q=80&w=1080" },
                      { name: "Jeans", image: "https://images.unsplash.com/photo-1542272604-787c3835535d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqZWFucyUyMGRlbmltfGVufDB8fHx8MTcwNjc0NzI4MHww&ixlib=rb-4.1.0&q=80&w=1080" },
                      { name: "Sports Shoes", image: "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcG9ydHMlMjBzaG9lcyUyMHNuZWFrZXJzfGVufDB8fHx8MTcwNjc0NzI4MHww&ixlib=rb-4.1.0&q=80&w=1080" },
                      { name: "Watches", image: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3YXRjaCUyMHdyaXN0d2F0Y2h8ZW58MHx8fHwxNzA2NzQ3MjgwfDA&ixlib=rb-4.1.0&q=80&w=1080" },
                      { name: "Kids Clothing", image: "https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxraWRzJTIwY2xvdGhpbmd8ZW58MHx8fHwxNzA2NzQ3MjgwfDA&ixlib=rb-4.1.0&q=80&w=1080" },
                      { name: "Backpacks", image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWNrcGFjayUyMGJhZ3xlbnwwfHx8fDE3MDY3NDcyODB8MA&ixlib=rb-4.1.0&q=80&w=1080" },
                      { name: "Kurtas", image: "https://images.unsplash.com/photo-1610652492500-96ff3488d6e6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrdXJ0YSUyMGluZGlhbiUyMGZhc2hpb258ZW58MHx8fHwxNzA2NzQ3MjgwfDA&ixlib=rb-4.1.0&q=80&w=1080" },
                      { name: "Casual Wear", image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXN1YWwlMjB3ZWFyJTIwbWVufGVufDB8fHx8MTcwNjc0NzI4MHww&ixlib=rb-4.1.0&q=80&w=1080" },
                      { name: "Tracksuits", image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmFja3N1aXQlMjBzcG9ydHN3ZWFyfGVufDB8fHx8MTcwNjc0NzI4MHww&ixlib=rb-4.1.0&q=80&w=1080" },
                      { name: "Trendy street", image: "https://images.unsplash.com/photo-1490367532201-b9bc1dc483f6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHJlZXQlMjBmYXNoaW9uJTIwdHJlbmR5fGVufDB8fHx8MTcwNjc0NzI4MHww&ixlib=rb-4.1.0&q=80&w=1080" },
                      { name: "Kurta Sets", image: "https://images.unsplash.com/photo-1583391265899-8bb1a7a9b3f6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrdXJ0YSUyMHNldCUyMGluZGlhbnxlbnwwfHx8fDE3MDY3NDcyODB8MA&ixlib=rb-4.1.0&q=80&w=1080" },
                      { name: "Dresses, tops", image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkcmVzc2VzJTIwdG9wcyUyMHdvbWVufGVufDB8fHx8MTcwNjc0NzI4MHww&ixlib=rb-4.1.0&q=80&w=1080" },
                      { name: "Casual shoes", image: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXN1YWwlMjBzaG9lcyUyMG1lbnxlbnwwfHx8fDE3MDY3NDcyODB8MA&ixlib=rb-4.1.0&q=80&w=1080" },
                      { name: "Trolley Bags", image: "https://images.unsplash.com/photo-1565026057447-bc90a3dceb87?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cm9sbGV5JTIwYmFnJTIwbHVnZ2FnZXxlbnwwfHx8fDE3MDY3NDcyODB8MA&ixlib=rb-4.1.0&q=80&w=1080" },
                      { name: "Jewellery", image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqZXdlbGxlcnklMjBuZWNrbGFjZXxlbnwwfHx8fDE3MDY3NDcyODB8MA&ixlib=rb-4.1.0&q=80&w=1080" },
                      { name: "Sarees", image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYXJlZSUyMGluZGlhbiUyMGZhc2hpb258ZW58MHx8fHwxNzA2NzQ3MjgwfDA&ixlib=rb-4.1.0&q=80&w=1080" },
                      { name: "Jackets, Sweaters", image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqYWNrZXQlMjBzd2VhdGVyJTIwd2ludGVyfGVufDB8fHx8MTcwNjc0NzI4MHww&ixlib=rb-4.1.0&q=80&w=1080" },
                    ].map((category) => (
                      <Link key={category.name}
                        href={`/category?category=Fashion&subcategory=${encodeURIComponent(category.name)}`}
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
            )}

            {/* Sports Section - All Products only */}
            {!categoryParam && (
              <section className="py-12 bg-background">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="mb-8">
                    <h2 className="text-3xl font-bold text-foreground mb-2">
                      Sports Products
                    </h2>
                    <p className="text-muted-foreground">
                      Discover our complete collection of premium products
                    </p>
                  </div>

                  <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 gap-4">
                    {[
                      { name: "Sports Shoes", image: "https://images.unsplash.com/photo-1695459468644-717c8ae17eed?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcG9ydHMlMjBzaG9lcyUyMHNuZWFrZXJzfGVufDF8fHx8MTc3MTQ3ODY4N3ww&ixlib=rb-4.1.0&q=80&w=1080" },
                      { name: "Fitness Equipment", image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaXRuZXNzJTIwZXF1aXBtZW50JTIwZ3ltfGVufDF8fHx8MTc0MDAxODM4NHww&ixlib=rb-4.1.0&q=80&w=1080" },
                      { name: "Yoga Mats", image: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b2dhJTIwbWF0JTIwZXhlcmNpc2V8ZW58MXx8fHwxNzQwMDE4Mzg1fDA&ixlib=rb-4.1.0&q=80&w=1080" },
                      { name: "Sportswear", image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcG9ydHN3ZWFyJTIwYXRobGV0aWMlMjBjbG90aGluZ3xlbnwxfHx8fDE3NDAwMTgzODV8MA&ixlib=rb-4.1.0&q=80&w=1080" },
                      { name: "Cycling", image: "https://images.unsplash.com/photo-1571068316344-75bc76f77890?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjeWNsaW5nJTIwYmlrZSUyMHNwb3J0fGVufDF8fHx8MTc0MDAxODM4NXww&ixlib=rb-4.1.0&q=80&w=1080" },
                      { name: "Swimming", image: "https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzd2ltbWluZyUyMHBvb2wlMjBzcG9ydHxlbnwxfHx8fDE3NDAwMTgzODZ8MA&ixlib=rb-4.1.0&q=80&w=1080" },
                      { name: "Running", image: "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxydW5uaW5nJTIwam9nZ2luZyUyMHNwb3J0fGVufDF8fHx8MTc0MDAxODM4Nnww&ixlib=rb-4.1.0&q=80&w=1080" },
                      { name: "Cricket", image: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcmlja2V0JTIwYmF0JTIwc3BvcnR8ZW58MXx8fHwxNzQwMDE4Mzg2fDA&ixlib=rb-4.1.0&q=80&w=1080" },
                      { name: "Football", image: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb290YmFsbCUyMHNvY2NlciUyMHNwb3J0fGVufDF8fHx8MTc0MDAxODM4N3ww&ixlib=rb-4.1.0&q=80&w=1080" },
                      { name: "Basketball", image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYXNrZXRiYWxsJTIwc3BvcnQlMjBnYW1lfGVufDF8fHx8MTc0MDAxODM4N3ww&ixlib=rb-4.1.0&q=80&w=1080" },
                      { name: "Tennis", image: "https://images.unsplash.com/photo-1622163642998-1ea32b0bbc67?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZW5uaXMlMjByYWNrZXQlMjBzcG9ydHxlbnwxfHx8fDE3NDAwMTgzODd8MA&ixlib=rb-4.1.0&q=80&w=1080" },
                      { name: "Badminton", image: "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWRtaW50b24lMjByYWNrZXQlMjBzcG9ydHxlbnwxfHx8fDE3NDAwMTgzODh8MA&ixlib=rb-4.1.0&q=80&w=1080" },
                      { name: "Gym Equipment", image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxneW0lMjBlcXVpcG1lbnQlMjB3ZWlnaHRzfGVufDF8fHx8MTc0MDAxODM4OHww&ixlib=rb-4.1.0&q=80&w=1080" },
                      { name: "Outdoor Sports", image: "https://images.unsplash.com/photo-1551958219-acbc608c6377?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvdXRkb29yJTIwc3BvcnRzJTIwYWR2ZW50dXJlfGVufDF8fHx8MTc0MDAxODM4OHww&ixlib=rb-4.1.0&q=80&w=1080" },
                      { name: "Water Sports", image: "https://images.unsplash.com/photo-1502680390469-be75c86b636f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3YXRlciUyMHNwb3J0cyUyMHN1cmZpbmd8ZW58MXx8fHwxNzQwMDE4Mzg5fDA&ixlib=rb-4.1.0&q=80&w=1080" },
                      { name: "Boxing", image: "https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib3hpbmclMjBnbG92ZXMlMjBzcG9ydHxlbnwxfHx8fDE3NDAwMTgzODl8MA&ixlib=rb-4.1.0&q=80&w=1080" },
                      { name: "Sports Bags", image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcG9ydHMlMjBiYWclMjBkdWZmbGV8ZW58MXx8fHwxNzQwMDE4Mzg5fDA&ixlib=rb-4.1.0&q=80&w=1080" },
                      { name: "Sports Watches", image: "https://images.unsplash.com/photo-1557438159-51eec7a6c9e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWFydCUyMHdhdGNoJTIwd2VhcmFibGV8ZW58MXx8fHwxNzcxNTYwNjEyfDA&ixlib=rb-4.1.0&q=80&w=1080" },
                    ].map((category) => (
                      <Link key={category.name}
                        href={`/category?category=Sports&subcategory=${encodeURIComponent(category.name)}`}
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
            )}

            {/* Beauty Section - All Products only */}
            {!categoryParam && (
              <section className="py-12 bg-muted/30">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="mb-8">
                    <h2 className="text-3xl font-bold text-foreground mb-2">
                      Beauty Products
                    </h2>
                    <p className="text-muted-foreground">
                      Discover our complete collection of premium products
                    </p>
                  </div>

                  <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 gap-4">
                    {[
                      { name: "Skincare", image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxza2luY2FyZSUyMHByb2R1Y3RzJTIwYmVhdXR5fGVufDF8fHx8MTc0MDAxODM5MHww&ixlib=rb-4.1.0&q=80&w=1080" },
                      { name: "Makeup", image: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWtldXAlMjBjb3NtZXRpY3MlMjBwcm9kdWN0c3xlbnwxfHx8fDE3NDAwMTgzOTB8MA&ixlib=rb-4.1.0&q=80&w=1080" },
                      { name: "Perfumes", image: "https://images.unsplash.com/photo-1541643600914-78b084683601?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXJmdW1lJTIwZnJhZ3JhbmNlJTIwYm90dGxlfGVufDF8fHx8MTc0MDAxODM5MHww&ixlib=rb-4.1.0&q=80&w=1080" },
                      { name: "Haircare", image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYWlyY2FyZSUyMHByb2R1Y3RzJTIwc2hhbXBvb3xlbnwxfHx8fDE3NDAwMTgzOTF8MA&ixlib=rb-4.1.0&q=80&w=1080" },
                      { name: "Face Masks", image: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYWNlJTIwbWFzayUyMGJlYXV0eSUyMHNraW5jYXJlfGVufDF8fHx8MTc0MDAxODM5MXww&ixlib=rb-4.1.0&q=80&w=1080" },
                      { name: "Lipsticks", image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsaXBzdGljayUyMG1ha2V1cCUyMGNvc21ldGljc3xlbnwxfHx8fDE3NDAwMTgzOTF8MA&ixlib=rb-4.1.0&q=80&w=1080" },
                      { name: "Nail Polish", image: "https://images.unsplash.com/photo-1610992015732-2449b76344bc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuYWlsJTIwcG9saXNoJTIwY29zbWV0aWNzfGVufDF8fHx8MTc0MDAxODM5MXww&ixlib=rb-4.1.0&q=80&w=1080" },
                      { name: "Moisturizers", image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2lzdHVyaXplciUyMGNyZWFtJTIwc2tpbmNhcmV8ZW58MXx8fHwxNzQwMDE4MzkyfDA&ixlib=rb-4.1.0&q=80&w=1080" },
                      { name: "Sunscreen", image: "https://images.unsplash.com/photo-1556228994-67dfa922c3c2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdW5zY3JlZW4lMjBzcGYlMjBwcm90ZWN0aW9ufGVufDF8fHx8MTc0MDAxODM5Mnww&ixlib=rb-4.1.0&q=80&w=1080" },
                      { name: "Body Lotions", image: "https://images.unsplash.com/photo-1571875257727-256c39da42af?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib2R5JTIwbG90aW9uJTIwc2tpbmNhcmV8ZW58MXx8fHwxNzQwMDE4MzkyfDA&ixlib=rb-4.1.0&q=80&w=1080" },
                      { name: "Eye Makeup", image: "https://images.unsplash.com/photo-1631214524020-7e18db9a8f92?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxleWUlMjBtYWtldXAlMjBjb3NtZXRpY3N8ZW58MXx8fHwxNzQwMDE4MzkzfDA&ixlib=rb-4.1.0&q=80&w=1080" },
                      { name: "Face Wash", image: "https://images.unsplash.com/photo-1570554886111-e80fcca6a029?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYWNlJTIwd2FzaCUyMGNsZWFuc2VyfGVufDF8fHx8MTc0MDAxODM5M3ww&ixlib=rb-4.1.0&q=80&w=1080" },
                      { name: "Hair Styling", image: "https://images.unsplash.com/photo-1522338140262-f46f5913618a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYWlyJTIwc3R5bGluZyUyMHByb2R1Y3RzfGVufDF8fHx8MTc0MDAxODM5M3ww&ixlib=rb-4.1.0&q=80&w=1080" },
                      { name: "Bath & Body", image: "https://images.unsplash.com/photo-1555829183-bf6dafd5e6d7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYXRoJTIwYm9keSUyMHByb2R1Y3RzfGVufDF8fHx8MTc0MDAxODM5M3ww&ixlib=rb-4.1.0&q=80&w=1080" },
                      { name: "Serums", image: "https://images.unsplash.com/photo-1620916297397-a4a5f7c01d3c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzZXJ1bSUyMHNraW5jYXJlJTIwYmVhdXR5fGVufDF8fHx8MTc0MDAxODM5NHww&ixlib=rb-4.1.0&q=80&w=1080" },
                      { name: "Beauty Tools", image: "https://images.unsplash.com/photo-1596704017254-9b121068fb31?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWF1dHklMjB0b29scyUyMGJydXNoZXN8ZW58MXx8fHwxNzQwMDE4Mzk0fDA&ixlib=rb-4.1.0&q=80&w=1080" },
                      { name: "Men's Grooming", image: "https://images.unsplash.com/photo-1621607512214-68297480165e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZW5zJTIwZ3Jvb21pbmclMjBiZWFyZHxlbnwxfHx8fDE3NDAwMTgzOTR8MA&ixlib=rb-4.1.0&q=80&w=1080" },
                      { name: "Fragrances", image: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmFncmFuY2UlMjBwZXJmdW1lJTIwYm90dGxlfGVufDF8fHx8MTc0MDAxODM5NHww&ixlib=rb-4.1.0&q=80&w=1080" },
                    ].map((category) => (
                      <Link key={category.name}
                        href={`/category?category=Beauty&subcategory=${encodeURIComponent(category.name)}`}
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
            )}

            {/* Books Section - All Products only */}
            {!categoryParam && (
              <section className="py-12 bg-background">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="mb-8">
                    <h2 className="text-3xl font-bold text-foreground mb-2">
                      Books
                    </h2>
                    <p className="text-muted-foreground">
                      Discover our complete collection of premium products
                    </p>
                  </div>

                  <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 gap-4">
                    {[
                      { name: "Fiction", image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaWN0aW9uJTIwYm9va3MlMjBub3ZlbHxlbnwxfHx8fDE3NDAwMTgzOTV8MA&ixlib=rb-4.1.0&q=80&w=1080" },
                      { name: "Non-Fiction", image: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxub24lMjBmaWN0aW9uJTIwYm9va3N8ZW58MXx8fHwxNzQwMDE4Mzk1fDA&ixlib=rb-4.1.0&q=80&w=1080" },
                      { name: "Self-Help", image: "https://images.unsplash.com/photo-1519682337058-a94d519337bc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzZWxmJTIwaGVscCUyMGJvb2tzfGVufDF8fHx8MTc0MDAxODM5NXww&ixlib=rb-4.1.0&q=80&w=1080" },
                      { name: "Business", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMGJvb2tzfGVufDF8fHx8MTc0MDAxODM5Nnww&ixlib=rb-4.1.0&q=80&w=1080" },
                      { name: "Children's Books", image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlsZHJlbnMlMjBib29rcyUyMGtpZHN8ZW58MXx8fHwxNzQwMDE4Mzk2fDA&ixlib=rb-4.1.0&q=80&w=1080" },
                      { name: "Biography", image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiaW9ncmFwaHklMjBib29rcyUyMGhpc3Rvcnl8ZW58MXx8fHwxNzQwMDE4Mzk2fDA&ixlib=rb-4.1.0&q=80&w=1080" },
                      { name: "Mystery", image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxteXN0ZXJ5JTIwYm9va3MlMjB0aHJpbGxlcnxlbnwxfHx8fDE3NDAwMTgzOTZ8MA&ixlib=rb-4.1.0&q=80&w=1080" },
                      { name: "Romance", image: "https://images.unsplash.com/photo-1474552226712-ac0f0961a954?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb21hbmNlJTIwYm9va3MlMjBsb3ZlfGVufDF8fHx8MTc0MDAxODM5N3ww&ixlib=rb-4.1.0&q=80&w=1080" },
                      { name: "Science Fiction", image: "https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzY2llbmNlJTIwZmljdGlvbiUyMGJvb2tzfGVufDF8fHx8MTc0MDAxODM5N3ww&ixlib=rb-4.1.0&q=80&w=1080" },
                      { name: "Fantasy", image: "https://images.unsplash.com/photo-1621351183012-e2f9972dd9bf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYW50YXN5JTIwYm9va3MlMjBtYWdpY3xlbnwxfHx8fDE3NDAwMTgzOTd8MA&ixlib=rb-4.1.0&q=80&w=1080" },
                      { name: "Cookbooks", image: "https://images.unsplash.com/photo-1466637574441-749b8f19452f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb29rYm9va3MlMjByZWNpcGVzfGVufDF8fHx8MTc0MDAxODM5N3ww&ixlib=rb-4.1.0&q=80&w=1080" },
                      { name: "Travel", image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmF2ZWwlMjBib29rcyUyMGd1aWRlfGVufDF8fHx8MTc0MDAxODM5OHww&ixlib=rb-4.1.0&q=80&w=1080" },
                      { name: "History", image: "https://images.unsplash.com/photo-1461360370896-922624d12aa1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoaXN0b3J5JTIwYm9va3MlMjBhbmNpZW50fGVufDF8fHx8MTc0MDAxODM5OHww&ixlib=rb-4.1.0&q=80&w=1080" },
                      { name: "Poetry", image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb2V0cnklMjBib29rcyUyMHZlcnNlfGVufDF8fHx8MTc0MDAxODM5OHww&ixlib=rb-4.1.0&q=80&w=1080" },
                      { name: "Comics", image: "https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21pY3MlMjBib29rcyUyMG1hbmdhfGVufDF8fHx8MTc0MDAxODM5OXww&ixlib=rb-4.1.0&q=80&w=1080" },
                      { name: "Religious", image: "https://images.unsplash.com/photo-1519791883288-dc8bd696e667?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWxpZ2lvdXMlMjBib29rcyUyMHNwaXJpdHVhbHxlbnwxfHx8fDE3NDAwMTgzOTl8MA&ixlib=rb-4.1.0&q=80&w=1080" },
                      { name: "Art & Design", image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnQlMjBkZXNpZ24lMjBib29rc3xlbnwxfHx8fDE3NDAwMTgzOTl8MA&ixlib=rb-4.1.0&q=80&w=1080" },
                      { name: "Educational", image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlZHVjYXRpb25hbCUyMGJvb2tzJTIwc3R1ZHl8ZW58MXx8fHwxNzQwMDE4Mzk5fDA&ixlib=rb-4.1.0&q=80&w=1080" },
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
            )}

            {/* Shop for Loved Ones - always shown in this branch */}
            <section className="py-12 bg-background">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl font-bold text-foreground mb-8">
                  Shop for Loved Ones
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  <Link href="/category?category=Fashion&gender=men"
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

                  <Link href="/category?category=Fashion&gender=women"
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

                  <Link href="/category?category=Fashion&collection=genz"
                    className="group relative overflow-hidden rounded-3xl aspect-[4/3] hover:shadow-2xl transition-all duration-300 hover:scale-105"
                  >
                    <ImageWithFallback
                      src="https://images.unsplash.com/photo-1610738572401-5dfeeb660c7d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnZW4lMjB6JTIweyBvdXQglMjBmYXNoaW9ufGVufDF8fHx8MTc3MTUwMDQwM3ww&ixlib=rb-4.1.0&q=80&w=1080"
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
          </>
        )}

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex gap-6">
            {/* Products Grid */}
            <div className="flex-1 w-full">
              {/* Toolbar */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 sm:mb-6 gap-3 sm:gap-4">
                <div className="flex items-center gap-2">
                  <p className="text-xs sm:text-sm text-foreground font-medium">
                    Showing {products.length} products
                  </p>
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto">
                  {/* Filter Button */}
                  <Sheet open={isFilterSheetOpen} onOpenChange={setIsFilterSheetOpen}>
                    <SheetTrigger asChild>
                      <Button variant="outline" size="sm" className="glass-input flex items-center gap-2 text-foreground border-gray-300 dark:border-gray-600">
                        <SlidersHorizontal className="w-4 h-4" />
                        <span className="hidden sm:inline">Filters</span>
                      </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="glass-lg w-80 overflow-y-auto">
                      <SheetHeader>
                        <SheetTitle className="text-foreground">Filters</SheetTitle>
                        <SheetDescription className="text-muted-foreground">
                          Refine your product search
                        </SheetDescription>
                      </SheetHeader>
                      <div className="mt-6">
                        <FilterContent />
                      </div>
                    </SheetContent>
                  </Sheet>

                  {/* Sort By */}
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-full sm:w-48 glass-input bg-background dark:bg-transparent text-foreground border-gray-300 dark:border-gray-600">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent className="glass-lg">
                      <SelectItem value="featured">Featured</SelectItem>
                      <SelectItem value="price-low">Price: Low to High</SelectItem>
                      <SelectItem value="price-high">Price: High to Low</SelectItem>
                      <SelectItem value="rating">Top Rated</SelectItem>
                      <SelectItem value="newest">Newest</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Products Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
                {products.map((product, index) => (
                  <div
                    key={product.id}
                    className="bg-background dark:bg-card text-card-foreground border border-gray-200 dark:border-gray-700 group overflow-hidden hover:scale-102 sm:hover:scale-105 transition-all duration-300 rounded-lg sm:rounded-xl shadow-sm hover:shadow-lg"
                    style={{ animationDelay: `${(index % 12) * 0.05}s` }}
                  >
                    <Link href={`/products/${product.id}`} className="relative block aspect-square overflow-hidden bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900">
                      {product.badge && (
                        <Badge className="absolute top-1 right-1 sm:top-2 sm:right-2 z-10 bg-gradient-to-r from-[var(--primary-color)] to-orange-600 text-inverse hover:from-[var(--primary-color)] hover:to-orange-600 pulse-glow text-[9px] sm:text-[10px] px-1.5 sm:px-2 py-0.5 border-0">
                          {product.badge}
                        </Badge>
                      )}
                      {!product.inStock && (
                        <Badge className="absolute top-1 right-1 sm:top-2 sm:right-2 z-10 bg-red-600 text-inverse hover:bg-red-600 text-[9px] sm:text-[10px] px-1.5 sm:px-2 py-0.5">
                          Out of Stock
                        </Badge>
                      )}
                      <Button
                        size="icon"
                        variant="secondary"
                        className="absolute top-1 left-1 sm:top-2 sm:left-2 z-10 opacity-100 transition-opacity size-6 sm:size-7 bg-background dark:bg-card text-card-foreground hover:bg-muted dark:hover:bg-card text-card-foreground shadow-sm"
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
                          className={`size-3 sm:size-3.5 transition-all ${isInWishlist(product.id)
                              ? "fill-[var(--primary-color)] text-[var(--primary-color)]"
                              : "text-[var(--primary-color)]"
                            }`}
                        />
                      </Button>
                      <ImageWithFallback
                        src={product.image}
                        alt={product.name}
                        className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
                      />
                    </Link>
                    <div className="p-2 sm:p-3 bg-background dark:bg-card text-card-foreground">
                      <Badge variant="outline" className="mb-1 sm:mb-1.5 text-[9px] sm:text-[10px] border-gray-300 dark:border-gray-600">
                        {product.category}
                      </Badge>
                      <h3 className="font-semibold text-xs sm:text-sm text-foreground mb-1 sm:mb-1.5 line-clamp-2">
                        <Link
                          href={`/products/${product.id}`}
                          className="hover:text-[var(--primary-color)] transition-colors"
                        >
                          {product.name}
                        </Link>
                      </h3>
                      <div className="flex items-center gap-1 mb-1 sm:mb-2">
                        <div className="flex">{[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`size-2.5 sm:size-3 ${i < Math.floor(product.rating)
                                ? "fill-[var(--primary-color)] text-[var(--primary-color)]"
                                : "text-muted dark:text-muted-foreground"
                              }`}
                          />
                        ))}
                        </div>
                        <span className="text-[10px] sm:text-xs text-muted-foreground">
                          {product.rating} ({product.reviews})
                        </span>
                      </div>
                      <div className="flex items-center gap-1 sm:gap-2 mb-1 sm:mb-2">
                        <span className="text-sm sm:text-lg font-bold text-[var(--primary-color)]">
                          ${product.price}
                        </span>
                        {product.originalPrice && (
                          <span className="text-[10px] sm:text-xs text-muted-foreground line-through">
                            ${product.originalPrice}
                          </span>
                        )}
                      </div>
                      <Button
  className="w-full bg-[var(--primary-color)] text-white hover:bg-orange-600 h-9 text-sm font-semibold transition-all duration-200 border-0"
  disabled={!product.inStock}
  onClick={(e) => {
    e.preventDefault();
    e.stopPropagation();
    if (product.inStock) {
      addItem(product.id, (product as any).sku || product.id, 1, {
        id: product.id,
        sku: (product as any).sku || product.id,
        name: product.name,
        price: product.price,
        image: product.image,
      });
      toast.success(`${product.name} added to cart!`);
    }
  }}
>
  {product.inStock ? "Add to Cart" : "Out of Stock"}
</Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Filter Sheet (Modal) */}
        <Sheet open={isFilterOpen} onOpenChange={(open) => !open && closeFilter()}>
          <SheetContent side="left" className="w-80 overflow-y-auto">
            <SheetHeader>
              <SheetTitle>Filters</SheetTitle>
              <SheetDescription>Refine your product search</SheetDescription>
            </SheetHeader>
            <div className="mt-6">
              <FilterContent />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
}
