import { v1 as uuidv1 } from 'uuid'
/**
 * Selects a random index from an array of numbers, with probabilities calculated using exponentiation.
 * Higher values have higher chances of being selected.
 *
 * @param {number[]} items An array of numbers.
 * @param {number} exponent Exponent value for scaling probabilities (higher exponent gives higher chances to larger numbers).
 * @returns {number} A random index from the array, selected based on the calculated probabilities (fallback: -1).
 */
export function getRandomIndexWithProbabilities(
  items: number[] = [],
  exponent: number = 1.5
): number {
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
export function getProbabilities(
  items: number[],
  exponent: number = 1.5
): number[] {
  // Calculate scaled values using exponentiation
  const scaledValues = items.map((item) => Math.pow(item, exponent))

  // Calculate total sum of scaled values
  const totalScaledValue = scaledValues.reduce((acc, value) => acc + value, 0)

  // Calculate probabilities in decimal form
  return scaledValues.map((value) => value / totalScaledValue)
}

/**
 * Generates a color in HEX format. If a seed is provided, generates a consistent color based on the seed.
 *
 * @param {string} [seed] Optional seed for generating a consistent color.
 * @returns {string} Color in HEX format (e.g., '#RRGGBB').
 */
export function getRandomColor(seed: string = uuidv1()): string {
  let hash = 0

  // Generate hash from the string
  for (let i = 0; i < seed.length; i++) {
    hash = seed.charCodeAt(i) + ((hash << 5) - hash) // Adjusted bit shift for more differentiation
  }

  // Convert hash to color code in hex
  let color = '#'

  for (let i = 0; i < 3; i++) {
    const value = (hash >> (i * 8)) & 0xff
    color += ('00' + (value ^ (hash & 0xff)).toString(16)).slice(-2) // XOR operation for added complexity
  }

  return color
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
export function duplicateArray<T>(array: T[] = [], times: number = 1): T[] {
  let result: T[] = []

  for (let i = 0; i < times; i++) {
    result = [...result, ...array]
  }

  return result
}

/**
 * Generates a random name with a specified number of words from a single dictionary.
 *
 * @param {string[]} dictionary The list of words to use for generating the name (default: `greek alphabet`).
 * @param {number} min The minimum number of words in the name (default: `1`).
 * @param {number} max The maximum number of words in the name (default: `3`).
 * @returns {string} The generated random name.
 */
export function getRandomName(
  dictionary: string[] = [
    'Alpha',
    'Beta',
    'Gamma',
    'Delta',
    'Epsilon',
    'Zeta',
    'Eta',
    'Theta',
    'Iota',
    'Kappa',
    'Lambda',
    'Mu',
    'Nu',
    'Xi',
    'Omicron',
    'Pi',
    'Rho',
    'Sigma',
    'Tau',
    'Upsilon',
    'Phi',
    'Chi',
    'Psi',
    'Omega',
  ],
  min: number = 1,
  max: number = 3
): string {
  const getRandomWord = (arr: string[]) =>
    arr[Math.floor(Math.random() * arr.length)]

  // Determine the number of words in the name
  const length = Math.floor(Math.random() * (max - min + 1)) + min

  let name = ''
  for (let i = 0; i < length; i++) {
    name += (i > 0 ? ' ' : '') + getRandomWord(dictionary)
  }

  return name
}

/**
 * Recursively removes all properties with `null` or `undefined` values from an object or array.
 * Also removes empty objects and arrays.
 *
 * @param obj - The object or array to clean.
 * @returns A new object or array with `null`, `undefined`, and empty values removed, or `null` if the input was falsy.
 */
export function toCleanObject<T = unknown>(obj: T): Partial<T> | null {
  if (obj === undefined || obj === null) {
    return null
  }

  if (Array.isArray(obj)) {
    const cleanedArray = obj
      .map((item) => toCleanObject(item))
      .filter((item) => item !== undefined && item !== null)

    return cleanedArray.length > 0 ? (cleanedArray as unknown as T) : null
  }

  if (typeof obj === 'object') {
    const cleanedObject = Object.keys(obj).reduce((acc: Partial<T>, key) => {
      const value = (obj as any)[key]

      const cleanedValue = toCleanObject(value)

      if (cleanedValue !== undefined && cleanedValue !== null) {
        ;(acc as any)[key] = cleanedValue
      }

      return acc
    }, {})

    return Object.keys(cleanedObject).length > 0 ? cleanedObject : null
  }

  return obj
}

/**
 * Transforms an object into a MongoDB update query with $set and $unset operators.
 *
 * @template T - The type of the object to transform.
 * @param {T} obj - The object to transform into an update query.
 * @returns {Object} The update query containing $set and $unset operators.
 *
 * @example
 * const updateQuery = toUpdateQuery({ field1: 'value', field2: undefined });
 * // updateQuery will be: { $set: { field1: 'value' }, $unset: { field2: '' } }
 */
export function toUpdateQuery<T>(obj: T): Record<string, any> {
  const set: { [key: string]: any } = {}
  const unset: { [key: string]: any } = {}

  for (const key in obj) {
    if (obj[key] === undefined || obj[key] === null) {
      unset[key] = ''
    } else {
      set[key] = obj[key]
    }
  }

  return {
    ...(Object.keys(set).length && { $set: set }),
    ...(Object.keys(unset).length && { $unset: unset }),
  }
}

/**
 * Transforms the input into an array.
 *
 * @template T
 * @param {any} input The input to be transformed. Can be of any type.
 * @returns {T[]} An array containing the input elements. If input is already an array, it returns the input. If input is null or undefined, it returns an empty array.
 */
export function toArray<T = unknown>(input: any): T[] {
  if (input === undefined || input === null) {
    return []
  }

  if (Array.isArray(input)) {
    return input
  }

  return [input]
}

/**
 * Determines the base URL for making requests, dynamically adjusting based on
 * the execution environment (client-side or server-side).
 *
 * - On the client-side, it returns the current window location's protocol and host.
 * - On the server-side, it uses environment variables for hostname and port,
 *   defaulting to 'localhost:3000' if not specified.
 *
 * @returns {string} The base URL for API requests.
 */
export function getBaseUrl(): string {
  if (typeof window !== 'undefined') {
    // Client-side, get the base URL dynamically
    return `${window.location.protocol}//${window.location.host}`
  } else {
    // Server-side, use environment variables or default to localhost
    const port = process.env.PORT ?? '3000'
    const hostname = process.env.HOSTNAME ?? 'localhost'
    return `http://${hostname}:${port}`
  }
}
