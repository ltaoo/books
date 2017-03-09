<template>
	<div class="container">
		<el-row :gutter="20">
			<el-col :span="18">
				<el-input
						placeholder="请输入会员姓名或学号查询"
						icon="search"
						v-model = "query"
					>
				</el-input>
			</el-col>
		</el-row>
		<el-table
			:data="orders"
			stripe
			style="width: 100%"
		>
			<el-table-column
				prop="memberName"
				label="订单编号"
			>
			</el-table-column>
			<el-table-column
				label="商品信息"
			>
				<template scope="scope">
					<div v-for="book in scope.row.booklist" :key = "book.bookId">
						<p><a v-link = "{ path: '/goods/' + book.bookId}">{{book.bookTitle}}</a></p>
						<p>书籍编号：<span>{{book.bookId}}</span></p>
						<p>书籍价格：<span>{{book.bookPrice |sumPriceByBorrowTimes book.borrowTimes}}</span></p>
					</div>
				</template>
			</el-table-column>
			<el-table-column
				label="收货人"
			>
			</el-table-column>
			<el-table-column
				prop="orderState"
				label="订单状态"
			>
			</el-table-column>
		</el-table>
<!-- 		<table class="table table-hover">
		<tr>
        <th></th>
        <th>订单编号</th>
        <th>商品信息</th>
        <th>收货人</th>
        <th>订单状态</th>
        <th>操作</th>
      </tr>
      <tr v-for = "order in orderlist">
        <td>{{$index + 1}}</td>
        <td>{{order.orderId}}</td>
        <td>
          <div v-for="book in order.booklist">
            <p><a v-link = "{ path: '/goods/' + book.bookId}">{{book.bookTitle}}</a></p>
            <p>书籍编号：<span>{{book.bookId}}</span></p>
            <p>书籍价格：<span>{{book.bookPrice |sumPriceByBorrowTimes book.borrowTimes}}</span></p>
          </div>
        </td>
        <td>
          <div>
            <p>{{order.memberId.memberName}}</p>
            <p>联系方式：{{order.memberId.memberTel}}</p>
            <p>收货地址：<span>{{order.memberId.memberAddress}}</span></p>
          </div>
        </td>
        <td>{{order.orderState | orderState}}</td>
        <td v-if="order.orderState == 0">
          <a @click="confirmOrder(order)">确认订单</a>|
          <a @click="cancelOrder(order)">取消订单</a>
        </td>
        <td v-else>
          <a>查看订单</a>
        </td>
      </tr>
    </table> -->
	</div>
</template>

<script>
	import {
		fetchOrders,
		confirmOrder,
		cancelOrder
	} from '@/store/admin/order'
	import {
		searchMemberById
	} from '@/store/admin/member'
	import {
		searchBookById,
		updateBookState
	} from '@/store/books'
	export default {
		data () {
			return {
				orders: []
			}
		},
		created () {
			// 获取所有订单记录
			fetchOrders()
				.then(res => {
					// 在这个地方处理商品列表
					res.data.forEach(obj => {
						// 处理每条记录
						// 获取到商品id集合
						let booklist = obj.booklist
						// 分割成数组
						booklist = booklist.split('|')
						var resultlist = []
						booklist.forEach(id => {
							searchBookById(id).then(respon => {
								// 使用过滤器来处理价格显示
								resultlist.push(respon.data)
							})
						})
						// resultlist为书籍对象组成的数组
						obj.booklist = resultlist
						// 获取购买者的详细信息
						var memberId = obj.memberId
						searchMemberById(memberId)
							.then(member => {
								obj.memberId = member.data
							})
					})
					// 循环结束
					this.orders = res.data
				})
				.catch(err => {
					console.log(err)
				})
		},
		methods: {
			confirmOrder (obj) {
				// 更新订单状态为已确认
				confirmOrder(obj.orderId)
					.then(res => {
						// 更新书籍状态为已售出
						obj.booklist.forEach(obj => {
							console.log(obj.bookId)
							updateBookState(obj.bookId, 1)
								.then(res => {
									console.log('更新状态成功')
								})
								.catch(err => {
									this.$message({
										message: err
									})
								})
						})
						alert('订单确认成功')
						obj.orderState = 1
					})
					.catch(err => {
						console.log(err)
						alert('确认失败')
					})
			},
			cancelOrder (obj) {
				cancelOrder(obj.orderId)
					.then(res => {
						alert('取消订单成功')
						obj.orderState = 2
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
