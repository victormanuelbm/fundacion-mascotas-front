<template>
    <div>
        <div class="container-fluid mt--5">
            <div class="row">
                <div class="col-xl-12 order-xl-1">
                    <card shadow type="secondary">
                        <div slot="header" class="bg-white border-0">
                            <div class="row align-items-center">
                                <div class="col-8">
                                    <h3 class="mb-0">Formulario de Donaciones</h3>
                                </div>
                            </div>
                        </div>
                        <template>
                            <form @submit.prevent>
                                <div class="pl-lg-4">
                                    <div class="row">
                                        <div class="col-lg-4">
                                            <base-input label="Mascotas" :valid="validarMascotas">
                                                <select class="form-control" v-model="model.idMascota">
                                                    <option v-for="mascota in mascotas" :key="mascota.idMascota" :value="mascota.idMascota" >{{ mascota.nombreMascota }}</option>
                                                </select>
                                            </base-input>
                                        </div>
                                        <div class="col-lg-4">
                                            <base-input label="Fundación" :valid="validarFundacion">
                                                <select class="form-control" v-model="model.idFundacion">
                                                    <option v-for="fundacion in fundaciones" :key="fundacion.idFundacion" :value="fundacion.idFundacion" >{{ fundacion.nombre }}</option>
                                                </select>
                                            </base-input>
                                        </div>
                                        <div class="col-lg-4">
                                            <base-input label="Tipo de Donación" :valid="validarTipoDonacion">
                                                <select class="form-control" v-model="model.idTipoDonacion">
                                                    <option v-for="tipodonacion in tipodonaciones" :key="tipodonacion.idTipoDonacion" :value="tipodonacion.idTipoDonacion" >{{ tipodonacion.TipoDonacion }}</option>
                                                </select>
                                            </base-input>
                                        </div>
                                        <div class="col-lg-4">
                                            <base-input alternative=""
                                                        label="Estado"
                                                        placeholder="Estado de la Donación"
                                                        input-classes="form-control-alternative"
                                                        v-model="model.estadoDonacion"
                                                        :valid="validarEstado"
                                            />
                                        </div>
                                        <div class="col-lg-4">
                                            <base-input alternative=""
                                                        label="Fecha de la Donación"
                                                        placeholder="Fecha"
                                                        input-classes="form-control-alternative"
                                                        :valid="validarFechaDonacion">
                                                <flat-picker slot-scope="{focus, blur}"
                                                            @on-open="focus"
                                                            @on-close="blur"
                                                            :config="{allowInput: true}"
                                                            class="form-control datepicker"
                                                            v-model="model.fechaDonacion">
                                                </flat-picker>
                                            </base-input>
                                        </div>
                                        <div class="col-lg-4">
                                            <base-input alternative=""
                                                        label="Cantidad"
                                                        placeholder="Cantidad de la Donación"
                                                        input-classes="form-control-alternative"
                                                        v-model="model.cantidad"
                                                        :valid="validarCantidad"
                                            />
                                        </div>
                                        <div class="col-lg-12">
                                            <base-input alternative=""
                                                        label="Descripción"
                                                        placeholder="Descripción de la Donación"
                                                        input-classes="form-control-alternative"
                                                        v-model="model.descripcion"
                                                        :valid="validarDescripcion"
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
import axios from 'axios'
import {mapState} from 'vuex'
  export default {
    components: {
      flatPicker
    },
    name: 'registro',
    props: {
        donacion: {
            type: Object,
            required: false
        }
    },
    data() {
      return {
        model: {
            idDonacion: undefined,
            idMascota: '',
            idFundacion: '',
            estadoDonacion: '',
            fechaDonacion: '',
            cantidad: '',
            descripcion: '',
            idTipoDonacion: ''
        },
        fotografia: {
            base64: '',
            id: null,
            extension: ''
        },
        imagen: undefined,
        fundaciones: [
            { idFundacion: '1', nombre: 'Fundacion las Puertas del Cielo' },
            { idFundacion: '2', nombre: 'Lo que el Agua se Llevo' },
            { idFundacion: '3', nombre: 'El Espanta-Tiburones' }
        ],
        mascotas: [
            { idMascota: '1', nombreMascota: 'Molly' },
            { idMascota: '2', nombreMascota: 'Candy' },
            { idMascota: '3', nombreMascota: 'Sasha' }
        ],
        tipodonaciones: [
            { idTipoDonacion: '1', TipoDonacion: 'Juguetes' },
            { idTipoDonacion: '2', TipoDonacion: 'Medicina' }
        ],
        tiposSexo: ['Asexual', 'Macho', 'Hembra'],
        tiposDisponibilidad: ['Disponible', 'No Disponible'],
      }
    },
    computed: {
        ...mapState(['servidor']),
        validarMascotas () {
            if (this.model.idMascota === '' ) {
                return false
            }
            else if (this.model.idMascota === undefined) {
                return undefined
            }
            return true
        },
        validarFundacion () {
            if (this.model.idFundacion === '' ) {
                return false
            }
            else if (this.model.idFundacion === undefined) {
                return undefined
            }
            return true
        },
        validarTipoDonacion () {
            if (this.model.idTipoDonacion === '' ) {
                return false
            }
            else if (this.model.idTipoDonacion === undefined) {
                return undefined
            }
            return true
        },
        validarEstado () {
            if (this.model.estadoDonacion === '') {
                return false
            }
            else if (this.model.estadoDonacion === undefined) {
                return undefined
            }
            return true
        },
        validarFechaDonacion () {
            if (this.model.fechaDonacion === '') {
                return false
            }
            else if (this.model.fechaDonacion === undefined) {
                return undefined
            }
            return true
        },
        validarCantidad () {
            if (this.model.cantidad === '') {
                return false
            }
            else if (this.model.cantidad === undefined) {
                return undefined
            }
            return true
        },
        validarDescripcion () {
            if (this.model.descripcion === '' ) {
                return false
            }
            else if (this.model.descripcion === undefined) {
                return undefined
            }
            return true
        },
    },
    methods: {
        ingresoFile () {},
        subirImagen () {},
        async actualizarFoto () {},
        async guardarCambios () {
            if (!this.validacion()) {
                this.$toast.info({
                    title: 'No se puede guardar cambios de la donacion',
                    message: 'Existen campos vacios o no validos dentro del formulario'
                })
                return
            }
            if (this.donacion) {
                await axios.put(this.servidor + 'DonacionController_Edit.php', this.model)
                .then(() => {
                    this.$toast.success({
                        title: 'Modificación Exitosa',
                        message: 'Se modifico la donacion correctamente'
                    })
                })
                .catch(() => {
                    this.$toast.Error({
                        title: 'Error',
                        message: 'No se puede modificar cambios de la donacion'
                    })
                    return
                });
            } else {
                await axios.post(this.servidor + 'DonacionController_Insert.php', this.model)
                .then(() => {
                    this.$toast.success({
                        title: 'Registro Exitoso',
                        message: 'Se registro la donacion correctamente'
                    })
                })
                .catch(() => {
                    this.$toast.Error({
                        title: 'Error',
                        message: 'No se puede guardar cambios de la donacion'
                    })
                    return
                });
            }
            this.$router.push('/donacion')
        },
        validacion () {
            if (this.validarMascotas && this.validarFundacion && this.validarTipoDonacion && this.validarEstado
            && this.validarFechaDonacion && this.validarCantidad && this.validarDescripcion) {
                return true
            }
            return false
        }
    },
    created: function() {
        if (this.donacion) {
            this.model = {
                ...this.donacion
            }
        }
    }
  }
</script>
<style>
</style>
