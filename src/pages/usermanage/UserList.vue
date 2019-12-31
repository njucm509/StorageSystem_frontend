<template>
  <v-data-table
    :headers="headers"
    :items="userList"
    class="elevation-1"
  >
    <template v-slot:items="props">
      <td class="text-xs-center">{{ props.item.uid }}</td>
      <td class="text-xs-center">{{ props.item.uname }}</td>
      <td class="text-xs-center">{{ props.item.account }}</td>
      <td class="text-xs-center">{{ props.item.createAt }}</td>
      <td class="text-xs-center">{{ props.item.updateAt }}</td>
    </template>
  </v-data-table>
</template>

<script>
  export default {
    data() {
      return {
        headers: [{
          text: '编号',
          align: 'center',
          sortable: true,
          value: 'uid',
        }, {
          text: '姓名',
          align: 'center',
          sortable: true,
          value: 'uame',
        }, {
          text: '账号',
          align: 'center',
          sortable: true,
          value: 'account',
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
        userList: [],
      }
    },
    methods: {
      getUserList() {
        this.$http.get('/user/list').then(res => {
          this.userList = res.data
        })
      }
    },
    mounted() {
      this.getUserList();
    }
  }
</script>

<style>
</style>
