<script setup>
import { ref, getCurrentInstance } from 'vue'
import BHeader from './components/BHeader.vue'
import JSONLab from './components/JSONLab.vue'
import LibraryRegistrationFormV5 from './components/LibraryRegistrationFormV5.vue'

// keep your local toggle (no change)
const active = ref<'form' | 'json'>('form')

// detect if vue-router is installed and mounted
const hasRouter = !!getCurrentInstance()?.appContext.config.globalProperties.$router
</script>

<template>
  <header>
    <BHeader />
  </header>

  <div class="container mt-4">
    <!-- If router exists, render current route view; otherwise fallback to your buttons -->
    <router-view v-if="hasRouter" />
    <template v-else>
      <div class="btn-group mb-3">
        <button
          class="btn btn-outline-primary"
          :class="{ active: active === 'form' }"
          @click="active = 'form'"
        >
          Week 5 Form
        </button>
        <button
          class="btn btn-outline-secondary"
          :class="{ active: active === 'json' }"
          @click="active = 'json'"
        >
          Week 2 JSON Lab
        </button>
      </div>

      <keep-alive>
        <component :is="active === 'form' ? LibraryRegistrationFormV5 : JSONLab" />
      </keep-alive>
    </template>
  </div>
</template>

<style scoped>
.btn.active { pointer-events: none; }
</style>
