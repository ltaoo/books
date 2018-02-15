<template>
  <div>
    <el-menu theme="dark" class="el-menu-demo" mode="horizontal">
      <el-menu-item index="1">
        <router-link :to="{ path: '/index' }">惠学图书管理系统</router-link>
      </el-menu-item>
      <template v-if="isLogin">
        <el-submenu index="2">
          <template slot="title">个人中心</template>
          <el-menu-item index="2-1">
            <router-link :to="{ path: '/person/info' }">用户主页</router-link>
          </el-menu-item>
          <el-menu-item index="2-2">
            <router-link :to="{ path: '/person/records' }">借阅记录</router-link>
          </el-menu-item>
          <el-menu-item index="2-3">
            <router-link :to="{ path: '/person/orders' }">订单管理</router-link>
          </el-menu-item>
        </el-submenu>
      </template>
      <template v-else>
        <el-menu-item index="2">
          <router-link :to="{ path: '/userlogin' }">登录</router-link>
        </el-menu-item>
      </template>
      <el-menu-item index="3" v-if="isLogin">
        <a @click="logout()">注销</a>
      </el-menu-item>
    </el-menu>
    <router-view></router-view>
  </div>
</template>

<script>
import router from '@/router';

export default {
  name: 'Index',
  computed: {
    isLogin () {
      return this.$store.state.memberLogin;
    },
  },
  methods: {
    logout () {
      this.$store.commit('LOGOUT');
      router.push({
        path: '/index',
      });
    },
  },
};
</script>
<style scoped>
a {
  text-decoration: none;
}
</style>
