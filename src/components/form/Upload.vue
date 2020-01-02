<template>
  <!-- 上传 -->
  <uploader :key="uploaderKey" :options="options" :auto-start="auto" class="uploader-example"
            @file-success="onFileSuccess">
    <uploader-unsupport></uploader-unsupport>
    <uploader-drop>
      <p>请选择上传的文件</p>
      <uploader-btn :attrs="attrs">选择文件</uploader-btn>
    </uploader-drop>
    <uploader-list></uploader-list>
  </uploader>
</template>

<script>

  export default {
    name: 'vUpload',
    data() {
      return {
        uploaderKey: new Date().getTime + '',
      }
    },
    props: ['options', 'auto', 'attrs',],
    methods: {
      onFileSuccess(rootFile, file, response, chunk) {
        console.log(rootFile)
        console.log(file)
        console.log(response)
        console.log(chunk)
        // this.$emit('onFileSuccess');
      },
    }
  }
</script>

<style scoped>
  /*.uploader-example {*/
  /*  width: 880px;*/
  /*  padding: 15px;*/
  /*  margin: 40px auto 0;*/
  /*  font-size: 12px;*/
  /*  box-shadow: 0 0 10px rgba(0, 0, 0, .4);*/
  /*}*/

  /*.uploader-example .uploader-btn {*/
  /*  margin-right: 4px;*/
  /*}*/

  /*.uploader-example .uploader-list {*/
  /*  max-height: 440px;*/
  /*  overflow: auto;*/
  /*  overflow-x: hidden;*/
  /*  overflow-y: auto;*/
  /*}*/
</style>
