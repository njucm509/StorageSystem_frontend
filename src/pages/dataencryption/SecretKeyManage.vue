<template>
  <v-card>
    <v-card-title>
      <v-flex xs3>
        密钥信息
      </v-flex>
      <v-btn color="primary" @click="down">导出密钥</v-btn>
    </v-card-title>
    <v-text-field v-model="key.aes" label="AES KEY：" readonly/>
    <v-textarea multi-line v-model="key.rsa_publicKey" label="RSA PUBLIC KEY：" readonly/>
    <v-textarea multi-line v-model="key.rsa_privateKey" label="RSA PRIVATE KEY：" readonly/>
  </v-card>
</template>

<script>
  export default {
    name: "SecretKeyManage",
    data() {
      return {
        user: {},
        key: {}
      };
    },
    methods: {
      getData() {
        this.$http.get('/key/user/' + this.user.id).then(res => {
          this.key = res.data[0];
          console.log(res);
        });
      },
      down() {
        console.log(this.key);
      }
    },
    mounted() {
      this.user = JSON.parse(sessionStorage.getItem('user'));
      this.getData();
    }
  }
</script>

<style scoped>

</style>
