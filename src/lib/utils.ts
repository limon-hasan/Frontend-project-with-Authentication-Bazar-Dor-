// ইংরেজি সংখ্যাকে বাংলা সংখ্যায় রূপান্তর
export function toBengaliNumber(num: number | string): string {
    const bengaliDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
    return String(num).replace(/\d/g, (d) => bengaliDigits[Number(d)]);
}

// আজকের সম্পূর্ণ তারিখ ডাইনামিকালি বাংলা ফরম্যাটে রূপান্তর
export function getCurrentBengaliDate(): string {
    const now = new Date();

    const days = [
        "রবিবার",
        "সোমবার",
        "মঙ্গলবার",
        "বুধবার",
        "বৃহস্পতিবার",
        "শুক্রবার",
        "শনিবার",
    ];

    const months = [
        "জানুয়ারি",
        "ফেব্রুয়ারি",
        "মার্চ",
        "এপ্রিল",
        "মে",
        "জুন",
        "জুলাই",
        "আগস্ট",
        "সেপ্টেম্বর",
        "অক্টোবর",
        "নভেম্বর",
        "ডিসেম্বর",
    ];

    const dayName = days[now.getDay()];
    const dayNumber = toBengaliNumber(now.getDate());
    const monthName = months[now.getMonth()];
    const yearNumber = toBengaliNumber(now.getFullYear());

    return `${dayName}, ${dayNumber} ${monthName}, ${yearNumber}`;
}