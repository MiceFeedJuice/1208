<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.isShow">
      <el-form :model="form">
        <el-form-item label="活动名称" :label-width="width">
          <el-input v-model="form.title" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="活动期限" :label-width="width">
          <el-date-picker
            v-model="time"
            value-format='timestamp'
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          >
          </el-date-picker>
        </el-form-item>

        <el-form-item label="一级分类" :label-width="width">
          <el-select
            v-model="form.first_cateid"
            placeholder="---请选择---"
            @change="catclass"
          >
            <el-option
              v-for="item in classlist"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="二级分类" :label-width="width">
          <el-select
            v-model="form.second_cateid"
            placeholder="---请选择---"
            @change="catgoods"
          >
            <el-option
              v-for="item in secondCate"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品" :label-width="width">
          <el-select v-model="form.goodsid" placeholder="---请选择---">
            <el-option
              v-for="item in secondgood"
              :key="item.id"
              :label="item.goodsname"
              :value="item.id"
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
        <el-button type="primary" @click="delet" v-else>修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { reqsecAdd,reqMenusecOne,reqsecDit } from "../../../util/request";
export default {
  props: ["info"],
  components: {},
  data() {
    return {
      secondCate: [],
      secondgood: [],
      width: "70px",
      time: [],
      form: {
        title: "",
        begintime: "",
        endtime: "",
        first_cateid: "",
        second_cateid: "",
        goodsid: "",
        status: 1,
      },
    };
  },
  methods: {
    catclass() {
      //获取二级分类
      this.form.second_cateid = "";

      this.secondCate = this.classlist.find((item) => {
        return item.id == this.form.first_cateid;
      }).children;
    },
    catgoods() {
      //获取商品
      this.secondgood = [];
      this.form.goodsid = "";
      this.goodslist.forEach((item) => {
        if (item.second_cateid == this.form.second_cateid) {
          this.secondgood.push(item);
        }
      });
    },

    hide() {
      this.info.isShow = !this.info.isShow;
    },
    empty() {
      this.time=[]
      this.form = {
        title: "",
        begintime: "",
        endtime: "",
        first_cateid: "",
        second_cateid: "",
        goodsid: "",
        status: 1,
      };
    },
    ...mapActions({
      requestclassList: "classify/requestclassList",
      requestgoodsList: "goods/requestgoodsList",
      requestsecList:'seckill/requestsecList'
    }),
    add() {
      //添加信息
      this.form.begintime=this.time[0]
      this.form.endtime=this.time[1]
      reqsecAdd(this.form).then((res) => {
        this.empty();
        this.hide();
        this.requestsecList()
      });
    },
    //查看一条数据 编辑
    lookOne(id) {
      this.time=[]
      reqMenusecOne({ id: id }).then((res) => {
        this.form = res.data.list;
        this.form.id = id;
        this.time.push(this.form.begintime)
        this.time.push(this.form.endtime)

      });
    },
    delet() {
      //修改数据
      this.form.begintime=this.time[0]
      this.form.endtime=this.time[1]
      reqsecDit(this.form).then((res) => {
        this.hide();
        this.requestsecList()
      });
    },
  },
  mounted() {
    this.requestclassList();
    this.requestgoodsList();
  },

  computed: {
    ...mapGetters({
      //引入仓库数据
      classlist: "classify/list",
      goodslist: "goods/list",
    }),
  },
  watch: {},
};
</script>
<style scoped>
</style>