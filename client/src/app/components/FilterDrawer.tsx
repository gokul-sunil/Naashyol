import { X, SlidersHorizontal, DollarSign, Star, Tag } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { useFilter } from "../contexts/FilterContext";
import { useState } from "react";

export function FilterDrawer() {
  const { isFilterOpen, closeFilter } = useFilter();
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedPriceRange, setSelectedPriceRange] = useState<string>("");
  const [selectedRating, setSelectedRating] = useState<number>(0);

  const categories = [
    "Electronics",
    "Fashion",
    "Home & Garden",
    "Sports",
    "Beauty",
    "Books",
    "Toys",
    "Automotive",
  ];

  const priceRanges = [
    { label: "Under $25", value: "0-25" },
    { label: "$25 - $50", value: "25-50" },
    { label: "$50 - $100", value: "50-100" },
    { label: "$100 - $200", value: "100-200" },
    { label: "Over $200", value: "200+" },
  ];

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const handleApplyFilters = () => {
    // Here you would apply the filters to your products
    console.log("Applied filters:", {
      categories: selectedCategories,
      priceRange: selectedPriceRange,
      rating: selectedRating,
    });
    closeFilter();
  };

  const handleClearFilters = () => {
    setSelectedCategories([]);
    setSelectedPriceRange("");
    setSelectedRating(0);
  };

  return (
    <>
      {/* Backdrop Overlay */}
      <div
        className={`fixed inset-0 bg-inverse/60 z-40 transition-opacity duration-300 ${
          isFilterOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={closeFilter}
      />

      {/* Filter Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-full md:w-96 bg-card shadow-2xl z-50 transform transition-transform duration-300 ease-in-out [border-radius:0!important] ${
          isFilterOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border bg-primary [border-radius:0!important]">
          <div>
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="size-6 text-inverse" />
              <h2 className="text-xl font-bold text-inverse">Filters</h2>
            </div>
            <p className="text-xs text-inverse/90 mt-1">Refine your product search</p>
          </div>
          <Button
            size="icon"
            variant="ghost"
            onClick={closeFilter}
            className="text-inverse hover:bg-background/20 shrink-0 [border-radius:0!important]"
          >
            <X className="size-6" />
          </Button>
        </div>

        {/* Filter Content - Scrollable */}
        <div className="overflow-y-auto h-[calc(100vh-170px)] px-6 py-4 space-y-6">
          {/* Categories */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Tag className="size-5 text-[var(--primary-color)]" />
              <h3 className="text-lg font-bold text-foreground">
                Categories
              </h3>
            </div>
            <div className="space-y-2.5">
              {categories.map((category) => (
                <label
                  key={category}
                  className="flex items-center gap-3 cursor-pointer group"
                >
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(category)}
                    onChange={() => toggleCategory(category)}
                    className="size-5 text-[var(--primary-color)] focus:ring-[var(--primary-color)] [border-radius:0!important] cursor-pointer border-2 border-gray-300 dark:border-gray-600"
                  />
                  <span className="text-base font-medium text-foreground group-hover:text-[var(--primary-color)] dark:group-hover:text-[var(--primary-color)] transition-colors">
                    {category}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <DollarSign className="size-5 text-[var(--primary-color)]" />
              <h3 className="text-lg font-bold text-foreground">
                Price Range
              </h3>
            </div>
            <div className="space-y-2.5">
              {priceRanges.map((range) => (
                <label
                  key={range.value}
                  className="flex items-center gap-3 cursor-pointer group"
                >
                  <input
                    type="radio"
                    name="priceRange"
                    value={range.value}
                    checked={selectedPriceRange === range.value}
                    onChange={(e) => setSelectedPriceRange(e.target.value)}
                    className="size-5 text-[var(--primary-color)] focus:ring-[var(--primary-color)] cursor-pointer border-2 border-gray-300 dark:border-gray-600 [border-radius:0!important]"
                  />
                  <span className="text-base font-medium text-foreground group-hover:text-[var(--primary-color)] dark:group-hover:text-[var(--primary-color)] transition-colors">
                    {range.label}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Rating */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Star className="size-5 text-[var(--primary-color)]" />
              <h3 className="text-lg font-bold text-foreground">
                Rating
              </h3>
            </div>
            <div className="space-y-2.5">
              {[5, 4, 3].map((rating) => (
                <label
                  key={rating}
                  className="flex items-center gap-3 cursor-pointer group"
                >
                  <input
                    type="radio"
                    name="rating"
                    value={rating}
                    checked={selectedRating === rating}
                    onChange={() => setSelectedRating(rating)}
                    className="size-5 text-[var(--primary-color)] focus:ring-[var(--primary-color)] cursor-pointer border-2 border-gray-300 dark:border-gray-600 [border-radius:0!important]"
                  />
                  <div className="flex items-center gap-1.5">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`size-5 ${
                          i < rating
                            ? "fill-[var(--primary-color)] text-[var(--primary-color)]"
                            : "fill-gray-300 text-muted dark:fill-gray-600 dark:text-muted-foreground"
                        }`}
                      />
                    ))}
                    <span className="text-base font-medium text-foreground ml-1 group-hover:text-[var(--primary-color)] dark:group-hover:text-[var(--primary-color)] transition-colors">
                      & Up
                    </span>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Availability */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Tag className="size-5 text-[var(--primary-color)]" />
              <h3 className="text-lg font-bold text-foreground">
                Availability
              </h3>
            </div>
            <div className="space-y-2.5">
              <label className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  className="size-5 text-[var(--primary-color)] focus:ring-[var(--primary-color)] [border-radius:0!important] cursor-pointer border-2 border-gray-300 dark:border-gray-600"
                />
                <span className="text-base font-medium text-foreground group-hover:text-[var(--primary-color)] dark:group-hover:text-[var(--primary-color)] transition-colors">
                  In Stock
                </span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  className="size-5 text-[var(--primary-color)] focus:ring-[var(--primary-color)] [border-radius:0!important] cursor-pointer border-2 border-gray-300 dark:border-gray-600"
                />
                <span className="text-base font-medium text-foreground group-hover:text-[var(--primary-color)] dark:group-hover:text-[var(--primary-color)] transition-colors">
                  On Sale
                </span>
              </label>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-card border-t-2 border-border flex gap-3 [border-radius:0!important]">
          <Button
            variant="outline"
            onClick={handleClearFilters}
            className="flex-1 h-12 text-base font-semibold border-2 border-gray-300 dark:border-gray-600 text-foreground hover:bg-muted dark:hover:bg-card text-card-foreground [border-radius:0!important]"
          >
            Clear All Filters
          </Button>
          <Button
            onClick={handleApplyFilters}
            className="flex-1 h-12 text-base font-semibold bg-[var(--primary-color)] hover:bg-orange-600 text-inverse shadow-lg [border-radius:0!important]"
          >
            Apply Filters
          </Button>
        </div>
      </div>
    </>
  );
}


