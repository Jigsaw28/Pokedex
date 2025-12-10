export const firstElUpperCase = (str) => {
  const cleanStr = str.replace(/[\d-].*/g, '').trim()
  return cleanStr.charAt(0).toUpperCase() + cleanStr.slice(1)
}
