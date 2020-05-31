<template>
  <el-container class="home-container">
    <!-- 头部区域 -->
    <el-header>
      <div class="home-logo">
        <img src="../assets/img/hkLog.jpg" alt />
        <span>高校宿舍管理系统</span>
      </div>
      <el-button type="warning" @click="logout" size="mini" plain>退出</el-button>
    </el-header>
    <!-- 主体区域 -->
    <el-container>
      <!-- 侧边栏 -->
      <el-aside :width="isCollapse ? '64px' : '200px'">
        <!-- 点击折叠侧边栏菜单 -->
        <el-tooltip effect="light" content="折叠/展开" placement="bottom-end" :enterable="false">
          <div class="toggle-button" @click="toggleCollapse">|||</div>
        </el-tooltip>
        <!-- 侧边栏菜单区域 -->
        <el-menu
          background-color="#333744"
          text-color="#fff"
          active-text-color="#409eff"
          unique-opened
          :collapse="isCollapse"
          :collapse-transition="false"
          router
          :default-active="activePath"
        >
          <!-- 一级菜单 -->
          <el-submenu :index="item.id+''" v-for="item in $store.state.routerlist" :key="item.id">
            <!-- 一级菜单模板 -->
            <template slot="title">
              <!-- 图标 -->
              <i :class="iconobj[item.id]"></i>
              <!-- 文本 -->
              <span>{{item.authName}}</span>
            </template>
            <!-- 二级菜单 -->
            <el-menu-item
              :index="'/'+subItem.path"
              v-for="subItem in item.children"
              :key="subItem.id"
              @click="saveNavState('/'+subItem.path)"
            >
              <template slot="title">
                <!-- 图标 -->
                <i class="el-icon-menu"></i>
                <!-- 文本 -->
                <span>{{subItem.authName}}</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!-- 内容主体区域 -->
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      // menulist: [
      //   {
      //     id: 1,
      //     authName: "个人中心",
      //     path: "grzx",
      //     children: [
      //       { id: "1.1", authName: "个人信息", path: "xgmm", children: [] }
      //     ]
      //   },
      //   {
      //     id: 2,
      //     authName: "楼宇管理",
      //     path: "lygl",
      //     children: [
      //       { id: "2.1", authName: "楼宇列表", path: "newly", children: [] }
      //     ]
      //   },
      //   {
      //     id: 3,
      //     authName: "宿舍管理",
      //     path: "ssgl",
      //     children: [
      //       { id: "3.1", authName: "宿舍列表", path: "sslb", children: [] },
      //       { id: "3.2", authName: "宿舍文化建设", path: "sswhjs", children: [] },
      //     ]
      //   },
      //   {
      //     id: 4,
      //     authName: "用户权限管理",
      //     path: "yhqxgl",
      //     children: [
      //       { id: "4.1", authName: "用户列表", path: "yhlb", children: [] },
      //       { id: "4.2", authName: "角色列表", path: "jslb", children: [] },
      //       { id: "4.3", authName: "权限列表", path: "qxlb", children: [] },
      //     ]
      //   },
      //   {
      //     id: 5,
      //     authName: "学生管理",
      //     path: "xsgl",
      //     children: [
      //       { id: "5.1", authName: "学生列表", path: "xslb", children: [] }
      //     ]
      //   },
      //   {
      //     id: 6,
      //     authName: "后勤服务",
      //     path: "hqfw",
      //     children: [
      //       { id: "6.1", authName: "损坏报修", path: "shbx", children: [] },
      //       { id: "6.2", authName: "报修列表", path: "bxlb", children: [] }
      //     ]
      //   },
      //   {
      //     id: 7,
      //     authName: "生活服务",
      //     path: "shfw",
      //     children: [
      //       { id: "7.1", authName: "电费充值", path: "jdf", children: [] },
      //       { id: "7.2", authName: "校园网充值", path: "xyw", children: [] },
      //       { id: "7.3", authName: "校园一卡通", path: "xyykt", children: [] }
      //     ]
      //   },
      //   {
      //     id: 8,
      //     authName: "统计中心",
      //     path: "tjzx",
      //     children: [
      //       { id: "8.1", authName: "宿舍评分", path: "sspf", children: [] },
      //       { id: "8.2", authName: "报修统计", path: "bxtj", children: [] },
      //       { id: "8.3", authName: "楼管评价", path: "lgdf", children: [] }
      //     ]
      //   }
      // ],
      // 侧边栏导航
      menulist:[],
      iconobj: {
        "1": "iconfont iconren",
        "2": "iconfont iconicon-",
        "3": "iconfont iconsushe",
        "4": "iconfont iconic_opt_feature",
        "5": "iconfont iconxuesheng",
        "6": "iconfont iconhouqinwuzi",
        "7": "iconfont iconiconfontshenghuojiaofei",
        "8": "iconfont icontongji"
      },
      //   是否折叠
      isCollapse: false,
      //   被激活的连接地址
      activePath: ""
    };
  },
  created() {
      this.activePath = window.sessionStorage.getItem('activePath');
      // 从 vuex 中取到路由表 设置给 menulist
      this.menulist = this.$store.state.routerlist;
  },
  methods: {
    // 退出按钮
    logout() {
      // window.sessionStorage.clear();
      this.$router.push("/login");
      // 删除sessionStorage中保存的值
      sessionStorage.clear ()
    },
    // 点击折叠与展开侧边栏菜单
    toggleCollapse() {
      this.isCollapse = !this.isCollapse;
    },
    // 保存链接的激活状态
    saveNavState(activePath) {
      window.sessionStorage.setItem("activePath", activePath);
      this.activePath = activePath;
    }
  }
};
</script>

<style lang="css" scoped>
.home-container {
  height: 100%;
}
.el-header {
  background-color: #23262e;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 0;
}
.home-logo {
  display: flex;
  align-items: center;
}
.home-logo img {
  width: 6.2%;
}
.home-logo span {
  color: white;
  font-size: 20px;
  margin-left: 15px;
}
.el-aside {
  background-color: #393d49;
}
.el-main {
  background-color: #eaedf1;
}
.el-menu {
  border-right: none;
}
.iconfont {
  margin-right: 15px;
}
.toggle-button {
  background: #4a5064;
  color: white;
  text-align: center;
  letter-spacing: 0.2em;
  cursor: pointer;
  font-size: 10px;
  line-height: 24px;
}
</style>