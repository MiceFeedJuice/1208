<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.isShow">
      <el-form :model="form">
        <el-form-item label="手机号" :label-width="width">
          <el-input v-model="form.phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="昵称" :label-width="width">
          <el-input v-model="form.nickname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="width">
          <el-input v-model="form.password" autocomplete="off"></el-input>
        </el-form-item>

        

        <el-form-item label="状态" :label-width="width">
          <el-switch
            v-model="form.status"
            active-color="#13ce66"
            inactive-color="#ff4949"
            :active-value="1"
            :inactive-value="2"
          >
            >
          </el-switch>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="hide">取 消</el-button>
        
        <el-button type="primary" @click="delet" >修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import {
  reqMenuvipOne,
  reqvipDit
} from "../../../util/request";
export default {
  props: ["info"],
  components: {},
  data() {
    return {
      width: "70px",
      pwd:'',
      form: {
        uid: "",
        nickname: "",
        phone: "",
        password: "",
        status: 1,
      },
      annat: [
        {
          value: "",
        },
      ],
    };
  },
  methods: {
    

    hide() {
      this.info.isShow = !this.info.isShow;
    },
    empty() {
        this.annat=[{
            value:''
        }];
      this.form = {
        uid: "",
        nickname: "",
        phone: "",
        password: "",
        status: 1,
      };
    },
    ...mapActions({
      requestvipList: "goods/requestvipList",
    }),
    
    //查看一条数据 编辑
    lookOne(id) {
        
      reqMenuvipOne({ uid: id }).then((res) => {
        this.form = res.data.list;
        this.form.uid = id;
        this.pwd=this.form.password
        this.form.password=''
      });
    },
    delet() {
      //修改数据
      this.form.password=this.pwd
      reqvipDit(this.form).then((res) => {
        this.hide();
        this.requestvipList();
      });
    },
  },
  mounted() {
  },

  computed: {
    ...mapGetters({
      //引入仓库数据
      
    }),
  },
  watch: {},
};
</script>
<style scoped>
</style>