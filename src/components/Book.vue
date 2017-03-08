<template>
	<el-card :body-style="{ padding: '0px' }">
		<img :src="book.image" class="image">
		<div style="padding: 14px;">
			<span>{{book.title}}</span>
			<div class="bottom clearfix">
				<time class="time">{{book.pubdate}}</time>
				<el-button type="text" class="button">选择</el-button>
			</div>
		</div>
	</el-card>
</template>

<script>
	export default {
		// 组件名
		name: 'Book',
		// 从父组件传过来的属性
		props: ['book']
	}
</script>
