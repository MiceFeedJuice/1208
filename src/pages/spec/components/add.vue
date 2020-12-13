<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.isShow">
      <el-form :model="form">
        <el-form-item label="规格名称" :label-width="width">
          <el-input v-model="form.specsname" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item
          label="规格属性"
          :label-width="width"
          v-for="(item, index) in annat"
          :key="index"
        >
          <el-col :span="18"
            ><el-input v-model="item.value" autocomplete="off"></el-input
          ></el-col>
          <el-col :span="6">
            <el-button type="primary" v-if="index == 0" @click="butadd"
              >增加规格属性</el-button
            >
            <el-button type="danger" v-else @click="butdlt(index)"
              >删除</el-button
            >
          </el-col>
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
import {
  reqspecAdd,
  reqMenuspecOne,
  reqspecDit,
} from "../../../util/request";
export default {
  props: ["info"],
  components: {},
  data() {
    return {
      width: "70px",
      form: {
        specsname: "",
        attrs: "",
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
    butadd() {
      //增加属性
      this.annat.push({
        value: "",
      });
    },
    butdlt(index) {
      //删除属性
      this.annat.splice(index, 1);
    },

    hide() {
      this.info.isShow = !this.info.isShow;
    },
    empty() {
        this.annat=[{
            value:''
        }];
      this.form = {
        specsname: "",
        attrs: "",
        status: 1,
      };
    },
    ...mapActions({
      requestspecList: "spec/requestspecList",
      requestspectotal:'spec/requestspectotal',
    }),
    add() {
      //添加信息
      this.form.attrs=JSON.stringify(this.annat.map(item=>{return item.value}))
      
      reqspecAdd(this.form).then((res) => {
        this.empty();
        this.hide();
        this.requestspecList();
        this.requestspectotal()
      });
    },
    //查看一条数据 编辑
    lookOne(id) {
      reqMenuspecOne({ id: id }).then((res) => {
        this.form = res.data.list[0];
        this.form.id = id;
        this.annat =JSON.parse(this.form.attrs).map(item=>{return {value:item}})
      });
    },
    delet() {
      //修改数据
      this.form.attrs=JSON.stringify(this.annat.map(item=>{return item.value}))
      reqspecDit(this.form).then((res) => {
        this.hide();
        this.requestspecList();
      });
    },
  },
  mounted() {
    this.requestspecList();
  },

  computed: {
    ...mapGetters({
      //引入仓库数据
      speclist: "spec/list",
    }),
  },
  watch: {},
};
</script>
<style scoped>
</style>