<template>
	<div class="container">
		<div>
			<div class="consignee">
				<h4>{{member.memberName}}</h4>
				<p>联系方式：<span>{{member.memberTel}}</span></p>
				<p>收货地址：<span>{{member.memberAddress}}</span></p>
			</div>
			<router-link to = "{ path: '/index' }">返回修改购物车</router-link>
			<el-table
				:data="cartList"
				stripe
				style="width: 100%"
			>
				<el-table-column
					prop="bookTitle"
					label="商品名"
				>
				</el-table-column>
				</el-table-column>
				<el-table-column
					prop="newPrice"
					label="价格"
				>
				</el-table-column>
			</el-table>
			<el-input
				style = "margin-top: 20px;"
				type="textarea"
				:autosize="{ minRows: 2, maxRows: 4}"
				placeholder="留言"
				v-model="message">
			</el-input>
			<h4>商品数量：<span>{{sumNum}}</span></h4>
			<h4>总价格：<span>{{countPrice}}</span></h4>
		</div>
		<el-button @click="createOrder()">提交订单</el-button>
	</div>
</template>

<script>
	import router from '@/router/index'

	import { fetchCartList, emptyCart } from '@/store/cart'
	import { searchMemberById } from '@/store/admin/member'
	import { createOrder } from '@/store/admin/order'
	import { updateBookState } from '@/store/books'

	import { computedPriceByTimes } from '@/utils/index'
	export default {
		name: 'Order',
		data () {
			return {
				cartList: [],
				member: {},
				message: ''
			}
		},
		created () {
	        // 先判断购物车中是否有商品，如果没有就返回首页
			if (!localStorage.getItem('cartSession')) {
				router.replace({ path: '/books' })
			}
			// 购物车列表
			fetchCartList(localStorage.getItem('cartSession'))
				.then(res => {
					this.cartList = res.data.map(item => {
						const newPrice = computedPriceByTimes(item.bookPrice, item.borrowTimes)
						return {
							...item,
							newPrice
						}
					})
					console.log(this.cartList)
				}).catch(err => {
					this.$message({
						message: err
					})
				})
	        // 根据用户id查询用户信息
			searchMemberById(localStorage.getItem('userId'))
				.then(res => {
					this.member = res.data
				})
				.catch(err => {
					this.$message({
						message: err
					})
					router.replace({ path: '/books' })
				})
		},
		computed: {
			countPrice () {
				// 循环计算购物车内商品总价
				let sum = 0
				for (let i = 0, len = this.cartList.length; i < len; i++) {
					// 获取购买数量
					let price = this.cartList[i].newPrice
					sum += parseFloat(price)
				}
				// console.log(sum);
				return sum
			},
			sumNum () {
				return this.cartList.length
			}
		},
		methods: {
			createOrder () {
				// 生成订单保存到数据库中
				// 将商品id提取出来
				let bookIdList = this.cartList.map(obj => {
					return obj.bookId
				})
				const post = {
					memberId: localStorage.getItem('userId'),
					booklist: bookIdList.join('|'),
					message: this.message
				}
				// 写入数据库
				createOrder(post)
					.then(res => {
						// 生成订单成功，清空购物车
						emptyCart(localStorage.getItem('cartSession'))
							.then(res => {
								// 更新书籍状态为已出售
								bookIdList.forEach(bookId => {
									updateBookState(bookId, 2)
										.then(res => {
											// 跳转地址
											// 移除localStorage
											localStorage.removeItem('cartSession')
											router.replace({ path: '/success' })
										})
										.catch(err => {
											this.$message({
												message: err
											})
										})
								})
							})
							.catch(err => {
								this.$message({
									message: err
								})
							})
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
