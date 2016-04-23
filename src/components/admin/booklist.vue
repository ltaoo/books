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
				<th>书籍ISBN码</th>
				<th>书籍价格</th>
				<th>借阅次数</th>
				<th>书籍封面</th>
				<th>操作</th>
			</tr>
			<tr v-for="book in bookList | filterBy query">
				<td>{{$index + 1}}</td>
				<td>{{book.bookTitle}}</td>
				<td>{{book.bookIsbn}}</td>
				<td>{{book.bookPrice}}</td>
				<td>{{book.borrowTimes}}</td>
				<td>{{book.bookImg}}</td>
				<td>
					<button class="btn btn-default" @click="showModal=true">删除</button> 
				</td>
			</tr>
		</table>
	</div>
	<modal :show.sync="showModal">
		<div slot="modal-header" class="modal-header">
	    <h4 class="modal-title">添加新书籍</h4>
	  </div>
		<div slot="modal-body">
			<div class="form-inline" v-show="!del">
				<input type="text" class="form-control" placeholder="输入书名或isbn查询" v-model="doubanQuery">
				<button class="btn btn-default" @click="searchByDouban(doubanQuery)">查询</button>
			</div>
			<div class="result" v-for="result in resultList">
				<img v-bind:src="result.image" alt="">
				<h4>{{result.title}}</h4>
				<p>{{result.isbn13}}</p>
				<p>{{result.price}}</p>
				<button class="btn btn-default" @click="addBook(result)">添加</button>
			</div>
		</div>
		<div slot="modal-footer">
			<!-- <input type="reset" class="btn btn-default" value="重置"> -->
		</div>
	</modal>
</template>

<script>
	import { modal } from 'vue-strap';
	//数据
	import Admin from '../../store/admin.js';
	import Index from '../../store/index.js';
	export default {
		name: 'booklist',
		data() {
			return {
				showModal: false,
				del: false,
				query: '',
				doubanQuery: '',
				bookList: [],
				//通过豆瓣api返回的数据
				resultList: []
			}
		},
		components: {
			modal
		},
		route: {
			data({to}) {
				return Index.fetchItems().then(res => {
					//console.log(res);
					this.bookList = res;
				})
			}
		},
		methods: {
			searchByDouban: function(param){
				//通过豆瓣api查询
				return Admin.searchByDouban(param).then(res => {
					console.log(res);
					//提取书籍对象数组。
					this.resultList = res.books;
				})
			},
			addBook: function(book){
				//这里通过接口保存到数据库中
				Admin.addBook(book).then(res => {
					console.log(res);
					if(res.data.bookId){
						//如果返回了bookId，就是添加成功
						//查询这本书
						Index.fetchItem(res.data.bookId).then(res => {
							//查询成功后，将这本书插入到列表中。
							//this.bookList.$set(res);
							//并关闭modal。
							this.showModal = false;
							this.resultList = [];
						})
					}
				})
			}
		}
	}
</script>

<style>
	.result {
		border: 1px solid #eee;
		border-radius: 4px;
		margin: 20px;
	}
	.result img{
		height:100px;
		float:left;
	}
	.result:after{
		content: '';
		clear: both;
	}
</style>