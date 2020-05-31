<template>
  <div>
    <!-- 面包屑导航区 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>生活服务</el-breadcrumb-item>
      <el-breadcrumb-item>电费充值</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图区 -->
    <el-card>
      <h2 class="h2">电费查询</h2>
      <el-form :model="searchForm" ref="addFormRef" label-width="80px">
        <el-row>
          <el-col :span="8">
            <el-form-item label="楼宇号" prop="lyNumber">
              <el-input v-model="searchForm.lyNumber" placeholder="请输入您所在的楼宇号" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="宿舍号" prop="sushe">
              <el-input v-model="searchForm.sushe" placeholder="请输入您所在的宿舍号" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-button type="primary" icon="el-icon-search" @click="search">查询</el-button>
          </el-col>
        </el-row>
      </el-form>
      <!-- 电费查询结果 -->
      <el-collapse v-model="activeNames" v-if="searchResult">
        <el-collapse-item title="电费查询结果:" name="1">
          <!-- 展示结果表单 -->
          <el-form :model="resultForm" label-width="110px">
            <el-row>
              <el-col :span="8">
                <el-form-item label="楼宇号">
                  <el-input v-model="resultForm.lyNumber" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="宿舍号">
                  <el-input v-model="resultForm.sushe" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="余额">
                  <el-input v-model="resultForm.balance" disabled></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="上次缴费时间">
                  <el-input v-model="resultForm.lastTime" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="上次缴费金额">
                  <el-input v-model="resultForm.laseMoney" disabled></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-collapse-item>
      </el-collapse>
      <!-- 分割线 -->
      <el-divider></el-divider>
      <!-- 电费充值 -->
      <h2 class="h2">电费充值</h2>
      <el-form>
        <p>请选择充值金额:</p>
        <el-row>
          <el-col :span="6">
            <el-radio v-model="money" label="10" border>10元</el-radio>
          </el-col>
          <el-col :span="6">
            <el-radio v-model="money" label="30" border>30元</el-radio>
          </el-col>
          <el-col :span="6">
            <el-radio v-model="money" label="50" border>50元</el-radio>
          </el-col>
          <el-col :span="6">
            <el-radio v-model="money" label="100" border>100元</el-radio>
          </el-col>
        </el-row>
        <div class="submit">
          <el-button type="primary" round @click="recharge">充值</el-button>
          <el-button type="info" round @click="cancel">取消</el-button>
        </div>
      </el-form>
      <!-- 支付页面的对话框 -->
      <el-dialog title="请您选择支付方式" :visible.sync="ChoosePaymentMethod" width="50%" @close="dialogClosed">
        <!-- 内容主体区 -->
        <el-tabs type="border-card">
          <el-tab-pane label="支付宝支付"><img src="../../assets/img/zhifubao.jpg" alt="支付宝码"></el-tab-pane>
          <el-tab-pane label="微信支付"><img src="../../assets/img/weixin.png" alt="微信支付码"></el-tab-pane>
        </el-tabs>
        <!-- 底部按钮区 -->
        <span slot="footer" class="dialog-footer">
          <el-button @click="cancelDiolog">取 消</el-button>
        </span>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 电费查询表单数据
      searchForm: {
        lyNumber: "",
        sushe: ""
      },
      // 默认要展开的折叠面板
      activeNames: ["1"],
      // 控制电费查询结果面板是否展示
      searchResult: false,
      // 查询结果表单
      resultForm: {
        lyNumber: "新区1号楼",
        sushe: "101",
        balance: "20度电",
        lastTime: "2019-12-2 8:20:15",
        laseMoney: "50元"
      },
      // 充值的金额
      money: "",
      // 控制选择支付方式对话框的显示与隐藏
      ChoosePaymentMethod: false
    };
  },
  methods: {
    // 查询按钮单击事件
    search() {
      this.searchResult = true;
    },
    //  充值按钮
    recharge() {
      if (this.money == "") {
        this.$notify({
          title: "警告",
          message: "亲，请您先选择充值金额",
          type: "warning"
        });
      } else {
        this.ChoosePaymentMethod = true;
      }
    },
    // 取消充值按钮
    cancel(){
      this.money = '';
    },
    // 取消支付对话框按钮
    cancelDiolog(){
      this.ChoosePaymentMethod  = false;
      this.money = '';
    },
    // 监听支付对话框关闭事件
    dialogClosed(){
      this.money = '';
    }
  }
};
</script>

<style lang="css" scoped>
.el-button {
  margin-left: 40px;
}
.h2 {
  margin-bottom: 15px;
}
p {
  margin-bottom: 15px;
}
.submit {
  display: flex;
  justify-content: center;
  margin: 40px 0px;
}
.submit .el-button {
  margin-left: 40px;
}
.el-tab-pane{
  display: flex;
  justify-content: center;
}
.el-tab-pane img{
  width: 40%;
}
</style>