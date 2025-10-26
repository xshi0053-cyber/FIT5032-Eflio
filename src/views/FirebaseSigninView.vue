<template>
  <div class="container py-4" style="max-width: 560px">
    <h1>Sign in</h1>

    <p><input type="text" placeholder="Email" v-model="email" /></p>
    <p><input type="password" placeholder="Password" v-model="password" /></p>
    <p><button @click="signin">Sign in via Firebase</button></p>

    
    <p v-if="msg" style="color: #d9534f">{{ msg }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'

const router = useRouter()
const email = ref('')
const password = ref('')
const msg = ref('')

const auth = getAuth() 

const signin = () => {
  msg.value = ''
  signInWithEmailAndPassword(auth, email.value, password.value)
    .then(() => {
      console.log('Firebase Sign-in Successful!')
      
      console.log(auth.currentUser)
      
      router.push('/')
    })
    .catch((error) => {
      console.log(error.code)
      msg.value = error.message || 'Sign-in failed.'
    })
}
</script>

<style scoped>
input {
  width: 100%;
  max-width: 560px;
  padding: 8px 10px;
  border: 1px solid #ddd;
  border-radius: 6px;
}
button {
  padding: 8px 14px;
  border: 1px solid #0d6efd;
  background: #0d6efd;
  color: #fff;
  border-radius: 6px;
  cursor: pointer;
}
button:hover {
  filter: brightness(0.95);
}
</style>
