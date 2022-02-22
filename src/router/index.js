import Vue from 'vue'
import VueRouter from 'vue-router'
import index from '@/views/Index.vue'

Vue.use(VueRouter)

const routes = [
  {
    // path: '/',
    path:'*',
    name: 'index',
    component: index
  },
  {
    path: '/admin',
    name: 'Admin',
    // route level code-splitting
    // this generates a separate chunk (admin.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "admin" */ '../views/Admin.vue')
  },
  {
    path: '/customer',
    name: 'Customer',
    component: () => import(/* webpackChunkName: "customer" */ '../views/Customer.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
