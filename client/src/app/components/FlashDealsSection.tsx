"use client";

import { useState, useEffect } from "react";
import { Home, Dumbbell, Sparkles, Timer, ArrowRight, Zap } from "lucide-react";
import Link from "next/link";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export function FlashDealsSection() {
  const settings = {
    dots: false,
    infinite: true,
    speed: 5000,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 0,
    cssEase: "linear",
    rtl: true,
    pauseOnHover: true,
    arrows: false,
    variableWidth: false,
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
        },
      },
    ],
  };

  const deals = [
    {
      icon: Home,
      category: "Home",
      title: "Home Essentials",
      description: "Upgrade your living space with quality items",
      buttonText: "Browse",
      offer: "Free Ship",
      gradient: "from-teal-500 via-teal-600 to-teal-700",
      link: "/home-garden",
    },
    {
      icon: Dumbbell,
      category: "Sports",
      title: "Fitness Gear Sale",
      description: "Get fit with premium sports equipment at great prices",
      buttonText: "Shop",
      offer: "30% OFF",
      gradient: "from-orange-500 via-red-600 to-red-700",
      link: "/sports",
    },
    {
      icon: Sparkles,
      category: "Beauty",
      title: "Beauty Essentials",
      description: "Premium skincare and cosmetics for glowing skin",
      buttonText: "Explore",
      offer: "15% OFF",
      gradient: "from-pink-500 via-pink-600 to-pink-700",
      link: "/beauty",
    },
    // Duplicate for smoother infinite scroll
    {
      icon: Home,
      category: "Home",
      title: "Home Essentials",
      description: "Upgrade your living space with quality items",
      buttonText: "Browse",
      offer: "Free Ship",
      gradient: "from-teal-500 via-teal-600 to-teal-700",
      link: "/home-garden",
    },
    {
      icon: Dumbbell,
      category: "Sports",
      title: "Fitness Gear Sale",
      description: "Get fit with premium sports equipment at great prices",
      buttonText: "Shop",
      offer: "30% OFF",
      gradient: "from-orange-500 via-red-600 to-red-700",
      link: "/sports",
    },
    {
      icon: Sparkles,
      category: "Beauty",
      title: "Beauty Essentials",
      description: "Premium skincare and cosmetics for glowing skin",
      buttonText: "Explore",
      offer: "15% OFF",
      gradient: "from-pink-500 via-pink-600 to-pink-700",
      link: "/beauty",
    },
  ];

  return (
    <section className="py-12 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-2">
            Flash Deals & Offers
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground">
            Don't miss out on these amazing limited-time offers
          </p>
        </div>
        <div className="flash-deals-carousel -mx-4 sm:mx-0">
          <Slider {...settings}>
            {deals.map((deal, index) => {
              const Icon = deal.icon;
              return (
                <div key={index} className="px-2 sm:px-3">
                  <Link href={deal.link} className="group block">
                    <div
                      className={`relative overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-br ${deal.gradient} p-5 sm:p-6 lg:p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] min-h-[260px] sm:min-h-[280px] flex flex-col justify-between`}
                    >
                      <div>
                        <Badge className="bg-background/20 hover:bg-background/30 text-inverse border-white/30 backdrop-blur-sm mb-3 sm:mb-4 text-xs sm:text-sm">
                          <Icon className="size-3.5 sm:size-4 mr-1" />
                          {deal.category}
                        </Badge>
                        <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-inverse mb-2 sm:mb-3 leading-tight">
                          {deal.title}
                        </h3>
                        <p className="text-sm sm:text-base text-inverse/90 mb-4 sm:mb-6 leading-relaxed line-clamp-2">
                          {deal.description}
                        </p>
                      </div>
                      <div className="flex items-center justify-between gap-3">
                        <Button className="bg-background hover:bg-muted text-foreground font-semibold rounded-xl sm:rounded-2xl text-sm sm:text-base px-4 sm:px-6">
                          {deal.buttonText}
                        </Button>
                        <div className="text-lg sm:text-xl lg:text-2xl font-bold text-inverse whitespace-nowrap">
                          {deal.offer}
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              );
            })}
          </Slider>
        </div>
      </div>
    </section>
  );
}


