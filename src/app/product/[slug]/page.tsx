import Link from "next/link";
import { notFound } from "next/navigation";
import { getProductBySlug } from "@/lib/api";
import { toBengaliNumber } from "@/lib/utils";
import { Product } from "@/types";

interface PageProps {
  params: Promise<{ slug: string }>;
}

// একক নির্ধারণ ফাংশন (কেজি, লিটার, ডজন ইত্যাদি)
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

export default async function ProductDetailsPage({ params }: PageProps) {
  const { slug } = await params;
  const product: Product | null = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const {
    nameBn,
    categoryNameBn,
    categoryIcon,
    image,
    today,
    unit,
    change,
    markets = [],
  } = product;

  const icon = categoryIcon || image || "🧺";
  const unitLabel = getUnitLabel(unit);
  const changePct = Math.abs(Number(change?.pct ?? 0));
  const isUp = change?.dir === "up";
  const isDown = change?.dir === "down";

  // Price - Summary ক্যালকুলেশন
  let minPrice = today ?? 0;
  let maxPrice = today ?? 0;
  let avgPrice = today ?? 0;

  if (markets.length > 0) {
    minPrice = Math.min(...markets.map((m) => m.min));
    maxPrice = Math.max(...markets.map((m) => m.max));
    const totalMid = markets.reduce((sum, m) => sum + (m.min + m.max) / 2, 0);
    avgPrice = Math.round(totalMid / markets.length);
  }

  return (
    <div className="py-6 sm:py-10 max-w-5xl mx-auto space-y-8">
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-sm font-bold text-emerald-800 hover:text-emerald-900 bg-white px-4 py-2 rounded-xl border border-gray-200/80 shadow-2xs hover:shadow-xs transition-all"
      >
        <span>←</span> মূল পাতায় ফিরে যান
      </Link>

      <section className="bg-white border border-gray-200/90 rounded-3xl p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-center gap-4.5">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-[#f4f7f4] flex items-center justify-center text-3xl sm:text-4xl shrink-0 shadow-2xs">
              {icon}
            </div>

            <div className="space-y-1.5">
              <div className="flex flex-wrap items-center gap-2.5">
                <h1 className="text-2xl sm:text-3xl font-black text-gray-900 leading-tight">
                  {nameBn}
                </h1>
                {categoryNameBn && (
                  <span className="text-xs font-bold text-emerald-800 bg-[#e2f5e8] px-3 py-1 rounded-full">
                    {categoryNameBn}
                  </span>
                )}
                <span className="text-xs font-semibold text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
                  {unitLabel}
                </span>
              </div>

              <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
                সারাদেশের প্রধান বাজারগুলোর আজকের সর্বশেষ হালনাগাদ দর ও
                তুলনামূলক চিত্র
              </p>
            </div>
          </div>

          <div>
            {isUp && (
              <span className="inline-flex items-center gap-1 text-xs sm:text-sm font-bold text-red-600 bg-red-50 border border-red-100 px-3.5 py-1.5 rounded-xl">
                ▲ {toBengaliNumber(changePct)}% বেড়েছে
              </span>
            )}
            {isDown && (
              <span className="inline-flex items-center gap-1 text-xs sm:text-sm font-bold text-emerald-700 bg-emerald-50 border border-emerald-100 px-3.5 py-1.5 rounded-xl">
                ▼ {toBengaliNumber(changePct)}% কমেছে
              </span>
            )}
            {!isUp && !isDown && (
              <span className="inline-flex items-center text-xs sm:text-sm font-medium text-gray-400 bg-gray-50 border border-gray-100 px-3.5 py-1.5 rounded-xl">
                — অপরিবর্তিত
              </span>
            )}
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 sm:grid-cols-3 gap-4.5">
        <div className="bg-white border border-gray-200/90 rounded-2xl p-5 shadow-xs flex flex-col justify-between">
          <span className="text-xs font-medium text-gray-400 block mb-1">
            সর্বনিম্ন দর
          </span>
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl sm:text-3xl font-black text-emerald-700">
              {toBengaliNumber(minPrice)}
            </span>
            <span className="text-xs text-gray-500 font-medium">
              টাকা/{unitLabel.replace("প্রতি ", "")}
            </span>
          </div>
        </div>

        <div className="bg-white border border-gray-200/90 rounded-2xl p-5 shadow-xs flex flex-col justify-between">
          <span className="text-xs font-medium text-gray-400 block mb-1">
            সর্বোচ্চ দর
          </span>
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl sm:text-3xl font-black text-red-600">
              {toBengaliNumber(maxPrice)}
            </span>
            <span className="text-xs text-gray-500 font-medium">
              টাকা/{unitLabel.replace("প্রতি ", "")}
            </span>
          </div>
        </div>

        <div className="bg-white border border-gray-200/90 rounded-2xl p-5 shadow-xs flex flex-col justify-between">
          <span className="text-xs font-medium text-gray-400 block mb-1">
            আজকের গড় দর
          </span>
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl sm:text-3xl font-black text-gray-900">
              {toBengaliNumber(avgPrice)}
            </span>
            <span className="text-xs text-gray-500 font-medium">
              টাকা/{unitLabel.replace("প্রতি ", "")}
            </span>
          </div>
        </div>
      </section>

      <section className="bg-white border border-gray-200/90 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-gray-900">
            বাজারভিত্তিক আজকের দাম
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
            দেশের বিভিন্ন পাইকারি ও খুচরা বাজারের মূল্যের তারতম্য
          </p>
        </div>

        {markets.length === 0 ? (
          <p className="text-sm text-gray-400 py-4">
            বাজারের তথ্য পাওয়া যায়নি।
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {markets.map((m, idx) => (
              <div
                key={idx}
                className="bg-[#fbfcfa] border border-gray-200/80 rounded-2xl p-4.5 flex flex-col justify-between hover:border-emerald-600/40 hover:bg-white transition-all shadow-2xs"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <h3 className="font-bold text-gray-900 text-base">
                      {m.market}
                    </h3>
                    <span className="text-[11px] font-semibold text-emerald-800 bg-[#e2f5e8] px-2 py-0.5 rounded-md">
                      {m.division}
                    </span>
                  </div>
                </div>

                <div className="mt-3 pt-3 border-t border-gray-200/60 flex items-center justify-between text-xs">
                  <div>
                    <span className="text-gray-400 block mb-0.5">
                      সর্বনিম্ন
                    </span>
                    <span className="font-extrabold text-emerald-700 text-sm">
                      {toBengaliNumber(m.min)} ৳
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-gray-400 block mb-0.5">সর্বোচ্চ</span>
                    <span className="font-extrabold text-gray-900 text-sm">
                      {toBengaliNumber(m.max)} ৳
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
