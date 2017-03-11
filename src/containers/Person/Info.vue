<template>
	<div>
		<el-card
		>
			<h3>{{_member.memberName}}</h3>
			<p>会员类型：<span>{{_member.memberRank}}</span></p>
			<p>学号：<span>{{_member.memberNum}}</span></p>
			<p>联系方式：<span>{{_member.memberTel}}</span></p>
			<p>地址：<span>{{_member.memberAddress}}</span></p>
			<p>登记日期：<span>{{_member.memberCreateTime}}</span></p>
		</el-card>
		<div class="row">
			<h4>正在借阅的书籍</h4>
			<template v-if = "books.length === 0">
				<p>没有借阅</p>
			</template>
			<template v-else>
				<el-card v-for = "book in books" :key = "book.bookId">
					<h3>{{book.bookTitle}}</h3>
					<p>借阅时间：<span>{{book.borrowTime}}</span></p>
				</el-card>
			</template>
		</div>
	</div>
</template>

<script>
	import { searchMemberById } from '@/store/admin/member'
	import { searchRecordByMemberId } from '@/store/admin/records'

	import { rank } from '@/utils/index'
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
					console.log(res)
					this.books = res
				})
				.catch(err => {
					this.$message({
						message: err
					})
				})
		},
		computed: {
			_member () {
				const _rank = this.member.memberRank
				return Object.assign({}, this.member, {
					memberRank: rank(_rank)
				})
			}
		}
	}
</script>
<style scoped>
	.el-card {
		margin-top: 0;
	}
</style>
