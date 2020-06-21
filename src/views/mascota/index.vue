<template>
    <div>
        <div class="container-fluid mt--5">
            <div class="row">
                <div class="col-xl-12 order-xl-1">
                    <card shadow type="secondary">
                        <div slot="header" class="bg-white border-0">
                            <div class="row align-items-center">
                                <div class="col-8">
                                    <h3 class="mb-0">Mascotas</h3>
                                </div>
                            </div>
                        </div>
                        <template>
                            <h6 class="heading-small text-muted mb-4">Seleccione para Modificar una Mascota</h6>
                            <div class="text-right" >
                                <base-button outline type="secondary" @click="abrirFormularioRegistro()" >
                                    <i class="fa fa-plus-circle" aria-hidden="true"></i>
                                    Registrar Mascota
                                </base-button>
                            </div>
                            <div class="text-center" v-if="loader">
                                <vue-loaders name="ball-beat" color="blue" scale="2" class="text-center" />
                            </div>
                            <b-table striped
                                     hover
                                     selectable
                                     :fields="camposTablaMascota"
                                     :items="itemsMascota"
                                     @row-selected="seleccionado"
                                     responsive="sm"
                                     selected-variant="active"
                                     :busy="loader"
                                     :small="true"
                                     v-if="!loader">
                                <template slot="fundacion" slot-scope="data">
                                    {{ (fundaciones.find(fundacion => { return fundacion.idFundacion == data.item.idFundacion } )).nombreFundacion }}
                                </template>
                                <template slot="historial" slot-scope="data">
                                    <base-button size="sm" outline type="success" @click="formularioHistorial(data.item)" >
                                    <i class="fa fa-plus-circle" aria-hidden="true"></i>
                                    </base-button>
                                    <base-button size="sm" outline type="danger" @click="eliminarMascota(data.item)" >
                                    <i class="fa fa-trash" aria-hidden="true"></i>
                                    </base-button>
                                    <b-button size="sm" type="secondary" @click="mostrarImagenMascote(data)" class="mr-2">
                                        {{ data.detailsShowing ? 'Ocultar' : 'Ver'}}
                                    </b-button>
                                </template>
                                <template slot="row-details" slot-scope="row">
                                    <b-row align-v="start">
                                        <b-col v-for="foto in row.item.fotos" :key="foto.idMascota" cols="2">
                                            <foto :imagen="foto.foto_mascota_ruta"/>
                                        </b-col>
                                    </b-row>
                                </template>
                            </b-table>
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
import foto from './foto'
import VueUploadMultipleImage from 'vue-upload-multiple-image'

  export default {
    components: {
        foto,
        VueUploadMultipleImage
    },
    name: 'index',
    data() {
      return {
        itemsMascota: [
            { idEspecie: '1', nombreMascota: 'Roger', edadMascota: '5 años', sexoMascota: 'Macho', disponibilidadMascota: 'Disponible', idFundacion: '1', fechaIngreso: '19-02-2010', fechaSalida: undefined, idVeterinaria: '1' },
            { idEspecie: '2', nombreMascota: 'Firulais', edadMascota: '4 años', sexoMascota: 'Macho', disponibilidadMascota: 'Disponible', idFundacion: '2', fechaIngreso: '04-07-2018', fechaSalida: undefined, idVeterinaria: '2' },
            { idEspecie: '3', nombreMascota: 'Fly Fly', edadMascota: '10 años', sexoMascota: 'Hembra', disponibilidadMascota: 'Disponible', idFundacion: '3', fechaIngreso: '20-05-2012', fechaSalida: undefined, idVeterinaria: '1' },
        ],
        camposTablaMascota: [
            { key: 'nombreMascota', label: 'Mascota' },
            { key: 'edadMascota', label: 'Edad ' },
            { key: 'sexoMascota', label: ' Sexo' },
            { key: 'fundacion', label: 'Fundacion' },
            { key: 'historial', label: 'Opciones'}
        ],
        fundaciones: [
        ],
        especies: [],
        veterinarias: [
            { idVeterinaria: '1', nombre: 'Vec-terinaria' },
            { idVeterinaria: '2', nombre: 'Pet-terinaria' }
        ],
        loader: false,
        images: []
      }
    },
    computed: {
        ...mapState(['servidor'])
    },
    methods: {
        async listar () {},
        abrirFormularioRegistro () {
            this.$router.push({name: 'registroMascota'})
        },
        formatearItems (usuarios) {
            const self = this
            usuarios.forEach( function(usuario) {
                const item = {
                    ...usuario.usuario,
                    cargo: usuario.cargo.nombre
                }
                self.itemsUsuarios.push(item)
            })
        },
        seleccionado (item) {
            this.$router.push({
                name: 'modificarMascota',
                params: {
                    mascota: item[0]
                }
            })
        },
        formularioHistorial (mascota) {
            console.log(mascota)
        },
        async apiMascotas () {
            this.loader = true
            this.itemsMascota = []
            axios.get(this.servidor + 'MascotaController_ListAll.php').then(response => {
                if (response.data.result) {
                    this.$toast.error({
                        title: 'Información',
                        message: response.data.result
                    })
                } else {
                    this.itemsMascota = response.data
                } 
            }).catch(function (error) {
                console.log(error)
            })
            this.loader = false
            // this.itemsMascota = []
        },
        async eliminarMascota (mascota) {
            await axios.post(this.servidor + 'MascotaController_Delete.php', {
                idMascota: mascota.idMascota
            }).then(response => {
                this.$toast.success({
                    title: 'Eliminación Exitosa',
                    message: 'Se elimino correctamente.'
                })
                this.apiMascotas()
            }).catch(function (error) {
                console.log(error)
                this.$toast.error({
                    title: 'Error en la Eliminación',
                    message: 'No se pudo eliminar la mascota.'
                })
            })
        },
        async mostrarImagenMascote(dataRow) {
            this.loader = true
            if (!dataRow.item.fotos) {
                await axios.post(this.servidor + 'FotoController_ListById.php',{
                    idMascota: dataRow.item.idMascota
                }).then(response => {
                    dataRow.item.fotos = response.data
                }).catch(function (error) {
                    console.log(error)
                })
            }
            dataRow.toggleDetails()
            this.loader = false
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
            })
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
    watch: {
    },
    created: async function() {
        this.loader = true
        await this.getApiFundacion()
        await this.getApiEspecie()
        await this.apiMascotas()
        this.loader = false
    }
  }
</script>