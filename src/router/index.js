import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

function route(path, file, name, children) {
  return {
    exact: true,
    path,
    name,
    children,
    component: () => import('../pages' + file)
  }
}

const router = new Router({
  mode: 'history',
  routes: [
    route("/login", '/Login', "Login"),
    {
      path: '/',
      component: () => import('../pages/Home'),
      redirect: '/index/dashboard',
      children: [
        route("/index/dashboard", "/Dashboard", "Dashboard"),
        route("/encryption/encservice", '/dataencryption/EncryptionService', "EncService"),
        route("/encryption/encstore", '/dataencryption/EncryptionStore', "EncStore"),
        route("/sysmanage/master", '/sysmanage/node/master', "Master"),
        route("/sysmanage/master2", '/sysmanage/node/master2', "Master2"),
        route("/sysmanage/slave1", '/sysmanage/node/slave1', "Slave1"),
        route("/sysmanage/slave2", '/sysmanage/node/slave2', "Slave2"),
        route("/sysmanage/slave3", '/sysmanage/node/slave3', "Slave3"),
        route("/algorithm/algomanage", '/algorithm/AlgoManage', "AlgoManage"),
        route("/user/info", '/usermanage/UserInfo', "UserInfo"),
        route("/user/list", '/usermanage/UserList', "UserList")
      ]
    },
    route("/404", "/404", "404")
  ]
})

router.beforeEach((to, from, next) => {
  if (to.path == "/login") {
    next();
  } else {
    if (sessionStorage.getItem("user")) {
      next()
    } else {
      next({
        path: "/login"
      })
    }
  }
})

export default router
