"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { ArrowRight, ExternalLink } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export interface Ad {
  id: string;
  title: string;
  description: string;
  image: string;
  buttonText: string;
  buttonLink: string;
  discount?: string;
  externalLink?: boolean;
  backgroundColor?: string;
  textColor?: string;
  type: "hero" | "banner" | "square" | "wide";
}

interface AdBannerProps {
  ads: Ad[];
  className?: string;
}

export function AdBanner({ ads, className = "" }: AdBannerProps) {
  const heroAds = ads.filter((ad) => ad.type === "hero");
  const bannerAds = ads.filter((ad) => ad.type === "banner");
  const squareAds = ads.filter((ad) => ad.type === "square");
  const wideAds = ads.filter((ad) => ad.type === "wide");

  return (
    <div className={`space-y-8 ${className}`}>
      {/* Hero Ads - Full Width Large */}
      {heroAds.length > 0 && (
        <div className="space-y-6">
          {heroAds.map((ad) => (
            <AdBannerCard key={ad.id} ad={ad} />
          ))}
        </div>
      )}

      {/* Banner Ads */}
      {bannerAds.length > 0 && (
        <div className="grid grid-cols-1 gap-6">
          {bannerAds.map((ad) => (
            <AdBannerCard key={ad.id} ad={ad} />
          ))}
        </div>
      )}

      {/* Square Ads Grid - 2 columns */}
      {squareAds.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {squareAds.map((ad) => (
            <AdBannerCard key={ad.id} ad={ad} />
          ))}
        </div>
      )}

      {/* Wide Ads */}
      {wideAds.length > 0 && (
        <div className="space-y-4">
          {wideAds.map((ad) => (
            <AdBannerCard key={ad.id} ad={ad} />
          ))}
        </div>
      )}
    </div>
  );
}

interface AdBannerCardProps {
  ad: Ad;
  className?: string;
}

