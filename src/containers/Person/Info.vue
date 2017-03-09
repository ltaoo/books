<template>
	<div>
		<el-card
		>
			<h3>{{member.memberName}}</h3>
			<p>借阅类型：<span>{{member.memberRank}}</span></p>
			<p>学号：<span>{{member.memberNum}}</span></p>
			<p>联系方式：<span>{{member.memberTel}}</span></p>
			<p>地址：<span>{{member.memberAddress}}</span></p>
			<p>登记日期：<span>{{member.memberCreateTime}}</span></p>
		</el-card>
		<div class="row">
			<h4>正在借阅的书籍</h4>
			<template v-if = "books.length === 0">
				<p>没有借阅</p>
			</template>
			<template v-else>
				<div v-for = "book in books" :key = "book.bookId">
					<h3>{{book.bookTitle}}</h3>
					<p>借阅时间：<span>{{book.borrowTime}}</span></p>
				</div>
			</template>
		</div>
	</div>
</template>

<script>
	import { searchMemberById } from '@/store/admin/member'
	import { searchRecordByMemberId } from '@/store/admin/records'
	export default {
		name: 'PersonInfo',
		data () {
			return {
				member: {},
				borrowBook: false,
				books: []
			}
		},
		created () {
			// console.log(localStorage.userid);
			// 查询用户信息
			searchMemberById(localStorage.getItem('userId'))
				.then(res => {
					this.member = res.data
				})
				.catch(err => {
					this.$message({
						message: err
					})
				})
			// 查询借阅记录
			searchRecordByMemberId(localStorage.getItem('userId'))
				.then(res => {
					this.books = res
				})
				.catch(err => {
					this.$message({
						message: err
					})
				})
		}
	}
</script>
<style scoped>
	.el-card {
		margin-top: 0;
	}
</style>
