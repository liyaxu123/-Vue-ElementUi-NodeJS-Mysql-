<template>
  <div>
    <!-- 面包屑导航区 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>统计中心</el-breadcrumb-item>
      <el-breadcrumb-item>宿舍评分</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图区 -->
    <el-card>
      <!-- 查找板块 -->
      <el-form :model="searchForm" ref="addFormRef" label-width="60px">
        <el-row>
          <el-col :span="5">
            <el-form-item label="楼宇号" prop="lyNumber">
              <el-input v-model="searchForm.lyNumber" placeholder="请输入楼宇号" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="宿舍号" prop="sushe">
              <el-input v-model="searchForm.sushe" placeholder="请输入宿舍号" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="学院" prop="xueyuan">
              <el-input v-model="searchForm.xueyuan" placeholder="请输入学院名称" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="班级" prop="banji">
              <el-input v-model="searchForm.banji" placeholder="请输入班级名称" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-button type="primary" icon="el-icon-search" @click="search">查询</el-button>
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
            height="380px"
            :default-sort="{prop: 'time',prop: 'health',prop: 'discipline',prop: 'dormitoryculture',prop: 'total', order: 'descending'}"
          >
            <el-table-column label="楼宇号" prop="lynumber" width="90px"></el-table-column>
            <el-table-column label="宿舍号" prop="sushe" width="60px"></el-table-column>
            <el-table-column label="学院" prop="xueyuan" width="100px"></el-table-column>
            <el-table-column label="班级" prop="banji" width="90px"></el-table-column>
            <el-table-column label="时间" prop="time" sortable></el-table-column>
            <el-table-column label="卫生（分）" prop="health" sortable width="110px"></el-table-column>
            <el-table-column label="纪律（分）" prop="discipline" sortable width="110px"></el-table-column>
            <el-table-column label="宿舍文化（分）" prop="dormitoryculture" sortable></el-table-column>
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
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 宿舍评分查询表单数据
      searchForm: {
        lyNumber: "",
        sushe: "",
        xueyuan: "",
        banji: ""
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
      activeName: "second"
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
        .post("http://localhost:3000/sspf/search", {
          lynumber: _this.searchForm.lyNumber,
          sushe: _this.searchForm.sushe,
          xueyuan: _this.searchForm.xueyuan,
          banji: _this.searchForm.banji,
          pagenum: _this.queryInfo.pagenum,
          pagesize: _this.queryInfo.pagesize
        })
        .then(function(response) {
          console.log(response.data);
          if (response.data.code == 200) {
            _this.datalist = response.data.data;
            _this.total = response.data.total;
            _this.sushe = response.data.ssh;
            _this.health = response.data.wsf;
            _this.discipline = response.data.jlf;
            _this.culture = response.data.whf;
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
          data: ["卫生", "纪律", "宿舍文化"],
          top: "30px"
        },
        xAxis: [
          {
            type: "category",
            name: "宿舍号",
            data: this.sushe,
            axisPointer: {
              type: "shadow"
            }
          }
        ],
        yAxis: [
          {
            type: "value",
            name: "卫生",
            min: 0,
            max: 10,
            interval: 2,
            axisLabel: {
              formatter: "{value} 分"
            }
          },
          {
            type: "value",
            name: "纪律",
            min: 0,
            max: 10,
            interval: 2,
            axisLabel: {
              formatter: "{value} 分"
            }
          },
          {
            type: "value",
            name: "宿舍文化",
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
            name: "卫生",
            type: "bar",
            data: this.health
          },
          {
            name: "纪律",
            type: "bar",
            data: this.discipline
          },
          {
            name: "宿舍文化",
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