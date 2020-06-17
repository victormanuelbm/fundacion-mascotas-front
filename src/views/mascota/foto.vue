<template>
    <div class="clearfix" style="width: 100px; height: 100;">
        <b-img v-bind="foto" fluid-grow rounded="circle" right/>
    </div>
</template>
<script>
export default {
  props: [ 'imagen', 'extension' ],
  components: {},
  data() {
    return {
      foto: {
        src: this.imagen,
        blankColor: '#777',
        width: 50,
        height: 50,
        class: 'm1'
      }
    }
  }
}
</script>