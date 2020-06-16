<template>
    <div>
        <div class="container-fluid mt--5">
            <div class="row">
                <div class="col-xl-12 order-xl-1">
                    <card shadow type="secondary">
                        <div slot="header" class="bg-white border-0">
                            <div class="row align-items-center">
                                <div class="col-8">
                                    <h3 class="mb-0">Información Usuario</h3>
                                </div>
                            </div>
                        </div>
                        <div class="text-center" v-if="loader">
                            <vue-loaders name="ball-beat" color="blue" scale="2" class="text-center"></vue-loaders>
                        </div>
                        <template v-if="sesionActiva !== undefined && sesionActiva !== null && !loader">
                            <form @submit.prevent>
                                <div class="card card-profile shadow">
                                    <b-row class="justify-content-md-center">
                                        <div class="col-lg-2 form-group">
                                            <foto :imagen="fotografia.base64" :extension="fotografia.extension" />
                                        </div>
                                    </b-row>
                                    <b-row class="justify-content-md-center">
                                        <div class="col-lg-3 form-group">
                                            <div class="input-group input-group-sm">
                                                <b-form-file
                                                    accept="image/jpeg, image/png, image/gif"
                                                    @change="onFileSelected"
                                                    placeholder="Escojer foto..."
                                                    browse-text="Buscar"
                                                    class="form-control form-control-sm"/>
                                            </div>
                                        </div>
                                    </b-row>
                                    <div class="card-body pt-0 pt-md-4">
                                        <div class="row">
                                            <div class="col-lg-4">
                                                <base-input alternative=""
                                                            label="Nombres"
                                                            placeholder="Nombres"
                                                            input-classes="form-control-alternative"
                                                            v-model="model.nombreUsuario"
                                                            :valid="validarNombres"
                                                            ref="nombre"
                                                />
                                            </div>
                                            <div class="col-lg-4">
                                                <base-input alternative=""
                                                            label="Apellidos"
                                                            placeholder="Apellidos"
                                                            input-classes="form-control-alternative"
                                                            v-model="model.apellidoUsuario"
                                                            :valid="validarApellidos"
                                                />
                                            </div>
                                            <div class="col-lg-4">
                                                <base-input alternative=""
                                                            label="Cedula"
                                                            placeholder="N. Documento"
                                                            input-classes="form-control-alternative"
                                                            v-model="model.cedula"
                                                            :valid="validarNumeroDocumento"
                                                />
                                            </div>
                                            <div class="col-lg-4">
                                                <base-input label="Tipo de Usuario" :valid="validarTipoUsuario">
                                                    <select class="form-control" v-model="model.idTipoUsuario" >
                                                        <option v-for="tipo in tiposUsuario" :key="tipo.idTipoUsuario" :value="tipo.idTipoUsuario" >{{ tipo.nombre }}</option>
                                                    </select>
                                                </base-input>
                                            </div>
                                            <div class="col-lg-4">
                                                <base-input alternative=""
                                                            label="Dirección"
                                                            placeholder="dirección"
                                                            input-classes="form-control-alternative"
                                                            v-model="model.direccion"
                                                            :valid="validarDireccion"
                                                />
                                            </div>
                                            <div class="col-lg-4">
                                                <base-input alternative=""
                                                            label="Correo"
                                                            placeholder="heystyles@example.com"
                                                            input-classes="form-control-alternative"
                                                            v-model="model.correo"
                                                            :valid="validarEmail"
                                                />
                                            </div>
                                            <div class="col-lg-4">
                                                <base-input alternative=""
                                                            label="Estado"
                                                            placeholder=""
                                                            input-classes="form-control-alternative"
                                                            v-model="model.estado"
                                                            :valid="validarEstado"
                                                />
                                            </div>
                                            <div class="col-lg-4">
                                                <base-input alternative=""
                                                            label="Fecha de Nacimiento"
                                                            placeholder="Fecha de Nacimiento"
                                                            input-classes="form-control-alternative"
                                                            :valid="validarFechaNacimiento">
                                                    <flat-picker slot-scope="{focus, blur}"
                                                                @on-open="focus"
                                                                @on-close="blur"
                                                                :config="{allowInput: true}"
                                                                class="form-control datepicker"
                                                                v-model="model.fechaNacimiento">
                                                    </flat-picker>
                                                </base-input>
                                            </div>
                                        </div>
                                        <div class="text-right" >
                                            <base-button outline @click="actualizar()" type="success">Actualizar Información</base-button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </template>
                    </card>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import flatPicker from 'vue-flatpickr-component'
