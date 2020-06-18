<template>
    <div>
        <div class="container-fluid mt--5">
            <div class="row">
                <div class="col-xl-12 order-xl-1">
                    <card shadow type="secondary">
                        <div slot="header" class="bg-white border-0">
                            <div class="row align-items-center">
                                <div class="col-8">
                                    <h3 class="mb-0">Donaciones</h3>
                                </div>
                            </div>
                        </div>
                        <template>
                            <h6 class="heading-small text-muted mb-4">Seleccione para Modificar una Donación</h6>
                            <div class="text-right" >
                                <base-button outline type="secondary" @click="abrirFormularioRegistro()" >
                                    <i class="fa fa-plus-circle" aria-hidden="true"></i>
                                    Registrar Donación
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
                                <template slot="mascota" slot-scope="data">
                                    {{ (mascotas.find(mascota => { return mascota.idMascota === data.item.idMascota } )).nombre }}
                                </template>
                                <template slot="tipodonacion" slot-scope="data">
                                    {{ (tipodonaciones.find(tipodonacion => { return tipodonacion.idTipoDonacion === data.item.idTipoDonacion } )).nombre }}
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
            { idMascota: '1', idFundacion: '1', fechaDonacion: '19-02-2010', cantidad: 1, descripcion: 'Voy a donar juguetes', idTipoDonacion: '1' },
            { idMascota: '2', idFundacion: '2', fechaDonacion: '19-02-2010', cantidad: 2, descripcion: 'Voy a donar Medicina', idTipoDonacion: '2' },
            { idMascota: '3', idFundacion: '3', fechaDonacion: '19-02-2010', cantidad: 3, descripcion: 'Voy a donar Dinero', idTipoDonacion: '3' },
        ],
        camposTablaMascota: [
            { key: 'mascota', label: 'Mascota' },
            { key: 'fundacion', label: 'Fundacion ' },
            { key: 'fechaDonacion', label: ' Fecha' },
            { key: 'cantidad', label: 'Cantidad' },
            { key: 'descripcion', label: 'Descripcion' },
            { key: 'tipodonacion', label: 'Tipo de Donación' }
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
        mascotas: [
            { idMascota: '1', nombre: 'Molly' },
            { idMascota: '2', nombre: 'Candy' },
            { idMascota: '3', nombre: 'Sasha' }
        ],
        tipodonaciones: [
            { idTipoDonacion: '1', nombre: 'Juguetes' },
            { idTipoDonacion: '2', nombre: 'Medicina' },
            { idTipoDonacion: '3', nombre: 'Dinero' }
        ],
        loader: false
      }
    },
    computed: {},
    methods: {
        async listar () {},
        abrirFormularioRegistro () {
            this.$router.push('/donacion/registro')
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
                name: 'modificarDonacion',
                params: {
                    donacion: item[0]
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