/*
 *  导入文件
 *  @Vue: vue
 *  @Vuex: vue的一种状态管理模式
 *  @store: Vuex状态管理文件
 *  @App: 入口vue
 *  @Element: element-ui
 *  @router: 路由文件
 *  @axios: 请求
 *  @el-Modify.less：修改elementUI主题颜色
 *  @index.css： elementUI样式
 *  @VueBarcode： 条形码插件
 *  @VueQrcode： 二维码插件
 *  @filter: 时间过滤器
 *  @font-awesome: 图标
 *  @vueQuillEditor引入富文本工具
 */
import Vue from 'vue'
import Vuex from 'vuex';
import router from './router/router'
// import store from './store';
import store from './store/index.js';
import './filters/filter'
import App from './App'
import axios from 'axios'
import VueBarcode from '@xkeshi/vue-barcode';
import VueQrcode from '@xkeshi/vue-qrcode';
import path from '../static/js/path.js'
import utils from '../static/js/utils.js'
import VueClipboard from 'vue-clipboard2'



import ElementUI from 'element-ui';
import {Loading} from 'element-ui'
import '../theme/index.css';
import '../static/css/common.less'
import '../static/css/el-modify.less'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import VueQuillEditor from 'vue-quill-editor'
import '../static/lib/fontawesome-free-5.0.13/web-fonts-with-css/css/fontawesome-all.min.css'

// 加载插件
Vue.use(Vuex);
Vue.use(ElementUI);
Vue.use(VueQuillEditor);
Vue.component('barcode', VueBarcode);
Vue.component('qrcode', VueQrcode);
Vue.use(VueClipboard);
Vue.prototype.path = path;
Vue.prototype.utils = utils;

axios.defaults.withCredentials = true
//更换请求头
Vue.prototype.$http = axios

// 设置提交数据头

//請求路徑
axios.defaults.baseURL = path.serverPath
//img路径设置
Vue.prototype.imgPath = path.imgPath
//上传文件路径
Vue.prototype.uploadPath = path.serverPath

// // 设置axios请求的token
// axios.defaults.headers.common['token'] = 'f4c902c9ae5a2a9d8f84868ad064e706'
// //设置请求头
// axios.defaults.headers.post["Content-type"] = "application/json"

//日志输出开关,false阻止启动生产消息
Vue.config.productionTip = true
/*
 * 拦截器——加载中效果
 * request 请求拦截器
 * response 服务器响应拦截器
 */
// Vue.http.interceptors.push((request, next) => {
//
//   request.credentials = true;
//
//   next();
// });


let count = 0
let loading
axios.interceptors.request.use((request) => {
  count++
  if (count > 0) {
    loading = Loading.service({fullscreen: true, text: '加载中....'})
  }
  return request
}, (error) => {
  loading.close()
  count = 0
  return Promise.reject(error.response)
})

// 返回状态判断
axios.interceptors.response.use((response) => {

  if (response.status === 200) {
    count--
    if (count <= 0) {
      loading.close();
    }
    return response
  }
}, (error) => {
  loading.close()
  count = 0
  if (error.response) {
    if (error.response.status == 401) {
      window.location = './#/login';
    }
  }
  return Promise.reject(error)
}),
//
//   router.beforeEach((to, from, next) => {
// // 需要通过登录验证
//     if (to.meta.requireAuth) {
//       // 如果是去登录或注册，那就先把user移除
//       if (to.path === '/login') {
//         sessionStorage.removeItem('user')
//       }withCredentials
//       let user = JSON.parse(sessionStorage.getItem('user'))
//       //如果获取不到username,就返回登入页面.
//       if (!user && (to.path === '/init/brand/BrandManage' || to.path === '/init/brand/StoreManage' || to.path === '/init/category/CategoryManage')) {
//         next({path: '/login'})
//       } else {
//         next()
//       }
//     }
//   })


/* 创建实例 */
new Vue({
  el: '#app',
  router,
  store,
  components: {
    App
  },
  template: '<App/>'
})
