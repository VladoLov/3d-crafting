"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Filter, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";

interface CategoryFiltersProps {
  category: {
    id: string;
    name: string;
    products: any[];
  };
  searchParams: {
    sort?: string;
    filter?: string;
    price?: string;
    material?: string;
  };
}

export function CategoryFilters({
  category,
  searchParams,
}: CategoryFiltersProps) {
  const router = useRouter();
  const params = useSearchParams();
  const [priceRange, setPriceRange] = useState([0, 200]);
  const [isOpen, setIsOpen] = useState(false);

  // Extract unique materials from products
  const materials = Array.from(
    new Set(category.products.flatMap((product) => product.materials || []))
  );

  const sizes = Array.from(
    new Set(category.products.flatMap((product) => product.sizes || []))
  );

  const updateFilters = (key: string, value: string) => {
    const current = new URLSearchParams(Array.from(params.entries()));

    if (value) {
      current.set(key, value);
    } else {
      current.delete(key);
    }

    const search = current.toString();
    const query = search ? `?${search}` : "";

    router.push(`/kategorije/${category.id}${query}`);
  };

  const clearFilters = () => {
    router.push(`/kategorije/${category.id}`);
    setPriceRange([0, 200]);
  };

  return (
    <>
      {/* Mobile Filter Toggle */}
      <div className="lg:hidden mb-6">
        <Button
          onClick={() => setIsOpen(!isOpen)}
          variant="outline"
          className="w-full flex items-center justify-between"
        >
          <span className="flex items-center space-x-2">
            <Filter className="h-4 w-4" />
            <span>Filteri</span>
          </span>
          <ChevronDown
            className={`h-4 w-4 transition-transform ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </Button>
      </div>

      {/* Filters Panel */}
      <motion.div
        initial={false}
        animate={{
          height: isOpen ? "auto" : "auto",
          opacity: isOpen ? 1 : 1,
        }}
        className={`bg-white rounded-xl shadow-sm border border-gray-100 p-6 ${
          isOpen ? "block" : "hidden lg:block"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold text-gray-900">Filteri</h3>
          <Button
            onClick={clearFilters}
            variant="ghost"
            size="sm"
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="h-4 w-4 mr-1" />
            Očisti
          </Button>
        </div>

        {/* Sort */}
        <div className="mb-8">
          <h4 className="font-semibold text-gray-900 mb-4">Sortiranje</h4>
          <div className="space-y-3">
            {[
              { value: "", label: "Zadano" },
              { value: "price-asc", label: "Cijena: Niska → Visoka" },
              { value: "price-desc", label: "Cijena: Visoka → Niska" },
              { value: "rating", label: "Najbolje ocijenjeno" },
              { value: "newest", label: "Najnovije" },
            ].map((option) => (
              <label
                key={option.value}
                className="flex items-center space-x-3 cursor-pointer"
              >
                <input
                  type="radio"
                  name="sort"
                  value={option.value}
                  checked={
                    searchParams.sort === option.value ||
                    (!searchParams.sort && option.value === "")
                  }
                  onChange={(e) => updateFilters("sort", e.target.value)}
                  className="text-primary-500 focus:ring-primary-500"
                />
                <span className="text-sm text-gray-700">{option.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Price Range */}
        <div className="mb-8">
          <h4 className="font-semibold text-gray-900 mb-4">Cijena</h4>
          <div className="px-2">
            <Slider
              value={priceRange}
              onValueChange={setPriceRange}
              max={200}
              step={5}
              className="mb-4"
            />
            <div className="flex items-center justify-between text-sm text-gray-600">
              <span>{priceRange[0]}€</span>
              <span>{priceRange[1]}€</span>
            </div>
          </div>
        </div>

        {/* Materials */}
        {materials.length > 0 && (
          <div className="mb-8">
            <h4 className="font-semibold text-gray-900 mb-4">Materijali</h4>
            <div className="space-y-3">
              {materials.map((material) => (
                <label
                  key={material}
                  className="flex items-center space-x-3 cursor-pointer"
                >
                  <Checkbox
                    checked={searchParams.material?.includes(material) || false}
                    onCheckedChange={(checked: boolean) => {
                      const current = searchParams.material?.split(",") || [];
                      const updated = checked
                        ? [...current, material]
                        : current.filter((m) => m !== material);
                      updateFilters("material", updated.join(","));
                    }}
                  />
                  <span className="text-sm text-gray-700">{material}</span>
                </label>
              ))}
            </div>
          </div>
        )}

        {/* Sizes */}
        {sizes.length > 0 && (
          <div className="mb-8">
            <h4 className="font-semibold text-gray-900 mb-4">Veličine</h4>
            <div className="grid grid-cols-2 gap-2">
              {sizes.map((size) => (
                <Button
                  key={size}
                  variant={
                    searchParams.filter?.includes(size) ? "default" : "outline"
                  }
                  size="sm"
                  onClick={() => {
                    const current = searchParams.filter?.split(",") || [];
                    const updated = current.includes(size)
                      ? current.filter((s) => s !== size)
                      : [...current, size];
                    updateFilters("filter", updated.join(","));
                  }}
                  className="text-xs"
                >
                  {size}
                </Button>
              ))}
            </div>
          </div>
        )}
      </motion.div>
    </>
  );
}
