<template>
  <el-menu theme="dark" class="el-menu-demo" mode="horizontal">
    <el-menu-item index="1">
      <router-link :to="{ path: '/index' }">惠学图书管理系统</router-link>
    </el-menu-item>
    <template v-if="user">
      <el-submenu index="2">
        <template slot="title">{{user.username}}</template>
        <el-menu-item index="2-1">
          <router-link :to="{ path: PERSON_HOME }">用户主页</router-link>
        </el-menu-item>
        <el-menu-item index="2-2">
          <router-link :to="{ path: PERSON_RECORDS }">借阅记录</router-link>
        </el-menu-item>
        <el-menu-item index="2-3">
          <router-link :to="{ path: PERSON_ORDERS }">订单管理</router-link>
        </el-menu-item>
        <el-menu-item index="2-4">
          <a @click="logout()">注销</a>
        </el-menu-item>
      </el-submenu>
    </template>
    <template v-else>
      <el-menu-item index="2">
        <router-link :to="{ path: USER_LOGIN }">登录</router-link>
      </el-menu-item>
    </template>
  </el-menu>
</template>

<script>
/**
 * @file 导航栏
 * @author ltaoo<litaowork@aliyun.com>
 */
import {
  mapGetters,
} from 'vuex';

import {
  USER_LOGIN,
  PERSON_HOME,
  PERSON_RECORDS,
  PERSON_ORDERS,
} from '@/common/path';

export default {
  name: 'navbar',
  data () {
    return {
      PERSON_HOME,
      PERSON_RECORDS,
      PERSON_ORDERS,
      USER_LOGIN,
    };
  },
  computed: {
    ...mapGetters([
      'user',
    ]),
    isLogin () {
      return this.$store.state.isLogin;
    },
  },
  methods: {
    logout () {
      this.$store.dispatch('LOGOUT');
    },
  },
};
</script>

<style>

</style>
