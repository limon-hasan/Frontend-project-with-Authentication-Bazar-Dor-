export interface MarketDetail {
    market: string;
    division: string;
    min: number;
    max: number;
}

export interface ProductChange {
    dir: "up" | "down" | "equal";
    pct: number;
}

export interface Product {
    id: number | string;
    slug: string;
    nameBn: string;
    name?: string;
    category: string;
    categoryNameBn?: string;
    categoryIcon?: string;
    unit: string;
    image?: string;
    today: number;
    price?: number;
    yesterday?: number;
    yesterdayPrice?: number;
    lastWeek?: number;
    lastMonth?: number;
    change: ProductChange;
    changePercent?: number;
    markets?: MarketDetail[];
    emoji?: string;
}

export interface Category {
    id: string | number;
    slug: string;
    nameBn: string;
    name?: string;
    icon: string;
    emoji?: string;
}