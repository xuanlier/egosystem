<template>
  <div class="product">
    <!-- 搜索框 -->
    <div class="searchInput">
      <el-input v-model="input" placeholder="请输入内容" @change="changeInput">
      </el-input>
      <el-button type="primary">查询</el-button>
      <el-button type="success" @click="addProduct">添加</el-button>
      <!-- 添加商品的弹框 -->
      <DialogVisible ref="myDialog" :rowData="rowData" :title="title"/>
    </div>
    <!-- 表格数据列表 -->
    <el-table
      :data="tableData"
      style="width: 100%"
      ref="myTable"
      @selection-change="selectionChange"
    >
      <el-table-column type="selection" width="50"> </el-table-column>
      <el-table-column prop="id" label="商品ID" width="100"> </el-table-column>
      <el-table-column
        prop="title"
        label="商品名称"
        width="120"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column
        prop="price"
        label="商品价格"
        width="120"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column
        prop="num"
        label="商品数量"
        width="120"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column prop="category" label="规格类目" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="image" label="商品图片" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="sellPoint" label="商品卖点" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="descs" label="商品描述" show-overflow-tooltip>
      </el-table-column>
      <el-table-column label="操作" width="200">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <div style="margin-top: 20px">
      <el-button @click="deleteSelection">批量删除</el-button>
      <el-button @click="toggleSelection([tableData[1], tableData[2]])"
        >切换第2.3行的选中状态</el-button
      >
      <el-button @click="toggleSelection()">取消选择</el-button>
    </div>
    <div class="pagination">
      <Pagination
        :pageSize="pageSize"
        :total="total"
        @currentPage="currentPage"
      />
    </div>
  </div>
</template>

<script>
import DialogVisible from "../Product/dialogVisible/DialogVisible";
import Pagination from "../../components/pagination/Pagination";

// import  SearchInput from "../../components/searchInput/SearchInput"
export default {
  components: {
    DialogVisible,
    Pagination,
    // SearchInput
  },
  data() {
    return {
      input: "",
      tableData: [],
      pageSize: 1, //每页多少条
      total: 10, //总条数
      input: "", //输入框值
      idArr:[], //暂存
      rowData:{}, //当前行的数据
      title:"添加商品"
    };
  },
  // props:{
  //   rowData:{
  //     type:Object,
  //     default:function(){
  //       return {}
  //     }
  //   }
  // },
  // // 监听数据的变化
  // watch:{
  //   rowData(val){
  //     console.log('监听',val);
  //     this.ruleForm = val;
  //     this.ruleForm.desc = val.descs
  //     //设置值  ---执行顺序的问题  延迟加载 this.$netxTick(res)
  //   console.log(this.$refs.wangEditor);
  //     this.$refs.wangEditor.editor.txt.html(val.descs)
  //   }
  // },
  methods: {
    /**
     * 编辑按钮
     */
    handleEdit(index,row) {
      this.$refs.myDialog.dialogVisible=true;
      //显示数据   把对当前行的数据 ---传递给子组件弹框
      console.log("row------",row)
      // this.rowData = row;
      this.rowData = Object.assign({},row)
      this.title="编辑商品"
    },
    /**
     * 删除按钮
     */
    handleDelete(index, rowData) {
      console.log(index, rowData);
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$api
            .deleteItemById({
              id: rowData.id,
            })
            .then((res) => {
              console.log(res);
              if (res.status === 200) {
                this.$message({
                  type: "success",
                  message: "删除成功!",
                });
                //更新视图
                this.http(1);
              } else {
              }
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },

    // 获取点击的页码
    currentPage(val) {
      console.log(val);
      this.http(val);
    },
    change() {
      this.dialogVisible = false;
    },
    /**
     * 搜索框    ---失去焦点    ---回车
     */
    changeInput(val) {
      console.log(val);
      if (val) {
        this.$api
          .search({
            search: val,
          })
          .then((res) => {
            if (res.status === 200) {
              console.log(res.result);
              this.tableData = res.result; //需要拆开
              this.pageSize = 8;
              this.total = res.result.lenght;
            } else {
              console.log(res);
              this.tableData = [];
              this.pageSize = 1;
              this.total = 1;
            }
          });
      } else {
        this.http(1);
      }
    },
    /**
     *添加商品的
     */
    addProduct() {
      console.log("添加商品");
      this.$refs.myDialog.dialogVisible = true;
      this.title="添加商品"
    },

    // 网络请求动态数据
    http(page) {
      this.$api.productList({ page }).then((res) => {
        // console.log("----", res);
        if (res.status === 200) {
          // console.log(res.data);
          this.tableData = res.data;
          (this.pageSize = res.pageSize), (this.total = res.total);
        } else {
        }
      });
    },
    // 选择 ///全选
    toggleSelection(rows) {
      if (rows) {
        //切换多少行显示
        rows.forEach((row) => {
          this.$refs.myTable.toggleRowSelection(row);
        });
      } else {
        //取消按钮
        this.$refs.myTable.clearSelection();
      }
    },
    //批量删除
    deleteSelection() {
      console.log("批量删除");
      this.$api.batchDelete({
        idArr:this.idArr
      }).then((res) => {
        if(res.status ===200){
          this.$message({
            type:'success',
            message:'删除成功'
          });
          //更新视图
          this.http(1)
        }
        console.log(res.id);
      });
    },
    /**
     *选择需要删除的
     */
    selectionChange(selection){
      // console.log(selection);
      let arr=[];
      selection.forEach(ele=>{
        // console.log(ele.id)
        arr.push(ele.id)
      })
      // console.log(arr)
      this.idArr = arr
    }
  },

  mounted() {
    this.http(1);
  },
};
</script>

<style lang="less" scoped>
.pagination {
  margin-top: 20px;
  text-align: center;
}
.searchInput {
  display: flex;
  box-sizing: border-box;
  padding: 5px 10px 15px 10px;
  border-bottom: 1px solid #eee;
  .search {
    margin-right: 15px;
  }
}
</style>