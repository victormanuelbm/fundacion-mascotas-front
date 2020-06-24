<template>
  <div class="scroll-wrapper scrollbar-inner">
    <div class="main-content">
      <div>
          <!-- your content here -->

          <base-nav class="navbar-top navbar-horizontal navbar-dark py-0"
                  containerClasses="px-0 container"
                  expand>
        <ul class="navbar-nav form-inline mr-3 d-none d-md-flex ml-lg-auto py-3">
            <li class="nav-item">
              <b-button size="sm"
                      class="my-2 my-sm-0 px-2"
                      @click="abrirTienda()">
                        <i class="fa fa-shopping-bag"></i>
                        <span class="nav-link-inner--text">Tienda</span>
              </b-button>
            </li>
            <li class="nav-item">
              <router-link class="nav-link nav-link-icon" to="/listarFundacion">
                <i class="fa fa-shopping-bag"></i>
                <span class="nav-link-inner--text">Fundaciones</span>
              </router-link>
            </li>
            <li class="nav-item" v-if="!sesionActiva">
              <b-button size="sm"
                        class="my-2 my-sm-0"
                        type="submit"
                        @click="iniciarSesion()">
                          <i class="ni ni-key-25"></i>
                          Ingresar
              </b-button>
            </li>
            <li class="nav-item dropdown px-5 my-1" v-else>
                <base-dropdown class="nav-link pr-0">
                    <div class="media align-items-center" slot="title">
                <span class="avatar avatar-lg rounded-circle">
                  <b-img :src="foto" fluid-grow rounded="circle" right/>
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
                        <router-link to="/mascota" class="dropdown-item">
                            <i class="ni ni-single-02"></i>
                            <span>Gestión de Mascota</span>
                        </router-link>
                        <router-link to="/fundacion" class="dropdown-item">
                            <i class="ni ni-single-02"></i>
                            <span>Gestión de Fundaciones</span>
                        </router-link>
                        <router-link to="/donacion" class="dropdown-item">
                            <i class="ni ni-single-02"></i>
                            <span>Colsulta de Donaciones</span>
                        </router-link>
                        <div class="dropdown-divider"></div>
                        <b-button class="dropdown-item" @click="salirSesion">
                            <i class="ni ni-user-run"></i>
                            <span>Cerrar Sesion</span>
                        </b-button>
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
            style="min-height: 200px; background-image: url(img/logo_completo.jpg); background-size: cover; background-position: center top;" v-if="sesionActiva">
            <!-- Mask -->
            <span class="mask bg-gradient-success opacity-6"></span>
            
          </base-header>
          <base-header class="header pb-8 pt-5 pt-lg-8 d-flex align-items-center"
            style="min-height: 200px; background-image: url(img/logo_completo.jpg); background-size: cover; background-position: center top;" v-else>
            <!-- Mask -->
            <span class="mask bg-gradient-success opacity-6"></span>
            
          </base-header>
          <router-view></router-view>
          
      </div>
    </div>
  </div>
</template>
<script>
import {mapState} from 'vuex'
export default {
  name: 'IndexLayout',
  data () {
    return {
      clienteId: process.env.VUE_APP_AUTH0_CONFIG_DOMAIN,
      foto: undefined
    }
  },
  computed: {
    ...mapState(['sesionActiva']),
  },
  watch: {
    sesionActiva (value) {
      if (value) {
        this.foto = value.foto
      }
    }
  },
  methods: {
    iniciarSesion() {
      this.$store.dispatch('auth0Login')
    },
    salirSesion() {
      this.$store.dispatch('auth0Logout')
    },
    abrirTienda () {
      window.location.href = 'http://storepetbro.tk/'
    }
  },
  created: async function() {
    if (this.sesionActiva) {
      this.foto = this.sesionActiva.foto
    }
  }
}
</script>
<style lang="scss">
</style>
