<template>
	<div class="container">
		<h3>后台主页</h3>
		<hr>
		<search></search>
		<!--再将父组件的数据传递给子组件，这里是传递给会员列表-->
		<div class="row">
			<member v-bind:member-list="memberList"></member>
		</div>
		<hr>
		<booksearch></booksearch>
		<div class="row">
			<book v-bind:book-list="bookList"></book>
		</div>
	</div>
  	<!-- use the modal component, pass in the prop -->
  	<modal :show.sync="showModal">
	    <h3 slot="header">custom header</h3>
	    <div slot="body">
	    	<p>{{choosemember.userName}}</p>
	    	<p>{{choosebook.booksTitle}}</p>
	    </div>
	</modal>
</template>

<script>
	import search from './index/memberSearch.vue'
	import member from './index/memberList.vue'
	//如果要求组件可复用，因为不同的search提交的url不同，所以需要可以配置url
	//书籍查询
	import booksearch from './index/bookSearch.vue'
	import book from './index/bookList.vue'
	//引入模态框组件
	import modal from '../public/modal.vue'
	export default {
		name: 'index',
		data(){
			return {
				showModal: false,
				memberList:[],
				choosemember: {},
				bookList: [],
				choosebook: {}
			}
		},
		components: {
			search,
			member,
			booksearch,
			book,
			modal
		},
		events: {
			getMember: function(members){
				this.memberList = members
			},
			chooseMember: function(member) {
				this.choosemember = member
			},
			getBooks: function(books) {
				this.bookList = books
			},
			chooseBook: function(book) {
				console.log(book.booksTitle)
				this.choosebook = book
				//获取到选择的书籍后，还要弹出模态框让管理员确认是否信息无误。
				//这样是否将booklist组件与index父组件耦合了，应该由子组件booklist触发模态框？
				//或者说，模态框根据事件触发，一旦触发了选择书籍事件，就触发模态框？
				this.showModal = true
			}
		},
		methods: {

		}
	}
</script>

