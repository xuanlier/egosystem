import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
  import "./router/router-permission"
import './plugins/element.js'
import './assets/resetCss/reset.less'
import "./assets/iconfont/iconNav/iconfont.css"
import i18n from "./language/index"

// 挂载
import api from './api'
Vue.prototype.$api = api
Vue.config.productionTip = false

//获取本地数据
let user = localStorage.getItem('userToken')
if(user){
  store.commit('loginModule/setUser',JSON.parse(user))
}

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
