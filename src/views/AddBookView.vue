<template>
  <div class="container py-4" style="max-width: 640px">
    <h1 class="mb-3">Add Book</h1>

    <form @submit.prevent="addBook">
      <div class="mb-3">
        <label for="isbn" class="form-label">ISBN</label>
        <input id="isbn" v-model.trim="isbn" type="text" class="form-control" required />
      </div>

      <div class="mb-3">
        <label for="name" class="form-label">Name</label>
        <input id="name" v-model.trim="name" type="text" class="form-control" required />
      </div>

      <button type="submit" class="btn btn-primary">Add Book</button>
    </form>

    <div v-if="ok" class="alert alert-success mt-3">Book added successfully!</div>
    <div v-if="err" class="alert alert-danger mt-3">{{ err }}</div>

    
    <BookList class="mt-4" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import dbDefault, { db as namedDb } from '../firebase.js'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import BookList from '../components/BookList.vue'   

const db = namedDb || dbDefault

const isbn = ref('')
const name = ref('')
const ok = ref(false)
const err = ref('')

async function addBook() {
  ok.value = false
  err.value = ''
  const isbnNumber = Number(isbn.value)
  if (!Number.isFinite(isbnNumber)) {
    err.value = 'ISBN must be a valid number.'
    return
  }
  try {
    await addDoc(collection(db, 'books'), {
      isbn: isbnNumber,
      name: name.value,
      createdAt: serverTimestamp(),
    })
    ok.value = true
    isbn.value = ''
    name.value = ''
  } catch (e) {
    err.value = e?.message || 'Failed to add book.'
    console.error(e)
  }
}
</script>
