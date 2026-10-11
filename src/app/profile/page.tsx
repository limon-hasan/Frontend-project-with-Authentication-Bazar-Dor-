"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";

export default function ProfilePage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    if (!isPending && !user) {
      router.push("/signin");
    }
  }, [isPending, user, router]);

  // Sign out handler
  const handleSignOut = async () => {
    await authClient.signOut();
    toast.success("লগআউট সফল হয়েছে!");
    router.push("/signin");
    router.refresh();
  };

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const newName = (formData.get("name") as string)?.trim();

    if (!newName) {
      toast.error("নাম খালি রাখা যাবে না!");
      return;
    }

    setUpdating(true);

    try {
      const res = await authClient.updateUser({
        name: newName,
      });

      if (res?.error) {
        toast.error(res.error.message || "নাম আপডেট করতে সমস্যা হয়েছে!");
      } else {
        toast.success("প্রোফাইল সফলভাবে আপডেট হয়েছে!");
        router.refresh();
      }
    } catch (err) {
      toast.error("আপডেট করার সময় ত্রুটি ঘটেছে!");
      console.error(err);
    } finally {
      setUpdating(false);
    }
  };

  if (isPending) {
    return (
      <main className="min-h-[75vh] flex items-center justify-center">
        <div className="text-sm font-semibold text-gray-500">
          প্রোফাইল তথ্য লোড হচ্ছে...
        </div>
      </main>
    );
  }

  if (!user) return null;

  return (
    <main className="min-h-[80vh] py-10 px-4 max-w-2xl mx-auto space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
          আমার প্রোফাইল
        </h1>
        <p className="text-xs sm:text-sm text-gray-500 font-medium">
          আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।
        </p>
      </div>

      <div className="bg-white border border-gray-200/90 rounded-2xl shadow-xs p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-gray-100 border border-gray-200 overflow-hidden flex items-center justify-center shrink-0">
            {user.image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={user.image}
                alt={user.name || "User"}
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-2xl font-black text-emerald-700 bg-emerald-50 w-full h-full flex items-center justify-center">
                {user.name ? user.name.charAt(0).toUpperCase() : "U"}
              </span>
            )}
          </div>

          <div>
            <h2 className="text-base sm:text-lg font-bold text-gray-900 leading-snug">
              {user.name}
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 font-medium">
              {user.email}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleSignOut}
          className="inline-flex items-center gap-1.5 px-4 py-2 border border-red-200 hover:border-red-300 text-red-600 hover:bg-red-50 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer active:scale-95"
        >
          <span>↩</span>
          <span>সাইন আউট</span>
        </button>
      </div>

      <div className="bg-white border border-gray-200/90 rounded-2xl shadow-xs p-5 sm:p-6 space-y-4">
        <h3 className="text-base font-black text-gray-900">তথ্য</h3>

        <form onSubmit={handleUpdate} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs sm:text-sm font-bold text-gray-800 block">
              নাম
            </label>
            <input
              type="text"
              name="name"
              defaultValue={user.name}
              placeholder="আপনার নাম লিখুন"
              className="w-full bg-[#fcfdfc] border border-gray-200 text-gray-900 text-xs sm:text-sm rounded-xl px-3.5 py-2.5 focus:outline-none focus:ring-1 focus:ring-emerald-600 focus:border-emerald-600"
              required
            />
          </div>

          <button
            type="submit"
            disabled={updating}
            className="w-full py-3 bg-[#058a44] hover:bg-[#04753a] text-white text-xs sm:text-sm font-bold rounded-xl shadow-md shadow-[#058a44]/25 hover:shadow-lg transition-all active:scale-[0.98] cursor-pointer disabled:bg-gray-300 disabled:text-gray-500"
          >
            {updating ? "আপডেট হচ্ছে..." : "আপডেট"}
          </button>
        </form>
      </div>
    </main>
  );
}
