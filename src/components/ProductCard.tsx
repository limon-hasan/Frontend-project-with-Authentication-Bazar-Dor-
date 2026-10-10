import Link from "next/link";
import { Product } from "@/types";
import { toBengaliNumber } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
}

const getUnitLabel = (rawUnit?: string): string => {
  if (!rawUnit) return "প্রতি কেজি";
  const lower = rawUnit.toLowerCase().trim();
  if (lower === "kg") return "প্রতি কেজি";
  if (lower === "dozen") return "প্রতি ডজন";
  if (lower === "piece") return "প্রতি পিস";
  if (lower === "liter" || lower === "litre") return "প্রতি লিটার";
  if (lower === "gm" || lower === "gram") return "প্রতি গ্রাম";
  return `প্রতি ${rawUnit}`;
};

export default function ProductCard({ product }: ProductCardProps) {
  const { id, nameBn, today, unit, change, categoryIcon, image } = product;

  const price = today ?? 0;
  const unitLabel = getUnitLabel(unit);
  const icon = categoryIcon || image || "🧺";
  const changePct = Math.abs(Number(change?.pct ?? 0));
  const isUp = change?.dir === "up";
  const isDown = change?.dir === "down";

  const formattedPrice = toBengaliNumber(price.toLocaleString("en-US"));

  return (
    <Link
      href={`/product/${product.slug}`}
      className="group bg-white border border-gray-100/90 rounded-2xl p-5 shadow-[0_1px_3px_rgba(0,0,0,0.03)] hover:shadow-md hover:border-emerald-600/30 transition-all flex flex-col justify-between min-h-[148px]"
    >
      <div className="flex items-center gap-3.5">
        <div className="w-12 h-12 rounded-2xl bg-[#f4f7f4] flex items-center justify-center text-2xl shrink-0 group-hover:scale-105 transition-transform">
          {icon}
        </div>
        <div className="min-w-0">
          <h3 className="font-bold text-gray-900 text-base leading-tight group-hover:text-emerald-700 transition-colors truncate">
            {nameBn}
          </h3>
          <p className="text-xs text-gray-400 font-normal mt-1">{unitLabel}</p>
        </div>
      </div>

      <div className="mt-4 flex items-end justify-between">
        <div>
          <span className="text-xs text-gray-400 block font-normal mb-0.5">
            আজকের দাম
          </span>
          <span className="text-lg font-black text-gray-900">
            {formattedPrice} টাকা
          </span>
        </div>

        <div>
          {isUp && (
            <span className="inline-flex items-center gap-0.5 text-xs font-bold text-red-600 bg-red-50/90 border border-red-100/60 px-2 py-0.5 rounded-md">
              ▲ {toBengaliNumber(changePct)}%
            </span>
          )}
          {isDown && (
            <span className="inline-flex items-center gap-0.5 text-xs font-bold text-emerald-700 bg-emerald-50/90 border border-emerald-100/60 px-2 py-0.5 rounded-md">
              ▼ {toBengaliNumber(changePct)}%
            </span>
          )}
          {!isUp && !isDown && (
            <span className="inline-flex items-center text-xs font-medium text-gray-400 bg-gray-50 border border-gray-100 px-2 py-0.5 rounded-md">
              — ০.০%
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
