import { Product } from "@/types";

const PRIMARY_URL = "https://api.abcz.workers.dev/api/bazardor";
const BACKUP_URL = "https://api.api-store.workers.dev/api/bazardor";

// Fetch helper with dual-API fallback and 2.5s timeout
async function fetchWithFallback(endpoint: string) {
    // Try primary API first
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
        console.warn(`Primary failed for ${endpoint}, trying backup...`);
    }

    // Fallback to secondary API if primary fails
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

//all categories for Navbar
export async function getAllCategories() {
    const data = await fetchWithFallback("/categories");
    return Array.isArray(data) ? data : [];
}

// Category details by slug
export async function getCategoryBySlug(categorySlug: string) {
    return await fetchWithFallback(`/categories/${categorySlug}`);
}

// all 33 products for Home & Marquee
export async function getAllProducts() {
    const data = await fetchWithFallback("/products");
    return Array.isArray(data) ? data : [];
}

//products filtered by category
export async function getProductsByCategory(categorySlug: string) {
    const data = await fetchWithFallback(`/products?category=${categorySlug}`);
    return Array.isArray(data) ? data : [];
}
// single product with market list by ID
export async function getSingleProduct(id: string | number) {
    return await fetchWithFallback(`/products/${id}`);
}

// slug from product list and fetch complete market details
export async function getProductBySlug(slug: string) {
    if (!isNaN(Number(slug))) {
        const directProduct = await getSingleProduct(slug);
        if (directProduct) return directProduct;
    }

    const allProducts = await getAllProducts();
    const matched = allProducts.find(
        (item: Product) =>
            String(item.slug).toLowerCase() === String(slug).toLowerCase() ||
            String(item.id) === String(slug)
    );

    if (!matched) return null;

    if (matched.id) {
        const detail = await getSingleProduct(matched.id);
        return detail || matched;
    }

    return matched;
}