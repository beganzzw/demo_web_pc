import Vue from "vue"
import Vuex from "vuex"
import * as  getters from './getters'
import * as  mutations from './mutations'
import * as actions from './actions'


Vue.use(Vuex);

const store = new Vuex.Store({
  //存储数据--对外的只读状态
  state: {
    currentUser: null, //当前用户
    //isLogin:false //判断当前用户是否已经登录
  },
  //不改变state
  getters,
  //触发--改变state
  mutations,
  actions,
  modules: {}
});

export default store;
