<template>
  <div id="charts">
    <div id="device"></div>
    <div id="cpu"></div>
    <div id="memory"></div>
    <div></div>
  </div>
</template>

<script>
  export default {
    name: 'charts_module',
    data() {
      return {
      }
    },
    mounted() {
      
    },
    methods:{
      initCpu(){
        let cpu = this.$echarts.init(document.getElementById('cpu'))
        cpu.setOption
      }
    }
  }
</script>

<style>
</style>
