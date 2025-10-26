<!-- src/components/BHeader.vue -->
<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

import { auth } from '../firebase.js'
import { onAuthStateChanged, signOut } from 'firebase/auth'

const router = useRouter()
const userEmail = ref(null)
const signingOut = ref(false)

onMounted(() => {
  onAuthStateChanged(auth, (user) => {
    userEmail.value = user ? user.email : null
    console.log('Current user:', user ? user.email : null)
  })
})

async function handleSignOut () {
  signingOut.value = true
  try {
    await signOut(auth)
    router.push('/FireLogin')
  } catch (e) {
    console.error('Sign out failed:', e)
  } finally {
    signingOut.value = false
  }
}
</script>

<template>
  <div class="container">
    <header class="d-flex align-items-center justify-content-between py-3">
      <ul class="nav nav-pills">
        <li class="nav-item">
          <router-link to="/" class="nav-link" exact-active-class="active">
            Home (Week 5)
          </router-link>
        </li>

        <li class="nav-item">
          <router-link to="/about" class="nav-link" exact-active-class="active">
            About
          </router-link>
        </li>

        <li class="nav-item">
          <router-link to="/addbook" class="nav-link" exact-active-class="active">
            AddBook
          </router-link>
        </li>

        <!-- 已部署函数计数页面 -->
        <li class="nav-item">
          <router-link to="/GetBookCount" class="nav-link" exact-active-class="active">
            Get Book Count
          </router-link>
        </li>

        <!-- Week 10 天气页面入口 -->
        <li class="nav-item">
          <router-link to="/WeatherCheck" class="nav-link" exact-active-class="active">
            Get Weather
          </router-link>
        </li>

        <!-- 登录/注册 -->
        <li v-if="!userEmail" class="nav-item">
          <router-link to="/FireLogin" class="nav-link" exact-active-class="active">
            Firebase Login
          </router-link>
        </li>
        <li v-if="!userEmail" class="nav-item">
          <router-link to="/FireRegister" class="nav-link" exact-active-class="active">
            Register
          </router-link>
        </li>
      </ul>

      <div class="d-flex align-items-center gap-2 auth-area">
        <span class="small text-muted">
          {{ userEmail ? `Signed in: ${userEmail} (member)` : 'Guest' }}
        </span>

        <button
          v-if="userEmail"
          class="btn btn-sm btn-outline-secondary"
          @click="handleSignOut"
          :disabled="signingOut"
        >
          <span v-if="signingOut" class="spinner-border spinner-border-sm me-1"></span>
          Sign out
        </button>

        <router-link v-else class="btn btn-sm btn-outline-primary" to="/FireLogin">
          Sign in
        </router-link>
      </div>
    </header>
  </div>
</template>

<style scoped>
.auth-area { white-space: nowrap; }
</style>
