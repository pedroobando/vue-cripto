import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import ListaMonedas from '@/components/ListaMonedas'
import Moneda from '@/components/Moneda'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/monedas',
      name: 'ListaMonedas',
      component: ListaMonedas
    },
    {
      path: '/moneda/:id',
      name: 'Moneda',
      component: Moneda
    }
  ],
  mode: 'history'
})
