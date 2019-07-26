<template>
  <div class="init">
    <el-container>
      <!-- 头部内容 -->
      <el-header>
        <ul class="clear logOut">
          <li class="fl">
            <span>BRAND LOGO
              <i></i>
            </span>微信CRM后台管理平台
          </li>
          <li class="fr">
            <i class="fa fa-user fa-lg"></i>
            <span>{{this.$store.state.currentUser}}</span>
            <i class="init-line"></i>
            <i class="fa fa-power-off fa-lg" @click="logOut"></i>
          </li>
        </ul>
      </el-header>
      <!-- 左侧菜单栏 -->
      <el-container>
        <el-aside>
          <el-menu default-active="2" class="el-menu-vertical-demo" @select="menuSelect" @open="handleOpen"
                   @close="handleClose" text-color="#333" active-text-color="#333">
            <el-submenu :index="item.path ? item.path: (item.id + '')" v-for="(item,index) in menuList" :key="index">
              <template slot="title">
                <div @click="menuClick(item)" class="menu-class" :class="{'menu-bg':menuName == item.name}">
                  <i class="el-icon-menu"></i>
                  <span>{{item.name}}</span>
                </div>
              </template>
              <el-menu-item :index="subItem.path" v-for="(subItem,subIndex) in item.children" :key="subIndex">
                <span :class="{'menu-bg':subMenuName == subItem.name}"
                      @click="sbuMenuClick(subItem)">{{subItem.name}}</span>
              </el-menu-item>
            </el-submenu>
          </el-menu>
        </el-aside>
        <!-- 右侧内容 -->
        <el-main>
          <router-view>
          </router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    data() {
      return {
        menuList: [{
          "children": [
            {
              "children": [],
              "createTime": null,
              "createUser": null,
              "description": "",
              "icon": "",
              "id": 46,
              "interfaces": [],
              "lastUpdateTime": 1528425921000,
              "lastUpdateUser": "admin",
              "name": "品牌管理",
              "needLogin": true,
              "needPermission": true,
              "parentId": 62,
              "path": "/init/brand/BrandManage",
              "permissionValue": 3,
              "resourceType": "1",
              "routerPath": "",
              "status": 1,
              "theOrder": 3
            },
            {
              "children": [],
              "createTime": 1529047509000,
              "createUser": "xujiajia",
              "description": "",
              "icon": null,
              "id": 61,
              "interfaces": [],
              "lastUpdateTime": 1529407579000,
              "lastUpdateUser": "xujiajia",
              "name": "门店管理",
              "needLogin": true,
              "needPermission": true,
              "parentId": 62,
              "path": "/init/brand/StoreManage",
              "permissionValue": 3,
              "resourceType": "1",
              "routerPath": "",
              "status": 1,
              "theOrder": 5
            },
            {
              "children": [],
              "createTime": 1529047509000,
              "createUser": "xujiajia",
              "description": "",
              "icon": null,
              "id": 61,
              "interfaces": [],
              "lastUpdateTime": 1529407579000,
              "lastUpdateUser": "xujiajia",
              "name": "大小类管理",
              "needLogin": true,
              "needPermission": true,
              "parentId": 42,
              "path": "/init/category/CategoryManage",
              "permissionValue": 3,
              "resourceType": "1",
              "routerPath": "",
              "status": 1,
              "theOrder": 5
            }
          ],
          "createTime": 1529401343000,
          "createUser": "xujiajia",
          "description": "",
          "icon": null,
          "id": 62,
          "interfaces": [],
          "lastUpdateTime": 1529402108000,
          "lastUpdateUser": "xujiajia",
          "name": "品牌管理",
          "needLogin": true,
          "needPermission": true,
          "parentId": null,
          "path": "",
          "permissionValue": 3,
          "resourceType": "1",
          "routerPath": "",
          "status": 1,
          "theOrder": 3
        }], //menu数据
        realName: '',//用户姓名
        data: [],
        user: {},
        getUserFuns: [],
        menuName: '',
        subMenuName: '',

      };
    },
    created() {
      if (sessionStorage.getItem('userName')) {
        this.$store.commit('userStatus', sessionStorage.getItem('userName'))
      } else {
        this.$router.push("/login");
      }
    },
    methods: {
      menuClick(item) {
        this.subMenuName = ''
        this.menuName = item.name
      },
      sbuMenuClick(item) {
        this.menuName = ''
        this.subMenuName = item.name
      },
      //导航列表切换
      menuSelect(key) {
        console.log(key);
        if (key) {
          this.$router.push({name: key});
        } else {
          this.$router.push({name: "/init/error/Error404"});
        }
      },
      handleClose(key) {
        if (key.indexOf("/") != -1) {
          this.$router.push({name: key});
        }
      },
      handleOpen(key) {
        if (key.indexOf("/") != -1) {
          this.$router.push({name: key});
        }
      },
      //注销
      logOut() {
      }
    }
  };
</script>
<style lang="less" scoped>
  .el-header {
    background-color: #12244b;
    color: #ffffff;
    height: 50px !important;
    line-height: 50px !important;
    padding: 0 15px !important;

    li {
      &:first-child {
        font-size: 18px !important;

        span {
          position: relative;
          margin-right: 30px;
        }

        i {
          width: 2px;
          height: 22px;
          background: #ffffff;
          display: inline-block;
          position: absolute;
          right: -14px;
          top: 0;
        }
      }

      &:nth-child(2) {
        span {
          margin: 0 10px;
        }
      }
    }

    .init-line {
      width: 2px;
      height: 10px;
      background: #ffffff;
      display: inline-block;
      margin: 0 15px;
    }
  }

  .el-aside {
    background-color: #ffffff;
    color: #333;
    width: 200px !important;
    overflow: initial !important;
    border-right: 1px solid #c7c7c7;
  }

  .el-main {
    background-color: #ffffff;
    color: #333;
    border: 3px solid #ffffff;
    padding: 0;
  }
</style>
