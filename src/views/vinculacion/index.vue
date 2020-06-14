<template>
    <div>
        <div class="container-fluid mt--5">
            <div class="row">
                <div class="col-xl-12 order-xl-1">
                    <card shadow type="secondary">
                        <div slot="header" class="bg-white border-0">
                            <div class="row align-items-center">
                                <div class="col-8">
                                    <h3 class="mb-0">Vinculaciones</h3>
                                </div>
                            </div>
                        </div>
                        <template>
                            <h6 class="heading-small text-muted mb-4">Seleccione para Modificar una VInculacion</h6>
                            <div class="text-right" >
                                <base-button outline type="secondary" @click="abrirFormularioRegistro()" >
                                    <i class="fa fa-plus-circle" aria-hidden="true"></i>
                                    Registrar VInculacion
                                </base-button>
                            </div>
                            <b-table striped
                                     hover
                                     selectable
                                     :fields="camposTablaVinculacion"
                                     :items="itemsVinculacion"
                                     @row-selected="seleccionado"
                                     responsive="sm"
                                     selected-variant="active"
                                     select-mode="single">
                                <template slot="vinculacion" slot-scope="data">
                                    {{ (Vinculaciones.find(vinculacion => { return vinculacion.idVeterinaria === data.item.idVeterinaria } )).nombre }}
                                </template>
                                <template slot="historial" slot-scope="data">
                                    <base-button outline type="secondary" @click="formularioHistorial(data.item)" >
                                    <i class="fa fa-plus-circle" aria-hidden="true"></i>
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
  export default {
    components: {},
    name: 'index',
    data() {
      return {
        itemsVinculacion: [
            { idVeterinaria: '1', nombreVinculacion: 'Roger', direccion: '5 años', nit: 'Macho', telefono: 'Disponible' },
            { idVeterinaria: '2', nombreVinculacion: 'Firulais', direccion: '4 años', nit: 'Macho', telefono: 'Disponible' },
            { idVeterinaria: '3', nombreVinculacion: 'Fly Fly', direccion: '10 años', nit: 'Hembra', telefono: 'Disponible' },
        ],
        camposTablavinculacion: [
            { key: 'idVeterinaria', label: 'ID' },
            { key: 'nombreVinculacion', label: 'Vincualcion ' },
            { key: 'direccion', label: ' Direccion' },
            { key: 'nit', label: 'NIT' },
            { key: 'telefono', label: 'Telefono' }
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
    computed: {},
    methods: {
        async listar () {},
        abrirFormularioRegistro () {
            this.$router.push('/vinculacion/registro')
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
                name: 'modificarvinculacion',
                params: {
                    vinculacion: item[0]
                }
            })
        },
        formularioHistorial (vinculacion) {
            console.log(vinculacion)
        }
    },
    watch: {
    },
    created: async function() {
        this.loader = true
        await this.listar()
        this.loader = false
    }
  }
</script>