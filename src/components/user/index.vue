<template>
	<div class="container">
		<div class="row">
			<h3>用户主页</h3>
      <li><a v-link="{ path: '/user/info' }">用户信息</a></li>
      <li><a v-link="{ path: '/user/records' }">借阅记录</a></li>
      <li><a v-link="{ path: '/user/address' }">收货地址管理</a></li>
    </div>
    <hr>
    <router-view></router-view>
  </div>
</template>

<script>
	export default {
		name: 'user'
	}
</script>

<style>
  ul, li{
    list-style: none;
  }
  .row li {
    float:left;
    margin-right: 10px;
  }
  .row:after{
    content: '';
    clear: both;
  }
</style>