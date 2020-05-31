import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
// 导入字体图标
import './assets/font/iconfont.css'
// 导入全局样式表
import './assets/css/global.css'
// 导入axios
import axios from 'axios'
//  导入excel插件
import XLSX from 'xlsx'
Vue.prototype.XLSX = XLSX
// 导入echarts插件
import echarts from 'echarts'
Vue.prototype.$echarts = echarts
// 配置请求的根路径
// axios.defaults.baseURL = ''
Vue.prototype.$http = axios

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
