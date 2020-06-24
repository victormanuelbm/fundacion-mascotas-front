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

            <b-carousel-slide caption="Porque mimar a tu mascota es de grandes dueños."
                              :img-src="require('../assets/Banners/Banner1.png')">
              <h1>PetBro Store</h1>
            </b-carousel-slide>

            <b-carousel-slide caption="PetBro"
                              :img-src="require('../assets/Banners/Banner2.png')">
            </b-carousel-slide>
            <b-carousel-slide caption="Fundación Huellitas"
                              img-src="https://www.65ymas.com/uploads/s1/65/73/5/bigstock-dog-beagle-having-fun-running-294325987-1.jpeg"
            ></b-carousel-slide>

            <!-- Slides with custom text -->
            <b-carousel-slide caption="Fundación Huellitas"
                              img-src="https://www.minsalud.gov.co/fotoscarrusel2017/vacunacioon_mascota.jpg">
              <h1>HOLA AMIGUITOSS!</h1>
            </b-carousel-slide>
          </b-carousel>
        </card>
      </div>
    </div>

    <b-row>
      <b-col cols="10">
        <b-card-group columns>
          <b-card
            v-for="(mascota, index) in mascotas"
            :key="index"
            :title="'Mi nombre es ' + mascota.nombreMascota + ', Adoptame!'"
            :img-src="mascota.foto_mascota_ruta"
            img-alt="Image"
            img-top
          >
            <b-button @click="mostrarMascota(mascota)" variant="primary">Ver Mascota</b-button>
          </b-card>
        </b-card-group>
      </b-col>

      <b-col>espacio para la publicidad</b-col>
    </b-row>
  </div>
</template>
<script>
import {mapState, mapMutations} from 'vuex'
import axios from 'axios'
  export default {
    name: 'Index',
    data() {
      return {
        model: {
          correo: undefined,
          password: undefined
        },
      slide: 0,
      sliding: null,
      mascotas: []
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
    methods: {
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
        axios.get(this.servidor + 'MascotaController_ListAll_Random.php').then(response => {
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
      mostrarMascota (item) {
          this.$router.push({
            name: 'verMascota',
            params: {
              mascota: item
            }
          })
      }
    },
    created () {
      // this.$store.commit('cerrarSesion')
      this.apiMascotasrandom()
    }
  }
</script>
<style>
</style>
