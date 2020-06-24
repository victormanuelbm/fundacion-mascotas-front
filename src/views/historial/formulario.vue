<template>
    <div>
        <div class="container-fluid mt--5">
            <div class="row">
                <div class="col-xl-12 order-xl-1">
                    <card shadow type="secondary">
                        <div slot="header" class="bg-white border-0">
                            <div class="row align-items-center">
                                <div class="col-8">
                                    <h3 class="mb-0">Historial de Mascota</h3>
                                </div>
                            </div>
                        </div>
                        <template>
                            <form @submit.prevent>
                                <div class="pl-lg-4 pr-lg-4">
                                    <div class="row">
                                        <!--<div class="col-lg-4">
                                            <base-input alternative=""
                                                        label="Nombre"
                                                        placeholder="Nombre de la Mascota"
                                                        input-classes="form-control-alternative"
                                                        v-model="model.nombreMascota"
                                                        :valid="validarNombre"
                                            />
                                        </div>-->
                                        <div class="col-lg-4">
                                            <base-input alternative=""
                                                        label="Fecha del Historial"
                                                        input-classes="form-control-alternative"
                                                        :valid="validarFechaHistorialMascota">
                                                <flat-picker slot-scope="{focus, blur}"
                                                            @on-open="focus"
                                                            @on-close="blur"
                                                            :config="{allowInput: true}"
                                                            class="form-control datepicker"
                                                            placeholder="Fecha de Revisión"
                                                            v-model="model.fechaHistorialMascota">
                                                </flat-picker>
                                            </base-input>
                                        </div>
                                        <div class="col-lg-4">
                                            <base-input alternative=""
                                                        label="Observación"
                                                        placeholder="Observación"
                                                        input-classes="form-control-alternative"
                                                        v-model="model.Observacion"
                                                        :valid="validarObservacion"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div class="pl-lg-4 pr-lg-4">
                                    <div class="row">
                                        <div class="col-lg-4">
                                            <base-input alternative=""
                                                        label="Descripción"
                                                        input-classes="form-control-alternative"
                                                        :valid="validarDescripcion">
                                                <b-form-textarea
                                                    alternative=""
                                                    placeholder="Descripción del historial"
                                                    v-model="model.descripcion"
                                                    rows="6"
                                                    no-resize
                                                ></b-form-textarea>
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
import axios from 'axios'
import {mapState} from 'vuex'
  export default {
    components: {
      flatPicker
    },
    name: 'registro',
    props: {
        historial: {
            type: Object,
            required: false
        },
        mascota: {
            type: Object,
            required: false
        }
    },
    data() {
      return {
        model: {
            idHistorialMascota: undefined,
            fechaHistorialMascota: '',
            descripcion: '',
            Observacion: '',
            idMascota: ''
        }
        }
    }, 
    computed: {
        ...mapState(['servidor']),
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
            if (this.model.Observacion === '') {
                return false
            }
            else if (this.model.Observacion === undefined) {
                return undefined
            }
            return true
        },
        validarFechaHistorialMascota () {
            if (this.model.fechaHistorialMascota === '') {
                return false
            }
            else if (this.model.fechaHistorialMascota === undefined) {
                return undefined
            }
            return true
        }
    },
    methods: {
        async guardarCambios () {
            if (!this.validacion()) {
                this.$toast.info({
                    title: 'No se puede guardar cambios del historial',
                    message: 'Existen campos vacios o no validos dentro del formulario'
                })
                return
            }
            if (this.historial) {
                console.log('this.historial')
                console.log(this.historial)
                await axios.post(this.servidor + 'HistorialMascotaController_Edit.php', this.model)
                .then(response => {
                    this.$toast.success({
                        title: 'Modificación Exitosa',
                        message: 'Se modifico el historial correctamente'
                    })
                })
                .catch(error => {
                    this.$toast.Error({
                        title: 'Error',
                        message: 'No se puede modificar cambios del historial'
                    })
                    return
                });
            } else {
                await axios.post(this.servidor + 'HistorialMascotaController_Insert.php', this.model)
                .then(response => {
                    this.$toast.success({
                        title: 'Registro Exitoso',
                        message: 'Se registro el historial correctamente'
                    })
                })
                .catch(error => {
                    this.$toast.Error({
                        title: 'Error',
                        message: 'No se puede guardar cambios del historial'
                    })
                    return
                });
                /*this.$toast.success({
                    title: 'Registro Exitoso',
                    message: 'Se registró el historial correctamente'
                })*/
            }
            this.$router.push('/historialMascota')
        },
        validacion () {
            if (this.validarDescripcion && this.validarFechaHistorialMascota && this.validarObservacion) {
                return true
            }
            return false
        }
    },
    created: function() {
        if (this.historial) {
            this.model = {
                ...this.historial
            }
        }
        if (this.mascota) {
            console.log(this.mascota)
        }
    }
  }
</script>
<style>
</style>