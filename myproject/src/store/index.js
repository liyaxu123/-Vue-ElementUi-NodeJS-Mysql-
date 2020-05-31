import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    count:111,
    // 定义路由表
    routerlist:[]
  },
  mutations: {
    // 角色的路由表
    rolerRouter(state,value){
      state.routerlist = value
    }
  },
  actions: {
  },
  modules: {
  }
})
