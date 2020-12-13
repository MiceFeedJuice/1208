<template>
<div>
    <el-button type='primary' @click="hide">添加</el-button>
    <!-- 添加 -->
    <v-add :info='info' ref="one"></v-add>
    <!-- 列表 -->
    <v-list @listdit='listdit($event)'></v-list>
</div>
</template>

<script>
import vAdd from './components/add'
import vList from './components/list'
export default {
components: {
    vAdd,
    vList
},
data() {
return {
    info:{
        isShow:false,
        tadd:true,
        title:'商品规格添加'
    }
};
},
methods: {
hide(){//点击添加
    this.info.isShow=!this.info.isShow
    this.info.tadd=true
    this.info.title='商品规格添加'
    this.$refs.one.empty()
},
listdit(id){//编辑弹窗
    this.info={
        isShow:true,
        tadd:false,
        title:'商品规格编辑'
    },
    this.$refs.one.lookOne(id)
}
},
mounted() {

},
computed: {

},
watch: {},
}
</script>
<style>

</style>