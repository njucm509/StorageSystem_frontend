<template>
  <div id="base">
    <el-input style="display: inline-block;width: 200px" v-model="content" :disabled="true"/>
    <el-select style="display: inline-block" v-model="curEncryption" placeholder="请选择加密方式" :disabled="check">
      <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
      </el-option>
    </el-select>
    <el-select style="display: inline-block" v-model="curDefault" placeholder="是否加密">
      <el-option v-for="item in optionDefault" :key="item.value" :label="item.label" :value="item.value">
      </el-option>
    </el-select>
    <!--    <el-input style="display: inline-block;width: 200px" v-model="desc" :disabled="true"/>-->
    <p style="display: inline-block;margin-left: 50px">{{desc}}</p>
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
        desc: 'rsa加密',
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
          this.desc = 'rsa加密';
        } else if (newVal == 'aes') {
          this.desc = 'aes加密';
        } else if (newVal == 'md5') {
          this.desc = 'md5加密';
        } else {
          this.desc = 'ecc加密';
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
