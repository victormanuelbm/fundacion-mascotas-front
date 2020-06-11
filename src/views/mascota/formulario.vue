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
                                                       label="Fecha de Nacimiento"
                                                       placeholder="Fecha de Nacimiento"
                                                       input-classes="form-control-alternative"
                                                        :valid="validarFechaNacimiento">
                                                <flat-picker slot-scope="{focus, blur}"
                                                             @on-open="focus"
                                                             @on-close="blur"
                                                             :config="{allowInput: true}"
                                                             class="form-control datepicker"
                                                             v-model="model.edadMascota">
                                                </flat-picker>
                                            </base-input>
                                        </div>
                                        <div class="col-lg-4">
                                            <base-input label="Especie" :valid="validarEspecie">
                                                <select class="form-control" v-model="model.idEspecie">
                                                    <option v-for="especie in especies" :key="especie.idEspecie" :value="especie.idEspecie" >{{ especie.nombreEspecie }}</option>
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
                                                    <option v-for="fundacion in fundaciones" :key="fundacion.idFundacion" :value="fundacion.idFundacion" >{{ fundacion.nombreFundacion }}</option>
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
                                            <base-input alternative=""
                                                        label="Foto de la Mascota"
                                                        input-classes="form-control-alternative">
                                                <vue-upload-multiple-image
                                                    @upload-success="uploadImageSuccess"
                                                    @before-remove="beforeRemove"
                                                    @edit-image="editImage"
                                                    :data-images="images"
                                                    idUpload="myIdUpload"
                                                    editUpload="myIdEdit"
                                                    dragText="Seleccione o arrastre una foto..."
                                                    browseText="Haz click aqui"
                                                    :maxImage="3"
                                                ></vue-upload-multiple-image>
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
import VueUploadMultipleImage from 'vue-upload-multiple-image'

  export default {
    components: {
      flatPicker,
      VueUploadMultipleImage
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
        fundaciones: [],
        especies: [],
        veterinarias: [
            { idVeterinaria: '1', nombre: 'Vec-terinaria' },
            { idVeterinaria: '2', nombre: 'Pet-terinaria' }
        ],
        tiposSexo: ['Macho', 'Hembra'],
        tiposDisponibilidad: ['1', '0'],
        listaFotos: [],
        images: []
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
        validarFechaNacimiento () {
            if (this.model.edadMascota === '') {
                return false
            }
            else if (this.model.edadMascota === undefined) {
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
    watch : {},
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
                this.model.disponibilidadMascota = undefined
                this.model.fechaSalida = undefined
                await axios.post(this.servidor + 'MascotaController_Edit.php', this.model)
                .then(() => {
                    this.$toast.success({
                        title: 'Modificación Exitosa',
                        message: 'Se modifico la mascota correctamente'
                    })
                    this.insertarImagenes(this.model.idMascota)
                })
                .catch(() => {
                    this.$toast.Error({
                        title: 'Error',
                        message: 'No se puede modificar cambios de la mascota'
                    })
                    return
                });
            } else {
                await axios.post(this.servidor + 'MascotaController_Insert.php', this.model).then(response => {
                    this.$toast.success({
                        title: 'Registro Exitoso',
                        message: 'Se registro la mascota correctamente'
                        })
                        this.insertarImagenes(response.data)
                        this.$router.push('/mascota')
                    }).catch(() => {
                        this.$toast.error({
                            title: 'Error',
                            message: 'No se puede guardar cambios de la mascota'
                        })
                        return
                    });
            }
        },
        validacion () {
            if (this.validarNombre && this.validarEdad && this.validarSexo && this.validarFundacion
                    && this.validarEspecie && this.validarFechaIngreso) {
                return true
            }
            return false
        },
        ingresoFile (event) {
            this.imagen = event.target.files[0]
        },
        async insertarImagenes (idMascota) {
                var formDa = new FormData()
                const arrayFotos = []
                if (this.listaFotos && this.listaFotos.length > 0) {
                    this.listaFotos.forEach((foto, index) => {
                        formDa.append('foto_mascota_ruta_' + (index + 1), foto.path)
                    })
                }
                formDa.append('idMascota', idMascota)
                await axios.post(this.servidor + 'FotoController_Insert_1.php', formDa)
        },
        uploadImageSuccess(formData, index, fileList) {
            this.listaFotos = fileList
        },
        beforeRemove (index, done, fileList) {
            done()
            this.listaFotos = fileList
        },
        editImage (formData, index, fileList) {
            this.listaFotos = fileList
        },
        async getApiFundacion () {
            this.fundaciones = []
            await axios.get(this.servidor + 'FundacionController_ListAll.php').then(response => {
                if (response.data) {
                    response.data.forEach(fundacion => {
                        if (!fundacion.msg) {
                            this.fundaciones.push(fundacion)
                        }
                    })
                }
            }).catch(() => {
                this.$toast.Error({
                    title: 'Error',
                    message: 'No se puede modificar cambios de la mascota'
                })
                return
            });
        },
        async getApiEspecie () {
            this.especies = []
            await axios.get(this.servidor + 'EspecieController_ListAll.php').then(response => {
                if (response.data) {
                    response.data.forEach(especie => {
                        if (!especie.msg) {
                            this.especies.push(especie)
                        }
                    })
                }
            })
        }
    },
    created: function() {
        this.getApiFundacion()
        this.getApiEspecie()
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
