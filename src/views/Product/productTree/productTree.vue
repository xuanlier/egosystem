<template>
  <el-tree 
  :props="props" 
  :load="loadNode" 
  lazy 
  @node-click= "nodeClick"
  
  > </el-tree>
</template>

<script>
 export default {
    data() {
      return {
        props: {
          label: 'name',
          children: 'zones',
          isLeaf: 'leaf'
        },
      };
    },
    methods: {
        /**
         * 点击node 节点
         */
        nodeClick(data,node,arr){
            console.log(data)
            this.$emit('changeTree',data)
        },
      loadNode(node, resolve) {
        if (node.level === 0) {
            this.$api.selectItemCategory().then(res=>{
                console.log(res)
                if(res.status === 200){
                    return resolve(res.result);
                }
            })
        }
        if (node.level >= 1) 
            this.$api.selectItemCategory({
                id:node.data.cid
            }).then(res=>{
                console.log(res)
                if(res.status === 200){
                    return resolve(res.result)
                    
                }else{
                    return resolve([])
                }
            })
        
      }
    }
  };
</script>

<style lang="less" scoped>
</style>