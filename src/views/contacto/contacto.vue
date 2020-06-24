<template>
  <div class="container-fluid mt--5">
    <div class="row">
      <div class="col-xl-12 order-xl-1">
        <card shadow type="secondary">
          <div slot="header" class="bg-white border-0">
                            <div class="row align-items-center">
                                <div class="col-8">
                                    <h2 class="mb-0"> {{ this.fundacion.nombreFundacion }}</h2>
                                </div>
                            </div>
                        </div>
                        <template>
                            <form @submit.prevent>
                                <div class="pl-lg-12">
                                    <div class="row">
                                        <div class="col-lg-12">
                                            <base-input alternative=""
                                                        label="Asunto"
                                                        placeholder="asunto del correo"
                                                        input-classes="form-control-alternative"
                                                        v-model="model.asunto"
                                                        :valid="validarAsunto"
                                            />
                                        </div>
                                    </div>
                                    <div class="row">
                                      <div class="col-lg-12">
                                        <base-input alternative=""
                                                    label="Correo de respuesta"
                                                    placeholder="heystyles@example.com"
                                                    input-classes="form-control-alternative"
                                                    v-model="model.correo"
                                                    :valid="validarcorreo"
                                        />
                                      </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-lg-12">
                                            <textarea class="form-control"
                                                      id="exampleFormControlTextarea1"
                                                      rows="3"
                                                      placeholder="Descripción del mensaje"
                                                      v-model="model.descripcion"
                                                      :valid="validarDescripcion">
                                            </textarea>
                                        </div>
                                    </div>
                                    <div class="text-right my-3" >
                                        <base-button outline @click="enviarCorreo()" type="success">Enviar Mensaje</base-button>
                                    </div>
                                </div>
                            </form>
                        </template>
        </card>
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
      fundacion: {
        type: Object,
        required: true
      }
    },
    data() {
      return {
        model: {
          correo: undefined,
          correoFundacion: undefined,
          descripcion: undefined,
          Asunto: undefined
        }
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
            } else if (/^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i.test(this.model.correo)) {
                return true
            }
            return false
        },
        validarAsunto () {
            if (this.model.asunto === '') {
                return false
            }
            else if (this.model.asunto === undefined) {
                return undefined
            }
            return true
        },
        validarDescripcion () {
            if (this.model.descripcion === '') {
                return false
            }
            else if (this.model.descripcion === undefined) {
                return undefined
            }
            return true
        }
    },
    methods: {
        validacion () {
            if (this.validarDescripcion && this.validarAsunto && this.validarcorreo) {
                return true
            }
            return false
        },
        async enviarCorreo() {
          this.loader = true
          if (this.validacion) {
            await axios.post(this.servidor + 'ContactoController.php', {
                Correo_Usuario: this.model.correo,
                Descripcion: this.model.descripcion,
                correoFundacion: this.model.correoFundacion,
                Asunto: this.model.asunto
            }).then(response => {
              this.$toast.info({
                title: 'Envio Correcto',
                message: 'Se envio el mensaje correctamente.'
              })
            }).catch(() => {})
          }
          this.$router.push('/listarFundacion')
          this.loader = false
        }
    },
    async created () {
      this.model.correoFundacion = this.fundacion.correo
    }
  }
</script>
<style>
</style>
