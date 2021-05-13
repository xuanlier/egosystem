<template>
  <div class="loginBox">
    <div class="card">
 <el-tabs v-model="activeName"  @tab-click="handleClick">
        <el-tab-pane label="登录" name="login">
          <el-form
            :model="ruleForm"
            status-icon
            :rules="rules"
            ref="ruleForm"
            label-width="60px"
            class="demo-ruleForm"
          >
         <el-form-item label="账号" prop="username">
              <el-input
                type="text"
                v-model="ruleForm.username"
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input
                type="password"
                v-model="ruleForm.password"
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('ruleForm')"
                >登录</el-button
              >
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="注册" name="register">
          <el-form
            :model="ruleForm"
            status-icon
            :rules="rules"
            ref="ruleForm"
            label-width="60px"
            class="demo-ruleForm"
          >
            <el-form-item label="账号" prop="username">
              <el-input
                type="text"
                v-model="ruleForm.username"
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input
                type="password"
                v-model="ruleForm.password"
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('ruleForm')"
                >注册</el-button
              >
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs> 
    </div>
  </div>
</template>

<script>
import { mapMutations, mapActions } from "vuex";
export default {
  data() {
    var validateUser = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入账号"));
      } else {
        callback();
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        // if (this.ruleForm.checkPass !== "") {
        //   this.$refs.ruleForm.validateField("checkPass");
        // }
        callback();
      }
    };

    return {
      activeName: "login",
      ruleForm: {
        username: "",
        password: "",
      },
      rules: {
        username: [{ validator: validateUser, trigger: "blur" }],
        password: [{ validator: validatePass, trigger: "blur" }],
      },
    };
  },
  methods: {
    ...mapMutations("loginModule", ["setUser"]),
    ...mapActions("loginModule", ["getLoginActions"]),
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let { username, password } = this.ruleForm;
          console.log(this.activeName);
          if (this.activeName === "login") {
            this.getLoginActions({
              username,
              password,
            });
            console.log("登录");
          } else {
            console.log("注册");
            this.$api
              .getRegister({
                username,
                password,
              })
              .then((res) => {
                console.log(res);
                if (res.status === 200) {
                  this.$message({
                    message: "注册成功，快去登录试试吧",
                    type: "success",
                  });
                } else {
                }
              });
          }
          //   alert("submit!");
          console.log("登录", this.ruleForm);
          // 网络请求
          // this.$api.getLogin({
          //       username,
          //       password,
          //   })
          //   .then((res) => {
          //     if(res.status ===200){
          //     console.log('-------',res);
          //     console.log(jwt(res.data))
          //     let temp ={
          //       user:jwt(res.data).username,
          //       token:res.data,
          //       isLogin:Boolean(res.data)
          //     }
          //     // 存储vux
          //     this.setUser(temp)
          //     // 存储本地
          //     localStorage.setItem('userToken',JSON.stringify(temp))
          //     // 跳转
          //     this.$router.push('/')
          //     }else{
          //         // 错误，，，提示错误
          //     }
          //   });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // resetForm(formName) {
    //   this.$refs[formName].resetFields();
    // },
    handleClick(tab) {
      // console.log(tab,event)
      // 切换tab的时候清空表单
      this.$refs.ruleForm.resetFields();
    },
  },
};
</script>

<style lang="less" scoped>
.loginBox {
  background-color: darkcyan;
  overflow: hidden;
}
.card {
  width: 400px;
  padding: 10px;
  height: 230px;
  margin: 200px auto;
  background-color: #fff;
  border-radius: 10px;
}
</style>