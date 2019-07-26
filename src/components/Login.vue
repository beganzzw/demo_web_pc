<template>
  <div class="login-bg">
    <div class="login">
      <div v-show="!loginShow">
        <p class="title">微信个人中心后台管理</p>
        <el-input type="text" v-model="username"  placeholder="请输入用户名 " @keyup.enter.native="login">
          <p slot="prepend" class="fa fa-user fa-sm">用户名</p>
        </el-input>
        <el-input type="password" v-model="password" placeholder="请输入密码" @keyup.enter.native="login">
          <p slot="prepend" class="fa fa-unlock-alt fa-sm">密码</p>
        </el-input>
        <el-button type="primary" @keyup.enter.native="login" @click="login()">登录</el-button>
      </div>
      <div v-show="loginShow">
        <p>请选择品牌</p>
        <el-select v-model="value" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
        <el-button type="primary"  @click="enterInto()">进入</el-button>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
export default {
  components: {},
  data() {
    return {
      //进入页面显示隐藏
      loginShow:false,
      //用户名
      username:'',
      //密码
      password:'',
      //品牌列表
      options: [],
      //品牌列表选中值
      value:'',
      //用户信息
      userData:{},

    };
  },
  created() {
    //获取url
    if(this.utils.getURLParams(location.search).ssoShowLogin){
      this.loginShow = this.utils.getURLParams(location.search).ssoShowLogin
    }
  },
  methods: {
    //登录跳转
    login() {
      if(this.userInfo()){
        this.$http({
            method: 'post',
            url: '/user/login.do',
            data: {
              "username": this.username,
              "password": this.password
            },
          })
          .then(response => {
            // alert(data);
            if (response) {
              this.$router.push({name: "init"});
              //在Session中存储用户名
              sessionStorage.setItem('userName',response.data.realName);
              //将用户名放入vuex中
              this.$store.dispatch('setUser',response.data.realName);
            }
          })
          .catch(error => {
            if (error.response) {
              this.$message({
                message: error.response.data,
                type: 'warning',
                duration:1500
              });
            }else{
              console.log(error)
            }
          })

      }
    },
    //判断
    userInfo(){
      if (this.username == null || this.username.trim() == '') {
        this.$message({
          message: "请输入用户名！",
          type: 'warning'
        });
        return;
      }
      if (this.password == null || this.password.trim() == '') {
        this.$message({
          message: "请输入密码！",
          type: 'warning'
        });
        return;
      }
      return true
    }
  }
};
</script>
<style lang="less" scoped>
</style>

