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
        <v-layout row>
          <v-flex xs8>
            <v-card
              class="px-4"
              color=" lighten-1"
              height="400px"
            >
              <v-upload ref="fileUp" :options="options" :auto="auto" :attrs="attrs"></v-upload>
              <v-spacer></v-spacer>
              <v-select label="请选择处理的文件" :items="fileList" outline v-model="filename">
              </v-select>
            </v-card>
          </v-flex>
          <v-flex xs4>
            <v-card class="mb-5"
                    color=" lighten-1"
                    height="400px"
                    scrollable
            >
              <v-card-title>
                <v-btn color="primary" @click="refresh">刷新</v-btn>
                <v-spacer/>
              </v-card-title>
              <v-data-table :headers="headers" :items="items"
                            :loading="loading"
                            class="elevation-1">
                <template slot="items" slot-scope="props">
                  <td class="text-xs-center">{{ props.item.id }}</td>
                  <td class="text-xs-center">{{ props.item.filename }}</td>
                  <td class="justify-center layout px-0">
                    <v-btn icon @click="deleteFile(props.item)" v-if="props.item.msg!='no'">
                      <i class="el-icon-delete"/>
                    </v-btn>
                  </td>
                </template>
              </v-data-table>

            </v-card>
          </v-flex>
        </v-layout>
        <v-spacer></v-spacer>
        <v-btn
          color="primary"
          @click="second"
        >
          下一步
        </v-btn>
      </v-stepper-content>
      <v-stepper-content step="2">
        <v-card
          class="mb-5"
          color="lighten-1"
          height="500px"
        >
          <my-checkbox v-for="(info,index) in fileHeaderInfo" :key="index" :encryption.sync="info.encryption" :content="info.content"
                       :defaultEnc.sync="info.defaultEnc" :check="false"></my-checkbox>
        </v-card>
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
          color="lighten-1"
          height="500px"
        >
          <v-data-table :headers="headersInfo" :items="fileHeaderInfo"
                        class="elevation-1">
            <template slot="items" slot-scope="props">
              <td class="text-xs-center">{{ props.item.content }}</td>
              <td class="text-xs-center">{{ props.item.encryption }}</td>
              <td class="text-xs-center">{{ props.item.defaultEnc==1?'加密':'不加密' }}</td>
            </template>
          </v-data-table>

        </v-card>
        <v-btn
          color="primary"
          @click="e1 = 3"
        >
          上一步
        </v-btn>
        <v-btn
          color="primary"
          @click="final"
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
      </v-stepper-content>
    </v-stepper-items>
  </v-stepper>
</template>

<script>
  import vUpload from '../../components/form/Upload'
  import config from "../../config";
  import baseCheckBox from "../../components/base/baseCheckBox";

  export default {
    components: {
      'v-upload': vUpload,
      'my-checkbox': baseCheckBox
    },
    data() {
      return {
        e1: '1',
        options: {
          target: config.api + '/file/upload',
          testChunks: false
        },
        auto: false,
        attrs: {
          // 接受的文件类型，形如['.png', '.jpg', '.jpeg', '.gif', '.bmp'...] 这里我封装了一下
          // accept: ACCEPT_CONFIG.getAll()
        },
        headers: [{
          text: '编号',
          align: 'center',
          sortable: true,
          value: 'id',
        }, {
          text: '姓名',
          align: 'center',
          sortable: true,
          value: 'filename',
        },
        ],
        items: [],
        loading: true,
        fileList: [],
        filename: '',
        fileHeaderInfo: [],
        headersInfo: [
          {
            text: '列名',
            align: 'center',
            sortable: false,
            value: 'content',
          },
          {
            text: '加密方式',
            align: 'center',
            sortable: false,
            value: 'encryption',
          },
          {
            text: '是否加密',
            align: 'center',
            sortable: false,
            value: 'defaultEnc',
          }
        ]
      }
    },
    methods: {
      refresh() {
        this.$http.get('/file/list').then(res => {
          this.filename = '';
          this.fileList = [];
          console.log(res)
          if (res.data.msg == 'no') {

          } else {
            this.items = res.data;
            this.items.forEach(item => this.fileList.push(item.filename))
          }
          this.loading = false;
        })
      },
      deleteFile(item) {
        console.log(item);
        if (item.msg == "no") {

        } else {
          this.$http.get('/file/delete/' + item.filename).then(res => {
            this.refresh();
          });
        }
      },
      second() {
        this.e1 = 2;
        this.$http.post('/file/header', {
          filename: this.filename
        }).then(res => {
          console.log(res.data);
          this.fileHeaderInfo = res.data;
        })
      },
      final() {
        console.log(this.fileHeaderInfo)
        this.e1 = 3;
        this.$http.post('/encrypt', {
          list: this.fileHeaderInfo,
          filename: this.filename
        }).then(res => {
          console.log(res);
        });
      },
      test() {
      }
    },
    watch: {},
    mounted() {
      // console.log(this.encryption)
      // this.initFile()
      this.refresh();
    }
  }
</script>

<style scoped>
</style>
