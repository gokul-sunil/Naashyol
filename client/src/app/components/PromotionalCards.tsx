"use client";

import { Dumbbell, Home, Flower } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import Link from "next/link";

export function PromotionalCards() {
  return (
    <section className="py-12 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-2">
            Flash Deals & Offers
          </h2>
          <p className="text-muted-foreground">
            Don't miss out on these amazing limited-time offers
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link href="/sports" className="group block">
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-orange-500 via-red-600 to-red-700 p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 min-h-[240px] flex flex-col justify-between">
              <div>
                <Badge className="bg-background/20 hover:bg-background/30 text-inverse border-white/30 backdrop-blur-sm mb-4">
                  <Dumbbell className="size-4 mr-1" />
                  Sports
                </Badge>
                <h3 className="text-2xl font-bold text-inverse mb-2">
                  Fitness Gear Sale
                </h3>
                <p className="text-inverse/90 text-sm mb-6">
                  Get fit with premium sports equipment at great prices
                </p>
              </div>
              <div className="flex items-center justify-between">
                <Button className="bg-background hover:bg-muted text-foreground font-semibold rounded-2xl">
                  Shop
                </Button>
                <div className="text-2xl font-bold text-inverse">
                  30% OFF
                </div>
              </div>
            </div>
          </Link>

          <Link href="/home-garden" className="group block">
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-teal-500 via-teal-600 to-teal-700 p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 min-h-[240px] flex flex-col justify-between">
              <div>
                <Badge className="bg-background/20 hover:bg-background/30 text-inverse border-white/30 backdrop-blur-sm mb-4">
                  <Home className="size-4 mr-1" />
                  Home
                </Badge>
                <h3 className="text-2xl font-bold text-inverse mb-2">
                  Home Essentials
                </h3>
                <p className="text-inverse/90 text-sm mb-6">
                  Upgrade your living space with quality items
                </p>
              </div>
              <div className="flex items-center justify-between">
                <Button className="bg-background hover:bg-muted text-foreground font-semibold rounded-2xl">
                  Browse
                </Button>
                <div className="text-2xl font-bold text-inverse">
                  Free Ship
                </div>
              </div>
            </div>
          </Link>

          <Link href="/beauty" className="group block">
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-pink-500 via-pink-600 to-pink-700 p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 min-h-[240px] flex flex-col justify-between">
              <div>
                <Badge className="bg-background/20 hover:bg-background/30 text-inverse border-white/30 backdrop-blur-sm mb-4">
                  <Flower className="size-4 mr-1" />
                  Beauty
                </Badge>
                <h3 className="text-2xl font-bold text-inverse mb-2">
                  Beauty Essentials
                </h3>
                <p className="text-inverse/90 text-sm mb-6">
                  Premium skincare and cosmetics for glowing skin
                </p>
              </div>
              <div className="flex items-center justify-between">
                <Button className="bg-background hover:bg-muted text-foreground font-semibold rounded-2xl">
                  Explore
                </Button>
                <div className="text-2xl font-bold text-inverse">
                  15% OFF
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}


