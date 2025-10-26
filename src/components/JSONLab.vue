<script setup>
import { ref, computed } from 'vue'

// ✅ 用相对路径，避免 @ 别名未配置导致构建失败
// 如果你更喜欢用 @，请在 vite.config.js 里配置 alias 后再改回去
import authors from '../assets/json/authors.json'
import bookstores from '../assets/json/bookstores.json'

const showMessage = ref(false)

// Activity 2: Get authors born after 1850
const modernAuthors = computed(() => authors.filter(a => a.birthYear > 1850))

// Activity 3: Get all famous works
const allFamousWorks = computed(() =>
  authors.flatMap(a => a.famousWorks)
)

// Activity 4: Find author by name
const orwell = computed(() => authors.find(a => a.name === 'George Orwell'))

// Activity 5: Find author by ID
const austen = computed(() => authors.find(a => a.id === 1))

// 用于 v-for 的安全数组（避免 austen 未找到时报错）
const booksByAusten = computed(() => austen.value?.famousWorks ?? [])

// Activity 9a: Get the company name from the bookstores object.
const companyName = computed(() => bookstores.name)

// Activity 9b: Get the total number of stores from the bookstores object.
const totalStores = computed(() => bookstores.totalStores)

// Activity 10: Iterate through the storeTypes array and display the store type and the number of stores that use that type.
const storeTypes = computed(() => bookstores.storeTypes)

// Activity 11: Iterate through the openingHours object and display the day of the week and the opening and closing times.
const openingHours = computed(
  () =>
    `Weekdays: ${JSON.stringify(bookstores.openingHours.weekdays)}; ` +
    `Weekends: ${JSON.stringify(bookstores.openingHours.weekends)}`
)

const countriesOperated = computed(() => bookstores.countries.join(', '))

// Activity 12: Get the top sellers from the bookstores object.
const topSellers = computed(() => bookstores.topSellers.join(', '))

// Activity 13: Toggle the message visibility when the button is clicked.
const toggleMessage = () => {
  showMessage.value = !showMessage.value
}
</script>

<template>
  <div class="json-lab">
    <h1>🗄️ W2. JSON Data & Vue Directives Lab</h1>

    <section class="lab-section">
      <h2>📚 Working with JSON Arrays</h2>
      <p>Our <code>authors.json</code> contains an array of author objects.</p>

      <h3>Iterating through Arrays</h3>
      <!-- Activity 6 -->
      <ul>
        <li v-for="author in authors" :key="author.id">
          {{ author.name }} ({{ author.birthYear }})
        </li>
      </ul>

      <h3>Filtering Arrays</h3>
      <!-- Activity 7 -->
      <p>Authors born after 1850:</p>
      <ul>
        <li v-for="author in modernAuthors" :key="author.id">
          {{ author.name }} ({{ author.birthYear }})
        </li>
      </ul>

      <h3>Mapping Arrays</h3>
      <p>Famous works:</p>
      <!-- Activity 8 -->
      <ul>
        <li v-for="work in allFamousWorks" :key="work.title">
          {{ work.title }} ({{ work.year }})
        </li>
      </ul>

      <h3>Finding in Arrays</h3>
      <p>Finding by property: {{ orwell?.name }}</p>

      <h3>Nested Arrays/Objects</h3>
      <p>{{ austen?.name }}'s works:</p>
      <!-- Activity 9 -->
      <ul>
        <li v-for="work in booksByAusten" :key="work.title">
          {{ work.title }} ({{ work.year }})
        </li>
      </ul>
    </section>

    <section class="lab-section">
      <h2>🏢 Working with JSON Objects</h2>
      <p>Our <code>bookstores.json</code> is a JSON object.</p>

      <h3>Accessing Properties</h3>
      <p>Company: {{ companyName }}</p>
      <p>Total Stores: {{ totalStores }}</p>

      <h3>Iterating Object Properties</h3>
      <p>Store Types:</p>
      <!-- Activity 10 -->
      <ul>
        <li v-for="st in storeTypes" :key="st.type">
          {{ st.type }} — {{ st.count }}
        </li>
      </ul>

      <h3>Nested Objects</h3>
      <p>Opening Hours:</p>
      <!-- Activity 11 -->
      {{ openingHours }}

      <h3>Working with Arrays in Objects</h3>
      <!-- Activity 12 -->
      <p>We operate in: {{ countriesOperated }}</p>
      <p>Our #1 seller: {{ topSellers }}</p>
    </section>

    <section class="lab-section">
      <h2>v-if & v-else</h2>
      <p>Toggle visibility based on a condition.</p>
      <!-- Activity 13 -->
      <button @click="toggleMessage">Toggle Message</button>
      <p class="message success" v-if="showMessage">✨ You're a Vue superstar! ✨</p>
      <p>Click the button to see a message.</p>
    </section>

    <section class="lab-section">
      <h2>Attribute, Class and Style Binding with <code>v-bind</code></h2>
      <p>Highlighting Specific Authors:</p>
      <p>Let's highlight authors who have a birth year greater than 1900.</p>
      <ul>
        <li
          v-for="author in authors"
          :key="author.id"
          :class="{ highlight: author.birthYear > 1900 }"
        >
          {{ author.name }} ({{ author.birthYear }})
        </li>
      </ul>
    </section>
  </div>
</template>

<style scoped>
.json-lab {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  max-width: 80vw;
  margin: 0 auto;
  padding: 20px;
  background-color: #f4f4f4;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

h1,
h2 {
  color: #333;
}
h1 {
  text-align: center;
}

.lab-section {
  background-color: white;
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.message {
  padding: 10px;
  border-radius: 5px;
  margin-top: 10px;
}

.success {
  background-color: #e7faf3;
  color: #42b883;
  border: 1px solid #42b883;
}

.highlight {
  background-color: #42b883;
}

code {
  background-color: #e0e0e0;
  padding: 2px 5px;
  border-radius: 4px;
  font-family: 'Courier New', Courier, monospace;
}

ul {
  list-style-type: none;
  padding: 0;
}
li {
  background-color: #f0f0f0;
  padding: 10px;
  margin: 5px 0;
  border-radius: 5px;
}
</style>
