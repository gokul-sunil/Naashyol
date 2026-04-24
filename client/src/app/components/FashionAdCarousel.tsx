"use client";

import { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { ChevronLeft, ChevronRight, ShoppingBag, ArrowRight } from "lucide-react";
import Link from "next/link";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface FashionAd {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  badge?: string;
  discount?: string;
  ctaText: string;
  ctaLink: string;
  backgroundColor: string;
}

export function FashionAdCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const fashionAds: FashionAd[] = [
    {
      id: "1",
      title: "Spring Collection 2026",
      subtitle: "Fresh Styles Await",
      description: "Discover the latest trends in spring fashion. Vibrant colors and elegant designs.",
      image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1200",
      badge: "New Arrival",
      discount: "Up to 40% OFF",
      ctaText: "Shop Now",
      ctaLink: "/products?collection=spring-2026",
      backgroundColor: "from-pink-500 to-purple-600",
    },
    {
      id: "2",
      title: "Designer Denim Sale",
      subtitle: "Premium Quality Jeans",
      description: "Upgrade your wardrobe with our exclusive denim collection. Limited time offer!",
      image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=1200",
      badge: "Hot Deal",
      discount: "50% OFF",
      ctaText: "Grab Deals",
      ctaLink: "/products?category=Jeans",
      backgroundColor: "from-blue-600 to-indigo-700",
    },
    {
      id: "3",
      title: "Athleisure Collection",
      subtitle: "Style Meets Comfort",
      description: "Perfect blend of fashion and functionality. Ideal for active lifestyles.",
      image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1200",
      badge: "Trending",
      discount: "Buy 2 Get 1 Free",
      ctaText: "Explore More",
      ctaLink: "/products?category=Tracksuits",
      backgroundColor: "from-green-500 to-teal-600",
    },
    {
      id: "4",
      title: "Luxury Watches",
      subtitle: "Timeless Elegance",
      description: "Premium timepieces that make a statement. Crafted for perfection.",
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=1200",
      badge: "Exclusive",
      discount: "30% OFF",
      ctaText: "View Collection",
      ctaLink: "/products?category=Watches",
      backgroundColor: "from-amber-600 to-orange-700",
    },
  ];

  const CustomPrevArrow = (props: any) => {
    const { onClick } = props;
    return (
      <button
        onClick={onClick}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 size-10 rounded-full bg-background/90 dark:bg-card text-card-foreground/90 backdrop-blur-sm shadow-lg hover:scale-110 transition-all duration-300 flex items-center justify-center group"
      >
        <ChevronLeft className="size-6 text-foreground group-hover:text-[var(--primary-color)]" />
      </button>
    );
  };

  const CustomNextArrow = (props: any) => {
    const { onClick } = props;
    return (
      <button
        onClick={onClick}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 size-10 rounded-full bg-background/90 dark:bg-card text-card-foreground/90 backdrop-blur-sm shadow-lg hover:scale-110 transition-all duration-300 flex items-center justify-center group"
      >
        <ChevronRight className="size-6 text-foreground group-hover:text-[var(--primary-color)]" />
      </button>
    );
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: true,
    beforeChange: (current: number, next: number) => setCurrentSlide(next),
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
    appendDots: (dots: any) => (
      <div className="absolute bottom-4 w-full">
        <ul className="flex items-center justify-center gap-2"> {dots} </ul>
      </div>
    ),
    customPaging: (i: number) => (
      <div
        className={`w-2 h-2 rounded-full transition-all duration-300 ${
          i === currentSlide
            ? "bg-[var(--primary-color)] w-8"
            : "bg-background/50 hover:bg-background/80"
        }`}
      />
    ),
  };

  return (
    <div className="relative w-full overflow-hidden rounded-3xl shadow-2xl">
      <Slider {...settings}>
        {fashionAds.map((ad) => (
          <div key={ad.id} className="relative outline-none">
            <div className={`relative h-[400px] md:h-[500px] bg-gradient-to-r ${ad.backgroundColor} overflow-hidden`}>
              {/* Background Image with Overlay */}
              <div className="absolute inset-0">
                <ImageWithFallback
                  src={ad.image}
                  alt={ad.title}
                  className="object-cover w-full h-full opacity-40"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent" />
              </div>

              {/* Content */}
              <div className="relative h-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 flex items-center">
                <div className="max-w-2xl space-y-4 md:space-y-6">
                  {/* Badge */}
                  {ad.badge && (
                    <Badge className="bg-[var(--primary-color)] hover:bg-[var(--primary-color)] text-inverse px-4 py-1.5 text-sm font-bold animate-pulse">
                      {ad.badge}
                    </Badge>
                  )}

                  {/* Subtitle */}
                  <p className="text-inverse/90 text-sm md:text-base font-medium tracking-wider uppercase">
                    {ad.subtitle}
                  </p>

                  {/* Title */}
                  <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-inverse leading-tight">
                    {ad.title}
                  </h2>

                  {/* Description */}
                  <p className="text-inverse/80 text-base md:text-lg max-w-xl">
                    {ad.description}
                  </p>

                  {/* Discount */}
                  {ad.discount && (
                    <div className="inline-block">
                      <p className="text-2xl md:text-3xl font-bold text-[var(--primary-color)] bg-background/20 backdrop-blur-sm px-6 py-2 rounded-full border-2 border-white/30">
                        {ad.discount}
                      </p>
                    </div>
                  )}

                  {/* CTA Button */}
                  <div className="pt-2">
                    <Button
                      asChild
                      size="lg"
                      className="bg-[var(--primary-color)] hover:bg-orange-600 text-inverse font-bold px-8 py-6 text-lg rounded-full shadow-2xl hover:scale-105 transition-all duration-300"
                    >
                      <Link href={ad.ctaLink}>
                        <ShoppingBag className="size-5 mr-2" />
                        {ad.ctaText}
                      </Link>
                    </Button>
                  </div>
                </div>

                {/* Decorative Elements */}
                <div className="hidden lg:block absolute right-12 top-1/2 -translate-y-1/2">
                  <div className="relative w-72 h-72">
                    <div className="absolute inset-0 bg-background/10 backdrop-blur-sm rounded-full animate-pulse" />
                    <div className="absolute inset-4 bg-background/5 backdrop-blur-sm rounded-full" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>

      {/* Slide Counter */}
      <div className="absolute top-4 right-4 bg-inverse/50 backdrop-blur-sm text-inverse px-4 py-2 rounded-full text-sm font-medium z-10">
        {currentSlide + 1} / {fashionAds.length}
      </div>
    </div>
  );
}


