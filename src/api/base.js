const base = {
    baseUrl:'http://localhost:8000',
    login:'/api/api/login',     //登陆接口
    register:'/api/api/register',   //注册接口
    search:'/api/api/search',       //商品搜索
    productList:'/api/api/projectList',    //商品分页
    selectItemCategory:"/api/api/backend/itemCategory/selectItemCategoryByParentId",    //类目选择  弹框内层
    upload:'/api/upload',   //上传图片接口
    insertTbItem:"/api/api/backend/item/insertTbItem",  //商品添加
    deleteItemById:'/api/api/backend/item/deleteItemById',      //删除商品
    batchDelete:'/api/api/batchDelete',     //批量删除
    updateTbItem:'/api/api/backend/item/updateTbItem', //修改商品

}

export default base