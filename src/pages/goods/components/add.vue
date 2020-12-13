<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.isShow" @opened="changeEditor">
      <el-form :model="form">
        <el-form-item label="一级分类" :label-width="width">
          <el-select v-model="form.first_cateid" placeholder="---请选择---" @change="catclass">
            <el-option
              v-for="item in classlist"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
              
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="二级分类" :label-width="width">
          <el-select v-model="form.second_cateid" placeholder="---请选择---">
            <el-option
              v-for="item in secondCate"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="商品名称" :label-width="width">
          <el-input v-model="form.goodsname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="价格" :label-width="width">
          <el-input v-model="form.price" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="市场价格" :label-width="width">
          <el-input v-model="form.market_price" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="图片" :label-width="width">
          <el-upload
            class="avatar-uploader"
            action="#"
            :show-file-list="false"
            :on-change="changImg"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>

        <!-- 规格 -->
        <el-form-item label="商品规格" :label-width="width">
          <el-select v-model="form.specsid" placeholder="---请选择---" @change="catspec">
            <el-option
              v-for="item in speclist"
              :key="item.id"
              :label="item.specsname"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="规格属性" :label-width="width">
          <el-select v-model="form.specsattr" placeholder="---请选择---" multiple>
            <el-option
              v-for="item in secondSpec"
              :key="item.id"
              :label="item"
              :value="item"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="是否新品" :label-width="width">
          <el-radio v-model="form.isnew" :label="1" >是</el-radio>
          <el-radio v-model="form.isnew" :label="2" >否</el-radio>
        </el-form-item>
        <el-form-item label="是否热卖" :label-width="width">
          <el-radio v-model="form.ishot" :label="1" >是</el-radio>
          <el-radio v-model="form.ishot" :label="2" >否</el-radio>
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

        <el-form-item label="商品描述" :label-width="width">
        <div id="div1" v-if='info.isShow'></div>
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
// 引入富文本
import E from "wangeditor";



import { mapGetters, mapActions } from "vuex";
import {reqgoodsAdd,reqMenugoodsOne,reqgoodsDit} from "../../../util/request";
export default {
  props: ["info"],
  components: {},
  data() {
    return {
      imageUrl: "",
      width: "70px",
      secondCate:[],
      secondSpec:[],
      form: {
        first_cateid: '',
        second_cateid: '',
        goodsname: "",
        price: '',
        market_price: '',
        img: null,
        description: "",
        specsid: '',
        specsattr: [],
        isnew: 1,
        ishot: 1,
        status: 1,
        // first_cateid一级分类编号second_cateid二级分类编号goodsname商品名称price商品价格market_price市场价格img商品图片（文件）description商品描述specsid商品规格编号specsattr商品规格属性isnew是否新品     1-是 2-否ishot是否热卖推荐 1-是 2-否status
      },
    };
  },
  methods: {

      // 页面加载完成创建富文本编辑器
    changeEditor() {
      this.editor = new E("#div1");
      this.editor.create();
      this.editor.txt.html(this.form.description)
    },

    //上传图片
    changImg(e) {
      var file = e.raw;
      this.imageUrl = URL.createObjectURL(file);
      this.form.img = file;
    },

    hide() {
      this.info.isShow = !this.info.isShow;
    },
    empty() {
      this.imageUrl=''
      this.form = {
        first_cateid: '',
        second_cateid: '',
        goodsname: "",
        price: '',
        market_price: '',
        img: null,
        description: "",
        specsid: '',
        specsattr: [],
        isnew: 1,
        ishot: 1,
        status: 1,
      };
    },
    ...mapActions({
      requestclassList: "classify/requestclassList",
      requestspecList:'spec/requestspecList',
      requestgoodsList:'goods/requestgoodsList'
    }),
    catclass(){//二级分类
    this.form.second_cateid = '';
    this.secondCate=this.classlist.find((item)=>{
          return item.id==this.form.first_cateid
      }).children
    },
    catspec(){//规格属性
    this.form.specsattr = [];
    this.secondSpec=this.speclist.find((item)=>{
        return item.id==this.form.specsid;
    }).attrs
    },
    add() {
      //添加信息
      reqgoodsAdd(this.form).then((res) => {
        this.empty();
        this.hide();
        this.requestgoodsList();
      });
    },
    //查看一条数据 编辑
    lookOne(id) {
      reqMenugoodsOne({ id: id }).then((res) => {
        this.form = res.data.list;
        this.form.id = id;
        this.imageUrl = this.$preImg + res.data.list.img;

        this.form.specsattr = this.form.specsattr.split(",");
      });
    },
    delet() {
      //修改数据
      this.form.description = this.editor.txt.html()
      reqgoodsDit(this.form).then((res) => {
        this.hide();
        this.requestgoodsList();
      });
    },
  },
  mounted() {
    this.requestclassList();
    this.requestspecList();
    this.requestgoodsList()
  },

  computed: {
    ...mapGetters({
      //引入仓库数据
      classlist: "classify/list",
      speclist:'spec/list'
    }),
  },
  watch: {},
};
</script>
<style scoped>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  border: 1px dashed #ccc;
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>