import {reqRoleList} from '../../util/request'


const state={
    list:[],
}

const mutations={
   roleList(state,arr){
       state.list=arr
   }
}

const actions={
    requestRoleList(context){
        reqRoleList().then(res=>{
            context.commit('roleList',res.data.list)
        })
    }

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