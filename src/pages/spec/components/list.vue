<template>
  <div>
    <el-table
      :data="list"
      style="width: 100%; margin-bottom: 20px"
      row-key="id"
      border
      default-expand-all
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    >
      <el-table-column prop="id" label="规格编号" sortable width="180">
      </el-table-column>
      <el-table-column prop="specsname" label="规格名称" sortable width="180">
      </el-table-column>
       <el-table-column  label="规格属性" sortable width="180">
         <template slot-scope="scope">
          <el-tag v-for='item in scope.row.attrs' :key="item">{{item}}</el-tag>
         </template>
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
          <el-button type="primary" @click="listdit(scope.row.id)"
            >编辑</el-button
          >
          <el-button type="danger" @click="listDelete(scope.row.id)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination  :page-size='size' layout="prev, pager, next" :total="total" @current-change='changeCurrentPage'> </el-pagination>
    
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { reqspecDel } from "../../../util/request";
export default {
  components: {},
  data() {
    return {
    };
  },
  methods: {
    /// 编辑
    listdit(id) {
      this.$emit("listdit", id);
    },
    ///删除一条数据
    listDelete(id) {
      reqspecDel({ id: id }).then((res) => {
        alert("删除成功");
        this.requestspecList()
        this.requestspectotal()
        this.requestspecpage(1)
      });
    },
    ...mapActions({
    requestspecList:'spec/requestspecList',
    requestspectotal:'spec/requestspectotal',
    requestspecpage:'spec/requestspecpage',
    }),
    changeCurrentPage(p){//换页
    console.log(p)
    this.requestspecpage(p)
    }
  },
  mounted() {
    this.requestspecList()
    this.requestspectotal()
  },
  computed: {
    ...mapGetters({
    list:'spec/list',
    total:'spec/total',
    size:'spec/size',
    
    }),
  },
  watch: {},
};
</script>
<style scoped>
img{
  width: 200px;
}
</style>