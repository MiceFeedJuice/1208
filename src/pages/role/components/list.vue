<template>
  <div>
    <el-table
      :data="rolelist"
      style="width: 100%; margin-bottom: 20px"
      row-key="id"
      border
      default-expand-all
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    >
      <el-table-column prop="id" label="角色编号" sortable width="150">
      </el-table-column>
      <el-table-column prop="rolename" label="角色名称" sortable width="250">
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
  </div>
</template>

<script>
import { mapGetters,mapActions } from 'vuex'
import {reqRoleDel} from '../../../util/request'
export default {
  components: {},
  data() {
    return {};
  },
  methods: {
     /// 编辑
    listdit(id) {
        this.$emit('listdit',id)
    },
    ///删除一条数据
    listDelete(id) {
        reqRoleDel({id:id}).then(res=>{
            alert('删除成功')
            this.requestRoleList()
        })
    },
    ...mapActions({
        requestRoleList:'role/requestRoleList'
    })
  },
  mounted() {
      this.requestRoleList()
  },
  computed: {
      ...mapGetters({
          rolelist:'role/list'
      })
  },
  watch: {},
};
</script>
<style scoped>
</style>