<template>
  <div>
    <el-container>
      <el-header>
        <el-row>
          <el-col :span="12"><h2>会伴</h2></el-col>
          <el-col :span="12">
            <el-menu
              mode="horizontal"
              class="el-menu-demo"
              router
              :default-active="activeIndex"
              @select="handleMenuSelect"
            >
              <el-menu-item index="1" route="/home">首页</el-menu-item>
              <el-menu-item index="2" route="/journal">期刊</el-menu-item>
              <el-menu-item index="3" route="/conference">会议</el-menu-item>
              <el-menu-item index="4" route="/account">账号信息</el-menu-item>
              <el-menu-item index="5">{{
                isLoggedIn ? "登出" : "登录"
              }}</el-menu-item>
            </el-menu>
          </el-col>
        </el-row>
      </el-header>
      <el-main>
        <div v-if="user">
          <h3>用户信息</h3>
          <p><strong>用户名：</strong>{{ user.userName }}</p>
          <p><strong>邮箱：</strong>{{ user.email }}</p>
          <p><strong>机构：</strong>{{ user.institution }}</p>
          <p>
            <strong>注册日期：</strong
            >{{ new Date(user.signupDate).toLocaleDateString() }}
          </p>
          <p><strong>权限：</strong>{{ user.authority }}</p>
        </div>
        <div v-else>
          <p>请先登录。</p>
        </div>
      </el-main>
    </el-container>
  </div>
</template>
  
  <script>
export default {
  name: "AccountPage",
  data() {
    return {
      user: null,
      activeIndex: "4",
      isLoggedIn: false,
    };
  },
  methods: {
    handleMenuSelect(index) {
      this.activeIndex = index;
      switch (index) {
        case "1":
          this.$router.push("/home");
          break;
        case "2":
          this.$router.push("/journal");
          break;
        case "3":
          this.$router.push("/conference");
          break;
        case "4":
          this.$router.push("/account");
          break;
        case "5":
          if (this.isLoggedIn) {
            this.logout();
          } else {
            this.$router.push("/login");
          }
          break;
        default:
          break;
      }
    },
    fetchUserData() {
      const user = JSON.parse(localStorage.getItem("loggedInUser"));
      if (user) {
        this.user = user;
      } else {
        this.$router.push("/login");
      }
    },
    checkLoginStatus() {
      const user = JSON.parse(localStorage.getItem("loggedInUser"));
      this.isLoggedIn = !!user;
    },
    logout() {
      localStorage.removeItem("loggedInUser");
      this.isLoggedIn = false;
      this.$router.push("/home");
    },
  },

  created() {
    this.checkLoginStatus();
    this.fetchUserData();
  },
};
</script>
  
  <style scoped>
.el-pagination {
  margin-top: 20px;
}
</style>
  