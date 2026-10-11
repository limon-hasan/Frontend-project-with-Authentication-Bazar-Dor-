export default function CategoryLoading() {
  return (
    <div className="py-6 sm:py-8 space-y-6">
      <div className="flex items-center justify-center gap-2.5 py-2 px-4 bg-emerald-50/80 border border-emerald-100 rounded-xl text-emerald-800 text-xs sm:text-sm font-semibold w-fit mx-auto shadow-2xs">
        <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 animate-ping" />
        <span>বাজারের সর্বশেষ দর লোড হচ্ছে...</span>
      </div>

      <div className="space-y-6 animate-pulse">
        <div className="bg-white border border-gray-200/90 rounded-2xl sm:rounded-3xl p-6 sm:p-7 shadow-xs">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gray-200 shrink-0" />
            <div className="space-y-2.5 flex-1">
              <div className="h-7 bg-gray-200 rounded-lg w-32" />
              <div className="h-4 bg-gray-100 rounded-md w-48" />
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200/90 rounded-2xl p-4 sm:px-6 flex items-center justify-end shadow-xs">
          <div className="flex items-center gap-3">
            <div className="h-4 bg-gray-200 rounded w-10" />
            <div className="h-9 bg-gray-200 rounded-xl w-32" />
          </div>
        </div>

        <div className="h-4 bg-gray-200 rounded w-36 px-1" />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="bg-white border border-gray-200/90 rounded-2xl p-5 shadow-xs space-y-5"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-2xl bg-gray-200 shrink-0" />
                <div className="space-y-2 flex-1">
                  <div className="h-4 bg-gray-200 rounded w-24" />
                  <div className="h-3 bg-gray-100 rounded w-16" />
                </div>
              </div>

              <div className="pt-2 border-t border-gray-100 flex items-center justify-between">
                <div className="space-y-1.5">
                  <div className="h-3 bg-gray-100 rounded w-14" />
                  <div className="h-5 bg-gray-200 rounded w-20" />
                </div>
                <div className="h-6 bg-gray-100 rounded-lg w-14" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
