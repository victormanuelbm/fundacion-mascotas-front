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
                                                    class="btn btn-primary btn-sm" plain
                                                    accept="image/*"
                                                    placeholder="Escojer foto..."
                                                    browse-text="Buscar"
                                                    @change="ingresoFile"/>
                                            </base-input>
                                        </div>
                                    </div>
                                    <div class="text-right" >
                                        <base-button outline @click="insertarImagenes(61)" type="success">Guardar Cambios</base-button>
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
            idEspecie: '',
            edadMascota: '',
            sexoMascota: '',
            fechaIngreso: '',
            idFundacion: '',
            idVeterinaria: '',
            file: ''
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
            { idEspecie: '1', nombre: 'Mamifero Heterosexual' },
            { idEspecie: '2', nombre: 'Reptil' },
            { idEspecie: '3', nombre: 'Pez' }
        ],
        veterinarias: [
            { idVeterinaria: '1', nombre: 'Vec-terinaria' },
            { idVeterinaria: '2', nombre: 'Pet-terinaria' }
        ],
        tiposSexo: ['Asexual', 'Macho', 'Hembra'],
        tiposDisponibilidad: ['1', '0'],
      }
    },
    computed: {
        ...mapState(['servidor']),
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
        subirImagen () {},
        async guardarCambios () {
            if (!this.validacion()) {
                this.$toast.info({
                    title: 'No se puede guardar cambios de la mascota',
                    message: 'Existen campos vacios o no validos dentro del formulario'
                })
                return
            }
            if (this.mascota) {
                console.log('this.mascota')
                this.model.disponibilidadMascota = undefined
                this.model.fechaSalida = undefined
                /*await axios.post(this.servidor + 'MascotaController_Edit.php', this.model)
                .then(response => {
                    
                    this.$toast.success({
                        title: 'Modificación Exitosa',
                        message: 'Se modifico la mascota correctamente'
                    })
                })
                .catch(error => {
                    this.$toast.Error({
                        title: 'Error',
                        message: 'No se puede modificar cambios de la mascota'
                    })
                    return
                });*/
            } else {
                await axios.post(this.servidor + 'MascotaController_Insert.php', this.model).then(response => {
                    this.$toast.success({
                        title: 'Registro Exitoso',
                        message: 'Se registro la mascota correctamente'
                        })
                        this.insertarImagenes(response.data)
                    }).catch(error => {
                    this.$toast.error({
                        title: 'Error',
                        message: 'No se puede guardar cambios de la mascota'
                    })
                    return
                });
            }
            // this.$router.push('/mascota')
        },
        validacion () {
            if (this.validarNombre && this.validarEdad && this.validarSexo && this.validarFundacion
                    && this.validarEspecie && this.validarVeterinaria && this.validarFechaIngreso) {
                return true
            }
            return false
        },
        ingresoFile (event) {
            this.imagen = event.target.files[0]
        },
        subirImagen () {
            const file = this.imagen
            let reader = new FileReader()
            const self = this
            let cadena = ''
            this.fotografia.extension = file.type
            let variable = '---'
            reader.onloadend = (file) => {
                self.actualizarFoto(reader.result)
            }
            variable = reader.readAsDataURL(file)
        },
        async actualizarFoto (base64) {
            console.log( base64)
            console.log('-----------------------------')
            const parametros = {
                extension: this.fotografia.extension,
                id: null,
                base64: base64
            }
        },
        async insertarImagenes (idMascota) {
            if (this.imagen) {
                // this.subirImagen()
                const file = this.imagen
                let reader = new FileReader()
                const self = this
                let cadena = ''
                this.fotografia.extension = file.type
                let variable = '---'
                reader.onloadend = (file) => {
                    console.log('variable')
                    console.log( reader.result)
                    axios.post(this.servidor + 'FotoController_Insert.php', {
                        idMascota: idMascota,
                        foto_mascota_ruta: reader.result
                    }).then(response => {
                        this.$toast.success({
                            title: 'Registro Exitoso',
                            message: 'Se registro la imaganes de la mascota correctamente'
                        })
                    }).catch(error => {
                        this.$toast.error({
                            title: 'Error',
                            message: 'No se pudo guardar la imagen de la mascota'
                        })
                        return
                    });
                }
                variable = await reader.readAsDataURL(file)
                console.log(variable)
                }
        }
        /*await axios.put(this.servidorAcceso + 'usuarios/personas/' + this.model.numeroDocumento + '/fotografia', {
            ...parametros
        }).then(response => (
            this.$toast.success({
                title: 'Actualizacion Exitosa',
                message: 'Se actualizo la foto con exito'
            })
        ))*/
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
