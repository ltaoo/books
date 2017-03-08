<template>
	<div class="container">
		<el-menu 
			theme="dark" 
			class="el-menu-demo" 
			mode="horizontal" 
		>
			<el-menu-item index="1">
				<router-link :to="{ path: '/admin' }">租书</router-link>
			</el-menu-item>
			<el-menu-item index="2">
				<router-link :to="{ path: '/return' }">还书</router-link>
			</el-menu-item>
			<el-menu-item index="3">
				<router-link :to="{ path: '/bookList' }">书籍列表</router-link>
			</el-menu-item>
			<el-menu-item index="4">
				<router-link :to="{ path: '/memberList' }">用户列表</router-link>
			</el-menu-item>
			<el-menu-item index="5">
				<router-link :to="{ path: '/recordList' }">借阅记录</router-link>
			</el-menu-item>
			<el-menu-item index="6">
				<router-link :to="{ path: '/orderList' }">订单列表</router-link>
			</el-menu-item>
			<el-menu-item index="7">
				<a @click="adminlogout()">注销</a>
			</el-menu-item>
		</el-menu>
		<el-row>
			<el-col :span="12">
				<el-input
					placeholder="请输入会员姓名或学号"
					icon="search"
					v-model="memberQuery"
					:on-icon-click="searchMember.bind(this, memberQuery)"
				>
				</el-input>
			<!-- <Member v-bind:member-list="memberList"></Member> -->
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
	</div>
  	<!-- <modal v-bind:show.sync="showModal">
			<div slot="modal-header" class="modal-header">
		    <h4 class="modal-title">确定借阅信息</h4>
		  </div>
	    <div slot="modal-body" class="borrowInfo">
	    	<p>姓名：{{choosemember.memberName}}</p>
	    	<p>学号：{{choosemember.memberNum}}</p>
	    	<p>开始日期：{{choosemember.memberCreateTime}}</p>
	    	<p>会员等级：{{choosemember.memberRank | rank}}</p>
	    	<p>图书名称：{{choosebook.bookTitle}}</p>
	    	<p>图书ISBN码：{{choosebook.bookIsbn}}</p>
	    </div>
	    <div slot="modal-footer">
	    	<div class="footerBtn">
	    		<button class="btn btn-default" @click="borrow(choosemember, choosebook)">确认</button>
	    	</div>
	    </div>
	</modal> -->
	<!-- <alert :show.sync="showSuccess" dismissable placement="top" type="success" width="400px" :duration="3000">
			<span class="icon-info-circled alert-icon-float-left"></span>
		  	<strong>借阅成功</strong>
	</alert>
	<alert :show.sync="showDangerNoMember" dismissable placement="top" type="danger" width="400px" :duration="3000">
		<span class="icon-info-circled alert-icon-float-left"></span>
		<strong>请先选择会员</strong>
	</alert>
	<alert :show.sync="showDangerNoInput" dismissable placement="top" type="danger" width="400px" :duration="3000">
		<span class="icon-info-circled alert-icon-float-left"></span>
		<strong>请输入查询条件</strong>
	</alert>
	<alert :show.sync="showInfo" dismissable placement="top" type="info" width="400px" :duration="3000">
		<span class="icon-info-circled alert-icon-float-left"></span>
	  	<strong>没有查询到</strong>
	</alert>
 --></template>

<script>
	// import Member from './index/memberList.vue'
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
		name: 'index',
		// state
		data () {
			return {
				// 输入框内容
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
			// Member,
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
						// console.log(res)
						// 通过学号查询没有查询到，就通过姓名查询试试看。
						if (res.state === 404) {
							return searchMemberByName(param)
						} else {
							// console.log(res)
							this.memberList = res.data
						}
					})
					.then(res => {
						if (res.state === 404) {
							this.showInfo = true
						} else {
							this.memberList = res.data
							// 查询完后将chooseMember清空
							this.choosemember = {}
							// 每次点击完查询按钮，都把list组件初始化
							this.$broadcast('init')
						}
					})
					.catch(err => {
						console.log(err)
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
