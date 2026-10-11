"use client";

import { useState, useRef, useEffect } from "react";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const UserInfo = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const handleSignout = async () => {
    await authClient.signOut();
    setIsOpen(false);
    toast.success("সফলভাবে সাইন আউট হয়েছে!");
    router.refresh();
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (isPending) {
    return (
      <div className="flex items-center gap-2.5">
        <div className="skeleton w-8 h-8 rounded-full shrink-0 bg-gray-200"></div>
        <div className="skeleton w-16 h-4 hidden sm:block bg-gray-200 rounded-md"></div>
      </div>
    );
  }

  return (
    <div className="flex items-center">
      {user ? (
        <div className="relative" ref={dropdownRef}>
          <button
            type="button"
            onClick={() => setIsOpen((prev) => !prev)}
            className="flex items-center gap-2 py-1 px-1.5 rounded-full hover:bg-gray-100/70 transition-colors cursor-pointer select-none"
          >
            <div className="w-8 h-8 rounded-full bg-[#058a44] text-white flex items-center justify-center font-bold text-xs shadow-xs border border-emerald-100 overflow-hidden shrink-0">
              {user.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={user.image}
                  alt={user.name || "User"}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span>
                  {user.name ? user.name.charAt(0).toUpperCase() : "U"}
                </span>
              )}
            </div>

            <span className="text-xs sm:text-sm font-bold text-gray-800 hidden sm:inline-block">
              {user.name?.split(" ")[0]}
            </span>

            <svg
              className={`w-3.5 h-3.5 text-gray-500 transition-transform duration-200 ${
                isOpen ? "rotate-180" : ""
              }`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>

          {isOpen && (
            <div className="absolute right-0 top-full mt-2 w-60 sm:w-64 bg-white rounded-2xl shadow-xl border border-gray-100 p-4 z-50">
              <div className="pb-3 border-b border-gray-100">
                <h4 className="text-sm font-bold text-gray-900 leading-tight">
                  {user.name}
                </h4>
                <p className="text-xs text-gray-500 font-medium truncate mt-0.5">
                  {user.email}
                </p>
              </div>

              <div className="pt-2.5 space-y-1">
                <Link
                  href="/profile"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-2.5 px-2 py-2 text-xs font-semibold text-gray-700 hover:text-emerald-700 hover:bg-emerald-50/70 rounded-xl transition-colors"
                >
                  <span className="text-sm">👤</span>
                  <span>আমার প্রোফাইল</span>
                </Link>

                <button
                  type="button"
                  onClick={handleSignout}
                  className="w-full flex items-center gap-2.5 px-2 py-2 text-xs font-bold text-red-600 hover:text-red-700 hover:bg-red-50/80 rounded-xl transition-colors cursor-pointer text-left"
                >
                  <span className="text-sm">↩</span>
                  <span>সাইন আউট</span>
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="flex items-center gap-4 sm:gap-5">
          <Link
            href="/signin"
            className="text-sm sm:text-base font-bold text-gray-800 hover:text-emerald-700 transition-colors"
          >
            সাইন ইন
          </Link>

          <Link
            href="/signup"
            className="inline-flex items-center justify-center text-sm sm:text-base font-bold text-white bg-[#058a44] hover:bg-[#04753a] px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl shadow-lg shadow-[#058a44]/35 hover:shadow-xl hover:shadow-[#058a44]/45 transition-all active:scale-95"
          >
            সাইন আপ
          </Link>
        </div>
      )}
    </div>
  );
};

export default UserInfo;
