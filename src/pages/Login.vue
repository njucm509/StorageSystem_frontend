<template>
  <el-form :model="loginForm" :rules="rules2" ref="loginForm" label-position="left" label-width="0px"
           class="login-container">
    <h3 class="title">系统登录</h3>
    <el-form-item prop="account">
      <el-input type="text" v-model="loginForm.account" auto-complete="off" placeholder="账号"></el-input>
    </el-form-item>
    <el-form-item prop="pwd">
      <el-input type="pwd" v-model="loginForm.pwd" auto-complete="off" placeholder="密码"></el-input>
    </el-form-item>
    <el-checkbox v-model="checked" checked class="remember">记住密码</el-checkbox>
    <el-form-item style="width:100%;">
      <el-button type="primary" style="width:100%;" @click.native.prevent="handleSubmit" :loading="logining">登录
      </el-button>
      <!-- <el-button @click.native.prevent="handleReset" style="width: 100%;">重置</el-button> -->
    </el-form-item>
  </el-form>
</template>

<script>
  import {
    requestLogin
  } from '../axios/api';

  export default {
    name: "Login",
    data() {
      return {
        logining: false,
        loginForm: {
          account: 'admin',
          pwd: '123456'
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
        },
        checked: true
      };
    },
    methods: {
      handleReset() {
        this.$refs.loginForm.resetFields();
      },
      handleSubmit(ev) {
        this.$refs.loginForm.validate((valid) => {
          if (valid) {
            console.log(this.$router.options)
            var loginParams = {
              account: this.loginForm.account,
              pwd: this.loginForm.pwd
            };
            // sessionStorage.setItem('user', JSON.stringify(loginParams))
            // this.$router.push({
            //   path: '/'
            // })
            requestLogin(loginParams).then(res => {
              this.logining = true;
              console.log(res)
              let data = res.data
              let code = res.status
              let msg = data.msg
              let user = data.user
              console.log(data)
              console.log(msg)
              console.log(code)
              if (code != 200) {
                this.$message({
                  message: msg,
                  type: 'error'
                });
                this.logining = false
              } else {
                sessionStorage.setItem('user', JSON.stringify(user));
                this.$message({
                  message: msg,
                  type: 'success'
                });
                this.$router.push({
                  path: '/'
                })
                // this.$router.push({ path: '/table' });
              }
            });
          } else {
            console.log('error submit!!');
            this.logining = false
            return false;
          }
        });
      }
    }
  }
</script>

<style scoped>
  .login-container {
    border-radius: 5px;
    background-clip: padding-box;
    width: 350px;
    margin: 180px auto;
    background-color: #FFFFFF;
    padding: 35px 35px 15px 35px;
    box-shadow: 0px 0px 25px #cac6c6;
  }

  .login-container .title {
    text-align: center;
    margin: 0px auto 40px auto;
  }

  .login-container .remember {
    margin: 0px auto 20px auto;
  }
</style>
