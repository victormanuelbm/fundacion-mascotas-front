<template>
    <div>
        <div class="container-fluid mt--5">
            <div class="row">
                <div class="col-xl-12 order-xl-1">
                    <card shadow type="secondary">
                        <div slot="header" class="bg-white border-0">
                            <div class="row align-items-center">
                                <div class="col-8">
                                    <h3 class="mb-0">Formulario de Convenio</h3>
                                </div>
                            </div>
                        </div>
                        <template>
                            <form @submit.prevent>
                                <div class="pl-lg-4">
                                    <div class="row">
                                            <div class="col-lg-4">
                                                <base-input alternative=""
                                                            label="Convenio"
                                                            placeholder="Convenio"
                                                            input-classes="form-control-alternative"
                                                            v-model="model.idConvenio"
                                                            :valid="validarConvenio"
                                                            ref="nombre"
                                                />
                                            </div>
                                            <div class="col-lg-4">
                                                <base-input alternative=""
                                                            label="Vinculacion"
                                                            placeholder="Vinculacion"
                                                            input-classes="form-control-alternative"
                                                            v-model="model.idVinculacion"
                                                            :valid="validaridVinculacion"
                                                />
                                            </div>
                                            <div class="col-lg-4">
                                                <base-input alternative=""
                                                            label="Fundacion"
                                                            placeholder="Fundacion"
                                                            input-classes="form-control-alternative"
                                                            v-model="model.idFundacion"
                                                            :valid="validaridFundacion"
                                                />
                                            </div>
                                             <div class="col-lg-4">
                                                <base-input alternative=""
                                                            label="Fecha Convenio"
                                                            placeholder="Fecha Convenio"
                                                            input-classes="form-control-alternative"
                                                            v-model="model.fechaConvenio"
                                                            :valid="validarfechaConvenio">
                                                   <flat-picker slot-scope="{focus, blur}"
                                                                @on-open="focus"
                                                                @on-close="blur"
                                                                :config="{allowInput: true}"
                                                                class="form-control datepicker"
                                                                v-model="model.fechaConvenio">
                                                    </flat-picker>
                                                </base-input>
                                            </div>
                                            <div class="col-lg-4">
                                                <base-input alternative=""
                                                            label="Nombre Convenio"
                                                            placeholder="Nombre Convenio"
                                                            input-classes="form-control-alternative"
                                                            v-model="model.nombreConvenio"
                                                            :valid="validarnombreConvenio"
                                                />
                                            </div>
                                            <div class="col-lg-4">
                                                <base-input alternative=""
                                                            label="Duracion Convenio"
                                                            placeholder="Duracion Convenio"
                                                            input-classes="form-control-alternative"
                                                            v-model="model.duracionConvenio"
                                                            :valid="validarduracionConvenio">
                                                   <flat-picker slot-scope="{focus, blur}"
                                                                @on-open="focus"
                                                                @on-close="blur"
                                                                :config="{allowInput: true}"
                                                                class="form-control datepicker"
                                                                v-model="model.duracionConvenio">
                                                    </flat-picker>
                                                </base-input>
                                            </div>
                                            <div class="col-lg-4">
                                                <base-input label="Estado" :valid="validarEstado">
                                                    <select class="form-control" v-model="model.estado" >
                                                        <option v-for="estado in tiposEstado" :key="estado.id" :value="estado.id" >{{ estado.nombre }}</option>
                                                    </select>
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
            idConvenio: undefined,
            idVinculacion: undefined,
            idFundacion: undefined,
            fechaConvenio: moment().format('YYYY-MM-DD'),
            nombreConvenio: undefined,
            duracionConvenio: moment().format('YYYY-MM-DD'),
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
        validarConvenio () {
            if (this.model.idConvenio === '') {
                return false
            }
            else if (this.model.idConvenio === undefined) {
                return undefined
            }
            return true
        },
        validaridVinculacion () {
            if (this.model.idVinculacion === '') {
                return false
            }
            else if (this.model.idVinculacion === undefined) {
                return undefined
            }
            return true
        },
        validaridFundacion () {
            if (this.model.idFundacion === '') {
                return false
            }
            else if (this.model.idFundacion === undefined) {
                return undefined
            }
            return true
        },
        validarnombreConvenio () {
            if (this.model.nombreConvenio === '') {
                return false
            }
            else if (this.model.nombreConvenio === undefined) {
                return undefined
            }
            return true
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
        validarfechaConvenio () {
            if (this.model.fechaConvenio === '') {
                return false
            }
            else if (this.model.fechaConvenio === undefined) {
                return undefined
            }
            return true
        },        
        validarduracionConvenio () {
            if (this.model.duracionConvenio === '') {
                return false
            }
            else if (this.model.duracionConvenio === undefined) {
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
            if (this.validaridVinculacion && this.validaridFundacion && this.validarConvenio && this.fechaConvenio
            && this.nombreConvenio && this.duracionConvenio && this.estado ) {
                return true
            }
            return false
        }
    },
    created: function() {
        if (this.convenio) {
            this.model = {
                ...this.convenio
            }
        }
    }
  }
</script>
<style>
</style>
