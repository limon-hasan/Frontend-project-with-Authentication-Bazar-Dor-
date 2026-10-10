const BASE_URL_1 = "https://api.api-store.workers.dev/api/bazardor";
const BASE_URL_2 = "https://api.abcz.workers.dev/api/bazardor";

async function fetchWithFallback(endpoint: string) {
    try {
        const res = await fetch(`${BASE_URL_1}${endpoint}`, {
            cache: "no-store",
        });
        if (res.ok) {
            const data = await res.json();
            return data?.data || data;
        }
    } catch {
        console.warn(`Primary API failed for ${endpoint}. Trying backup API...`);
    }

    try {
        const res = await fetch(`${BASE_URL_2}${endpoint}`, {
            cache: "no-store",
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