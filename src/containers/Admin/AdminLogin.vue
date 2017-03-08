<template>
	<div>
		<el-row :gutter="20">
			<el-col :span="8" :offset="8">
				<el-input type="text" placeholder="用户名" v-model="username" />
			</el-col>
			<el-col :span="8" :offset="8">
				<el-input 
					type="password" 
					placeholder="密码" 
					v-model="password"
				/>	
			</el-col>
			<el-col :span="8" :offset="8">
				<el-button 
					style = "width: 100%;"
					type = "primary"
					@click="login(username, password)"
				>登录</el-button>
			</el-col>
		</el-row>
	</div>
</template>

<script>
	import router from '@/router/index'
	import { adminLogin } from '@/store/auth'
	export default {
		// 组件名
		name: 'AdminLogin',
		data () {
			return {
				username: '',
				password: ''
			}
		},
		methods: {
			// 点击登陆
			login (username, password) {
				// 需要增加一个公共表单验证
				if (!username.trim() || !password.trim()) {
					this.$message({
						message: '请输入用户名或密码'
					})
					return
				}
				// 用户登录
				const user = {
					username,
					password
				}
				adminLogin(user)
					.then(res => {
						if (res.state === 'success') {
							// 登陆成功跳转到后台首页
							// const url = decodeURIComponent(this.$route.query.redirect)
							// 给localstroage添加登录
							localStorage.setItem('adminLogin', res.data[1])
							router.push({
								path: '/admin/borrow'
							})
						} else {
							this.$message({
								message: '登录失败'
							})
						}
					})
					.catch(err => {
						this.$message({
							message: err
						})
					})
			}
		}
	}
</script>

<style scoped>
	.el-col {
		margin-top: 20px;
	}
</style>
