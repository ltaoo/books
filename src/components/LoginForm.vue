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
	export default {
		// 组件名
		name: 'LoginForm',
		data () {
			return {
				username: null,
				password: null
			}
		},
		props: ['login']
	}
</script>

<style scoped>
	.el-col {
		margin-bottom: 20px;
	}
</style>
