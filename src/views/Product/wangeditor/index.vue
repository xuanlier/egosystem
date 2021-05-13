<template>
  <div id="main"></div>
</template>

<script>
import E from "wangeditor";
export default {
  data() {
    return {
      editor: "",
    };
  },
  mounted() {
    this.editor = new E("#main");
    // 取消自动聚焦
    this.editor.config.focus = false;
    // 配置 onchange 回调函数
    this.editor.config.onchange = (val) =>{
      console.log("change 之后最新的 html", val);
        this.$emit('wangeditor',val)
    };
    this.editor.create();
  },
};
</script>

<style lang="less" scoped>
</style>