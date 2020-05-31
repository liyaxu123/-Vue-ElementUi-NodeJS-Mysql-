<template>
  <div>
    <!-- 面包屑导航区 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>宿舍管理</el-breadcrumb-item>
      <el-breadcrumb-item>宿舍列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 搜索选项 卡片视图区 -->
    <el-card>
      <el-form label-width="60px">
        <el-row>
          <!-- 楼宇号下拉选框 -->
          <el-col :span="6">
            <el-form-item label="楼宇号">
              <el-select v-model="lynumber" placeholder="请选择楼宇号" clearable>
                <el-option
                  v-for="item in lyNamelist"
                  :key="item.id"
                  :label="item.lynumber"
                  :value="item.lynumber"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <!-- 要搜索的宿舍号 -->
          <el-col :span="6">
            <el-form-item label="宿舍号">
              <el-input v-model="ssnumber" placeholder="请输入宿舍号" clearable></el-input>
            </el-form-item>
          </el-col>
          <!-- 搜索按钮 -->
          <el-col :span="6">
            <el-button type="primary" icon="el-icon-search" @click="search">搜索</el-button>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
    <!-- 宿舍详细信息展示区域 -->
    <el-card>
      <el-table
        :data="sslist"
        style="width: 100%"
        stripe
        border
        :row-key="getRowKeys"
        :expand-row-keys="expands"
        height="380"
      >
        <!-- @expand-change="expandchange" -->
        <!-- 展开列 -->
        <el-table-column type="expand">
          <template slot-scope="scope">
            <!-- {{scope.row}} -->
            <h3 v-text="scope.row.sushe +'号宿舍人员名单'" style="text-align:center"></h3>
            <!-- 每行展开列表格 -->
            <el-table :data="scope.row.child" stripe border>
              <el-table-column type="index" width="30px"></el-table-column>
              <el-table-column prop="name" label="姓名" width="60px"></el-table-column>
              <el-table-column prop="uname" label="学号"></el-table-column>
              <el-table-column prop="tel" label="电话"></el-table-column>
              <el-table-column prop="fdy" label="辅导员" width="60px"></el-table-column>
              <el-table-column prop="fdytel" label="辅导员电话"></el-table-column>
              <el-table-column prop="xueyuan" label="学院" width="60px"></el-table-column>
              <el-table-column prop="banji" label="班级"></el-table-column>
              <el-table-column label="操作" width="150px">
                <template slot-scope="scope">
                  <!-- 编辑按钮 -->
                  <el-tooltip effect="dark" content="编辑" placement="top" :enterable="false">
                    <el-button
                      type="warning"
                      icon="el-icon-edit"
                      size="mini"
                      @click="showEditDialog(scope.row)"
                    ></el-button>
                  </el-tooltip>
                  <!-- 删除学生按钮 -->
                  <el-tooltip effect="dark" content="删除" placement="top" :enterable="false">
                    <el-button
                      type="danger"
                      icon="el-icon-delete"
                      size="mini"
                      @click="removelyInfoById(scope.row.id)"
                    ></el-button>
                  </el-tooltip>
                </template>
              </el-table-column>
            </el-table>
          </template>
        </el-table-column>
        <el-table-column prop="sushe" label="宿舍号"></el-table-column>
        <!-- <el-table-column prop="attribute" label="宿舍属性"></el-table-column>
        <el-table-column prop="lyNumber" label="所属楼宇"></el-table-column>
        <el-table-column prop="leader" label="楼管"></el-table-column>
        <el-table-column prop="lgtel" label="楼管电话"></el-table-column>-->
        <el-table-column prop="ssz" label="宿舍长"></el-table-column>
        <el-table-column prop="member" label="状态">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.child.length < 6">未满</el-tag>
            <el-tag type="danger" v-else>已满</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="150px">
          <template slot-scope="scope">
            <!-- {{scope.row.sushe}}
            {{scope.row.sex}}
            {{scope.row.lyid}}-->
            <!-- 查看按钮 -->
            <el-tooltip effect="dark" content="查看" placement="top" :enterable="false">
              <el-button type="success" icon="el-icon-view" size="mini" @click="rowClik(scope.row)"></el-button>
            </el-tooltip>
            <!-- 添加学生按钮 -->
            <el-tooltip effect="dark" content="分配学生" placement="top" :enterable="false">
              <el-button
                type="warning"
                icon="el-icon-plus"
                size="mini"
                v-if="scope.row.child.length < 6 ? true:false"
                @click="addStudent(scope.row.sushe,scope.row.sex,scope.row.lyid)"
              ></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[1, 2, 5, 10]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
      <!-- 分配学生对话框 -->
      <el-dialog title="分配学生" :visible.sync="addDialogVisible" width="50%" @close="addDialogClosed">
        <!-- 内容主体区 -->
        <el-form :model="addForm" ref="addFormRef" :rules="addFormRules" label-width="100px">
          <el-form-item label="姓名" prop="name">
            <el-input v-model="addForm.name"></el-input>
          </el-form-item>
          <el-form-item label="学号" prop="studentId">
            <el-input v-model="addForm.studentId"></el-input>
          </el-form-item>
          <el-form-item label="电话" prop="tel">
            <el-input v-model="addForm.tel"></el-input>
          </el-form-item>
          <el-form-item label="辅导员" prop="fdy">
            <el-input v-model="addForm.fdy"></el-input>
          </el-form-item>
          <el-form-item label="辅导员电话" prop="fdytel">
            <el-input v-model="addForm.fdytel"></el-input>
          </el-form-item>
          <el-form-item label="学院" prop="xueyuan">
            <el-input v-model="addForm.xueyuan"></el-input>
          </el-form-item>
          <el-form-item label="班级" prop="banji">
            <el-input v-model="addForm.banji"></el-input>
          </el-form-item>
        </el-form>
        <!-- 底部按钮区 -->
        <span slot="footer" class="dialog-footer">
          <el-button @click="addDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="addUser">确 定</el-button>
        </span>
      </el-dialog>
      <!-- 编辑学生信息的对话框 -->
      <el-dialog
        title="编辑学生信息"
        :visible.sync="editdialogVisible"
        width="50%"
        @close="editDialogClosed"
      >
        <!-- 内容主体 -->
        <el-form :model="editForm" ref="editFormRef" :rules="editFormRules" label-width="120px">
          <el-form-item label="姓名" prop="name">
            <el-input v-model="editForm.name" disabled></el-input>
          </el-form-item>
          <el-form-item label="学号" prop="uname">
            <el-input v-model="editForm.uname" clearable></el-input>
          </el-form-item>
          <el-form-item label="联系电话" prop="tel">
            <el-input v-model="editForm.tel" clearable></el-input>
          </el-form-item>
          <el-form-item label="辅导员" prop="fdy">
            <el-input v-model="editForm.fdy" clearable></el-input>
          </el-form-item>
          <el-form-item label="辅导员电话" prop="fdytel">
            <el-input v-model="editForm.fdytel" clearable></el-input>
          </el-form-item>
          <el-form-item label="学院" prop="xueyuan">
            <el-input v-model="editForm.xueyuan" clearable></el-input>
          </el-form-item>
          <el-form-item label="班级" prop="banji">
            <el-input v-model="editForm.banji" clearable></el-input>
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
      // select 选中的楼宇号
      lynumber: "新区1号楼",
      // 要搜索的宿舍号
      ssnumber: "",
      // 楼宇名字列表
      lyNamelist: [],
      // 楼宇列表
      lylist: [],
      // 宿舍列表
      sslist: [],
      // 展开行列表
      expandlist: [],
      queryInfo: {
        // 当前页数
        pagenum: 1,
        // 当前页每页显示多少条数据
        pagesize: 5
      },
      // 总页数
      total: 7,
      // 要展开的行，数值的元素是row的key值
      expands: [],
      // 控制分配学生的对话框的显示与隐藏
      addDialogVisible: false,
      // 分配学生的表单数据
      addForm: {
        name: "",
        studentId: "",
        tel: "",
        fdy: "",
        fdytel: "",
        xueyuan: "",
        banji: "",
        sex: "",
        pass: 123456,
        lyid: "",
        sushe: ""
      },
      // 添加表单的验证规则对象
      addFormRules: {
        name: [{ required: true, message: "请输入学生姓名", trigger: "blur" }],
        studentId: [
          { required: true, message: "请输入学生学号", trigger: "blur" },
          { min: 3, max: 10, message: "长度在 3 到 10 个字符", trigger: "blur" }
        ],
        fdy: [{ required: true, message: "请输入辅导员姓名", trigger: "blur" }],
        tel: [
          { required: true, message: "请输入联系电话", trigger: "blur" },
          { validator: checkPhone, trigger: "blur" }
        ],
        fdytel: [
          { required: true, message: "请输入辅导员电话", trigger: "blur" },
          { validator: checkPhone, trigger: "blur" }
        ],
        xueyuan: [{ required: true, message: "请输入学院", trigger: "blur" }],
        banji: [{ required: true, message: "请输入班级", trigger: "blur" }]
      },
      // 控制编辑的对话框的显示与隐藏
      editdialogVisible: false,
      // 编辑学生信息的表单数据
      editForm: {
        name: "",
        uname: "",
        tel: "",
        fdy: "",
        fdytel: "",
        xueyuan: "",
        banji: ""
      },
      // 编辑表单的验证规则对象
      editFormRules: {
        leader: [
          { required: true, message: "请输入负责人姓名", trigger: "blur" }
        ],
        tel: [
          { required: true, message: "请输入联系电话", trigger: "blur" },
          { validator: checkPhone, trigger: "blur" }
        ]
      }
    };
  },
  // 生命周期函数
  created() {
    var _this = this;
    // 获取楼宇下拉选择框的全部楼宇的名字
    this.$http
      .post("http://localhost:3000/newly/lyname")
      .then(function(response) {
        console.log(response.data);
        if (response.data.code == 200) {
          _this.lyNamelist = response.data.data;
        }
      });
    // 获取新区1号楼的所有宿舍信息
    this.$http
      .post("http://localhost:3000/dormList/search", {
        lynumber: this.lynumber,
        ssnumber: this.ssnumber,
        pagenum: this.queryInfo.pagenum,
        pagesize: this.queryInfo.pagesize
      })
      .then(function(response) {
        console.log(response.data);
        if (response.data.code == 200) {
          _this.sslist = response.data.data;
          _this.total = response.data.pagetotal;
        }
      });
  },
  methods: {
    // 点击搜索按钮发起请求
    search() {
      var _this = this;
      // 点击搜索按钮发起请求，得到搜索后的数据
      this.$http
        .post("http://localhost:3000/dormList/search", {
          lynumber: this.lynumber,
          ssnumber: this.ssnumber,
          pagenum: this.queryInfo.pagenum,
          pagesize: this.queryInfo.pagesize
        })
        .then(function(response) {
          console.log(response.data);
          if (response.data.code == 200) {
            _this.sslist = response.data.data;
            _this.total = response.data.pagetotal;
          } else {
            _this.$notify({
              title: "警告",
              message: "抱歉，没有找到任何信息，您可以重新尝试一下",
              type: "warning"
            });
          }
        });
    },
    // 监听pageSize改变的事件
    handleSizeChange(newSize) {
      console.log(newSize);
      this.queryInfo.pagesize = newSize;
      var _this = this;
      this.$http
        .post("http://localhost:3000/dormList/search", {
          lynumber: this.lynumber,
          ssnumber: this.ssnumber,
          pagenum: this.queryInfo.pagenum,
          pagesize: newSize
        })
        .then(function(response) {
          console.log(response.data);
          if (response.data.code == 200) {
            _this.sslist = response.data.data;
            _this.total = response.data.pagetotal;
          }
        });
    },
    // 监听页码值改变的事件
    handleCurrentChange(newPage) {
      console.log(newPage);
      this.queryInfo.pagenum = newPage;
      var _this = this;
      this.$http
        .post("http://localhost:3000/dormList/search", {
          lynumber: this.lynumber,
          ssnumber: this.ssnumber,
          pagenum: newPage,
          pagesize: this.queryInfo.pagesize
        })
        .then(function(response) {
          console.log(response.data);
          if (response.data.code == 200) {
            _this.sslist = response.data.data;
            _this.total = response.data.pagetotal;
          }
        });
    },
    //获取row的key值
    getRowKeys(row) {
      return row.id;
    },
    // 查看按钮点击事件展开对应行
    rowClik(row) {
      if (row.id === this.expands[0]) {
        //点击另一行的时候，把expands清空。即可把上一行给关闭，展开当前点击行
        this.expands = [];
      } else {
        this.expands = [];
        this.expands.push(row.id);
      }
    },
    // 分配学生按钮添加事件
    addStudent(sushe, sex, lyid) {
      this.addForm.sex = sex;
      this.addForm.sushe = sushe;
      this.addForm.lyid = lyid;
      this.addDialogVisible = true;
    },
    // 监听分配学生对话框的关闭事件
    addDialogClosed() {
      this.$refs.addFormRef.resetFields();
    },
    // 分配学生对话框确定按钮事件
    addUser() {
      this.$refs.addFormRef.validate(valid => {
        console.log(valid);
        if (!valid) return;
        // 如果预校验成功则发起添加用户请求
        // this.studentlist.unshift(this.addForm);
        var _this = this;
        this.$http
          .post("http://localhost:3000/dormList/adduser", this.addForm)
          .then(function(response) {
            console.log(response.data);
            if (response.data.code == 200) {
              _this.$notify({
                title: "成功",
                message: "分配学生成功",
                type: "success"
              });
              // 如果添加成功，重新获取楼宇宿舍信息
              // 获取新区1号楼的所有宿舍信息
              _this.$http
                .post("http://localhost:3000/dormList/search", {
                  lynumber: _this.lynumber,
                  ssnumber: _this.ssnumber,
                  pagenum: _this.queryInfo.pagenum,
                  pagesize: _this.queryInfo.pagesize
                })
                .then(function(response) {
                  console.log(response.data);
                  if (response.data.code == 200) {
                    _this.sslist = response.data.data;
                    _this.total = response.data.pagetotal;
                  }
                });
              _this.addDialogVisible = false;
            } else {
              _this.$notify({
                title: "失败",
                message: "分配学生失败",
                type: "error"
              });
              _this.addDialogVisible = false;
            }
          });
      });
    },
    // 根据id删除对应学生信息
    async removelyInfoById(id) {
      var _this = this;
      // 弹框询问用户是否删除数据
      const cofirmResult = await this.$confirm(
        "此操作将永久删除该学生信息, 是否继续?",
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
      // 如果点击了确认按钮则发起请求删除对应数据
      this.$http
        .post("http://localhost:3000/dormList/del", {
          id: id
        })
        .then(function(response) {
          console.log(response.data);
          if (response.data.code == 200) {
            _this.$http
              .post("http://localhost:3000/dormList/search", {
                lynumber: _this.lynumber,
                ssnumber: _this.ssnumber,
                pagenum: _this.queryInfo.pagenum,
                pagesize: _this.queryInfo.pagesize
              })
              .then(function(response) {
                console.log(response.data);
                if (response.data.code == 200) {
                  _this.sslist = response.data.data;
                  _this.total = response.data.pagetotal;
                }
              });
            return _this.$message({
              showClose: true,
              message: "删除成功",
              type: "success"
            });
          }
        });
      console.log("确认了删除");
    },
    // 监听编辑楼宇信息对话框的关闭事件
    editDialogClosed() {
      this.$refs.editFormRef.resetFields();
    },
    // 编辑楼宇对话框确定按钮事件
    editUserInfo() {
      this.$refs.editFormRef.validate(valid => {
        console.log(valid);
        if (!valid) return;
        // 如果预校验成功则发起修改用户信息的请求
        this.editdialogVisible = false;
      });
    },
    // 点击编辑按钮展示编辑信息对话框
    showEditDialog(user) {
      this.editdialogVisible = true;
      console.log(user);
      // 此处不应该这样渲染，应该根据用户id发起请求，得到用户信息后再渲染
      this.editForm.name = user.name;
      this.editForm.uname = user.uname;
      this.editForm.tel = user.tel;
      this.editForm.fdy = user.fdy;
      this.editForm.fdytel = user.fdytel;
      this.editForm.xueyuan = user.xueyuan;
      this.editForm.banji = user.banji;
      // 根据用户id发起请求，得到用户信息
    }
  }
};
</script>

<style lang="css" scoped>
.el-button {
  margin-left: 30px;
}
</style>