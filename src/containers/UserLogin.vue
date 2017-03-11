<template>
	<div class="container">
		<LoginForm
			:login = "login"
		/>
	</div>
</template>

<script>
	import LoginForm from '@/components/LoginForm.vue'

	import { login } from '@/store/auth'

	import router from '@/router/index'

	export default {
		name: 'UserLogin',
		components: {
			LoginForm
		},
		methods: {
			login (username, password) {
				// 用户登录
				const user = {
					username,
					password
				}
				login(user)
					.then(res => {
						// 获取到redirect
						const url = decodeURIComponent(this.$route.query.redirect)
						console.log(url)
						localStorage.setItem('userId', res.data[0])
						router.push({ path: url })
					})
					.catch(() => {
						this.$message({
							message: '用户名或密码错误'
						})
					})
			}
		}
	}
</script>
