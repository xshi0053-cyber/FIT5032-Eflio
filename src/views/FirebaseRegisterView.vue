<!-- src/views/FirebaseRegisterView.vue -->
<template>
  <div class="container py-4" style="max-width: 560px">
    <h1 class="mb-3">Create an Account</h1>

    <div v-if="successMsg" class="alert alert-success" role="alert">
      {{ successMsg }}
    </div>
    <div v-if="errorMsg" class="alert alert-danger" role="alert">
      {{ errorMsg }}
    </div>

    <div class="mb-3">
      <label class="form-label">Email</label>
      <input
        v-model.trim="email"
        type="email"
        class="form-control"
        :disabled="loading"
        required
      />
    </div>

    <div class="mb-3">
      <label class="form-label">Password</label>
      <input
        v-model="password"
        :type="showPwd ? 'text' : 'password'"
        class="form-control"
        :disabled="loading"
        minlength="6"
        required
        placeholder="Minimum 6 characters"
      />
      <div class="form-check mt-2">
        <input id="showPwd" class="form-check-input" type="checkbox" v-model="showPwd" />
        <label for="showPwd" class="form-check-label">Show password</label>
      </div>
    </div>

    <button class="btn btn-success" :disabled="loading" @click="register">
      <span v-if="loading" class="spinner-border spinner-border-sm me-1"></span>
      Save to Firebase
    </button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { auth, db } from '@/firebase' 
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'   

const router = useRouter()
const email = ref('')
const password = ref('')
const loading = ref(false)
const errorMsg = ref('')
const successMsg = ref('')
const showPwd = ref(false)

function mapFirebaseError(err) {
  const code = err?.code || ''
  switch (code) {
    case 'auth/invalid-email': return 'Invalid email format.'
    case 'auth/weak-password': return 'Password is too weak. Minimum 6 characters required.'
    case 'auth/email-already-in-use': return 'This email is already registered.'
    case 'auth/network-request-failed': return 'Network error. Please try again later.'
    default: return err?.message || 'Registration failed. Please try again.'
  }
}

async function register() {
  errorMsg.value = ''
  successMsg.value = ''
  loading.value = true
  try {
    
    const cred = await createUserWithEmailAndPassword(auth, email.value, password.value)
    const user = cred.user

    
    const role = (email.value || '').toLowerCase().endsWith('@monash.edu') ? 'admin' : 'member'
    await setDoc(
      doc(db, 'users', user.uid),
      { email: user.email, role },
      { merge: true } 
    )

    successMsg.value = 'Firebase Register Successful!'
    
    router.push('/FireLogin')
  } catch (e) {
    errorMsg.value = mapFirebaseError(e)
    console.log(e.code)
  } finally {
    loading.value = false
  }
}
</script>
