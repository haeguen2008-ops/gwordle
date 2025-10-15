<script setup lang="ts">

import { onBeforeUnmount, onMounted, ref } from 'vue'
import WordleView from './components/WordleView.vue'
import VirtualKeyboard from './components/VirtualKeyboard.vue'
import { isValidWord, getWordsByLength } from './dict'

const tryCount = 6
const queries = ref([] as string[])
const wordLength = 5
const validWords = getWordsByLength(wordLength)
const lastQuery = ref([] as string[])
const answer = ref(validWords[Math.floor(Math.random() * validWords.length)])

function startNewGame () {
  answer.value = validWords[Math.floor(Math.random() * validWords.length)]
  queries.value = []
  lastQuery.value = []
}

function onKeyClick (ch: string) {
  if (ch === 'enter') {
    if (lastQuery.value.length === answer.value.length) {
      const lastQueryString = lastQuery.value.join('')
      console.log(lastQueryString, lastQueryString.length)

      // 단어 검증 추가
      if (!isValidWord(lastQueryString)) {
        alert('Not in word list!')
        return
      }
      queries.value.push(lastQueryString)
      if (lastQueryString === answer.value) {
        alert('Correct!')
      } else {
        if (queries.value.length === tryCount) {
          alert(`Failed! The answer was: ${answer.value.toUpperCase()}`)
        }
      }
      lastQuery.value.length = 0
    }
    // TODO: process
    alert('Enter')
  } else if (ch === 'backspace') {
    if (lastQuery.value.length > 0) {
      lastQuery.value.pop()
    }
  } else {
    if (lastQuery.value.length < answer.value.length) {
      lastQuery.value.push(ch)
    }
  }
}

function keypressToClick (ev: KeyboardEvent) {
  const { key } = ev

  if (/^[a-z]$/.test(key)) {
    onKeyClick(key)
  } else if (key === 'Enter') {
    onKeyClick('enter')
  } else if (key === 'Backspace') {
    onKeyClick('backspace')
  }
}

onMounted(() => {
  window.addEventListener('keydown', keypressToClick)
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', keypressToClick)
})

</script>

<template>
<WordleView :answer="answer" :queries="queries" :try-count="tryCount" :last-query="lastQuery" />
<VirtualKeyboard :answer="answer" :queries="queries" @keyClick='onKeyClick' />
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 30px;
}
</style>
