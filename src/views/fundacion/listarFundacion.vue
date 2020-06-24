<template>
  <div class="container-fluid mt--5">
    <div class="row">
      <div class="col-xl-12 order-xl-1">
        <card shadow type="secondary">
          <b-col cols="10">
            <h1>FUNDACIONES</h1>
            <b-card :img-src="fundacion.nombrepropietario"
                    img-alt="Card image"
                    :img-left="index%2 !== 0"
                    :img-right="index%2 === 0"
                    class="mb-3"
                    v-for="(fundacion, index) in fundaciones"
                    :key="index"
            >
              <b-card-text>
                <p>
                  <b-badge variant="primary">
                    Nombre: 
                  </b-badge>
                  {{ fundacion.nombreFundacion }}
                </p>
                <p>
                  <b-badge variant="primary">
                    Direccion: 
                  </b-badge>
                  {{ fundacion.direccionFundacion }}
                </p>
                <p>
                  <b-badge variant="primary">
                    Correo: 
                  </b-badge>
                  {{ fundacion.correo }}
                </p>
                <p>
                  <b-badge variant="primary">
                    Telefono: 
                  </b-badge>
                  {{ fundacion.telefonoFundacion }}
                </p>
                <p>
                  <b-badge variant="primary">
                    Redes Sociales: 
                  </b-badge>
                  <base-button size="sm" outline type="primary" class="mx-2">
                    <i class="fab fa-facebook" aria-hidden="true"></i>
                  </base-button>
                </p>
              </b-card-text>
            </b-card>
          </b-col>
          <b-col></b-col>
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
        fundaciones: []
      }
    },
    computed: {
        ...mapState(['sesionActiva',  'servidor']),
        ...mapMutations(['iniciarSesion', 'consultarSesion']),
    },
    methods: {
      async apiFundaciones () {
        this.loader = true
        this.itemsMascota = []
        axios.get(this.servidor + 'FundacionController_ListAll.php').then(response => {
          if (response.data.result) {
            this.$toast.error({
              title: 'Información',
              message: response.data.result
            })
          } else {
            this.fundaciones = response.data
          } 
        }).catch(() => {})
        this.loader = false
      }
    },
    async created () {
      await this.apiFundaciones()
    }
  }
</script>
<style>
</style>
