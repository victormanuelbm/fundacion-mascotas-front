<template>
    <div class="clearfix">
        <b-img :src="imagen" fluid-grow rounded="circle" right/>
    </div>
</template>
<script>
export default {
  props: [ 'imagen', 'extension' ],
  components: {},
  data() {
      return {
      }
  }
}
</script>