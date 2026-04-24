"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  Star,
  Heart,
  SlidersHorizontal,
  Home,
  Leaf,
  UtensilsCrossed,
  Sofa,
  ShoppingBag,
  Tag,
  ChevronRight,
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Label } from "../components/ui/label";
import { Checkbox } from "../components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../components/ui/sheet";
import { Separator } from "../components/ui/separator";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { useCart } from "../contexts/CartContext";
import { useWishlist } from "../contexts/WishlistContext";
import { toast } from "sonner";
import Slider1 from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FashionAdCarousel } from "../components/FashionAdCarousel";
import { allProducts } from "../data/products";

// ─── Category Metadata ───────────────────────────────────────────────────────

const categoryMeta: Record<
  string,
  {
    title: string;
    subtitle: string;
    gradient: string;
    accentColor: string;
  }
> = {
  Fashion: {
    title: "Fashion",
    subtitle: "Discover the latest trends in clothing, footwear & accessories",
    gradient: "from-pink-600 via-rose-500 to-orange-400",
    accentColor: "#F43F5E",
  },
  Electronics: {
    title: "Electronics",
    subtitle: "Cutting-edge gadgets, devices & tech accessories",
    gradient: "from-blue-600 via-cyan-500 to-teal-400",
    accentColor: "#06B6D4",
  },
  "Home & Garden": {
    title: "Home & Garden",
    subtitle: "Everything you need to make your space beautiful",
    gradient: "from-green-600 via-emerald-500 to-teal-400",
    accentColor: "#10B981",
  },
  Sports: {
    title: "Sports",
    subtitle: "Premium gear for every sport & fitness goal",
    gradient: "from-orange-500 via-amber-500 to-yellow-400",
    accentColor: "#F59E0B",
  },
  Beauty: {
    title: "Beauty",
    subtitle: "Skincare, makeup & wellness essentials",
    gradient: "from-purple-600 via-pink-500 to-rose-400",
    accentColor: "#A855F7",
  },
  Books: {
    title: "Books",
    subtitle: "Explore worlds through fiction, knowledge & inspiration",
    gradient: "from-indigo-600 via-blue-500 to-sky-400",
    accentColor: "#6366F1",
  },
};

// ─── Subcategory Data ────────────────────────────────────────────────────────

const subcategoryData: Record<
  string,
  { name: string; image: string }[]
