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
                                     :fields="camposTablaMascota"
                                     :items="itemsMascota"
                                     @row-selected="seleccionado"
                                     responsive="sm"
                                     selected-variant="active"
                                     select-mode="single">
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
  export default {
    components: {},
    name: 'index',
    data() {
      return {
        itemsMascota: [
            { nombreFundacion: 'Animalitos Felices', direccionFundacion: 'Calle 20 # 10', telefonoFundacion: '58994748', nit: '35276374', correo: 'fundacion1@gmail.com', nombrepropietario: 'Diego Navas', idUsuario: 1 },
            { nombreFundacion: 'perritos y gaticos', direccionFundacion: 'av 6 # 7', telefonoFundacion: '5993838', nit: '89045805', correo: 'fundacion2@gmail.com', nombrepropietario: 'Jorge Mojica', idUsuario: 2 },
            { nombreFundacion: 'animals', direccionFundacion: 'clle 7 # 8', telefonoFundacion: '5772939', nit: '5493850', correo: 'fundacion3@gmail.com', nombrepropietario: 'Richard Acevedo', idUsuario: 3 },
        ],
        camposTablaMascota: [
            { key: 'nombreFundacion', label: 'Fundación' },
            { key: 'direccionFundacion', label: 'Dirección' },
            { key: 'telefonoFundacion', label: ' Teléfono' },
            { key: 'nit', label: 'Nit' },
            { key: 'correo', label: 'Correo Electrónico' },
            { key: 'nombrepropietario', label: 'Propietario?'}
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