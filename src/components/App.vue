<template>
  <ul class="nav">
    <li><a v-link="{ path: '/index' }">主页</a></li>
    <li><a v-link="{ path: '/order' }">订单结算</a></li>
    <li><a v-link="{ path: '/user/info' }">用户主页</a></li>
    <li><a v-link="{ path: '/admin' }">后台</a></li>
    <li><a v-link="{ path: '/return' }">还书</a></li>
    <li><a v-link="{ path: '/bookList' }">书籍列表</a></li>
    <li><a v-link="{ path: '/memberList' }">用户列表</a></li>
    <li><a v-link="{ path: '/recordList' }">借阅记录</a></li>
    <li><a @click="logout()">注销</a></li>
  </ul>
	<router-view
	  class="view">
	</router-view>
</template>

<script>
  import Router from 'vue-router';
  export default {
    methods: {
      logout: function(){
        localStorage.removeItem('userid');
        if(!localStorage.userid){
          alert('注销成功');
          //返回首页
          var router = new Router;
          router.go({path: '/index'});
        }else{
          console.log(localStorage);
        }
      }
    }
  }
</script>

<style>
  .nav:after{
    content: '';
    clear: both;
  }
  .nav li{
    float: left;
  }
</style>