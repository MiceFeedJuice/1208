<template>
  <div id="box">
    
    <el-table
      :data="list"
      style="width: 100%; margin-bottom: 20px"
      row-key="id"
      border
      default-expand-all
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    >
      <el-table-column prop="id" label="用户编号" sortable width="180">
      </el-table-column>
      <el-table-column prop="nickname" label="菜单名称" sortable width="180">
      </el-table-column>
      <el-table-column prop="phone" label="菜单名称" sortable width="180">
      </el-table-column>
      

      <el-table-column prop="status" label="状态">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.status==1">启用</el-button>
          <el-button type="info" v-else>禁用</el-button>
        </template>
      </el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="listdit(scope.row.uid)"
            >编辑</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import {reqMenuAdd,reqMenuListOne,reqMenuDel} from '../../../util/request'
export default {
  computed: {
    ...mapGetters({
      list: "goods/vip",
    }),
  },
  components: {},
  data() {
    return {};
  },
  methods: {
    ...mapActions({
      requestvipList: "goods/requestvipList",
    }),
    //编辑id
    listdit(id) {
        console.log(id)
      this.$emit('listdit',id)
    },
    
  },
  mounted() {
    this.requestvipList();
  },
  watch: {},
};
</script>
<style scoped>
#box {
  margin-top: 20px;
}
</style>