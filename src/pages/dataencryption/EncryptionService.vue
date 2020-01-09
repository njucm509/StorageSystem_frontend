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
          <p v-if="!analyse">正在解析文件...</p>
          <my-checkbox v-if="analyse" v-for="(info,index) in fileHeaderInfo" :key="index"
                       :encryption.sync="info.encryption"
                       :content="info.content"
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
          <v-checkbox v-model="isStore" label="是否存储"/>
          <v-divider/>
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
          color="lighten-1"
          height="500px"
        >
          <p v-if="!finalShow">数据正在加密中...</p>
          <v-data-table v-if="finalShow" :headers="encResHeader" :items="encResItems"
                        class="elevation-1">
            <template slot="items" slot-scope="props">
              <td class="text-xs-center" v-for="(i,index) in props.item" :key="index">{{ i | subEncStr }}</td>
              <td class="justify-center layout px-0">
                <v-btn icon @click="detail(props.item)">
                  <i class="el-icon-more"/>
                </v-btn>
              </td>
            </template>
          </v-data-table>
        </v-card>
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
          text: '文件名',
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
        analyse: false,
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
        ],
        finalShow: false,
        encResHeader: [],
        encResItems: [],
        isStore: false,
      };
    },
    filters: {
      "subEncStr": function (value) {
        console.log(value);
        if (value.length > 9) {
          return value.substring(0, 10) + "...";
        } else {
          return value;
        }
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
        if (this.filename == null || this.filename == '') {
          alert('请选择加密的文件!');
          return;
        }
        this.e1 = 2;
        this.$http.post('/file/header', {
          filename: this.filename
        }).then(res => {
          console.log(res.data);
          this.fileHeaderInfo = res.data;
          this.analyse = true;
        })
      },
      final() {
        console.log(this.fileHeaderInfo)
        this.e1 = 4;
        this.$http.post('/encrypt', {
          list: this.fileHeaderInfo,
          filename: this.filename,
          user: JSON.parse(sessionStorage.getItem('user'))
        }).then(res => {
          let data = res.data
          this.finalShow = true;
          console.log(this.fileHeaderInfo);
          console.log("data: ")
          console.log(data)
          for (let i = 0; i < data[0].length; i++) {
            this.encResHeader.push({
              text: data[0][i],
              align: 'center',
              sortable: false,
              // value: data[0][i],
            })
          }
          this.encResHeader.push({
            text: '操作',
            align: 'center',
            sortable: false
          })
          // this.encResHeader = data[0]
          for (let i = 1; i < data.length; i++) {
            this.encResItems.push(data[i]);
          }
          console.log(this.encResItems);
          console.log(this.encResHeader);
        });
      },
      detail(value) {
        console.log(value)
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
