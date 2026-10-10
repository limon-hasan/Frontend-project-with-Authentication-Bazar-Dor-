export interface MarketPrice {
    market: string;
    division: string;
    minPrice: number;
    maxPrice: number;
    avgPrice: number;
}

export interface Product {
    id: string | number;
    name: string;
    category: string;
    unit: string;
    price: number;
    yesterdayPrice?: number;
    changePercent: number;
    emoji?: string;
    image?: string;
    marketPrices?: MarketPrice[];
}

export interface Category {
    id: string | number;
    name: string;
    slug: string;
    emoji?: string;
}