<template>
  <div class="container py-4">
    <h2 class="mb-3">Current Location Weather</h2>

    <button class="btn btn-primary" :disabled="loading" @click="loadWeather">
      <span v-if="loading">Loading…</span>
      <span v-else>Get My Weather</span>
    </button>

    <div class="mt-3" v-if="weather">
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
const loading = ref(false)
const weather = ref(null)
const error = ref('')

const iconUrl = computed(() =>
  weather.value ? `https://openweathermap.org/img/wn/${weather.value.weather[0].icon}@2x.png` : ''
)

async function loadWeather () {
  error.value = ''
  weather.value = null
  loading.value = true
  try {
    // 拿定位
    const pos = await new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject, { enableHighAccuracy: true })
    })
    const { latitude: lat, longitude: lon } = pos.coords

    // 调 OpenWeather
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${KEY}`
    const { data } = await axios.get(url)
    weather.value = data
  } catch (e) {
    console.error(e)
    error.value = 'Failed to get weather. Please allow location permission.'
  } finally {
    loading.value = false
  }
}
</script>
