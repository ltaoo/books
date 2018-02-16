<template>
  <div class="page">
    <div class="nav">
      <Navbar
        :user="userInfo"
      />
    </div>
    <div class="content"><router-view></router-view></div>
  </div>
</template>

<script>
/**
 * @file 基础布局
 * @author ltaoo
 */
import Navbar from '@/components/Nav';
import router from '@/router';
import {
  USER_LOGIN,
} from '@/common/path';
import {
  INIT,
} from '@/common/constants';

export default {
  name: 'BasicLayout',
  components: {
    Navbar,
  },
  created () {
    this.$store.dispatch(INIT);
    const {
      auth,
    } = this.$store.state;
    const userInfo = auth.data;
    this.userInfo = userInfo;
    // 未登录
    if (!userInfo) {
      router.push({
        path: USER_LOGIN,
      });
    }
  },
};
</script>

<style>

</style>
