<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.isShow">
      <el-form :model="form">
        
        <el-form-item label="所属角色" :label-width="width">
          
          <el-select
            v-model="form.roleid"
            placeholder="---请选择---"
          >
            
            <el-option
              v-for="item in rolelist"
              :key="item.id"
              :label="item.rolename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="用户名" :label-width="width">
          <el-input v-model="form.username" autocomplete="off"></el-input>
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
        <el-button type="primary" @click="add" v-if="info.tadd == true"
          >添 加</el-button
        >
        <el-button type="primary" @click="delet" v-else>修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { reqmangAdd, reqMenumangOne, reqmangDit } from "../../../util/request";
export default {
  props: ["info"],
  components: {},
  data() {
    return {
      value: true,
      width: "70px",
      form: {
        roleid:'',
        username:'',
        password:'',
        status:1,
      },

      
    };
  },
  methods: {
    hide() {
      this.info.isShow = !this.info.isShow;
    },
    empty() {
      this.form = {
        roleid:'',
        username:'',
        password:'',
        status:1,
      };
    },
    ...mapActions({
      requestRoleList:'role/requestRoleList',//获取下选框信息
      requestmangList:'manger/requestmangList',//刷新页面
      requestmangtotal:'manger/requestmangtotal',//获取页数/总信息数量
    }),
    add() {
      //添加信息
      reqmangAdd(this.form).then((res) => {
        this.hide();
        this.requestmangList()//刷新页面
        this.requestmangtotal()//获取页数/总信息数量
      });
    },
    //查看一条数据 编辑
    lookOne(id) {
      reqMenumangOne({ uid: id }).then((res) => {
        this.form = res.data.list;
        this.form.password=''
        this.form.uid = id;
      });
    },
    delet() {
      //修改数据

      reqmangDit(this.form).then((res) => {
        this.hide();
        this.requestmangList()
      });
    },
  },
  mounted() {
    this.requestRoleList();
    this.requestmangList()
  },

  computed: {
    ...mapGetters({//引入仓库数据
      rolelist:'role/list',//下选框数据
      mangerlist:'manger/list'//页面数据

    }),
  },
  watch: {},
};
</script>
<style scoped>
</style>