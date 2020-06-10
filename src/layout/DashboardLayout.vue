<template>
  <div class="scroll-wrapper scrollbar-inner">
    <side-bar
      :background-color="sidebarBackground"
      short-title="Argon"
      title="Argon"
    >
      <template slot="links">
        <sidebar-item 
        v-for="item in menu" :key="item.id"
         :link="{name: item.nombre , icon: item.icono, path: item.path}"/>
      </template>
    </side-bar>
    <div class="main-content" :data="sidebarBackground">
      <dashboard-navbar></dashboard-navbar>

      <div @click="toggleSidebar">
        <fade-transition :duration="200" origin="center top" mode="out-in">
          <!-- your content here -->
          <router-view></router-view>
        </fade-transition>
        <content-footer v-if="!$route.meta.hideFooter"></content-footer>
      </div>
    </div>
  </div>
</template>
<script>
  import DashboardNavbar from './DashboardNavbar.vue';
  import ContentFooter from './ContentFooter.vue';
  import { FadeTransition } from 'vue2-transitions';
  import {mapState} from 'vuex'
  import axios from 'axios'

  export default {
    components: {
      DashboardNavbar,
      ContentFooter,
      FadeTransition
    },
    data() {
      return {
        sidebarBackground: 'vue', //vue|blue|orange|green|red|primary,
        menu: [
          { nombre: 'Perfil', icono: 'fa fa-user', path: '/perfil' },
          { nombre: 'Mascota', icono: 'fa fa-paw', path: '/mascota' },
          { nombre: 'Usuario', icono: 'fa fa-users', path: '/usuario' }
        ]
      };
    },
    methods: {
      toggleSidebar() {
        if (this.$sidebar.showSidebar) {
          this.$sidebar.displaySidebar(false);
        }
      }
    },
    computed: {
      ...mapState(['sesionActiva'])
    },
    created () {
      this.toggleSidebar()
      if (this.sesionActiva === undefined) {
        this.$router.push('/')
        return
      } else {
        axios.defaults.headers.common['usuario'] = this.sesionActiva.numeroDocumento
      }
    }
  };
</script>
<style lang="scss">
</style>
