<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.isShow" >
      <el-form :model="form">
        <el-form-item label="上级分类" :label-width="width">
          <el-select v-model="form.pid" placeholder="---请选择---" >
            <el-option label="顶级分类" :value="0"></el-option>
            <el-option
              v-for="item in classlist"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="分类名称" :label-width="width">
          <el-input v-model="form.catename" autocomplete="off"></el-input>
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
import { reqclassAdd,reqMenuclassOne,reqclassDit } from "../../../util/request";
export default {
  props: ["info"],
  components: {},
  data() {
    return {
      imageUrl:'',
      width: "70px",
      form: {
        pid: "",
        catename: "",
        img: null,
        status: 1,
      },

      
    };
  },
  methods: {
    beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },




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
      this.form = {
        pid: "",
        catename: "",
        img: null,
        status: 1,
      };
    },
    ...mapActions({
      requestclassList:'classify/requestclassList'
    }),
    add() {
      //添加信息
      reqclassAdd(this.form).then(res=>{
        this.empty()
        this.hide()
        this.requestclassList()
      })
        
    },
    //查看一条数据 编辑
    lookOne(id) {
        reqMenuclassOne({ id: id }).then((res) => {
          this.form = res.data.list;
          this.form.id = id;
          this.imageUrl = this.$preImg+res.data.list.img
        });
    },
    delet() {
      //修改数据
        reqclassDit(this.form).then((res) => {
          this.hide();
          this.requestclassList()
        });
    },
  },
  mounted() {
    this.requestclassList()
  },

  computed: {
    ...mapGetters({
      //引入仓库数据
      classlist:'classify/list'
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