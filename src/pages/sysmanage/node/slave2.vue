<template>
  <div>
    <v-module :name="device"></v-module>
  </div>
</template>

<script>
  import module from '../module'

  export default {
    name: 'slave2',
    components: {
      'v-module': module
    },
    data() {
      return {
        device: 'slave2'
      };
    },
    mounted() {
    }
  }
</script>

<style scoped>
</style>
