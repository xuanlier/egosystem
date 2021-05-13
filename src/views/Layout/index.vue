<template>
  <div class="layout">
    <!-- 侧边栏 -->
    <SlideBar :isCollapse="flag" class="slideBar" />
    <!-- 右边导航 -->
    <RightNav @toggleMenu="toggleMenu" />
    <!-- 右边内容 -->
    <RightContent class="rightContent" :class="{ rightContent1: flag }" />
   
  </div>
</template>

<script>
import RightNav from "./RightNav/index";
import SlideBar from "./SlideBar/index";
import RightContent from "./RightContent/index";
export default {
  data() {
    return {
      flag: false,
    };
  },

  components: {
    RightNav,
    SlideBar,
    RightContent,
  },
  methods: {
    toggleMenu(val) {
      // console.log(val)
      this.flag = val;
    },
  },
};
</script>

<style lang="less" scoped>
.layout {
  height: 100%;
  overflow: hidden;
  .slideBar {
    float: left;
    height: 100%;
  }
.rightContent {
    margin-left: 200px;
  }
  .rightContent1 {
    margin-left: 64px;
  }
}
</style>