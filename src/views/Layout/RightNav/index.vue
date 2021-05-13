<template>
  <div class="right">
    <div class="rightNav">
      
      <span @click="changeMenu">
        <i class="iconfont" :class="flag ? 'icon-zhedie2' : 'icon-zhedie1'"></i>
      </span>
      <div class="userBox">
        <div class="language">  
        <el-dropdown trigger="click" @command="clickDropDown">
      <span class="el-dropdown-link">
        语言切换<i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="china">中文</el-dropdown-item>
        <el-dropdown-item command="english">英文</el-dropdown-item>
        
      </el-dropdown-menu>
    </el-dropdown>
        </div>
        <div class="user">vip {{ userInfo.user }}</div>
        <div class="exit" @click="loginExit">
          <i class="iconfont icon-tuichufffpx"></i>
        </div>
      </div>
    </div>
 
  </div>
</template>

<script>
// 语言切换

import { mapState,mapMutations } from 'vuex';
export default {
  components: {

  },
  data(){
      return{
          flag:true
      }
  },
  computed:{
      ...mapState('loginModule',['userInfo'])
  },
  methods:{
    ...mapMutations("loginModule",['setUser']),
      changeMenu(){
      this.flag=!this.flag
      this.$emit('toggleMenu',this.flag)
          
      },
        //   退出登录
      loginExit(){
          //清空数据
        this.setUser({
            user:'',
            token:'',
            isLogin:false,
        });
        // 清空本地
        localStorage.removeItem('userToken')
        //返回登录页
        this.$router.push("/login")

      },
      //切换语言
      clickDropDown(command){
        console.log('123',command)
        // console.log(this)
        this.$i18n.locale = command
      }
  }
};
</script>

<style lang="less" scoped>
// @import url("./css/Right");
.rightNav {
  width: 100%;
  height: 56px;
  margin-bottom: 20px;
  background-color: #005ed1;
  span {
    color: #fff;
    line-height: 56px;
    margin-left: 5px;
    .iconfont {
      font-size: 26px;
    }
  }
  .userBox {
    height: 56px;
    // background-color:crimson;
    position: fixed;
    right: 5px;
    top: 0;
    line-height: 56px;
    div {
      float: left;
      margin: 0 10px;
      font-size: 18px;
      color: #fff;
      .iconfont {
        font-size: 26px;
        color: #fff;
      }
    }
  }
}

</style>