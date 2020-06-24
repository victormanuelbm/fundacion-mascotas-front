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
                      img-height="400"
                      style="text-shadow: 1px 1px 2px #333;"
                      @sliding-start="onSlideStart"
                      @sliding-end="onSlideEnd"
                      class="w-100 d-block"
          >
            <!-- Text slides with image -->
           <b-carousel-slide caption="Fundación Huellitas"
                             v-for="(item, index) in fotos"
                             :key="index">
            <template v-slot:img>
              <b-img
                fluid
                center
                width="1024"
                height="480"
                :src="item.foto_mascota_ruta"
                alt="image slot"
                v-bind="{ width: 150, height: 150, class: 'm1' }"
                style="height: 600px"
              ></b-img>
            </template>
          </b-carousel-slide>
          </b-carousel>
            
        </card>
        <b-row>
          <b-col cols="9">
            <b-card-group deck>
              <b-card bg-variant="success" class="text-center" text-variant="black" :header="mascota.nombreMascota">
                <b-card-text>
                  <p>EDAD: {{ mascota.edadMascota }}</p>
                  <p>INGRESO: {{ mascota.fechaIngreso }}</p>
                  <p><b-badge variant="primary">Dona 5 dolares para apoyar mi fundación.</b-badge></p>
                  <div ref="paypal"></div>
                </b-card-text>
              </b-card>
              <b-card bg-variant="warning" width="100" text-variant="black" header="Un amigo es para siempre." class="text-center">
                <b-card-text>
                  <p>
                    <b-badge variant="primary" v-if="!sesionActiva">
                      Si deseas apadrinar o adoptar esta mascota inicia sesión.
                    </b-badge>
                  </p>
                  <p>
                    <b-button variant="success" :disabled="!sesionActiva">
                      <i class="fa fa-paw" aria-hidden="true"></i>
                        <h3>Adopta un amigo</h3>
                      </b-button>
                  </p>
                  <br>
                  <p>
                    <b-button variant="secondary" :disabled="!sesionActiva">
                      <i class="fa fa-medkit" aria-hidden="true"></i>
                        <h3>Apadrina un amigo</h3>
                    </b-button>
                  </p>
                </b-card-text>
              </b-card>
            </b-card-group>
          </b-col>
          <b-col>
            <div class="clearfix">
              <b-badge variant="primary">
                Espacio publicitario.
              </b-badge>
              <b-img  v-bind="{ width: 250, class: 'mx-2 py-2' }"
                    :src="require('../../assets/Banners/banerV3.jpeg')"
                    alt="Left image">
              </b-img>
              <b-img v-bind="{ width: 250, class: 'mx-2 py-2' }"
                    :src="require('../../assets/Banners/banerV2.jpeg')"
                    alt="Left image">
              </b-img>
            </div>
          </b-col>
        </b-row>
      </div>
    </div>
  </div>
</template>
<script>
import {mapState, mapMutations} from 'vuex'
import axios from 'axios'
  export default {
    name: 'verMascota',
    props: {
      mascota: {
        requered: true,
        type: Object
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
      await this.mostrarImagenMascote()
    }
  }
</script>
<style>
</style>
