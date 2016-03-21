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
  	<modal v-bind:show.sync="showModal">
	    <div slot="body">
	    	<p>{{choosemember.userName}}</p>
	    	<p>{{choosebook.booksTitle}}</p>
	    </div>
	    <div slot="footer">
	    	<button class="btn btn-default" @click="showModal=false">确认</button>
	    </div>
	</modal>
	<alert :show.sync="showAlert" dismissable></alert>
	<button class="btn btn-default" @click="showAlert=true">alert</button>
</template>

<script>
	import search from './index/memberSearch.vue'
	import member from './index/memberList.vue'
	//书籍查询
	import booksearch from './index/bookSearch.vue'
	import book from './index/bookList.vue'
	//引入模态框组件
	import modal from '../public/modal.vue'
	//引入alert组件
	import alert from '../public/alert.vue'
	export default {
		name: 'index',
		data(){
			return {
				showModal: false,
				showAlert: false,
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
			modal,
			alert
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

