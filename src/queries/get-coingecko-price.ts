export const getCoingeckoSimplePriceUri = (
  baseId: string,
  quoteId: string
) =>
  `https://api.coingecko.com/api/v3/simple/price?ids=${baseId}&vs_currencies=${quoteId}`

export const fetchCoingeckoPrice = async (
  base: string,
  quote: string
) => {
  try {
    const baseId = base.toLowerCase()
    const quoteId = quote.toLowerCase()
    const url = getCoingeckoSimplePriceUri(baseId, quoteId)
    const data = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
    const result = await data.json()
    const price = result[baseId][quoteId]
    return price ? price + "" : undefined
  } catch (_) {
    return undefined
  }
}
