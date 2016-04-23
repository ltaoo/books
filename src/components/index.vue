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
					<h3>{{book.booksTitle}}</h3>
					<p>购买数量：<span>{{book.cartNumber}}</span></p><p>单价：<span>{{book.booksPrice}}</span></p>
					<p><span>小计：{{book.cartNumber*book.booksPrice}}</span></p>
				</div>
				<h3>总价：<span>{{sumPrice}}</span></h3>
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
				count: false
			}
		},
		route: {
			data ({to}) {
				return store.fetchItems().then(res => {
					console.log(res);
					this.booksList = res;
				})
			}
		},
		events: {
			'addCart': function(obj) {
				//console.log(this.cartList)
				//对提交的商品进行判断，是否是购物车中已有商品，如果是，则购买数量加1，否则添加商品到购物车中。
				//如果是结算步骤则不能再添加商品
				if(this.count == false){
					let booksId = obj.booksId
					let isChong = false
					for (let i = this.cartList.length - 1; i >= 0; i--) {
						if(this.cartList[i].booksId == booksId){
							//存在重复的商品
							this.cartList[i].cartNumber += 1
							isChong = true
							break
						}
					}
					if(isChong == false){
						this.cartList.push(obj)
					}
				}
			}
		},
		computed: {
			sumPrice () {
				//循环计算购物车内商品总价
				let sum = 0
				for (let i = this.cartList.length - 1; i >= 0; i--) {
					//获取购买数量
					let num = this.cartList[i].cartNumber
					let price = this.cartList[i].booksPrice
					sum += parseInt(num) * parseInt(price)

				}
				//console.log(sum)
				return sum
			}
		}
	}
</script>

<style lang="stylus">
</style>