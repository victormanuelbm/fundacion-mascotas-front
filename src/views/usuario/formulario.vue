<template>
    <div>
        <div class="container-fluid mt--5">
            <div class="row">
                <div class="col-xl-12 order-xl-1">
                    <card shadow type="secondary">
                        <div slot="header" class="bg-white border-0">
                            <div class="row align-items-center">
                                <div class="col-8">
                                    <h3 class="mb-0">Formulario de Mascotas</h3>
                                </div>
                            </div>
                        </div>
                        <template>
                            <form @submit.prevent>
                                <div class="pl-lg-4">
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
                                                <base-input label="Estado" :valid="validarEstado">
                                                    <select class="form-control" v-model="model.estado" >
                                                        <option v-for="estado in tiposEstado" :key="estado.id" :value="estado.id" >{{ estado.nombre }}</option>
                                                    </select>
                                                </base-input>
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
                                        <base-button outline @click="guardarCambios()" type="success">Guardar Cambios</base-button>
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
  export default {
    components: {
      flatPicker
    },
    name: 'registro',
    props: {
        usuario: {
            type: Object,
            required: false
        }
    },
    data() {
      return {
        model: {
            nombreUsuario: undefined,
            apellidoUsuario: undefined,
            cedula: undefined,
            direccion: undefined,
            correo: undefined,
            fechaNacimiento: moment().format('YYYY-MM-DD'),
            tipoDocumento: undefined,
            idTipoUsuario: undefined,
            id: undefined,
            estado: undefined
        },
        fotografia: {
            base64: '',
            id: null,
            extension: ''
        },
        imagen: undefined,
        tiposUsuario: [
            { idTipoUsuario: 1, nombre: 'Administrador' },
            { idTipoUsuario: 2, nombre: 'Adoptante' },
            { idTipoUsuario: 3, nombre: 'Usuario' },
            { idTipoUsuario: 4, nombre: 'Donante' }
        ],
        tiposEstado: [
            { estado: 1, nombre: 'Activo' },
            { estado: 0, nombre: 'Inactivo'}
        ]
      }
    },
    computed: {
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
    methods: {
        ingresoFile () {},
        subirImagen () {},
        async actualizarFoto () {},
        async guardarCambios () {
            if (!this.validacion()) {
                this.$toast.info({
                    title: 'No se puede guardar cambios del usuario',
                    message: 'Existen campos vacios o no validos dentro del formulario'
                })
                return
            } else {
                this.$toast.success({
                    title: 'Registro Exitoso',
                    message: 'Se registro usuario correctamente.'
                })
            }
        },
        validacion () {
            if (this.validarNombres && this.validarApellidos && this.validarTipoUsuario && this.validarTipoDocumento
            && this.validarNumeroDocumento && this.validarEmail && this.validarEstado && this.validarFechaNacimiento) {
                return true
            }
            return false
        }
    },
    created: function() {
        if (this.usuario) {
            this.model = {
                ...this.usuario
            }
        }
    }
  }
</script>
<style>
</style>
