import {createRouter, createWebHashHistory, createWebHistory, RouteRecordRaw} from 'vue-router'
import createMoble from '../components/createMoble.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: createMoble
  },
  {
    path: '/timezone',
    name: 'timezone',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../components/timezone.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes
})

export default router
