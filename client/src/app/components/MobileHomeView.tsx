import { useState, useEffect } from "react";
import { Search, ShoppingCart, MapPin, ChevronDown, ShoppingBag, TrendingUp, Truck, Shield, Headphones, RotateCcw, Star, ArrowRight, Heart, Home, Grid3x3, User, Sun, Moon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { PromoCarousel } from "./PromoCarousel";
import { AdBanner } from "./AdBanner";
import { ThemeToggle } from "./ThemeToggle";
import { FeaturedProductsSection, CategoryGridSection } from "./MobileHomeSections";
import { useWishlist } from "../contexts/WishlistContext";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
const heroBanner = null;

export function MobileHomeView() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState("Thiruvananthapuram");
  const navigate = useRouter();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const handleSearch = () => {
    if (searchQuery.trim()) {
      setShowSearch(false);
      router.push(`/products?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery("");
    }
  };

  const locations = [
    "Thiruvananthapuram",
    "Kochi",
    "Kozhikode",
    "Thrissur",
    "Kollam",
    "Palakkad",
    "Alappuzha",
    "Kannur",
    "Kottayam",
    "Malappuram"
  ];

  const heroSlides = [
    {
      badge: "New Season Arrivals",
      title: "Discover Your Style with N4ASHYOL",
      description: "Shop the latest trends in electronics, fashion, home decor, and more. Quality products at unbeatable prices.",
      buttons: [
        { text: "Shop Now", icon: ShoppingBag, primary: true, link: "/products" },
        { text: "View Trending", icon: TrendingUp, primary: false, link: "/products?sort=trending" },
      ],
    },
    {
      badge: "Hot Deals",
      title: "Exclusive Offers Just for You",
      description: "Get up to 50% off on selected items. Limited time offer on premium products.",
      buttons: [
        { text: "Shop Now", icon: ShoppingBag, primary: true, link: "/products?sale=true" },
        { text: "View All Deals", icon: TrendingUp, primary: false, link: "/products?deals=true" },
      ],
    },
    {
      badge: "Best Sellers",
      title: "Top Rated Products",
      description: "Explore our most popular items loved by thousands of customers worldwide.",
      buttons: [
        { text: "Shop Now", icon: ShoppingBag, primary: true, link: "/products?sort=bestsellers" },
        { text: "View Trending", icon: TrendingUp, primary: false, link: "/products?sort=rating" },
      ],
    },
  ];

  // Auto-rotate carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(timer);
  }, [heroSlides.length]);

  const features = [
    {
      icon: Truck,
      title: "Free Shipping",
      description: "On orders over $50",
    },
    {
      icon: Headphones,
      title: "24/7 Support",
      description: "Contact us anytime",
    },
    {
      icon: Shield,
      title: "Secure Payment",
      description: "100% Protected",
    },
    {
      icon: RotateCcw,
      title: "Easy Returns",
      description: "30-Day Return Policy",
    },
  ];

  const categories = [
    {
      name: "Electronics",
      image:
        "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400&h=400&fit=crop",
      color: "from-blue-500/70 to-blue-600/70",
      count: "2,451 items",
    },
    {
      name: "Fashion",
      image:
        "https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&h=400&fit=crop",
      color: "from-pink-500/70 to-pink-600/70",
      count: "3,892 items",
    },
    {
      name: "Home & Garden",
      image:
        "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=400&h=400&fit=crop",
      color: "from-green-500/70 to-green-600/70",
      count: "1,834 items",
    },
    {
      name: "Sports",
      image:
        "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=400&h=400&fit=crop",
      color: "from-orange-500/70 to-orange-600/70",
      count: "1,245 items",
    },
    {
      name: "Beauty",
      image:
        "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=400&fit=crop",
      color: "from-purple-500/70 to-purple-600/70",
      count: "987 items",
    },
    {
      name: "Books",
      image:
        "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=400&h=400&fit=crop",
      color: "from-indigo-500/70 to-indigo-600/70",
      count: "2,156 items",
    },
  ];

  const ads = [
    {
      id: "1",
      title: "Summer Sale Extravaganza",
      description: "Get up to 70% off on fashion items",
      discount: "70% OFF",
      image:
        "https://images.unsplash.com/photo-1607083206869-4c7672e72a8a?w=1200&h=600&fit=crop",
      buttonText: "Shop Now",
      buttonLink: "/products?category=Fashion&sale=true",
      type: "hero" as const,
    },
    {
      id: "2",
      title: "Tech Gadgets Bonanza",
      description: "Latest electronics at unbeatable prices",
      discount: "50% OFF",
      image:
        "https://images.unsplash.com/photo-1468495244123-6c6c332eeece?w=1200&h=600&fit=crop",
      buttonText: "Explore Deals",
      buttonLink: "/products?category=Electronics&sale=true",
      type: "banner" as const,
    },
    {
      id: "3",
      title: "Home Makeover Special",
      description: "Transform your space with our collection",
      discount: "40% OFF",
      image:
        "https://images.unsplash.com/photo-1556020685-ae41abfc9365?w=1200&h=600&fit=crop",
      buttonText: "Discover More",
      buttonLink: "/products?category=Home+%26+Garden",
      type: "square" as const,
    },
  ];

  const featuredProducts = [
    {
      id: "1",
      name: "Samsung Galaxy S10",
      image: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=300&h=300&fit=crop",
      price: 860.00,
      originalPrice: 1000.00,
      category: "Electronics",
      rating: 4.5,
      reviews: 128,
      badge: "Best Seller",
    },
    {
      id: "2",
      name: "Stone Plante",
      image: "https://images.unsplash.com/photo-1509937528035-ad76254b0356?w=300&h=300&fit=crop",
      price: 16.00,
      originalPrice: 30.00,
      category: "Home & Garden",
      rating: 4.8,
      reviews: 89,
      badge: "Hot Deal",
    },
    {
      id: "3",
      name: "Xiaomi Mi Airdots",
      image: "https://images.unsplash.com/photo-1606841837239-c5a1a4a07af7?w=300&h=300&fit=crop",
      price: 30.00,
      originalPrice: 50.00,
      category: "Electronics",
      rating: 4.3,
      reviews: 234,
    },
    {
      id: "4",
      name: "Wireless Headphones",
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop",
      price: 120.00,
      originalPrice: 180.00,
      category: "Electronics",
      rating: 4.7,
      reviews: 456,
      badge: "New",
    },
    {
      id: "5",
      name: "Apple Watch Series 7",
      image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=300&h=300&fit=crop",
      price: 399.00,
      originalPrice: 529.00,
      category: "Electronics",
      rating: 4.9,
      reviews: 892,
      badge: "Trending",
    },
    {
      id: "6",
      name: "Nike Air Max 2023",
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=300&fit=crop",
      price: 159.00,
      originalPrice: 220.00,
      category: "Fashion",
      rating: 4.6,
      reviews: 567,
    },
    {
      id: "7",
      name: "Canon EOS R6",
      image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=300&h=300&fit=crop",
      price: 2299.00,
      originalPrice: 2899.00,
      category: "Electronics",
      rating: 4.8,
      reviews: 342,
      badge: "Limited",
    },
    {
      id: "8",
      name: "Leather Sofa Set",
      image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=300&h=300&fit=crop",
      price: 899.00,
      originalPrice: 1299.00,
      category: "Home & Garden",
      rating: 4.7,
      reviews: 201,
    },
    {
      id: "9",
      name: "Sony WH-1000XM5",
      image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=300&h=300&fit=crop",
      price: 349.00,
      originalPrice: 449.00,
      category: "Electronics",
      rating: 4.9,
      reviews: 1234,
      badge: "Popular",
    },
    {
      id: "10",
      name: "Designer Handbag",
      image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=300&h=300&fit=crop",
      price: 189.00,
      originalPrice: 299.00,
      category: "Fashion",
      rating: 4.5,
      reviews: 345,
    },
  ];

  const carouselSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
    swipeToSlide: true,
    centerMode: false,
    responsive: [
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      }
    ]
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-orange-50/30 to-purple-50/20 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
      {/* Mobile Header with Glass Effect */}
      <div className="bg-gradient-to-r from-[var(--primary-color)] to-orange-600 text-inverse px-4 py-4 sticky top-0 z-50 shadow-xl">
        <div className="flex items-center justify-center">
          <h1 className="text-xl font-bold tracking-wide text-inverse" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.2)' }}>N4ASHYOL</h1>
        </div>
      </div>

      {/* Search Modal Overlay */}
      {showSearch && (
        <div className="fixed inset-0 z-[60] bg-inverse/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-card p-4 shadow-2xl animate-in slide-in-from-top duration-300">
            <div className="flex items-center gap-3">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && searchQuery.trim()) {
                      handleSearch();
                    }
                  }}
                  className="w-full pl-12 pr-4 py-3 bg-muted border border-gray-200 dark:border-gray-700 rounded-full text-foreground placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent"
                  autoFocus
                />
              </div>
              <button
                onClick={() => {
                  setShowSearch(false);
                  setSearchQuery("");
                }}
                className="p-3 bg-muted hover:bg-border dark:hover:bg-card text-card-foreground rounded-full transition-colors"
              >
                <span className="text-foreground font-medium text-sm">Cancel</span>
              </button>
            </div>
            
            {/* Quick Search Suggestions */}
            <div className="mt-4 space-y-2">
              <p className="text-xs font-semibold text-muted-foreground px-2">Popular Searches</p>
              <div className="flex flex-wrap gap-2">
                {['Electronics', 'Fashion', 'Home Decor', 'Sports', 'Beauty'].map((term) => (
                  <Link key={term}
                    href={`/products?category=${term}`}
                    onClick={() => setShowSearch(false)}
                    className="px-4 py-2 bg-muted hover:bg-[var(--primary-color)] hover:text-inverse dark:hover:bg-[var(--primary-color)] rounded-full text-sm font-medium text-muted-foreground transition-all"
                  >
                    {term}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Location Bar with Glass Effect */}
      <div className="px-4 py-3 bg-card border-b border-border shadow-sm">
        <button 
          onClick={() => setShowLocationModal(true)}
          className="w-full flex items-center gap-3 px-4 py-2.5 bg-muted border border-gray-200 dark:border-gray-700 rounded-full hover:bg-muted dark:hover:bg-card text-card-foreground transition-all duration-300"
        >
          <MapPin className="size-5 text-[var(--primary-color)] flex-shrink-0" />
          <span className="flex-1 text-left text-sm font-medium text-foreground">
            Deliver to {selectedLocation}
          </span>
          <ChevronDown className="size-5 text-muted-foreground flex-shrink-0" />
        </button>
      </div>

      {/* Location Selection Modal */}
      {showLocationModal && (
        <div className="fixed inset-0 z-[60] bg-inverse/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="fixed bottom-0 left-0 right-0 bg-card rounded-t-3xl shadow-2xl animate-in slide-in-from-bottom duration-300 max-h-[70vh] overflow-hidden">
            {/* Modal Header */}
            <div className="sticky top-0 bg-card border-b border-border px-6 py-4 z-10">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <MapPin className="size-6 text-[var(--primary-color)]" />
                  <h3 className="text-lg font-bold text-foreground">Select Delivery Location</h3>
                </div>
                <button
                  onClick={() => setShowLocationModal(false)}
                  className="p-2 hover:bg-muted dark:hover:bg-card text-card-foreground rounded-full transition-colors"
                >
                  <span className="text-2xl text-muted-foreground">&times;</span>
                </button>
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                Choose your location for accurate delivery estimates
              </p>
            </div>

            {/* Locations List */}
            <div className="overflow-y-auto max-h-[calc(70vh-120px)] px-6 py-4">
              <div className="space-y-2">
                {locations.map((location) => (
                  <button
                    key={location}
                    onClick={() => {
                      setSelectedLocation(location);
                      setShowLocationModal(false);
                    }}
                    className={`w-full flex items-center gap-4 p-4 rounded-xl transition-all duration-300 ${
                      selectedLocation === location
                        ? "bg-gradient-to-r from-[var(--primary-color)] to-orange-600 text-inverse shadow-lg"
                        : "bg-muted hover:bg-muted dark:hover:bg-card text-card-foreground text-foreground"
                    }`}
                  >
                    <MapPin 
                      className={`size-5 flex-shrink-0 ${
                        selectedLocation === location ? "text-inverse" : "text-[var(--primary-color)]"
                      }`} 
                    />
                    <span className="flex-1 text-left font-medium">{location}</span>
                    {selectedLocation === location && (
                      <svg className="size-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Hero Banner Carousel */}
      <div className="relative bg-gradient-to-r from-[var(--primary-color)] to-orange-600 dark:from-orange-600 dark:to-orange-700">
        <div className="overflow-hidden">
          <div 
            className="flex transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {heroSlides.map((slide, index) => (
              <div key={index} className="min-w-full px-4 py-8">
                <div className="flex flex-col md:flex-row items-center gap-6">
                  {/* Left Content */}
                  <div className="flex-1 text-inverse">
                    <div className="inline-flex items-center gap-2 bg-background/20 backdrop-blur-sm px-3 py-1 rounded-full mb-4">
                      <span className="text-xs font-medium">✨ {slide.badge}</span>
                    </div>
                    <h1 className="text-2xl md:text-4xl font-bold mb-3 leading-tight">
                      {slide.title}
                    </h1>
                    <p className="text-sm md:text-base text-inverse/90 mb-6 leading-relaxed">
                      {slide.description}
                    </p>
                    <div className="flex flex-wrap gap-3">
                      {slide.buttons.map((button, btnIndex) => {
                        const Icon = button.icon;
                        return (
                          <Link key={btnIndex} href={button.link}>
                            <button
                              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium text-sm transition-all ${
                                button.primary
                                  ? "bg-background text-[var(--primary-color)] hover:bg-muted"
                                  : "bg-background/20 backdrop-blur-sm text-inverse border border-white/30 hover:bg-background/30"
                              }`}
                            >
                              <Icon className="size-4" />
                              {button.text}
                            </button>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Carousel Indicators */}
        <div className="flex justify-center gap-2 pb-6">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-2 rounded-full transition-all ${
                currentSlide === index
                  ? "w-8 bg-background"
                  : "w-2 bg-background/40 hover:bg-background/60"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Clearance Offers Section */}
      <div className="px-4 py-6 bg-transparent">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-2xl">🔥</span>
          <h2 className="text-2xl font-bold text-foreground">Clearance offers</h2>
        </div>
        <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide -mx-4 px-4">
          {[
            {
              name: "Kurta sets",
              discount: "Min. 60% Off",
              image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=400&h=500&fit=crop",
              gradient: "from-yellow-500/80 to-orange-500/80"
            },
            {
              name: "Killer, Spykar...",
              discount: "Min. 70% Off",
              image: "https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?w=400&h=500&fit=crop",
              gradient: "from-blue-500/80 to-indigo-500/80"
            },
            {
              name: "Allen Solly, USPA...",
              discount: "Min. 60% Off",
              image: "https://images.unsplash.com/photo-1600003014755-ba31aa59c4b6?w=400&h=500&fit=crop",
              gradient: "from-teal-500/80 to-cyan-500/80"
            },
            {
              name: "Abros & Action",
              discount: "Min. 65% Off",
              image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=500&fit=crop",
              gradient: "from-purple-500/80 to-pink-500/80"
            },
            {
              name: "Campus",
              discount: "Min. 50% Off",
              image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=400&h=500&fit=crop",
              gradient: "from-gray-500/80 to-slate-500/80"
            }
          ].map((item, index) => (
            <Link key={index}
              href={`/products?category=${item.name}`}
              className="flex-shrink-0 w-[160px] group"
            >
              <div className="relative rounded-2xl overflow-hidden h-[240px] shadow-lg hover:shadow-xl transition-all duration-300">
                <ImageWithFallback
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${item.gradient} opacity-60`} />
                <div className="absolute bottom-0 left-0 right-0 p-4 text-inverse">
                  <h3 className="font-bold text-base mb-1">{item.name}</h3>
                  <span className="text-sm font-semibold text-green-300">{item.discount}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Basant Panchami Specials Section */}
      <div className="px-4 py-6 bg-transparent">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-2xl">🌸</span>
          <h2 className="text-2xl font-bold text-foreground">Basant Panchami Specials</h2>
        </div>
        <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide -mx-4 px-4">
          {[
            {
              name: "Kurtas",
              price: "From ₹299",
              image: "https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?w=400&h=500&fit=crop",
              gradient: "from-cyan-500/70 to-blue-500/70"
            },
            {
              name: "Dress, co-ords",
              price: "Min. 70% Off",
              image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=500&fit=crop",
              gradient: "from-yellow-500/70 to-orange-500/70"
            },
            {
              name: "Floral Kurtas",
              price: "From ₹299",
              image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=400&h=500&fit=crop",
              gradient: "from-pink-500/70 to-rose-500/70"
            },
            {
              name: "Ethnic sets",
              price: "Min. 70% Off",
              image: "https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=400&h=500&fit=crop",
              gradient: "from-purple-500/70 to-indigo-500/70"
            },
            {
              name: "Jhumkas",
              price: "From ₹99",
              image: "https://images.unsplash.com/photo-1535632787350-4e68ef0ac584?w=400&h=500&fit=crop",
              gradient: "from-amber-500/70 to-yellow-500/70"
            }
          ].map((item, index) => (
            <Link key={index}
              href={`/products?category=${item.name}`}
              className="flex-shrink-0 w-[180px] group"
            >
              <div className="relative rounded-2xl overflow-hidden h-[260px] shadow-lg hover:shadow-xl transition-all duration-300">
                <ImageWithFallback
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${item.gradient} opacity-50`} />
                <div className="absolute bottom-0 left-0 right-0 p-4 text-inverse">
                  <h3 className="font-bold text-base mb-1">{item.name}</h3>
                  <span className="text-sm font-semibold">{item.price}</span>
                  <span className="inline-block ml-2 text-xl">🌸</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Shop for Loved Ones Section */}
      <div className="px-4 py-6 bg-transparent">
        <h2 className="text-2xl font-bold text-foreground mb-4">Shop for Loved Ones</h2>
        <div className="grid grid-cols-1 gap-4">
          {[
            {
              name: "Men",
              description: "Discover men's collection",
              image: "https://images.unsplash.com/photo-1490578474895-699cd4e2cf59?w=800&h=400&fit=crop",
              gradient: "from-blue-600/80 to-blue-800/80"
            },
            {
              name: "Women",
              description: "Explore women's collection",
              image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=800&h=400&fit=crop",
              gradient: "from-pink-600/80 to-rose-800/80"
            },
            {
              name: "Gen Z Drips",
              description: "Trending Gen-Z styles",
              image: "https://images.unsplash.com/photo-1523381294911-8d3cead13475?w=800&h=400&fit=crop",
              gradient: "from-purple-600/80 to-indigo-800/80"
            }
          ].map((item, index) => (
            <Link key={index}
              href={`/products?category=${item.name}`}
              className="group"
            >
              <div className="relative rounded-2xl overflow-hidden h-[180px] shadow-lg hover:shadow-xl transition-all duration-300">
                <ImageWithFallback
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className={`absolute inset-0 bg-gradient-to-r ${item.gradient} opacity-70`} />
                <div className="absolute inset-0 flex flex-col justify-center px-6 text-inverse">
                  <h3 className="font-bold text-3xl mb-2">{item.name}</h3>
                  <p className="text-sm font-medium text-inverse/90">{item.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Featured Products Section */}
      <FeaturedProductsSection />

      {/* Fashion Products Section */}
      <CategoryGridSection 
        title="Fashion Products"
        category="Fashion"
        items={[
          { name: "T-Shirts", image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=200&h=200&fit=crop" },
          { name: "Jeans", image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=200&h=200&fit=crop" },
          { name: "Dresses", image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=200&h=200&fit=crop" },
          { name: "Jackets", image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=200&h=200&fit=crop" },
          { name: "Shoes", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200&h=200&fit=crop" },
          { name: "Bags", image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=200&h=200&fit=crop" },
          { name: "Watches", image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&h=200&fit=crop" },
          { name: "Sunglasses", image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=200&h=200&fit=crop" },
          { name: "Sweaters", image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=200&h=200&fit=crop" },
          { name: "Skirts", image: "https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=200&h=200&fit=crop" },
          { name: "Shorts", image: "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=200&h=200&fit=crop" },
          { name: "Caps", image: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=200&h=200&fit=crop" },
          { name: "Belts", image: "https://images.unsplash.com/photo-1624222247344-550fb60583aa?w=200&h=200&fit=crop" },
          { name: "Scarves", image: "https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?w=200&h=200&fit=crop" },
          { name: "Suits", image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=200&h=200&fit=crop" },
          { name: "Hoodies", image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=200&h=200&fit=crop" }
        ]}
      />

      {/* Home & Garden Section */}
      <CategoryGridSection 
        title="Home & Garden"
        category="Home"
        items={[
          { name: "Furniture", image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=200&h=200&fit=crop" },
          { name: "Bedding", image: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=200&h=200&fit=crop" },
          { name: "Lighting", image: "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=200&h=200&fit=crop" },
          { name: "Decor", image: "https://images.unsplash.com/photo-1615873968403-89e068629265?w=200&h=200&fit=crop" },
          { name: "Kitchen", image: "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=200&h=200&fit=crop" },
          { name: "Storage", image: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=200&h=200&fit=crop" },
          { name: "Rugs", image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=200&h=200&fit=crop" },
          { name: "Curtains", image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=200&h=200&fit=crop" },
          { name: "Plants", image: "https://images.unsplash.com/photo-1509937528035-ad76254b0356?w=200&h=200&fit=crop" },
          { name: "Garden Tools", image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=200&h=200&fit=crop" },
          { name: "Outdoor", image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=200&h=200&fit=crop" },
          { name: "Bathroom", image: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=200&h=200&fit=crop" },
          { name: "Tableware", image: "https://images.unsplash.com/photo-1578500494198-246f612d3b3d?w=200&h=200&fit=crop" },
          { name: "Mirrors", image: "https://images.unsplash.com/photo-1618220179428-22790b461013?w=200&h=200&fit=crop" },
          { name: "Wall Art", image: "https://images.unsplash.com/photo-1582738411706-bfc8e691d1c2?w=200&h=200&fit=crop" },
          { name: "Cushions", image: "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=200&h=200&fit=crop" }
        ]}
      />

      {/* Electronics Products Section */}
      <CategoryGridSection 
        title="Electronics Products"
        category="Electronics"
        items={[
          { name: "Smartphones", image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=200&h=200&fit=crop" },
          { name: "Laptops", image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=200&h=200&fit=crop" },
          { name: "Headphones", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&h=200&fit=crop" },
          { name: "Cameras", image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=200&h=200&fit=crop" },
          { name: "Smartwatches", image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=200&h=200&fit=crop" },
          { name: "Tablets", image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=200&h=200&fit=crop" },
          { name: "TVs", image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=200&h=200&fit=crop" },
          { name: "Speakers", image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=200&h=200&fit=crop" },
          { name: "Drones", image: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=200&h=200&fit=crop" },
          { name: "Keyboards", image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=200&h=200&fit=crop" },
          { name: "Gaming Mouse", image: "https://images.unsplash.com/photo-1527814050087-3793815479db?w=200&h=200&fit=crop" },
          { name: "Storage", image: "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=200&h=200&fit=crop" },
          { name: "Cables", image: "https://images.unsplash.com/photo-1625948515291-69613efd103f?w=200&h=200&fit=crop" },
          { name: "Power Banks", image: "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=200&h=200&fit=crop" },
          { name: "Webcams", image: "https://images.unsplash.com/photo-1625948515291-69613efd103f?w=200&h=200&fit=crop" },
          { name: "Routers", image: "https://images.unsplash.com/photo-1606904825846-647eb07f5be2?w=200&h=200&fit=crop" }
        ]}
      />

      {/* Sports Products Section */}
      <CategoryGridSection 
        title="Sports Products"
        category="Sports"
        items={[
          { name: "Running Shoes", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200&h=200&fit=crop" },
          { name: "Yoga Mats", image: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=200&h=200&fit=crop" },
          { name: "Dumbbells", image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=200&h=200&fit=crop" },
          { name: "Sports Wear", image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=200&h=200&fit=crop" },
          { name: "Bicycles", image: "https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=200&h=200&fit=crop" },
          { name: "Basketballs", image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=200&h=200&fit=crop" },
          { name: "Fitness Trackers", image: "https://images.unsplash.com/photo-1575053267983-b4ed21ff8931?w=200&h=200&fit=crop" },
          { name: "Protein Shakes", image: "https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=200&h=200&fit=crop" },
          { name: "Gym Bags", image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=200&h=200&fit=crop" },
          { name: "Resistance Bands", image: "https://images.unsplash.com/photo-1598289431512-b97b0917affc?w=200&h=200&fit=crop" },
          { name: "Tennis Rackets", image: "https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?w=200&h=200&fit=crop" },
          { name: "Swimming Gear", image: "https://images.unsplash.com/photo-1530549387789-4c1017266635?w=200&h=200&fit=crop" },
          { name: "Boxing Gloves", image: "https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?w=200&h=200&fit=crop" },
          { name: "Skateboards", image: "https://images.unsplash.com/photo-1547447134-cd3f5c716030?w=200&h=200&fit=crop" },
          { name: "Golf Clubs", image: "https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=200&h=200&fit=crop" },
          { name: "Water Bottles", image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=200&h=200&fit=crop" }
        ]}
      />

      {/* Beauty Products Section */}
      <CategoryGridSection 
        title="Beauty Products"
        category="Beauty"
        items={[
          { name: "Skincare", image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=200&h=200&fit=crop" },
          { name: "Makeup", image: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=200&h=200&fit=crop" },
          { name: "Perfumes", image: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=200&h=200&fit=crop" },
          { name: "Hair Care", image: "https://images.unsplash.com/photo-1522338242992-e1a54906a8da?w=200&h=200&fit=crop" },
          { name: "Nail Polish", image: "https://images.unsplash.com/photo-1610992015732-2449b76344bc?w=200&h=200&fit=crop" },
          { name: "Face Masks", image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=200&h=200&fit=crop" },
          { name: "Lip Balm", image: "https://images.unsplash.com/photo-1615397349754-cfa2066a298e?w=200&h=200&fit=crop" },
          { name: "Eye Shadow", image: "https://images.unsplash.com/photo-1583241800698-3a8965d70ad9?w=200&h=200&fit=crop" },
          { name: "Foundation", image: "https://images.unsplash.com/photo-1631214524020-7e18db9a8f92?w=200&h=200&fit=crop" },
          { name: "Brushes", image: "https://images.unsplash.com/photo-1596704017254-9b121068ec31?w=200&h=200&fit=crop" },
          { name: "Moisturizers", image: "https://images.unsplash.com/photo-1620916297804-c5f0e5aa291b?w=200&h=200&fit=crop" },
          { name: "Serums", image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=200&h=200&fit=crop" },
          { name: "Lipstick", image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=200&h=200&fit=crop" },
          { name: "Blush", image: "https://images.unsplash.com/photo-1617897903246-719242758050?w=200&h=200&fit=crop" },
          { name: "Mascara", image: "https://images.unsplash.com/photo-1631730486572-226d1f595b68?w=200&h=200&fit=crop" },
          { name: "Body Lotion", image: "https://images.unsplash.com/photo-1571875257727-256c39da42af?w=200&h=200&fit=crop" }
        ]}
      />

      {/* Books Section */}
      <CategoryGridSection 
        title="Books"
        category="Books"
        items={[
          { name: "Fiction", image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=200&h=200&fit=crop" },
          { name: "Non-Fiction", image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=200&h=200&fit=crop" },
          { name: "Self-Help", image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=200&h=200&fit=crop" },
          { name: "Biographies", image: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=200&h=200&fit=crop" },
          { name: "Science", image: "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=200&h=200&fit=crop" },
          { name: "History", image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=200&h=200&fit=crop" },
          { name: "Children", image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=200&h=200&fit=crop" },
          { name: "Comics", image: "https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?w=200&h=200&fit=crop" },
          { name: "Poetry", image: "https://images.unsplash.com/photo-1519682337058-a94d519337bc?w=200&h=200&fit=crop" },
          { name: "Mystery", image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=200&h=200&fit=crop" },
          { name: "Romance", image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=200&h=200&fit=crop" },
          { name: "Thriller", image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=200&h=200&fit=crop" },
          { name: "Fantasy", image: "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=200&h=200&fit=crop" },
          { name: "Horror", image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=200&h=200&fit=crop" },
          { name: "Cookbooks", image: "https://images.unsplash.com/photo-1466637574441-749b8f19452f?w=200&h=200&fit=crop" },
          { name: "Travel", image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=200&h=200&fit=crop" }
        ]}
      />

      {/* For You Section */}
      <div className="py-6 bg-transparent">
        <div className="px-4 flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-foreground">For You</h2>
          <Link href="/products" className="text-[var(--primary-color)] text-sm font-semibold hover:underline transition-all">
            View All →
          </Link>
        </div>

        {/* Featured Badge */}
        <div className="px-4 mb-6">
          <span className="inline-flex items-center gap-2 bg-gradient-to-r from-[var(--primary-color)] to-orange-600 text-inverse text-xs font-semibold px-6 py-2.5 rounded-full shadow-lg pulse-glow">
            ✨ Featured
          </span>
        </div>

        {/* Product Carousel */}
        <div className="featured-products-carousel">
          <Slider {...carouselSettings}>
            {featuredProducts.map((product, index) => (
              <div key={product.id} className="px-1">
                <Link href={`/products/${product.id}`}
                  className="block"
                >
                  <div className="glass-card rounded-2xl p-5 mx-2 hover:shadow-2xl transition-all duration-300">
                    {/* Product Image Container */}
                    <div className="relative mb-4 rounded-xl overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900">
                      <div className="aspect-square">
                        {product.badge && (
                          <Badge className="absolute top-3 left-3 z-10 bg-gradient-to-r from-[var(--primary-color)] to-orange-600 text-inverse text-xs font-semibold px-3 py-1 shadow-lg">
                            {product.badge}
                          </Badge>
                        )}
                        <ImageWithFallback
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                        />
                        <button
                          className="absolute top-3 right-3 bg-background dark:bg-card text-card-foreground p-2 rounded-full shadow-md hover:opacity-100 transition-all active:scale-95"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
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
                            className="size-4 text-[var(--primary-color)]"
                            fill={isInWishlist(product.id) ? "var(--primary-color)" : "none"}
                          />
                        </button>
                      </div>
                    </div>

                    {/* Product Info */}
                    <div className="space-y-3">
                      {/* Product Name */}
                      <h3 className="text-base font-semibold text-foreground line-clamp-2 min-h-[3rem]">
                        {product.name}
                      </h3>
                      
                      {/* Rating */}
                      <div className="flex items-center gap-2">
                        <div className="flex">
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
                        <span className="text-xs text-muted-foreground font-medium">
                          ({product.reviews})
                        </span>
                      </div>
                      
                      {/* Price Section */}
                      <div className="flex items-end justify-between pt-2">
                        <div className="flex flex-col">
                          <span className="text-2xl font-bold text-[var(--primary-color)]">
                            ${product.price.toFixed(2)}
                          </span>
                          <span className="text-sm text-muted-foreground dark:text-muted-foreground line-through">
                            ${product.originalPrice.toFixed(2)}
                          </span>
                        </div>
                        <div className="bg-green-50 dark:bg-green-900/20 px-3 py-1.5 rounded-lg">
                          <span className="text-sm font-bold text-green-600 dark:text-green-400">
                            {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </Slider>
        </div>
      </div>

      {/* Features Section */}
      <div className="px-4 py-6 bg-transparent">
        <Card className="p-5 bg-card border border-border shadow-sm">
          <h2 className="text-xl font-bold text-foreground mb-5">Why Choose Us?</h2>
          <div className="grid grid-cols-2 gap-3">
            {features.map((feature, index) => (
              <div key={index} className="flex flex-col items-center text-center p-3 bg-muted rounded-xl">
                <div className="p-3 bg-gradient-to-br from-[var(--primary-color)] to-orange-600 rounded-full mb-2">
                  <feature.icon className="size-5 text-inverse" />
                </div>
                <h3 className="text-sm font-semibold text-foreground mb-1">
                  {feature.title}
                </h3>
                <p className="text-xs text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Categories Section */}
      <div className="px-4 py-6 bg-transparent">
        <Card className="p-5 bg-card border border-border shadow-sm">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-xl font-bold text-foreground">Shop by Category</h2>
            <Link href="/products" className="text-[var(--primary-color)] text-sm font-semibold hover:underline">
              See All →
            </Link>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {categories.map((category) => (
              <Link key={category.name}
                href={`/products?category=${category.name}`}
                className="group"
              >
                <div className="relative rounded-xl overflow-hidden aspect-square shadow-sm hover:shadow-md transition-all">
                  <ImageWithFallback
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${category.color} flex flex-col items-center justify-center text-inverse`}>
                    <h3 className="text-sm font-bold mb-1 text-center px-2 line-clamp-2">
                      {category.name}
                    </h3>
                    <span className="text-xs opacity-90">{category.count}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </Card>
      </div>

      {/* Ad Banner Section */}
      <div className="px-4 py-6 bg-transparent">
        <h2 className="text-2xl font-bold text-foreground mb-6">Special Offers</h2>
        <AdBanner ads={ads} />
      </div>

      {/* Promo Carousel Section */}
      <div className="py-6 bg-transparent">
        <h2 className="text-2xl font-bold text-foreground mb-6 px-4">Flash Deals</h2>
        <PromoCarousel />
      </div>

      {/* CTA Banner for Rewards */}
      <div className="px-4 py-6 pb-24 bg-transparent">
        <Card className="bg-gradient-to-r from-[var(--primary-color)] to-orange-600 text-inverse p-6 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-32 h-32 bg-background/10 rounded-full -mr-16 -mt-16" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-background/10 rounded-full -ml-12 -mb-12" />
          <div className="relative z-10 text-center">
            <h2 className="text-2xl font-bold mb-3">
              Join Our Rewards Program
            </h2>
            <p className="text-sm text-orange-100 mb-6">
              Earn points with every purchase and get exclusive discounts. Refer friends and get even more rewards!
            </p>
            <Button
              size="lg"
              className="bg-background text-[var(--primary-color)] hover:bg-muted"
              asChild
            >
              <Link href="/rewards">
                Learn More
                <ArrowRight className="size-4 ml-2" />
              </Link>
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}


