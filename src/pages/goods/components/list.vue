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
      <el-table-column prop="id" label="商品编号"  width="80">
      </el-table-column>
      <el-table-column prop="goodsname" label="商品名称"  width="80">
      </el-table-column>
       <el-table-column prop="price" label="商品价格"  width="80">
      </el-table-column>
       <el-table-column prop="market_price" label="市场价格" width="80">
      </el-table-column>
      <el-table-column label="图片"  width="200">
        <template slot-scope="scope"> 
          <img :src="$preImg+scope.row.img" alt="">
        </template>
      </el-table-column>
      <el-table-column prop="status" label="是否新品" width="100">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.isnew == 1"
            >是</el-button
          >
          <el-button type="danger" v-else>否</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="status" label="是否热卖" width="100">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.ishot == 1"
            >是</el-button
          >
          <el-button type="danger" v-else>否</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="status" label="状态" width="150">
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
import { mapGetters, mapActions } from "vuex";
import { reqgoodsDel } from "../../../util/request";
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
      reqgoodsDel({ id: id }).then((res) => {
        alert("删除成功");
        this.requestgoodsList()
      });
    },
    ...mapActions({
    requestgoodsList:'goods/requestgoodsList'
    }),
    
  },
  mounted() {
    this.requestgoodsList()
  },
  computed: {
    ...mapGetters({
    list:'goods/list'
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