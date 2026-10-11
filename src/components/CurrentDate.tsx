"use client";

import { useSyncExternalStore } from "react";
import { getCurrentBengaliDate } from "@/lib/utils";

const emptySubscribe = () => () => {};

export default function CurrentDate() {
  const dateStr = useSyncExternalStore(
    emptySubscribe,
    () => getCurrentBengaliDate(), // Client-side value
    () => "", // Server-side prerender value
  );

  if (!dateStr) {
    return (
      <span className="text-xs sm:text-sm text-gray-700 font-medium block mt-0.5 tracking-wide opacity-0">
        তারিখ লোড হচ্ছে...
      </span>
    );
  }

  return (
    <span className="text-xs sm:text-sm text-gray-700 font-medium block mt-0.5 tracking-wide">
      {dateStr}
    </span>
  );
}
