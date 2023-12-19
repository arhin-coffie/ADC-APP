import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue')
    // },
    {
      path: "/dashboard",
      name: "Dashboard",
      component: () => import("../views/Dashboard.vue"),
    },
    {
      path: "/about",
      name: "About",
      component: () => import("../views/AboutView.vue"),
    },
    {
      path: "/PullStation",
      name: "Pull station",
      component: () => import("../views/PullStationView.vue"),
    },
    {
      path: "/Position",
      name: "Position",
      component: () => import("../views/PositionView.vue"),
    },
    {
      path: "/Id-prefix",
      name: "Idprefix",
      component: () => import("../views/IdPrefixView.vue"),
    },
  ]
})

export default router
