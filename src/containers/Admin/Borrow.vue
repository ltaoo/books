<template>
	<el-row :gutter="20">
			<el-col :span="12">
				<el-input
					placeholder="请输入会员姓名或学号"
					icon="search"
					v-model = "memberQuery"
					:on-icon-click="searchMember.bind(this, memberQuery)"
				>
				</el-input>
				<MemberList :members = "members" />
			</el-col>
			<el-col :span="12">
				<el-input
					placeholder="请输入书籍名或ISBN码"
					icon="search"
					v-model="bookQuery"
				>
				</el-input>	
			<!-- <Book v-bind:book-list="bookList"></Book> -->
			</el-col>
		</el-row>
</template>


<script>
	import MemberList from '@/components/MemberList.vue'
	// import Book from './index/bookList.vue'
	// 引入模态框组件
	// import modal from '../public/modal.vue'
	// 引入alert组件
	// 引入数据处理
	import { searchMemberByName, searchMemberByNum } from '@/store/admin/member'
	// import common from '../../store/common.js'
	// 路由库
	import Router from 'vue-router'
	export default {
		// 组件名
		name: 'Index',
		// state
		data () {
			return {
				memberQuery: null,
				bookQuery: null,
				// 查询到的会员
				members: [],
				// 获取到的会员列表
				memberList: [],
				// 获取到的书籍列表
				bookList: [],
				// 点击的会员
				choosemember: {},
				// 点击的书籍
				choosebook: {}
			}
		},
		// 声明组件
		components: {
			MemberList
			// Book
		},
		events: {
			chooseMember (member) {
				this.choosemember = member
			},
			chooseBook (book) {
				this.choosebook = book
				// 这里只是处理list组件点击了借阅事件，接下来的判断还是由index来处理
				if (this.choosemember) {
					// 如果选择了会员，将模态框展示出来
					this.showModal = true
				} else {
					// 不然就提示没有选择会员
					console.log('没有选择会员')
					// 这里触发alert组件
					this.showDangerNoMember = true
				}
			}
		},
		methods: {
			// 点击搜索会员
			searchMember (param) {
				// 先判断输入是否有效，只判断是否输入，sql注入暂时不考虑
				if (!param || !param.trim()) {
					// 如果没有输入搜索内容，就显示错误提示
					this.$message({
						message: '请输入查询条件',
						type: 'warning'
					})
					return false
				}
				// 根据学号查询
				searchMemberByNum(param)
					.then(res => {
						console.log('searchMemberByNum result is: ', res)
						// 通过学号查询没有查询到，就通过姓名查询
						if (res.data.length === 0) {
							return searchMemberByName(param)
						} else {
							// console.log(res)
							this.members = res.data
						}
					}, err => {
						this.$message({
							message: err,
							type: 'info'
						})
					})
					.then(res => {
						console.log('searchMemberByName result is: ', res)
						if (res.data.length === 0) {
							// 根据学号、姓名都没有查询到，表示没有
							this.$message({
								message: '没有查询到',
								type: 'info'
							})
						} else {
							this.members = res.data
							// 查询完后将chooseMember清空
							// this.choosemember = {}
							// // 每次点击完查询按钮，都把list组件初始化
							// this.$broadcast('init')
						}
					}, err => {
						this.$message({
							message: err,
							type: 'info'
						})
					})
			},
			// 点击搜索图书
			searchBook (param) {
				if (!param || param.trim() === '') {
					this.showDangerNoInput = true
					return false
				}
				// Admin.searchBookByIsbn(param)
				// 	.then(res => {
				// 		// 如果没有获取到数据
				// 		if (res.state === 404) {
				// 			// alert('没有查询到');
				// 			return Admin.searchBookByName(param)
				// 		} else {
				// 			// console.log(res)
				// 			this.bookList = res.data
				// 		}
				// 	})
				// 	.then(res => {
				// 		if (res.state === 404) {
				// 			this.showInfo = true
				// 		} else {
				// 			// 如果查询到的bookState != 0 ，就不能借阅
				// 			// 获取到数据后传递给父组件
				// 			console.log(res.data)
				// 			this.bookList = res.data
				// 		}
				// 	})
				// 	.catch(err => {
				// 		console.log(err)
				// 	})
			},
			// 点击书籍进行借阅
			borrow (member, book) {
				// 提交到数据库
				// const postData = {
				// 	memberId: member.memberId,
				// 	bookId: book.bookId
				// }
				// Admin.addBorrowRecord(postData)
				// 	.then(res => {
				// 		console.log(res)
				// 		if (res.data.recordId) {
				// 			// 借阅成功后需要将所有的数据清空，恢复到初始状态，理论上来说当然是直接刷新页面方便
				// 			this.showModal = false
				// 			this.showSuccess = true
				// 			this.bookList = []
				// 			this.memberList = []
				// 			this.choosemember = {}
				// 			this.choosebook = {}
				// 			this.memberQuery = ''
				// 			this.bookQuery = ''
				// 			// 广播初始化事件，让memberlist.vue初始化
				// 			this.$broadcast('init')
				// 		} else {
				// 			// 借阅失败
				// 			console.log('borrow fail')
				// 		}
				// 	})
				// 	.catch(err => {
				// 		console.log(err)
				// 	})
			},
			// 管理员推出登陆
			adminlogout () {
				localStorage.removeItem('admin')
				if (!localStorage.getItem('admin')) {
					// 返回首页
					const router = new Router()
					router.go({path: '/index'})
				} else {
					console.log(localStorage)
				}
			}
		}
	}
</script>
