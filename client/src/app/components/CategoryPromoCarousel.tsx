"use client";

import { useState, useEffect } from "react";
import Slider from "react-slick";
import { ChevronLeft, ChevronRight, Smartphone, Shirt, Home } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface PromoCard {
  id: string;
  category: string;
  icon: React.ElementType;
  title: string;
  description: string;
  buttonText: string;
  offerText: string;
  gradient: string;
  link: string;
}

export function CategoryPromoCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const promoCards: PromoCard[] = [
    {
      id: "1",
      category: "Tech Deals",
      icon: Smartphone,
      title: "Latest Smartphones",
      description: "Upgrade to the newest models with exclusive discounts",
      buttonText: "Shop Now",
      offerText: "20% OFF",
      gradient: "from-purple-500 via-purple-600 to-purple-700",
      link: "/electronics",
    },
    {
      id: "2",
      category: "Fashion",
      icon: Shirt,
      title: "Spring Collection",
      description: "Fresh styles for the new season - Limited stock!",
      buttonText: "Discover",
      offerText: "Buy 2 Get 1",
      gradient: "from-pink-500 via-pink-600 to-pink-700",
      link: "/fashion",
    },
    {
      id: "3",
      category: "Home",
      icon: Home,
      title: "Home Essentials",
      description: "Upgrade your living space with quality items",
      buttonText: "Browse",
      offerText: "Free Ship",
      gradient: "from-teal-500 via-teal-600 to-teal-700",
      link: "/home-garden",
    },
  ];

  const PrevArrow = (props: any) => {
    const { onClick } = props;
    return (
      <button
        onClick={onClick}
        className="hidden md:flex absolute left-2 lg:left-4 top-1/2 -translate-y-1/2 z-10 size-10 lg:size-12 rounded-full bg-background/90 dark:bg-card text-card-foreground/90 backdrop-blur-sm hover:bg-background dark:hover:bg-card text-card-foreground shadow-lg items-center justify-center transition-all duration-300 hover:scale-110"
        aria-label="Previous slide"
      >
        <ChevronLeft className="size-5 lg:size-6 text-foreground" />
      </button>
    );
  };

  const NextArrow = (props: any) => {
    const { onClick } = props;
    return (
      <button
        onClick={onClick}
        className="hidden md:flex absolute right-2 lg:right-4 top-1/2 -translate-y-1/2 z-10 size-10 lg:size-12 rounded-full bg-background/90 dark:bg-card text-card-foreground/90 backdrop-blur-sm hover:bg-background dark:hover:bg-card text-card-foreground shadow-lg items-center justify-center transition-all duration-300 hover:scale-110"
        aria-label="Next slide"
      >
        <ChevronRight className="size-5 lg:size-6 text-foreground" />
      </button>
    );
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: true,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    beforeChange: (_current: number, next: number) => setCurrentSlide(next),
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
          arrows: false,
          centerMode: false,
        },
      },
    ],
  };

  return (
    <section className="py-12 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-2">
              Featured Deals
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground">
              Don't miss out on our exclusive offers
            </p>
          </div>
          <div className="flex items-center gap-2">
            {promoCards.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  currentSlide === index
                    ? "w-8 bg-[var(--primary-color)]"
                    : "w-2 bg-border dark:bg-card text-card-foreground"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        <div className="relative md:px-8">
          <Slider {...settings}>
            {promoCards.map((card) => {
              const Icon = card.icon;
              return (
                <div key={card.id} className="px-2 sm:px-3">
                  <Link href={card.link}>
                    <div
                      className={`group relative overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-br ${card.gradient} p-5 sm:p-6 lg:p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] min-h-[280px] sm:min-h-[300px] lg:min-h-[320px] flex flex-col justify-between`}
                    >
                      {/* Category Badge */}
                      <div className="flex items-center gap-2 mb-3 sm:mb-4">
                        <Badge className="bg-background/20 hover:bg-background/30 text-inverse border-white/30 backdrop-blur-sm text-xs sm:text-sm">
                          <Icon className="size-3.5 sm:size-4 mr-1" />
                          {card.category}
                        </Badge>
                      </div>

                      {/* Content */}
                      <div className="flex-1">
                        <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-inverse mb-2 sm:mb-3 leading-tight">
                          {card.title}
                        </h3>
                        <p className="text-sm sm:text-base lg:text-lg text-inverse/90 leading-relaxed line-clamp-2">
                          {card.description}
                        </p>
                      </div>

                      {/* CTA Section */}
                      <div className="flex items-center justify-between mt-4 sm:mt-6 gap-3">
                        <Button
                          className="bg-background hover:bg-muted text-foreground font-semibold rounded-xl sm:rounded-2xl text-sm sm:text-base px-4 sm:px-6"
                          size="lg"
                        >
                          {card.buttonText}
                        </Button>
                        <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-inverse whitespace-nowrap">
                          {card.offerText}
                        </div>
                      </div>

                      {/* Decorative gradient overlay */}
                      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-white/10 to-transparent pointer-events-none" />
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


