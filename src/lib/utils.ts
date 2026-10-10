export const toBengaliNumber = (
    num: number | string | undefined | null
): string => {
    if (num === undefined || num === null || num === "") {
        return "০";
    }

    const bengaliDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
    return num
        .toString()
        .replace(/\d/g, (d) => bengaliDigits[parseInt(d, 10)]);
};

export const parseBengaliNumber = (
    str: string | number | undefined | null
): number => {
    if (!str) return 0;
    if (typeof str === "number") return str;

    const bengaliDigits: Record<string, string> = {
        "০": "0", "১": "1", "২": "2", "৩": "3", "৪": "4",
        "৫": "5", "৬": "6", "৭": "7", "৮": "8", "৯": "9",
    };

    const normalized = str
        .toString()
        .replace(/[০-৯]/g, (char) => bengaliDigits[char] || char);
    const clean = normalized.replace(/[^0-9.-]/g, "");
    return parseFloat(clean) || 0;
};