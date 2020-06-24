<template>
    <div>
        <div class="container-fluid mt--5">
            <div class="row">
                <div class="col-xl-12 order-xl-1">
                    <card shadow type="secondary">
                        <div slot="header" class="bg-white border-0">
                            <div class="row align-items-center">
                                <div class="col-8">
                                    <h3 class="mb-0">Formulario de Fundaciones</h3>
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
                                                        placeholder="Nombre de la Fundación"
                                                        input-classes="form-control-alternative"
                                                        v-model="model.nombreFundacion"
                                                        :valid="validarNombre"
                                            />
                                        </div>
                                        <div class="col-lg-4">
                                            <base-input alternative=""
                                                        label="Dirección"
                                                        placeholder="Dirección de la fundación"
                                                        input-classes="form-control-alternative"
                                                        v-model="model.direccionFundacion"
                                                        :valid="validarDireccion"
                                            />
                                        </div>
                                        <div class="col-lg-4">
                                            <base-input alternative=""
                                                        label="Telefono"
                                                        placeholder="Telefono de la fundación"
                                                        input-classes="form-control-alternative"
                                                        v-model="model.telefonoFundacion"
                                                        :valid="validarTelefono"
                                            />
                                        </div>
                                        <div class="col-lg-4">
                                            <base-input alternative=""
                                                        label="Nit"
                                                        placeholder="Nit de la fundación"
                                                        input-classes="form-control-alternative"
                                                        v-model="model.nit"
                                                        :valid="validarNIT"
                                            />
                                        </div>
                                        <div class="col-lg-4">
                                            <base-input alternative=""
                                                        label="Correo"
                                                        placeholder="Correo Eletrónico de la fundación"
                                                        input-classes="form-control-alternative"
                                                        v-model="model.correo"
                                                        :valid="validarCorreo"
                                            />
                                        </div>
                                        <div class="col-lg-4">
                                            <base-input alternative=""
                                                        label="Propietario"
                                                        placeholder="Nombre del Propietario"
                                                        input-classes="form-control-alternative"
                                                        v-model="model.nombrepropietario"
                                                        :valid="validarPropietario"
                                            />
                                        </div>
                                        <div class="col-lg-4">
                                            <base-input label="Usuarios" :valid="validarUsuario">
                                                <select class="form-control" v-model="model.idUsuario">
                                                    <option v-for="usuario in usuarios" :key="usuario.idUsuario" :value="usuario.idUsuario" >{{ usuario.nombreUsuario }}</option>
                                                </select>
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
                                                    :maxImage="1"
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
import 'flatpickr/dist/flatpickr.css'
import axios from 'axios'
import {mapState} from 'vuex'
import VueUploadMultipleImage from 'vue-upload-multiple-image'

  export default {
    components: {VueUploadMultipleImage},
    name: 'registro',
    props: {
        fundacion: {
            type: Object,
            required: false
        }
    },
    data() {
      return {
        model: {
            idFundacion: undefined,
            nombreFundacion: '',
            direccionFundacion: '',
            telefonoFundacion: '',
            nit: '',
            correo: '',
            nombrepropietario: '', 
            idUsuario:''
        },
        fotografia: {
            base64: '',
            id: null,
            extension: ''
        },
        imagen: undefined,
        usuarios: [],
        listaFotos: [],
        images: undefined
      }
    },
    computed: {
        ...mapState(['servidor']),
        validarNombre () {
            if (this.model.nombreFundacion === '') {
                return false
            }
            else if (this.model.nombreFundacion === undefined) {
                return undefined
            }
            return true
        },
        validarDireccion () {
            if (this.model.direccionFundacion === '') {
                return false
            }
            else if (this.model.direccionFundacion === undefined) {
                return undefined
            }
            return true
        },
        validarTelefono () {
            if (this.model.telefonoFundacion === '' ) {
                return false
            }
            else if (this.model.telefonoFundacion === undefined) {
                return undefined
            }
            return true
        },
        validarNIT () {
            if (this.model.nit === '' ) {
                return false
            }
            else if (this.model.nit === undefined) {
                return undefined
            }
            return true
        },
        validarCorreo () {
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
        validarPropietario () {
            if (this.model.nombrepropietario === '') {
                return false
            }
            else if (this.model.nombrepropietario === undefined) {
                return undefined
            }
            return true
        },
        
        validarUsuario () {
            if (this.model.idUsuario === '' ) {
                return false
            }
            else if (this.model.idUsuario === undefined) {
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
                    title: 'No se puede guardar cambios los cambios de la fundación',
                    message: 'Existen campos vacios o no validos dentro del formulario'
                })
                return
            }
            if (this.fundacion) {
                await axios.put(this.servidor + 'FundacionController_Edit.php', this.model)
                .then(() => {
                    this.$toast.success({
                        title: 'Modificación Exitosa',
                        message: 'Se modifico la fundacion correctamente'
                    })
                    this.insertarImagenes(this.fundacion.idFundacion)
                })
                .catch(() => {
                    this.$toast.error({
                        title: 'Error',
                        message: 'No se puede modificar cambios de la fundación'
                    })
                    return
                });
            } else {
                await axios.post(this.servidor + 'FundacionController_Insert.php', this.model)
                .then(response => {
                    this.$toast.success({
                        title: 'Registro Exitoso',
                        message: 'Se registro la fundación correctamente'
                    })
                    this.insertarImagenes(response.data[0])
                })
                .catch(() => {
                    this.$toast.error({
                        title: 'Error',
                        message: 'No se puede guardar cambios de la fundación'
                    })
                    return
                });
            }
            this.$router.push('/fundacion')
        },
        async insertarImagenes (idFundacion) {
                var formDa = new FormData()
                const arrayFotos = []
                if (this.listaFotos && this.listaFotos.length > 0) {
                    this.listaFotos.forEach((foto, index) => {
                        formDa.append('fundacion_foto_ruta_1', foto.path)
                    })
                }
                formDa.append('idFundacion', idFundacion)
                await axios.post(this.servidor + 'Fundacion_fotoController_1.php', formDa)
        },
        validacion () {
            if (this.validarNombre && this.validarDireccion && this.validarTelefono && this.validarNIT
            && this.validarCorreo && this.validarPropietario && this.validarUsuario) {
                return true
            }
            return false
        },
        async getApiUsuario () {
            this.usuarios = []
            await axios.get(this.servidor + 'UsuarioController_List.php').then(response => {
                if (response.data) {
                    response.data.forEach(usuario => {
                        if (!usuario.msg) {
                            this.usuarios.push(usuario)
                        }
                    })
                }
            })
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
        }
    },
    created: async function() {
        await this.getApiUsuario()
        if (this.fundacion) {
            this.model = {
                ...this.fundacion
            }
        }
    }
  }
</script>
<style>
</style>
