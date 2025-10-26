<template>
  <div class="container py-4">
    <h2 class="mb-3">Search City Weather</h2>

    <div class="input-group mb-3" style="max-width: 420px;">
      <input class="form-control" v-model="city" placeholder="e.g. Clayton, AU" @keyup.enter="search">
      <button class="btn btn-primary" :disabled="loading" @click="search">Search</button>
    </div>

    <div v-if="weather">
      <p class="mb-1"><strong>{{ weather.name }}</strong></p>
      <div class="d-flex align-items-center gap-2">
        <img :src="iconUrl" alt="icon" width="60" height="60" />
        <div>
          <div class="fs-4">{{ Math.round(weather.main.temp) }}°C</div>
          <div class="text-muted">{{ weather.weather[0].description }}</div>
        </div>
      </div>
    </div>

    <p v-if="error" class="text-danger mt-3">{{ error }}</p>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import axios from 'axios'

const KEY = import.meta.env.VITE_OWM_KEY
const city = ref('Clayton, AU')
const loading = ref(false)
const weather = ref(null)
const error = ref('')

const iconUrl = computed(() =>
  weather.value ? `https://openweathermap.org/img/wn/${weather.value.weather[0].icon}@2x.png` : ''
)

async function search () {
  error.value = ''
  weather.value = null
  loading.value = true
  try {
    const q = encodeURIComponent(city.value.trim())
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${q}&units=metric&appid=${KEY}`
    const { data } = await axios.get(url)
    weather.value = data
  } catch (e) {
    console.error(e)
    error.value = 'City not found or API error.'
  } finally {
    loading.value = false
  }
}
</script>
