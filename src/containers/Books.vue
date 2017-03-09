<template>
	<div class = "container">
		<el-row :gutter="20">
			<el-col :span="18">
				<el-input
					placeholder="请输入书籍名或ISBN码查询"
					icon="search"
					v-model = "query"
				>
				</el-input>
				<el-row :gutter = "20">
					<el-col :span = "12" v-for = "book in books" :key = "book.bookId">
						<Goods
							:item = "book"
							:choose = "addCart"
						/>
					</el-col>
				</el-row>
			</el-col>
			<el-col :span = "6">
				<el-input
					placeholder="请输入书籍名或ISBN码查询"
					icon="search"
					v-model = "query"
				>
				</el-input>
				<el-row>
					<el-col :span = "24" v-for = "item in cartList" :key = "item.bookId">
						<Cart
							:item = "item"
							:remove = "removeFromCart"
						/>
					</el-col>
				</el-row>
				<el-button
					style = "width: 100%;"
				>{{sumPrice}} - 结算</el-button>
			</el-col>
		</el-row>
	</div>
</template>

<script>
	import {
		fetchBooks
	} from '@/store/books'
	import {
		fetchCartList,
		removeFromCart,
		addToCart
	} from '@/store/cart'

	import { computedPriceByTimes } from '@/utils/index'

	import Goods from '@/components/Goods.vue'
	import Cart from '@/components/Cart.vue'
	export default {
		name: 'IndexBooks',
		components: {
			Goods,
			Cart
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
				userLogin: true,
				// 筛选图书条件
				query: ''
			}
		},
		created () {
			fetchBooks()
				.then(res => {
					this.books = res
				})
				.catch(err => {
					this.$message({
						message: err
					})
				})
			// 购物车列表
			fetchCartList(localStorage.getItem('cartSession'))
				.then(res => {
					this.cartList = res.data
				}).catch(err => {
					this.$message({
						message: err
					})
				})
			// console.log(localStorage.userid);
			if (localStorage.getItem('userId')) {
				// 如果用户id存在，就是已登录
				this.userLogin = true
			} else {
				this.userLogin = false
			}
		},
		computed: {
			sumPrice () {
				// 循环计算购物车内商品总价
				let sum = 0
				const carts = this.cartList
				for (let i = 0, len = carts.length; i < len; i++) {
					// 获取购买数量
					console.log(carts[i].newPrice)
					let price = this.cartList[i].newPrice
					sum += parseFloat(price)
				}
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
			addCart (obj) {
				console.log(this)
				// some 只要有一个是重复的，就返回true
				this.isChong = this.cartList.some(book => {
					return book.bookId === obj.bookId
				})

				if (this.isChong === false) {
					// console.log(obj);
					// obj.bookPrice = obj.newPrice;
					obj.newPrice = computedPriceByTimes(obj.bookPrice, obj.borrowTimes)
					this.cartList.push(obj)
					// 同时还要写入数据库中
					// 先获取到userid作为查询依据
					obj.cartsession = localStorage.getItem('userId') || 123
					localStorage.setItem('cartSession', obj.cartsession)
					// 加入购物车成功不做任何处理
					addToCart(obj)
						.catch(err => {
							this.$message({
								message: err
							})
							// 如果写入数据库失败，还要从购物车移除，因为是已经加入到购物车中了
							this.cartList.splice(this.cartList.indexOf(obj), 1)
						})
				} else {
					this.$message({
						message: '该商品已经在购物车'
					})
				}
			},
			removeFromCart (obj, index) {
				removeFromCart(obj)
					.then(res => {
						this.cartList.splice(index, 1)
						obj.cartSession = localStorage.getItem('cartSession')
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
