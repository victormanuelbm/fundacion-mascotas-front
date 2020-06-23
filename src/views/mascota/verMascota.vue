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
            <b-carousel-slide caption="Fundación Huellitas"
                              :img-src="item.foto_mascota_ruta"
                              v-for="(item, index) in fotos"
                              :key="index"
            ></b-carousel-slide>
          </b-carousel>
            <p>Nombre: </p>
            <p>Edad: </p>
            <p>Ingreso: </p>
            <p>Fundacion: </p> 
        </card>
      </div>
    </div>

    <b-row>
      <b-col cols="10">
        formulario mascoitas
      </b-col>
    </b-row>
    <div ref="paypal"></div>
  </div>
</template>
<script>
import {mapState, mapMutations} from 'vuex'
import axios from 'axios'
  export default {
    name: 'verMascota',
    props: {
      idMascota: {
        required: true,
        type: String
      }
    },
    data() {
      return {
        model: {
          correo: undefined,
          password: undefined
        },
        slide: 0,
        sliding: null,
        mascotas: [],
        fotos: [],
        loaded: false,
        paidFor: false
      }
    },
    computed: {
        ...mapState(['servidorSeguridad', 'usuarios', 'servidorAcceso', 'menu', 'servidor']),
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
    mounted: function() {
      const script = document.createElement("script");
      script.src =
        "https://www.paypal.com/sdk/js?client-id=ARJ1eB06FibH4NMZ0VnE9-MDus6ZvbD8boXp6px362tV3TR-ZXhCAoBdvu8dM4J3TYVNvaeiOC_wiD45";
      script.addEventListener("load", this.setLoaded);
      document.body.appendChild(script);
    },
    methods: {
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
    onSlideStart() {
        this.sliding = true
      },
      onSlideEnd() {
        this.sliding = false
      },
      async apiMascotasrandom () {
        this.loader = true
        this.itemsMascota = []
        axios.get(this.servidor + 'FotoController_List_Random.php').then(response => {
          if (response.data.result) {
            this.$toast.error({
              title: 'Información',
              message: response.data.result
            })
          } else {
            this.mascotas = response.data
          } 
        }).catch(() => {})
        this.loader = false
      },
      async mostrarImagenMascote() {
        this.loader = true
        await axios.post(this.servidor + 'FotoController_ListById.php',{
          idMascota: this.idMascota
        }).then(response => {
          this.fotos = response.data
        }).catch(() => {})
        this.loader = false
      },
      setLoaded: function() {
        this.loaded = true;
        window.paypal
          .Buttons({
            createOrder: (data, actions) => {
              return actions.order.create({
                purchase_units: [
                  {
                    description: 'Donación',
                    amount: {
                      currency_code: "USD",
                      value: 5
                    }
                  }
                ]
              });
            },
            onApprove: async (data, actions) => {
              const order = await actions.order.capture();
              this.paidFor = true;
              console.log(order);
            },
            onError: err => {
              console.log(err);
            }
          })
          .render(this.$refs.paypal);
      }
    },
    async created () {
      console.log(this.mascota)
      // this.$store.commit('cerrarSesion')
      await this.apiMascotasrandom()
      await this.mostrarImagenMascote()
    }
  }
</script>
<style>
</style>
