<template>
	<el-card :body-style="{ padding: '0px' }">
		<img :src="item.bookImg" style = "float: left;">
		<div style="float: left; padding: 10px;">
			<span>{{item.title || item.bookTitle}}</span>
			<div class="bottom clearfix">
				<time class="time">{{item.createTime}}</time>
				<el-button 
					class="button"
					@click = "choose(item)"
				>加入购物车</el-button>
			</div>
		</div>
	</el-card>
</template>

<script>
	export default {
		// 组件名
		name: 'Goods',
		// 从父组件传过来的属性
		props: ['item', 'choose']
	}
</script>
