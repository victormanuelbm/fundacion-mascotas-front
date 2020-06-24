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
                                            <foto :imagen="sesionActiva.foto"/>
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
                                                            disabled
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
                                            <base-button outline @click="guardarCambios()" type="success">Actualizar Información</base-button>
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
import axios from 'axios'
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
        loader: false,
        existe: false
      }
    },
    computed: {
        ...mapState(['servidor','sesionActiva']),
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
        validarFechaNacimiento () {
            if (this.model.fechaNacimiento === '') {
                return false
            }
            else if (this.model.fechaNacimiento === undefined) {
                return undefined
            }
            return true
        }
    },
    watch: {
        sesionActiva (value) {
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
        async guardarCambios () {
            if (this.validacion()) {
                this.loader = true
                let servicioGuardarCambios = ''
                if (this.existe) {
                    servicioGuardarCambios = 'UsuarioController_Edit.php'
                } else {
                    servicioGuardarCambios = 'UsuarioController_Insert.php'
                }
                await axios.post(this.servidor + servicioGuardarCambios, {
                    ...this.model
                }).then(response => {
                    this.$toast.info({
                        title: 'Registro Exitoso',
                        message: 'Se culmino el proceso de registro correctamente.'
                    })
                    this.existe = true
                    this.consultarUsuario()
                }).catch((error) => {
                    console.log(error)
                })
                this.loader = false
            } else {
                this.$toast.error({
                    title: 'Formulario',
                    message: 'Todos los campos son requeridos'
                })
            }
        },
        async apiTipoUsuario () {},
        validacion () {
            console.log(this.model)
            if (this.validarNombres && this.validarApellidos && this.validarNumeroDocumento && this.validarEmail && this.validarFechaNacimiento) {
                return true
            }
            return false
        },
        async consultarUsuario() {
            this.loader = true
            await axios.post(this.servidor + 'UsuarioController_ListByCorreo.php', {
                correo: this.model.correo
            }).then(response => {
                if (response.data.result) {
                    this.$toast.info({
                        title: 'Registro de Usuario',
                        message: 'Por favor complemente la información de su perfil.'
                    })
                    this.existe = true
                } else {
                    this.model = {
                        ...response.data[0]
                    }
                }
            }).catch((error) => {
                console.log(error)
            })
            this.loader = false
        }
    },
    created: async function() {
        this.loader = true
        /*
            Esto esta aqui para capturar la informacion del usuario que inicio session
        */
        if (this.sesionActiva) {
            this.model = {
                ...this.sesionActiva
            }
        }
        await this.consultarUsuario()
        this.loader = false
    }
  }
</script>
<style>
</style>