function AdBannerCard({ ad, className = "" }: AdBannerCardProps) {
  const content = (
    <>
      {ad.type === "hero" && (
        <div
          className={`relative overflow-hidden rounded-2xl shadow-2xl ${
            ad.backgroundColor || "bg-gradient-to-r from-[var(--primary-color)] to-orange-600"
          } ${className}`}
        >
          <div className="grid lg:grid-cols-2 gap-8 items-center p-8 lg:p-16">
            <div className="flex flex-col justify-center space-y-6">
              {ad.discount && (
                <Badge className="w-fit bg-background text-[var(--primary-color)] hover:bg-background border-0 text-base px-4 py-1.5 font-bold">
                  {ad.discount}
                </Badge>
              )}
              <h2
                className={`text-4xl lg:text-5xl font-bold leading-tight ${
                  ad.textColor || "text-inverse"
                }`}
              >
                {ad.title}
              </h2>
              <p
                className={`text-xl leading-relaxed ${
                  ad.textColor ? `${ad.textColor}` : "text-inverse"
                }`}
              >
                {ad.description}
              </p>
              <div>
                <Button
                  size="lg"
                  className="bg-background text-[var(--primary-color)] hover:bg-muted text-lg h-14 px-8 shadow-lg font-semibold"
                  asChild={!ad.externalLink}
                >
                  {ad.externalLink ? (
                    <a
                      href={ad.buttonLink}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {ad.buttonText}
                      <ExternalLink className="size-5 ml-2" />
                    </a>
                  ) : (
                    <Link href={ad.buttonLink || "#"}>
                      {ad.buttonText}
                      <ArrowRight className="size-5 ml-2" />
                    </Link>
                  )}
                </Button>
              </div>
            </div>
            <div className="hidden lg:flex items-center justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-background/10 rounded-2xl blur-2xl"></div>
                <ImageWithFallback
                  src={ad.image}
                  alt={ad.title}
                  className="relative rounded-2xl shadow-2xl max-h-96 w-full object-cover border-4 border-white/20"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {ad.type === "banner" && (
        <Card
          className={`relative overflow-hidden shadow-xl hover:shadow-2xl transition-shadow ${
            ad.backgroundColor || "bg-gradient-to-r from-purple-600 to-pink-600"
          } border-0 ${className}`}
        >
          <div className="grid md:grid-cols-[1fr,auto] gap-6 items-center p-8 md:p-10">
            <div className="flex flex-col justify-center space-y-4">
              {ad.discount && (
                <Badge className="w-fit bg-background text-purple-600 hover:bg-background border-0 font-bold px-3 py-1">
                  {ad.discount}
                </Badge>
              )}
              <h3
                className={`text-3xl md:text-4xl font-bold ${
                  ad.textColor || "text-inverse"
                }`}
              >
                {ad.title}
              </h3>
              <p
                className={`text-lg ${
                  ad.textColor ? `${ad.textColor}` : "text-inverse"
                }`}
              >
                {ad.description}
              </p>
              <div>
                <Button
                  size="lg"
                  className="bg-background text-foreground hover:bg-muted shadow-lg h-12 font-semibold"
                  asChild={!ad.externalLink}
                >
                  {ad.externalLink ? (
                    <a
                      href={ad.buttonLink}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {ad.buttonText}
                      <ExternalLink className="size-5 ml-2" />
                    </a>
                  ) : (
                    <Link href={ad.buttonLink || "#"}>
                      {ad.buttonText}
                      <ArrowRight className="size-5 ml-2" />
                    </Link>
                  )}
                </Button>
              </div>
            </div>
            <div className="flex items-center justify-center md:justify-end">
              <ImageWithFallback
                src={ad.image}
                alt={ad.title}
                className="rounded-xl max-h-64 w-auto object-cover shadow-xl border-4 border-white/20"
              />
            </div>
          </div>
        </Card>
      )}

      {ad.type === "square" && (
        <Card
          className={`relative overflow-hidden group hover:shadow-2xl transition-all hover:scale-[1.02] ${
            ad.backgroundColor || "bg-gradient-to-br from-blue-600 to-cyan-600"
          } border-0 shadow-xl ${className}`}
        >
          <div className="p-8 flex flex-col h-full min-h-[320px]">
            <div className="flex-1 space-y-4">
              {ad.discount && (
                <Badge className="w-fit bg-background text-blue-600 hover:bg-background border-0 font-bold px-3 py-1">
                  {ad.discount}
                </Badge>
              )}
              <h3
                className={`text-2xl lg:text-3xl font-bold leading-tight ${
                  ad.textColor || "text-inverse"
                }`}
              >
                {ad.title}
              </h3>
              <p
                className={`text-base leading-relaxed ${
                  ad.textColor ? `${ad.textColor}` : "text-inverse"
                }`}
              >
                {ad.description}
              </p>
            </div>
            <div className="flex items-end justify-between gap-4 mt-6">
              <Button
                size="lg"
                className="bg-background text-foreground hover:bg-muted shadow-lg font-semibold"
                asChild={!ad.externalLink}
              >
                {ad.externalLink ? (
                  <a
                    href={ad.buttonLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {ad.buttonText}
                  </a>
                ) : (
                  <Link href={ad.buttonLink}>{ad.buttonText}</Link>
                )}
              </Button>
              <ImageWithFallback
                src={ad.image}
                alt={ad.title}
                className="size-24 rounded-xl object-cover shadow-lg border-2 border-white/30"
              />
            </div>
          </div>
        </Card>
      )}

      {ad.type === "wide" && (
        <Card
          className={`relative overflow-hidden group hover:shadow-xl transition-all ${
            ad.backgroundColor || "bg-gradient-to-r from-green-600 to-emerald-600"
          } border-0 shadow-lg ${className}`}
        >
          <div className="flex flex-col sm:flex-row items-center gap-6 p-6 md:p-8">
            <ImageWithFallback
              src={ad.image}
              alt={ad.title}
              className="size-32 rounded-xl object-cover flex-shrink-0 shadow-lg border-4 border-white/30"
            />
            <div className="flex-1 space-y-3 text-center sm:text-left">
              {ad.discount && (
                <Badge className="bg-background text-green-600 hover:bg-background border-0 font-bold px-3 py-1">
                  {ad.discount}
                </Badge>
              )}
              <h3
                className={`text-2xl font-bold ${
                  ad.textColor || "text-inverse"
                }`}
              >
                {ad.title}
              </h3>
              <p
                className={`text-base ${
                  ad.textColor ? `${ad.textColor}` : "text-inverse"
                }`}
              >
                {ad.description}
              </p>
            </div>
            <Button
              size="lg"
              className="bg-background text-foreground hover:bg-muted flex-shrink-0 shadow-lg h-12 px-6 font-semibold"
              asChild={!ad.externalLink}
            >
              {ad.externalLink ? (
                <a
                  href={ad.buttonLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {ad.buttonText}
                </a>
              ) : (
                <Link href={ad.buttonLink}>{ad.buttonLink}</Link>
              )}
            </Button>
          </div>
        </Card>
      )}
    </>
  );

  return content;
}


