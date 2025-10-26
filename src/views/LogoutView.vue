<template>
  <div class="container py-4" style="max-width: 560px">
    <h1 class="mb-3">Logout</h1>

    <div class="alert" :class="ok ? 'alert-success' : 'alert-secondary'" role="alert">
      {{ msg }}
    </div>

    <p class="text-muted small">
      Open DevTools → Console. You should see:
      <code>Current user after sign out: null</code>
    </p>

    <router-link to="/FireLogin" class="btn btn-primary">Back to Login</router-link>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { auth } from '@/firebase'
import { signOut, onAuthStateChanged } from 'firebase/auth'

const msg = ref('Signing out...')
const ok = ref(false)

onMounted(async () => {
 
  onAuthStateChanged(auth, (user) => {
    console.log('Current user after sign out:', user ? user.email : null)
  })

  try {
    await signOut(auth)
    ok.value = true
    msg.value = 'You have signed out.'
  } catch (e) {
    ok.value = false
    msg.value = e?.message || 'Sign out failed. Please try again.'
  }
})
</script>

<style scoped>
.alert { border-radius: 0.75rem; }
</style>
