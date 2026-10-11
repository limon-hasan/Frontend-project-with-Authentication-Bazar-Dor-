"use client";

import { useState, useMemo } from "react";
import ProductCard from "@/components/ProductCard";
import { toBengaliNumber } from "@/lib/utils";
import { Product } from "@/types";

interface CategoryProductListProps {
  products: Product[];
}

type SortType = "default" | "price_asc" | "price_desc";

export default function CategoryProductList({
  products,
}: CategoryProductListProps) {
  const [sortBy, setSortBy] = useState<SortType>("default");

  const sortedProducts = useMemo(() => {
    if (sortBy === "price_asc") {
      return [...products].sort((a, b) => a.today - b.today);
    }
    if (sortBy === "price_desc") {
      return [...products].sort((a, b) => b.today - a.today);
    }
    return products;
  }, [products, sortBy]);

  return (
    <div className="space-y-4">
      <div className="bg-white border border-gray-200/90 rounded-2xl p-4 sm:px-6 flex items-center justify-end shadow-xs">
        <div className="flex items-center gap-3">
          <label
            htmlFor="sort-select"
            className="text-xs sm:text-sm text-gray-700 font-medium"
          >
            সাজান
          </label>
          <div className="relative">
            <select
              id="sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortType)}
              className="bg-[#f4f7f4] border border-gray-200/90 text-gray-900 text-xs sm:text-sm font-semibold rounded-xl px-3.5 py-2 pr-8 appearance-none focus:outline-none focus:ring-1 focus:ring-emerald-600 cursor-pointer"
            >
              <option value="default">ডিফল্ট</option>
              <option value="price_asc">দাম: কম থেকে বেশি</option>
              <option value="price_desc">দাম: বেশি থেকে কম</option>
            </select>
            <span className="pointer-events-none absolute inset-y-0 right-2.5 flex items-center text-gray-500 text-[10px]">
              ▼
            </span>
          </div>
        </div>
      </div>

      <p className="text-xs sm:text-sm text-gray-600 font-medium px-1">
        মোট {toBengaliNumber(sortedProducts.length)}টি পণ্য দেখানো হচ্ছে
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
        {sortedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
