import store from '../store'
import router from './index'

router.beforeEach((to,from,next)=>{
  // 1.先判断是否先要登录  matched
  if (to.matched.length > 0 && !to.matched.some(record => record.meta.isLogin)) {
    next(); //login  404
  }else{
    // 需要登录
    // 2.判断是否已经登录   token 数据
    if(store.state.loginModule.userInfo.token){
      next()
    }else{
      next('/login')
    }
  }
  next();
})