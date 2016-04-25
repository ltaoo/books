<template>
	<div class="col-xs-12 sale">
		<img v-bind:src="book.bookImg" alt="">
		<div class="info">
			<h4><a v-link = "{ path: '/goods/' + book.bookId}">{{book.bookTitle}}</a></h4>
			<p>ISBN：<span>{{book.bookIsbn}}</span></p>
			<p>被借阅次数：<span>{{book.borrowTimes}}</span></p>
			<p>原价：<del>{{book.bookPrice}}</del>  现价：<span>{{book.bookPrice | sumPriceByBorrowTimes book.borrowTimes}}</span></p>
			<template v-if="book.returnTime | isBorrow">
				<button class="btn btn-default">立即购买</button>
				<button class="btn btn-default" v-on:click="addCart(book)">加入购物车</button>
			</template>
			<template v-else>
				<p>该书正在被借阅</p>
			</template>
		</div>
	</div>
</template>

<script>
	import Index from '../../store/index.js';
	export default {
		name: 'book',
		//接收传过来的数据。
		props: {
			book: Object
		},
		data() {
			return {
			}
		},

		methods: {
			addCart: function(obj){
				//只负责添加到购物车，其他逻辑交给购物车去处理
				/*var cart = {
					bookId: obj.bookId,
					bookTitle: obj.bookTitle,
					bookPrice: obj.bookPrice
				};*/
				//处理下价格
				//按原价75折作为初始价格
				var value = obj.bookPrice;
				var times = obj.borrowTimes;
				value = 0.75*value;
				//假设每次借阅折损10%
				var loss = value*0.1;
				var price = value-(times*loss);
				var number = price.toFixed(1);

				number = String.prototype.split.call(number, '.');
				//console.log(c);
				if(number[1] > 5) {
				  number[1] = 0;
				  number[0] = parseInt(number[0]) + 1;
				}else{
				  number[1] = 5;
				}
				var post = obj;
				post.bookPrice = number.join('.');
				this.$dispatch('addCart', post);
			}
		},
		computed: {
		},
		filters: {
			isBorrow: function(value) {
				if(value == 1){
					return false;
				}else{
					return true;
				}
			}
		}
	}
</script>

<style>
	.col-xs-12{
		border:1px solid #eee;
		border-radius: 5px;
	}
	.sale{
		height:180px;
		margin-top:10px;
		padding: 10px;
	}
	.sale img{
		height: 100%;
		float:left;
		padding-right: 10px;
		border: 1px solid #eee;
		margin-right: 20px;
	}
</style>