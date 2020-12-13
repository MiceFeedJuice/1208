import { reqsecList } from '../../util/request'


const state = {
    list: [],
    
}

const mutations = {
    roleList(state, arr) {
        state.list = arr
    },
    
}

const actions = {
    requestsecList(context) {
        reqsecList().then(res => {
            var arr = res.data.list;
            
            context.commit('roleList', arr)
        })
    },
    



}

const getters = {
    list(state) {
        return state.list
    },
    

}

export default {
    state,
    mutations,
    actions,
    getters,
    namespaced: true
}