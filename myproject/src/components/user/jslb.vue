<template>
  <div>
    <!-- 面包屑导航区 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图区 -->
    <el-card>
      <!-- 添加角色按钮 -->
      <el-row>
        <el-col>
          <el-button type="primary">添加角色</el-button>
        </el-col>
      </el-row>
      <!-- 表格列表区域 -->
      <el-table :data="rolellist" stripe border height="480px">
        <!-- 展开列 -->
        <el-table-column type="expand">
          <template slot-scope="scope">
            <el-row
              :class="['bdbottom',i1 === 0 ? 'bdtop' : '','vcenter']"
              v-for="(item1,i1) in scope.row.children"
              :key="item1.id"
            >
              <!-- 渲染一级权限 -->
              <el-col :span="5">
                <el-tag closable>{{item1.rolename}}</el-tag>
                <i class="el-icon-caret-right"></i>
              </el-col>
              <!-- 渲染二级和三级权限 -->
              <el-col :span="19">
                <!-- 通过for循环渲染二级权限 -->
                <el-row
                  :class="[i2 === 0 ? '' : 'bdtop','vcenter' ]"
                  v-for="(item2,i2) in item1.children"
                  :key="item2.id"
                >
                  <el-col :span="6">
                    <el-tag type="success" closable>{{item2.rolename}}</el-tag>
                    <i class="el-icon-caret-right"></i>
                  </el-col>
                  <!-- 三级权限 -->
                  <el-col :span="18">
                    <el-tag
                      type="warning"
                      v-for="(item3) in item2.children"
                      :key="item3.id"
                      closable
                      @close="removeRoleById()"
                    >{{item3.rolename}}</el-tag>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </template>
        </el-table-column>
        <!-- 索引列 -->
        <el-table-column type="index"></el-table-column>
        <el-table-column label="角色名称" prop="rolename"></el-table-column>
        <el-table-column label="角色描述" prop="roleDescription"></el-table-column>
        <el-table-column label="操作" width="260">
          <template slot-scope>
            <el-button size="mini" type="primary" icon="el-icon-edit">编辑</el-button>
            <el-button size="mini" type="danger" icon="el-icon-delete">删除</el-button>
            <el-button size="mini" type="warning" icon="el-icon-setting">分配</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      rolellist: [
        {
          id: 1,
          rolename: "主管",
          roleDescription: "最高权限持有者",
          children: [
            {
              id: 1.1,
              rolename: "权限管理",
              children: [
                {
                  id: 1.11,
                  rolename: "权限添加",
                  children: [
                    { id: 1.111, rolename: "权限添加1" },
                    { id: 1.112, rolename: "权限添加2" }
                  ]
                },
                {
                  id: 1.12,
                  rolename: "权限删除",
                  children: [
                    { id: 1.121, rolename: "权限添加1" },
                    { id: 1.122, rolename: "权限添加2" }
                  ]
                }
              ]
            },
            {
              id: 1.2,
              rolename: "权限管理",
              children: [
                {
                  id: 1.21,
                  rolename: "权限添加",
                  children: [
                    { id: 1.211, rolename: "权限添加1" },
                    { id: 1.212, rolename: "权限添加2" }
                  ]
                },
                {
                  id: 1.22,
                  rolename: "权限删除",
                  children: [
                    { id: 1.221, rolename: "权限添加1" },
                    { id: 1.222, rolename: "权限添加2" }
                  ]
                }
              ]
            }
          ]
        },
        {
          id: 2,
          rolename: "副主管",
          roleDescription: "技术负责人",
          children: [
            {
              id: 2.1,
              rolename: "技术管理",
              children: [
                { id: 2.2, rolename: "权限添加" },
                { id: 2.3, rolename: "权限删除" }
              ]
            }
          ]
        },
        {
          id: 3,
          rolename: "副主管2号",
          roleDescription: "技术负责人",
          children: [
            {
              id: 3.1,
              rolename: "权限管理",
              children: [
                { id: 3.2, rolename: "权限添加" },
                { id: 3.3, rolename: "权限删除" }
              ]
            }
          ]
        },
        {
          id: 4,
          rolename: "楼宇主管",
          roleDescription: "楼宇管理",
          children: [
            {
              id: 4.1,
              rolename: "权限管理",
              children: [
                { id: 4.2, rolename: "权限添加" },
                { id: 4.3, rolename: "权限删除" }
              ]
            }
          ]
        },
        {
          id: 5,
          rolename: "宿舍主管",
          roleDescription: "宿舍管理",
          children: [
            {
              id: 5.1,
              rolename: "权限管理",
              children: [
                { id: 5.2, rolename: "权限添加" },
                { id: 5.3, rolename: "权限删除" }
              ]
            }
          ]
        },
        {
          id: 6,
          rolename: "后勤主管",
          roleDescription: "后勤管理",
          children: [
            {
              id: 6.1,
              rolename: "权限管理",
              children: [
                { id: 6.2, rolename: "权限添加" },
                { id: 6.3, rolename: "权限删除" }
              ]
            }
          ]
        },
        {
          id: 7,
          rolename: "生活服务主管",
          roleDescription: "生活服务管理",
          children: [
            {
              id: 7.1,
              rolename: "权限管理",
              children: [
                { id: 7.2, rolename: "权限添加" },
                { id: 7.3, rolename: "权限删除" }
              ]
            }
          ]
        }
      ]
    };
  },
  methods: {
    //   根据id删除对应的权限
    async removeRoleById() {
      //   弹框提示是否删除
      const confirmResult = await this.$confirm(
        "此操作将删除该权限, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      ).catch(err => err);
      
      if (confirmResult !== "confirm") {
        return this.$message({
          showClose: true,
          message: "取消了删除"
        })
      }
      console.log('确认了删除');
    }
  },
  created() {}
};
</script>

<style lang="css" scoped>
.el-tag {
  margin: 7px;
}
.bdtop {
  border-top: 1px solid #eeeeee;
}
.bdbottom {
  border-bottom: 1px solid #eeeeee;
}
.vcenter {
  display: flex;
  align-items: center;
}
</style>