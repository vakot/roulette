/**
 * Selects a random index from an array of numbers, with probabilities calculated using exponentiation.
 * Higher values have higher chances of being selected.
 *
 * @param {number[]} items An array of numbers.
 * @param {number} exponent Exponent value for scaling probabilities (higher exponent gives higher chances to larger numbers).
 * @returns {number} A random index from the array, selected based on the calculated probabilities (fallback: -1).
 */
export function getRandomIndexWithProbabilities(items: number[], exponent: number = 1.5): number {
  const probabilities = getProbabilities(items, exponent)

  // Generate a random number between 0 and 1
  const random = Math.random()

  // Accumulate probabilities
  let accumulator = 0

  for (let i = 0; i < probabilities.length; i++) {
    accumulator += probabilities[i]

    // Return the index if the accumulated probability exceeds the random number
    if (random < accumulator) {
      return i
    }
  }

  // Fallback: return the last index (should not reach here if probabilities are correctly normalized)
  return -1
}

/**
 * Generates an array of probabilities (in decimal form) from an array of numbers.
 * The probabilities are calculated using exponentiation to give higher chances to larger numbers while ensuring all numbers have a chance.
 *
 * @param {number[]} items An array of numbers.
 * @param {number} exponent Exponent value for scaling probabilities (higher exponent gives higher chances to larger numbers).
 * @returns {number[]} An array of probabilities in decimal form corresponding to each item.
 */
export function getProbabilities(items: number[], exponent: number = 1.5): number[] {
  // Calculate scaled values using exponentiation
  const scaledValues = items.map((item) => Math.pow(item, exponent))

  // Calculate total sum of scaled values
  const totalScaledValue = scaledValues.reduce((acc, value) => acc + value, 0)

  // Calculate probabilities in decimal form
  return scaledValues.map((value) => value / totalScaledValue)
}

/**
 * Generates a random color in HEX format.
 *
 * @returns {string} Random color in HEX format (e.g., '#RRGGBB').
 */
export function getRandomColor(): string {
  // Generate random RGB values
  const r = Math.floor(Math.random() * 256) // Red component
  const g = Math.floor(Math.random() * 256) // Green component
  const b = Math.floor(Math.random() * 256) // Blue component

  // Convert RGB to HEX format
  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`
}

/**
 * Shuffles an array using the Fisher-Yates (Knuth) Shuffle algorithm.
 *
 * @template T The type of elements in the array.
 * @param {T[]} array The array to shuffle.
 * @returns {T[]} A new array with the elements shuffled.
 */
export function toShuffled<T>(array: T[]): T[] {
  const shuffledArray = array.slice() // Create a copy of the array

  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1)) // Random index from 0 to i
    ;[shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]] // Swap elements
  }

  return shuffledArray
}

/**
 * Duplicates an array a specified number of times and concatenates the copies into a single array.
 *
 * @template T The type of elements in the array.
 * @param {T[]} array The array to duplicate.
 * @param {number} times The number of times to duplicate the array.
 * @returns {T[]} A new array containing the duplicated arrays.
 */
export function duplicateArray<T>(array: T[], times: number = 1): T[] {
  let result: T[] = []

  for (let i = 0; i < times; i++) {
    result = [...result, ...array]
  }

  return result
}
