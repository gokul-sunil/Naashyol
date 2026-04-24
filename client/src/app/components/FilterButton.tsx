import { SlidersHorizontal } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { useFilter } from "../contexts/FilterContext";

export function FilterButton() {
  const { isFilterOpen, toggleFilter } = useFilter();
  
  return (
    <Button
      onClick={toggleFilter}
      className={`fixed right-6 bottom-24 md:bottom-8 z-40 size-14 rounded-full shadow-lg transition-all duration-300 hover:scale-110 border-2 ${
        isFilterOpen
          ? "bg-card text-card-foreground hover:bg-card text-card-foreground dark:bg-card text-card-foreground dark:hover:bg-card text-card-foreground border-gray-700 dark:border-gray-600"
          : "bg-[var(--primary-color)] hover:bg-orange-600 border-orange-600 dark:border-orange-500"
      }`}
      size="icon"
    >
      <SlidersHorizontal className="size-6 text-inverse" />
      {isFilterOpen && (
        <Badge className="absolute -top-1 -right-1 size-6 flex items-center justify-center p-0 bg-green-500 hover:bg-green-500 text-inverse text-xs font-bold rounded-full border-2 border-white dark:border-gray-900">
          ✓
        </Badge>
      )}
    </Button>
  );
}


