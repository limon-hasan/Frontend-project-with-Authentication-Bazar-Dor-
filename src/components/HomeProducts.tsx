import ProductCard from "@/components/ProductCard";
import { getAllProducts } from "@/lib/api";
import { Product } from "@/types";

export default async function HomeProducts() {
  let products: Product[] = [];

  try {
    const data = await getAllProducts();
    if (Array.isArray(data)) {
      products = data;
    }
  } catch (error) {
    console.error("পণ্য তালিকা লোড করতে ব্যর্থ:", error);
  }

  const topRisers = products
    .filter((p) => p.change?.dir === "up")
    .sort((a, b) => Math.abs(b.change?.pct ?? 0) - Math.abs(a.change?.pct ?? 0))
    .slice(0, 6);

  const topFallers = products
    .filter((p) => p.change?.dir === "down")
    .sort((a, b) => Math.abs(b.change?.pct ?? 0) - Math.abs(a.change?.pct ?? 0))
    .slice(0, 6);

  return (
    <div className="space-y-12">
      {topRisers.length > 0 && (
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="text-red-600 text-lg">▲</span>
            <h2 className="text-xl sm:text-2xl font-black text-gray-900">
              আজ দাম বেড়েছে
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {topRisers.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}

      {topFallers.length > 0 && (
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="text-emerald-700 text-lg">▼</span>
            <h2 className="text-xl sm:text-2xl font-black text-gray-900">
              আজ দাম কমেছে
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {topFallers.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}

      <section id="sob-ponno" className="space-y-4 pt-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-gray-900">
            সব পণ্য
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 font-medium">
            আজকের বাজার দরের সকল নিত্যপ্রয়োজনীয় পণ্যের পূর্ণাঙ্গ তালিকা
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}
