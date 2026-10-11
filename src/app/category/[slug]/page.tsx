import Link from "next/link";
import { getAllCategories, getAllProducts } from "@/lib/api";
import { Product } from "@/types";

interface PageProps {
  params: Promise<{ slug: string }>;
}

interface CategoryItem {
  id?: string | number;
  slug?: string;
  nameBn?: string;
  icon?: string;
}

export default async function CategoryPage({ params }: PageProps) {
  const { slug } = await params;

  // ১. ডেটা ফেচ করা
  const categories: CategoryItem[] = await getAllCategories();
  const allProducts: Product[] = await getAllProducts();

  const currentCategory = categories.find((c) => {
    const cId = String(c.id ?? "").toLowerCase();
    const cSlug = String(c.slug ?? "").toLowerCase();
    const target = String(slug).toLowerCase();
    return (
      cId === target ||
      cSlug === target ||
      cId.includes(target) ||
      target.includes(cId)
    );
  });

  const categoryProducts = allProducts.filter((p) => {
    const pCat = String(p.category ?? "").toLowerCase();
    const target = String(slug).toLowerCase();

    return (
      pCat === target ||
      pCat.includes(target) ||
      target.includes(pCat) ||
      (currentCategory?.nameBn && p.categoryNameBn === currentCategory.nameBn)
    );
  });

  if (!currentCategory || categoryProducts.length === 0) {
    return (
      <div className="py-20 text-center max-w-md mx-auto space-y-5">
        <div className="w-20 h-20 bg-gray-100 text-4xl rounded-3xl mx-auto flex items-center justify-center shadow-xs">
          🧺
        </div>
        <div className="space-y-1.5">
          <h1 className="text-2xl font-black text-gray-900">
            কোনো পণ্য পাওয়া যায়নি
          </h1>
          <p className="text-sm text-gray-600 leading-relaxed">
            আপনি যে ক্যাটাগরিটি খুঁজছেন তার কোনো তথ্য বা পণ্য এই মুহূর্তে পাওয়া
            যায়নি।
          </p>
        </div>
        <div>
          <Link
            href="/"
            className="inline-flex items-center justify-center px-6 py-2.5 bg-[#058a44] hover:bg-[#04753a] text-white text-sm font-bold rounded-xl shadow-lg shadow-[#058a44]/30 transition-all active:scale-95"
          >
            হোম পেজে ফিরে যান
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="py-6 sm:py-8 space-y-6">
      <nav className="flex items-center gap-2 text-xs sm:text-sm text-gray-600">
        <Link href="/" className="hover:text-emerald-700 transition-colors">
          হোম
        </Link>
        <span>&gt;</span>
        <span className="text-gray-900 font-medium">
          {currentCategory.nameBn}
        </span>
      </nav>

      <div className="flex items-center gap-4 pb-4 border-b border-gray-200/80">
        <div className="w-14 h-14 rounded-2xl bg-[#f4f7f4] border border-gray-200/60 flex items-center justify-center text-3xl shrink-0 shadow-xs">
          {currentCategory.icon || "🧺"}
        </div>
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-gray-900 leading-tight">
            {currentCategory.nameBn}
          </h1>
          <p className="text-xs sm:text-sm text-gray-600 mt-0.5">
            {currentCategory.nameBn} ক্যাটাগরির আজকের সর্বশেষ বাজার দর তালিকা
          </p>
        </div>
      </div>

      <div className="p-4 bg-gray-50 rounded-2xl border border-dashed border-gray-200 text-center text-sm text-gray-600 font-medium">
        মোট {categoryProducts.length}টি পণ্য পাওয়া গেছে
      </div>
    </div>
  );
}
