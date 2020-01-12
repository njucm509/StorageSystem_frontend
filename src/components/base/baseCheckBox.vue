<template>
  <div id="base">
    <!--    <v-col cols="12" sm="3" xl="3" lg="3" md="3" xs="3">-->
    <el-input style="display: inline-block;width: 200px" v-model="content" :disabled="true"/>
    <!--    </v-col>-->
    <!--    <v-col cols="12" sm="3" xl="3" lg="3" md="3" xs="3">-->
    <el-select style="display: inline-block" v-model="curEncryption" placeholder="请选择加密方式" :disabled="check">
      <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
      </el-option>
    </el-select>
    <!--    </v-col>-->
    <!--    <v-col cols="12" sm="3" xl="3" lg="3" md="3" xs="3">-->

    <el-select style="display: inline-block" v-model="curDefault" placeholder="是否加密">
      <el-option v-for="item in optionDefault" :key="item.value" :label="item.label" :value="item.value">
      </el-option>
    </el-select>
    <!--    </v-col>-->
    <!--    <v-col cols="12" sm="3">-->
    <p style="display: inline-block;margin-left: 50px">{{desc}}</p>
    <!--    </v-col>-->
  </div>
</template>

<script>
  export default {
    name: 'baseCheckBox',
    data() {
      return {
        options: [{
          value: 'rsa',
          label: 'rsa加密'
        },
          {
            value: 'aes',
            label: 'aes加密'
          },
          {
            value: 'md5',
            label: 'md5加密'
          },
          {
            value: 'ecc',
            label: 'ecc加密'
          }
        ],
        optionDefault: [
          {
            value: '1',
            label: '加密'
          },
          {
            value: '0',
            label: '不加密'
          }
        ],
        curEncryption: this.encryption,
        curDefault: this.defaultEnc,
        check: false,
        desc: 'RSA加密算法是一种非对称加密算法。',
      }
    },
    props: ['content', 'encryption', 'defaultEnc'],
    watch: {
      'encryption': function (newVal, oldVal) {
        this.curEncryption = newVal;
      },
      'curEncryption': function (newVal, oldVal) {
        this.$emit("update:encryption", newVal);
        if (newVal == 'rsa') {
          this.desc = 'RSA加密算法是一种非对称加密算法。';
        } else if (newVal == 'aes') {
          this.desc = 'AES加密是密码学中的高级加密标准，又称Rijndael加密法，是美国联邦政府采用的一种区块加密标准。';
        } else if (newVal == 'md5') {
          this.desc = 'MD5信息摘要算法，一种被广泛使用的密码散列函数，可以产生出一个128位（16字节）的散列值（hash value），用于确保信息传输完整一致。';
        } else {
          this.desc = '椭圆加密算法（ECC）是一种公钥加密体制';
        }
      },
      'defaultEnc': function (newVal, oldVal) {
        this.curDefault = newVal;
      },
      'curDefault': function (newVal, oldVal) {
        if (newVal == '1') {
          this.check = false;
        } else {
          this.check = true;
          this.desc = '';
        }
        this.$emit("update:defaultEnc", newVal);
      },
      // 'optionDefault': function (newVal, oldVal) {
      //   console.log(newVal)
      //   if (newVal.value == '1') {
      //     this.check = true;
      //   } else {
      //     this.check = false;
      //   }
      // }
    }
  }
</script>

<style>
  #base {
    /*position: relative;*/
    /*width:150px;*/
    /*top: 0px;*/
    /*margin:20px;*/
    /*float: left;*/
  }
</style>
