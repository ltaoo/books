<template>
	<div class = "container">
		<el-row :gutter="20">
			<el-col :span="12">
				<el-input
					placeholder="请输入会员姓名或学号"
					icon="search"
					v-model = "memberQuery"
					:on-icon-click="searchMember.bind(this, memberQuery)"
				>
				</el-input>
				<MemberList
					:members = "members" 
					:choose = "chooseMember"
				/>
			</el-col>
			<el-col :span="12">
				<el-input
					placeholder="请输入书籍名或ISBN码"
					icon="search"
					v-model="bookQuery"
					:on-icon-click="searchBook.bind(this, bookQuery)"
				>
				</el-input>	
				<BookList 
					:books = "books" 
					:choose = "chooseBook"
				/>
			</el-col>
		</el-row>
		<el-dialog title="请确认以下信息" v-model="dialogVisible" size="small">
			<p><span>{{choosedMember.memberName}}</span> 借阅 <span>{{choosedBook.bookTitle}}</span></p>
			<span slot="footer" class="dialog-footer">
				<el-button @click="dialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="borrow(choosedMember, choosedBook)">确 定</el-button>
			</span>
		</el-dialog>
	</div>
</template>


<script>
	import MemberList from '@/components/MemberList.vue'
	import BookList from '@/components/BookList.vue'
	// 引入数据处理
	import { searchMemberByName, searchMemberByNum } from '@/store/admin/member'
	import { searchBookByName, searchBookByIsbn } from '@/store/books'
	import { borrow } from '@/store/admin/records'
	export default {
		// 组件名
		name: 'Index',
		data () {
			return {
				memberQuery: null,
				bookQuery: null,
				// 查询到的会员
				members: [],
				// 查询到的图书
				books: [],
				// 获取到的会员列表
				memberList: [],
				// 获取到的书籍列表
				bookList: [],
				// 模态框
				dialogVisible: false,
				// 点击的会员
				choosedMember: {},
				// 点击的书籍
				choosedBook: {}
			}
		},
		// 声明组件
		components: {
			MemberList,
			BookList
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
						// 通过学号查询没有查询到，就通过姓名查询
						if (res.data.length === 0) {
							return searchMemberByName(param)
						} else {
							// console.log(res)
							this.members = res.data
						}
					}, err => {
						this.$message({
							message: err,
							type: 'info'
						})
					})
					.then(res => {
						if (res.data.length === 0) {
							// 根据学号、姓名都没有查询到，表示没有
							this.$message({
								message: '没有查询到',
								type: 'info'
							})
						} else {
							this.members = res.data
						}
					}, err => {
						this.$message({
							message: err,
							type: 'info'
						})
					})
			},
			// 点击搜索图书
			searchBook (param) {
				if (!param || !param.trim()) {
					this.$message({
						message: '请输入查询条件',
						type: 'warning'
					})
					return false
				}
				searchBookByIsbn(param)
					.then(res => {
						if (res.data.length === 0) {
							return searchBookByName(param)
						} else {
							this.books = res.data
						}
					})
					.then(res => {
						if (res.data.length === 0) {
							this.$message({
								message: '结果为空',
								type: 'info'
							})
						} else {
							this.books = res.data
						}
					})
					.catch(err => {
						this.$message({
							message: err,
							type: 'warning'
						})
					})
			},
			chooseMember (member) {
				this.choosedMember = member
			},
			chooseBook (book) {
				this.choosedBook = book
				// 这里只是处理list组件点击了借阅事件，接下来的判断还是由index来处理
				if (this.choosedMember.memberName) {
					this.dialogVisible = true
				} else {
					this.$message({
						message: '请先选择会员',
						type: 'info'
					})
				}
			},
			// 点击书籍进行借阅
			borrow (member, book) {
				// 提交到数据库
				const postData = {
					memberId: member.memberId,
					bookId: book.bookId
				}
				borrow(postData)
					.then(res => {
						if (res.recordId) {
							// 借阅成功后需要将所有的数据清空，恢复到初始状态，理论上来说当然是直接刷新页面方便
							this.dialogVisible = false
							this.books = []
							this.members = []
							this.choosedMember = {}
							this.choosedBook = {}
							this.memberQuery = ''
							this.bookQuery = ''
							this.$notify({
								type: 'success',
								title: '成功',
								message: '书籍借阅成功'
							})
						} else {
							// 借阅失败
							this.$message({
								message: '借阅失败',
								type: 'info'
							})
						}
					})
					.catch(err => {
						this.$message({
							message: err,
							type: 'info'
						})
					})
			}
		}
	}
</script>
