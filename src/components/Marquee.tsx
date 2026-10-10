"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import MarqueeText from "react-marquee-text";
import "react-marquee-text/dist/styles.css";
import { getAllProducts } from "@/lib/api";
import { toBengaliNumber } from "@/lib/utils";
import { Product } from "@/types";

export default function Marquee() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    let isMounted = true;
    async function loadProducts() {
      try {
        const data = await getAllProducts();
        if (isMounted && Array.isArray(data) && data.length > 0) {
          setProducts(data);
        }
      } catch (error) {
        console.error("মারকুই ডেটা লোড করতে ব্যর্থ:", error);
      }
    }
    loadProducts();
    return () => {
      isMounted = false;
    };
  }, []);

  if (products.length === 0) {
    return (
      <div className="w-full bg-white border-y border-gray-200 py-2.5 text-center text-xs text-gray-400">
        বাজারের সর্বশেষ দর লোড হচ্ছে...
      </div>
    );
  }

  return (
    <div className="w-full bg-white border-y border-gray-200 overflow-hidden shadow-xs">
      <div className="flex items-center">
        <MarqueeText duration={40} className="py-0 flex items-center">
          {products.map((item) => {
            const id = item.id;
            const name = item.nameBn || "পণ্য";
            const price = item.today ?? 0;
            const unit = item.unit === "kg" ? "কেজি" : item.unit || "কেজি";
            const icon = item.categoryIcon || item.image || "🍚";
            const changeDir = item.change?.dir;
            const changePct = Math.abs(Number(item.change?.pct ?? 0));

            return (
              <Link
                key={id}
                href={`/product/${id}`}
                className="inline-flex items-center gap-2.5 px-6 py-2.5 border-r border-gray-200 hover:bg-gray-50 transition-colors whitespace-nowrap"
              >
                {/* ক্যাটাগরি আইকন */}
                <span className="text-base select-none">{icon}</span>

                {/* পণ্যের বাংলা নাম */}
                <span className="font-bold text-gray-900 text-sm">{name}</span>

                {/* আজকের দাম বাংলায় */}
                <span className="text-gray-700 text-sm font-medium">
                  {toBengaliNumber(price)} টাকা/{unit}
                </span>

                {/* শতকরা পরিবর্তনের ব্যাজ */}
                {changeDir === "up" && (
                  <span className="text-red-600 font-bold text-xs inline-flex items-center gap-0.5">
                    ▲ {toBengaliNumber(changePct)}%
                  </span>
                )}
                {changeDir === "down" && (
                  <span className="text-emerald-600 font-bold text-xs inline-flex items-center gap-0.5">
                    ▼ {toBengaliNumber(changePct)}%
                  </span>
                )}
                {changeDir !== "up" && changeDir !== "down" && (
                  <span className="text-gray-400 font-medium text-xs">
                    — ০.০%
                  </span>
                )}
              </Link>
            );
          })}
        </MarqueeText>
      </div>
    </div>
  );
}
