import { createRouter, createWebHistory } from 'vue-router'
import EmpleadoView from '@/views/EmpleadoView.vue'
import VentasView from '@/views/VentasView.vue'
import ComprasView from '@/views/ComprasView.vue'

const routes = [
  {
    path: '/',
    name: 'EmpleadoView',
    component: EmpleadoView
  },
  {
    path: '/ventas',
    name: 'VentasView',
    component: VentasView
  },
  {
    path: '/compras',
    name: 'ComprasView',
    component: ComprasView
  }
 
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
