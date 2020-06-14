import Vue from 'vue'
import Router from 'vue-router'
import DashboardLayout from '@/layout/DashboardLayout'
import AuthLayout from '@/layout/AuthLayout'
Vue.use(Router)

export default new Router({
  linkExactActiveClass: 'active',
  routes: [
    {
      path: '/',
      redirect: 'login',
      component: DashboardLayout,
      children: [
        {
          path: '/perfil',
          name: 'perfil',
          component: () => import('./views/perfil/perfil.vue')
        },
        {
          path: 'mascota/registro',
          name: 'registroMascota',
          component: () => import('./views/mascota/formulario.vue')
        },
        {
          path: 'mascota/',
          name: 'mascota',
          component: () => import('./views/mascota/index.vue')
        },
        {
          path: 'mascota/modificar',
          name: 'modificarMascota',
          component: () => import('./views/mascota/formulario.vue'),
          props: (route) => ({ mascota: route.params.mascota })
        },
        {
          path: 'usuario/registro',
          name: 'registroUsuario',
          component: () => import('./views/usuario/formulario.vue')
        },
        {
          path: 'usuario/',
          name: 'usuario',
          component: () => import('./views/usuario/index.vue')
        },
        {
          path: 'usuario/modificar',
          name: 'modificarUsuario',
          component: () => import('./views/usuario/formulario.vue'),
          props: (route) => ({ usuario: route.params.usuario })
        },
        {
          path: 'vinculacion/registro',
          name: 'registroVinculacion',
          component: () => import('./views/vinculacion/formulario.vue')
        },
        {
          path: 'vinculacion/',
          name: 'vinculacion',
          component: () => import('./views/vinculacion/index.vue')
        },
        {
          path: 'vinculacion/modificar',
          name: 'modificarVinculacion',
          component: () => import('./views/vinculacion/formulario.vue'),
          props: (route) => ({ vinculacion: route.params.vinculacion })
        }
      ]
    },
    {
      path: '/',
      redirect: 'login',
      component: AuthLayout,
      children: [
        {
          path: '/login',
          name: 'login',
          component: () => import(/* webpackChunkName: "demo" */ './views/Login.vue')
        }
      ]
    }
  ]
})
