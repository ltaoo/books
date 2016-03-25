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
	    	<p>{{choosemember.memberName}}</p>
	    	<p>{{choosebook.bookTitle}}</p>
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
				bookList: [],
				choosemember: null,
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
			searchMember: function(members){
				//这里是点击查询事件
				this.memberList = members
				//查询完后将chooseMember清空
				this.choosemember = null
			},
			searchBook: function(books) {
				this.bookList = books
			},
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
				}
			}
		},
		methods: {

		}
	}
</script>

