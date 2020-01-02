<template>
  <v-stepper v-model="e1">
    <v-stepper-header>
      <v-stepper-step :complete="e1 > 1" step="1">数据上传</v-stepper-step>
      <v-divider></v-divider>
      <v-stepper-step :complete="e1 > 2" step="2">属性自定义</v-stepper-step>
      <v-divider></v-divider>
      <v-stepper-step :complete="e1 > 3" step="3">任务确认</v-stepper-step>
      <v-divider></v-divider>
      <v-stepper-step step="4">查看结果</v-stepper-step>
    </v-stepper-header>
    <v-stepper-items>
      <v-stepper-content step="1">
        <v-card
          class="mb-5"
          color="grey lighten-1"
          height="500px"
        ></v-card>
        <v-spacer></v-spacer>
        <v-btn
          color="primary"
          @click="e1 = 2"
        >
          下一步
        </v-btn>
      </v-stepper-content>
      <v-stepper-content step="2">
        <v-card
          class="mb-5"
          color="grey lighten-1"
          height="500px"
        ></v-card>
        <v-btn
          color="primary"
          @click="e1 = 2"
        >
          上一步
        </v-btn>
        <v-btn
          color="primary"
          @click="e1 = 3"
        >
          下一步
        </v-btn>
      </v-stepper-content>
      <v-stepper-content step="3">
        <v-card
          class="mb-5"
          color="grey lighten-1"
          height="500px"
        ></v-card>
        <v-btn
          color="primary"
          @click="e1 = 3"
        >
          下一步
        </v-btn>
        <v-btn
          color="primary"
          @click="e1 = 4"
        >
          确认提交
        </v-btn>
      </v-stepper-content>
      <v-stepper-content step="4">
        <v-card
          class="mb-5"
          color="grey lighten-1"
          height="500px"
        ></v-card>
        <!--        <v-btn-->
        <!--          color="primary"-->
        <!--          @click="e1 = 3"-->
        <!--        >-->
        <!--          下一步-->
        <!--        </v-btn>-->
        <!--        <v-btn-->
        <!--          color="primary"-->
        <!--          @click="e1 = 4"-->
        <!--        >-->
        <!--          下一步-->
        <!--        </v-btn>-->
        <!--        <v-btn flat>Cancel</v-btn>-->
      </v-stepper-content>
    </v-stepper-items>
  </v-stepper>
</template>

<script>

  export default {
    components: {
    },
    data() {
      return {
        e1: '1'
      }
    },
    methods: {},
    watch: {

    },
    mounted() {
      // console.log(this.encryption)
      // this.initFile()
    }
  }
</script>

<style scoped>
</style>
