/**
 *  导入文件
 *  @Vue: vue
 *  @VueRouter: 路由
 */
import Vue from 'vue'
import Router from 'vue-router'


//加载模块
Vue.use(Router)

/**
 *  配置滚动条的位置
 *  通过这个这个属性（是个函数），可以让应用像浏览器的原生表现那样，在按下 后退/前进 按钮时，简单地让页面滚动到顶部或原来的位置。
 */
// const scrollBehavior = (to, from, savedPosition) => {
//   if (savedPosition) {
//     return savedPosition
//   } else {
//     return { x: 0, y: 0 }
//   }
// }


/**
 *  路由配置
 *  @mode: 配置路由模式（"hash" | "history" | "abstract"）
 *  @base: 如果整个单页应用服务在 /app/ 下，然后 base 就应该设为 "/app/"。
 *  @linkActiveClass: 点击触发的class
 *  @scrollBehavior: 配置滚动条的位置
 */
const router = new Router({
  // base: __dirname,
  // likActiveClass: 'link-active',
  // scrollBehavior,
  routes: [{
    path: '/init',
    name: 'init',
    component: resolve => require(['../components/Init.vue'], resolve),
    children: [
      {
        path: '/Home',
        name: '/Home',
        component: resolve => require(['../components/Home.vue'], resolve),
      },
      {
        path: '/init/error/Error404',
        name: '/init/error/Error404',
        component: resolve => require(['../components/error/Error404.vue'], resolve),
      },
      {
        path: '/init/brand/BrandManage',
        name: '/init/brand/BrandManage',
        component: resolve => require(['../components/brand/BrandManage.vue'], resolve),
      },
      {
        path: '/init/brand/StoreManage',
        name: '/init/brand/StoreManage',
        component: resolve => require(['../components/brand/StoreManage.vue'], resolve),
      },
      {
        path: '/init/category/CategoryManage',
        name: '/init/category/CategoryManage',
        component: resolve => require(['../components/category/CategoryManage.vue'], resolve),
      }

    ]
  },
    {
      path: '/login',
      name: 'login',
      component: resolve => require(['../components/Login.vue'], resolve),
    }
  ]
});

export default router;
