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
                                <template slot="redsocial" slot-scope="data">
                                    <base-button @click="resetModal(data.item.idFundacion)" outline type="secondary" v-b-modal.modal>
                                        <i class="fa fa-facebook" aria-hidden="true"></i>
                                    </base-button>
                                </template>
                            </b-table>
                            <b-modal @ok="handleOk" id="modal" title="Registro red social" ok-title="Registrar" cancel-title="Cancelar">
                                <p class="my-4">{{ idFundacion }}</p>
                                 <base-input alternative=""
                                                        label="Link de Facebook"
                                                        placeholder="Link de Facebook"
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
  export default {
    components: {},
    name: 'index',
    data() {
      return {
        itemsMascota: [
            {
	    idFundacion:"1",
	    nombreFundacion:"FundacionAmigos",
	    direccionFundacion:"cll8 #98-22",
	    telefonoFundacion:"5742829",
	    nit:"925689380-2",
	    correo:"fundaamigos@gmail.com",
	    nombrepropietario:"Prueba",
	    idUsuario:"3"
	       }
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
            { idFundacion: '1', nombre: 'Fundacion las Puertas del Cielo' }
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
        loader: false,
        redSocial: { 
            idRedSocial: undefined,
            nombre: 'facebook',
            url: undefined,
            idFundacion: undefined
         }
      }
    },
    computed: {},
    methods: {
        async listar () {},
        handleOk() {
            console.log(this.redSocial)
        },
        resetModal(idFundacion) {
            this.redSocial = { 
                idRedSocial: undefined,
                nombre: 'facebook',
                url: undefined,
                idFundacion: idFundacion
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