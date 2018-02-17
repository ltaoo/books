<template>
  <div class="header">
    <el-breadcrumb class="header__breadbrumb" separator="/">
      <template v-for="(item, i) in routes">
        <el-breadcrumb-item :key="i" :to="{ path: item.path }">{{item.name}}</el-breadcrumb-item>
      </template>
    </el-breadcrumb>
    <div style="line-height: 46px;" v-if="isAdmin">
      <el-dropdown>
        <span class="el-dropdown-link">
          {{user.username}}
          <i class="el-icon-caret-bottom el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item><div @click="logout">注销</div></el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <div v-else>
       <el-dropdown>
        <span class="el-dropdown-link">
          <router-link :to="{ path: USER_LOGIN }">登录</router-link>
        </span>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
/**
 * @file 后台 Header，显示面包屑与用户名
 * @author ltaoo<litaowork@aliyun.com>
 */
import {
  mapGetters,
 } from 'vuex';

import {
  USER_LOGIN,
} from '@/common/path';
import {
  LOGOUT,
} from '@/common/constants';

export default {
  name: 'header',
  data () {
    return {
      USER_LOGIN,
    };
  },
  computed: {
    ...mapGetters([
      'user',
      'login',
      'isAdmin',
    ]),
    routes () {
      return this.$route.matched;
    },
  },
  methods: {
    logout () {
      this.$store.dispatch(LOGOUT);
    },
  },
};
</script>

<style>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 30px 0 20px;
  min-height: 46px;
  box-shadow: 0 0 5px #ccc;
}
.header__breadbrumb {
  margin-left: 10px;
  line-height: 46px;
}
</style>
