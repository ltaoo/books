<template>
	<el-card :body-style="{ padding: '0px' }">
		<img :src="record.bookImg" class="image">
		<div style="padding: 14px;">
			<span>{{record.bookTitle}}</span>
			<span>{{record.memberName}}</span>
			<span>{{record.memberRank}}</span>
			<div class="bottom clearfix">
				<time class="time">{{record.borrowTime}}</time>
				<el-button 
					class="button"
					@click = "choose(record)"
				>归还</el-button>
			</div>
		</div>
	</el-card>
</template>

<script>
	export default {
		// 组件名
		name: 'Record',
		// 从父组件传过来的属性
		props: ['record', 'choose']
	}
</script>
