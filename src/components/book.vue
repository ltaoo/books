<template>
	<div class="col-xs-4">
		<h3><a v-link = "{ path: '/goods/' + book.booksId}">{{book.booksTitle}}</a></h3>
		<p>价格：<span>{{book.booksPrice}}</span></p>
		<p>库存：<span>{{book.booksNumber}}</span></p>
		<button class="btn btn-default">立即购买</button>
		<button class="btn btn-default" v-on:click="addCart(book)">加入购物车</button>
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