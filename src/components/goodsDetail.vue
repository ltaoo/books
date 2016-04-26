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
				<div class="content" v-for="comment in commentlist">
					<p>{{comment.memberId.memberName | hiddenName }}||<span>{{comment.createTime}}</span></p>
					<p>{{comment.content}}</p>
					<hr>
				</div>
				<textarea class="form-control" row="3" placeholder="请输入评论" v-model="comment"></textarea>
				<button class="btn btn-default" @click="addComment(comment)">提交评论</button>
			</div>
		</div>
	</div>
</template>

<script>
	import store from '../store/index.js';
	import common from '../store/common.js';

	export default {
		name: 'book',
		data() {
			return {
				book: {},
				commentlist: [],
				comment: ''
			}
		},
		route: {
			data({to}) {
				//console.log(to.params.bookId)
				store.fetchItem(to.params.bookId).then(res => {
					//console.log(res.data)
					//获取评论列表
					store.fetchComment(res.data.bookIsbn).then(resp=>{
						console.log(resp);
						//获取评论用户信息
						resp.data.forEach(function(obj) {
							var member = null;
							common.getMemberById(obj.memberId).then(respo=>{
								//console.log(respo.data);
								obj.memberId = respo.data;
							})
						})
						this.commentlist = resp.data;
					}).catch(err=>{
						console.log(err);
					})
					this.book = res.data;
				})
			}
		},
		methods: {
			addComment: function(content) {
				//获取相关数据
				var post = {
					memberId: localStorage.userid,
					bookIsbn: this.book.bookIsbn,
					content: content
				}
				//写入数据库
				store.addComment(post).then(res=>{
					alert('评论成功');
					//根据id查询到评论
					store.fetchById(res.commentId).then(res=>{
						console.log(res.data);
						this.commentlist.push(res.data);
						this.comment = '';
					}).catch(err=>{
						console.log(err);
					})
				}).catch(err=>{
					console.log(err);
					alert('评论失败');
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