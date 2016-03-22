<template>
	<div class="container">
		<h3>还书页</h3>
		<hr>
		<div class="form-inline">
			<!--无论输入什么，在前端利用回调多次去查询api，优先查询书籍ISBN码-->
			<input type="text" class="form-control" placeholder="请输入查询条件" v-model="query">
			<button class="btn btn-default" v-on:click="search(query)">查询</button>
		</div>
		<div class="row">
			<book :book-list="bookList"></book>
		</div>
	</div>
</template>

<script>
	import book from './return/bookList.vue'
	//数据处理
	import Admin from '../../store/admin.js'
	export default {
		name: 'returnbooks',
		components: {
			book
		},
		data(){
			return {
				bookList: []
			}
		},
		methods: {
			search: function(param) {
				//判断是否存在
				if(param) {
					//提交给根据isbn码查询接口
					return Admin.searchReturnByIsbn(param).then(res => {
						console.log(res.data)
						this.bookList = res.data
					})
				}
			}
		}
	}
</script>