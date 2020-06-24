<template>
  <div>
    <div class="container-fluid mt--5">
      <div class="row">
        <div class="col-xl-12 order-xl-1">
          <card shadow type="secondary">
            <div slot="header" class="bg-white border-0">
              <div class="row align-items-center">
                <div class="col-8">
                  <h3 class="mb-0">Formulario de Vinculacion</h3>
                </div>
              </div>
            </div>
            <template>
              <form @submit.prevent>
                <div class="pl-lg-4">
                  <div class="row">
                    <div class="col-lg-6">
                      <base-input
                        alternative
                        label="Nombre"
                        placeholder="Nombre de la Vinculacion"
                        input-classes="form-control-alternative"
                        v-model="model.nombreVinculacion"
                        :valid="validarNombre"
                      />
                    </div>
                    <div class="col-lg-6">
                      <base-input
                        alternative
                        label="Direccion"
                        placeholder="Direccion de la Vinculacion"
                        input-classes="form-control-alternative"
                        v-model="model.DireccionVinculacion"
                        :valid="validarDireccion"
                      />
                    </div>
                    <div class="col-lg-6">
                      <base-input
                        alternative
                        label="Nit"
                        placeholder="Nit de la Vinculacion"
                        input-classes="form-control-alternative"
                        v-model="model.NitVinculacion"
                        :valid="validarNit"
                      />
                    </div>
                    <div class="col-lg-6">
                      <base-input
                        alternative
                        label="Telefono"
                        placeholder="Telefono de la vinculacion"
                        input-classes="form-control-alternative"
                        v-model="model.TelefonoVinculacion"
                        :valid="validarTelefono"
                      />
                    </div>
                  </div>
                  <div class="text-right">
                    <base-button outline @click="guardarCambios()" type="success">Guardar Cambios</base-button>
                  </div>
                </div>
              </form>
            </template>
          </card>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import flatPicker from "vue-flatpickr-component";
import "flatpickr/dist/flatpickr.css";
export default {
  components: {
    flatPicker
  },
  name: "registro",
  props: {
    Vinculacion: {
      type: Object,
      required: false
    }
  },
  data() {
    return {
      model: {
        idVinculacion: undefined,
        nombreVinculacion: "",
        direccionVinculacion: "",
        nitVinculacion: "",
        telefonoVinculacion: ""
      }
    };
  },
  computed: {
    validarNombre() {
      if (this.model.nombreVinculacion === "") {
        return false;
      } else if (this.model.nombreVinculacion === undefined) {
        return undefined;
      }
      return true;
    },
    validarDireccion() {
      if (this.model.direccionVinculacion === "") {
        return false;
      } else if (this.model.direccionVinculacion === undefined) {
        return undefined;
      }
      return true;
    }
  },
  methods: {
    ingresoFile() {},
    subirImagen() {},
    async actualizarFoto() {},
    async guardarCambios() {
      if (!this.validacion()) {
        this.$toast.info({
          title: "No se puede guardar cambios de la Vinculacion",
          message: "Existen campos vacios o no validos dentro del formulario"
        });
        return;
      } else {
        this.$toast.success({
          title: "Registro Exitoso",
          message: "Se registro la Vinculacion correctamente"
        });
      }
    },
    validacion() {
      if (
        this.validarNombre &&
        this.validarDireccion &&
        this.validarSexo &&
        this.validarDisponibilidad &&
        this.validarFundacion &&
        this.validarEspecie &&
        this.validarVeterinaria &&
        this.validarFechaIngreso
      ) {
        return true;
      }
      return false;
    }
  },
  created: function() {
    if (this.Vinculacion) {
      this.model = {
        ...this.Vinculacion
      };
    }
  }
};
</script>
<style>
</style>
