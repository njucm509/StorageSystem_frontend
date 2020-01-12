<template>
  <v-app :dark="dark">
    <!-- 左侧导航条 -->
    <v-navigation-drawer :dark="dark" persistent :mini-variant="miniVariant" v-model="drawer" enable-resize-watcher
                         fixed app>
      <v-toolbar flat class="transparent">
        <v-list class="pa-0">
          <v-list-tile avatar>
            <v-list-tile-avatar><img src="../assets/logo.png"></v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title>{{user.name}}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-toolbar>
      <!-- 分割线 -->
      <v-divider/> <!-- 左侧菜单 -->
      <v-list class="pt-0" dense>
        <v-list-group v-if="item.admin==null||user.role==item.admin" v-model="item.active" v-for="item in items"
                      :key="item.title"
                      :prepend-icon="item.action"
                      no-action>
          <!--一级菜单 -->
          <v-list-tile slot="activator">
            <v-list-tile-content>
              <v-list-tile-title>{{ item.title }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile> <!-- 二级菜单 -->
          <v-list-tile v-for="subItem in item.items" v-if="subItem.admin==null||user.role==subItem.admin" :key="subItem.title"
                       :to="item.path + subItem.path">
            <v-list-tile-content>
              <v-list-tile-title>{{ subItem.title }}</v-list-tile-title>
            </v-list-tile-content>
            <v-list-tile-action>
              <v-icon>{{ subItem.action }}</v-icon>
            </v-list-tile-action>
          </v-list-tile>
        </v-list-group>
      </v-list>
    </v-navigation-drawer> <!-- 顶部工具条 -->
    <v-toolbar app dark :color="dark ? 'secondary' : 'primary'">
      <!-- 隐藏左侧菜单的按钮-->
      <v-toolbar-side-icon @click.stop="drawer = !drawer"/> <!-- 收起左侧菜单的按钮-->
      <v-btn icon @click.stop="miniVariant = !miniVariant">
        <v-icon v-html="miniVariant ? 'chevron_right' : 'chevron_left'"/>
      </v-btn> <!-- 切换黑暗主题 -->
      <v-flex xs1>
        <v-switch :label="dark ? '暗黑' : '明亮'" v-model="dark" color="dark" hide-details/>
      </v-flex> <!-- 顶部导航标题 -->
      <v-flex xs3></v-flex>
      <v-toolbar-title v-text="title"/>
      <v-spacer/> <!-- 调色板 -->
      <v-btn icon @click.stop="dark = !dark">
        <v-icon>invert_colors</v-icon>
      </v-btn> <!-- 顶部导航用户菜单 -->
      <v-btn icon @click.stop="dark = !dark">
        <v-icon>account_box</v-icon>
      </v-btn>
    </v-toolbar>
    <!--中间内容主体-->
    <v-content>
      <v-breadcrumbs>
        <v-icon slot="divider">chevron_right</v-icon>
        <v-breadcrumbs-item>{{item1}}</v-breadcrumbs-item>
        <v-breadcrumbs-item>{{item2}}</v-breadcrumbs-item>
      </v-breadcrumbs>
      <div class="box">
        <!--定义一个路由锚点，Layout的子组件内容将在这里展示-->
        <router-view/>
      </div>
    </v-content>
  </v-app>
</template>

<script>
  import menus from "../menu";

  export default {
    data() {
      return {
        user: {},
        dark: false,
        drawer: true,
        miniVariant: false,
        title: '基于云平台的中医药数据安全存储系统',
        menuMap: {}
      }
    },
    computed: {
      items() {
        return menus
      },
      item1() {
        let arr = this.$route.path.split("/");
        console.log(this.$route.path)
        return this.menuMap[arr[1]].name
      },
      item2() {
        let arr = this.$route.path.split("/");
        return this.menuMap[arr[1]][arr[2]]
      }
    },
    created() {
      menus.forEach(m => {
        let p = m.path.slice(1)
        this.menuMap[p] = {
          name: m.title
        };
        m.items.forEach(item => {
          this.menuMap[p][item.path.slice(1)] = item.title
        })
      })
      console.log(this.menuMap)
    },
    mounted() {
      this.user = JSON.parse(sessionStorage.getItem('user'))
      console.log(this.user)
    }
  }
</script>

<style>
  .box {
    /*background-color: #42B983;*/
    /* width: 90%;
    margin: auto; */
  }
</style>
