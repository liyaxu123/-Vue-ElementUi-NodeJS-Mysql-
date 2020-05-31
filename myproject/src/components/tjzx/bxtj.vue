<template>
  <div>
    <!-- 面包屑导航区 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>统计中心</el-breadcrumb-item>
      <el-breadcrumb-item>报修统计</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图区 -->
    <el-card>
      <!-- 查找板块 -->
      <el-form :model="searchForm" ref="addFormRef" label-width="60px">
        <el-row>
          <el-col :span="6">
            <el-form-item label="楼宇号" prop="lyNumber">
              <el-input v-model="searchForm.lyNumber" placeholder="请输入楼宇号" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="3">
            <el-button type="primary" icon="el-icon-search" @click="search">查询</el-button>
          </el-col>
          <el-col :span="3">
            <el-button type="primary" icon="el-icon-plus" @click="addDialogVisible=true">添加</el-button>
          </el-col>
        </el-row>
      </el-form>
      <!-- 标签页 -->
      <el-tabs type="border-card">
        <el-tab-pane label="数据表展示">
          <!-- 数据列表 -->
          <el-table
            :data="datalist"
            stripe
            border
            maxheight="350px"
            :default-sort="{prop: 'time',prop: 'health',prop: 'discipline',prop: 'dormitoryculture',prop: 'total', order: 'descending'}"
          >
            <el-table-column label="楼宇号" prop="lynumber" width="90px"></el-table-column>
            <el-table-column label="楼管姓名" prop="name" width="90px"></el-table-column>
            <el-table-column label="联系电话" prop="tel"></el-table-column>
            <el-table-column label="报修损耗（元）" prop="bxsh" sortable></el-table-column>
            <el-table-column label="材料购买（元）" prop="clgm" sortable></el-table-column>
            <el-table-column label="楼宇维护（元）" prop="lywh" sortable></el-table-column>
            <el-table-column label="总额（元）" prop="total" sortable></el-table-column>
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
        </el-tab-pane>
        <el-tab-pane label="统计图展示" name="second">
          <!-- 数据统计图 -->
          <div id="myChart"></div>
        </el-tab-pane>
      </el-tabs>
      <!-- 添加用户的对话框 -->
      <el-dialog title="添加评价" :visible.sync="addDialogVisible" width="50%" @close="addDialogClosed">
        <!-- 内容主体区 -->
        <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="80px">
          <el-form-item label="楼宇号" prop="lyNumber">
            <el-input v-model="addForm.lyNumber"></el-input>
          </el-form-item>
          <el-form-item label="姓名" prop="name">
            <el-input v-model="addForm.name"></el-input>
          </el-form-item>
          <el-form-item label="电话" prop="tel">
            <el-input v-model="addForm.tel"></el-input>
          </el-form-item>
          <el-form-item label="报修损耗">
            <el-input v-model="addForm.bxsh"></el-input>
          </el-form-item>
          <el-form-item label="材料购买">
            <el-input v-model="addForm.clgm"></el-input>
          </el-form-item>
          <el-form-item label="楼宇维护">
            <el-input v-model="addForm.lywh"></el-input>
          </el-form-item>
        </el-form>
        <!-- 底部按钮区 -->
        <span slot="footer" class="dialog-footer">
          <el-button @click="addDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="addUser">确 定</el-button>
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
      // 宿舍评分查询表单数据
      searchForm: {
        lyNumber: ""
      },
      // 添加用户的表单数据
      addForm: {
        lyNumber: "",
        name:'',
        tel:'',
        bxsh:'',
        clgm:'',
        lywh:''
      },
      // 添加表单的验证规则对象
      addFormRules: {
        name: [
          { required: true, message: "请输入姓名", trigger: "blur" },
          { min: 2, max: 10, message: "长度在 2 到 10 个字符", trigger: "blur" }
        ],
        tel: [
          { required: true, message: "请输入联系电话", trigger: "blur" },
          { validator: checkPhone, trigger: "blur" }
        ],
        fwf: [
          { required: true, message: "请填写材料购买的钱数", trigger: "blur" }
        ],
        zrx: [
          { required: true, message: "请填写楼宇维护的钱数", trigger: "blur" }
        ],
        pgf: [
          { required: true, message: "请填写报修损耗的钱数", trigger: "blur" }
        ],
        lyNumber: [
          {
            required: true,
            message: "请填写楼宇号,格式为“新区*号楼”",
            trigger: "blur"
          }
        ]
      },
      // 数据列表
      datalist: [],
      queryInfo: {
        // 当前页数
        pagenum: 1,
        // 当前页每页显示多少条数据
        pagesize: 5
      },
      // 楼宇号
      lyh: [],
      // 报修损耗
      bxsh: [],
      // 材料购买
      clgm: [],
      // 楼宇维护
      lywh: [],
      // 总页数
      total: 0,
      // 默认展示的标签页
      activeName: "second",
      // 控制添加用户的对话框的显示与隐藏
      addDialogVisible: false,
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
        .post("http://localhost:3000/bxtj/search", {
          lynumber: _this.searchForm.lyNumber,
          pagenum: _this.queryInfo.pagenum,
          pagesize: _this.queryInfo.pagesize
        })
        .then(function(response) {
          console.log(response.data);
          if (response.data.code == 200) {
            _this.datalist = response.data.data;
            _this.total = response.data.total;
            _this.lyh = response.data.lyh;
            _this.bxsh = response.data.bxsh;
            _this.clgm = response.data.clgm;
            _this.lywh = response.data.lywh;
            // 渲染 echarts 统计图
            _this.drawColumn();
          }
        });
    },
    // 搜索按钮事件
    search(){
      this.oneQuest();
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
    // 监听添加用户对话框的关闭事件
    addDialogClosed() {
      // this.$refs.addFormRef.resetFields();
    },
    //点击确定按钮，添加评分
    addUser() {
      var _this = this;
      this.$refs.addFormRef.validate(valid => {
        console.log(valid);
        if (!valid) return;
        // 如果预校验成功则发起添加用户请求
        // this.studentlist.unshift(this.addForm);
        this.$http
          .post("http://localhost:3000/bxtj/add", this.addForm)
          .then(function(response) {
            console.log(response.data);
            if (response.data.code == 200) {
              _this.oneQuest();
              _this.$message({
                showClose: true,
                message: "添加评分成功",
                type: "success"
              });
            }else{
              _this.$message({
                showClose: true,
                message: "添加评分失败",
                type: "error"
              });
            }
          });
        this.addDialogVisible = false;
      });
    },
    
    // echarts图表
    drawColumn() {
      let myChart = this.$echarts.init(document.getElementById("myChart"));
      var option = {
        title: {
          text: "宿舍评分各项数据统计图",
          left: "center",
          top: "auto"
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            crossStyle: {
              color: "#999"
            }
          }
        },
        toolbox: {
          feature: {
            dataView: { show: true, readOnly: false },
            magicType: { show: true, type: ["line", "bar"] },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        legend: {
          data: ["报修损耗", "材料购买", "楼宇维护"],
          top: "30px"
        },
        xAxis: [
          {
            type: "category",
            name: "楼宇号",
            data: this.lyh,
            axisPointer: {
              type: "shadow"
            }
          }
        ],
        yAxis: [
          {
            type: "value",
            name: "报修损耗",
            min: 0,
            max: 10000,
            interval: 1000,
            axisLabel: {
              formatter: "{value} 元"
            }
          },
          {
            type: "value",
            name: "材料购买",
            min: 0,
            max: 10000,
            interval: 1000,
            axisLabel: {
              formatter: "{value} 元"
            }
          },
          {
            type: "value",
            name: "楼宇维护",
            min: 0,
            max: 10000,
            position: "right",
            offset: 50,
            axisLine: {
              lineStyle: {
                color: "red"
              }
            },
            axisLabel: {
              formatter: "{value} 元"
            }
          }
        ],
        series: [
          {
            name: "报修损耗",
            type: "bar",
            data: this.bxsh
          },
          {
            name: "材料购买",
            type: "bar",
            data: this.clgm
          },
          {
            name: "楼宇维护",
            type: "line",
            yAxisIndex: 1,
            data: this.lywh
          }
        ]
      };
      myChart.setOption(option);
    }
  }
};
</script>

<style lang="css" scoped>
.el-button {
  margin-left: 20px;
}
#myChart {
  width: 950px;
  height: 450px;
}
</style>