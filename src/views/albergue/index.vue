<template>
    <div>
        <div class="container-fluid mt--5">
            <div class="row">
                <div class="col-xl-12 order-xl-1">
                    <card shadow type="secondary">
                        <div slot="header" class="bg-white border-0">
                            <div class="row align-items-center">
                                <div class="col-8">
                                    <h3 class="mb-0">Albergues</h3>
                                </div>
                            </div>
                        </div>
                        <template>
                            <h6 class="heading-small text-muted mb-4">Seleccione para Modificar un Albergue</h6>
                            <div class="text-right" >
                                <base-button outline type="secondary" @click="abrirFormularioRegistro()" >
                                    <i class="fa fa-plus-circle" aria-hidden="true"></i>
                                    Registrar Albergue
                                </base-button>
                            </div>
                            <b-table striped
                                     hover
                                     selectable
                                     :fields="camposTablaMascota"
                                     :items="itemsAlbergue"
                                     @row-selected="seleccionado"
                                     responsive="sm"
                                     selected-variant="active"
                                     select-mode="single"
                                     :small="true">
                                <template slot="fundacion" slot-scope="data">
                                    {{ (fundaciones.find(fundacion => { return fundacion.idFundacion === data.item.idFundacion } )).nombre }}
                                </template>
                                <template slot="opciones" slot-scope="data">
                                    <base-button outline type="danger" @click="eliminarAlbergue(data.item)" size="sm">
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
        itemsAlbergue: [
            { nombreAlbergue: 'Albergue 1', telefonoAlbergue: '123', direccionAlbergue: 'Calle 25 AN', idFundacion: '1' },
            { nombreAlbergue: 'Albergue 2', telefonoAlbergue: '456', direccionAlbergue: 'Calle 30 AN', idFundacion: '2' },
            { nombreAlbergue: 'Albergue 3', telefonoAlbergue: '789', direccionAlbergue: 'Calle 35 AN', idFundacion: '3' },
        ],
        camposTablaMascota: [
            { key: 'nombreAlbergue', label: 'Albergue' },
            { key: 'telefonoAlbergue', label: 'Teléfono ' },
            { key: 'direccionAlbergue', label: ' Dirección' },
            { key: 'fundacion', label: 'Fundación'},
            { key: 'opciones', label: 'Opciones'}
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
        ...mapState(['servidor']),
    },
    methods: {
        async listar () {},
        abrirFormularioRegistro () {
            this.$router.push({path: 'albergue/registro'})
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
                name: 'modificarAlbergue',
                params: {
                    albergue: item[0]
                }
            })
        },
        async apiAlbergue () {
            this.cargando = false
            this.itemsAlbergue = []
            axios.get(this.servidor + 'AlbergueController_ListAll.php').then(response => {
                if (response.data.result) {
                    this.$toast.error({
                        title: 'Información',
                        message: response.data.result
                    })
                } else {
                    this.itemsAlbergue = response.data
                } 
            }).catch(function (error) {
                console.log(error)
            })
        },
        async eliminarAlbergue (albergue) {
            await axios.post(this.servidor + 'AlbergueController_Delete.php', {
                idAlbergue: albergue.idAlbergue
            }).then(response => {
                this.$toast.success({
                    title: 'Eliminación Exitosa',
                    message: 'Se elimino correctamente.'
                })
                this.apiAlbergue()
            }).catch(function (error) {
                console.log(error)
                this.$toast.error({
                    title: 'Error en la Eliminación',
                    message: 'No se pudo eliminar el albergue.'
                })
            })
        }
    },
    watch: {
    },
    created: async function() {
        this.loader = true
        await this.apiAlbergue()
        this.loader = false
    }
  }
</script>