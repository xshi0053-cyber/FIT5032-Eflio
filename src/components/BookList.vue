<template>
  <div class="mt-4">
    <h1>Books with ISBN &gt; 1000</h1>

    <ul class="mt-2">
      <li v-for="b in books" :key="b.id">
        {{ b.name }} - ISBN: {{ b.isbn }}
      </li>
    </ul>

    <p v-if="!loading && books.length === 0" class="text-muted">No matching books.</p>
    <div v-if="error" class="alert alert-danger mt-2">{{ error }}</div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

import dbDefault, { db as namedDb } from '../firebase.js'
import { collection, query, where, getDocs /*, orderBy, limit */ } from 'firebase/firestore'


const db = namedDb || dbDefault

const books = ref([])
const loading = ref(false)
const error = ref('')

async function fetchBooks() {
  loading.value = true
  error.value = ''
  try {
    
    const q = query(
      collection(db, 'books'),
      where('isbn', '>', 1000)
      
    )
    const snap = await getDocs(q)
    const arr = []
    snap.forEach((doc) => {
      arr.push({ id: doc.id, ...doc.data() })
    })
    books.value = arr
  } catch (e) {
    console.error(e)
    error.value = e?.message || 'Failed to fetch books.'
  } finally {
    loading.value = false
  }
}

onMounted(fetchBooks)
</script>
