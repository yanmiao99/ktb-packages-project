
import { createMemoryHistory, createRouter } from 'vue-router'

import HomeView from '../view/home.vue'
import AboutView from '../view/about.vue'

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  { path: '/home', component: HomeView },
  { path: '/about', component: AboutView }
]

const router = createRouter({
  history: createMemoryHistory(),
  routes
})

export default router
