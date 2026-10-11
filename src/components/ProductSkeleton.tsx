export default function ProductSkeleton() {
  return (
    <div className="w-full space-y-4">
      <div className="flex items-center justify-between pb-2">
        <div className="skeleton w-36 h-6 rounded-lg bg-gray-200"></div>
        <div className="skeleton w-24 h-4 rounded-md bg-gray-200"></div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <div
            key={item}
            className="bg-white border border-gray-100 rounded-2xl p-4 shadow-2xs space-y-4"
          >
            <div className="flex items-center gap-3">
              <div className="skeleton w-12 h-12 rounded-xl bg-gray-200 shrink-0"></div>
              <div className="space-y-1.5 flex-1">
                <div className="skeleton w-24 h-4 rounded-md bg-gray-200"></div>
                <div className="skeleton w-16 h-3 rounded-md bg-gray-200"></div>
              </div>
            </div>

            <div className="pt-2 border-t border-gray-50 flex items-end justify-between">
              <div className="space-y-1">
                <div className="skeleton w-14 h-3 rounded-md bg-gray-200"></div>
                <div className="skeleton w-20 h-6 rounded-md bg-gray-200"></div>
              </div>
              <div className="skeleton w-16 h-5 rounded-md bg-gray-200"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