> = {
  Fashion: [
    { name: "EID", image: "https://images.unsplash.com/photo-1767775498862-d4740ce574ce?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400" },
    { name: "Tshirts, Shirts", image: "https://images.unsplash.com/photo-1516442443906-71605254b628?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400" },
    { name: "Jeans", image: "https://images.unsplash.com/photo-1713880442898-0f151fba5e16?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400" },
    { name: "Sports Shoes", image: "https://images.unsplash.com/photo-1695459468644-717c8ae17eed?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400" },
    { name: "Watches", image: "https://images.unsplash.com/photo-1600003014755-ba31aa59c4b6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400" },
    { name: "Kids Clothing", image: "https://images.unsplash.com/photo-1733924304841-7320116fbe69?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400" },
    { name: "Backpacks", image: "https://images.unsplash.com/photo-1655303219938-3a771279c801?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400" },
    { name: "Kurtas", image: "https://images.unsplash.com/photo-1727835523550-18478cacefa2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400" },
    { name: "Casual Wear", image: "https://images.unsplash.com/photo-1640989818014-b4363bd44443?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400" },
    { name: "Tracksuits", image: "https://images.unsplash.com/photo-1768929096095-8f379b34278b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400" },
    { name: "Trendy Street", image: "https://images.unsplash.com/photo-1768610284447-2ec9e61bd63b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400" },
    { name: "Kurta Sets", image: "https://images.unsplash.com/photo-1766994063823-ed214f883548?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400" },
    { name: "Dresses, Tops", image: "https://images.unsplash.com/photo-1730952756912-9a3ac64c5491?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400" },
    { name: "Casual Shoes", image: "https://images.unsplash.com/photo-1559744463-b288e9628d92?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400" },
    { name: "Trolley Bags", image: "https://images.unsplash.com/photo-1760648311436-d18d39f499bd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400" },
    { name: "Jewellery", image: "https://images.unsplash.com/photo-1718871186381-6d59524a64f6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400" },
    { name: "Sarees", image: "https://images.unsplash.com/photo-1758120221788-d576fa58f520?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400" },
    { name: "Jackets & Sweaters", image: "https://images.unsplash.com/photo-1740442535747-6c292f995539?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400" },
  ],
  Electronics: [
    { name: "Smartphones", image: "https://images.unsplash.com/photo-1741061961703-0739f3454314?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400" },
    { name: "Laptops", image: "https://images.unsplash.com/photo-1693206578601-21cdc341d2c8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400" },
    { name: "Headphones", image: "https://images.unsplash.com/photo-1572119244337-bcb4aae995af?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400" },
    { name: "Cameras", image: "https://images.unsplash.com/photo-1735994895660-32291564eb2e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400" },
    { name: "Smartwatches", image: "https://images.unsplash.com/photo-1557438159-51eec7a6c9e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400" },
    { name: "Gaming Consoles", image: "https://images.unsplash.com/photo-1665041974623-d398d035023e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400" },
    { name: "TVs", image: "https://images.unsplash.com/photo-1556889487-b6f8d3fc728b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400" },
    { name: "Tablets", image: "https://images.unsplash.com/photo-1561154464-82e9adf32764?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400" },
    { name: "Speakers", image: "https://images.unsplash.com/photo-1645020089957-608f1f0dfb61?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400" },
    { name: "Drones", image: "https://images.unsplash.com/photo-1626020628008-e05290afad21?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400" },
    { name: "Keyboards", image: "https://images.unsplash.com/photo-1656711081969-9d16ebc2d210?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400" },
    { name: "Gaming Mouse", image: "https://images.unsplash.com/photo-1756928626912-17d51297f43d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400" },
    { name: "Storage", image: "https://images.unsplash.com/photo-1689287428295-52e64882c4f1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400" },
    { name: "Cables & Chargers", image: "https://images.unsplash.com/photo-1657252084959-a0c1a26744df?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400" },
    { name: "Power Banks", image: "https://images.unsplash.com/photo-1736513963979-90b024508341?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400" },
    { name: "Webcams", image: "https://images.unsplash.com/photo-1762681290673-ba1ad4ea0875?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400" },
    { name: "Routers", image: "https://images.unsplash.com/photo-1770393698717-fbbebdeccd5d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400" },
    { name: "Microphones", image: "https://images.unsplash.com/photo-1608613108344-07ce970d61da?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400" },
  ],
  "Home & Garden": [
    { name: "Furniture", image: "https://images.unsplash.com/photo-1768946052273-0a2dd7f3e365?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400" },
    { name: "Kitchen Appliances", image: "https://images.unsplash.com/photo-1762186540963-efa1702b3379?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400" },
    { name: "Bedding", image: "https://images.unsplash.com/photo-1629455281771-21b9a5176722?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400" },
    { name: "Home Decor", image: "https://images.unsplash.com/photo-1765809436270-ae2d938849b2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400" },
    { name: "Lighting", image: "https://images.unsplash.com/photo-1763060722627-e06bfa20faaf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400" },
    { name: "Indoor Plants", image: "https://images.unsplash.com/photo-1637311252429-634d760e08b2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400" },
    { name: "Garden Tools", image: "https://images.unsplash.com/photo-1640306107674-23b73a335f12?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400" },
    { name: "Storage", image: "https://images.unsplash.com/photo-1768875845344-5663fa9acf15?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400" },
    { name: "Curtains", image: "https://images.unsplash.com/photo-1671328920741-ea6f4233dc07?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400" },
    { name: "Rugs", image: "https://images.unsplash.com/photo-1644977624606-4f7dc0093e7e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400" },
    { name: "Cookware", image: "https://images.unsplash.com/photo-1623059265421-2dc2a04f10f6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400" },
    { name: "Bathroom", image: "https://images.unsplash.com/photo-1766727923667-4686db7e9bcb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400" },
    { name: "Outdoor Furniture", image: "https://images.unsplash.com/photo-1560990883-9b76fec399a9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400" },
    { name: "Wall Art", image: "https://images.unsplash.com/photo-1554907984-15263bfd63bd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400" },
    { name: "Cleaning", image: "https://images.unsplash.com/photo-1649073005971-37babef31983?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400" },
    { name: "Dining", image: "https://images.unsplash.com/photo-1611633332753-d1e2f695aa3c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400" },
    { name: "Office", image: "https://images.unsplash.com/photo-1700451761308-ec56f93c82be?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400" },
    { name: "Garden Plants", image: "https://images.unsplash.com/photo-1693767074374-92078f096d88?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400" },
  ],
  Sports: [
    { name: "Sports Shoes", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400" },
    { name: "Fitness Equipment", image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400" },
    { name: "Yoga Mats", image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400" },
    { name: "Sportswear", image: "https://images.unsplash.com/photo-1571945153237-4929e783af4a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400" },
    { name: "Cycling", image: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400" },
    { name: "Swimming", image: "https://images.unsplash.com/photo-1600965962102-9d260a71890d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400" },
    { name: "Running", image: "https://images.unsplash.com/photo-1461897104016-0b3b00cc81ee?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400" },
    { name: "Cricket", image: "https://images.unsplash.com/photo-1540747913346-19212a4f73e3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400" },
    { name: "Football", image: "https://images.unsplash.com/photo-1560272564-c83b66b1ad12?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400" },
    { name: "Basketball", image: "https://images.unsplash.com/photo-1546519638405-a9f9e53b2c6d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400" },
    { name: "Tennis", image: "https://images.unsplash.com/photo-1542144582-1ba00456b5e3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400" },
    { name: "Badminton", image: "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400" },
    { name: "Gym Equipment", image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400" },
    { name: "Sports Bags", image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400" },
    { name: "Water Sports", image: "https://images.unsplash.com/photo-1530053969600-caed2596d242?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400" },
    { name: "Boxing", image: "https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400" },
    { name: "Sports Watches", image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400" },
    { name: "Outdoor Sports", image: "https://images.unsplash.com/photo-1551632811-561732d1e306?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400" },
  ],
  Beauty: [
    { name: "Skincare", image: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400" },
    { name: "Makeup", image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400" },
    { name: "Perfumes", image: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400" },
    { name: "Haircare", image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400" },
    { name: "Lipstick", image: "https://images.unsplash.com/photo-1586495777744-4e6af7e48613?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400" },
    { name: "Nail Polish", image: "https://images.unsplash.com/photo-1604654894610-df63bc536371?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400" },
    { name: "Moisturizers", image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400" },
    { name: "Sunscreen", image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400" },
    { name: "Body Lotion", image: "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400" },
    { name: "Eye Makeup", image: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400" },
    { name: "Face Mask", image: "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400" },
    { name: "Hair Styling", image: "https://images.unsplash.com/photo-1562322140-8baeececf3df?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400" },
    { name: "Bath & Body", image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400" },
    { name: "Serums", image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400" },
    { name: "Beauty Tools", image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400" },
    { name: "Men's Grooming", image: "https://images.unsplash.com/photo-1621607512214-68297480165e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400" },
    { name: "Fragrances", image: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400" },
    { name: "Foot Care", image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400" },
  ],
  Books: [
    { name: "Fiction", image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400" },
    { name: "Non-Fiction", image: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400" },
    { name: "Self-Help", image: "https://images.unsplash.com/photo-1519682337058-a94d519337bc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400" },
    { name: "Business", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400" },
    { name: "Children's Books", image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400" },
    { name: "Biography", image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400" },
    { name: "Mystery", image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400" },
    { name: "Romance", image: "https://images.unsplash.com/photo-1474552226712-ac0f0961a954?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400" },
    { name: "Science Fiction", image: "https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400" },
    { name: "Fantasy", image: "https://images.unsplash.com/photo-1621351183012-e2f9972dd9bf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400" },
    { name: "Cookbooks", image: "https://images.unsplash.com/photo-1466637574441-749b8f19452f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400" },
    { name: "Travel", image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400" },
    { name: "History", image: "https://images.unsplash.com/photo-1461360370896-922624d12aa1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400" },
    { name: "Poetry", image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400" },
    { name: "Comics", image: "https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400" },
    { name: "Religious", image: "https://images.unsplash.com/photo-1519791883288-dc8bd696e667?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400" },
    { name: "Art & Design", image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400" },
    { name: "Educational", image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400" },
  ],
};

// Flash deal configs per category
const flashDealConfigs: Record<
  string,
  { title: string; desc: string; cta: string; discount: string; color: string; icon: React.ReactNode; href: string }[]
> = {
  Fashion: [
    { title: "EID Special", desc: "Festive fashion for every celebration", cta: "Shop Now", discount: "40% OFF", color: "from-rose-500 to-pink-600", icon: <ShoppingBag className="w-4 h-4 text-inverse" />, href: "/category?category=Fashion&subcategory=EID" },
    { title: "Kurta Collection", desc: "Ethnic wear at unbeatable prices", cta: "Explore", discount: "30% OFF", color: "from-orange-500 to-amber-600", icon: <Tag className="w-4 h-4 text-inverse" />, href: "/category?category=Fashion&subcategory=Kurtas" },
    { title: "Sneaker Drops", desc: "Latest sports shoes & streetwear", cta: "Browse", discount: "25% OFF", color: "from-purple-500 to-indigo-600", icon: <ShoppingBag className="w-4 h-4 text-inverse" />, href: "/category?category=Fashion&subcategory=Sports Shoes" },
    { title: "Accessories Sale", desc: "Watches, bags & jewellery deals", cta: "View All", discount: "35% OFF", color: "from-teal-500 to-cyan-600", icon: <Tag className="w-4 h-4 text-inverse" />, href: "/category?category=Fashion&subcategory=Watches" },
  ],
  Electronics: [
    { title: "Smartphone Deals", desc: "Latest mobiles at great prices", cta: "Shop Now", discount: "20% OFF", color: "from-blue-500 to-cyan-600", icon: <Tag className="w-4 h-4 text-inverse" />, href: "/category?category=Electronics&subcategory=Smartphones" },
    { title: "Laptop Sale", desc: "Work & game with powerful laptops", cta: "Explore", discount: "15% OFF", color: "from-indigo-500 to-blue-600", icon: <Tag className="w-4 h-4 text-inverse" />, href: "/category?category=Electronics&subcategory=Laptops" },
    { title: "Audio Fest", desc: "Headphones, speakers & earbuds", cta: "Browse", discount: "30% OFF", color: "from-violet-500 to-purple-600", icon: <Tag className="w-4 h-4 text-inverse" />, href: "/category?category=Electronics&subcategory=Headphones" },
    { title: "Gaming Week", desc: "Consoles, mice, keyboards & more", cta: "View All", discount: "25% OFF", color: "from-green-500 to-emerald-600", icon: <Tag className="w-4 h-4 text-inverse" />, href: "/category?category=Electronics&subcategory=Gaming Consoles" },
  ],
  "Home & Garden": [
    { title: "Home Essentials", desc: "Upgrade your living space with quality items", cta: "Browse", discount: "Free Ship", color: "from-teal-500 to-teal-600", icon: <Home className="w-4 h-4 text-inverse" />, href: "/category?category=Home & Garden&subcategory=Home Decor" },
    { title: "Garden Tools", desc: "Premium gardening equipment", cta: "Shop", discount: "25% OFF", color: "from-green-600 to-green-700", icon: <Leaf className="w-4 h-4 text-inverse" />, href: "/category?category=Home & Garden&subcategory=Garden Tools" },
    { title: "Kitchen Deals", desc: "Modern appliances for your cooking needs", cta: "Explore", discount: "20% OFF", color: "from-orange-500 to-orange-600", icon: <UtensilsCrossed className="w-4 h-4 text-inverse" />, href: "/category?category=Home & Garden&subcategory=Kitchen Appliances" },
    { title: "Furniture Sale", desc: "Transform your space with modern designs", cta: "Shop", discount: "30% OFF", color: "from-purple-600 to-purple-700", icon: <Sofa className="w-4 h-4 text-inverse" />, href: "/category?category=Home & Garden&subcategory=Furniture" },
  ],
  Sports: [
    { title: "Fitness Gear", desc: "Premium sports equipment at great prices", cta: "Shop", discount: "30% OFF", color: "from-orange-500 to-red-500", icon: <Tag className="w-4 h-4 text-inverse" />, href: "/category?category=Sports&subcategory=Fitness Equipment" },
    { title: "Sportswear", desc: "High-performance activewear", cta: "Browse", discount: "25% OFF", color: "from-yellow-500 to-orange-500", icon: <ShoppingBag className="w-4 h-4 text-inverse" />, href: "/category?category=Sports&subcategory=Sportswear" },
    { title: "Cricket Season", desc: "Top cricket gear & accessories", cta: "Explore", discount: "20% OFF", color: "from-green-500 to-teal-500", icon: <Tag className="w-4 h-4 text-inverse" />, href: "/category?category=Sports&subcategory=Cricket" },
    { title: "Sneakers Drop", desc: "Latest sports shoes & running gear", cta: "Shop Now", discount: "15% OFF", color: "from-blue-500 to-indigo-500", icon: <ShoppingBag className="w-4 h-4 text-inverse" />, href: "/category?category=Sports&subcategory=Sports Shoes" },
  ],
  Beauty: [
    { title: "Skincare Sale", desc: "Premium skincare for glowing skin", cta: "Shop", discount: "15% OFF", color: "from-pink-500 to-rose-600", icon: <Tag className="w-4 h-4 text-inverse" />, href: "/category?category=Beauty&subcategory=Skincare" },
    { title: "Makeup Fest", desc: "Lipsticks, palettes & more", cta: "Explore", discount: "20% OFF", color: "from-purple-500 to-pink-500", icon: <ShoppingBag className="w-4 h-4 text-inverse" />, href: "/category?category=Beauty&subcategory=Makeup" },
    { title: "Fragrance Sale", desc: "Top perfumes at irresistible prices", cta: "Browse", discount: "25% OFF", color: "from-indigo-500 to-purple-600", icon: <Tag className="w-4 h-4 text-inverse" />, href: "/category?category=Beauty&subcategory=Perfumes" },
    { title: "Haircare Week", desc: "Shampoos, serums & styling tools", cta: "View All", discount: "30% OFF", color: "from-teal-500 to-cyan-600", icon: <ShoppingBag className="w-4 h-4 text-inverse" />, href: "/category?category=Beauty&subcategory=Haircare" },
  ],
  Books: [
    { title: "Bestsellers", desc: "Top-rated books across all genres", cta: "Shop", discount: "40% OFF", color: "from-indigo-500 to-blue-600", icon: <Tag className="w-4 h-4 text-inverse" />, href: "/category?category=Books&subcategory=Fiction" },
    { title: "Self-Help Sale", desc: "Books that change your life", cta: "Browse", discount: "35% OFF", color: "from-orange-500 to-amber-600", icon: <ShoppingBag className="w-4 h-4 text-inverse" />, href: "/category?category=Books&subcategory=Self-Help" },
    { title: "Kids' Corner", desc: "Fun reads for young minds", cta: "Explore", discount: "30% OFF", color: "from-green-500 to-teal-500", icon: <Tag className="w-4 h-4 text-inverse" />, href: "/category?category=Books&subcategory=Children's Books" },
    { title: "Business Books", desc: "Learn from the world's best minds", cta: "View All", discount: "25% OFF", color: "from-purple-500 to-violet-600", icon: <ShoppingBag className="w-4 h-4 text-inverse" />, href: "/category?category=Books&subcategory=Business" },
  ],
};

// Top-level categories for "Shop by Category"
const allCategories = [
  { name: "Electronics", color: "bg-blue-600", image: "https://images.unsplash.com/photo-1741061961703-0739f3454314?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400", count: "450+ products" },
  { name: "Fashion", color: "bg-pink-600", image: "https://images.unsplash.com/photo-1516442443906-71605254b628?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400", count: "1200+ products" },
  { name: "Home & Garden", color: "bg-green-600", image: "https://images.unsplash.com/photo-1768946052273-0a2dd7f3e365?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400", count: "800+ products" },
  { name: "Sports", color: "bg-orange-600", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400", count: "1100+ products" },
  { name: "Beauty", color: "bg-purple-600", image: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400", count: "950+ products" },
  { name: "Books", color: "bg-amber-600", image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400", count: "2000+ products" },
];

// ─── Inner Page Component ─────────────────────────────────────────────────────

function CategoryPageInner() {
  const searchParams = useSearchParams();
  // This page reads ?category=Fashion  (set by the nav links in your existing pages)
  const categoryParam = searchParams.get("category") ?? "Fashion";
  const subcategoryParam = searchParams.get("subcategory");

  const [sortBy, setSortBy] = useState("featured");
  const [selectedPriceRange, setSelectedPriceRange] = useState<string>("");
  const [selectedMinRating, setSelectedMinRating] = useState<number | null>(null);
  const [isFilterSheetOpen, setIsFilterSheetOpen] = useState(false);
  const { addItem } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const meta = categoryMeta[categoryParam] ?? {
    title: categoryParam,
    subtitle: "Discover our complete collection of premium products",
    gradient: "from-[var(--primary-color)] to-orange-600",
    accentColor: "var(--primary-color)",
  };

  const subcategories = subcategoryData[categoryParam] ?? [];
  const flashDeals = flashDealConfigs[categoryParam] ?? flashDealConfigs["Fashion"];

  // Filter products
  let products = allProducts.filter((p) => p.category === categoryParam);
  if (subcategoryParam) {
    products = products.filter((p) => p.subcategory === subcategoryParam);
  }

  const priceRanges = [
    { label: "Under $25", value: "0-25" },
    { label: "$25 – $50", value: "25-50" },
    { label: "$50 – $100", value: "50-100" },
    { label: "$100 – $200", value: "100-200" },
    { label: "Over $200", value: "200-9999" },
  ];

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3500,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2, slidesToScroll: 1 } },
      { breakpoint: 640, settings: { slidesToShow: 1, slidesToScroll: 1 } },
    ],
  };

  const FilterContent = () => (
    <div className="space-y-6">
      <div>
        <h3 className="font-semibold text-foreground mb-3">Price Range</h3>
        <Select value={selectedPriceRange} onValueChange={setSelectedPriceRange}>
          <SelectTrigger>
            <SelectValue placeholder="Select price range" />
          </SelectTrigger>
          <SelectContent>
            {priceRanges.map((r) => (
              <SelectItem key={r.value} value={r.value}>{r.label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <Separator />
      <div>
        <h3 className="font-semibold text-foreground mb-3">Rating</h3>
        <div className="space-y-2">
          {[5, 4, 3].map((rating) => (
            <div key={rating} className="flex items-center gap-2">
              <Checkbox
                id={`rating-${rating}`}
                checked={selectedMinRating === rating}
                onCheckedChange={() => setSelectedMinRating(selectedMinRating === rating ? null : rating)}
              />
              <Label htmlFor={`rating-${rating}`} className="flex items-center gap-1 text-sm cursor-pointer">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`size-3.5 ${i < rating ? "fill-[var(--primary-color)] text-[var(--primary-color)]" : "text-muted"}`} />
                ))}
                <span className="ml-1 text-muted-foreground">& Up</span>
              </Label>
            </div>
          ))}
        </div>
      </div>
      <Separator />
      <div>
        <h3 className="font-semibold text-foreground mb-3">Availability</h3>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Checkbox id="in-stock" />
            <Label htmlFor="in-stock" className="text-sm cursor-pointer text-foreground dark:text-muted">In Stock</Label>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox id="on-sale" />
            <Label htmlFor="on-sale" className="text-sm cursor-pointer text-foreground dark:text-muted">On Sale</Label>
          </div>
        </div>
      </div>
      <Button variant="outline" className="w-full" onClick={() => { setSelectedPriceRange(""); setSelectedMinRating(null); }}>
        Clear Filters
      </Button>
    </div>
  );

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">

      {/* Ambient background blobs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-gradient-to-br from-orange-500/25 via-red-500/15 to-pink-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-gradient-to-br from-purple-500/20 via-blue-500/15 to-cyan-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-gradient-to-br from-pink-500/15 via-orange-500/15 to-yellow-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10">

        {/* ── 1. HERO HEADER ─────────────────────────────────────────────────── */}
        <div className={`bg-gradient-to-r ${meta.gradient} relative overflow-hidden`}>
          {/* Decorative overlay pattern */}
          <div className="absolute inset-0 opacity-10"
            style={{ backgroundImage: "radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 20%, white 1px, transparent 1px)", backgroundSize: "60px 60px" }}
          />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 relative">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-inverse/70 text-sm mb-4">
              <Link href="/products" className="hover:text-inverse transition-colors">All Products</Link>
              <ChevronRight className="w-4 h-4" />
              {subcategoryParam ? (
                <>
                  <Link href={`/category?category=${encodeURIComponent(categoryParam)}`} className="hover:text-inverse transition-colors">
                    {categoryParam}
                  </Link>
                  <ChevronRight className="w-4 h-4" />
                  <span className="text-inverse font-medium">{subcategoryParam}</span>
                </>
              ) : (
                <span className="text-inverse font-medium">{categoryParam}</span>
              )}
            </nav>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-inverse mb-3 tracking-tight">
              {subcategoryParam ?? meta.title}
            </h1>
            <p className="text-inverse/85 text-base sm:text-lg max-w-xl">
              {meta.subtitle}
            </p>
            <div className="mt-5 flex items-center gap-3">
              <span className="inline-flex items-center gap-1.5 bg-background/20 backdrop-blur-sm text-inverse text-sm font-medium px-4 py-1.5 rounded-full">
                <ShoppingBag className="w-4 h-4" />
                {products.length} products
              </span>
              <Link href="/products"
                className="inline-flex items-center gap-1.5 bg-background text-foreground text-sm font-semibold px-4 py-1.5 rounded-full hover:bg-background/90 transition-colors"
              >
                All Products
              </Link>
            </div>
          </div>
        </div>

        {/* ── 2. SUBCATEGORY ICON GRID ────────────────────────────────────────── */}
        {subcategories.length > 0 && (
          <section className="py-8 bg-background border-b border-white/5">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-xl font-bold text-inverse">Browse {categoryParam}</h2>
                <span className="text-muted-foreground text-sm">{subcategories.length} categories</span>
              </div>
              <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 xl:grid-cols-12 gap-2 sm:gap-3">
                {subcategories.map((cat) => {
                  const isActive = subcategoryParam === cat.name;
                  return (
                    <Link
                      key={cat.name}
                      href={`/category?category=${encodeURIComponent(categoryParam)}&subcategory=${encodeURIComponent(cat.name)}`}
                      className="group flex flex-col items-center"
                    >
                      <div className={`relative w-full aspect-square rounded-xl overflow-hidden mb-1.5 transition-all duration-300 hover:scale-105
                        ${isActive
                          ? "ring-2 ring-[var(--primary-color)] shadow-lg shadow-orange-500/30"
                          : "hover:shadow-lg hover:shadow-white/10"
                        }`}
                      >
                        <ImageWithFallback
                          src={cat.image}
                          alt={cat.name}
                          className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-300"
                        />
                        {isActive && (
                          <div className="absolute inset-0 bg-[var(--primary-color)]/20 flex items-center justify-center">
                            <div className="w-2 h-2 rounded-full bg-[var(--primary-color)]" />
                          </div>
                        )}
                      </div>
                      <p className={`text-[10px] sm:text-xs text-center font-medium line-clamp-2 leading-tight transition-colors
                        ${isActive ? "text-[var(--primary-color)]" : "text-muted group-hover:text-inverse"}`}
                      >
                        {cat.name}
                      </p>
                    </Link>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {/* ── 3. FASHION AD CAROUSEL (Fashion only) ──────────────────────────── */}
        {categoryParam === "Fashion" && !subcategoryParam && (
          <section className="py-8 bg-card text-card-foreground/40">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <FashionAdCarousel />
            </div>
          </section>
        )}

        {/* ── 4. FLASH DEALS & OFFERS ─────────────────────────────────────────── */}
        {/* COMMENTED OUT — uncomment to restore
        <section className="py-10 bg-card text-card-foreground/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-inverse mb-2">
                Flash Deals & Offers
              </h2>
              <p className="text-muted-foreground">
                Don&apos;t miss out on these amazing limited-time offers
              </p>
            </div>

            <Slider1 {...sliderSettings} className="flash-deals-carousel">
              {flashDeals.map((deal) => (
                <div key={deal.title} className="px-3">
                  <div className={`relative rounded-2xl p-6 sm:p-8 bg-gradient-to-br ${deal.color} overflow-hidden shadow-xl h-[240px] sm:h-[260px] flex flex-col justify-between`}>
                    <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-background/10" />
                    <div className="absolute -bottom-4 -left-4 w-20 h-20 rounded-full bg-background/10" />
                    <div className="relative">
                      <div className="inline-flex items-center gap-2 bg-background/20 backdrop-blur-sm rounded-full px-3 py-1 mb-3">
                        {deal.icon}
                        <span className="text-inverse text-xs font-medium">{categoryParam}</span>
                      </div>
                      <h3 className="text-xl sm:text-2xl font-bold text-inverse mb-1">{deal.title}</h3>
                      <p className="text-inverse/85 text-sm">{deal.desc}</p>
                    </div>
                    <div className="relative flex items-center justify-between">
                      <Link href={deal.href} className="bg-background text-foreground px-5 py-2 rounded-full text-sm font-semibold hover:bg-background/90 transition-colors">
                        {deal.cta}
                      </Link>
                      <span className="text-inverse text-xl sm:text-2xl font-extrabold">{deal.discount}</span>
                    </div>
                  </div>
                </div>
              ))}
            </Slider1>
          </div>
        </section>
        */}

        {/* ── 5. SHOP FOR LOVED ONES ──────────────────────────────────────────── */}
        {/* COMMENTED OUT — uncomment to restore
        <section className="py-10 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-inverse mb-6">
              Shop for Loved Ones
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              <Link href={`/category?category=${encodeURIComponent(categoryParam)}&gender=men`}
                className="group relative overflow-hidden rounded-2xl aspect-[4/3] hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]"
              >
                <ImageWithFallback src="https://images.unsplash.com/photo-1635913906376-53130718255a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600" alt="Men's Collection" className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/80 via-blue-900/30 to-transparent" />
                <div className="absolute bottom-5 left-5">
                  <h3 className="text-2xl font-bold text-inverse mb-0.5">Men</h3>
                  <p className="text-inverse/80 text-sm">Discover men&apos;s collection</p>
                </div>
              </Link>
              <Link href={`/category?category=${encodeURIComponent(categoryParam)}&gender=women`}
                className="group relative overflow-hidden rounded-2xl aspect-[4/3] hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]"
              >
                <ImageWithFallback src="https://images.unsplash.com/photo-1655026950620-b39ab24e9b4b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600" alt="Women's Collection" className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500 grayscale" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                <div className="absolute bottom-5 left-5">
                  <h3 className="text-2xl font-bold text-inverse mb-0.5">Women</h3>
                  <p className="text-inverse/80 text-sm">Explore women&apos;s collection</p>
                </div>
              </Link>
              <Link href={`/category?category=${encodeURIComponent(categoryParam)}&collection=genz`}
                className="group relative overflow-hidden rounded-2xl aspect-[4/3] hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]"
              >
                <ImageWithFallback src="https://images.unsplash.com/photo-1610738572401-5dfeeb660c7d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600" alt="Gen Z Collection" className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-green-900/80 via-green-900/30 to-transparent" />
                <div className="absolute bottom-5 left-5">
                  <div className="inline-block bg-green-400 text-foreground font-bold px-2.5 py-0.5 rounded-full text-xs mb-1">spoyl</div>
                  <h3 className="text-2xl font-bold text-inverse mb-0.5">Gen Z Drips</h3>
                  <p className="text-inverse/80 text-sm">Trending Gen Z styles</p>
                </div>
              </Link>
            </div>
          </div>
        </section>
        */}

        {/* ── 6. SHOP BY CATEGORY ─────────────────────────────────────────────── */}
        {/* COMMENTED OUT — uncomment to restore
        <section className="py-10 bg-card text-card-foreground/40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl sm:text-3xl font-bold text-inverse">Shop by Category</h2>
              <Link href="/products" className="text-[var(--primary-color)] text-sm font-medium hover:underline flex items-center gap-1">
                View All <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
              {allCategories.map((cat) => {
                const isCurrentCat = cat.name === categoryParam;
                return (
                  <Link key={cat.name} href={`/category?category=${encodeURIComponent(cat.name)}`}
                    className={`group relative overflow-hidden rounded-2xl aspect-square transition-all duration-300 hover:scale-105
                      ${isCurrentCat ? "ring-2 ring-[var(--primary-color)] shadow-lg shadow-orange-500/30" : ""}`}
                  >
                    <ImageWithFallback src={cat.image} alt={cat.name} className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-300" />
                    <div className={`absolute inset-0 ${cat.color} opacity-70 group-hover:opacity-80 transition-opacity`} />
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-2 text-center">
                      <p className="text-inverse font-bold text-xs sm:text-sm leading-tight">{cat.name}</p>
                      <p className="text-inverse/70 text-[9px] sm:text-xs mt-0.5 hidden sm:block">{cat.count}</p>
                    </div>
                    {isCurrentCat && <div className="absolute top-1.5 right-1.5 w-2.5 h-2.5 rounded-full bg-[var(--primary-color)]" />}
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
        */}

        {/* ── 7. PRODUCT GRID ─────────────────────────────────────────────────── */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

          {/* Toolbar */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-3">
            <div>
              <h2 className="text-xl font-bold text-inverse">
                {subcategoryParam ? subcategoryParam : categoryParam} Products
              </h2>
              <p className="text-muted-foreground text-sm mt-0.5">
                Showing {products.length} products
              </p>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              {/* Filter Sheet */}
              <Sheet open={isFilterSheetOpen} onOpenChange={setIsFilterSheetOpen}>
                <SheetTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-2 text-foreground border-gray-600 bg-card text-card-foreground hover:bg-card text-card-foreground"
                  >
                    <SlidersHorizontal className="w-4 h-4" />
                    <span>Filters</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-80 overflow-y-auto bg-card text-card-foreground border-gray-700">
                  <SheetHeader>
                    <SheetTitle className="text-inverse">Filters</SheetTitle>
                    <SheetDescription className="text-muted-foreground">
                      Refine your product search
                    </SheetDescription>
                  </SheetHeader>
                  <div className="mt-6">
                    <FilterContent />
                  </div>
                </SheetContent>
              </Sheet>

              {/* Sort */}
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full sm:w-44 bg-card text-card-foreground text-inverse border-gray-600">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent className="bg-card text-card-foreground border-gray-700">
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Top Rated</SelectItem>
                  <SelectItem value="newest">Newest</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Grid or Empty State */}
          {products.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <ShoppingBag className="w-16 h-16 text-muted-foreground mb-4" />
              <h3 className="text-xl font-semibold text-inverse mb-2">No products found</h3>
              <p className="text-muted-foreground mb-6">
                We couldn&apos;t find any products in this {subcategoryParam ? "subcategory" : "category"} yet.
              </p>
              <Link href={`/category?category=${encodeURIComponent(categoryParam)}`}>
                <Button className="bg-[var(--primary-color)] hover:bg-orange-600 border-0">
                  View All {categoryParam}
                </Button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
              {products.map((product, index) => (
                <div
                  key={product.id}
                  className="bg-card text-card-foreground border border-gray-700 group overflow-hidden hover:scale-[1.03] transition-all duration-300 rounded-xl shadow-sm hover:shadow-lg hover:shadow-black/40"
                  style={{ animationDelay: `${(index % 10) * 0.04}s` }}
                >
                  <Link
                    href={`/products/${product.id}`}
                    className="relative block aspect-square overflow-hidden bg-card text-card-foreground"
                  >
                    {product.badge && (
                      <Badge className="absolute top-2 right-2 z-10 bg-gradient-to-r from-[var(--primary-color)] to-orange-600 text-inverse text-[9px] px-1.5 py-0.5 border-0">
                        {product.badge}
                      </Badge>
                    )}
                    {!product.inStock && (
                      <Badge className="absolute top-2 right-2 z-10 bg-red-600 text-inverse text-[9px] px-1.5 py-0.5">
                        Out of Stock
                      </Badge>
                    )}
                    <Button
                      size="icon"
                      variant="secondary"
                      className="absolute top-2 left-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity size-7 bg-card text-card-foreground/90 hover:bg-card text-card-foreground"
                      onClick={(e) => {
                        e.preventDefault();
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
                      <Heart className={`size-3.5 ${isInWishlist(product.id) ? "fill-[var(--primary-color)] text-[var(--primary-color)]" : "text-[var(--primary-color)]"}`} />
                    </Button>
                    <ImageWithFallback
                      src={product.image}
                      alt={product.name}
                      className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
                    />
                  </Link>

                  <div className="p-2.5">
                    <Badge variant="outline" className="mb-1.5 text-[9px] border-gray-600 text-muted-foreground">
                      {product.category}
                    </Badge>
                    <h3 className="font-semibold text-xs text-inverse mb-1.5 line-clamp-2 leading-tight">
                      <Link href={`/products/${product.id}`} className="hover:text-[var(--primary-color)] transition-colors">
                        {product.name}
                      </Link>
                    </h3>
                    <div className="flex items-center gap-1 mb-2">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`size-2.5 ${i < Math.floor(product.rating) ? "fill-[var(--primary-color)] text-[var(--primary-color)]" : "text-muted-foreground"}`} />
                        ))}
                      </div>
                      <span className="text-[10px] text-muted-foreground">({product.reviews})</span>
                    </div>
                    <div className="flex items-center gap-1.5 mb-2">
                      <span className="text-sm font-bold text-[var(--primary-color)]">${product.price}</span>
                      {product.originalPrice && (
                        <span className="text-[10px] text-muted-foreground line-through">${product.originalPrice}</span>
                      )}
                    </div>
                    <Button
                      className="w-full bg-[var(--primary-color)] hover:bg-orange-600 h-7 text-xs border-0"
                      disabled={!product.inStock}
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        if (product.inStock) {
                          addItem(product.id, (product as any).sku || product.id, 1, {
                            id: product.id,
                            sku: (product as any).sku || product.id,
                            name: product.name,
                            price: product.price,
                            image: product.image,
                          });
                          toast.success(`${product.name} added to cart!`);
                        }
                      }}
                    >
                      {product.inStock ? "Add to Cart" : "Out of Stock"}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

// ─── Export with Suspense ─────────────────────────────────────────────────────

export function CategoryPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="text-inverse text-lg animate-pulse">Loading…</div>
      </div>
    }>
      <CategoryPageInner />
    </Suspense>
  );
}
