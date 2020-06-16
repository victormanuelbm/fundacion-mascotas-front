import Vue from 'vue'
import Vuex from 'vuex'
import moment from 'moment'
import auth0 from 'auth0-js'
import router from './router'

Vue.use(Vuex)
export default new Vuex.Store({
    state: {
        servidorSeguridad: 'http://ec2-54-234-226-153.compute-1.amazonaws.com:9000/seguridad/',
        servidorAcceso: 'http://ec2-54-234-226-153.compute-1.amazonaws.com:9010/',
        servidorProducto: 'http://ec2-54-234-226-153.compute-1.amazonaws.com:9030/',
        servidorFactura: 'http://ec2-54-234-226-153.compute-1.amazonaws.com:9040/',
        servidorNotificacion: 'http://ec2-54-234-226-153.compute-1.amazonaws.com:9060/notificacion/',
        servidor: 'http://3.211.250.73/adopet-ufps/controller/',
        menu: undefined,
        usuarios: [
            {
                nombreUsuario: 'JOHN JAIRO',
                apellidoUsuario: 'CARRILLO IBARRA',
                cedula: '1090479106',
                correo: 'admin@gmail.com',
                direccion: 'calle 1N ·9a - 08',
                estado: 'ACTIVO',
                fechaNacimiento: moment([1994, 6, 20]).format('YYYY-MM-DD'),
                tipoDocumento: 'CC',
                idTipoUsuario: '1',
                id: undefined,
                idPersona: undefined,
                telefono: '3004230343',
                password: 'admin'
            },
            {
                nombres: 'JUAN PEDRO',
                apellidos: 'ESPITIA MEZA',
                numeroDocumento: '10904794106',
                email: 'juanpedroespitia@gmail.com',
                fechaNacimiento: moment([2000, 7, 6]).format('YYYY-MM-DD'),
                tipoDocumento: 'CC',
                cargoId: '2',
                id: undefined,
                idPersona: undefined,
                telefono: '3123445877',
                contrasena: '1234',
                estadoCuenta: false
            }
        ],
        sesionActiva: undefined,
        proveedor: [],
        cargos: [
            {id: '1', nombre: 'Gerente', permisos: ['1', '2', '3']},
            {id: '2', nombre: 'Secretaria', permisos: ['6', '5', '4']},
            {id: '3', nombre: 'Bodeguero', permisos: ['1', '3']}
        ],
        permisos: [
            {id: '1', nombre: 'ver-usuarios', descripcion: 'Tener y desplegar el menu de los usuarios'},
            {id: '2', nombre: 'crear-usuarios', descripcion: 'Poder crear usuarios nuevos para el aplicativo'},
            {id: '3', nombre: 'modificar-usuarios', descripcion: 'Poder modificar usuarios'},
            {id: '4', nombre: 'crear-cargos', descripcion: 'Poder crear cargos'},
            {id: '5', nombre: 'modificar-cargos', descripcion: 'Poder modificar cargos'},
            {id: '6', nombre: 'eliminar-cargos', descripcion: 'Poder eliminar cargos'},
        ],
        notificaciones: 0,
        userIsAuthorize: false,
        auth0: new auth0.WebAuth({
            domain: process.env.VUE_APP_AUTH0_CONFIG_DOMAIN,
            clientID: process.env.VUE_APP_AUTH0_CONFIG_CLIENTID,
            redirecUri: process.env.VUE_APP_DOMAINURL + '/auth0callback',
            responseType: process.env.VUE_APP_AUTH0_CONFIG_RESPONSETYPE,
            scope: process.env.VUE_APP_AUTH0_CONFIG_SCOPE
        })
    },
    mutations: {
        cambiarEstadoCuenta(state, correo) {
            state.usuarios.forEach(element => {
                if (correo === element.correo) {
                    element.estadoCuenta = true
                    state.sesionActiva = element
                }
            })
        },
        cerrarSesion (state) {
            state.usuarios.forEach(element => {
                element.estadoCuenta = false
            })
            state.sesionActiva = undefined
        },
        modificarUsuario (state, usuario) {
            const nuevos = []
            state.usuarios.forEach(element => {
                if (element.email === usuario.email) {
                    element = usuario
                }
                nuevos.push(element)
            })
            state.usuarios = nuevos
        },
        quitarUsuario ( state, email ) {
            const usu = state.usuarios.find(function (u) {
                return u.email === email
            })
            var i = state.usuarios.indexOf( usu );
            state.usuarios.splice( i, 1 );
        },
        modificarProveedor (state, proveedor) {
            const nuevos = []
            state.proveedor.forEach(element => {
                if (element.email === proveedor.email) {
                    element = proveedor
                }
                nuevos.push(element)
            })
            state.proveedor = nuevos
        },
        modificarCargos (state, cargo) {
            const nuevos = []
            state.cargos.forEach(element => {
                if (element.id === cargo.id) {
                    element = cargo
                }
                nuevos.push(element)
            })
            state.cargos = nuevos
        },
        iniciarSesion (state, hijos) {
            state.menu = hijos
        },
        async consultarSesion (state, usuario) {
            state.sesionActiva = usuario
        },
        setUserIsAuthenticated(state, replacement) {
            state.userIsAuthorize = replacement
        }
    },
    actions: {
        auth0Login(context) {
            context.state.auth0.authorize()
        },
        auth0HandleAuthentication (context) {
            context.state.auth0.parseHash((err, authResult) => {
                if (authResult && authResult.accessToken && authResult.idToken) {
                    const expiresAt = JSON.stringify(authResult.expiresIn * 1000 + new Date().getTime())
                    localStorage.setItem('access_token', authResult.accessToken)
                    localStorage.setItem('id_token', authResult.idToken)
                    localStorage.setItem('expires_at', expiresAt)
                    router.replace('/perfil')

                } else if (err){
                    alert('Login fallido')
                    router.replace('/login')
                    console.log(err)
                }
            })
        },
        auth0Logout () {
            localStorage.removeItem('access_token')
            localStorage.removeItem('id_token')
            localStorage.removeItem('expires_at')
            window.location.href = process.env.VUE_APP_DOMAINURL + '/login'
        }
    }
})