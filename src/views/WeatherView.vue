<!-- src/views/WeatherView.vue -->
<template>
  <div class="container py-4">
    <h1 class="mb-3">WEATHER APP</h1>

   
    <div class="search-bar mb-3">
      <input
        type="text"
        v-model="city"
        placeholder="Enter city name (e.g. Clayton, AU)"
        class="search-input"
        @keyup.enter="searchByCity"
      />
      <button class="search-button" @click="searchByCity" :disabled="loading">
        {{ loading ? 'Loading…' : 'Search' }}
      </button>
      <button class="btn-secondary" @click="loadMyWeather" :disabled="loading">
        {{ loading ? 'Locating…' : 'My Location' }}
      </button>
    </div>


    <main v-if="weatherData">
      <h2>{{ weatherData.name }}, {{ weatherData.sys.country }}</h2>
      <div class="d-flex align-items-center gap-3 mt-2">
        <img :src="iconUrl" alt="Weather Icon" />
        <p class="m-0 fs-4">{{ temperature }} °C</p>
      </div>
      <div class="text-muted mt-1">
        <span>{{ weatherData.weather[0].description }}</span>
      </div>
    </main>

    <p v-if="error" class="text-danger mt-3">{{ error }}</p>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'


const API_KEY = import.meta.env.VITE_OWM_KEY

const city = ref('Clayton, AU')
const weatherData = ref(null)
const loading = ref(false)
const error = ref('')


const temperature = computed(() =>
  weatherData.value ? Math.round(weatherData.value.main.temp) : null
)
const iconUrl = computed(() =>
  weatherData.value
    ? `https://openweathermap.org/img/wn/${weatherData.value.weather[0].icon}@2x.png`
    : ''
)


async function fetchWeatherByUrl (url) {
  error.value = ''
  loading.value = true
  weatherData.value = null
  try {
    const { data } = await axios.get(url)
    weatherData.value = data
  } catch (e) {
    console.error(e)
    error.value = 'Failed to fetch weather. Check city name or API key / quota.'
  } finally {
    loading.value = false
  }
}

async function searchByCity () {
  const q = encodeURIComponent(city.value.trim())
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${q}&units=metric&appid=${API_KEY}`
  await fetchWeatherByUrl(url)
}


async function loadMyWeather () {
  if (!navigator.geolocation) {
    error.value = 'Geolocation not supported by this browser.'
    return
  }
  navigator.geolocation.getCurrentPosition(
    async ({ coords: { latitude: lat, longitude: lon } }) => {
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
      await fetchWeatherByUrl(url)
    },
    (err) => {
      console.error(err)
      error.value = 'Location permission denied.'
    },
    { enableHighAccuracy: true }
  )
}


onMounted(() => {
  searchByCity()
})
</script>

<style scoped>
.search-bar { display: flex; gap: 8px; align-items: center; }
.search-input { padding: 8px 10px; min-width: 280px; }
.search-button, .btn-secondary { padding: 8px 12px; cursor: pointer; }
img { width: 60px; height: 60px; }
</style>
