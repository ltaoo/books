<template>
	<div>
		<el-card :body-style="{ padding: '10px' }">
			<p>{{item.bookTitle}}</p>
			<p>￥{{item.newPrice}} <span @click = "remove(item)">移除</span></p>
		</el-card>
	</div>
</template>

<script>
	export default {
		name: 'Cart',
		props: ['item', 'remove']
	}
</script>
