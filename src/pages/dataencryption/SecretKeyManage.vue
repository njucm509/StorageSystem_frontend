<template>
  <v-card>
    <v-card-title>
      <v-flex xs3>
        密钥信息
      </v-flex>
      <v-spacer/>
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
        let data = this.key;
        let link = document.createElement('a');
        let exportKey = new Blob(['aes_key: ' + data.aes + '\n', '\nrsa_public_key: ' + data.rsa_publicKey + '\n', '\nrsa_private_key: ' + data.rsa_privateKey]);
        link.href = URL.createObjectURL(exportKey);
        link.download = this.user.name + '_secret_key.txt';
        link.click();
        // document.body.removeChild(link);
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
