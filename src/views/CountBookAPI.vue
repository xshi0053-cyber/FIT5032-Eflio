<!-- src/views/CountBookAPI.vue -->
<template>
  <main class="container py-4">
    <h2 class="mb-3">CountBook API</h2>

    <div v-if="error" class="alert alert-danger">{{ error }}</div>

    <pre v-else-if="jsondata" class="bg-dark text-light p-3 rounded">
{{ pretty }}
    </pre>

    <p v-else>Loading…</p>
  </main>
</template>

<script setup>
import axios from 'axios'
import { ref, computed, onMounted } from 'vue'
import { COUNT_BOOKS_URL } from '../firebase'  

const jsondata = ref(null)
const error = ref(null)

const pretty = computed(() =>
  jsondata.value ? JSON.stringify(jsondata.value, null, 2) : ''
)

async function getBookCountAPI () {
  try {
    const { data } = await axios.get(COUNT_BOOKS_URL)
    // 只取 response.data（JSON）
    jsondata.value = data
    error.value = null
  } catch (e) {
    console.error(e)
    error.value = e?.message || 'Request failed'
    jsondata.value = null
  }
}

onMounted(getBookCountAPI)   // 页面加载即调用
</script>

<style scoped>
pre { white-space: pre-wrap; word-break: break-word; }
</style>
