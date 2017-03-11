<template>
	<el-card :body-style="{ padding: '0px', display: 'flex' }">
		<img :src="_record.bookImg" class = "record__img">
		<div style="padding: 14px;" class = "record__detail">
			<p class = "record__book"><span>书籍名：{{_record.bookTitle}}</span></p>
			<p class = "record__member"><span>借阅人：{{_record.memberName}}</span> - <span>{{_record.memberRank}}</span></p>
			<p>
				<time class="time">借阅时间：{{_record.borrowTime}}</time>
				<time
					v-if = "record.isExceed"
				>(已超期)</time>
			</p>
			<el-button 
				type = "primary"
				@click = "choose(_record)"
			>归还</el-button>
		</div>
	</el-card>
</template>

<script>
	import { rank, returnTime } from '@/utils/index'
	export default {
		// 组件名
		name: 'Record',
		// 从父组件传过来的属性
		props: ['record', 'choose'],
		computed: {
			_record () {
				const _rank = this.record.memberRank
				const _returnTime = this.record.returnTime
				const _createTime = this.record.memberCreateTime
				return Object.assign({}, this.record, {
					memberRank: rank(_rank),
					isExceed: returnTime(_returnTime, _createTime, _rank) === '超期'
				})
			}
		}
	}
</script>

<style>
.record__book, .record__member {
	margin: 0;
}
</style>
