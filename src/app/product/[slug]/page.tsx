import Link from "next/link";
import { notFound } from "next/navigation";
import { getProductBySlug } from "@/lib/api";
import { toBengaliNumber } from "@/lib/utils";
import { Product } from "@/types";

interface PageProps {
  params: Promise<{ slug: string }>;
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
    today = 0,
    yesterday,
    unit,
    change,
    markets = [],
  } = product;

  const icon = categoryIcon || image || "🧺";
  const unitLabel = getUnitLabel(unit);
  const pureUnit = unitLabel.replace("প্রতি ", "");
  const changePct = Math.abs(Number(change?.pct ?? 0));
  const isUp = change?.dir === "up";
  const isDown = change?.dir === "down";

  const yesterdayPrice = yesterday ?? today;
  const priceDiff = Math.abs(today - yesterdayPrice);

  let minPrice = today;
  let maxPrice = today;
  let avgPrice = today;

  if (markets.length > 0) {
    minPrice = Math.min(...markets.map((m) => m.min));
    maxPrice = Math.max(...markets.map((m) => m.max));
    const totalMid = markets.reduce((sum, m) => sum + (m.min + m.max) / 2, 0);
    avgPrice = Math.round(totalMid / markets.length);
  }

  const sortedMarkets = [...markets].sort((a, b) => {
    const avgA = (a.min + a.max) / 2;
    const avgB = (b.min + b.max) / 2;
    return avgA - avgB;
  });

  return (
    <div className="py-5 max-w-5xl mx-auto space-y-5">
      <nav className="flex items-center gap-2 text-xs sm:text-sm text-gray-500">
        <Link href="/" className="hover:text-emerald-700 transition-colors">
          হোম
        </Link>
        <span>&gt;</span>
        {categoryNameBn && (
          <>
            <span className="hover:text-emerald-700 transition-colors">
              {categoryNameBn}
            </span>
            <span>&gt;</span>
          </>
        )}
        <span className="text-gray-700 font-medium">{nameBn}</span>
      </nav>

      <section className="bg-white border border-gray-200/90 rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-[#f4f7f4] flex items-center justify-center text-4xl sm:text-5xl shrink-0">
              {icon}
            </div>

            <div>
              <h1 className="text-2xl sm:text-3xl font-black text-gray-900 leading-tight">
                {nameBn}
              </h1>

              <p className="text-xs sm:text-sm text-gray-500 mt-1 font-normal">
                {unitLabel} {categoryNameBn ? `• ${categoryNameBn}` : ""}
              </p>

              <p className="text-xs sm:text-sm text-gray-500 mt-2 font-normal">
                গতকালের তুলনায় আজ দাম{" "}
                <span className="font-bold text-gray-900">
                  {isUp ? "বেড়েছে" : isDown ? "কমেছে" : "অপরিবর্তিত"}
                </span>
                {priceDiff > 0 && ` • ${toBengaliNumber(priceDiff)} টাকা`}
              </p>
            </div>
          </div>

          <div className="bg-[#f4f7f4] border border-gray-200/60 rounded-2xl px-6 py-4 flex flex-col items-center justify-center text-center min-w-[140px] self-stretch sm:self-auto">
            <span className="text-xs text-gray-500 font-normal">আজকের দাম</span>
            <span className="text-3xl sm:text-4xl font-black text-gray-900 my-0.5">
              {toBengaliNumber(today)}
            </span>
            <span className="text-xs text-gray-500 font-normal">
              টাকা / {pureUnit}
            </span>

            <div className="mt-1">
              {isUp && (
                <span className="text-xs font-bold text-red-600">
                  ▲ {toBengaliNumber(changePct)}%
                </span>
              )}
              {isDown && (
                <span className="text-xs font-bold text-emerald-700">
                  ▼ {toBengaliNumber(changePct)}%
                </span>
              )}
              {!isUp && !isDown && (
                <span className="text-xs font-medium text-gray-400">
                  — ০.০%
                </span>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white border border-gray-200/90 rounded-2xl sm:rounded-3xl p-6 sm:p-8 space-y-8 shadow-xs">
        <div>
          <h2 className="text-lg font-bold text-gray-900 mb-4">
            দামের সারসংক্ষেপ
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white border border-gray-200 rounded-xl p-4 sm:p-5 flex flex-col justify-between">
              <span className="text-xs text-black-500 block mb-1">
                সর্বনিম্ন দাম
              </span>
              <div className="text-2xl font-bold text-emerald-600">
                {toBengaliNumber(minPrice)} টাকা
              </div>
              <span className="text-xs text-black-400 mt-1.5 block">
                সবচেয়ে কম দামের বাজার
              </span>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-4 sm:p-5 flex flex-col justify-between">
              <span className="text-xs text-black-500 block mb-1">
                সর্বাধিক দাম
              </span>
              <div className="text-2xl font-bold text-red-600">
                {toBengaliNumber(maxPrice)} টাকা
              </div>
              <span className="text-xs text-black-400 mt-1.5 block">
                সবচেয়ে বেশি দামের বাজার
              </span>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-4 sm:p-5 flex flex-col justify-between">
              <span className="text-xs text-black-500 block mb-1">গড় দাম</span>
              <div className="text-2xl font-bold text-emerald-600">
                {toBengaliNumber(avgPrice)} টাকা
              </div>
              <span className="text-xs text-black-400 mt-1.5 block">
                প্রতি {pureUnit}-এর হিসাব
              </span>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-lg font-bold text-gray-900 mb-4">
            বাজারভিত্তিক আজকের দাম
          </h2>

          {sortedMarkets.length === 0 ? (
            <p className="text-sm text-gray-400 py-4">
              বাজারের তথ্য পাওয়া যায়নি।
            </p>
          ) : (
            <div className="overflow-x-auto border border-gray-200 rounded-xl">
              <table className="w-full text-left text-sm border-collapse">
                <thead>
                  <tr className="border-b border-gray-200 text-gray-500 text-xs sm:text-sm bg-white">
                    <th className="py-3 px-5 text-left font-semibold">বাজার</th>
                    <th className="py-3 px-5 text-left font-semibold">বিভাগ</th>
                    <th className="py-3 px-5 text-center font-semibold">
                      সর্বনিম্ন
                    </th>
                    <th className="py-3 px-5 text-center font-semibold">
                      সর্বাধিক
                    </th>
                    <th className="py-3 px-5 text-right font-semibold">গড়</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {sortedMarkets.map((m, idx) => {
                    const rowAvg = (m.min + m.max) / 2;
                    const formattedAvg =
                      rowAvg % 1 === 0
                        ? toBengaliNumber(rowAvg)
                        : toBengaliNumber(rowAvg.toFixed(2));

                    return (
                      <tr
                        key={idx}
                        className="hover:bg-gray-50/60 transition-colors"
                      >
                        <td className="py-3.5 px-5 font-medium text-gray-900">
                          {m.market}
                        </td>
                        <td className="py-3.5 px-5 text-gray-500">
                          {m.division}
                        </td>
                        <td className="py-3.5 px-5 text-center text-gray-700">
                          {toBengaliNumber(m.min)} টাকা
                        </td>
                        <td className="py-3.5 px-5 text-center text-gray-700">
                          {toBengaliNumber(m.max)} টাকা
                        </td>
                        <td className="py-3.5 px-5 text-right font-bold text-gray-900">
                          {formattedAvg} টাকা
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
