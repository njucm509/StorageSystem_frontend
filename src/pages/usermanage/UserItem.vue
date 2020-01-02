<template>
  <v-form v-model="valid" ref="myForm">
    <v-text-field v-model="item.name" label="真实姓名：" required :rules="nameRules"/>
    <v-text-field v-model="item.account" label="账号：" required :rules="accountRules"/>
<!--    <v-layout row>-->
<!--      <v-flex xs3>-->
<!--        <span style="font-size: 16px; color: #444">头像：</span>-->
<!--      </v-flex>-->
<!--      <v-flex>-->
<!--        <v-upload v-model="user.image" url="/upload/image" :multiple="false" :pic-width="250" :pic-height="90"/>-->
<!--      </v-flex>-->
<!--    </v-layout>-->
    <v-layout class="my-4" row>
      <v-spacer/>
      <v-btn @click="submit" color="primary">提交</v-btn>
      <v-btn @click="clear">重置</v-btn>
    </v-layout>
  </v-form>
</template>

<script>
  export default {
    name: "UserItem",
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
          account: '',
          pwd: '',
          createAt: '',
          updateAt: '',
        },
        nameRules: [
          v => !!v || "名称不能为空",
        ],
        accountRules: [
          v => !!v || "账号不能为空",
          // v => /^[a-zA-Z]{1}$/.test(v) || "品牌字母只能是1个字母"
          v => v.length > 4 || "账号至少5位"
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
          account: '',
          pwd: '',
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
              account: '',
              password: '',
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
