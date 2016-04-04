<template>
	<div class="col-xs-6 sale">
		<img v-bind:src="book.bookImg" alt="">
		<div class="info">
			<h4><a v-link = "{ path: '/goods/' + book.booksId}">{{book.bookTitle}}</a></h4>
			<p>被借阅次数：<span>{{book.borrowTimes}}</span></p>
			<button class="btn btn-default">立即购买</button>
			<button class="btn btn-default" v-on:click="addCart(book)">加入购物车</button>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'book',
		props: {
			book: Object
		},
		data() {
		},
		methods: {
			addCart: function(obj){
				//只负责添加到购物车，其他逻辑交给购物车去处理
				//购买数量加1
				let cart = {}
				cart.cartNumber = 1
				cart.booksTitle = obj.booksTitle
				cart.booksPrice = obj.booksPrice
				cart.booksId = obj.booksId
				cart.booksNumber = obj.booksNumber
				this.$dispatch('addCart', cart)
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