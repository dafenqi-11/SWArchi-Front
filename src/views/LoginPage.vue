<template>
  <div class="login-container">
    <div class="login-form">
      <h2>用户登录</h2>
      <form @submit.prevent="login">
        <div class="form-group">
          <label for="email">邮箱：</label>
          <input type="email" id="email" v-model="email" required>
        </div>
        <div class="form-group">
          <label for="password">密码：</label>
          <input type="password" id="password" v-model="password" required>
        </div>
        <button type="submit">登录</button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      email: '',
      password: ''
    };
  },
  methods: {
    async login() {
      try {
        const response = await axios.get(`http://39.101.184.149:8088/api/auth/User/fuzzy/{"email":"${this.email}"}`);
        const users = response.data.data;
        const user = users.find(user => user.userPassword === this.password);

        if (user) {
          // 保存用户信息到 localStorage
          localStorage.setItem('loggedInUser', JSON.stringify(user));
          this.$router.push('/account');
        } else {
          this.$message.error('邮箱或密码错误');
        }
      } catch (error) {
        console.error('登录失败:', error);
        this.$message.error('登录失败，请稍后重试');
      }
    }
  }
};
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.login-form {
  width: 300px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
}

input[type="email"],
input[type="password"] {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 3px;
}

button {
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 3px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}
</style>
