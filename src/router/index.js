// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'

// views
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import FirebaseSigninView from '../views/FirebaseSigninView.vue'
import FirebaseRegisterView from '../views/FirebaseRegisterView.vue'
import LogoutView from '../views/LogoutView.vue'
import AddBookView from '../views/AddBookView.vue'
import GetBookCountView from '../views/GetBookCountView.vue'
import WeatherView from '../views/WeatherView.vue'
import CountBookAPI from '../views/CountBookAPI.vue' // ★ 新增

const routes = [
  { path: '/', name: 'Home', component: HomeView },
  { path: '/about', name: 'About', component: AboutView },
  { path: '/FireLogin', name: 'FireLogin', component: FirebaseSigninView },
  { path: '/FireRegister', name: 'FireRegister', component: FirebaseRegisterView },
  { path: '/logout', name: 'Logout', component: LogoutView },
  { path: '/addbook', name: 'AddBook', component: AddBookView },
  { path: '/GetBookCount', name: 'GetBookCount', component: GetBookCountView },
  { path: '/WeatherCheck', name: 'WeatherCheck', component: WeatherView },
  { path: '/CountBookAPI', name: 'CountBookAPI', component: CountBookAPI }, // ★ 新增

  // 可选：兜底 404，重定向到首页或做一个 NotFound 组件
  { path: '/:pathMatch(.*)*', redirect: '/' }
]

const router = createRouter({
  // 使用 BASE_URL 可兼容本地与子路径部署（如 GitHub Pages）
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior() {
    return { top: 0 }
  }
})

export default router
