<template>
  <div class="scroll-wrapper scrollbar-inner">
    <div class="main-content">
      <div>
          <!-- your content here -->

          <base-nav class="navbar-top navbar-dark"
              id="navbar-main"
              :show-toggle-button="false"
              expand>
        <ul class="navbar-nav form-inline mr-3 d-none d-md-flex ml-lg-auto">
            <li class="nav-item dropdown px-5 my-1">
                <base-dropdown class="nav-link pr-0">
                    <div class="media align-items-center" slot="title">
                <span class="avatar avatar-lg rounded-circle">
                  <h5>
                    <div
                      style="border-radius:9px; position:absolute"
                      class="my-2"
                      pill
                      variant="danger">
                        <i class="ni ni-bell-55 ni-2x text-red"></i>
                    </div>
                  </h5>
                </span>
                      <div class="media-body ml-2 d-none d-lg-block">
                            <span class="mb-0 text-sm  font-weight-bold"></span>
                      </div>
                    </div>

                    <template>
                        <div class=" dropdown-header noti-title">
                            <h6 class="text-overflow m-0">Bienvenido!</h6>
                        </div>
                        <router-link to="/perfil" class="dropdown-item">
                            <i class="ni ni-single-02"></i>
                            <span>Mi perfil</span>
                        </router-link>
                        <router-link to="/notificacion" class="dropdown-item">
                            <i class="ni ni-bell-55"></i>
                            <span>Notificaciones</span>
                        </router-link>
                        <div class="dropdown-divider"></div>
                        <router-link to="/" class="dropdown-item">
                            <i class="ni ni-user-run"></i>
                            <span>Cerrar Sesion</span>
                        </router-link>
                    </template>
                </base-dropdown>
            </li>
            <base-dropdown class="nav-item" position="right" v-if="false">
              <a slot="title" class="nav-link nav-link-icon my--2" href="#" role="button" data-toggle="dropdown"
              aria-haspopup="true" aria-expanded="false">
                <i class="ni ni-bell-55 ni-3x text-red" style="position: absolute; z-index:-1">
                  </i>
                  <h5><b-badge style="border-radius:9px; background-color: #fcfcfd;" class="my-2" pill variant="danger">8</b-badge></h5>
                  
                   </a>
                   <a class="dropdown-item" href="#">Action</a>
              <a class="dropdown-item" href="#">Another action</a>
              <div class="dropdown-divider"></div>
              <a class="dropdown-item" href="#">Something else here</a>
            </base-dropdown>
        </ul>
    </base-nav>

          <base-header class="header pb-8 pt-5 pt-lg-8 d-flex align-items-center"
            style="min-height: 200px; background-image: url(img/logo_completo.jpg); background-size: cover; background-position: center top;">
            <!-- Mask -->
            <span class="mask bg-gradient-success opacity-6"></span>
          </base-header>
          <router-view></router-view>
      </div>
    </div>
    <b-button variant="outline-primary" @click="iniciarSesion()" v-if="!$store.state.userIsAuthorize">Login</b-button>
    <b-button variant="outline-danger" @click="salirSesion()" v-if="$store.state.userIsAuthorize">Cerrar sesión</b-button>
  </div>
</template>
<script>
export default {
  name: 'IndexLayout',
  data () {
    return {
      clienteId: process.env.VUE_APP_AUTH0_CONFIG_DOMAIN
    }
  },
  methods: {
    iniciarSesion() {
      console.log('entro')
      this.$store.dispatch('auth0Login')
    },
    salirSesion() {
      console.log('salio')
      this.$store.dispatch('auth0Logout')
    }
  }
}
</script>
<style lang="scss">
</style>
