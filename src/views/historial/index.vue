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
                            <h6 class="heading-small text-muted mb-4">Seleccione para Modificar un Historial</h6>
                            <b-table striped
                                     hover
                                     selectable
                                     :fields="camposTablaHistorial"
                                     :items="itemsHistorial"
                                     @row-selected="seleccionado"
                                     responsive="sm"
                                     selected-variant="active"
                                     :small="true"
                                     select-mode="single">
                                <!--<template slot="fundacion" slot-scope="data">
                                    {{ (fundaciones.find(fundacion => { return fundacion.idFundacion == data.item.idFundacion } )).nombre }}
                                </template>-->
                                <template slot="eliminar" slot-scope="data">
                                    <base-button size="sm" outline type="danger" @click="eliminarHistorial(data.item)" >
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
        itemsHistorial: [],
        camposTablaHistorial: [
            { key: 'fechaHistorialMascota', label: 'Fecha Historial' },
            { key: 'descripcion', label: 'Descripcion' },
            { key: 'Observacion', label: 'Observacion' },
            { key: 'eliminar', label: 'Eliminar'}
        ],
        loader: false
      }
    },
    computed: {
        ...mapState(['servidor'])
    },
    methods: {
        async listar () {},
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
                name: 'modificarHistorialMascota',
                params: {
                    historial: item[0]
                }
            })
        },
        async apiHistoriales () {
            this.cargando = false
            this.itemsHistorial = []
            axios.get(this.servidor + 'HistorialMascotaController_ListAll.php').then(response => {
                if (response.data.result) {
                    this.$toast.error({
                        title: 'Información',
                        message: response.data.result
                    })
                } else {
                    this.itemsHistorial = response.data
                } 
            }).catch(function (error) {
                console.log(error)
            })
        },
        async eliminarHistorial (historial) {
            await axios.post(this.servidor + 'HistorialMascotaController_Delete.php', {
                idHistorialMascota: historial.idHistorialMascota
            }).then(response => {
                this.$toast.success({
                    title: 'Eliminación Exitosa',
                    message: 'Se elimino correctamente.'
                })
                this.apiHistoriales()
            }).catch(function (error) {
                console.log(error)
                this.$toast.error({
                    title: 'Error en la Eliminación',
                    message: 'No se pudo eliminar el historial.'
                })
            })
        }
    },
    watch: {
    },
    created: async function() {
        this.loader = true
        await this.apiHistoriales()
        this.loader = false
    }
  }
</script>