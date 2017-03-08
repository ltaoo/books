<template>
	<el-card :body-style="{ padding: '0px' }">
		<img :src="book.image || book.bookImg" class="image">
		<div style="padding: 14px;">
			<span>{{book.title || book.bookTitle}}</span>
			<div class="bottom clearfix">
				<time class="time">{{book.pubdate || book.createTime}}</time>
				<el-button 
					class="button"
					@click = "choose(book)"
				>选择</el-button>
			</div>
		</div>
	</el-card>
</template>

<script>
	export default {
		// 组件名
		name: 'Book',
		// 从父组件传过来的属性
		props: ['book', 'choose']
	}
</script>
