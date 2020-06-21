<template>
    <div>
        <div class="container-fluid mt--5">
            <div class="row">
                <div class="col-xl-12 order-xl-1">
                    <card shadow type="secondary">
                        <div slot="header" class="bg-white border-0">
                            <div class="row align-items-center">
                                <div class="col-8">
                                    <h3 class="mb-0">Fundación</h3>
                                </div>
                            </div>
                        </div>
                        <template>
                            <h6 class="heading-small text-muted mb-4">Seleccione para Modificar una Fundación</h6>
                            <div class="text-right" >
                                <base-button outline type="secondary" @click="abrirFormularioRegistro()" >
                                    <i class="fa fa-plus-circle" aria-hidden="true"></i>
                                    Registrar Fundación
                                </base-button>
                            </div>
                            <b-table striped
                                     hover
                                     selectable
                                     :fields="camposTablaFundacion"
                                     :items="itemsFundacion"
                                     @row-selected="seleccionado"
                                     responsive="sm"
                                     selected-variant="active"
                                     :small="true"
                                     select-mode="single">
                                <template slot="opciones" slot-scope="data">
                                    <base-button size="sm" outline type="danger" @click="eliminarFundacion(data.item)" >
                                        <i class="fa fa-trash" aria-hidden="true"></i>
                                    </base-button>
                                    <base-button size="sm" outline type="info" @click="gestionarAlbergues(data.item)" >
                                        <i class="fa fa-list" aria-hidden="true"></i>
                                    </base-button>
                                </template>
                                <template slot="fundacion" slot-scope="data">
                                    {{ (fundaciones.find(fundacion => { return fundacion.idFundacion === data.item.idFundacion } )).nombre }}
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
        itemsFundacion: [],
        camposTablaFundacion: [
            { key: 'nombreFundacion', label: 'Fundación' },
            { key: 'direccionFundacion', label: 'Dirección' },
            { key: 'telefonoFundacion', label: ' Teléfono' },
            { key: 'correo', label: 'Correo' },
            { key: 'opciones', label: 'Opciones'}
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
            this.$router.push('/fundacion/registro')
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
                name: 'modificarFundacion',
                params: {
                    fundacion: item[0]
                }
            })
        },
        async apiFundacion () {
            this.cargando = false
            this.itemsFundacion = []
            axios.get(this.servidor + 'FundacionController_ListAll.php').then(response => {
                if (response.data.result) {
                    this.$toast.error({
                        title: 'Información',
                        message: response.data.result
                    })
                } else {
                    response.data.forEach(fundacion => {
                        if (!fundacion.msg) {
                            this.itemsFundacion.push(fundacion)
                        }
                    })
                } 
            }).catch(() => {})
            // this.itemsMascota = []
        },
        async eliminarFundacion (fundacion) {
            await axios.post(this.servidor + 'FundacionController_Delete.php', {
                idFundacion: fundacion.idFundacion
            }).then(() => {
                this.$toast.success({
                    title: 'Eliminación Exitosa',
                    message: 'Se elimino correctamente.'
                })
                this.apiFundacion()
            }).catch(() => {
                this.$toast.error({
                    title: 'Error en la Eliminación',
                    message: 'No se pudo eliminar la fundacion.'
                })
            })
        },
        gestionarAlbergues (fundacion) {
            this.$router.push({
                name: 'albergues',
                params: {
                    fundacion: fundacion
                }
            })
        }
    },
    watch: {
    },
    created: async function() {
        this.loader = true
        await this.apiFundacion()
        this.loader = false
    }
  }
</script>