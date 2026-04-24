"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export function ProductCategorySections() {
  const electronicsProducts = [
    { name: "Smartphones", image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400" },
    { name: "Laptops", image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400" },
    { name: "Headphones", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400" },
    { name: "Cameras", image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=400" },
    { name: "Smartwatches", image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=400" },
    { name: "Tablets", image: "https://images.unsplash.com/photo-1585790050230-5dd28404f8f3?w=400" },
    { name: "TVs", image: "https://images.unsplash.com/photo-1593784991095-a205069470b6?w=400" },
    { name: "Speakers", image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400" },
    { name: "Drones", image: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=400" },
    { name: "Keyboards", image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400" },
    { name: "Gaming Mouse", image: "https://images.unsplash.com/photo-1527814050087-3793815479db?w=400" },
    { name: "Storage", image: "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=400" },
    { name: "Cables", image: "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=400" },
    { name: "Power Banks", image: "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=400" },
    { name: "Webcams", image: "https://images.unsplash.com/photo-1589739900243-c63304f77f34?w=400" },
    { name: "Routers", image: "https://images.unsplash.com/photo-1606904825846-647eb07f5be2?w=400" },
  ];

  const fashionProducts = [
    { name: "T-Shirts", image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400" },
    { name: "Jeans", image: "https://images.unsplash.com/photo-1542272454315-7ad9f9f0d7b5?w=400" },
    { name: "Dresses", image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400" },
    { name: "Jackets", image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400" },
    { name: "Shoes", image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400" },
    { name: "Bags", image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400" },
    { name: "Watches", image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400" },
    { name: "Sunglasses", image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=400" },
    { name: "Sweaters", image: "https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?w=400" },
    { name: "Skirts", image: "https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=400" },
    { name: "Shorts", image: "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=400" },
    { name: "Caps", image: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=400" },
    { name: "Belts", image: "https://images.unsplash.com/photo-1624222247344-550fb60583f2?w=400" },
    { name: "Scarves", image: "https://images.unsplash.com/photo-1601924357840-3e95f3cf2064?w=400" },
    { name: "Suits", image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=400" },
    { name: "Hoodies", image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400" },
  ];

  const homeGardenProducts = [
    { name: "Furniture", image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400" },
    { name: "Bedding", image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400" },
    { name: "Lighting", image: "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=400" },
    { name: "Decor", image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400" },
    { name: "Kitchen", image: "https://images.unsplash.com/photo-1556912173-46c336c7fd55?w=400" },
    { name: "Storage", image: "https://images.unsplash.com/photo-1595428773653-30a35a1c7a1b?w=400" },
    { name: "Rugs", image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400" },
    { name: "Curtains", image: "https://images.unsplash.com/photo-1631889993959-41b4e9c6e3c5?w=400" },
    { name: "Plants", image: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=400" },
    { name: "Garden Tools", image: "https://images.unsplash.com/photo-1585659722983-3a675dabf23d?w=400" },
    { name: "Outdoor", image: "https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?w=400" },
    { name: "Bathroom", image: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=400" },
    { name: "Tableware", image: "https://images.unsplash.com/photo-1578500494198-246f612d3b3d?w=400" },
    { name: "Mirrors", image: "https://images.unsplash.com/photo-1618220179428-22790b461013?w=400" },
    { name: "Wall Art", image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=400" },
    { name: "Cushions", image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400" },
  ];

  const sportsProducts = [
    { name: "Running Shoes", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400" },
    { name: "Yoga Mats", image: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=400" },
    { name: "Dumbbells", image: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=400" },
    { name: "Sports Wear", image: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=400" },
    { name: "Bicycles", image: "https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=400" },
    { name: "Basketballs", image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=400" },
    { name: "Fitness Trackers", image: "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=400" },
    { name: "Protein Shakes", image: "https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=400" },
    { name: "Gym Bags", image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400" },
    { name: "Resistance Bands", image: "https://images.unsplash.com/photo-1598289431512-b97b0917affc?w=400" },
    { name: "Tennis Rackets", image: "https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=400" },
    { name: "Swimming Gear", image: "https://images.unsplash.com/photo-1530549387789-4c1017266635?w=400" },
    { name: "Boxing Gloves", image: "https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?w=400" },
    { name: "Skateboards", image: "https://images.unsplash.com/photo-1547447134-cd3f5c716030?w=400" },
    { name: "Golf Clubs", image: "https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=400" },
    { name: "Water Bottles", image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400" },
  ];

  const beautyProducts = [
    { name: "Skincare", image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400" },
    { name: "Makeup", image: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=400" },
    { name: "Perfumes", image: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=400" },
    { name: "Hair Care", image: "https://images.unsplash.com/photo-1522338242992-e1a54906a8da?w=400" },
    { name: "Nail Polish", image: "https://images.unsplash.com/photo-1610992015732-2449b76344bc?w=400" },
    { name: "Face Masks", image: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=400" },
    { name: "Lip Balm", image: "https://images.unsplash.com/photo-1590156206916-ab87dc6b5ea0?w=400" },
    { name: "Eye Shadow", image: "https://images.unsplash.com/photo-1631214524020-7e18db7f0796?w=400" },
    { name: "Foundation", image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400" },
    { name: "Brushes", image: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=400" },
    { name: "Moisturizers", image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400" },
    { name: "Serums", image: "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=400" },
    { name: "Lipstick", image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=400" },
    { name: "Blush", image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400" },
    { name: "Mascara", image: "https://images.unsplash.com/photo-1631730486572-226d1f595b97?w=400" },
    { name: "Body Lotion", image: "https://images.unsplash.com/photo-1571875257727-256c39da42af?w=400" },
  ];

  const booksProducts = [
    { name: "Fiction", image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400" },
    { name: "Non-Fiction", image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400" },
    { name: "Self-Help", image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400" },
    { name: "Biographies", image: "https://images.unsplash.com/photo-1519682337058-a94d519337bc?w=400" },
    { name: "Science", image: "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400" },
    { name: "History", image: "https://images.unsplash.com/photo-1461360370896-922624d12aa1?w=400" },
    { name: "Children", image: "https://images.unsplash.com/photo-1503455637927-730bce8583c0?w=400" },
    { name: "Comics", image: "https://images.unsplash.com/photo-1612178537253-bccd437b730e?w=400" },
    { name: "Poetry", image: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=400" },
    { name: "Mystery", image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400" },
    { name: "Romance", image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=400" },
    { name: "Thriller", image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400" },
    { name: "Fantasy", image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400" },
    { name: "Horror", image: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400" },
    { name: "Cookbooks", image: "https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?w=400" },
    { name: "Travel", image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400" },
  ];

  return (
    <>
      {/* Electronics Products */}
      <section className="py-12 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold text-foreground">
              Electronics Products
            </h2>
            <Link href="/category?category=Electronics"
              className="text-[var(--primary-color)] hover:text-orange-600 font-semibold text-sm"
            >
              View All →
            </Link>
          </div>
          <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8 gap-3">
            {electronicsProducts.map((product) => (
              <Link key={product.name}
                href={`/category?category=Electronics&subcategory=${encodeURIComponent(product.name)}`}
                className="group flex flex-col items-center"
              >
                <div className="relative w-full aspect-square rounded-2xl overflow-hidden mb-2 bg-muted hover:shadow-xl transition-all duration-300 hover:scale-105">
                  <ImageWithFallback
                    src={product.image}
                    alt={product.name}
                    className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <p className="text-xs text-center text-foreground font-medium line-clamp-2">
                  {product.name}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Fashion Products */}
      <section className="py-12 bg-gradient-to-b from-pink-50 to-white dark:from-gray-900 dark:to-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold text-foreground">
              Fashion Products
            </h2>
            <Link href="/category?category=Fashion"
              className="text-[var(--primary-color)] hover:text-orange-600 font-semibold text-sm"
            >
              View All →
            </Link>
          </div>
          <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8 gap-3">
            {fashionProducts.map((product) => (
              <Link key={product.name}
                href={`/category?category=Fashion&subcategory=${encodeURIComponent(product.name)}`}
                className="group flex flex-col items-center"
              >
                <div className="relative w-full aspect-square rounded-2xl overflow-hidden mb-2 bg-muted hover:shadow-xl transition-all duration-300 hover:scale-105">
                  <ImageWithFallback
                    src={product.image}
                    alt={product.name}
                    className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <p className="text-xs text-center text-foreground font-medium line-clamp-2">
                  {product.name}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Home & Garden Products */}
      <section className="py-12 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold text-foreground">
              Home & Garden
            </h2>
            <Link href="/category?category=Home+%26+Garden"
              className="text-[var(--primary-color)] hover:text-orange-600 font-semibold text-sm"
            >
              View All →
            </Link>
          </div>
          <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8 gap-3">
            {homeGardenProducts.map((product) => (
              <Link key={product.name}
                href={`/category?category=Home+%26+Garden&subcategory=${encodeURIComponent(product.name)}`}
                className="group flex flex-col items-center"
              >
                <div className="relative w-full aspect-square rounded-2xl overflow-hidden mb-2 bg-muted hover:shadow-xl transition-all duration-300 hover:scale-105">
                  <ImageWithFallback
                    src={product.image}
                    alt={product.name}
                    className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <p className="text-xs text-center text-foreground font-medium line-clamp-2">
                  {product.name}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Sports Products */}
      <section className="py-12 bg-gradient-to-b from-orange-50 to-white dark:from-gray-900 dark:to-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold text-foreground">
              Sports Products
            </h2>
            <Link href="/category?category=Sports"
              className="text-[var(--primary-color)] hover:text-orange-600 font-semibold text-sm"
            >
              View All →
            </Link>
          </div>
          <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8 gap-3">
            {sportsProducts.map((product) => (
              <Link key={product.name}
                href={`/category?category=Sports&subcategory=${encodeURIComponent(product.name)}`}
                className="group flex flex-col items-center"
              >
                <div className="relative w-full aspect-square rounded-2xl overflow-hidden mb-2 bg-muted hover:shadow-xl transition-all duration-300 hover:scale-105">
                  <ImageWithFallback
                    src={product.image}
                    alt={product.name}
                    className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <p className="text-xs text-center text-foreground font-medium line-clamp-2">
                  {product.name}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Beauty Products */}
      <section className="py-12 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold text-foreground">
              Beauty Products
            </h2>
            <Link href="/category?category=Beauty"
              className="text-[var(--primary-color)] hover:text-orange-600 font-semibold text-sm"
            >
              View All →
            </Link>
          </div>
          <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8 gap-3">
            {beautyProducts.map((product) => (
              <Link key={product.name}
                href={`/category?category=Beauty&subcategory=${encodeURIComponent(product.name)}`}
                className="group flex flex-col items-center"
              >
                <div className="relative w-full aspect-square rounded-2xl overflow-hidden mb-2 bg-muted hover:shadow-xl transition-all duration-300 hover:scale-105">
                  <ImageWithFallback
                    src={product.image}
                    alt={product.name}
                    className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <p className="text-xs text-center text-foreground font-medium line-clamp-2">
                  {product.name}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Books */}
      <section className="py-12 bg-gradient-to-b from-amber-50 to-white dark:from-gray-900 dark:to-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold text-foreground">
              Books
            </h2>
            <Link href="/category?category=Books"
              className="text-[var(--primary-color)] hover:text-orange-600 font-semibold text-sm"
            >
              View All →
            </Link>
          </div>
          <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8 gap-3">
            {booksProducts.map((product) => (
              <Link key={product.name}
                href={`/category?category=Books&subcategory=${encodeURIComponent(product.name)}`}
                className="group flex flex-col items-center"
              >
                <div className="relative w-full aspect-square rounded-2xl overflow-hidden mb-2 bg-muted hover:shadow-xl transition-all duration-300 hover:scale-105">
                  <ImageWithFallback
                    src={product.image}
                    alt={product.name}
                    className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <p className="text-xs text-center text-foreground font-medium line-clamp-2">
                  {product.name}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}


