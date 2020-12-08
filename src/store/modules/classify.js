import {reqclassList} from '../../util/request'


const state={
    list:[],
  
}

const mutations={
   roleList(state,arr){
       state.list=arr
   },
   
}

const actions={
    requestclassList(context){
        reqclassList({istree:true}).then(res=>{
            context.commit('roleList',res.data.list)
        })
    },
    


}

const getters={
    list(state){
        return state.list
    },
    
}

export default {
    state,
    mutations,
    actions,
    getters,
    namespaced:true
}