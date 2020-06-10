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
                                                        label="Nombre"
                                                        placeholder="Nombre de la Mascota"
                                                        input-classes="form-control-alternative"
                                                        v-model="model.nombreMascota"
                                                        :valid="validarNombre"
                                            />
                                        </div>
                                        <div class="col-lg-4">
                                            <base-input alternative=""
                                                        label="Edad"
                                                        placeholder="Edad de la Mascota"
                                                        input-classes="form-control-alternative"
                                                        v-model="model.edadMascota"
                                                        :valid="validarEdad"
                                            />
                                        </div>
                                        <div class="col-lg-4">
                                            <base-input label="Especie" :valid="validarEspecie">
                                                <select class="form-control" v-model="model.idEspecie">
                                                    <option v-for="especie in especies" :key="especie.idEspecie" :value="especie.idEspecie" >{{ especie.nombre }}</option>
                                                </select>
                                            </base-input>
                                        </div>
                                        <div class="col-lg-4">
                                            <base-input label="Sexo" :valid="validarSexo">
                                                <select class="form-control" v-model="model.sexoMascota" >
                                                    <option v-for="sexo in tiposSexo" :key="sexo" :value="sexo" >{{ sexo }}</option>
                                                </select>
                                            </base-input>
                                        </div>
                                        <div class="col-lg-4">
                                            <base-input label="Disponibilidad" :valid="validarDisponibilidad">
                                                <select class="form-control" v-model="model.disponibilidadMascota" >
                                                    <option v-for="disponibilidad in tiposDisponibilidad" :key="disponibilidad" :value="disponibilidad" >{{ disponibilidad }}</option>
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
                                            <base-input alternative=""
                                                        label="Fecha de Ingreso"
                                                        placeholder="Fecha de ingreso"
                                                        input-classes="form-control-alternative"
                                                        :valid="validarFechaIngreso">
                                                <flat-picker slot-scope="{focus, blur}"
                                                            @on-open="focus"
                                                            @on-close="blur"
                                                            :config="{allowInput: true}"
                                                            class="form-control datepicker"
                                                            v-model="model.fechaIngreso">
                                                </flat-picker>
                                            </base-input>
                                        </div>
                                        <div class="col-lg-4">
                                            <base-input label="Veterinaria" :valid="validarVeterinaria">
                                                <select class="form-control" v-model="model.idVeterinaria">
                                                    <option v-for="veterinaria in veterinarias" :key="veterinaria.idVeterinaria" :value="veterinaria.idVeterinaria" >{{ veterinaria.nombre }}</option>
                                                </select>
                                            </base-input>
                                        </div>
                                        <div class="col-lg-4">
                                            <base-input alternative=""
                                                        label="Foto de la Mascota"
                                                        input-classes="form-control-alternative">
                                                <b-form-file
                                                    @change="ingresoFile"
                                                    class="btn btn-primary btn-sm" plain
                                                    accept=".jpg, .png, .gif, .jpeg"
                                                    placeholder="Escojer foto..."
                                                    browse-text="Buscar"/>
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
            idMascota: undefined,
            nombreMascota: '',
            edadMascota: '',
            sexoMascota: '',
            diponibilidadMascota: '',
            fechaIngreso: '',
            fechaSalida: '',
            idFundacion: '',
            idVeterinaria: ''
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
        especies: [
            { idEspecie: '1', nombre: 'ave' },
            { idEspecie: '2', nombre: 'mamifero' },
            { idEspecie: '3', nombre: 'Pez' }
        ],
        veterinarias: [
            { idVeterinaria: '1', nombre: 'Vec-terinaria' },
            { idVeterinaria: '2', nombre: 'Pet-terinaria' }
        ],
        tiposSexo: ['Asexual', 'Macho', 'Hembra'],
        tiposDisponibilidad: ['Disponible', 'No Disponible'],
      }
    },
    computed: {
        validarNombre () {
            if (this.model.nombreMascota === '') {
                return false
            }
            else if (this.model.nombreMascota === undefined) {
                return undefined
            }
            return true
        },
        validarEdad () {
            if (this.model.edadMascota === '') {
                return false
            }
            else if (this.model.edadMascota === undefined) {
                return undefined
            }
            return true
        },
        validarSexo () {
            if (this.model.sexoMascota === '' ) {
                return false
            }
            else if (this.model.sexoMascota === undefined) {
                return undefined
            }
            return true
        },
        validarDisponibilidad () {
            if (this.model.disponibilidadMascota === '' ) {
                return false
            }
            else if (this.model.disponibilidadMascota === undefined) {
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
        validarFechaIngreso () {
            if (this.model.fechaIngreso === '') {
                return false
            }
            else if (this.model.fechaIngreso === undefined) {
                return undefined
            }
            return true
        },
        validarVeterinaria () {
            if (this.model.idVeterinaria === '' ) {
                return false
            }
            else if (this.model.idVeterinaria === undefined) {
                return undefined
            }
            return true
        },
        validarEspecie () {
            if (this.model.idEspecie === '' ) {
                return false
            }
            else if (this.model.idEspecie === undefined) {
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
                    title: 'No se puede guardar cambios de la mascota',
                    message: 'Existen campos vacios o no validos dentro del formulario'
                })
                return
            } else {
                this.$toast.success({
                    title: 'Registro Exitoso',
                    message: 'Se registro la mascota correctamente'
                })
            }
        },
        validacion () {
            if (this.validarNombre && this.validarEdad && this.validarSexo && this.validarDisponibilidad
            && this.validarFundacion && this.validarEspecie && this.validarVeterinaria && this.validarFechaIngreso) {
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
