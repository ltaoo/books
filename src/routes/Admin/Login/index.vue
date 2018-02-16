<template>
  <div class="container">
    <el-row>
      <el-col :offset="8">
        <h3>惠学图书管理系统 - 管理员登录</h3>
        <LoginForm :login="login" />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import LoginForm from '@/components/LoginForm.vue';
import {
  LOGIN,
} from '@/common/constants';

export default {
  // 组件名
  name: 'AdminLogin',
  components: {
    LoginForm,
  },
  methods: {
    // 点击登陆
    login (username, password) {
      if (!username.trim() || !password.trim()) {
        this.$message({
          message: '请输入用户名或密码',
        });
        return;
      }
      // 用户登录
      const user = {
        username,
        password,
      };
      this.$store.dispatch(LOGIN, user);
    },
  },
};
</script>

<style scoped>
.el-col {
  margin-top: 20px;
}
</style>
