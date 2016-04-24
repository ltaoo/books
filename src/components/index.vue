<template>
	<div class="container">
		<div class="row">
			<div class="col-xs-9">
				<div class="row">
					<book v-for="book in booksList" v-bind:book="book"></book>
				</div>
			</div>
			<div class="col-xs-3" v-show="cartList.length == 0">
				<h3>购物车内没有商品</h3>
			</div>
			<div class="col-xs-3" v-show="cartList.length !== 0 && count == false">
				<h3>购物车</h3>
				<hr>
				<div v-for="book in cartList" track-by="$index">
					<h3>{{book.bookTitle}}</h3>
					<p></p><p>单价：<span>{{book.bookPrice}}</span></p><p @click="delete(book, $index)">删除</p>
				</div>
				<hr>
				<p>商品数量：<span>{{sumNum}}</span></p>
				<p>总价：<span>{{sumPrice}}</span></p>
				<button class="btn btn-default" v-on:click="count = !count">结算</button>
			</div>
			<div class="col-xs-3" v-show="count">
				<h3>结算</h3>
				<span v-on:click="count = !count">返回修改购物车</span>
				<hr>
				<h4>总价格：<span>{{sumPrice}}</span></h4>
				<form action="" class="form-horizontal">
					<div class="form-group">
						<input type="text" class="form-control" placeholder="请输入收货人">
					</div>
					<div class="form-group">
						<input type="text" class="form-control" placeholder="请输入收货地址">
					</div>
					<div class="form-group">
						<input type="text" class="form-control" placeholder="请输入联系方式">
					</div>
					<div class="form-group">
						<button class="btn btn-default" v-on:click="count()">确认提交订单</button>
						<!--点击提交订单后，弹出提示购买成功，查看订单或继续购物，怎么提示？-->
					</div>
				</form>
			</div>
		</div>
	</div>
</template>

<script>
	import store from '../store/index.js'
	//加载组件
	import book from './index/book.vue'

	export default {
		name: 'Index',
		components: {
			book
		},
		data() {
			return {
				booksList: [],
				cartList: [],
				count: false,
				isChong: false
			}
		},
		route: {
			data ({to}) {
				store.fetchItems().then(res => {
					console.log(res);
					this.booksList = res;
				})
				//购物车列表
				store.cartlist(localStorage.cartSession).then(res=>{
					console.log(res);
					if(res.state == 'err') {
						//查询失败
						this.cartList = [];
					}else{
						this.cartList = res.data;
					}
				}).catch(err=>{
					console.log(err);
				})
			}
		},
		events: {
			'addCart': function(obj) {
				//console.log(this.cartList)
				//如果商品已经存在，则不能添加
				//console.log(obj);
				//console.log(this.cartList);
				this.isChong = false;
				if(this.count == false){
					//some 只要有一个是重复的，就返回true
					this.isChong = this.cartList.some(function(book){
						return book.bookId == obj.bookId ? true : false;
					})

					if(this.isChong === false){
						this.cartList.push(obj);
						//同时还要写入数据库中
						//先获取到userid作为查询依据
						obj.cartsession = localStorage.userid;
						localStorage.cartSession = localStorage.userid;
						//console.log(obj);
						store.addCart(obj).then(res =>{
							console.log(res);
						}).catch(err => {
							console.log(err);
						})
					}else{
						alert('已经在购物车内');
					}
				}
			}
		},
		computed: {
			sumPrice () {
				//循环计算购物车内商品总价
				let sum = 0;
				for (let i = 0, len = this.cartList.length ; i < len; i++) {
					//获取购买数量
					let price = this.cartList[i].bookPrice;
					sum += parseInt(price);
				}
				console.log(sum);
				return sum;
			},
			sumNum () {
				return this.cartList.length;
			}
		},
		methods: {
			delete: function(obj, index){
				store.delete(obj).then(res=>{
					console.log(res);
					if(res.state == 'success'){
						//删除成功
						this.cartList.splice(index, 1);
					}
				})
			}
		}
	}
</script>

<style lang="stylus">
</style>