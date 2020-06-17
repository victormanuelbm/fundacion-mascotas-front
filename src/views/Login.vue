<template>
  <div class="container-fluid mt--5">
    <div class="row">
      <div class="col-xl-12 order-xl-1">
        <card shadow type="secondary">
          <b-carousel id="carousel-1"
                      v-model="slide"
                      :interval="3000"
                      controls
                      indicators
                      background="#ababab"
                      img-width="1024"
                      img-height="480"
                      style="text-shadow: 1px 1px 2px #333;"
                      @sliding-start="onSlideStart"
                      @sliding-end="onSlideEnd"
          >
            <!-- Text slides with image -->
            <b-carousel-slide
              caption="Fundación Huellitas"
              text="fundación ubicada en el centro."
              img-src="https://www.65ymas.com/uploads/s1/65/73/5/bigstock-dog-beagle-having-fun-running-294325987-1.jpeg"
            ></b-carousel-slide>

            <!-- Slides with custom text -->
            <b-carousel-slide img-src="https://www.minsalud.gov.co/fotoscarrusel2017/vacunacioon_mascota.jpg">
              <h1>HOLA AMIGUITOSS!</h1>
            </b-carousel-slide>

            <!-- Slides with image only -->
            <b-carousel-slide img-src="https://picsum.photos/1024/480/?image=58"></b-carousel-slide>

            <!-- Slides with img slot -->
            <!-- Note the classes .d-block and .img-fluid to prevent browser default image alignment -->
            <b-carousel-slide>
              <template v-slot:img>
                <img class="d-block img-fluid w-100"
                     width="1024"
                     height="480"
                     src="https://picsum.photos/1024/480/?image=55"
                     alt="image slot"
                >
              </template>
            </b-carousel-slide>

            <!-- Slide with blank fluid image to maintain slide aspect ratio -->
            <b-carousel-slide caption="Blank Image" img-blank img-alt="Blank image">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse eros felis, tincidunt
              a tincidunt eget, convallis vel est. Ut pellentesque ut lacus vel interdum.
            </p>
            </b-carousel-slide>
          </b-carousel>
        </card>
      </div>
    </div>
  </div>
</template>
<script>
import {mapState, mapMutations} from 'vuex'
import axios from 'axios'
  export default {
    name: 'login',
    data() {
      return {
        model: {
          correo: undefined,
          password: undefined
        },
      slide: 0,
      sliding: null
      }
    },
    computed: {
        ...mapState(['servidorSeguridad', 'usuarios', 'servidorAcceso', 'menu']),
        ...mapMutations(['iniciarSesion', 'consultarSesion']),
        validarcorreo () {
            if (this.model.correo === '') {
                return false
            }
            else if (this.model.correo === undefined) {
                return undefined
            }
            return true
        },
        validarPassword () {
            if (this.model.password === '') {
                return false
            }
            else if (this.model.password === undefined) {
                return undefined
            }
            return true
        }
    },
    methods: {
        async ingresar () {
            /*
            const self = this
            let usuario = {
              nombres: 'John Jairo',
              numeroDocumento: '10904791406'
            }
            this.$router.push('/perfil/')
                axios.post(this.servidorSeguridad + 'auth/login', {
                    ...this.model
                })
                .then(async function (response) {
                    
                    console.log('response')
                    console.log(response)
                    const datos = response.data.data
                    if (!self.validarUsuarioActivo (datos)) {
                        return false
                    }
                    self.$toast.success({
                        title: 'Bienvenido',
                        message: 'Login exitoso'
                    })
                    // self.menu = datos.menuExtended.hijos
                    // console.log('menu ' + self.menu)
                    // console.log(response.data.data)
                    // console.log(response.data.data.menuExtended.hijos)
                    self.$store.commit('iniciarSesion', response.data.data.menuExtended.hijos)
                    usuario = response.data.data.usuario
                    const sesion = (await axios.get(self.servidorAcceso + 'usuarios/usuarios/numeroDocumento/' + usuario)).data.data
                    self.$store.commit('consultarSesion', sesion)
                    self.$router.push('/perfil/')
                })
                .catch(error => {
                    this.$toast.error({
                        title: error.response.data.message,
                        message: 'La contraseña o correo es incorrecto'
                    })
                    return
                })
            */
        },
        ingresarAux () {
            const self = this
            if (this.model.password === '' || this.model.correo === '' || this.model.password === undefined || this.model.correo === undefined) {
              this.$toast.info({
                title: 'Campos Vacios',
                message: 'Por favor ingrese un correo y una contraseña valida'
              })
              return
            }
            const valido = this.usuarios.find(function (u) {
              return u.correo === self.model.correo && u.password === self.model.password
            })
            if (valido === undefined) {
              this.$toast.info({
                title: 'Login Fallido',
                message: 'El correo o la contraseña no son de un usuario existente'
              })
              return
            }
            self.$toast.success({
                title: 'Bienvenido',
                message: 'Login exitoso'
            })
            const correo = valido.correo
            this.$store.commit('cambiarEstadoCuenta', correo)
            // this.$store.commit('sesionActiva', valido)
            this.$store.commit('consultarSesion', valido)
            this.$router.push('/perfil')
        },
        limpiarCampos () {
            this.model.password = ''
            this.model.correo = ''
        },
        validarUsuarioActivo (datos) {
            if (datos.menuExtended.estado !== 'ACTIVO') {
                this.$toast.error({
                    title: 'Login Fallido',
                    message: 'Este usuario esta inactivo para hacer login'
                })
                return false
            } else {
                return true
            }
        },
    onSlideStart(slide) {
        this.sliding = true
      },
      onSlideEnd(slide) {
        this.sliding = false
      }
    },
    created () {
        this.$store.commit('cerrarSesion')
    }
  }
</script>
<style>
</style>
