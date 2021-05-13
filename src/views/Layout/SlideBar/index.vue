<template>
    <div class="sidebar">
         <el-menu
      :default-active="$route.path"
      class="el-menu-vertical-demo"
      background-color="#304156"
      text-color="#fff"
      active-text-color="rgb(77,88,255)"
      router
      :collapse="isCollapse"
      >
      <el-menu-item >
        <!-- <i calss="img">
            <img src="../../../assets/images/500X500.png" alt="">
        </i> -->
        <span >易购管理系统</span>
      </el-menu-item>
      <el-menu-item index="/product">
        <i class="el-icon-menu"></i>
        <!-- <span slot="title">商品管理</span> -->
        <span slot="title">{{ $t("message.product") }}</span>
      </el-menu-item>
      <el-menu-item index="/specification" >
        <i class="el-icon-document"></i>
        <!-- <span slot="title">规格参数</span> -->
        <span slot="title">{{ $t('message.params')}}</span>
      </el-menu-item>
      <el-menu-item index="/advertising">
        <i class="el-icon-view"></i>
        <!-- <span slot="title">广告分类</span> -->
        <span slot="title">{{ $t("message.ad") }}</span>
      </el-menu-item>
      <el-menu-item index="/personal">
        <i class="el-icon-setting"></i>
        <!-- <span slot="title">个人中心</span> -->
        <span slot="title">{{$t("message.personal")}}</span>
      </el-menu-item>
      <el-submenu index="">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>导航一</span>
        </template>
        <el-menu-item-group>
          <template slot="title">分组一</template>
          <el-menu-item index="1-1">选项1</el-menu-item>
          <el-menu-item index="1-2">选项2</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group title="分组2">
          <el-menu-item index="1-3">选项3</el-menu-item>
        </el-menu-item-group>
        <el-submenu index="1-4">
          <template slot="title">选项4</template>
          <el-menu-item index="1-4-1">选项1</el-menu-item>
        </el-submenu>
      </el-submenu>
    </el-menu>
    </div>
</template>

<script>
    export default {
        props:{
            isCollapse:{
                type:Boolean,
                default:false
            }
        },
        methods:{

        }
    }
</script>

<style lang="less" scoped>
// @import url('./css/slideBar');
.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
  .el-menu{
      height:100%;
  }
    .el-menu-vertical-demo{
        border: none;
    }
</style>