<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.isShow">
      <el-form :model="form">
        <el-form-item label="菜单名称" :label-width="width">
          <el-input v-model="form.title" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="上级菜单" :label-width="width">
          <el-select
            v-model="form.pid"
            placeholder="---请选择---"
            @change="levelstate"
          >
            <el-option label="顶级菜单" :value="0"></el-option>
            <el-option
              v-for="item in menulist"
              :key="item.id"
              :label="item.title"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="菜单类型" :label-width="width">
          <el-radio v-model="form.type" :label="1" disabled>目录</el-radio>
          <el-radio v-model="form.type" :label="2" disabled>菜单</el-radio>
        </el-form-item>

        <el-form-item
          label="菜单图标"
          :label-width="width"
          v-if="form.type == 1"
        >
          <el-select v-model="form.icon" placeholder="--请选择图标--">
            <el-option label="雪糕" value="el-icon-ice-cream-round">
              <i class="el-icon-ice-cream-round"></i>
            </el-option>
            <el-option label="棒棒糖" value="el-icon-lollipop">
              <i class="el-icon-lollipop"></i>
            </el-option>
            <el-option label="薯条" value="el-icon-potato-strips">
              <i class="el-icon-potato-strips"></i>
            </el-option>
            <el-option label="可乐" value="el-icon-milk-tea">
              <i class="el-icon-milk-tea"></i>
            </el-option>
            <el-option label="鸭梨" value="el-icon-pear">
              <i class="el-icon-pear"></i>
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="菜单地址" :label-width="width" v-else>
          <el-select v-model="form.url" placeholder="请选择地址">
            <el-option
              v-for="item in indexRouters"
              :key="item.path"
              :label="'/' + item.path"
              :value="item.name"
            ></el-option>
          </el-select>
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
        <el-button type="primary" @click="dit" v-else>修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { indexRouters } from "../../../router/index";
import { reqMenuAdd, reqMenuListOne, reqMenuDit } from "../../../util/request";
import { mapGetters, mapActions } from "vuex";
export default {
  computed: {
    ...mapGetters({
      menulist: "menu/list",
    }),
  },
  props: ["info"],
  components: {},
  data() {
    return {
      value: true,
      width: "70px",
      form: {
        pid: "",
        title: "",
        icon: "",
        type: 0,
        url: "",
        status: 1,
      },
      indexRouters: indexRouters,
    };
  },
  methods: {
    hide() {
      //隐藏弹框
      this.info.isShow = false;
    },
    empty() {
      this.form = {
        pid: "",
        title: "",
        icon: "",
        type: 0,
        url: "",
        status: 1,
      };
    },
    add() {
      //添加
      reqMenuAdd(this.form).then((res) => {
        this.hide();
        this.requestMenuList();
      });
    },
    levelstate() {
      //判断目录级别
      this.form.type = this.form.pid == 0 ? 1 : 2;
    },
    //查看一条数据
    lookOne(id) {
      reqMenuListOne({ id: id }).then((res) => {
        this.form = res.data.list;
        this.form.id = id;
      });
    },
    ...mapActions({
      requestMenuList: "menu/requestMenuList",
    }),
    //修改 编辑
    dit() {
      reqMenuDit(this.form).then((res) => {
        this.hide();
        this.requestMenuList();
        // this.empty()
      });
    },
  },
  mounted() {},

  watch: {},
};
</script>
<style scoped>
</style>