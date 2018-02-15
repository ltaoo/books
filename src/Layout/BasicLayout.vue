<template>
  <div class="page">
    <div class="nav">
      <Navbar />
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

export default {
  name: 'BasicLayout',
  components: {
    Navbar,
  },
};
</script>

<style>

</style>
