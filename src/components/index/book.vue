<template>
	<div class="col-xs-6 sale">
		<img v-bind:src="book.bookImg" alt="">
		<div class="info">
			<h4><a v-link = "{ path: '/goods/' + book.bookId}">{{book.bookTitle}}</a></h4>
			<p>ISBN：<span>{{book.bookIsbn}}</span></p>
			<p>被借阅次数：<span>{{book.borrowTimes}}</span></p>
			<p>价格：<span>{{book.bookPrice}}</span></p>
			<button class="btn btn-default">立即购买</button>
			<button class="btn btn-default" v-on:click="addCart(book)">加入购物车</button>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'book',
		//接收传过来的数据。
		props: {
			book: Object
		},
		data() {
		},
		methods: {
			addCart: function(obj){
				//只负责添加到购物车，其他逻辑交给购物车去处理
				//购买数量加1
				var cart = {
					cartNumber: 1,
					booksId: obj.booksId,
					booksTitle: obj.booksTitle,
					booksPrice: obj.booksPrice
				};
				this.$dispatch('addCart', cart);
			}
		}
	}
</script>

<style>
	.col-xs-6{
		border:1px solid #eee;
		border-radius: 5px;
	}
	.sale{
		height:180px;
		margin-top:10px;
	}
	.sale img{
		float:left;
		padding-right: 10px;
	}
</style>