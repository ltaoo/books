<template>
  <router-view></router-view>
</template>

<script>
/**
 * @file 根视图
 * @author ltaoo<litaowork@aliyun.com>
 */
import BasicLayout from '@/Layout/BasicLayout';

export default {
  name: 'App',
  components: {
    BasicLayout,
  },
};
</script>

