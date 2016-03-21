<template>
	<div class="container">
		<h3>登录页面</h3>
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
						<button class="btn btn-default" v-on:click="login(username, password)">登录</button>
					</div>
					{{username}}
				</form>
			</div>
		</div>
	</div>
</template>

<script>
	import auth from '../store/authentication.js'
	export default {
		name: 'login',
		data(){
			return {
				username: '',
				password: '',
				userList: []
			}
		},
		methods: {
			login: function(username, password){
				//用户登录
				auth.login(username, password).then(res => {
					if(res.data == 0){
						alert('用户名或密码错误')
					}else{
						alert('登录成功')
					}
				})
			}
		}
	}
</script>