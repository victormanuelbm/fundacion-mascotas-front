<template>
  <div class="container-fluid mt--5">
    <div class="row">
      <div class="col-xl-12 order-xl-1">
        <card shadow type="secondary">
          <b-col cols="10">
            <h4>Left and Right (or Start and End)</h4>
            <b-card img-src="https://placekitten.com/300/300" img-alt="Card image" img-left class="mb-3">
                <b-card-text>
                    Some quick example text to build on the card and make up the bulk of the card's content.
                </b-card-text>
             </b-card>
            <b-card img-src="https://placekitten.com/300/300" img-alt="Card image" img-right>
                <b-card-text>
                    Some quick example text to build on the card and make up the bulk of the card's content.
                </b-card-text>
            </b-card>
          </b-col>
          <b-col>
            espacio para la publicidad
          </b-col>
        </card>
      </div>
    </div>
  </div>
</template>
<script>
import {mapState, mapMutations} from 'vuex'
import axios from 'axios'
  export default {
    name: 'listarMascota',
    props: {},
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
        ...mapState(['sesionActiva',  'servidor']),
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
          idMascota: this.mascota.idMascota
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
      console.log(this.sesionActiva)
      // await this.apiMascotasrandom()
      // await this.mostrarImagenMascote()
    }
  }
</script>
<style>
</style>
