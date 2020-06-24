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
                                     select-mode="single"
                                     :small="true">
                                <template slot="opciones" slot-scope="data">
                                    <base-button size="sm" outline type="danger" @click="eliminarFundacion(data.item)" >
                                        <i class="fa fa-trash" aria-hidden="true"></i>
                                    </base-button>
                                    <base-button size="sm" @click="resetModal(data.item.idFundacion)" outline type="primary" v-b-modal.modal>
                                        <i class="fab fa-facebook" aria-hidden="true"></i>
                                    </base-button>
                                </template>
                                <template slot="fundacion" slot-scope="data">
                                    {{ (fundaciones.find(fundacion => { return fundacion.idFundacion === data.item.idFundacion } )).nombre }}
                                </template>
                            </b-table>
                            <b-modal @ok="handleOk" id="modal" title="Registro Red Social" ok-title="Registrar" cancel-title="Cancelar">
                                <base-input alternative=""
                                             label="Link de Facebook"
                                             placeholder="Link"
                                             input-classes="form-control-alternative"
                                             v-model="redSocial.url"
                                />
                            </b-modal>

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
        itemsFundacion: [
            { nombreFundacion: 'Animalitos Felices', direccionFundacion: 'Calle 20 # 10', telefonoFundacion: '58994748', nit: '35276374', correo: 'fundacion1@gmail.com', nombrepropietario: 'Diego Navas', idUsuario: 1 },
            { nombreFundacion: 'perritos y gaticos', direccionFundacion: 'av 6 # 7', telefonoFundacion: '5993838', nit: '89045805', correo: 'fundacion2@gmail.com', nombrepropietario: 'Jorge Mojica', idUsuario: 2 },
            { nombreFundacion: 'animals', direccionFundacion: 'clle 7 # 8', telefonoFundacion: '5772939', nit: '5493850', correo: 'fundacion3@gmail.com', nombrepropietario: 'Richard Acevedo', idUsuario: 3 },
        ],
        camposTablaFundacion: [
            { key: 'nombreFundacion', label: 'Fundación' },
            { key: 'direccionFundacion', label: 'Dirección' },
            { key: 'telefonoFundacion', label: ' Teléfono' },
            { key: 'nit', label: 'Nit' },
            { key: 'correo', label: 'Correo Electrónico' },
            { key: 'opciones', label: 'Opciones'}
        ],
        loader: false,
        redSocial: { 
            idRedSocial: undefined,
            nombre: 'facebook',
            url: undefined,
            idFundacion: undefined
        }
      }
    },
    computed: {
        ...mapState(['servidor']),
        validarUrl () {
            if (this.redSocial.url === '') {
                return false
            }
            else if (this.redSocial.url === undefined) {
                return undefined
            }
            return true
        }
    },
    methods: {
        async listar () {},
        async handleOk() {
            console.log(this.redSocial)
            if (!this.validacion()) {
                this.$toast.info({
                    title: 'No se puede guardar cambios de la red social',
                    message: 'Existen campos vacios o no validos dentro del formulario'
                })
                return
            } else {
                await axios.post(this.servidor + 'RedsocialController_Insert.php', this.redSocial)
                .then(response => {
                    this.$toast.success({
                        title: 'Registro Exitoso',
                        message: 'Se registro la red social correctamente'
                    })
                })
                .catch(error => {
                    this.$toast.Error({
                        title: 'Error',
                        message: 'No se puede guardar cambios de la red social'
                    })
                    return
                });
            }
        },
        validacion () {
            if (this.validarUrl) {
                return true
            }
            return false
        },
        resetModal(idF) {
            this.redSocial = { 
                idRedSocial: undefined,
                nombre: 'facebook',
                url: undefined,
                idFundacion: idF
            }
        },
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
            }).catch(function (error) {
                console.log(error)
            })
            // this.itemsMascota = []
        },
        async eliminarFundacion (fundacion) {
            await axios.post(this.servidor + 'FundacionController_Delete.php', {
                idFundacion: fundacion.idFundacion
            }).then(response => {
                this.$toast.success({
                    title: 'Eliminación Exitosa',
                    message: 'Se elimino correctamente.'
                })
                this.apiFundacion()
            }).catch(function (error) {
                console.log(error)
                this.$toast.error({
                    title: 'Error en la Eliminación',
                    message: 'No se pudo eliminar la fundacion.'
                })
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