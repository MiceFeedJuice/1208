import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import menu from './modules/menu'
import role from './modules/role'
import manger from './modules/manger'
import classify from './modules/classify'
import goods from './modules/goods'
import banner from './modules/banner'
import seckill from './modules/seckill'
import spec from './modules/spec'
import user from './modules/user'

export default new Vuex.Store({
    modules:{
        menu,
        role,
        manger,
        classify,
        goods,
        banner,
        seckill,
        spec,
        user
    }
})
