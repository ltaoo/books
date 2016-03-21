<template>
	<div class="container">
		<h3>后台主页</h3>
		<hr>
		<search></search>
		<!--再将父组件的数据传递给子组件，这里是传递给会员列表-->
		<div class="row">
			<member v-bind:member-list="memberList"></member>
		</div>
	</div>
</template>

<script>
	import search from './index/memberSearch.vue'
	import member from './index/memberlist.vue'
	//如果要求组件可复用，因为不同的search提交的url不同，所以需要可以配置url
	export default {
		name: 'index',
		data(){
			return {
				memberList:[]
			}
		},
		components: {
			search,
			member
		},
		events: {
			getMember: function(members){
				this.memberList = members
			}
		}
	}
</script>

