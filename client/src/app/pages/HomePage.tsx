import { useState, useEffect } from "react";
import Link from "next/link";
import { Star, Heart, ArrowRight, Truck, RotateCcw, Shield, Headphones as HeadphonesIcon } from "lucide-react";
import { bannersApi, categoriesApi, productsApi } from "@/services/api";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Card } from "../components/ui/card";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { ProductCategorySections } from "../components/ProductCategorySections";
import { MobileHomeView } from "../components/MobileHomeView";
import { PromoCarousel } from "../components/PromoCarousel";
import { AdBanner } from "../components/AdBanner";
import { HeroCarousel } from "../components/HeroCarousel";
import { useCart } from "../contexts/CartContext";
import { useWishlist } from "../contexts/WishlistContext";
import { toast } from "sonner";

// Types
interface Ad {
  id: string;
  title: string;
  description: string;
  image: string;
  buttonText: string;
  buttonLink: string;
  discount?: string;
  type: string;
  backgroundColor?: string;
}

interface HeroSlide {
  id: string;
  image: string;
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  textPosition: string;
}

function mapApiProduct(p: Record<string, unknown>) {
  const cat = p.category as Record<string, unknown> | undefined;
  const images = (p.images as string[] | undefined) || [];
  return {
    id: (p._id as string) ?? "",
    name: (p.title as string) ?? (p.name as string) ?? "",
    category: (cat?.name as string) ?? "",
    price: (p.offerPrice as number) ?? (p.price as number) ?? 0,
    originalPrice: p.offerPrice != null ? (p.price as number) : undefined,
    image: images[0] ?? "",
    badge: p.offerPrice != null ? "Sale" : undefined,
    rating: 4.5,
    reviews: 0,
    inStock: (p.stock as number ?? 1) > 0,
  };
}

