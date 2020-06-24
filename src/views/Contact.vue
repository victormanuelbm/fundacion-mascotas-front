<template>
<div class="container">
	<div class="container">
    <h2 class="text-center">Contac Form</h2>
	<div class="row justify-content-center">
		<div class="col-12 col-md-8 col-lg-6 pb-5">


                    <!--Form with header-->

                    <form action="mail.php" method="post">
                        <div class="card border-primary rounded-0">
                            <div class="card-header p-0">
                                <div class="bg-info text-white text-center py-2">
                                    <h3><i class="fa fa-envelope"></i> Contactanos</h3>
                                    <p class="m-0">Con gusto te ayudaremos</p>
                                </div>
                            </div>
                            <div class="card-body p-3">

                                <!--Body-->
                                <div class="form-group">
                                    <div class="input-group mb-2">
                                        <div class="input-group-prepend">
                                            <div class="input-group-text"><i class="fa fa-user text-info"></i></div>
                                        </div>
                                        <input type="text" class="form-control" id="nombre" name="nombre" placeholder="Nombre y Apellido" required>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <div class="input-group mb-2">
                                        <div class="input-group-prepend">
                                            <div class="input-group-text"><i class="fa fa-envelope text-info"></i></div>
                                        </div>
                                        <input type="email" class="form-control" id="nombre" name="email" placeholder="ejemplo@gmail.com" required>
                                    </div>
                                </div>

                                <div class="form-group">
                                    <div class="input-group mb-2">
                                        <div class="input-group-prepend">
                                            <div class="input-group-text"><i class="fa fa-comment text-info"></i></div>
                                        </div>
                                        <textarea class="form-control" placeholder="Envianos tu Mensaje" required></textarea>
                                    </div>
                                </div>

                                <div class="text-center">
                                    <input type="submit" value="Enviar" class="btn btn-info btn-block rounded-0 py-2">
                                </div>
                            </div>

                        </div>
                    </form>
                    <!--Form with header-->


                </div>
	</div>
</div>
</div>
</template>
<script>
import {mapState, mapMutations} from 'vuex'
  export default {
    name: 'login',
    data() {
      return {
        model: {
          correo: undefined,
          password: undefined
        }
      }
    },
    computed: {
        ...mapState(['servidorSeguridad', 'usuarios', 'servidorAcceso', 'menu']),
        ...mapMutations(['iniciarSesion', 'consultarSesion']),
        validarcorreo () {
            if (this.model.correo === '') {
                return false
            }
            else if (this.model.correo === undefined) {
                return undefined
            }
            return true
        },
        validarPassword () {
            if (this.model.password === '') {
                return false
            }
            else if (this.model.password === undefined) {
                return undefined
            }
            return true
        }
    },
    methods: {
        async ingresar () {
            
        },
        ingresarAux () {
            const self = this
            if (this.model.password === '' || this.model.correo === '' || this.model.password === undefined || this.model.correo === undefined) {
              this.$toast.info({
                title: 'Campos Vacios',
                message: 'Por favor ingrese un correo y una contraseña valida'
              })
              return
            }
            const valido = this.usuarios.find(function (u) {
              return u.correo === self.model.correo && u.password === self.model.password
            })
            if (valido === undefined) {
              this.$toast.info({
                title: 'Login Fallido',
                message: 'El correo o la contraseña no son de un usuario existente'
              })
              return
            }
            self.$toast.success({
                title: 'Bienvenido',
                message: 'Login exitoso'
            })
            const correo = valido.correo
            this.$store.commit('cambiarEstadoCuenta', correo)
            // this.$store.commit('sesionActiva', valido)
            this.$store.commit('consultarSesion', valido)
            this.$router.push('/perfil')
        },
        limpiarCampos () {
            this.model.password = ''
            this.model.correo = ''
        },
        validarUsuarioActivo (datos) {
            if (datos.menuExtended.estado !== 'ACTIVO') {
                this.$toast.error({
                    title: 'Login Fallido',
                    message: 'Este usuario esta inactivo para hacer login'
                })
                return false
            } else {
                return true
            }
        }
    },
    created () {
        this.$store.commit('cerrarSesion')
    }
  }
</script>
<style>
</style>
