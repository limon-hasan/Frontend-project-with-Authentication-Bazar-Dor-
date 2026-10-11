export default function CategoryLoading() {
  return (
    <div className="py-6 sm:py-8 space-y-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-center gap-2.5 py-2 px-4 bg-emerald-50/80 border border-emerald-100/90 rounded-xl text-emerald-800 text-xs sm:text-sm font-semibold w-fit mx-auto shadow-2xs">
        <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 animate-ping" />
        <span>বাজারের সর্বশেষ দর লোড হচ্ছে...</span>
      </div>

      <div className="space-y-6">
        <div className="bg-white border border-gray-200/90 rounded-2xl sm:rounded-3xl p-5 sm:p-7 shadow-xs">
          <div className="flex items-center gap-4">
            <div className="skeleton w-14 sm:w-16 h-14 sm:h-16 rounded-2xl shrink-0 bg-gray-200" />
            <div className="space-y-2.5 flex-1">
              <div className="skeleton h-6 sm:h-7 rounded-lg w-28 sm:w-36 bg-gray-200" />
              <div className="skeleton h-3.5 sm:h-4 rounded-md w-40 sm:w-56 bg-gray-200/80" />
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200/90 rounded-2xl p-4 sm:px-6 flex items-center justify-between sm:justify-end gap-3 shadow-xs">
          <div className="skeleton h-4 rounded-md w-12 bg-gray-200" />
          <div className="skeleton h-9 rounded-xl w-32 sm:w-36 bg-gray-200" />
        </div>

        <div className="skeleton h-4 rounded-md w-36 px-1 bg-gray-200" />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="bg-white border border-gray-200/90 rounded-2xl p-5 shadow-xs space-y-5"
            >
              <div className="flex items-center gap-3.5">
                <div className="skeleton w-12 h-12 rounded-2xl shrink-0 bg-gray-200" />
                <div className="space-y-2 flex-1">
                  <div className="skeleton h-4 rounded-md w-24 bg-gray-200" />
                  <div className="skeleton h-3 rounded-md w-16 bg-gray-200/80" />
                </div>
              </div>

              <div className="pt-3 border-t border-gray-100 flex items-end justify-between">
                <div className="space-y-1.5">
                  <div className="skeleton h-3 rounded-md w-14 bg-gray-200/80" />
                  <div className="skeleton h-5 sm:h-6 rounded-md w-20 bg-gray-200" />
                </div>
                <div className="skeleton h-6 rounded-lg w-16 bg-gray-200" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
