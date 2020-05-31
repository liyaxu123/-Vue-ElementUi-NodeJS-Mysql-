<template>
  <div class="bg">
    <!-- 面包屑导航区 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>后勤服务</el-breadcrumb-item>
      <el-breadcrumb-item>损耗报修</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 添加保修卡片视图区 -->
    <el-card>
      <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="80px">
        <el-row>
          <el-col :span="10">
            <!-- 选择日期 -->
            <el-form-item label="报修日期" prop="data">
              <el-date-picker
                v-model="addForm.data"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="请选择日期"
                :picker-options="pickerOptions"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <!-- 选择时间 -->
            <el-form-item label="报修时间" prop="time">
              <el-time-picker v-model="addForm.time" value-format="HH-mm-ss" placeholder="请选择时间"></el-time-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 报修表单 -->
        <el-row>
          <el-col :span="12">
            <el-form-item label="报修人" prop="name">
              <el-input v-model="addForm.name" placeholder="请输入您的姓名" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="联系电话" prop="tel">
              <el-input v-model="addForm.tel" placeholder="请输入您的联系电话" clearable></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="楼宇号" prop="lyNumber">
              <el-input v-model="addForm.lyNumber" placeholder="请输入您所在楼宇号" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="宿舍号" prop="sushe">
              <el-input v-model="addForm.sushe" placeholder="请输入您的宿舍号" clearable></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="问题描述" prop="detail">
          <el-input
            v-model="addForm.detail"
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 8}"
            placeholder="请描述具体损坏情况"
            clearable
          ></el-input>
        </el-form-item>
        <!-- 取消/添加报修按钮 -->
        <el-row type="flex" justify="end">
          <el-button @click="cancel">取消</el-button>
          <el-button type="primary" @click="addRepairs">添加报修</el-button>
        </el-row>
      </el-form>
      <p class="tishi" style="margin-top:60px">温馨提示：您好！同学，如有紧急报修项目请与楼管老师联系或者直接拨打后勤集团服务热线：123456</p>
      <p class="tishi">如不影响正常学习生活，请填写以上申请表，我们会尽快安排维修人员解决问题，谢谢您的配合！</p>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    // 添加手机号的验证规则
    var checkPhone = (rule, value, cb) => {
      // 验证手机号的正则表达式
      // const regPhone = /^(0|86|17951)?(13[0-9]|15[0123456789]|17[678]|18[0-9]|14[57])[0-9]{8}$/
      const regPhone = /^[1][3,4,5,7,8][0-9]{9}$/;
      if (regPhone.test(value)) {
        return cb();
      }
      cb(new Error("请输入合法的手机号"));
    };
    return {
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
        shortcuts: [
          {
            text: "今天",
            onClick(picker) {
              picker.$emit("pick", new Date());
            }
          }
        ]
      },
      // 添加报修数据表单
      addForm: {
        name: "",
        tel: "",
        lyNumber: "",
        sushe: "",
        // 要选择的日期
        data: "",
        // 要选择的时间
        time: "",
        detail: ""
      },
      // 添加报修表单的验证规则对象
      addFormRules: {
        name: [
          { required: true, message: "请输入您的姓名", trigger: "blur" },
          {message: "长度在 3 到 10 个字符", trigger: "blur" }
        ],
        data: [{ required: true, message: "请选择报修日期", trigger: "blur" }],
        time: [{ required: true, message: "请选择报修时间", trigger: "blur" }],
        tel: [
          { required: true, message: "请输入您的联系电话", trigger: "blur" },
          { validator: checkPhone, trigger: "blur" }
        ],
        lyNumber: [
          { required: true, message: "请填写您所在楼宇号", trigger: "blur" }
        ],
        sushe: [
          { required: true, message: "请填写您所在的宿舍号", trigger: "blur" }
        ],
        detail: [{ required: true, message: "请填写报修详情", trigger: "blur" }]
      }
    };
  },
  methods: {
    // 添加报修按钮，预验证成功后发起请求，添加数据到数据库
    addRepairs() {
      var _this = this;
      this.$refs.addFormRef.validate(valid => {
        console.log(valid);
        if (!valid) return;
        // 如果预校验成功则发起添加报修的请求
        this.$http
          .post("http://localhost:3000/shbx/add", this.addForm)
          .then(function(response) {
            console.log(response.data);
            if (response.data.code == 200) {
              _this.$message({
                showClose: true,
                message: "添加报修成功",
                type: "success"
              });
              _this.$refs.addFormRef.resetFields();
            }else{
              _this.$message({
                showClose: true,
                message: "添加报修失败",
                type: "error"
              });
            }
          })
      });
    },
    // 取消按钮
    cancel(){
      this.$refs.addFormRef.resetFields();
    }
  }
};
</script>

<style lang="css" scoped>
.bg {
  height: 100%;
  background: url(../../assets/img/12.jpg);
  background-size: cover;
}
.el-card {
  opacity: 0.8;
  margin-top: 0;
}
.el-breadcrumb {
  background: #eee;
  height: 30px;
  margin-bottom: 0;
}
.el-input,
.el-form-item {
  color: black;
}
.tishi {
  color: rgb(253, 56, 56);
  font-size: 14px;
  text-align: center;
}
</style>