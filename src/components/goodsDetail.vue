<template>
	<div class="container">
		<div class="row">
			<div class="col-xs-12 sale">
				<img v-bind:src="book.bookImg" alt="">
				<div class="bookDetail">
					<h4><a v-link = "{ path: '/goods/' + book.bookId}">{{book.bookTitle}}</a></h4>
					<p>ISBN：<span>{{book.bookIsbn}}</span></p>
					<p>被借阅次数：<span>{{book.borrowTimes}}</span></p>
					<p>原价：<del>{{book.bookPrice}}</del>  现价：<span>{{book.bookPrice | sumPriceByBorrowTimes book.borrowTimes}}</span></p>
					<template v-if="book.returnTime == 0">
						<button class="btn btn-default">立即购买</button>
						<button class="btn btn-default" v-on:click="addCart(book)">加入购物车</button>
					</template>
					<template v-else>
						<p>该书正在被借阅</p>
					</template>
				</div>
			</div>
			<div class="clearfix"></div>
			<div class="summary">
				<h4>书籍简介</h4>
				<p>{{book.bookSummary}}</p>
			</div>
			<div class="comment">
				<h4>书籍评论</h4>
			</div>
		</div>
	</div>
</template>

<script>
	import store from '../store/index.js'

	export default {
		name: 'book',
		data() {
			return {
				book: {}
			}
		},
		route: {
			data({to}) {
				//console.log(to.params.bookId)
				return store.fetchItem(to.params.bookId).then(res => {
					console.log(res.data)
					this.book = res.data
				}) 
			}
		}
	}
</script>

<style>
	.summary{
		margin-top: 20px;
	}
	.comment{
		margin-top: 20px;
	}
</style>