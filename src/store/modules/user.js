
import {requserLogin} from '../../util/request'


const state={
    list: sessionStorage.getItem('list')?JSON.parse(sessionStorage.getItem('list')):{},//请求回来的数据
}

const mutations={
   changList(state,arr){
       state.list=arr
       sessionStorage.setItem('list',JSON.stringify(arr))
   }
}

const actions={
    requestuserList(context,obj){
        
    context.commit('changList',obj)
        
    },
    

}

const getters={
    list(state){
        return state.list
    }
}

export default {
    state,
    mutations,
    actions,
    getters,
    namespaced:true
}