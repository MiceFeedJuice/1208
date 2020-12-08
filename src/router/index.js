import Vue from 'vue'
import Router from 'vue-router'

const login=()=>import('../pages/login/login.vue')
const index=()=>import('../pages/index/index.vue')
const home=()=>import('../pages/home/home.vue')
const menu=()=>import('../pages/menu/menu.vue')
const manger=()=>import('../pages/manger/manger.vue')
const role=()=>import('../pages/role/role.vue')
const classify=()=>import('../pages/classify/classify.vue')
const spec=()=>import('../pages/spec/spec.vue')
const goods=()=>import('../pages/goods/goods.vue')
const banner=()=>import('../pages/banner/banner.vue')
const seckill=()=>import('../pages/seckill/seckill.vue')
const vip=()=>import('../pages/vip/vip.vue')

Vue.use(Router)

export const indexRouters =[
  {
    path:'menu',
    component:menu,
    name:'菜单管理'
  },
  {
    path:'role',
    component:role,
    name:'角色管理'
  },
  {
    path:'manger',
    component:manger,
    name:'管理员管理'
  },
  {
    path:'classify',
    component:classify,
    name:'商品分类'
  },
  {
    path:'spec',
    component:spec,
    name:'商城规格'
  },
  {
    path:'goods',
    component:goods,
    name:'商品管理'
  },
  {
    path:'vip',
    component:vip,
    name:'会员管理'
  },
  {
    path:'banner',
    component:banner,
    name:'轮播图管理'
  },
  {
    path:'seckill',
    component:seckill,
    name:'秒杀活动'
  },
]

export default new Router({
  routes: [
    {
      path: '/login',
      component: login
    },
    {
      path: '',
      redirect: 'login'
    },
    {
      path: '/index',
      component: index,
      children:[
        {
          path:'home',
          component:home
        },
        {
          path:'',
          redirect:'home'
        },
        ...indexRouters
      ]
    },
  ]
})
