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
                                    <base-button size="sm" outline type="success" @click="resetModal(data.item.idMascota)" v-b-modal.modal>
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
                            <b-modal @ok="handleOk" id="modal" title="Registro Historial Mascota" ok-title="Registrar" cancel-title="Cancelar">
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
                                                            v-model="historialMascota.fechaHistorialMascota">
                                                </flat-picker>
                                </base-input>
                                <base-input alternative=""
                                                        label="Observación"
                                                        placeholder="Observación"
                                                        input-classes="form-control-alternative"
                                                        v-model="historialMascota.Observacion"
                                                        :valid="validarObservacion"
                                            />
                                <base-input alternative=""
                                                        label="Descripción"
                                                        input-classes="form-control-alternative" 
                                                        :valid="validarDescripcion">
                                    <b-form-textarea
                                                    alternative=""
                                                    placeholder="Descripción del historial"
                                                    v-model="historialMascota.descripcion"
                                                    rows="6"
                                                    no-resize
                                    ></b-form-textarea>
                                </base-input>
                            </b-modal>
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
import foto from './foto'

  export default {
    components: {
        foto,
        flatPicker
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
        historialMascota: {
            idHistorialMascota: undefined,
            fechaHistorialMascota: '',
            descripcion: '',
            Observacion: '',
            idMascota: undefined
        },
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
        ...mapState(['servidor']),
        validarDescripcion () {
            if (this.historialMascota.descripcion === '') {
                return false
            }
            else if (this.historialMascota.descripcion === undefined) {
                return undefined
            }
            return true
        },
        validarObservacion () {
            if (this.historialMascota.Observacion === '') {
                return false
            }
            else if (this.historialMascota.Observacion === undefined) {
                return undefined
            }
            return true
        },
        validarFechaHistorialMascota () {
            if (this.historialMascota.fechaHistorialMascota === '') {
                return false
            }
            else if (this.historialMascota.fechaHistorialMascota === undefined) {
                return undefined
            }
            return true
        }
    },
    methods: {
        async listar () {},
        async handleOk() {
            console.log(this.historialMascota)
            if (!this.validacion()) {
                this.$toast.info({
                    title: 'No se puede guardar cambios del historial',
                    message: 'Existen campos vacios o no validos dentro del formulario'
                })
                return
            } else {
                await axios.post(this.servidor + 'HistorialMascotaController_Insert.php', this.historialMascota)
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
            }
        },
        validacion () {
            if (this.validarDescripcion && this.validarFechaHistorialMascota && this.validarObservacion) {
                return true
            }
            return false
        },
        resetModal(idM) {
            this.historialMascota = { 
                idHistorialMascota: undefined,
                fechaHistorialMascota: undefined,
                descripcion: undefined,
                Observacion: undefined,
                idMascota: idM
            }
        },
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
        /*formularioHistorial (item) {
            this.$router.push({
                name: 'registroHistorialMascota',
                params: {
                    mascota: item[0]
                }
            })
        },*/
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
            }).catch(() => {})
            this.loader = false
        },
        async eliminarMascota (mascota) {
            await axios.post(this.servidor + 'MascotaController_Delete.php', {
                idMascota: mascota.idMascota
            }).then(() => {
                this.$toast.success({
                    title: 'Eliminación Exitosa',
                    message: 'Se elimino correctamente.'
                })
                this.apiMascotas()
            }).catch(() => {
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
                }).catch(() => {})
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