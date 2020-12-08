<template>
  <div>
    <el-table
      :data="mangerlist"
      style="width: 100%; margin-bottom: 20px"
      row-key="id"
      border
      default-expand-all
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    >
      <el-table-column prop="id" label="用户编号" sortable width="150">
      </el-table-column>
      <el-table-column prop="username" label="用户名称" sortable width="250">
      </el-table-column>
      <el-table-column prop="rolename" label="所属角色" sortable width="250">
      </el-table-column>

      <el-table-column prop="status" label="状态">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.status == 1"
            >启用</el-button
          >
          <el-button type="info" v-else>禁用</el-button>
        </template>
      </el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="listdit(scope.row.uid)"
            >编辑</el-button
          >
          <el-button type="danger" @click="listDelete(scope.row.uid)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination  :page-size='2' layout="prev, pager, next" :total="total" @current-change='changeCurrentPage'> </el-pagination>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { reqmangDel } from "../../../util/request";
export default {
  components: {},
  data() {
    return {};
  },
  methods: {
    /// 编辑
    listdit(id) {
      this.$emit("listdit", id);
      console.log(this.total)
    },
    ///删除一条数据
    listDelete(id) {
      reqmangDel({ uid: id }).then((res) => {
        alert("删除成功");
        this.requestmangList();
        this.requestmangtotal()//获取总数量
        this.requestmangpage(1);//跳回第一页
      });
    },
    ...mapActions({
      requestmangList: "manger/requestmangList",
      requestmangtotal:'manger/requestmangtotal',
      requestmangpage:'manger/requestmangpage'
    }),
    changeCurrentPage(p){//换页
    console.log(p)
    this.requestmangpage(p)
    }
  },
  mounted() {
    this.requestmangList();
    this.requestmangtotal()
  },
  computed: {
    ...mapGetters({
      mangerlist: "manger/list",
      total:'manger/total'
    }),
  },
  watch: {},
};
</script>
<style scoped>
.el-pagination{
margin: 0 auto;
text-align: center;
}
</style>