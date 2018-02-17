<template>
  <div>
    <h2>没有权限访问</h2>
    <router-link :to="{ path: HOME }">返回首页</router-link>
  </div>
</template>

<script>
/**
 * @file 无权限访问提示
 * @author ltaoo<litaowork@aliyun.com>
 */
import {
  HOME,
} from '@/common/path';

export default {
  name: 'no_permission',
  data () {
    return {
      HOME,
    };
  },
};
</script>

<style>

</style>
