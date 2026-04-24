"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Slider from "react-slick";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface PromoCard {
  id: string;
  title: string;
  description: string;
  badge: string;
  emoji: string;
  buttonText: string;
  buttonLink: string;
  offer: string;
  gradient: string;
  badgeColor: string;
}

export function PromoCarousel() {
  const promoCards: PromoCard[] = [
    {
      id: "1",
      title: "Latest Smartphones",
      description: "Upgrade to the newest models with exclusive discounts",
      badge: "Tech Deals",
      emoji: "📱",
      buttonText: "Shop Now",
      buttonLink: "/products?category=Electronics",
      offer: "20% OFF",
      gradient: "from-purple-600 to-purple-800",
      badgeColor: "text-purple-600",
    },
    {
      id: "2",
      title: "Spring Collection",
      description: "Fresh styles for the new season - Limited stock!",
      badge: "Fashion",
      emoji: "👗",
      buttonText: "Discover",
      buttonLink: "/products?category=Fashion",
      offer: "Buy 2 Get 1",
      gradient: "from-pink-500 to-rose-600",
      badgeColor: "text-pink-600",
    },
    {
      id: "3",
      title: "Home Essentials",
      description: "Upgrade your living space with quality items",
      badge: "Home",
      emoji: "🏡",
      buttonText: "Browse",
      buttonLink: "/products?category=Home",
      offer: "Free Ship",
      gradient: "from-emerald-600 to-teal-700",
      badgeColor: "text-emerald-600",
    },
    {
      id: "4",
      title: "Fitness Gear Sale",
      description: "Get fit with premium sports equipment at great prices",
      badge: "Sports",
      emoji: "⚽",
      buttonText: "Shop",
      buttonLink: "/products?category=Sports",
      offer: "30% OFF",
      gradient: "from-orange-600 to-red-600",
      badgeColor: "text-orange-600",
    },
    {
      id: "5",
      title: "Beauty Essentials",
      description: "Premium skincare and cosmetics for glowing skin",
      badge: "Beauty",
      emoji: "💄",
      buttonText: "Explore",
      buttonLink: "/products?category=Beauty",
      offer: "15% OFF",
      gradient: "from-rose-500 to-pink-600",
      badgeColor: "text-rose-600",
    },
  ];

  const settings = {
    dots: false,
    infinite: true,
    speed: 800,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    cssEase: "ease-in-out",
    pauseOnHover: true,
    arrows: false,
    rtl: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: false,
          centerPadding: "0px",
        },
      },
    ],
  };

  return (
    <div className="promo-carousel-container flash-deals-carousel w-full overflow-hidden px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <Slider {...settings}>
          {promoCards.map((card) => (
            <div key={card.id} className="px-2 sm:px-3 py-2">
              <Card
                className={`relative overflow-hidden group hover:shadow-xl transition-all hover:scale-[1.02] bg-gradient-to-br ${card.gradient} border-0 shadow-lg h-full`}
              >
                <div className="p-5 sm:p-6 lg:p-8 flex flex-col min-h-[260px] sm:min-h-[280px] lg:min-h-[300px]">
                  <div className="flex-1 space-y-2 sm:space-y-3 lg:space-y-4">
                    <Badge
                      className={`w-fit bg-background ${card.badgeColor} hover:bg-background border-0 font-bold px-2.5 sm:px-3 py-1 sm:py-1.5 text-xs sm:text-sm`}
                    >
                      {card.emoji} {card.badge}
                    </Badge>
                    <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-inverse leading-tight">
                      {card.title}
                    </h3>
                    <p className="text-sm sm:text-base text-inverse/90 leading-relaxed line-clamp-2">
                      {card.description}
                    </p>
                  </div>
                  <div className="flex items-center justify-between gap-3 sm:gap-4 mt-4 sm:mt-5 pt-3 sm:pt-4 border-t border-white/20">
                    <Button
                      size="sm"
                      className="bg-background text-foreground hover:bg-muted shadow-lg font-semibold px-4 sm:px-6 py-2 sm:py-2.5 rounded-xl text-sm sm:text-base flex-shrink-0"
                      asChild
                    >
                      <Link href={card.buttonLink}>{card.buttonText}</Link>
                    </Button>
                    <div className="text-inverse font-bold text-lg sm:text-xl lg:text-2xl whitespace-nowrap flex-shrink-0">
                      {card.offer}
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}


