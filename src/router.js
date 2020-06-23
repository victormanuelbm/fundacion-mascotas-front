import Vue from 'vue'
import Router from 'vue-router'
import IndexLayout from '@/layout/IndexLayout'
import Store from './store'

Vue.use(Router)

const router = new Router({
  // linkExactActiveClass: 'active',
  mode: 'history',
  routes: [
    {
      path: '/auth0callback',
      name: 'auth0callback',
      // redirect: 'Perfil',
      component: IndexLayout,
      children: [
        {
          path: '/auth0callback',
          name: 'Perfil',
          component: () => import('./views/perfil/perfil.vue')
        }
      ]
    },
    {
      path: '/layout',
      // redirect: 'perfil',
      component: IndexLayout,
      children: [
        {
          path: '/perfil',
          name: 'perfil',
          component: () => import('./views/perfil/perfil.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: 'mascota/registro',
          name: 'registroMascota',
          component: () => import('./views/mascota/formulario.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: '/mascota',
          name: 'mascota',
          component: () => import('./views/mascota/index.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: 'mascota/modificar',
          name: 'modificarMascota',
          component: () => import('./views/mascota/formulario.vue'),
          props: (route) => ({ mascota: route.params.mascota }),
          meta: { requiresAuth: true }
        },
        {
          path: 'usuario/registro',
          name: 'registroUsuario',
          component: () => import('./views/usuario/formulario.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: '/usuario',
          name: 'usuario',
          component: () => import('./views/usuario/index.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: 'usuario/modificar',
          name: 'modificarUsuario',
          component: () => import('./views/usuario/formulario.vue'),
          props: (route) => ({ usuario: route.params.usuario }),
          meta: { requiresAuth: true }
        },
        {
          path: 'donacion/registro',
          name: 'registroDonacion',
          component: () => import('./views/donacion/formulario.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: '/donacion',
          name: 'donaciones',
          component: () => import('./views/donacion/index.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: '/donacion/modificar',
          name: 'modificarDonacion',
          component: () => import('./views/donacion/formulario.vue'),
          props: (route) => ({ donacion: route.params.donacion }),
          meta: { requiresAuth: true }
        },
        {
          path: '/albergue/registro',
          name: 'registroAlbergue',
          component: () => import('./views/albergue/formulario.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: '/albergue',
          name: 'albergues',
          component: () => import('./views/albergue/index.vue'),
          props: (route) => ({ fundacion: route.params.fundacion }),
          meta: { requiresAuth: true }
        },
        {
          path: '/albergue/modificar',
          name: 'modificarAlbergue',
          component: () => import('./views/albergue/formulario.vue'),
          props: (route) => ({ albergue: route.params.albergue }),
          meta: { requiresAuth: true }
        },
        {
          path: '/fundacion/registro',
          name: 'registroFundacion',
          component: () => import('./views/fundacion/formulario.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: '/fundacion',
          name: 'fundacion',
          component: () => import('./views/fundacion/index.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: '/fundacion/modificar',
          name: 'modificarFundacion',
          component: () => import('./views/fundacion/formulario.vue'),
          props: (route) => ({ fundacion: route.params.fundacion }),
          meta: { requiresAuth: true }
        },
        {
          path: '/verMascota/:idMascota',
          name: 'verMascota',
          props: true,
          component: () => import('./views/mascota/verMascota.vue')
        }
      ]
    },
    {
      path: '/',
      redirect: 'login',
      component: IndexLayout,
      children: [
        {
          path: '/login',
          name: 'login',
          component: () => import('./views/Login.vue')
        }
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.path === '/auth0callback')) {
    Store.dispatch('auth0HandleAuthentication')
    next(false)
  }
  let routerAuthcheck = false
  if (localStorage.getItem('access_token') && localStorage.getItem('id_token')
      && localStorage.getItem('expires_at')) {
    const expiresAt = JSON.parse(localStorage.getItem('expires_at'))
    routerAuthcheck = new Date().getTime() < expiresAt;
  }
  Store.commit('setUserIsAuthenticated', routerAuthcheck)
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (routerAuthcheck) {
      next()
    } else {
      router.replace('/login')
    }

  } else {
    next()
  }
  Store.commit('setSesionActiva',  JSON.parse(localStorage.getItem('sesionActiva')))
})

export default router;
