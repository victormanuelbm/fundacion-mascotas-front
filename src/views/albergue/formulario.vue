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
                                                        label="Albergue"
                                                        placeholder="Nombre del Albergue"
                                                        input-classes="form-control-alternative"
                                                        v-model="model.nombreAlbergue"
                                                        :valid="validarNombre"
                                            />
                                        </div>
                                        <div class="col-lg-4">
                                            <base-input alternative=""
                                                        label="Teléfono"
                                                        placeholder="Teléfono del Albergue"
                                                        input-classes="form-control-alternative"
                                                        v-model="model.telefonoAlbergue"
                                                        :valid="validarTelefono"
                                            />
                                        </div>
                                        <div class="col-lg-4">
                                            <base-input alternative=""
                                                        label="Dirección"
                                                        placeholder="Dirección del Albergue"
                                                        input-classes="form-control-alternative"
                                                        v-model="model.direccionAlbergue"
                                                        :valid="validarDireccion"
                                            />
                                        </div>
                                        <div class="col-lg-4">
                                            <base-input label="Fundación" :valid="validarFundacion">
                                                <select class="form-control" v-model="model.idFundacion">
                                                    <option v-for="fundacion in fundaciones" :key="fundacion.idFundacion" :value="fundacion.idFundacion" >{{ fundacion.nombre }}</option>
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
import axios from 'axios'
import {mapState} from 'vuex'
  export default {
    components: {
      flatPicker
    },
    name: 'registro',
    props: {
        albergue: {
            type: Object,
            required: false
        }
    },
    data() {
      return {
        model: {
            idAlbergue: undefined,
            nombreAlbergue: '',
            telefonoAlbergue: '',
            direccionAlbergue: '',
            idFundacion: ''
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
      }
    },
    computed: {
        ...mapState(['servidor']),
        validarNombre () {
            if (this.model.nombreAlbergue === '') {
                return false
            }
            else if (this.model.nombreAlbergue === undefined) {
                return undefined
            }
            return true
        },
        validarTelefono () {
            if (this.model.telefonoAlbergue === '') {
                return false
            }
            else if (this.model.telefonoAlbergue === undefined) {
                return undefined
            }
            return true
        },
        validarDireccion () {
            if (this.model.direccionAlbergue === '' ) {
                return false
            }
            else if (this.model.direccionAlbergue === undefined) {
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
    },
    methods: {
        ingresoFile () {},
        subirImagen () {},
        async actualizarFoto () {},
        async guardarCambios () {
            if (!this.validacion()) {
                this.$toast.info({
                    title: 'No se puede guardar cambios del albergue',
                    message: 'Existen campos vacios o no validos dentro del formulario'
                })
                return
            }
            if (this.albergue) {
                console.log('this.albergue')
                console.log(this.albergue)
                await axios.put(this.servidor + 'AlbergueController_Edit.php', this.model)
                .then(response => {
                    this.$toast.success({
                        title: 'Modificación Exitosa',
                        message: 'Se modifico el albergue correctamente'
                    })
                })
                .catch(error => {
                    this.$toast.Error({
                        title: 'Error',
                        message: 'No se puede modificar cambios del albergue'
                    })
                    return
                });
            } else {
                await axios.post(this.servidor + 'AlbergueController_Insert.php', this.model)
                .then(response => {
                    this.$toast.success({
                        title: 'Registro Exitoso',
                        message: 'Se registro el albergue correctamente'
                    })
                })
                .catch(error => {
                    this.$toast.Error({
                        title: 'Error',
                        message: 'No se puede guardar cambios del albergue'
                    })
                    return
                });
            }
            this.$router.push('/albergue')
        },
        validacion () {
            if (this.validarNombre && this.validarTelefono && this.validarDireccion && this.validarFundacion) {
                return true
            }
            return false
        }
    },
    created: function() {
        if (this.albergue) {
            this.model = {
                ...this.albergue
            }
        }
    }
  }
</script>
<style>
</style>
