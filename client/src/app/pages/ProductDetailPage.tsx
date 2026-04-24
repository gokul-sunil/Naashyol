"use client";

import { useState, useEffect, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Star, ShoppingCart, Heart, Share2, Truck, Shield, RotateCcw, ChevronLeft, Plus, Minus, Zap, Check, MessageSquare } from "lucide-react";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Card } from "../components/ui/card";
import { Separator } from "../components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { toast } from "sonner";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { useCart } from "../contexts/CartContext";
import { useWishlist } from "../contexts/WishlistContext";
import { productsApi, reviewsApi } from "@/services/api";

export function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useRouter();
  const { addItem } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [reviews, setReviews] = useState<any[]>([]);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedAttributes, setSelectedAttributes] = useState<Record<string, string>>({});

  useEffect(() => {
    if (!id) return;
    const fetchData = async () => {
      try {
        const [prodData, reviewsData] = await Promise.all([
          productsApi.byId(id as string),
          reviewsApi.listByProduct(id as string),
        ]);
        setProduct(prodData);
        setReviews(reviewsData);
        
        // Select first variant as default
        if (prodData.variants?.length > 0) {
          const firstVariant = prodData.variants[0];
          const initialAttrs: Record<string, string> = {};
          firstVariant.attributes.forEach((a: any) => {
            initialAttrs[a.name] = a.value;
          });
          setSelectedAttributes(initialAttrs);
        }
      } catch (err) {
        toast.error("Failed to load product details");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  // Find selected variant based on selected attributes
  const selectedVariant = useMemo(() => {
    if (!product || !product.variants) return null;
    return product.variants.find((v: any) => 
      v.attributes.every((a: any) => selectedAttributes[a.name] === a.value)
    );
  }, [product, selectedAttributes]);

  // Get unique values for each attribute
  const attributesMap = useMemo(() => {
    if (!product || !product.variants) return {};
    const map: Record<string, Set<string>> = {};
    product.variants.forEach((v: any) => {
      v.attributes.forEach((a: any) => {
        if (!map[a.name]) map[a.name] = new Set();
        map[a.name].add(a.value);
      });
    });
    return map;
  }, [product]);

  const handleAttributeSelect = (name: string, value: string) => {
    setSelectedAttributes(prev => ({ ...prev, [name]: value }));
  };

  const handleAddToCart = async () => {
    if (!selectedVariant) {
      toast.error("Please select all options");
      return;
    }
    if (selectedVariant.currentStock < quantity) {
      toast.error("Insufficient stock for selected options");
      return;
    }
    try {
      await addItem(product._id, selectedVariant.sku, quantity, {
        id: product._id,
        sku: selectedVariant.sku,
        name: product.title,
        price: selectedVariant.sellingPrice,
        image: selectedVariant.image || product.images[0],
        variant: selectedVariant,
      });
      toast.success("Added to cart");
    } catch (err: any) {
      toast.error(err.message || "Failed to add to cart");
    }
  };

  if (loading) return <div className="p-12 text-center">Loading product...</div>;
  if (!product) return <div className="p-12 text-center">Product not found</div>;

  const currentPrice = selectedVariant?.sellingPrice || product.offerPrice || product.price;
  const inStock = selectedVariant ? selectedVariant.currentStock > 0 : product.isActive;
  const stockCount = selectedVariant ? selectedVariant.currentStock : 0;

  return (
    <div className="min-h-screen bg-background pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex mb-8 text-sm font-medium text-muted-foreground">
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          <ChevronLeft className="size-4 mx-2 rotate-180" />
          <Link href="/products" className="hover:text-primary transition-colors">Products</Link>
          <ChevronLeft className="size-4 mx-2 rotate-180" />
          <span className="text-foreground truncate">{product.title}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="aspect-square relative overflow-hidden bg-muted dark:bg-card text-card-foreground [border-radius:0!important]">
              <ImageWithFallback
                src={selectedVariant?.image || product.images[selectedImage]}
                alt={product.title}
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              />
              {product.offerPrice && (
                <Badge className="absolute top-4 left-4 bg-red-600 text-inverse font-bold [border-radius:0!important]">
                  SALE
                </Badge>
              )}
            </div>
            <div className="grid grid-cols-4 gap-4">
              {product.images.map((img: string, idx: number) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`aspect-square relative overflow-hidden bg-muted dark:bg-card text-card-foreground [border-radius:0!important] border-2 transition-all ${
                    selectedImage === idx ? "border-primary" : "border-transparent opacity-70 hover:opacity-100"
                  }`}
                >
                  <ImageWithFallback src={img} alt={`${product.title} ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-8">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-primary uppercase tracking-wider">{product.brand}</span>
                <div className="flex items-center gap-1">
                  <Star className="size-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-bold text-foreground">4.8</span>
                  <span className="text-muted-foreground">({reviews.length} reviews)</span>
                </div>
              </div>
              <h1 className="text-4xl font-extrabold text-foreground mb-4 leading-tight">{product.title}</h1>
              <div className="flex items-end gap-4 mb-6">
                <span className="text-4xl font-black text-primary">${currentPrice}</span>
                {product.offerPrice && (
                  <span className="text-xl text-muted-foreground dark:text-muted-foreground line-through mb-1">${product.price}</span>
                )}
              </div>
              <p className="text-muted-foreground leading-relaxed text-lg">{product.description}</p>
            </div>

            <Separator className="bg-border dark:bg-card text-card-foreground" />

            {/* Dynamic Attributes Selection */}
            {Object.keys(attributesMap).map(attrName => (
              <div key={attrName}>
                <h3 className="text-sm font-bold text-foreground uppercase tracking-widest mb-4">{attrName}</h3>
                <div className="flex flex-wrap gap-3">
                  {Array.from(attributesMap[attrName]).map(value => (
                    <button
                      key={value}
                      onClick={() => handleAttributeSelect(attrName, value)}
                      className={`px-6 py-2 text-sm font-bold transition-all border-2 [border-radius:0!important] ${
                        selectedAttributes[attrName] === value
                          ? "bg-primary border-primary text-inverse shadow-lg shadow-primary/20"
                          : "border-border text-muted-foreground hover:border-primary hover:text-primary"
                      }`}
                    >
                      {value}
                    </button>
                  ))}
                </div>
              </div>
            ))}

            <div className="space-y-6">
              <div className="flex items-center gap-8">
                <div>
                  <h3 className="text-sm font-bold text-foreground uppercase tracking-widest mb-4">Quantity</h3>
                  <div className="flex items-center border-2 border-border [border-radius:0!important]">
                    <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="p-3 hover:text-primary transition-colors border-r border-border"><Minus className="size-4" /></button>
                    <span className="w-16 text-center font-bold text-foreground">{quantity}</span>
                    <button onClick={() => setQuantity(q => q + 1)} className="p-3 hover:text-primary transition-colors border-l border-border"><Plus className="size-4" /></button>
                  </div>
                </div>
                <div className="pt-8">
                  {inStock ? (
                    <span className="text-green-600 font-bold flex items-center gap-2">
                      <Check className="size-5" /> In Stock ({stockCount} available)
                    </span>
                  ) : (
                    <span className="text-red-600 font-bold">Out of Stock</span>
                  )}
                </div>
              </div>

              <div className="flex gap-4">
                <Button 
                  onClick={handleAddToCart} 
                  className="flex-1 h-16 text-lg font-black uppercase tracking-widest [border-radius:0!important] transition-transform active:scale-95"
                  disabled={!inStock}
                >
                  <ShoppingCart className="size-5 mr-3" /> Add to Cart
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => toggleWishlist(product._id)} 
                  className={`size-16 p-0 [border-radius:0!important] transition-all border-2 ${
                    isInWishlist(product._id) ? "border-red-600 text-red-600 bg-red-50 dark:bg-red-900/10" : "border-border"
                  }`}
                >
                  <Heart className={`size-6 ${isInWishlist(product._id) ? "fill-current" : ""}`} />
                </Button>
              </div>
            </div>

            <Separator className="bg-border dark:bg-card text-card-foreground" />

            {/* Service Highlights */}
            <div className="grid grid-cols-3 gap-6">
              {[
                { icon: Truck, label: "Free Shipping", sub: "Orders over $100" },
                { icon: Shield, label: "Secure Payment", sub: "100% Secure payment" },
                { icon: RotateCcw, label: "Easy Returns", sub: "30-day return policy" },
              ].map((item, idx) => (
                <div key={idx} className="text-center">
                  <div className="bg-muted p-4 inline-block mb-3 [border-radius:0!important]">
                    <item.icon className="size-6 text-primary" />
                  </div>
                  <h4 className="text-sm font-bold text-foreground mb-1">{item.label}</h4>
                  <p className="text-xs text-muted-foreground">{item.sub}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tabs Content */}
        <div className="mt-20">
          <Tabs defaultValue="description" className="w-full">
            <TabsList className="w-full justify-start border-b bg-transparent h-14 p-0 gap-8 [border-radius:0!important]">
              <TabsTrigger value="description" className="h-14 border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent [border-radius:0!important] font-bold uppercase tracking-widest px-0">Description</TabsTrigger>
              <TabsTrigger value="specifications" className="h-14 border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent [border-radius:0!important] font-bold uppercase tracking-widest px-0">Specifications</TabsTrigger>
              <TabsTrigger value="reviews" className="h-14 border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent [border-radius:0!important] font-bold uppercase tracking-widest px-0">Reviews ({reviews.length})</TabsTrigger>
            </TabsList>

            <TabsContent value="description" className="mt-12">
              <div className="max-w-3xl">
                <p className="text-muted-foreground text-lg leading-relaxed mb-8">{product.description}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {product.specifications?.map((spec: any, idx: number) => (
                    <div key={idx} className="flex items-start gap-4">
                      <div className="size-6 bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                        <Check className="size-4 text-primary" />
                      </div>
                      <span className="text-muted-foreground font-medium">{spec.key}: {spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="specifications" className="mt-12">
              <div className="max-w-2xl border-2 border-gray-100 dark:border-gray-900">
                {product.specifications?.map((spec: any, idx: number) => (
                  <div key={idx} className={`flex border-b border-gray-100 dark:border-gray-900 last:border-0 ${idx % 2 === 0 ? "bg-muted/50 dark:bg-card text-card-foreground/50" : ""}`}>
                    <div className="w-1/3 p-4 font-bold text-foreground uppercase tracking-wider text-xs border-r border-gray-100 dark:border-gray-900">{spec.key}</div>
                    <div className="w-2/3 p-4 text-muted-foreground text-sm">{spec.value}</div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="reviews" className="mt-12">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                {/* Review Stats */}
                <div className="lg:col-span-1 space-y-6">
                  <div className="bg-muted p-8 text-center [border-radius:0!important]">
                    <h3 className="text-5xl font-black text-foreground mb-2">4.8</h3>
                    <div className="flex justify-center gap-1 mb-4">
                      {[1, 2, 3, 4, 5].map(s => <Star key={s} className="size-5 fill-yellow-400 text-yellow-400" />)}
                    </div>
                    <p className="text-muted-foreground font-bold uppercase tracking-wider text-sm">Based on {reviews.length} reviews</p>
                  </div>
                  <Button className="w-full h-14 font-bold uppercase tracking-widest [border-radius:0!important]">Write a Review</Button>
                </div>

                {/* Reviews List */}
                <div className="lg:col-span-2 space-y-8">
                  {reviews.length > 0 ? reviews.map((review) => (
                    <div key={review._id} className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-black text-foreground uppercase tracking-widest">{review.user?.name}</h4>
                          <div className="flex gap-1 mt-1">
                            {[1, 2, 3, 4, 5].map(s => (
                              <Star key={s} className={`size-3 ${s <= review.rating ? "fill-yellow-400 text-yellow-400" : "text-muted"}`} />
                            ))}
                          </div>
                        </div>
                        <span className="text-sm text-muted-foreground font-medium">{new Date(review.createdAt).toLocaleDateString()}</span>
                      </div>
                      <p className="text-muted-foreground leading-relaxed">{review.comment}</p>
                      {review.images?.length > 0 && (
                        <div className="flex gap-4">
                          {review.images.map((img: string, i: number) => (
                            <div key={i} className="size-20 bg-muted dark:bg-card text-card-foreground [border-radius:0!important] overflow-hidden">
                              <ImageWithFallback src={img} alt="Review" className="w-full h-full object-cover" />
                            </div>
                          ))}
                        </div>
                      )}
                      <Separator className="bg-muted dark:bg-card text-card-foreground mt-8" />
                    </div>
                  )) : (
                    <div className="text-center py-12 text-muted-foreground font-medium">No reviews yet. Be the first to review!</div>
                  )}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

