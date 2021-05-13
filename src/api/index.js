import { get,post } from '../utils/request'
import base from './base';

const api = {
    /**
     *登录  username   password
     */
    getLogin(params){
        return post(base.login,params)
    },

    /**
     * 注册接口
     */
    getRegister(params){
        return post(base.register,params)
    },
    /**
     * 商品搜索  search 
     */
    search(params){
        return get(base.search,params)
    },

    /**
     * 商品列表接口
     */
    productList(params){
        return get(base.productList,params)
    },
    /**
     * 类目选择
     * 
     */
     selectItemCategory(params){
         return get( base.selectItemCategory,params)
     },

     /**
      * 商品添加
      * title cid  category sellPoint price num desc paramsInfo image
      */
    insertTbItem(params){
        return get(base.insertTbItem,params)
    },
    /**
     * deleteItemById
     * 商品删除
     */
     deleteItemById(params){
        return get(base.deleteItemById,params)
     },
     /**
      * 批量删除
      */
      batchDelete(){
          return get(base.batchDelete,params)
      },
      /**
       * 修改商品
       */
       updateTbItem(params){
           return get(base.updateTbItem,params)
       }
}


export default api