<template>
  <div>
    <el-container>
      <el-aside width="200px">
        <el-menu
          default-active="/index/home"
          router
          class="el-menu-vertical-demo"
          background-color="#20222A"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <el-menu-item index="/index/home">
            <i class="el-icon-menu"></i>
            <span slot="title">首页</span>
          </el-menu-item>


          <div v-for="item in list.menus" :key="item.id">
            <el-submenu index="1">
            <template slot="title">
              <i :class="item.icon"></i>
              <span>{{item.title}}</span>
            </template>
            <el-menu-item-group>
              <el-menu-item :index="'/index'+i.url" v-for='i in item.children' :key="i.id">{{i.title}}</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          </div>
          

          <!-- <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-goods"></i>
              <span>商城管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/index/classify">商品分类</el-menu-item>
              <el-menu-item index="/index/spec">商品规格</el-menu-item>
              <el-menu-item index="/index/goods">商品管理</el-menu-item>
              <el-menu-item index="/index/vip">会员管理</el-menu-item>
              <el-menu-item index="/index/banner">轮播图管理</el-menu-item>
              <el-menu-item index="/index/seckill">秒杀管理</el-menu-item>
            </el-menu-item-group>
          </el-submenu> -->
        </el-menu>
      </el-aside>
      <el-container>
        <el-header>
          <span class="span2"><el-button type="danger" @click="buttc">退出</el-button></span>
          <span class="span1">{{list.username}}</span>
          
          </el-header>
        <el-main>
            <!-- 名字 -->
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>{{$route.name}}</el-breadcrumb-item>
          </el-breadcrumb>
          <!-- 路由出口 -->
          <div id="ejck"><router-view></router-view></div>
          
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>

import {mapGetters,mapActions} from 'vuex'

export default {
  components: {},
  data() {
    return {};
  },
  methods: {
    ...mapActions({
        requestuserList:'user/requestuserList'
    }),
    buttc(){
      this.requestuserList({});
      this.$router.push("/login");
    }
  },
  mounted() {
   
  },
  computed: {
    ...mapGetters({
      list:'user/list'
    })
  },
  watch: {},
};
</script>
<style scoped>
span{
  float: right;
  margin: 0 10px;
}


.el-header {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #20222a;
  color: #333;
  text-align: center;
  line-height: 200px;
  height: 100vh;
  overflow: hidden;
}
.el-aside ul {
  overflow: hidden;
  width: 200px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
}
#ejck{
    margin-top: 20px;
}
</style>