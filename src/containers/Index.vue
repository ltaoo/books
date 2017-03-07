<template>
	<div class="container">
		<ul class="nav">
			<li><a v-link="{ path: '/index' }">主页</a></li>
			<li><a v-link="{ path: '/user/info' }">用户主页</a></li>
			<li v-if ="userLogin == true"><a @click="logout()">注销</a></li>
			<el-menu 
			theme="dark" 
			:default-active="activeIndex" 
			class="el-menu-demo" 
			mode="horizontal" 
			@select="handleSelect">
				<el-menu-item index="1">处理中心</el-menu-item>
				<el-submenu index="2">
					<template slot="title">我的工作台</template>
					<el-menu-item index="2-1">选项1</el-menu-item>
					<el-menu-item index="2-2">选项2</el-menu-item>
					<el-menu-item index="2-3">选项3</el-menu-item>
				</el-submenu>
				<el-menu-item index="3">
					<a href="https://www.ele.me" target="_blank">订单管理</a>
				</el-menu-item>
			</el-menu>
		</ul>
		<div class="row">
			<div class="col-xs-8">
				<input type="text" class="form-control" placeholder="输入图书名称筛选" v-model="query">
				<div class="row">
					<!-- <book v-for="book in booksList | filterBy query | fetchNotSale" v-bind:book="book"></book> -->
				</div>
			</div>
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
		</div>
	</div>
</template>

<script>
	import store from '../store/index'
	// 加载组件
	// import book from './index/book.vue'
	// import Router from 'vue-router'
	export default {
		name: 'Index',
		components: {
			// book
		},
		data () {
			return {
				// 书籍列表
				books: [],
				// 购物车列表
				cartList: [],
				// 总价
				count: false,
				// 是否重复
				isChong: false,
				// 用户是否登录
				userLogin: true
			}
		},
		route: {
			data ({to}) {
				store.fetchItems()
					.then(res => {
						console.log('books', res)
						this.booksList = res
					})
				// 购物车列表
				store.cartlist(localStorage.cartSession)
					.then(res => {
						console.log(res)
						if (res.state === 'err') {
							// 查询失败
							this.cartList = []
						} else {
							this.cartList = res.data
						}
					}).catch(err => {
						console.log(err)
					})
				// console.log(localStorage.userid);
				if (localStorage.userid) {
					// 如果用户id存在，就是已登录
					this.userLogin = true
				} else {
					this.userLogin = false
				}
				console.log('userlogin :' + this.userLogin)
			}
		},
		events: {
			addCart (obj) {
				this.isChong = false
				if (this.count === false) {
					// some 只要有一个是重复的，就返回true
					this.isChong = this.cartList.some(book => {
						return book.bookId === obj.bookId
					})

					if (this.isChong === false) {
						// obj.bookPrice = obj.newPrice;
						this.cartList.push(obj)
						// 同时还要写入数据库中
						// 先获取到userid作为查询依据
						obj.cartsession = localStorage.userid || 123
						localStorage.cartSession = obj.cartsession
						// console.log(obj);
						store.addCart(obj).then(res => {
							console.log(res)
						}).catch(err => {
							console.log(err)
						})
					} else {
						alert('已经在购物车内')
					}
				}
			},
			createOrder () {
				// 清空购物车
				this.cartList = []
			}
		},
		computed: {
			sumPrice () {
				// 循环计算购物车内商品总价
				let sum = 0
				for (let i = 0, len = this.cartList.length; i < len; i++) {
					// 获取购买数量
					let price = this.cartList[i].newPrice
					sum += parseFloat(price)
				}
				console.log(sum)
				return sum
			},
			sumNum () {
				return this.cartList.length
			},
			userlogin () {
				if (localStorage.userid) {
					// 如果用户id存在，就是已登录
					this.userlogin = true
				} else {
					this.userlogin = false
				}
			}
		},
		methods: {
			removeBook (obj, index) {
				obj.cartSession = localStorage.cartSession
				store.delete(obj).then(res => {
					console.log(res)
					if (res.state === 'success') {
						// 删除成功
						this.cartList.splice(index, 1)
					}
				})
			},
			logout () {
				localStorage.removeItem('userid')
				if (!localStorage.userid) {
					// 返回首页
					// const router = new Router()
					// router.go({path: '/index
					location.href = '#!/login?redirect=%252Fuser%252Finfo'
				} else {
					console.log(localStorage)
				}
			}
		}
	}
</script>
