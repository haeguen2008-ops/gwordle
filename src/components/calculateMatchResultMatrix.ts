import { matchWord } from '@/matcher'
import { computed } from 'vue'

export function calculateMatchResultMatrix (props: Readonly<{
    queries: string[],
    answer: string
}>) {
  return computed(() => {
    return props.queries.map(q => matchWord(q, props.answer))
  })
}
