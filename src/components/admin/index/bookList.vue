<template>
	<div class="book col-xs-3" v-for="book in bookList">
		<img v-bind:src="book.bookImg" alt="">
		<div class="detail">
			<h3>{{book.bookTitle}}</h3>
			<p>{{book.bookIsbn}}</p>
			<p>上架时间：{{book.createTime}}</p>
			<!--这里可以根据返回的returnTime来判断，如果是null，就表示未被借出-->
			<template v-if="book.borrowTime|sumCanBorrow">
				<input type="button" value="借阅" class="form-control" @click="borrow(book)">
			</template>
			<p v-else>已被借阅：{{book.borrowTime}}</p>
		</div>
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
		float:left;
	}
	.book img{
		float:left;
		margin-right: 20px;
	}
	.detail{
		float:left;
	}
</style>