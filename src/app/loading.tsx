import ProductSkeleton from "@/components/ProductSkeleton";

export default function Loading() {
  return (
    <div className="py-8 max-w-7xl mx-auto space-y-8 animate-pulse">
      <div className="w-full h-48 sm:h-64 rounded-3xl bg-gray-200/70"></div>

      <ProductSkeleton />
    </div>
  );
}
