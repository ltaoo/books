<template>
	<div>
		<el-menu 
			theme="dark" 
			class="el-menu-demo" 
			mode="horizontal" 
		>
			<el-menu-item index="1">
				<router-link :to="{ path: '/admin/borrow' }">租书</router-link>
			</el-menu-item>
			<el-menu-item index="2">
				<router-link :to="{ path: '/admin/return' }">还书</router-link>
			</el-menu-item>
			<el-menu-item index="3">
				<router-link :to="{ path: '/admin/books' }">书籍列表</router-link>
			</el-menu-item>
			<el-menu-item index="4">
				<router-link :to="{ path: '/admin/members' }">用户列表</router-link>
			</el-menu-item>
			<el-menu-item index="5">
				<router-link :to="{ path: '/admin/records' }">借阅记录</router-link>
			</el-menu-item>
			<el-menu-item index="6">
				<router-link :to="{ path: '/admin/orders' }">订单列表</router-link>
			</el-menu-item>
			<el-menu-item index="7" v-if = "isLogin">
				<a @click="dialogVisible = true">注销</a>
			</el-menu-item>
		</el-menu>
		<!-- <el-breadcrumb style = "margin-top: 20px;margin-left: 20px;" separator="/">
			<el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
			<el-breadcrumb-item>活动管理</el-breadcrumb-item>
			<el-breadcrumb-item>活动列表</el-breadcrumb-item>
			<el-breadcrumb-item>活动详情</el-breadcrumb-item>
		</el-breadcrumb> -->
		<router-view></router-view>
		<el-dialog title="提示" v-model="dialogVisible" size="tiny">
			<span>确定要退出登录吗？</span>
			<span slot="footer" class="dialog-footer">
				<el-button @click="dialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="logout()">确 定</el-button>
			</span>
		</el-dialog>
	</div>
</template>

 <script>
 	import router from '@/router/index'
 	export default {
 		name: 'AdminIndex',
 		data () {
 			return {
 				isLogin: false,
 				dialogVisible: false
 			}
 		},
 		created () {
 			// 一加载就读取 localStorage
 			this.isLogin = !!localStorage.getItem('adminLogin')
 		},
 		methods: {
 			logout () {
 				localStorage.removeItem('adminLogin')
 				router.push({
 					path: '/'
 				})
 			}
 		}
 	}
 </script>

