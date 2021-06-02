export function ShortenAddress(address: string, substring: number = 4): string {
  if (!address) return ''

  const begin = address.substring(0, substring + 2)
  const end = address.substring(address.length - substring, address.length)
  const formatted = `${begin}...${end}`

  return formatted
}
