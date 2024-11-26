/**
 * Converts an amount in Vietnamese Dong (VND) to US Dollars (USD) based on the exchange rate.
 *
 * @param {number} amountVND - The amount in Vietnamese Dong to convert to USD.
 * @return {string} The converted amount in USD rounded to 2 decimal places.
 */
export function convertVNDToUSD(amountVND) {
  // Suppose 1 USD = 23,000 VND
  const exchangeRate = 23000
  const amountUSD = amountVND / exchangeRate
  // Round to 2 decimal places
  return amountUSD.toFixed(2)
}

/**
 * Formats a number by adding dots as thousand separators.
 *
 * @param {number} amount - The amount to be formatted.
 * @return {string} The formatted amount as a string with dots as thousand separators.
 */
export const formatCurrency = (value) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(value)
}
