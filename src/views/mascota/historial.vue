<template>
    <div>
        <div class="container-fluid mt--5">
            <div class="row">
                <div class="col-xl-12 order-xl-1">
                    <card shadow type="secondary">
                        <div slot="header" class="bg-white border-0">
                            <div class="row align-items-center">
                                <div class="col-8">
                                    <h3 class="mb-0">Historial de Firulais</h3>
                                </div>
                            </div>
                        </div>
                        <template>
                            <form @submit.prevent>
                                <div class="pl-lg-4 pr-lg-4">
                                    <div class="row">
                                        <div class="col-lg-4">
                                            <base-input alternative=""
                                                        label="Fecha de Revision"
                                                        placeholder="Fecha de Revision"
                                                        input-classes="form-control-alternative"
                                                        :valid="validarFechaRevision">
                                                <flat-picker slot-scope="{focus, blur}"
                                                            @on-open="focus"
                                                            @on-close="blur"
                                                            :config="{allowInput: true}"
                                                            class="form-control datepicker"
                                                            v-model="model.fechaRevision">
                                                </flat-picker>
                                            </base-input>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div>
                                            <b-form-textarea
                                                id="textarea-rows"
                                                placeholder="Descripcion"
                                                rows="8"
                                            ></b-form-textarea>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-lg-4">
                                            <base-input alternative=""
                                                        label="Descripcion"
                                                        placeholder="Descripcion"
                                                        input-classes="form-control-alternative"
                                                        v-model="model.descripcion"
                                                        :valid="validarDescripcion"
                                            />
                                        </div>
                                        <div class="col-lg-4">
                                            <base-input alternative=""
                                                        label="Observacion"
                                                        placeholder="Observacion"
                                                        input-classes="form-control-alternative"
                                                        v-model="model.observacion"
                                                        :valid="validarObservacion"
                                            />
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
  export default {
    components: {
      flatPicker
    },
    name: 'registro',
    props: {
        mascota: {
            type: Object,
            required: false
        }
    },
    data() {
      return {
        model: {
            idHistorial: undefined,
            fechaRevision: '',
            descripcion: '',
            observacion: '',
            idMascota: ''
        }
        }
    }, 
    computed: {
        validarDescripcion () {
            if (this.model.descripcion === '') {
                return false
            }
            else if (this.model.descripcion === undefined) {
                return undefined
            }
            return true
        },
        validarObservacion () {
            if (this.model.observacion === '') {
                return false
            }
            else if (this.model.observacion === undefined) {
                return undefined
            }
            return true
        },
        validarFechaRevision () {
            if (this.model.validarFechaRevision === '') {
                return false
            }
            else if (this.model.validarFechaRevision === undefined) {
                return undefined
            }
            return true
        },
    },
    methods: {
        async guardarCambios () {
            if (!this.validacion()) {
                this.$toast.info({
                    title: 'No se puede guardar cambios de la Revision',
                    message: 'Existen campos vacios o no validos dentro del formulario'
                })
                return
            } else {
                this.$toast.success({
                    title: 'Registro Exitoso',
                    message: 'Se registro la Revision correctamente'
                })
            }
        },
        validacion () {
            if (this.validarDescripcion && this.validarFechaRevision && this.validarObservacion) {
                return true
            }
            return false
        }
    },
    created: function() {
        if (this.mascota) {
            this.model = {
                ...this.mascota
            }
        }
    }
  }
</script>
<style>
</style>