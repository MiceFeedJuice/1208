<template>
  <div class="box">
    <div class="con">
      <h3>登录</h3>
      <div class="inp"><input type="text" placeholder='账号' v-model="user.username" /></div>
      <div class="inp"><input type="text" placeholder='密码' v-model="user.password" /></div>
      <div class="inp"><button @click="login">登录</button></div>
      
    </div>
  </div>
</template>
<script>
import { requserLogin } from "../../util/request";
import {mapGetters,mapActions} from 'vuex'
export default {
  components: {},
  data() {
    return {
      user: {
        username: "",
        password: "",
      },
    };
  },
  methods: {
    ...mapActions({
        requestuserList:'user/requestuserList',
        
    }),
    login() {
      requserLogin(this.user).then((res) => {
        if (res.data.code == 200) {
          console.log(res.data.list)
          this.requestuserList(res.data.list);
          this.$router.push("/index/home");
        } else {
          alert(res.data.msg);
        }
      });
    },
    dlbut(){
      if(JSON.parse(sessionStorage.getItem('list')).username){
        this.$router.push("/index/home");
      }
    }
    
  },
  mounted() {
    this.dlbut()
  },
  watch: {
  },
};
</script>
<style scoped>
.box {
  width: 100vw;
  height: 100vh;
  background: linear-gradient(to right, #563443, #303d60);
}
.con {
  width: 400px;
  height: 300px;
  background: #fff;
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 10px;
}
.con h3 {
  text-align: center;
  line-height: 60px;
}
.con .inp {
  width: 60%;
  height: 30px;
  margin: 25px auto;
  border: none;
}
.inp input {
  width: 100%;
  height: 30px;
  padding-left:5px ;
  border: 2px solid #333;
}
.inp button {
  width: 100%;
  height: 30px;
  margin-top: 15px;
  background: #409eff;
  font-weight: bold;
  font-size: 17px;
  color: #fff;
  outline: none;
  border: none;
}
</style>