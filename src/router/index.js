import { createRouter, createWebHistory } from 'vue-router'
import EmpleadoView from '../views/EmpleadoView.vue'
import VentasView from '../views/VentasView.vue'
import ComprasView from '../views/ComprasView.vue'
import ProductoView from '../views/ProductoView.vue'
import CategoriasView from '../views/CategoriaView.vue'
import ProveedorView from '../views/ProveedorView.vue'
import RolView from '../views/RolView.vue'


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
  },
  {
    path: '/producto',
    name: 'Producto',
    component: ProductoView
  },
  {
    path: '/categorias',
    name: 'Categorias',
    component: CategoriasView
  },
  {
    path: '/proveedor',
    name: 'Proveedor',
    component: ProveedorView
  },
  {
    path: '/rol',
    name: 'Rol',
    component: RolView
  },
  


]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
