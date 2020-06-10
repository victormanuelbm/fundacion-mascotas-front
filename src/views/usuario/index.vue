<template>
    <div>
        <div class="container-fluid mt--5">
            <div class="row">
                <div class="col-xl-12 order-xl-1">
                    <card shadow type="secondary">
                        <div slot="header" class="bg-white border-0">
                            <div class="row align-items-center">
                                <div class="col-8">
                                    <h3 class="mb-0">Usuarios</h3>
                                </div>
                            </div>
                        </div>
                        <template>
                            <h6 class="heading-small text-muted mb-4">Seleccione para Modificar una usuarios</h6>
                            <div class="text-right" >
                                <base-button outline type="secondary" @click="abrirFormularioRegistro()" >
                                    <i class="fa fa-plus-circle" aria-hidden="true"></i>
                                    Registrar Usuario
                                </base-button>
                            </div>
                            <b-table striped
                                     hover
                                     selectable
                                     :fields="camposTablaUsuario"
                                     :items="itemsUsuario"
                                     @row-selected="seleccionado"
                                     responsive="sm"
                                     selected-variant="active"
                                     select-mode="single">
                                <template slot="idTipoUsuario" slot-scope="data">
                                    {{ (tiposUsuario.find(tipo => { return tipo.idTipoUsuario === data.item.idTipoUsuario } )).nombre }}
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
        itemsUsuario: [
            { idUsuario: 10, idTipoUsuario: 1, nombreUsuario: 'Julian', apellidoUsuario: 'Julian', cedula: '100011245', direccion: 'calle 1N - 4', correo: 'victor@gmail.com', password: '', estado: 1, fechaNacimiento: '19-02-2010', fechaIngreso: '19-02-2010', foto: '' },
            { idUsuario: 20, idTipoUsuario: 2, nombreUsuario: 'Yisel', apellidoUsuario: 'Julian', cedula: '14451444', direccion: 'Ciudad de Dios', correo: 'victor@gmail.com', password: '', estado: 1, fechaNacimiento: '04-07-2018', fechaIngreso: '04-07-2018', foto: '' },
            { idUsuario: 30, idTipoUsuario: 1, nombreUsuario: 'Victor', apellidoUsuario: 'Julian', cedula: '11455478', direccion: 'Narnia', correo: 'victor@gmail.com', password: '', estado: 0, fechaNacimiento: '20-05-2012', fechaIngreso: '20-05-2012', foto: '' }
        ],
        camposTablaUsuario: [
            { key: 'nombreUsuario', label: 'Nombres' },
            { key: 'apellidoUsuario', label: 'Apellidos' },
            { key: 'idTipoUsuario', label: 'Tipo' },
            { key: 'cedula', label: 'Documento' },
            { key: 'direccion', label: 'Direccion' },
            { key: 'correo', label: 'Correo' }
        ],
        tiposUsuario: [
            { idTipoUsuario: 1, nombre: 'Administrador' },
            { idTipoUsuario: 2, nombre: 'Adoptante' },
            { idTipoUsuario: 3, nombre: 'Usuario' },
            { idTipoUsuario: 4, nombre: 'Donante' }
        ],
        loader: false
      }
    },
    computed: {},
    methods: {
        async listar () {},
        abrirFormularioRegistro () {
            this.$router.push('/usuario/registro')
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
                name: 'modificarUsuario',
                params: {
                    usuario: item[0]
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