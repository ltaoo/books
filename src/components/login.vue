<template>
	<div class="container">
		<h3>登录页面 | <a v-link="{ path: '/index' }">主页</a></h3>
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
	import auth from '../store/authentication.js';
	import Router from 'vue-router';
	export default {
		name: 'login',
		data(){
			return {
				username: '',
				password: ''
			}
		},
		methods: {
			login: function(name, paw){
				//用户登录
				var user = {
					username: name,
					password: paw
				}
				auth.login(user).then(res => {
					//console.log(res);
					if(res.state == 'success'){
						//如果登录成功，跳转回页面。
						//var router = new Router();
						//获取到redirect
						var url = decodeURIComponent(this.$route.query.redirect);
						console.log(url);
						var router = new Router();
						//给localstroage添加登录
						//console.log(res);
						localStorage.userid = res.data[0];
						router.go({path: '/user/info' });
					}
				})
			}
		}
	}
</script>