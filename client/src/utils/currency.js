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

export const formatCurrency = (amount) => {
  return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
}
