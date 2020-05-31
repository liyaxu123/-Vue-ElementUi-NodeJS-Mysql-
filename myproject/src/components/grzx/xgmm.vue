<template>
  <div class="bg">
    <!-- 面包屑导航区 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>个人中心</el-breadcrumb-item>
      <el-breadcrumb-item>个人信息</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图区 -->
    <el-card>
      <el-form :model="userForm" ref="userFormRef" label-width="80px">
        <el-row>
          <el-col :span="6">
            <el-form-item label="姓名" prop="name">
              <el-input v-model="userForm.name" clearable disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="性别" prop="sex">
              <el-input v-model="userForm.sex" clearable disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="学号" prop="uname">
              <el-input v-model="userForm.uname" clearable disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="学院" prop="xueyuan">
              <el-input v-model="userForm.xueyuan" clearable :disabled="isTj"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="班级" prop="banji">
              <el-input v-model="userForm.banji" clearable :disabled="isTj"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="联系电话" prop="tel">
              <el-input v-model="userForm.tel" clearable :disabled="isTj"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="所在楼宇" prop="lynumber">
              <el-input v-model="userForm.lynumber" clearable :disabled="isTj"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="宿舍号" prop="sushe">
              <el-input v-model="userForm.sushe" clearable :disabled="isTj"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="10">
            <el-form-item label="修改密码" prop="pass">
              <el-input
                v-model="userForm.pass"
                show-password
                clearable
                :disabled="isTj"
                placeholder="请输入新密码"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 修改 -->
        <el-row type="flex" justify="end">
          <el-button type="warning" @click="editUserinfo">修改信息</el-button>
          <el-button type="success" :disabled="isTj" @click="submit">提交</el-button>
          <el-button type="primary" :disabled="isTj" @click="cancel">取消</el-button>
        </el-row>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 用户个人信息表单
      userForm: {},
      // 控制提交按钮是否可以点击以及输入框的编辑
      isTj: true
    };
  },
  methods: {
    // 修改按钮点击事件
    editUserinfo() {
      this.isTj = false;
    },
    // 提交按钮事件
    submit() {
      var _this = this;
      // 发起数据请求
      this.$http
        .post("http://localhost:3000/login/update", this.userForm)
        .then(function(response) {
          console.log(response.data);
          if (response.data.code == "200") {
            // 如果更新成功,弹出更新成功提示信息
            _this.$message({
              showClose: true,
              message: "数据修改成功",
              type: "success"
            });
            var userData = JSON.stringify(response.data.newResult[0]);
            window.sessionStorage.setItem("userData", userData);
            _this.isTj = true;
          }else{
            // 如果更新失败,弹出更新失败提示信息
            _this.$message({
              showClose: true,
              message: "数据修改失败",
              type: "error"
            });
          }
        });
      // alert("提交成功");
    },
    // 取消按钮事件
    cancel() {
      this.userForm = JSON.parse(window.sessionStorage.getItem("userData"));
      this.isTj = true;
    }
  },
  created() {
    this.userForm = JSON.parse(window.sessionStorage.getItem("userData"));
  }
};
</script>

<style lang="css" scoped>
</style>