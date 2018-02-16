<template>
  <div class="container">
    <el-row>
      <el-col :offset="8">
        <h2 class="container__title">惠学图书管理系统 - 登录</h2>
        <LoginForm :login="login" />
      </el-col>
    </el-row>
  </div>
</template>

<script>
/**
 * @file 用户登录
 * @author ltaoo<litaowork@aliyun.com>
 */
import LoginForm from '@/components/LoginForm.vue';
import {
  LOGIN,
} from '@/common/constants';

export default {
  name: 'UserLogin',
  components: {
    LoginForm,
  },
  methods: {
    login (username, password) {
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

<style>
</style>

