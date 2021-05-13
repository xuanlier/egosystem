//创建express框架
const express=require('express')
//创建服务
const app=express()
//post请求
app.use(express.urlencoded({ extended: true }))
 // for parsing application/x-www-form-urlencoded
 //配置资源共享
const cors=require('cors')
app.use(cors())

//静态文件托管 ----  访问：http:localhost:8000/图片.jpg
app.use(express.static('upload'))

//引入路由
const router=require('./router')
//使用路由
app.use('/api',router)

//监听
app.listen(8000,()=>{
    console.log("服务器端口：",8000);
})