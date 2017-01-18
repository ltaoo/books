<template>
	<div class="container">
		<ul class="nav">
		  <li><a v-link="{ path: '/admin' }">租书</a></li>
		  <li><a v-link="{ path: '/return' }">还书</a></li>
		  <li><a v-link="{ path: '/bookList' }">书籍列表</a></li>
		  <li><a v-link="{ path: '/memberList' }">用户列表</a></li>
		  <li><a v-link="{ path: '/recordList' }">借阅记录</a></li>
		  <li><a v-link="{ path: '/orderList' }">订单记录</a></li>
		  <li><a @click="adminlogout()">注销</a></li>
		</ul>
		<h3>后台主页</h3>
		<hr>
		<div class="form-inline row">
			<input type="text" class="form-control membersearch" placeholder="请输入会员姓名或学号" v-model="memberQuery">
			<input type="button" class="form-control" value="查询" v-on:click="searchMember(memberQuery)">
		</div>
		<!--再将父组件的数据传递给子组件，这里是传递给会员列表-->
		<div class="row list">
			<Member v-bind:member-list="memberList"></Member>
		</div>
		<hr>
		<div class="form-inline row">
			<input type="text" class="form-control booksearch" placeholder="请输入书籍名或ISBN码" v-model="bookQuery">
			<input type="button" class="form-control" value="查询" v-on:click="searchBook(bookQuery)">
		</div>
		<div class="row list">
			<Book v-bind:book-list="bookList"></Book>
		</div>
	</div>
  	<modal v-bind:show.sync="showModal">
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
	</modal>
	<alert :show.sync="showSuccess" dismissable placement="top" type="success" width="400px" :duration="3000">
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
</template>

<script>
	import Member from './index/memberList.vue'
	import Book from './index/bookList.vue'
	//引入模态框组件
	//import modal from '../public/modal.vue'
	//引入alert组件
	import {alert, modal} from 'vue-strap'
	//引入数据处理
	import Admin from '../../store/admin.js'
	import common from '../../store/common.js'
	// 路由库
	import Router from 'vue-router'
	export default {
		// 组件名
		name: 'index',
		// state
		data(){
			return {
				// 输入框内容
				memberQuery: null,
				// 
				bookQuery: null,
				// 查询到的会员
				members: [],
				// 是否显示 modal
				showModal: false,
				showSuccess: false,
				showDangerNoInput: false,
				showDangerNoMember: false,
				// 
				notChoose: false,
				showInfo: false,
				// 获取到的会员列表
				memberList:[],
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
			Member,
			Book,
			modal,
			alert
		},
		events: {
			chooseMember: function(member) {
				this.choosemember = member
			},
			chooseBook: function(book) {
				this.choosebook = book
				//这里只是处理list组件点击了借阅事件，接下来的判断还是由index来处理
				if(this.choosemember){
					//如果选择了会员，将模态框展示出来
					this.showModal = true
				}else{
					//不然就提示没有选择会员
					console.log('没有选择会员')
					//这里触发alert组件
					this.showDangerNoMember = true
				}
			}
		},
		methods: {
			// 点击搜索会员
			searchMember(param) {
				//先判断输入是否有效，只判断是否输入，sql注入暂时不考虑
				if( !param || param.trim() === ""){
					// 如果没有输入搜索内容，就显示错误提示
					this.showDangerNoInput = true
					return false
				}
				// 根据学号查询
				Admin.searchMemberByNum(param)
					.then(res => {
						// console.log(res)
						//通过学号查询没有查询到，就通过姓名查询试试看。
						if(res.state == 404){
							return Admin.searchMemberByName(param)
						}else{
							// console.log(res)
							this.memberList = res.data
						}
					})
					.then(res => {
						if(res.state == 404) {
							this.showInfo = true
						} else {
							this.memberList = res.data
							//查询完后将chooseMember清空
							this.choosemember = {}
							//每次点击完查询按钮，都把list组件初始化
							this.$broadcast('init')
						}
					})
					.catch(err => {
						console.log(err)
					})

			},
			searchBook(param) {
				if(!param || param.trim() === ''){
					this.showDangerNoInput = true
					return false
				}
				Admin.searchBookByIsbn(param)
					.then( res => {
						//console.log(res.data)
						//如果没有获取到数据
						if(res.state == 404){
							//alert('没有查询到');
							return Admin.searchBookByName(param)
						}else{
							// console.log(res)
							this.bookList = res.data
						}
					})
					.then(res => {
						if(res.state == 404) {
							this.showInfo = true
						}else{
							//如果查询到的bookState != 0 ，就不能借阅
							//获取到数据后传递给父组件
							this.bookList = res.data
						}
					})
					.catch(err => {
						console.log(err)
					})
			},
			// 点击书籍进行借阅
			borrow(member, book){
				//提交到数据库
				var postData = {
					memberId: member.memberId,
					bookId: book.bookId
				}
				//console.log(postData)
				Admin.addBorrowRecord(postData).then(res => {
					console.log(res)
					if(res.data.recordId){
						//借阅成功后需要将所有的数据清空，恢复到初始状态，理论上来说当然是直接刷新页面方便
						this.showModal = false
						this.showSuccess = true
						this.bookList = []
						this.memberList = []
						this.choosemember = {}
						this.choosebook = {}
						this.memberQuery = ''
						this.bookQuery = ''
						//广播初始化事件，让memberlist.vue初始化
						this.$broadcast('init')
					}
				}).catch(err => {
					console.log(err)
				})
			},
			// 管理员推出登陆
			adminlogout: function(){
		        localStorage.removeItem('admin');
		        if(!localStorage.getItem('admin')){
		          	//返回首页
		          	const router = new Router
		          	router.go({path: '/index'})
		        }else{
		          	console.log(localStorage);
		        }
		    }
		}
	}
</script>

<style>
	.list{
		height:160px;
		width:100%;
		padding-left: 20px;
	}
	.borrowInfo{
		padding: 10px;
	}
</style>

