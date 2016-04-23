<template>
  <ul class="nav">
    <li><a v-link="{ path: '/index' }">主页</a></li>
    <li><a v-link="{ path: '/admin' }">后台</a></li>
    <li><a v-link="{ path: '/return' }">还书</a></li>
    <li><a v-link="{ path: '/bookList' }">书籍列表</a></li>
    <li><a v-link="{ path: '/memberList' }">用户列表</a></li>
    <li><a v-link="{ path: '/recordList' }">借阅记录</a></li>
    <li><a v-link="{ path: '/foo' }"></a></li>
  </ul>
	<router-view
	  class="view"
	  keep-alive
	  transition
	  transition-mode="out-in">
	</router-view>
</template>

<style>
  .nav:after{
    content: '';
    clear: both;
  }
  .nav li{
    float: left;
  }
</style>