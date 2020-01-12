<template>
  <div>
    <v-module :name="device"></v-module>
  </div>
</template>

<script>
  import module from '../module'

  export default {
    name: 'slave3',
    components: {
      'v-module': module
    },
    data() {
      return {
        device: 'slave3'
      };
    },
    mounted() {
    }
  }
</script>

<style scoped>
</style>
