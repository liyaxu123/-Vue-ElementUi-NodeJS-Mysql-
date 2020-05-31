<template>
  <div>
    <!-- 面包屑导航区 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>宿舍管理</el-breadcrumb-item>
      <el-breadcrumb-item>宿舍文化建设</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图区 -->
    <el-card>
      <!-- 大步骤 -->
      <el-collapse v-model="activeNames" @change="handleChange">
        <el-collapse-item title="大步骤" name="1">
          <div>这里写大步骤的东西</div>
          <!-- 小步骤 -->
          <el-collapse v-model="activeNames" @change="handleChange">
            <el-collapse-item title="小步骤" name="1-1">
              <div>这里写小步骤的东西</div>
              <!-- 子步骤 -->
              <el-collapse v-model="activeNames" @change="handleChange">
                <el-collapse-item title="子步骤" name="1-1-1">
                  <div>这里写小步骤的东西</div>
                </el-collapse-item>
              </el-collapse>
            </el-collapse-item>
          </el-collapse>
        </el-collapse-item>
      </el-collapse>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeNames: ["1"]
    };
  },
  methods: {
    handleChange(val) {
      console.log(val);
    }
  }
};
</script>

<style lang="css" scoped>
.line {
  width: 100%;
  height: 400px;
  background: skyblue;
}
</style>