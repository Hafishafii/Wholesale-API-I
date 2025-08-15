export const formatRupee = (amount: number): string => {
    return new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(amount);
};

export const formatRupeeWithWords = (amount: number): string => {
    if (amount >= 1_00_00_000) {
        return `₹${(amount / 1_00_00_000).toFixed(2).replace(/\.00$/, '')} Cr`;
    } else if (amount >= 1_00_000) {
        return `₹${(amount / 1_00_000).toFixed(2).replace(/\.00$/, '')} Lakhs`;
    } else if (amount >= 1_000) {
        return `₹${(amount / 1_000).toFixed(2).replace(/\.00$/, '')}K`;
    } else {
        return `₹${amount}`;
    }
};



export const formatDateToDDMMYYYY = (dateInput: Date | string) => {
    const date = new Date(dateInput);
    const d = String(date.getDate()).padStart(2, '0');
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const y = date.getFullYear();
    return `${d}-${m}-${y}`;
}