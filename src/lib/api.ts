// সচল এপিআইটিকে প্রথমে রাখা হয়েছে যাতে কোনো ডিলে না হয়
const PRIMARY_URL = "https://api.abcz.workers.dev/api/bazardor";
const BACKUP_URL = "https://api.api-store.workers.dev/api/bazardor";

async function fetchWithFallback(endpoint: string) {
    // ১. সচল এপিআই থেকে ডেটা আনার চেষ্টা (সর্বোচ্চ ২.৫ সেকেন্ড অপেক্ষা করবে)
    try {
        const res = await fetch(`${PRIMARY_URL}${endpoint}`, {
            signal: AbortSignal.timeout(2500),
            next: { revalidate: 60 },
        });
        if (res.ok) {
            const data = await res.json();
            return data?.data || data;
        }
    } catch {
        console.warn(`Primary API timeout or error for ${endpoint}. Trying backup...`);
    }

    // ২. প্রথমটি ফেইল করলে ব্যাকআপ এপিআই ট্রাই করবে
    try {
        const res = await fetch(`${BACKUP_URL}${endpoint}`, {
            signal: AbortSignal.timeout(2500),
            next: { revalidate: 60 },
        });
        if (res.ok) {
            const data = await res.json();
            return data?.data || data;
        }
    } catch (err) {
        console.error(`Both APIs failed for ${endpoint}:`, err);
    }

    return null;
}

export async function getAllProducts() {
    const data = await fetchWithFallback("/products");
    return Array.isArray(data) ? data : [];
}

export async function getSingleProduct(id: string | number) {
    return await fetchWithFallback(`/products/${id}`);
}

export async function getAllCategories() {
    const data = await fetchWithFallback("/categories");
    return Array.isArray(data) ? data : [];
}