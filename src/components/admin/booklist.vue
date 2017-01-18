<template>
	<div class="container">
		<ul class="nav">
		  <li><a v-link="{ path: '/admin' }">租书</a></li>
		  <li><a v-link="{ path: '/return' }">还书</a></li>
		  <li><a v-link="{ path: '/bookList' }">书籍列表</a></li>
		  <li><a v-link="{ path: '/memberList' }">用户列表</a></li>
		  <li><a v-link="{ path: '/recordList' }">借阅记录</a></li>
		  <li><a v-link="{ path: '/orderList' }">订单记录</a></li>
		</ul>
		<h3>书籍列表页</h3>
		<hr>
		<div class="form-inline">
			<input type="text" class="form-control" placeholder="输入书籍名或ISBN码" v-model="query">
			<button class="btn btn-default form-control" @click="showModal=true">添加新书籍</button>
		</div>
		<div v-show="!bookList.length" class="row">
			<p>书籍列表为空</p>
		</div>
		<table class="table table-hover" v-show="bookList.length">
			<tr>
				<th>序号</th>
				<th>书籍名</th>
				<th>书籍ISBN码</th>
				<th>书籍价格</th>
				<th>借阅次数</th>
				<th>书籍状态</th>
				<th>书籍封面</th>
				<th>操作</th>
			</tr>
			<tr v-for="book in bookList | filterBy query">
				<td>{{$index + 1}}</td>
				<td>{{book.bookTitle}}</td>
				<td>{{book.bookIsbn}}</td>
				<td>{{book.bookPrice}}</td>
				<td>{{book.borrowTimes}}</td>
				<td>{{book.bookState | bookState}}</td>
				<td>{{book.bookImg}}</td>
				<td>
					<a @click="deleteBook(book.bookId, $index)">删除</a> 
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
				<button class="btn btn-default form-control" @click="searchByDouban(doubanQuery)">查询</button>
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
					console.log(res)
					this.bookList = res
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
				}).catch(err => {
					console.log(err)
				})
			},
			addBook: function(book){
				// console.log(book)
				//这里通过接口保存到数据库中
				//先将价格提取出来。
				var post = {
					title: book.title,
					price: parseFloat(book.price.match(/[1-9]\d*\.*\d*/g)[0]),
					isbn13: book.isbn13,
					summary: book.summary,
					image: book.images.medium
				}
				// console.log(JSON.stringify(book))
				Admin.addBook(post).then(res => {
					console.log(res);
					if(res.data.bookId){
						//如果返回了bookId，就是添加成功
						//查询这本书
						Index.fetchItem(res.data.bookId).then(res => {
							//查询成功后，将这本书插入到列表中。
							this.bookList.push(res.data);
							//并关闭modal。
							this.showModal = false;
							this.resultList = [];
							this.doubanQuery = null;
						})
					} else {
						console.log('err', res.data)
					}
				}).catch(err => {
					console.log(err)
				})
			},
			deleteBook: function(bookId, index){
				//删除前应该先判断该书是否正在借阅中。
				Admin.searchrecordByBookId(bookId).then(res=>{
					//如果查询到有
					console.log(res);
					if(res.data.bookId){
						alert('该书已被借阅，请先归回再删除');
					}else{
						Admin.deleteBook(bookId).then(res=> {
							
							//这里判断是否成功，如果成功就页面上也同步删除该记录，或者刷新页面。
							//console.log(data);
							console.log(res);
							if(res.state == 'success'){
								//如果删除成功
								this.bookList.splice(index, 1);
							}else{
								//console.log(data);
								//console.log('删除失败');
								alert('删除失败,请重试');
							}
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
		padding: 10px;
	}
	.result img{
		width: 100px;
		/* height:100px; */
		float:left;
		margin-right: 20px;
	}
	.result:after{
		content: '';
		clear: both;
	}
	.form-inline{
		padding: 20px;
	}
</style>