<template>
	<div>
		<el-row :gutter="20">
			<el-col :span="18">
				<el-input
						placeholder="请输入书籍名或ISBN码查询"
						icon="search"
						v-model = "query"
					>
				</el-input>
			</el-col>
			<el-col :span="6">
				<el-button type="primary" @click="dialogVisible = true">添加新书籍</el-button>
			</el-col>
		</el-row>
		<el-table
			:data="books"
			stripe
			style="width: 100%"
		>
			<el-table-column
				prop="bookTitle"
				label="书籍名"
			>
			</el-table-column>
			<el-table-column
				prop="bookIsbn"
				label="ISBN码"
			>
			</el-table-column>
			<el-table-column
				prop="bookPrice"
				label="书籍价格"
			>
			</el-table-column>
			<el-table-column
				prop="borrowTimes"
				label="借阅次数"			
			>
			</el-table-column>
			<el-table-column
				prop="bookState"
				label="书籍状态"
			>
			</el-table-column>			
			</el-table-column>
			<el-table-column
				prop="bookImg"
				label="书籍封面"
			>
			</el-table-column>
		</el-table>
		<el-dialog title="新增图书" v-model="dialogVisible" size="small">
			<el-input placeholder="输入书籍名或ISBN码" 
				v-model="searchQuery"
				icon="search"
			>
			</el-input>
			<BookList :books="resultList" />
			<span slot="footer" class="dialog-footer">
				<el-button @click="dialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="searchByDouban(searchQuery)">确 定</el-button>
			</span>
		</el-dialog>	
	</div>
</template>

<script>
	import { fetchBooks, searchByDouban } from '@/store/books'
	import BookList from '@/components/BookList.vue'
	export default {
		name: 'Members',
		data () {
			return {
				query: null,
				// 书籍列表
				books: [],
				// 新增会员的对话框是否可见
				dialogVisible: false,
				// 查询豆瓣的条件
				searchQuery: null,
				// 查询豆瓣得到的结果
				resultList: [],
				// 保存填写新会员的信息
				book: {}
			}
		},
		components: {
			BookList
		},
		created () {
			fetchBooks()
				.then(res => {
					this.books = res
				})
				.catch(err => {
					this.$message({
						message: err
					})
				})
		},
		methods: {
			searchByDouban (param) {
				searchByDouban(param)
					.then(res => {
						this.resultList = res.books
					})
					.catch(err => {
						this.$message({
							message: err
						})
					})
			},
			addBook (book) {
				// createBook(member)
				// 	.then(res => {
				// 		if (res.memberId) {
				// 			searchMemberById(res.memberId)
				// 				.then(res => {
				// 					this.members.push(res.data)
				// 				})
				// 				.catch(err => {
				// 					this.$message({
				// 						message: err,
				// 						type: 'info'
				// 					})
				// 				})
				// 			this.dialogVisible = false
				// 			this.member = {
				// 				memberNum: '',
				// 				memberName: '',
				// 				memberRank: 0,
				// 				memberTel: '',
				// 				memberAddress: ''
				// 			}
				// 		} else {
				// 			this.$message({
				// 				type: 'info',
				// 				message: res
				// 			})
				// 		}
				// 	})
				// 	.catch(err => {
				// 		this.$message({
				// 			type: 'info',
				// 			message: err
				// 		})
				// 	})
			},
			deleteBook (memberId, index) {
				// Admin.deleteMember(memberId)
				// 	.then(res=> {
				// 		// 这里判断是否成功，如果成功就页面上也同步删除该记录，或者刷新页面。
				// 		// console.log(data);
				// 		console.log(res)
				// 		if (res.state == 'success') {
				// 			// 如果删除成功
				// 			this.memberList.splice(index, 1)
				// 		} else {
				// 			alert('删除失败,请重试')
				// 		}
				// 	})
			}
		}
	}
</script>
<!-- 
<script>
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
</script> -->
