import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'
import Layout from '../views/Layout'
import Product from '../views/Product'
import Specification from '../views/Specification'
import Personal from '../views/Personal'
import Advertising from '../views/Advertising'
import Login from '../views/Login/index'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Layout',
    component: Layout,
    redirect: '/product',   //默认显示
    children: [
      {
        path: '/product',
        name: 'Product',
        component:()=>import ('../views/Product/index')
      },
      {
        path: 'specification',
        name: 'Specification',
        component:()=>import ('../views/Specification/index')
      },
      {
        path: 'advertising',
        name: 'Advertising',
        component:()=>import ('../views/Advertising/index')
      },
      {
        path: 'personal',
        name: 'Personal',
        component:()=>import ('../views/Personal/index')
      },
    ],
    meta:{
      isLogin:true
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '*',
    component: Error
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_url,
  routes
})



export default router
