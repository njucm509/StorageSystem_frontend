var menus = [
  {
    action: "home",
    title: "首页",
    path: "/index",
    admin: 1,
    items: [{title: "统计", path: "/dashboard"}]
  },
  {
    action: "apps",
    title: "数据加密",
    path: "/encryption",
    items: [
      {title: "数据加密服务", path: "/encservice"},
      // {title: "数据加密存储", path: "/encstore"},
      {title: "数据加密记录", path: "/encrecord"},
      {title: "密钥管理", path: "/secretkey"},
    ]
  },
  {
    action: "people",
    title: "算法维护",
    path: "/algorithm",
    admin: 1,
    items: [
      {title: "算法管理", path: "/algomanage"},
    ]
  },
  {
    action: 'people',
    title: "用户管理",
    path: "/user",
    items: [
      {title: "用户列表", path: "/list", admin: 1,},
      {title: "个人信息", path: "/info"}
    ]
  },
  {
    action: "settings",
    title: "集群资源管理",
    path: "/sysmanage",
    admin: 1,
    items: [
      {title: "master", path: "/master"},
      {title: "slave1", path: "/slave1"},
      {title: "slave2", path: "/slave2"},
      {title: "slave3", path: "/slave3"},
    ]
  }
]

export default menus;