import 'flatpickr/dist/flatpickr.css'
import moment from 'moment'
import {mapState} from 'vuex'
import foto from './foto'
  export default {
    components: {
      flatPicker,
      foto
    },
    name: 'perfil',
    data() {
      return {
        model: {
          nombreUsuario: '',
          apellidoUsuario: '',
          cedula: '',
          direccion: '',
          correo: '',
          fechaNacimiento: moment().format('YYYY-MM-DD'),
          tipoDocumento: '',
          idTipoUsuario: undefined,
          id: 0,
          idPersona: 0,
          estado: ''
        },
        fotografia: {
            base64: undefined,
            extension: undefined,
            id: undefined
        },
        tiposUsuario: [
            { idTipoUsuario: '1', nombre: 'Particular' },
            { idTipoUsuario: '2', nombre: 'Veterinario' },
            { idTipoUsuario: '3', nombre: 'Representante Fundación' }
        ],
        loader: false
      }
    },
    computed: {
        ...mapState(['servidorAcceso','sesionActiva']),
        validarNombres () {
            if (this.model.nombreUsuario === '') {
                return false
            }
            else if (this.model.nombreUsuario === undefined) {
                return undefined
            }
            return true
        },
        validarApellidos () {
            if (this.model.apellidoUsuario === '') {
                return false
            }
            else if (this.model.apellidoUsuario === undefined) {
                return undefined
            }
            return true
        },
        validarNumeroDocumento () {
            if (this.model.cedula === '') {
                return false
            }
            else if (this.model.cedula === undefined) {
                return undefined
            }
            return true
        },
        validarDireccion () {
            if (this.model.direccion === '') {
                return false
            }
            else if (this.model.direccion === undefined) {
                return undefined
            }
            return true
        },
        validarEmail () {
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
        validarEstado () {
            if (this.model.estado === '') {
                return false
            }
            else if (this.model.estado === undefined) {
                return undefined
            }
            return true
        },
        validarFechaNacimiento () {
            if (this.model.fechaNacimiento === '') {
                return false
            }
            else if (this.model.fechaNacimiento === undefined) {
                return undefined
            }
            return true
        },
        validarTipoUsuario () {
            if (this.model.idTipoUsuario === '') {
                return false
            }
            else if (this.model.idTipoUsuario === undefined) {
                return undefined
            }
            return true
        }
    },
    watch: {
        sesionActiva (value) {
            console.log('-------------')
            console.log(value)
            console.log('-------------')
            if (value) {
                this.model = {
                    ...value
                }
            }
        }
    },
    methods: {
        async onFileSelected() {},
        async actualizarFoto () {},
        async actualizar () {
            if (this.validacion) {
                this.$toast.success({
                    title: 'Formulario',
                    message: 'Este formullario esta validado'
                })
            } else {
                this.$toast.error({
                    title: 'Formulario',
                    message: 'Este formullario esta validado'
                })
            }
        },
        async apiTipoUsuario () {},
        validacion () {
            if (this.validarNombres && this.validarApellidos && this.validarTipoUsuario && this.validarTipoDocumento
            && this.validarNumeroDocumento && this.validarEmail && this.validarEstado && this.validarFechaNacimiento) {
                return true
            }
            return false
        }
    },
    created: async function() {
        this.loader = true
        /*
            Esto esta aqui para capturar la informacion del usuario que inicio session
        */
        console.log('this.sesionActiva')
        console.log(this.sesionActiva)
        this.loader = false
    }
  }
</script>
<style>
</style>
