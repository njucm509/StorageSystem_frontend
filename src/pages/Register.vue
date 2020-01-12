<template>
  <el-form :model="registerForm" :rules="rules2" ref="registerForm" label-position="left" label-width="0px"
           class="register-container">
    <h3 class="title">系统注册</h3>
    <el-form-item prop="account">
      <el-input type="text" v-model="registerForm.account" auto-complete="off" placeholder="账号"></el-input>
    </el-form-item>
    <el-form-item prop="pwd">
      <el-input type="password" v-model="registerForm.pwd" auto-complete="off" placeholder="密码"></el-input>
    </el-form-item>
    <el-form-item prop="name">
      <el-input type="text" v-model="registerForm.name" auto-complete="off" placeholder="真实姓名"></el-input>
    </el-form-item>
    <el-form-item style="width:100%;">
      <el-button type="primary" style="width:100%;" @click.native.prevent="handleSubmit">注册
      </el-button>
      <router-link to="/login">
        <el-button  style="width: 100%;">返回</el-button>
      </router-link>
    </el-form-item>
  </el-form>

</template>

<script>
  export default {
    name: "Register",
    data() {
      return {
        registerForm: {
          account: '',
          pwd: '',
          name: ''
        },
        rules2: {
          account: [{
            required: true,
            message: '请输入账号',
            trigger: 'blur'
          }
          ],
          pwd: [{
            required: true,
            message: '请输入密码',
            trigger: 'blur'
          }
          ]
        }
      }
    },
    methods: {
      handleSubmit() {
        this.$refs.registerForm.validate((valid) => {
          if (valid) {
            this.$http.post('/user/create', this.registerForm).then((res => {
              console.log(res.data)
              let user = res.data;
              sessionStorage.setItem('user', JSON.stringify(user));
              this.$message({
                message: '注册成功',
                type: 'success'
              });
              this.$router.push({
                path: '/'
              })
            }))
          }
        })
      }
    }
  }
</script>

<style scoped>
  .register-container {
    border-radius: 5px;
    background-clip: padding-box;
    width: 350px;
    margin: 180px auto;
    background-color: #FFFFFF;
    padding: 35px 35px 15px 35px;
    box-shadow: 0px 0px 25px #cac6c6;
  }

  .register-container .title {
    text-align: center;
    margin: 0px auto 40px auto;
  }
</style>
