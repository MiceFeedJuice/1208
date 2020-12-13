import { reqspecList ,reqspecOunt} from '../../util/request'


const state = {
    list: [],
    size:10,//每页展示的条数
    page:1,//当前第几页
    total:0,//商品规格总数量
}

const mutations = {
    roleList(state, arr) {
        state.list = arr
    },
    roletotal(state, arr) {
        state.total = arr
    },
    rolepage(state, arr) {
        state.page = arr
    },

}

const actions = {
    requestspecList(context) {
        reqspecList({
            size: context.state.size,
            page: context.state.page
        }).then(res => {
            var arr = res.data.list;
            arr.forEach(item => {
                item.attrs = JSON.parse(item.attrs)
            });
            context.commit('roleList', arr)
        })
    },
    requestspectotal(context){
        reqspecOunt().then(res=>{
            context.commit('roletotal',res.data.list[0].total)
        })
    },
    requestspecpage(context,page){
        context.commit('rolepage',page)
        // 根据当前点击的页码数，重新发送请求，由于mutations没有权限修改actions所以需要借助仓库（context）
        context.dispatch('requestspecList')
    },



}

const getters = {
    list(state) {
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
    namespaced: true
}