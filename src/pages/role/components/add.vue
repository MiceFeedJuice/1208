<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.isShow">
      <el-form :model="form">
        <el-form-item label="角色名称" :label-width="width">
          <el-input v-model="form.rolename" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色权限" :label-width="width">
          <el-tree
            :data="menulist"
            show-checkbox
            node-key="id"
            ref="tree"
            :props="defaultProps"
          >
          </el-tree>
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
import { reqRoleAdd, reqMenuRoleOne, reqRoleDit } from "../../../util/request";
export default {
  props: ["info"],
  components: {},
  data() {
    return {
      value: true,
      width: "70px",
      form: {
        rolename: "",
        menus: [],
        status: 1,
      },

      defaultProps: {
        children: "children",
        label: "title",
      },
    };
  },
  methods: {
    hide() {
      this.info.isShow = !this.info.isShow;
    },
    empty() {
      this.form = {
        rolename: "",
        menus: [],
        status: 1,
      };
      this.form.menus=this.$refs.tree.setCheckedKeys([])
    },
    ...mapActions({
      requestMenuList: "menu/requestMenuList",
      requestRoleList: "role/requestRoleList",
    }),
    add() {
      //添加角色信息
      this.form.menus = JSON.stringify(this.$refs.tree.getCheckedKeys());
      reqRoleAdd(this.form).then((res) => {
        this.hide();
        this.requestRoleList();
      });
    },
    //查看一条数据 编辑
    lookOne(id) {
      reqMenuRoleOne({ id: id }).then((res) => {
        this.form = res.data.list;
        this.form.menus = this.$refs.tree.setCheckedKeys(
          JSON.parse(res.data.list.menus)
        );
        this.form.id = id;
      });
    },
    delet() {
      //修改数据
      this.form.menus = JSON.stringify(this.$refs.tree.getCheckedKeys());
      reqRoleDit(this.form).then((res) => {
        this.hide();
        this.requestRoleList();
      });
    },
  },
  mounted() {
    this.requestMenuList();
  },

  computed: {
    ...mapGetters({
      menulist: "menu/list",
    }),
  },
  watch: {},
};
</script>
<style scoped>
</style>