<template>
  <div class="header">
    <div class="user">{{user && user.username}}</div>
  </div>
</template>

<script>
export default {
  name: 'header',
  props: {
    routes: {
      type: Array,
    },
    user: {
      type: Object,
      default () {
        return {};
      },
    },
  },
};
</script>

<style>
.header {
  min-height: 46px;
}
</style>
