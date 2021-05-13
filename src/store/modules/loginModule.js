import api from "../../api"
import  jwt from "jwt-decode"
import router from "../../router"
import element  from "element-ui"
export default {
    namespaced: true,
    state: {
        userInfo: {
            user: '',
            token: '',
            isLogin: false,
        }
    },
    mutations: {
        setUser(state, params) {
            state.userInfo = params;
        }
    },
    actions: {
        async  getLoginActions({commit},params) {
          let  res =   await  api.getLogin(params)
          if(res.status ===200){
            //   console.log('-------',res);
              console.log(jwt(res.data))
              let temp ={
                user:jwt(res.data).username,
                token:res.data,
                isLogin:Boolean(res.data)
              }
              // 存储vux 
                commit('setUser',(temp))
              // 存储本地
              localStorage.setItem('userToken',JSON.stringify(temp))
              // 跳转
              router.push('/')
              }else{
                  // 错误，，，提示错误
                  console.log("错误")
                  // console.log(element)
                  // console.log(element.Message())
                  element.Message.error("账号或密码错误")
              }
        },
    }

}