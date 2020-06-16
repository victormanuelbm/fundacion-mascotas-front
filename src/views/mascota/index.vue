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
                            <b-table striped
                                     hover
                                     selectable
                                     :fields="camposTablaMascota"
                                     :items="itemsMascota"
                                     @row-selected="seleccionado"
                                     responsive="sm"
                                     selected-variant="active"
                                     select-mode="single">
                                <template slot="fundacion" slot-scope="data">
                                    {{ (fundaciones.find(fundacion => { return fundacion.idFundacion == data.item.idFundacion } )) }}
                                </template>
                                <template slot="historial" slot-scope="data">
                                    <base-button outline type="secondary" @click="formularioHistorial(data.item)" >
                                    <i class="fa fa-plus-circle" aria-hidden="true"></i>
                                    </base-button>
                                    <base-button outline type="danger" @click="eliminarMascota(data.item)" >
                                    <i class="fa fa-trash" aria-hidden="true"></i>
                                    </base-button>
                                </template>
                            </b-table>
                            <div class="text-center" v-if="loader">
                                <vue-loaders name="ball-beat" color="blue" scale="2" class="text-center" />
                            </div>
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

  export default {
    components: {},
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
            { key: 'historial', label: 'Historial'}
        ],
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
        loader: false
      }
    },
    computed: {
        ...mapState(['servidor'])
    },
    methods: {
        async listar () {},
        abrirFormularioRegistro () {
            this.$router.push('/mascota/registro')
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
            this.cargando = false
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
            // this.itemsMascota = []
        },
        async eliminarMascota (mascota) {
            await axios.get(this.servidor + 'MascotaController_Delete.php?idMascota=' + mascota.idMascota).then(response => {
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
        }
    },
    watch: {
    },
    created: async function() {
        this.loader = true
        await this.apiMascotas()
        this.loader = false
    }
  }
</script>