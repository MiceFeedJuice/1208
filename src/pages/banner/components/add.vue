<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.isShow" >
      <el-form :model="form">
        

        <el-form-item label="标题" :label-width="width">
          <el-input v-model="form.title" autocomplete="off"></el-input>
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
import { reqlbtAdd,reqMenulbtOne,reqlbtDit } from "../../../util/request";
export default {
  props: ["info"],
  components: {},
  data() {
    return {
      imageUrl:'',
      width: "70px",
      form: {
        title: "",
        img: null,
        status: 1,
      },

      
    };
  },
  methods: {
    

      //上传图片
      changImg(e){
        var file = e.raw
          this.imageUrl = URL.createObjectURL(file);
          this.form.img = file
      },


    hide() {
      this.info.isShow = !this.info.isShow;
    },
    empty() {
        this.imageUrl=''
      this.form = {
        title: "",
        img: null,
        status: 1,
      };
    },
    ...mapActions({
      requestlbtList:'banner/requestlbtList'
    }),
    add() {
      //添加信息
      
      reqlbtAdd(this.form).then(res=>{
        this.empty()
        this.hide()
        this.requestlbtList()
      })
        
    },
    //查看一条数据 编辑
    lookOne(id) {
        reqMenulbtOne({ id: id }).then((res) => {
          this.form = res.data.list;
          this.form.id = id;
          this.imageUrl = this.$preImg+res.data.list.img
        });
    },
    delet() {
      //修改数据
        reqlbtDit(this.form).then((res) => {
          this.hide();
          this.requestlbtList()
        });
    },
  },
  mounted() {
    this.requestlbtList()
  },

  computed: {
    ...mapGetters({
      //引入仓库数据
      list:'banner/list'
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
    border-color: #409EFF;
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