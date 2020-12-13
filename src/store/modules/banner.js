import { reqlbtList } from '../../util/request'


const state = {
    list: [],
    
}

const mutations = {
    roleList(state, arr) {
        state.list = arr
    },
    

}

const actions = {
    requestlbtList(context) {
        reqlbtList({}).then(res => {
            var arr = res.data.list;
            // arr.forEach(item => {
            //     item.attrs = JSON.parse(item.attrs)
            // });
            context.commit('roleList', arr)
        })
    },
    



}

const getters = {
    list(state) {
        return state.list
    }

}

export default {
    state,
    mutations,
    actions,
    getters,
    namespaced: true
}