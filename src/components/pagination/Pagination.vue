<template>


  <el-pagination  
  :hide-on-single-page="flag" 
  background 
  :page-size='pageSize'
  layout=" total, prev, pager, next ,jumper" 
  :total="total" 
  @current-change="currentChange"
  > 
  </el-pagination>

</template>

<script>
export default {
    props:{
        total:{
            type:Number,
            default:10
        },
        pageSize:{
            type:Number,
            default:1
        }
    },
    data(){
        return{
             flag:false
        }
    },
    methods:{
        currentChange(val){
            this.$emit("currentPage",val)
        }
    }
};
</script>

<style lang="less" scoped>

</style>