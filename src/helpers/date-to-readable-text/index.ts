const dateToReadableText = (date: string, locale: 'en' | 'ka') => {
    const now = new Date();
    const diff = now.getTime() - new Date(date).getTime();

    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const weeks = Math.floor(days / 7);
    const months = Math.floor(days / 30);
    const years = Math.floor(months / 12);

    if (seconds < 60) return {en: ' Just now', ka: ' ახლა'}[locale];

    if (minutes < 60) return {en: minutes + ' min', ka: minutes + ' წთ'}[locale];

    if (hours < 24) return {en: hours + ' hour', ka: hours + ' სთ'}[locale];

    if (days < 7) return {en: days + ' day', ka: days + ' დღე'}[locale];

    if (weeks < 4) return {en: weeks + ' week', ka: weeks + ' კვირა'}[locale];

    if (months < 12) return {en: months + ' month', ka: months + ' თვე'}[locale];

    if (years < 1) return {en: years + ' year', ka: years + ' წელი'}[locale];

}

export default dateToReadableText;
//return minutes +  ' წთის წინ';