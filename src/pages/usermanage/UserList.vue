<template>
  <v-card>
    <v-card-title>
      <v-btn color="primary" @click="add">新增用户</v-btn>
      <form enctype="multipart/form-data" action="" id="fileForm">
        <input type="file" accept=".csv" id="exportUser" @change="exportUser" style="display: none"/>
      </form>
      <v-btn @click="multiAdd">批量导入</v-btn>
      请下载导入模版<a @click="down">user.csv</a>
      <v-spacer/>
      <v-flex xs3>
        <v-text-field label="输入关键字搜索" v-model.lazy="search" append-icon="search" hide-details></v-text-field>
      </v-flex>
    </v-card-title>
    <v-data-table :headers="headers" :items="items" :pagination.sync="pagination" :total-items="totalItems"
                  :loading="loading"
                  class="elevation-1">
      <template slot="items" slot-scope="props">
        <td class="text-xs-center">{{ props.item.id }}</td>
        <td class="text-xs-center">{{ props.item.name }}</td>
        <td class="text-xs-center">{{ props.item.account }}</td>
        <td class="text-xs-center">{{ props.item.role == 1?'管理员':'普通用户' }}</td>
        <td class="text-xs-center">{{ props.item.createAt }}</td>
        <td class="text-xs-center">{{ props.item.updateAt }}</td>
        <td class="justify-center layout px-0">
          <v-btn icon @click="edit(props.item)">
            <i class="el-icon-edit"/>
          </v-btn>
          <v-btn icon @click="delete(props.item)">
            <i class="el-icon-delete"/>
          </v-btn>
        </td>
      </template>
    </v-data-table>
    <v-dialog max-width="500" v-model="show" persistent scrollable>
      <v-card>
        <!--对话框的标题-->
        <v-toolbar dense dark color="primary">
          <v-toolbar-title>{{isEdit ? '修改' : '新增'}}用户</v-toolbar-title>
          <v-spacer/>
          <!--关闭窗口的按钮-->
          <v-btn icon @click="closeWindow">
            <v-icon>close</v-icon>
          </v-btn>
        </v-toolbar>
        <!--对话框的内容，表单-->
        <v-card-text class="px-5" style="height:400px">
          <user-item @close="closeWindow" :oldItem="oldItem" :isEdit="isEdit"/>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script>
  import UserItem from "./UserItem";

  import axios from 'axios'

  export default {
    components: {
      'user-item': UserItem
    },
    data() {
      return {
        pagination: {},
        search: '',
        show: false,
        isEdit: false,
        totalItems: 0,
        loading: false,
        headers: [{
          text: '编号',
          align: 'center',
          sortable: true,
          value: 'id',
        }, {
          text: '姓名',
          align: 'center',
          sortable: true,
          value: 'name',
        }, {
          text: '账号',
          align: 'center',
          sortable: true,
          value: 'account',
        }, {
          text: '是否管理员',
          align: 'center',
          sortable: true,
          value: 'role',
        }, {
          text: '创建时间',
          align: 'center',
          sortable: true,
          value: 'createAt',
        }, {
          text: '更新时间',
          align: 'center',
          sortable: true,
          value: 'updateAt',
        },
        ],
        items: [],
        oldItem: {},
      }
    },
    methods: {
      getData() {
        let url = "/user/page";
        this.$http.get(url, {
          params: {
            key: this.search, // 搜索条件
            page: this.pagination.page, // 当前页
            rows: this.pagination.rowsPerPage, // 每页大小
            sortBy: this.pagination.sortBy, // 排序字段
            desc: this.pagination.descending // 是否降序
          }
        }).then(res => {
          this.items = res.data.items;
          this.totalItems = res.data.total;
          this.loading = false;
        }).catch((err) => {
          console.log(err)
        });
      },
      add() {
        this.show = true;
        this.isEdit = false;
        this.oldItem = null;
      },
      multiAdd() {
        let exportUser = document.getElementById('exportUser');
        exportUser.click();
      },
      exportUser() {
        let exportUser = document.getElementById('exportUser');
        let file = exportUser.files[0];
        console.log(file);
        let formData = new FormData();
        formData.append("file", file);
        axios.post('/user/multi', formData, {
          headers: {"Content-Type": "multipart/form-data"},
        }).then(res => {
          this.getData();
          this.$message({
            message: '导入成功!',
            type: 'success'
          });
        });
      },
      down() {
        this.$http.get('/user/down').then(res => {
          console.log(res);
          let blob = new Blob([res.data]);
          let link = document.createElement('a');
          link.href = URL.createObjectURL(blob);
          link.download = 'user.csv';
          link.click();
        });
      },
      edit(oldItem) {
        this.isEdit = true;
        this.oldItem = oldItem;
        this.show = true;
      },
      delete(oldItem) {
      },
      closeWindow() {
        this.getData();
        this.show = false;
      }
    },
    watch: {
      pagination: { // 监视pagination属性的变化
        deep: true, // deep为true，会监视pagination的属性及属性中的对象属性变化
        handler() {
          // 变化后的回调函数，这里我们再次调用getDataFromServer即可
          this.getData();
        }
      },
      search: { // 监视搜索字段
        handler() {
          this.getData();
        }
      }
    },
    mounted() {
      this.getData();
    }
  }
</script>

<style scoped>
</style>
