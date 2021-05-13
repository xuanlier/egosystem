<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogVisible"
    width="75%"
    :before-close="handleClose"
  >
    <!-- 表单 -->
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <!-- 内弹框 -->
      <el-dialog
        width="40%"
        title="类目选择"
        :visible.sync="innerVisible"
        append-to-body
      >
        <ProductTree @changeTree="changeTree" />
        <span slot="footer" class="dialog-footer">
          <el-button @click="innerVisible = false">取 消</el-button>
          <el-button type="primary" @click="innerVisible = false"
            >确 定</el-button
          >
        </span>
      </el-dialog>
      <!-- 图片内弹框 -->
      <el-dialog
        width="40%"
        title="上传图片"
        :visible.sync="innerVisibleImage"
        append-to-body
      >
        <ProductUpload @uploadImage="uploadImage" />
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="innerVisibleImage = false"
            >确 定</el-button
          >
        </span>
      </el-dialog>

      <el-form-item label="类目选择" props="category">
        <el-button type="primary" @click="innerVisible = true"
          >类目选择</el-button
        >
        {{ ruleForm.category }}
      </el-form-item>
      <el-form-item label="商品名称" prop="title">
        <el-input v-model="ruleForm.title"></el-input>
      </el-form-item>
      <el-form-item label="商品价格" prop="price">
        <el-input v-model="ruleForm.price"></el-input>
      </el-form-item>
      <el-form-item label="商品数量" prop="num">
        <el-input v-model="ruleForm.num"></el-input>
      </el-form-item>
      <el-form-item label="商品卖点" prop="sellPoint">
        <el-input v-model="ruleForm.sellPoint"></el-input>
      </el-form-item>
      <el-form-item label="商品图片" prop="image">
        <el-button type="primary" @click="innerVisibleImage = true"
          >上传图片</el-button
        >
        <img
          :src="ruleForm.image"
          alt=""
          style="width: 120px; vertical-align: top"
        />
      </el-form-item>
      <el-form-item label="商品描述" prop="desc">
        <Wangeditor @wangeditor="wangeditor" ref="wangeditor" />
      </el-form-item>
    </el-form>

    <span slot="footer" class="dialog-footer">
      <el-button @click="resetForm('ruleForm')">取 消</el-button>
      <el-button type="primary" @click="submitForm('ruleForm')"
        >确 定</el-button
      >
    </span>
  </el-dialog>
</template>

<script>
import ProductTree from "../productTree/productTree";
import ProductUpload from "../productUpload/ProductUpload";
import Wangeditor from "../wangeditor/index";
export default {
  components: {
    ProductTree,
    ProductUpload,
    Wangeditor,
  },
  data() {
    return {
      dialogVisible: false,
      innerVisibleImage: false, //图片弹框
      innerVisible: false, //类目弹框
      // 弹框
      ruleForm: {
        title: "",
        price: "",
        num: "",
        sellPoint: "",
        cid: "",
        category: "",
        image: "",
        desc: "", //编译信息
      },
      rules: {
        title: [{ required: true, message: "请输入活动名称", trigger: "blur" }],
        price: [
          {
            required: true,
            message: "请输入价格，数字格式，ps:19.00",
            trigger: "change",
          },
        ],
        num: [
          {
            required: true,
            message: "请输入数量，数字格式,ps:888",
            trigger: "change",
          },
        ],
        sellPoint: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
        ],
      },
    };
  },
  props: {
    rowData: {
      type: Object,
      default: function () {
        return {};
      },
    },
    title:{
      type:String,
      default:"标题"
    }
  },
  // 监听数据的变化
  watch: {
    rowData(val) {
      this.$nextTick(() => {
        console.log("监听", val);
        this.ruleForm = val;
        this.ruleForm.desc = val.descs;
        // 设置编译器的值
        this.$refs.wangEditor.editor.txt.html(val.descs);
      });
      //   //设置值  ---执行顺序的问题  延迟加载 this.$netxTick(res)
      // console.log(this.$refs.wangEditor);
      //   this.$refs.wangEditor.editor.txt.html(val.descs)
    },
  },
  methods: {
    /**
     * 点击treehuoqu shuju
     */
    changeTree(val) {
      console.log(val);
      this.ruleForm.category = val.name;
      this.ruleForm.cid = val.cid;
    },
    /**
     * 点击上传图片回显
     *
     */
    uploadImage(val) {
      console.log(val);

      this.ruleForm.image = val;
    },
    // 编译器
    wangeditor(val) {
      console.log(val);
    },
    //添加弹框的
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        // 请求添加商品
        if (valid) {
          let {
            title,
            price,
            num,
            sellPoint,
            cid,
            category,
            image,
            desc,
          } = this.ruleForm;
          if(this.title == '添加商品'){
            
          }else{
              console.log("编辑商品")
              this.$api.updateTbTem({
                title,
                image,
                sellPoint,
                price,
                cid,
                category,
                num,
                desc,
                id
              }).then(res=>{
                    console.log(res)
                    if(res.status===200){
                      this.$message({
                        message:'恭喜你，修改商品成功',
                        type:"success",
                      });
                      this.$parent.http(1);
                      this.resetForm(formName);
                    }
              })
          }
          this.$api
            .insertTbItem({
              title,
              price,
              num,
              sellPoint,
              cid,
              category,
              image,
              desc,
            })
            .then((res) => {
              console.log(res);
              if (res.status === 200) {
                // // 隐藏弹框
                // this.dialogVisible = false
                // 添加成功弹框
                this.$message({
                  message: "恭喜你，这是一条成功消息",
                  type: "success",
                });
                //更新列表
                this.$parent.http(1);
                // 清空表单数据  隐藏弹框
                //  this.$refs[formName].resetFields();
                this.restForm(formName);
              }
            });
        } else {
          console.log("error submit!!");
          this.$message.error("错了哦，这是一条错误消息");
          return false;
        }
      });
    },
    /**
     * 清空表单数据
     */
    restForm(formName) {
      this.$refs[formName].resetFields();
      // 隐藏弹框
      this.dialogVisible = false;
      // 清空编译器
      this.$refs.wangEditor.editor.txt.clear();
      ///
      // this.ruleForm= {
      //   title: "",
      //   price: "",
      //   num: "",
      //   sellPoint: "",
      //   cid: "",
      //   category: "",
      //   image: "",
      //   desc: "", //编译信息
      // }
    },
    /**
     * 点击关闭按钮
     */
    handleClose(done) {
      this.restForm("ruleForm");
      // this.$confirm('确认关闭？')
      //   .then(_ => {
      //     done();
      //   })
      //   .catch(_ => {});
    },
  },
};
</script>

<style lang="less" scoped>
</style>