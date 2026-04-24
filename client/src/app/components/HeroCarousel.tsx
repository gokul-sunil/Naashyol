"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";

export interface HeroSlide {
  id: string;
  image: string;
  title?: string;
  description?: string;
  buttonText?: string;
  buttonLink?: string;
  textPosition?: "left" | "center" | "right";
}

interface HeroCarouselProps {
  slides: HeroSlide[];
  autoPlayInterval?: number;
}

export function HeroCarousel({ slides, autoPlayInterval = 5000 }: HeroCarouselProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, autoPlayInterval);

    return () => clearInterval(timer);
  }, [slides.length, autoPlayInterval]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const goToPrevious = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  if (!slides || slides.length === 0) return null;

  return (
    <div className="relative w-full h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden group">
      {/* Slides */}
      <div className="relative w-full h-full">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-all duration-700 ease-in-out ${
              index === currentSlide
                ? "opacity-100 translate-x-0"
                : index < currentSlide
                ? "opacity-0 -translate-x-full"
                : "opacity-0 translate-x-full"
            }`}
          >
            <img
              src={slide.image}
              alt={slide.title || `Slide ${index + 1}`}
              className="w-full h-full object-cover"
            />
            
            {/* Overlay for better text visibility */}
            <div className="absolute inset-0 bg-inverse/10 dark:bg-inverse/30" />

            {/* Text Content Overlay */}
            {(slide.title || slide.description || slide.buttonText) && (
              <div
                className={`absolute inset-0 flex items-center px-4 sm:px-6 lg:px-8 ${
                  slide.textPosition === "left"
                    ? "justify-start"
                    : slide.textPosition === "right"
                    ? "justify-end"
                    : "justify-center"
                }`}
              >
                <div
                  className={`max-w-2xl ${
                    slide.textPosition === "center" ? "text-center" : ""
                  }`}
                >
                  {slide.title && (
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-inverse mb-4 drop-shadow-lg">
                      {slide.title}
                    </h2>
                  )}
                  {slide.description && (
                    <p className="text-lg md:text-xl text-inverse/90 mb-6 drop-shadow-lg">
                      {slide.description}
                    </p>
                  )}
                  {slide.buttonText && slide.buttonLink && (
                    <Button
                      size="lg"
                      className="bg-gradient-to-r from-[var(--primary-color)] to-orange-600 hover:from-orange-600 hover:to-orange-700 text-inverse text-base md:text-lg h-12 md:h-14 px-6 md:px-8 shadow-xl hover:shadow-2xl transition-all hover:scale-105 active:scale-95 touch-manipulation"
                      style={{
                        WebkitTapHighlightColor: 'rgba(247, 147, 26, 0.2)',
                        touchAction: 'manipulation',
                      }}
                      asChild
                    >
                      <Link href={slide.buttonLink}>{slide.buttonText}</Link>
                    </Button>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <Button
        variant="secondary"
        size="icon"
        className="absolute left-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 md:opacity-100 transition-opacity bg-background/80 dark:bg-card text-card-foreground/80 backdrop-blur-sm hover:bg-background dark:hover:bg-card text-card-foreground size-10 md:size-12 active:scale-95 touch-manipulation"
        style={{
          WebkitTapHighlightColor: 'rgba(247, 147, 26, 0.2)',
          touchAction: 'manipulation',
        }}
        onClick={goToPrevious}
      >
        <ChevronLeft className="size-5 md:size-6" />
      </Button>
      <Button
        variant="secondary"
        size="icon"
        className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 md:opacity-100 transition-opacity bg-background/80 dark:bg-card text-card-foreground/80 backdrop-blur-sm hover:bg-background dark:hover:bg-card text-card-foreground size-10 md:size-12 active:scale-95 touch-manipulation"
        style={{
          WebkitTapHighlightColor: 'rgba(247, 147, 26, 0.2)',
          touchAction: 'manipulation',
        }}
        onClick={goToNext}
      >
        <ChevronRight className="size-5 md:size-6" />
      </Button>

      {/* Dots Navigation */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`transition-all duration-300 rounded-full touch-manipulation active:scale-90 ${
              index === currentSlide
                ? "w-8 h-2 bg-[var(--primary-color)]"
                : "w-2 h-2 bg-background/60 hover:bg-background/80"
            }`}
            style={{
              WebkitTapHighlightColor: 'rgba(247, 147, 26, 0.2)',
              touchAction: 'manipulation',
            }}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}


