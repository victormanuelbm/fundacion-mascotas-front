import Vue from 'vue'
import Router from 'vue-router'
import DashboardLayout from '@/layout/DashboardLayout'
import AuthLayout from '@/layout/AuthLayout'
Vue.use(Router)

export default new Router({
    linkExactActiveClass: 'active',
    routes: [{
            path: '/',
            redirect: 'login',
            component: DashboardLayout,
            children: [{
                    path: '/perfil',
                    name: 'perfil',
                    component: () =>
                        import ('./views/perfil/perfil.vue')
                },
                {
                    path: 'mascota/registro',
                    name: 'registroMascota',
                    component: () =>
                        import ('./views/mascota/formulario.vue')
                },
                {
                    path: 'mascota/',
                    name: 'mascota',
                    component: () =>
                        import ('./views/mascota/index.vue')
                },
                {
                    path: 'mascota/modificar',
                    name: 'modificarMascota',
                    component: () =>
                        import ('./views/mascota/formulario.vue'),
                    props: (route) => ({ mascota: route.params.mascota })
                },
                {
                    path: 'usuario/registro',
                    name: 'registroUsuario',
                    component: () =>
                        import ('./views/usuario/formulario.vue')
                },
                {
                    path: 'usuario/',
                    name: 'usuario',
                    component: () =>
                        import ('./views/usuario/index.vue')
                },
                {
                    path: 'usuario/modificar',
                    name: 'modificarUsuario',
                    component: () =>
                        import ('./views/usuario/formulario.vue'),
                    props: (route) => ({ usuario: route.params.usuario })
                },
                {
                    path: 'convenio/registro',
                    name: 'registroConvenio',
                    component: () =>
                        import ('./views/convenio/formulario.vue')
                },
                {
                    path: 'convenio/',
                    name: 'convenio',
                    component: () =>
                        import ('./views/convenio/index.vue')
                },
                {
                    path: 'convenio/modificar',
                    name: 'modificarConvenio',
                    component: () =>
                        import ('./views/convenio/formulario.vue'),
                    props: (route) => ({ convenio: route.params.convenio })
                }
            ]
        },
        {
            path: '/',
            redirect: 'login',
            component: AuthLayout,
            children: [{
                    path: '/login',
                    name: 'login',
                    component: () =>
                        import ( /* webpackChunkName: "demo" */ './views/Login.vue')
                },

                {
                    path: '/contacto',
                    name: 'contacto',
                    component: () =>
                        import ( /* webpackChunkName: "demo" */ './views/Contact.vue')
                }
            ]
        }
    ]
})