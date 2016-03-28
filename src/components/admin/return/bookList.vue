<template>
	<div class="record" v-for="record in recordList">
		<h3>{{record.bookTitle}}</h3>
		<p>{{record.memberName}}({{record.memberRank}}){{record.memberCreateTime}}</p>
		<p>{{record.borrowTime}}</p>
		<button class="form-control" @click="returnBook(record)">
			还书
		</button>
	</div>
	<div class="clear"></div>
</template>

<script>
	export default {
		name: 'returnResult',
		props: [
			'recordList'
		],
		data() {
			return {
				recordList: []
			}
		},
		methods: {
			returnBook: function(obj) {
				//console.log(obj)
				//更新借阅记录、更新会员信息、更新书籍信息
				this.$dispatch('return', obj)
			}
		}
	}
</script>

<style>
	.record{
		border:1px solid #eee;
		border-radius:5px;
		padding:10px;
		margin:10px;
		float:left;
		width:33%;
	}
	.clear{
		clear:both;
	}
</style>