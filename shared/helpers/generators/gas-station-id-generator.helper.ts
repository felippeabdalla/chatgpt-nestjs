export function generateRandomNDigits(maxDigits: number = 4): string {
  return (
    Math.floor(Math.random() * (9 * Math.pow(10, maxDigits))) +
    Math.pow(10, maxDigits)
  ).toString();
}
