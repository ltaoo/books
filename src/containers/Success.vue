<template>
  <div class="container">
    <p>购买成功</p>
    <router-link :to="{ path: '/index' }">返回首页</router-link>
    <router-link :to="{ path: '/person/orders' }">查看订单</router-link>
  </div>
</template>

<script>
export default {
  name: 'Success',
};
</script>
