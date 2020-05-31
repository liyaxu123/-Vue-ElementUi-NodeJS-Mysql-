import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '../components/login.vue'
import home from '../components/home.vue'
import welcome from '../components/welcome.vue'
import users from '../components/user/users.vue'
import jslb from '../components/user/jslb.vue'
import qxlb from '../components/user/qxlb.vue'
import xgmm from '../components/grzx/xgmm.vue'
import newly from '../components/lygl/newly.vue'
import sslb from '../components/ssgl/sslb.vue'
import sswhjs from '../components/ssgl/sswhjs.vue'
import xslb from '../components/xsgl/xslb.vue'
import shbx from '../components/hqfw/shbx.vue'
import bxlb from '../components/hqfw/bxlb.vue'
import jdf from '../components/shfw/jdf.vue'
import xyw from '../components/shfw/xyw.vue'
import xyykt from '../components/shfw/xyykt.vue'
import sspf from '../components/tjzx/sspf.vue'
import bxtj from '../components/tjzx/bxtj.vue'
import lgdf from '../components/tjzx/lgdf.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    component: login
  },
  {
    path: '/home',
    component: home,
    redirect:'/welcome',
    children:[
      {path:'/welcome',component:welcome},
      {path:'/yhlb',component:users},
      {path:'/xgmm',component:xgmm},
      {path:'/newly',component:newly},
      {path:'/sslb',component:sslb},
      {path:'/sswhjs',component:sswhjs},
      {path:'/xslb',component:xslb},
      {path:'/shbx',component:shbx},
      {path:'/jdf',component:jdf},
      {path:'/xyw',component:xyw},
      {path:'/xyykt',component:xyykt},
      {path:'/sspf',component:sspf},
      {path:'/bxtj',component:bxtj},
      {path:'/lgdf',component:lgdf},
      {path:'/jslb',component:jslb},
      {path:'/qxlb',component:qxlb},
      {path:'/bxlb',component:bxlb}
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// 挂载路由导航守卫
router.beforeEach((to,from,next) => {
  if(to.path === '/login') return next();
  // 获取token
  // const tokenStr = window.sessionStorage.getItem('token');
  // if(!tokenStr) return next('/login');
  next();
})

export default router
