<template>
  <div>
    <!-- 面包屑导航区 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户权限列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图区 -->
    <el-card>
      <!-- 搜索添加区域 -->
      <el-row :gutter="30">
        <el-col :span="8">
          <el-input placeholder="请输入姓名" v-model="queryInfo.query" clearable>
            <el-button slot="append" icon="el-icon-search" @click="search(queryInfo.query)"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="addDialogVisible=true">添加用户</el-button>
        </el-col>
      </el-row>
      <!-- 表格数据区域 -->
      <el-table :data="userlist" stripe border height="420">
        <el-table-column type="index"></el-table-column>
        <el-table-column label="姓名" prop="name"></el-table-column>
        <el-table-column label="性别" prop="sex"></el-table-column>
        <el-table-column label="联系电话" prop="tel"></el-table-column>
        <el-table-column label="角色" prop='roler' :formatter="formatRole"></el-table-column>
        <el-table-column label="操作" id="cz">
          <template slot-scope="scope">
            <!-- 修改按钮 -->
            <el-tooltip effect="dark" content="修改" placement="top" :enterable="false">
              <el-button
                type="primary"
                icon="el-icon-edit"
                size="mini"
                @click="showEditDialog(scope.row)"
              ></el-button>
            </el-tooltip>
            <!-- 删除按钮 -->
            <el-tooltip effect="dark" content="删除" placement="top" :enterable="false">
              <el-button
                type="danger"
                icon="el-icon-delete"
                size="mini"
                @click="removeUserById(scope.row.id)"
              ></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页区域 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[1, 2, 5, 7,10]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
      <!-- 添加用户的对话框 -->
      <el-dialog title="添加用户" :visible.sync="addDialogVisible" width="50%" @close="addDialogClosed">
        <!-- 内容主体区 -->
        <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="80px">
          <el-form-item label="姓名" prop="userName">
            <el-input v-model="addForm.userName"></el-input>
          </el-form-item>
          <el-form-item label="性别" prop="sex">
            <el-select v-model="addForm.sex" placeholder="请选择性别">
              <el-option label="男" value="男"></el-option>
              <el-option label="女" value="女"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="联系电话" prop="telephone">
            <el-input v-model="addForm.telephone"></el-input>
          </el-form-item>
          <el-form-item label="角色" prop="role">
            <el-select v-model="addForm.role" placeholder="请选择角色">
              <el-option label="超级管理员" value="0"></el-option>
              <el-option label="普通管理员" value="1"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <!-- 底部按钮区 -->
        <span slot="footer" class="dialog-footer">
          <el-button @click="addDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="addUser">确 定</el-button>
        </span>
      </el-dialog>
      <!-- 修改用户信息的对话框 -->
      <el-dialog
        title="修改用户"
        :visible.sync="editdialogVisible"
        width="50%"
        @close="editDialogClosed"
      >
        <!-- 内容主体 -->
        <el-form :model="editForm" :rules="editFormRules" ref="editFormRef" label-width="80px">
          <el-form-item label="姓名" prop="">
            <el-input v-model="editForm.name" disabled></el-input>
          </el-form-item>
          <el-form-item label="联系电话" prop="">
            <el-input v-model="editForm.tel" clearable></el-input>
          </el-form-item>
          <el-form-item label="角色" prop="">
            <el-select v-model="editForm.roler" placeholder="请选择角色">
              <el-option label="超级管理员" value="0"></el-option>
              <el-option label="普通管理员" value="1"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="editdialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="editUserInfo">确 定</el-button>
        </span>
      </el-dialog>
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
      userlist: [],
      queryInfo: {
        // 搜索关键字
        query: "",
        // 当前页数
        pagenum: 1,
        // 当前页每页显示多少条数据
        pagesize: 7
      },
      // 总页数
      total: 7,
      // 控制添加用户对话框的显示与隐藏
      addDialogVisible: false,
      // 控制编辑用户对话框的显示与隐藏
      editdialogVisible: false,
      // 添加用户的表单数据
      addForm: {
        userName: "",
        sex: "",
        telephone: "",
        role: ""
      },
      // 添加表单的验证规则对象
      addFormRules: {
        userName: [
          { required: true, message: "请输入姓名", trigger: "blur" },
          { min: 3, max: 10, message: "长度在 3 到 10 个字符", trigger: "blur" }
        ],
        sex: [{ required: true, message: "请选择性别", trigger: "blur" }],
        telephone: [
          { required: true, message: "请输入联系电话", trigger: "blur" },
          { validator: checkPhone, trigger: "blur" }
        ],
        role: [{ required: true, message: "请选择用户角色", trigger: "blur" }]
      },
      // 修改用户的表单数据
      editForm: {
        id: "",
        name: "",
        tel: "",
        roler: ""
      },
      // 修改用户的表单验证规则对象
      editFormRules: {
        userName: [
          { required: true, message: "请输入姓名", trigger: "blur" },
          { min: 3, max: 10, message: "长度在 3 到 10 个字符", trigger: "blur" }
        ],
        telephone: [
          { required: true, message: "请输入联系电话", trigger: "blur" },
          { validator: checkPhone, trigger: "blur" }
        ],
        role: [{ required: true, message: "请选择用户角色", trigger: "blur" }]
      },
      // 控制分配角色对话框的显示与隐藏
      setRoleDialogVisible: false,
      // 需要被分配角色的用户信息
      userInfo: {},
      // 已选中角色的id值
      selectedRoleId:''
    };
  },
  created() {
    this.oneQuest();
  },
  methods: {
    // 格式化 table 表格数据
    formatRole(row){
      return row.roler=='0'?'超级管理员':'普通管理员'
    },
    // 封装页面加载请求函数
    oneQuest() {
      var _this = this;
      this.$http
        .post("http://localhost:3000/yhqx/search", this.queryInfo)
        .then(function(response) {
          console.log(response.data);
          if (response.data.code == 200) {
            _this.userlist = response.data.data;
            _this.total = response.data.total;
          }
        });
    },
    // 监听pageSize改变的事件
    handleSizeChange(newSize) {
      console.log(newSize);
      this.queryInfo.pagesize = newSize;
      this.oneQuest();
    },
    // 监听页码值改变的事件
    handleCurrentChange(newPage) {
      console.log(newPage);
      this.queryInfo.pagenum = newPage;
      this.oneQuest();
    },
    // 监听 switch开关状态的改变
    userStateChanged(userInfo) {
      console.log(userInfo);
      // 发起请求
    },
    // 搜索按钮
    search(user) {
      console.log(user);
      // 此处不应该这样写，应该发送请求获取后台数据在渲染表格
      this.oneQuest()
    },
    // 监听添加用户对话框关闭事件
    addDialogClosed() {
      this.$refs.addFormRef.resetFields();
    },
    // 点击确定按钮，添加新用户
    addUser() {
      var _this = this;
      this.$refs.addFormRef.validate(valid => {
        console.log(valid);
        if (!valid) return;
        // 如果预校验成功则发起添加用户请求
        this.$http
        .post("http://localhost:3000/yhqx/add", this.addForm)
        .then(function(response) {
          console.log(response.data);
          if (response.data.code == 200) {
            _this.$notify({
                title: "成功",
                message: "添加用户成功",
                type: "success"
              });
           _this.oneQuest();
           _this.addDialogVisible  = false
          }
        });
        
      });
    },
    // 展示编辑用户的对话框
    showEditDialog(user) {
      this.editdialogVisible = true;
      console.log(user);
      // 此处不应该这样渲染，应该根据用户id发起请求，得到用户信息后再渲染
      this.editForm.name = user.name;
      this.editForm.tel = user.tel;
      this.editForm.roler = user.roler;
      this.editForm.id = user.id;
      // 根据用户id发起请求，得到用户信息
    },
    // 监听修改用户对话框关闭事件
    editDialogClosed() {
      this.$refs.editFormRef.resetFields();
    },
    // 点击修改用户信息对话框的确定按钮，修改信息并提交
    editUserInfo() {
      var _this = this;
      this.$refs.editFormRef.validate(valid => {
        console.log(valid);
        if (!valid) return;
        // 如果预校验成功则发起修改用户信息的请求
        this.$http
        .post("http://localhost:3000/yhqx/edit", this.editForm)
        .then(function(response) {
          console.log(response.data);
          if (response.data.code == 200) {
            _this.$notify({
                title: "成功",
                message: "修改成功",
                type: "success"
              });
           _this.oneQuest();
           _this.editdialogVisible  = false
          }else if(response.data.code == 0){
             _this.$notify({
                title: "失败",
                message: "修改失败",
                type: "error"
              });
          }
        })
      });
    },
    // 根据用户id删除用户
    async removeUserById(id) {
      var _this = this;
      // 弹框询问用户是否删除数据
      const cofirmResult = await this.$confirm(
        "此操作将永久删除该用户, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      ).catch(err => err);
      // 如果用户确认删除，则返回字符串 confirm
      // 如果取消删除，则返回字符串 cancel
      // console.log(cofirmResult)
      if (cofirmResult !== "confirm") {
        return this.$message({
          showClose: true,
          message: "已取消删除",
          type: "info"
        });
      }
      this.$http
        .post("http://localhost:3000/yhqx/del", {id:id})
        .then(function(response) {
          console.log(response.data);
          if (response.data.code == 200) {
            _this.$notify({
                title: "成功",
                message: "删除成功",
                type: "success"
              });
           _this.oneQuest();
          }else if(response.data.code == 0){
             _this.$notify({
                title: "失败",
                message: "删除失败",
                type: "error"
              });
          }
        })
      console.log("确认了删除");
    },
    // 展示分配角色的对话框
    setRole(userInfo) {
      this.userInfo = userInfo;
      this.setRoleDialogVisible = true;
    },
    // 监听分配角色对话框的关闭事件
    setRoleDialogClosed(){
      this.selectedRoleId = ''
    }
  }
};
</script>

<style lang="css" scoped>
.marginTop{
  margin-top: 15px;
}
#cz{
  display: flex;
  justify-content: space-around;
}
</style>