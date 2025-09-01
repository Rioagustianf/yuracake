/**
 * Format currency to Indonesian Rupiah format without decimals
 * @param {number} amount - The amount to format
 * @returns {string} - Formatted currency string
 */
export const formatCurrency = (amount) => {
    return Number(amount)
        .toLocaleString("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        })
        .replace("IDR", "Rp");
};

/**
 * Format number to Indonesian format without currency symbol
 * @param {number} amount - The amount to format
 * @returns {string} - Formatted number string
 */
export const formatNumber = (amount) => {
    return Number(amount).toLocaleString("id-ID", {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    });
};
