<template>
	<div class="book" v-for="book in bookList">
		<h3>{{book.bookTitle}}</h3>
		<p>{{book.bookIsbn}}</p>
		<input type="button" value="借阅" class="form-control" @click="borrow(book)">
	</div>
	<div class="clear"></div>
</template>

<script>
	export default {
		name: 'book',
		props: ['bookList'],
		data(){
			return {
				bookList:[],
				book:{}
			}
		},
		methods: {
			borrow: function(obj) {
				//获取到要借阅的书籍信息，加上要借这本书的会员信息，共同post到数据库中。
				//所以这里还是要写一个广播事件，告诉父组件选择了哪本书。
				this.$dispatch('chooseBook', obj)
			}
		}
	}
</script>

<style>
	.clear{
		clear:both;
	}
	.book{
		border:1px solid #eee;
		border-radius:5px;
		padding:10px;
		margin:10px;
		float:left;
		width:33%;
	}
</style>