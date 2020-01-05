<template>
  <v-form v-model="valid" ref="myForm">
    <v-text-field v-model="item.name" label="算法名称：" required :rules="nameRules"/>
    <v-switch v-model="item.status" :label="item.status==1?'启用':'禁用'"/>
    <v-checkbox v-model="item.canDelete" v-if="item.canDelete==1" label="是否能删除："/>
    <v-layout class="my-4" row>
      <v-spacer/>
      <v-btn :disabled="!valid" @click="submit" color="primary">提交</v-btn>
      <v-btn @click="clear">重置</v-btn>
    </v-layout>
  </v-form>
</template>

<script>
  export default {
    name: "AlgoItem",
    props: {
      oldItem: {
        type: Object
      },
    },
    data() {
      return {
        valid: false,
        item: {
          id: '',
          name: '',
          status: 1,
          canDelete: 1,
          createAt: '',
          updateAt: '',
        },
        nameRules: [
          v => !!v || "名称不能为空",
        ]
      };
    },
    methods: {
      submit() {

      },
      clear() {
        this.item = {
          id: '',
          name: '',
          status: 1,
          canDelete: 1,
          createAt: '',
          updateAt: '',
        }
      }
    },
    watch: {
      oldItem: { // 监控item的变化
        handler(val) {
          if (val) {
            // 注意不要直接复制，否则这边的修改会影响到父组件的数据，copy属性即可
            this.item = JSON.parse(JSON.stringify(val));
          } else {
            // 为空，初始化brand
            this.item = {
              id: '',
              name: '',
              status: 1,
              canDelete: 1,
              createAt: '',
              updateAt: '',
            }
          }
        },
        deep: true
      }
    }
  }
</script>

<style scoped>

</style>
