<template>
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
            <el-menu-item v-if="isAdmin" index="6" route="/admin">管理</el-menu-item>
            <el-menu-item index="5">{{
              isLoggedIn ? "登出" : "登录"
            }}</el-menu-item>
          </el-menu>
        </el-col>
      </el-row>

      <el-row class="search-row">
        <el-col :span="20">
          <el-input
            v-model="searchQuery"
            placeholder="请输入搜索内容"
            @keyup.enter="handleSearch"
          />
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="handleSearch">搜索</el-button>
        </el-col>
      </el-row>
    </el-header>
    <el-main>
      <slot></slot>
    </el-main>
  </el-container>
</template>
  
  <script>
export default {
  props: {
    activeIndex: {
      type: String,
      default: "1",
    },
  },
  data() {
    return {
      isLoggedIn: false,
      isAdmin: false,
      searchQuery: "",
    };
  },
  methods: {
    handleMenuSelect(index) {
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
        case '6':
          this.$router.push('/admin');
          break;
        default:
          break;
      }
    },
    checkLoginStatus() {
      const user = JSON.parse(localStorage.getItem("loggedInUser"));
      this.isLoggedIn = !!user;
      this.isAdmin = user && user.authority === 'administrator'; // 假设用户信息中有role属性
    },
    logout() {
      localStorage.removeItem("loggedInUser");
      this.isLoggedIn = false;
      this.isAdmin = false;
      this.$router.push("/login");
    },
    handleSearch() {
      if (this.searchQuery.trim()) {
        this.$router.push({
          name: "SearchResults",
          query: { q: this.searchQuery },
        });
        this.searchQuery = ''; // Clear search query after search
      }
    },
  },
  created() {
    this.checkLoginStatus();
  },
};
</script>
  
  <style scoped>
.el-pagination {
  margin-top: 20px;
}
</style>
  