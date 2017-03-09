<template>
	<div>
		<el-table
			:data="orderlist"
			stripe
			style="width: 100%"
		>
			<el-table-column
				prop="orderId"
				label="订单编号"
			>
			</el-table-column>
			<el-table-column
				prop="bookIsbn"
				label="商品信息"
			>
				<template
					scope = "scope"
				>
					<div v-for="book in scope.row.booklist">
						<p><router-link
								:to = "{ path: '/goods/' + book.bookId}"
							>{{book.bookTitle}}</router-link></p>
						<p>￥<span>{{book.bookPrice}}</span></p>
					</div>
				</template>
			</el-table-column>
			<el-table-column
				prop="orderState"
				label="订单状态"
			>
			</el-table-column>
			<el-table-column
				label="操作"			
			>
				<template scope = "scope">
					<el-button
						type = "danger"
						@click = "cancelOrder(scope.row)"
					>取消订单</el-button>
				</template>
			</el-table-column>
		</el-table>
	</div>
</template>

<script>
	import { searchBookById, updateBookState } from '@/store/books'
	import { cancelOrder, fetchOrdersByMemberId } from '@/store/admin/order'
	export default {
		data () {
			return {
				orderlist: []
			}
		},
		created () {
			// 根据用户id查询订单
			fetchOrdersByMemberId(localStorage.getItem('userId'))
				.then(res => {
					// 在这个地方处理商品列表
					res.data.forEach(obj => {
						let booklist = obj.booklist
						booklist = booklist.split('|')
						// 获取到商品id数组，从接口查询商品详情
						let resultlist = []
						booklist.forEach(id => {
							searchBookById(id)
								.then(res => {
									// 使用过滤器来处理价格显示
									resultlist.push(res.data)
								})
								.catch(err => {
									this.$message({
										message: err
									})
								})
						})
						// resultlist为书籍对象组成的数组
						obj.booklist = resultlist
					})
					this.orderlist = res.data
				})
				.catch(err => {
					this.$message({
						message: err
					})
				})
		},
		methods: {
			cancelOrder (obj) {
				// 更新订单状态
				cancelOrder(obj.orderId)
					.then(res => {
						// 更新订单状态成功后，更新书籍状态为正常
						obj.booklist.forEach(book => {
							updateBookState(book.bookId, 0)
								.then(res => {
									obj.orderState = 2
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
			}
		}
	}
</script>
