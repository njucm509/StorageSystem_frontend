<template>
  <div>
    <v-module :name="device"></v-module>
  </div>
</template>

<script>
  import module from '../module'

  export default {
    name: 'master',
    components: {
      'v-module': module
    },
    data() {
      return {
        device: 'master'
      };
    },
    mounted() {
    }
  }
</script>

<style scoped>
</style>
