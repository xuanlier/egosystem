import Vue from 'vue'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n)

// 准备翻译的语言环境信息
const messages = {
    english: {
      message: {
        product: 'goods management',
        params:'specification',
        ad:'advertising find',
        personal:'personal center'
      },
    },
    china: {
      message: {
        product: '商品管理',
        params:'规格参数',
        ad:'广告分类',
        personal:"个人中心"
      }
    }
  }

  // 通过选项创建 VueI18n 实例
const i18n = new VueI18n({
    locale: 'english', // 设置地区
    messages, // 设置地区信息
  })
  
//导出
export default i18n