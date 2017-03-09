<template>
	<div>
		<el-menu 
			theme="dark" 
			class="el-menu-demo" 
			mode="horizontal" 
		>
			<el-menu-item index="1">
				<router-link :to="{ path: '/index' }">惠学图书管理系统</router-link>
			</el-menu-item>
			<el-menu-item index="3">
				<router-link :to = "{ path: '/person/orders' }">订单管理</router-link>
			</el-menu-item>
			<el-submenu index="4">
				<template slot="title">个人中心</template>
				<el-menu-item index="4-1">
					<router-link :to="{ path: '/person/info' }">用户主页</router-link>
				</el-menu-item>
				<el-menu-item index="4-2">
					<router-link :to="{ path: '/person/records' }">借阅记录</router-link>
				</el-menu-item>
			</el-submenu>
			<el-menu-item index="5" v-if ="isLogin">
				<a @click="logout()">注销</a>
			</el-menu-item>
		</el-menu>
		<router-view></router-view>
		<!-- <el-row>
  			<el-col :span="16">
	  			<div>
					<input type="text" class="form-control" placeholder="输入图书名称筛选" v-model="query">
						<book v-for="book in booksList | filterBy query | fetchNotSale" v-bind:book="book"></book>
				</div>
  			</el-col>
		</el-row>
 --><!-- 		<div class="row">
			<div class="col-xs-8">
			<div class="col-xs-4" v-show="cartList.length == 0">
				<h3>购物车内没有商品</h3>
			</div>
			<div class="col-xs-4" v-show="cartList.length !== 0 && count == false">
				<h3>购物车</h3>
				<hr>
				<div v-for="book in cartList" track-by="$index">
					<h3>{{book.bookTitle}}</h3>
					<p></p><p>单价：<span>{{book.newPrice}}</span></p><p @click="removeBook(book, $index)">删除</p>
				</div>
				<hr>
				<p>商品数量：<span>{{sumNum}}</span></p>
				<p>总价：<span>{{sumPrice}}</span></p>
				<a class="btn btn-default form-control" v-link="{ path: '/order' }">结算</a>
			</div>
		</div> -->
	</div>
</template>

<script>
	import router from '@/router/index'
	export default {
		name: 'Index',
		data () {
			return {
				isLogin: false
			}
		},
		created () {
			// 一加载就读取 localStorage
			this.isLogin = !!localStorage.getItem('userId')
		},
		methods: {
			logout () {
				localStorage.removeItem('userId')
				this.isLogin = false
				router.push({ path: '/books' })
			}
		}
	}
</script>
<style scoped>
	a {
		text-decoration: none;
	}
</style>
