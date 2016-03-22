<template>
	<div class="book" v-for="book in bookList">
		<h3>{{book.booksTitle}}</h3>
		<button class="btn btn-default" @click="returnBook(book)">
			还书
		</button>
	</div>
</template>

<script>
	export default {
		name: 'returnResult',
		props: [
			'bookList'
		],
		data() {
			return {
				bookList: []
			}
		},
		methods: {
			returnBook: function(obj) {
				console.log(obj)
				//更新借阅记录、更新会员信息、更新书籍信息
			}
		}
	}
</script>