<template>
	<div class="container">
		<h3>书籍列表页</h3>
		<hr>
		<div class="form-inline">
			<input type="text" class="form-control" placeholder="输入书籍名或ISBN码" v-model="query">
			<button class="btn btn-default" @click="showModal=true">添加新书籍</button>
		</div>
		<table class="table table-hover">
			<tr>
				<th>序号</th>
				<th>书籍名</th>
				<th>操作</th>
			</tr>
			<tr v-for="book in bookList | filterBy query">
				<td>{{$index + 1}}</td>
				<td>{{book.booksTitle}}</td>
				<td>
					<button class="btn btn-default" @click="showModal=true">删除</button> 
				</td>
			</tr>
		</table>
	</div>
	<modal :show.sync="showModal">
		<div slot="body">
			<div class="form-inline" v-show="!del">
				<input type="text" class="form-control" placeholder="输入书名或isbn查询" v-model="doubanQuery">
				<button class="btn btn-default" @click="searchByDouban(doubanQuery)">查询</button>
			</div>
		</div>
	</modal>
</template>

<script>
	import modal from '../public/modal.vue'
	//数据
	import Admin from '../../store/admin.js'
	export default {
		name: 'booklist',
		data() {
			return {
				showModal: false,
				del: false,
				query: '',
				doubanQuery: '',
				bookList: []
			}
		},
		components: {
			modal
		},
		methods: {
			searchByDouban: function(param){
				//通过豆瓣api查询
				return Admin.searchByDouban(param).then(res => {
					console.log(res)
				})
			}
		},
		route: {
			data({to}) {
				return Admin.getBookList().then(res => {
					this.bookList = res.data
				})
			}
		}
	}
</script>