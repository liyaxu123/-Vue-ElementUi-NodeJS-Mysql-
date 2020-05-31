<template>
  <div>
    <!-- 面包屑导航区 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>统计中心</el-breadcrumb-item>
      <el-breadcrumb-item>楼管评价</el-breadcrumb-item>
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
          <el-col :span="6">
            <el-form-item label="姓名" prop="sushe">
              <el-input v-model="searchForm.name" placeholder="请输入楼管姓名" clearable></el-input>
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
            <el-table-column label="评分时间" prop="time" sortable></el-table-column>
            <el-table-column label="品格（分）" prop="pgf" sortable width="110px"></el-table-column>
            <el-table-column label="服务（分）" prop="fwf" sortable width="110px"></el-table-column>
            <el-table-column label="责任心（分）" prop="zrx" sortable></el-table-column>
            <el-table-column label="总分（分）" prop="total" sortable width="110px"></el-table-column>
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
          <!-- 选择日期 -->
            <el-form-item label="评分日期" prop="data">
              <el-date-picker
                v-model="addForm.data"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="请选择日期"
                :picker-options="pickerOptions"
              ></el-date-picker>
            </el-form-item>
          <el-form-item label="评分时间" prop="time">
              <el-time-picker v-model="addForm.time" value-format="HH-mm-ss" placeholder="请选择时间"></el-time-picker>
            </el-form-item>
          <el-form-item label="品格" prop="pgf">
            <el-input v-model="addForm.pgf"></el-input>
          </el-form-item>
          <el-form-item label="服务" prop="fwf">
            <el-input v-model="addForm.fwf"></el-input>
          </el-form-item>
          <el-form-item label="责任心" prop="zrx">
            <el-input v-model="addForm.zrx"></el-input>
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
      // 宿舍评分查询表单数据
      searchForm: {
        lyNumber: "",
        name: ""
      },
      // 添加用户的表单数据
      addForm: {
        lyNumber: "",
        name:'',
        pgf:'',
        fwf:'',
        zrx:'',
        // 要选择的日期
        data: "",
        // 要选择的时间
        time: ""
      },
      // 添加表单的验证规则对象
      addFormRules: {
        name: [
          { required: true, message: "请输入姓名", trigger: "blur" },
          { min: 2, max: 10, message: "长度在 2 到 10 个字符", trigger: "blur" }
        ],
        data: [{ required: true, message: "请选择评分日期", trigger: "blur" }],
        time: [{ required: true, message: "请选择评分时间", trigger: "blur" }],
        fwf: [
          { required: true, message: "请填写服务分", trigger: "blur" }
        ],
        zrx: [
          { required: true, message: "请填写责任心分", trigger: "blur" }
        ],
        pgf: [
          { required: true, message: "请填写品格分", trigger: "blur" }
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
      // 宿舍号
      sushe: [],
      // 卫生分
      health: [],
      // 纪律分
      discipline: [],
      // 宿舍文化分
      culture: [],
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
        .post("http://localhost:3000/lgpf/search", {
          lynumber: _this.searchForm.lyNumber,
          name: _this.searchForm.name,
          pagenum: _this.queryInfo.pagenum,
          pagesize: _this.queryInfo.pagesize
        })
        .then(function(response) {
          console.log(response.data);
          if (response.data.code == 200) {
            _this.datalist = response.data.data;
            _this.total = response.data.total;
            _this.sushe = response.data.lgname;
            _this.health = response.data.pgf;
            _this.discipline = response.data.fwf;
            _this.culture = response.data.zrx;
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
          .post("http://localhost:3000/lgpf/add", this.addForm)
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
          data: ["品格分", "服务分", "责任心"],
          top: "30px"
        },
        xAxis: [
          {
            type: "category",
            name: "姓名",
            data: this.sushe,
            axisPointer: {
              type: "shadow"
            }
          }
        ],
        yAxis: [
          {
            type: "value",
            name: "品格分",
            min: 0,
            max: 10,
            interval: 2,
            axisLabel: {
              formatter: "{value} 分"
            }
          },
          {
            type: "value",
            name: "服务分",
            min: 0,
            max: 10,
            interval: 2,
            axisLabel: {
              formatter: "{value} 分"
            }
          },
          {
            type: "value",
            name: "责任心",
            min: 0,
            max: 10,
            position: "right",
            offset: 50,
            axisLine: {
              lineStyle: {
                color: "red"
              }
            },
            axisLabel: {
              formatter: "{value} 分"
            }
          }
        ],
        series: [
          {
            name: "品格分",
            type: "bar",
            data: this.health
          },
          {
            name: "服务分",
            type: "bar",
            data: this.discipline
          },
          {
            name: "责任心",
            type: "line",
            yAxisIndex: 1,
            data: this.culture
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