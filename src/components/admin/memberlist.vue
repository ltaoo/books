<template>
	<div class="member" v-for="member in memberList" v-show="memberList.length > 0">
		<h3>{{member.userName}}</h3>
		<p>{{member.userRank}}</p>
		<input type="button" value="选择" class="form-control" v-on:click="choose(member)">
	</div>
	<div class="clear"></div>
</template>

<script>
	export default {
		name: 'member',
		props: ['memberList'],
		data(){
			return {
				memberList:[],
				member:{}
			}
		},
		methods: {
			choose: function(obj) {
				console.log(obj)
			}
		}
	}
</script>

<style>
	.clear{
		clear:both;
	}
	.member{
		border:1px solid #eee;
		border-radius:5px;
		padding:10px;
		margin:10px;
		float:left;
		width:20%;
	}
</style>