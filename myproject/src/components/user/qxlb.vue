<template>
  <div>
    <!-- 面包屑导航区 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>权限列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图区 -->
    <el-card>
        <el-table :data='powerlist' height='520' stripe border>
            <el-table-column type="index"></el-table-column>
            <el-table-column label="权限名称" prop="powername"></el-table-column>
            <el-table-column label="路径" prop="path"></el-table-column>
            <el-table-column label="权限等级" prop="grade">
                <template slot-scope='scope'>
                    <el-tag v-if="scope.row.grade == 0">一级</el-tag>
                    <el-tag type="success" v-else-if="scope.row.grade == 1">二级</el-tag>
                    <el-tag type="warning" v-else>三级</el-tag>
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
            powerlist:[
                {id:1,powername:'学生管理',path:'user',grade:0},
                {id:2,powername:'宿舍管理',path:'user',grade:1},
                {id:3,powername:'楼宇管理',path:'user',grade:2},
                {id:4,powername:'后勤管理',path:'user',grade:1},
                {id:5,powername:'班级管理',path:'user',grade:0},
                {id:6,powername:'生活服务',path:'user',grade:2},
                {id:7,powername:'权限管理',path:'user',grade:0},
                {id:8,powername:'学生管理',path:'user',grade:2},
                {id:9,powername:'楼宇管理',path:'user',grade:1},
                {id:10,powername:'学生管理',path:'user',grade:1},
                {id:11,powername:'生活服务',path:'user',grade:0},
                {id:12,powername:'楼宇管理',path:'user',grade:2},
                {id:13,powername:'学生管理',path:'user',grade:0},
            ]
        }
    },
};
</script>

<style lang="css" scoped>
</style>