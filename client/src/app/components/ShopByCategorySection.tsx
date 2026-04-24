"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export function ShopByCategorySection() {
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

  return (
    <section className="py-16 bg-background">
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
          <Button variant="ghost" className="text-[var(--primary-color)] hover:text-orange-600" asChild>
            <Link href="/products">
              View All
              <ArrowRight className="size-4 ml-2" />
            </Link>
          </Button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category) => (
            <Link
              key={category.name}
              href={`/products?category=${encodeURIComponent(category.name)}`}
              className="group"
            >
              <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 border-2 border-gray-800 hover:border-[var(--primary-color)] bg-card text-card-foreground rounded-3xl">
                <div className="relative aspect-square">
                  <ImageWithFallback
                    src={category.image}
                    alt={category.name}
                    className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-300"
                  />
                  <div
                    className={`absolute inset-0 bg-gradient-to-t ${category.color} opacity-60`}
                  />
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-inverse text-center p-4">
                    <h3 className="font-bold text-lg mb-1">
                      {category.name}
                    </h3>
                    <p className="text-sm opacity-90">{category.count}</p>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}