export function HomePage() {
  const [isMobile, setIsMobile] = useState(false);
  const [apiBanners, setApiBanners] = useState<Array<{ image: string; title?: string; subtitle?: string; link?: string; linkText?: string }>>([]);
  const [apiFeatured, setApiFeatured] = useState<Array<{ id: string; name: string; category: string; price: number; originalPrice?: number; image: string; badge?: string; rating: number; reviews: number; inStock?: boolean }>>([]);
  const [apiOffers, setApiOffers] = useState<Array<Record<string, unknown>>>([]);
  const { addItem } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    Promise.all([
      bannersApi.list().catch(() => []),
      productsApi.featured(12).catch(() => []),
      productsApi.offers(12).catch(() => []),
    ]).then(([banners, featured, offers]) => {
      setApiBanners(Array.isArray(banners) ? banners : []);
      setApiFeatured((Array.isArray(featured) ? featured : []).map(mapApiProduct));
      setApiOffers(Array.isArray(offers) ? offers : []);
    });
  }, []);

  // Show mobile view on small screens (below 640px)
  if (isMobile) {
    return <MobileHomeView />;
  }

  // Mock ads data - In production, this would come from the admin panel API
  const ads: Ad[] = [
    {
  id: "1",
  title: "Summer Sale 2026",
  description:
    "Get up to 50% off on all summer collections. Limited time offer!",
  image:
    "https://images.unsplash.com/photo-1607083206869-4c7672e72a8a?w=800",
  buttonText: "Shop Summer Sale",
  buttonLink: "/category?sale=summer",
  discount: "Up to 50% OFF",
  type: "hero",
  backgroundColor:
    "bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500",
},
    {
      id: "2",
      title: "New Electronics Collection",
      description: "Discover the latest tech gadgets and smart devices",
      image:
        "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=500",
      buttonText: "Explore Now",
      buttonLink: "/category?category=Electronics",
      discount: "New Arrivals",
      type: "banner",
      backgroundColor: "bg-gradient-to-r from-purple-600 to-pink-600",
    },
    {
      id: "3",
      title: "Fashion Week Special",
      description: "Trending styles at unbeatable prices",
      image:
        "https://images.unsplash.com/photo-1445205170230-053b83016050?w=500",
      buttonText: "Shop",
      buttonLink: "/category?category=Fashion",
      discount: "30% OFF",
      type: "square",
      backgroundColor: "bg-gradient-to-br from-pink-500 to-rose-600",
    },
    {
      id: "4",
      title: "Home Decor Deals",
      description: "Transform your space with our curated collection",
      image:
        "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500",
      buttonText: "View",
      buttonLink: "/category?category=Home",
      type: "square",
      backgroundColor: "bg-gradient-to-br from-blue-600 to-cyan-600",
    },
    {
      id: "5",
      title: "Free Shipping on Orders Over $50",
      description: "Shop now and save on delivery costs",
      image:
        "https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?w=300",
      buttonText: "Shop Now",
      buttonLink: "/category",
      type: "wide",
      backgroundColor: "bg-gradient-to-r from-green-600 to-emerald-600",
    },
  ];

  const featuredProductsFallback = [
    { id: "1", name: "Premium Wireless Headphones", category: "Electronics", price: 299.99, originalPrice: 399.99, rating: 4.8, reviews: 256, image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500", badge: "Best Seller", inStock: true },
    { id: "2", name: "Designer Leather Jacket", category: "Fashion", price: 249.99, originalPrice: 349.99, rating: 4.9, reviews: 189, image: "https://images.unsplash.com/photo-1524282745852-a463fa495a7f?w=500", badge: "Trending", inStock: true },
    { id: "3", name: "Modern Accent Chair", category: "Home & Garden", price: 449.99, rating: 4.7, reviews: 142, image: "https://images.unsplash.com/photo-1567016546367-c27a0d56712e?w=500", badge: "New Arrival", inStock: true },
    { id: "4", name: "Professional Yoga Mat", category: "Sports", price: 79.99, originalPrice: 99.99, rating: 4.6, reviews: 328, image: "https://images.unsplash.com/photo-1767714453328-ca5f4b0ffcd6?w=500", inStock: true },
  ];
  const featuredProducts = apiFeatured.length > 0 ? apiFeatured : featuredProductsFallback;

  const categories = [
    {
      name: "Electronics",
      count: "2,500+ products",
      image:
        "https://images.unsplash.com/photo-1757168120889-4317e57a4849?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBoZWFkcGhvbmVzJTIwcHJvZHVjdCUyMGJsYWNrfGVufDF8fHx8MTc3MTMxNzE4OXww&ixlib=rb-4.1.0&q=80&w=1080",
      color: "from-blue-500 to-blue-600",
    },
    {
      name: "Fashion",
      count: "3,200+ products",
      image:
        "https://images.unsplash.com/photo-1524282745852-a463fa495a7f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwY2xvdGhpbmclMjBzdG9yZSUyMG1pbmltYWx8ZW58MXx8fHwxNzcxMzE3MTg5fDA&ixlib=rb-4.1.0&q=80&w=1080",
      color: "from-pink-500 to-pink-600",
    },
    {
      name: "Home & Garden",
      count: "1,800+ products",
      image:
        "https://images.unsplash.com/photo-1567016546367-c27a0d56712e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob21lJTIwZGVjb3IlMjBtb2Rlcm4lMjBmdXJuaXR1cmV8ZW58MXx8fHwxNzcxMzE3MTg5fDA&ixlib=rb-4.1.0&q=80&w=1080",
      color: "from-green-500 to-green-600",
    },
    {
      name: "Sports",
      count: "1,500+ products",
      image:
        "https://images.unsplash.com/photo-1767714453328-ca5f4b0ffcd6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcG9ydHMlMjBlcXVpcG1lbnQlMjBmaXRuZXNzJTIwZ2VhcnxlbnwxfHx8fDE3NzEzMTcxOTB8MA&ixlib=rb-4.1.0&q=80&w=1080",
      color: "from-orange-500 to-orange-600",
    },
    {
      name: "Beauty",
      count: "2,100+ products",
      image:
        "https://images.unsplash.com/photo-1665625771491-a9c97a52c927?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWF1dHklMjBjb3NtZXRpY3MlMjBtYWtldXAlMjBwcm9kdWN0c3xlbnwxfHx8fDE3NzEzMTcxOTB8MA&ixlib=rb-4.1.0&q=80&w=1080",
      color: "from-purple-500 to-purple-600",
    },
    {
      name: "Books",
      count: "5,000+ products",
      image:
        "https://images.unsplash.com/photo-1524282745852-a463fa495a7f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwY2xvdGhpbmclMjBzdG9yZSUyMG1pbmltYWx8ZW58MXx8fHwxNzcxMzE3MTg5fDA&ixlib=rb-4.1.0&q=80&w=1080",
      color: "from-amber-500 to-amber-600",
    },
  ];

  const features = [
    {
      icon: Truck,
      title: "Free Shipping",
      description: "On orders over $50",
    },
    {
      icon: RotateCcw,
      title: "30-Day Returns",
      description: "Money back guarantee",
    },
    {
      icon: Shield,
      title: "Secure Payment",
      description: "100% protected",
    },
    {
      icon: HeadphonesIcon,
      title: "24/7 Support",
      description: "Dedicated support",
    },
  ];

  const heroSlidesFallback: HeroSlide[] = [
    { id: "1", image: "https://images.unsplash.com/photo-1607083206869-4c7672e72a8a?w=800", title: "Mega Sale 2026", description: "Up to 70% off on selected items. Limited time only!", buttonText: "Shop Now", buttonLink: "/category?sale=mega", textPosition: "center" },
    { id: "2", image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=800", title: "New Fashion Collection", description: "Discover the latest trends in fashion and style", buttonText: "Explore Fashion", buttonLink: "/category?category=Fashion", textPosition: "center" },
    { id: "3", image: "https://images.unsplash.com/photo-1738520420654-87cd2ad005d0?w=1080", title: "Latest Tech Gadgets", description: "Upgrade your tech with the newest electronics", buttonText: "Shop Electronics", buttonLink: "/category?category=Electronics", textPosition: "center" },
  ];
  const heroSlides: HeroSlide[] =
    apiBanners.length > 0
      ? apiBanners.map((b, i) => ({
        id: String(i),
        image: b.image,
        title: b.title ?? "",
        description: b.subtitle ?? "",
        buttonText: b.linkText ?? "Shop Now",
        buttonLink: b.link ?? "/category",
        textPosition: "center" as const,
      }))
      : heroSlidesFallback;

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Animated Background Gradients - macOS style */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-orange-500/30 via-red-500/20 to-pink-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-gradient-to-br from-purple-500/20 via-blue-500/20 to-cyan-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-gradient-to-br from-pink-500/20 via-orange-500/20 to-yellow-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Hero Advertisement Carousel */}
        <section className="relative overflow-hidden">
          <HeroCarousel slides={heroSlides} autoPlayInterval={5000} />
        </section>

        {/* Features with Glass Cards */}
        <section className="py-12 relative">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">

      {features.map((feature, index) => (
        <div
          key={index}
          className="glass-card p-4 rounded-xl flex items-center gap-3 hover:scale-105 transition-all scale-in"
          style={{ animationDelay: `${index * 0.1}s` }}
        >

          {/* ICON BOX */}
          <div className="p-3 bg-gradient-to-br from-[var(--primary-color)] to-orange-600 rounded-lg text-white shadow-lg">
            <feature.icon className="size-5 text-white" />
          </div>

          {/* TEXT */}
          <div>
            <h3 className="font-semibold text-sm text-foreground">
              {feature.title}
            </h3>
            <p className="text-xs text-muted-foreground">
              {feature.description}
            </p>
          </div>

        </div>
      ))}

    </div>

  </div>
</section>

        {/* Flash Deals & Offers Carousel */}
        <PromoCarousel />

        {/* Category Grid Section */}
        <section className="py-8 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 gap-3">
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

        {/* Shop for Loved Ones Section */}
        <section className="py-12 bg-background">
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
                  src="https://images.unsplash.com/photo-1610738572401-5dfeeb660c7d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnZW4lMjB6JTIweY91dGglMjBmYXNoaW9ufGVufDF8fHx8MTc3MTUwMDQwM3ww&ixlib=rb-4.1.0&q=80&w=1080"
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

        {/* Basant Panchami Specials */}
        <section className="py-12 bg-gradient-to-b from-yellow-50 to-white dark:from-gray-900 dark:to-gray-950">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-foreground mb-6">
              🌸 Basant Panchami Specials
            </h2>
            <div className="flex gap-4 overflow-x-auto scroll-smooth pb-4 snap-x snap-mandatory scrollbar-dark">
              {[
                {
                  name: "Kurtas",
                  price: "From ₹299",
                  image: "https://images.unsplash.com/photo-1759720887988-3bb77456cb26?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBrdXJ0YSUyMHllbGxvdyUyMGdvbGQlMjBldGhuaWN8ZW58MXx8fHwxNzcxNTAwNTUyfDA&ixlib=rb-4.1.0&q=80&w=1080",
                  bg: "bg-gradient-to-br from-yellow-200 to-yellow-300",
                },
                {
                  name: "Dress, co-ords",
                  price: "Min. 70% Off",
                  image: "https://images.unsplash.com/photo-1769275061088-85697a30ee50?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5ZWxsb3clMjBkcmVzcyUyMGluZGlhbiUyMGV0aG5pY3xlbnwxfHx8fDE3NzE1MDA1NTN8MA&ixlib=rb-4.1.0&q=80&w=1080",
                  bg: "bg-gradient-to-br from-yellow-200 to-orange-200",
                },
                {
                  name: "Floral Kurtas",
                  price: "From ₹299",
                  image: "https://images.unsplash.com/photo-1764583473839-63a1afa95667?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmbG9yYWwlMjBrdXJ0YSUyMHRyYWRpdGlvbmFsfGVufDF8fHx8MTc3MTUwMDU1M3ww&ixlib=rb-4.1.0&q=80&w=1080",
                  bg: "bg-gradient-to-br from-yellow-300 to-amber-300",
                },
                {
                  name: "Ethnic sets",
                  price: "Min. 70% Off",
                  image: "https://images.unsplash.com/photo-1576830951169-82f94b1db5a0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxraWRzJTIwZXRobmljJTIwd2VhciUyMHllbGxvd3xlbnwxfHx8fDE3NzE1MDA1NTN8MA&ixlib=rb-4.1.0&q=80&w=1080",
                  bg: "bg-gradient-to-br from-yellow-200 to-yellow-400",
                },
                {
                  name: "Jhumkas",
                  price: "From ₹99",
                  image: "https://images.unsplash.com/photo-1714733831162-0a6e849141be?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb2xkJTIwamh1bWthJTIwZWFycmluZ3N8ZW58MXx8fHwxNzcxNTAwNTU0fDA&ixlib=rb-4.1.0&q=80&w=1080",
                  bg: "bg-gradient-to-br from-amber-200 to-yellow-300",
                },
              ].map((item, index) => (
                <Link key={index}
                  href={`/category?category=Fashion&subcategory=${encodeURIComponent(item.name)}`}
                  className="group flex-shrink-0 w-64 snap-start"
                >
                  <div className={`${item.bg} rounded-3xl overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-105`}>
                    <div className="aspect-[3/4] relative overflow-hidden">
                      <ImageWithFallback
                        src={item.image}
                        alt={item.name}
                        className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
                        <div className="flex items-center justify-between text-inverse">
                          <div>
                            <h3 className="font-bold text-lg">{item.name}</h3>
                            <p className="text-sm font-semibold">{item.price}</p>
                          </div>
                          <div className="text-4xl">🌸</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Clearance Offers */}
        <section className="py-12 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-foreground mb-6">
              🔥 Clearance offers
            </h2>
            <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory">
              {[
                {
                  name: "Kurta sets",
                  price: "Min. 60% Off",
                  image: "https://images.unsplash.com/photo-1734588866324-d7ed73b1f08b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXN0ZWwlMjBrdXJ0YSUyMHNldCUyMHdvbWVufGVufDF8fHx8MTc3MTUwMDU1NHww&ixlib=rb-4.1.0&q=80&w=1080",
                },
                {
                  name: "Killer, Spykar...",
                  price: "Min. 70% Off",
                  image: "https://images.unsplash.com/photo-1763609973511-77f5caecd0f5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZW5zJTIwamVhbnMlMjBkZW5pbSUyMGNhc3VhbHxlbnwxfHx8fDE3NzE1MDA1NTR8MA&ixlib=rb-4.1.0&q=80&w=1080",
                },
                {
                  name: "Allen Solly, USPA...",
                  price: "Min. 60% Off",
                  image: "https://images.unsplash.com/photo-1557503800-1bdcd9acdc67?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxraWRzJTIwY2xvdGhpbmclMjBjb2xvcmZ1bCUyMGNoaWxkcmVufGVufDF8fHx8MTc3MTUwMDU1NXww&ixlib=rb-4.1.0&q=80&w=1080",
                },
                {
                  name: "Abros & Action",
                  price: "Min. 65% Off",
                  image: "https://images.unsplash.com/photo-1735313476767-86ed2718f97f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcG9ydHMlMjBzbmVha2VycyUyMGNvbG9yZnVsfGVufDF8fHx8MTc3MTUwMDU1NXww&ixlib=rb-4.1.0&q=80&w=1080",
                },
                {
                  name: "Campus",
                  price: "Min. 50% Off",
                  image: "https://images.unsplash.com/photo-1758646483134-1a5cbc9aa349?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aGl0ZSUyMGNhbnZhcyUyMHNob2VzJTIwY2FzdWFsfGVufDF8fHx8MTc3MTUwMDU1NXww&ixlib=rb-4.1.0&q=80&w=1080",
                },
              ].map((item, index) => (
                <Link key={index}
                  href={`/category?category=Fashion&subcategory=${encodeURIComponent(item.name)}`}
                  className="group flex-shrink-0 w-56 snap-start"
                >
                  <div className="bg-muted rounded-3xl overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-105 border-2 border-orange-400">
                    <div className="aspect-[3/4] relative overflow-hidden">
                      <ImageWithFallback
                        src={item.image}
                        alt={item.name}
                        className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-base text-foreground mb-1 line-clamp-1">
                        {item.name}
                      </h3>
                      <p className="text-sm font-semibold text-green-600 dark:text-green-400">
                        {item.price}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="py-16">
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
                <Link href="/category">
                  View All
                  <ArrowRight className="size-4 ml-2" />
                </Link>
              </Button>
            </div>
            <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 gap-3">
              {categories.map((category) => (
                <Link key={category.name}
                  href={`/category?category=${encodeURIComponent(category.name)}`}
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

        {/* Special Offers & Promotions - Ad Section */}
        <section className="py-20 bg-gradient-to-b from-orange-50 to-white dark:from-gray-900 dark:to-gray-950">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

            <div className="text-center mb-16">

              <Badge className="bg-[var(--primary-color)] text-white hover:bg-orange-600 mb-6 text-base px-6 py-2 font-bold shadow-lg border-0">
                🔥 Limited Time Offers
              </Badge>

              <h2 className="text-5xl md:text-6xl font-bold text-foreground mb-6 tracking-tight">
                Special Offers & Promotions
              </h2>

              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Don't miss out on our exclusive deals and limited-time offers. Save big on your favorite products today!
              </p>

            </div>

            <AdBanner ads={ads} />
          </div>
        </section>

        {/* Product Category Sections */}
        <ProductCategorySections />

        {/* Featured Products */}
        <section className="py-8 sm:py-12 md:py-16 relative bg-transparent">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 sm:mb-8 gap-3">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
                  ⭐ Featured Products
                </h2>
                <p className="text-sm sm:text-base text-muted-foreground">
                  Hand-picked items just for you
                </p>
              </div>
              <Button
                className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-[var(--primary-color)] text-white hover:bg-orange-600 shadow-md hover:shadow-lg border-0"
                asChild
              >
                <Link href="/category">
                  View All
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
              {featuredProducts.map((product, index) => (
                <div
                  key={product.id}
                  className="glass-card group overflow-hidden hover:scale-102 sm:hover:scale-105 transition-all duration-300 rounded-lg sm:rounded-xl"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <Link href={`/products/${product.id}`} className="relative block aspect-square overflow-hidden bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900">
                    {product.badge && (
                      <Badge className="absolute top-1 right-1 sm:top-2 sm:right-2 z-10 bg-gradient-to-r from-[var(--primary-color)] to-orange-600 text-inverse hover:from-[var(--primary-color)] hover:to-orange-600 pulse-glow text-[9px] sm:text-[10px] px-1.5 sm:px-2 py-0.5 border-0">
                        {product.badge}
                      </Badge>
                    )}
                    <Button
                      size="icon"
                      variant="secondary"
                      className="absolute top-2 left-2 z-10 glass opacity-0 group-hover:opacity-100 transition-opacity size-7"
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
                        className="size-3.5 text-[var(--primary-color)]"
                        fill={isInWishlist(product.id) ? "var(--primary-color)" : "none"}
                      />
                    </Button>
                    <ImageWithFallback
                      src={product.image}
                      alt={product.name}
                      className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
                    />
                  </Link>
                  <div className="p-2 sm:p-3">
                    <Badge variant="outline" className="mb-1 sm:mb-1.5 text-[9px] sm:text-[10px] glass-sm">
                      {product.category}
                    </Badge>
                    <h3 className="font-semibold text-xs sm:text-sm text-foreground mb-1 sm:mb-1.5 line-clamp-2">
                      <Link href={`/products/${product.id}`}
                        className="hover:text-[var(--primary-color)] transition-colors"
                      >
                        {product.name}
                      </Link>
                    </h3>
                    <div className="flex items-center gap-0.5 sm:gap-1 mb-1 sm:mb-2">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
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
                      className="w-full bg-[var(--primary-color)] text-white hover:bg-orange-600 h-7 sm:h-8 text-xs sm:text-sm font-semibold transition-all duration-200 border-0"
                      disabled={product.inStock === false}
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
                      {product.inStock === false ? "Out of Stock" : "Add to Cart"}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Banner */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Card className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 text-white p-8 md:p-12 rounded-2xl shadow-xl">              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full -ml-24 -mb-24" />

              <div className="relative z-10 text-center max-w-3xl mx-auto">

                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white" >
                  Join Our Rewards Program
                </h2>

                <p className="text-lg text-white/90 mb-8" >
                  Earn points with every purchase and get exclusive discounts.
                  Refer friends and get even more rewards!
                </p>

                <Button
                  size="lg"
                  className="bg-white text-[var(--primary-color)] hover:bg-gray-100 text-lg h-14 font-semibold shadow-md border-0"
                  asChild
                >
                  <Link href="/rewards">
                    Learn More
                    <ArrowRight className="size-5 ml-2" />
                  </Link>
                </Button>

              </div>
            </Card>
          </div>
        </section>
      </div>
    </div>
  );
}


