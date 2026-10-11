export default function Footer() {
  return (
    <footer className="w-full border-t border-gray-200/80 bg-white/50 backdrop-blur-xs mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
        <p className="text-xs sm:text-sm text-black-500 font-medium">
          বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে।
        </p>

        <p className="text-xs sm:text-sm text-black-400">
          সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।
        </p>
      </div>
    </footer>
  );
}
