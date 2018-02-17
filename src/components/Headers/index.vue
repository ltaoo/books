<template>
  <div class="header">
    <el-breadcrumb class="header__breadbrumb" separator="/">
      <template v-for="(item, i) in routes">
        <el-breadcrumb-item :key="i" :to="{ path: item.path }">{{item.name}}</el-breadcrumb-item>
      </template>
    </el-breadcrumb>
    <div class="user">{{user && user.username}}</div>
  </div>
</template>

<script>
export default {
  name: 'header',
  props: {
    user: {
      type: Object,
      default () {
        return {};
      },
    },
  },
  computed: {
    routes () {
      return this.$route.matched;
    },
  },
};
</script>

<style>
.header {
  min-height: 46px;
  box-shadow: 0 0 5px #ccc;
}
.header__breadbrumb {
  margin-left: 10px;
  line-height: 46px;
}
</style>
