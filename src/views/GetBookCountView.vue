<!-- src/views/GetBookCountView.vue -->
<template>
  <div class="container py-4">
    <h1 class="mb-3">Book Counter</h1>

    <button class="btn btn-primary"
            :disabled="loading"
            @click="getCount">
      <span v-if="loading">Loading…</span>
      <span v-else>Get Book Count</span>
    </button>

    <div class="mt-3">
      <p v-if="status === 'ok'">Total number of books: <strong>{{ count }}</strong></p>
      <p v-else-if="status === 'error'" class="text-danger">error</p>
      <p v-else class="text-muted">Click the button to load…</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { COUNT_BOOKS_URL } from '../firebase.js'

const loading = ref(false)
const status = ref('idle')   // 'idle' | 'loading' | 'ok' | 'error'
const count = ref(0)

async function getCount () {
  loading.value = true
  status.value = 'loading'
  try {
    const { data } = await axios.get(COUNT_BOOKS_URL)
    count.value = typeof data?.count === 'number' ? data.count : 0
    status.value = 'ok'
  } catch (e) {
    console.error(e)
    status.value = 'error'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.btn { padding: 8px 14px; }
</style>
