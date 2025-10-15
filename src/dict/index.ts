// eslint-disable-next-line @typescript-eslint/no-var-requires
const words = require('./words.json') as string[]

export function getWordsByLength (length: number) {
  return words.filter(x => x.length === length)
}

export function isValidWord (word: string): boolean {
  return words.includes(word.toLowerCase())
}
