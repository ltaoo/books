<template>
  <div class="container">
    <h3>管理员登录页</h3>
    <hr>
    <div class="row">
      <div class="col-xs-4 col-xs-offset-4">
        <form action="" class="form-horizontal">
          <div class="form-group">
            <input type="text" class="form-control" placeholder="用户名" v-model="username">
          </div>
          <div class="form-group">
            <input type="password" class="form-control" placeholder="密码" v-model="password">
          </div>
          <div class="form-group">
            <button class="btn btn-default form-control" v-on:click="login(username, password)">登录</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
  import auth from '../../store/authentication.js'
  import Router from 'vue-router'
  export default {
    // 组件名
    name: 'login',
    // 本地 state
    data(){
      return {
        username: null,
        password: null
      }
    },
    methods: {
      // 点击登陆
      login: function(username, password){
        // 需要增加一个公共表单验证
        if(!username || !password || username.trim() === "" || password.trim() === "") {
          // alert('请输入用户名或密码')
          return
        }
        //用户登录
        const user = {
          username,
          password
        }
        auth.adminlogin(user).then(res => {
          //console.log(res);
          if(res.state == 'success'){
            // 登陆成功跳转到后台首页
            const url = decodeURIComponent(this.$route.query.redirect)
            const router = new Router();
            //给localstroage添加登录
            console.log(res)
            localStorage.setItem('admin', res.data[1])
            router.go({path: '/admin' })
          }
        }).catch(err => {
          alert(err)
        })
      }
    }
  }
</script>