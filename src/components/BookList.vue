<template>
	<el-row :gutter="20">
		<el-col :span="8" v-for="book in books" :key="book.bookId || book.id">
			<Book 
				:book = "book"
				:choose = "choose"
			/>
		</el-col>
	</el-row>
</template>

<script>
	import Book from '@/components/Book'
	export default {
		name: 'BookList',
		props: ['books', 'choose'],
		components: {
			Book
		}
	}
</script>
