<template>
  <div>
    <!-- 面包屑导航区 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>后勤服务</el-breadcrumb-item>
      <el-breadcrumb-item>报修列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图区 -->
    <el-card>
      <!-- 报修列表表格数据 -->
      <el-table :data="repairsList" stripe border max-height="500px">
        <el-table-column type="index" width="40px"></el-table-column>
        <el-table-column label="楼宇号" prop="lynumber" width="90px"></el-table-column>
        <el-table-column label="宿舍号" prop="sushe" width="60px"></el-table-column>
        <el-table-column label="报修人" prop="uname" width="60px"></el-table-column>
        <el-table-column label="联系电话" prop="tel" width="100px"></el-table-column>
        <el-table-column label="报修日期" prop="bxdata" width="100px"></el-table-column>
        <el-table-column label="报修时间" prop="bxtime" width="100px"></el-table-column>
        <el-table-column label="报修详情" prop="bxdel"></el-table-column>
        <el-table-column label="操作" width="120px">
          <template slot-scope="scope">
            <!-- 是否已处理开关 -->
            <el-tooltip
              effect="dark"
              :content="scope.row.switchon =='1'?'未处理':'已处理'"
              placement="top"
              :enterable="false"
            >
              <el-switch
                v-model="scope.row.switchon"
                active-value="1"
                inactive-value="0"
                @change="userStateChanged(scope.row)"
              ></el-switch>
            </el-tooltip>
            <!-- 删除 -->
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
        :page-sizes="[1, 2, 5, 10]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 报修信息列表
      repairsList: [],
      // 分页表单数据
      queryInfo: {
        // 搜索关键字
        query: "",
        // 当前页数
        pagenum: 1,
        // 当前页每页显示多少条数据
        pagesize: 5
      },
      // 总页数
      total: 0,
      // 开关状态
      switchValue: true
    };
  },
  created() {
    this.oneQuest();
  },
  methods: {
    // 封装页面加载请求函数
    oneQuest() {
      var _this = this;
      this.$http
        .post("http://localhost:3000/shbx/search", this.queryInfo)
        .then(function(response) {
          console.log(response.data);
          if (response.data.code == 200) {
            _this.repairsList = response.data.data;
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
    async userStateChanged(userInfo) {
      var _this = this;
      console.log(userInfo);
      // 根据id值发起请求改变开关状态
      this.$http
        .post("http://localhost:3000/shbx/onoff", {
          id: userInfo.id,
          switchon: userInfo.switchon
        })
        .then(function(response) {
          console.log(response.data);
          if (response.data.code == 200) {
            _this.oneQuest();
          }
        });
    },
    // 删除事件
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
      // 根据id值发起请求删除该事件
      this.$http
        .post("http://localhost:3000/shbx/del", {
          id: id
        })
        .then(function(response) {
          console.log(response.data);
          if (response.data.code == 200) {
            _this.oneQuest();
            return _this.$message({
              showClose: true,
              message: "删除成功",
              type: "success"
            });
          }
        });
    }
  }
};
</script>

<style lang="css" scoped>
.el-button {
  margin-left: 15px;
}
.el-table .success-row {
  background: #f0f9eb;
}
</style>