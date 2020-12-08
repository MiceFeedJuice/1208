import {reqmangList,reqmangOunt} from '../../util/request'


const state={
    list:[],
    total:0,//管理员个数
    size:2,//每页展示的条数
    page:1,//当前第几页
}

const mutations={
   roleList(state,arr){
       state.list=arr
   },
   roletotal(state,arr){
       state.total=arr
   },
   rolepage(state,arr){
       state.page=arr
   },
}

const actions={
    requestmangList(context){
        reqmangList({
            size:context.state.size,
            page:context.state.page
        }).then(res=>{
            context.commit('roleList',res.data.list)
        })
    },
    requestmangtotal(context){
        reqmangOunt().then(res=>{
            context.commit('roletotal',res.data.list[0].total)
        })
    },
    requestmangpage(context,page){
        context.commit('rolepage',page)
        // 根据当前点击的页码数，重新发送请求，由于mutations没有权限修改actions所以需要借助仓库（context）
        context.dispatch('requestmangList')
    },


}

const getters={
    list(state){
        return state.list
    },
    total(state){
        return state.total
    },
    size(state){
        return state.size
    },
    page(state){
        return state.page
    },
}

export default {
    state,
    mutations,
    actions,
    getters,
    namespaced:true
}