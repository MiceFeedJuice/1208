<template>
  <div>
    <!-- 添加 -->
    <v-add :info="info" ref="one"></v-add>
    <!-- 列表 -->
    <v-list @listdit="listdit($event)"></v-list>
  </div>
</template>

<script>
import vAdd from "./components/add";
import vList from "./components/list";
export default {
  
  components: {
    vAdd,
    vList,
  },
  data() {
    return {
      info: {
        isShow: false,
        tadd: true,
        title: "vip编辑",
      },
    };
  },
  methods: {
    hide() {
      //点击添加
      this.info.isShow = !this.info.isShow;
      this.$refs.one.empty();
    },
    listdit(id) {
      //编辑弹窗
      (this.info = {
        isShow: true,
      }),
        this.$refs.one.lookOne(id);
    },
  },
  mounted() {},
  computed: {},
  watch: {},
};
</script>
<style>
</style>