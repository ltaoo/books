<template>
	<div class="col-xs-12 sale">
		<img v-bind:src="book.bookImg" alt="">
		<div class="info">
			<h4><a v-link = "{ path: '/goods/' + book.bookId}">{{book.bookTitle}}</a></h4>
			<p>ISBN：<span>{{book.bookIsbn}}</span></p>
			<p>被借阅次数：<span>{{book.borrowTimes}}</span></p>
			<p>价格：<span>{{book.bookPrice}}</span></p>
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
				this.$dispatch('addCart', obj);
			}
		},
		computed: {
			/*isBorrow: function(){
				Index.isBorrow(this.book.bookId).then(res=>{
					if(res.state == 200){
						//如果查询到，就表示该书被借，不能购买
						return false;
					}else{
						return true;
					}
				})
			}*/
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
	}
	.sale img{
		float:left;
		padding-right: 10px;
	}
</style>