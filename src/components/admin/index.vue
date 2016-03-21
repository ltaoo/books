<template>
	<div class="container">
		<h3>后台主页</h3>
		<hr>
		<search></search>
		<!--再将父组件的数据传递给子组件，这里是传递给会员列表-->
		<div class="row">
			<div class="member" v-for="member in memberList">
				<h3>{{member.userName}}</h3>
				<p>{{member.userRank}}</p>
			</div>
			<div class="clear"></div>
		</div>
	</div>

</template>

<script>
	import search from './search.vue'
	//如果要求组件可复用，因为不同的search提交的url不同，所以需要可以配置url
	export default {
		name: 'index',
		data(){
			return {
				memberList:[]
			}
		},
		components: {
			search
		},
		events: {
			getMember: function(members){
				this.memberList = members
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
		width:33%;
	}
</style>