<template>
	<div class="container">
		<h3>用户列表页</h3>
		<hr>
		<div class="form-inline">
			<input type="text" class="form-control" placeholder="输入学号或姓名" v-model="query">
			<button class="btn btn-default" @click="showModal=true">添加新会员</button>
		</div>
		<table class="table table-hover">
			<tr>
				<th>序号</th>
				<th>会员名</th>
				<th>操作</th>
			</tr>
			<tr v-for="member in memberList | filterBy query">
				<td>{{$index + 1}}</td>
				<td>{{member.userName}}</td>
				<td><a v-link = "{ path: '/member/' + member.userId}">编辑</a>||<a href="">删除</a></td>
			</tr>
		</table>
	</div>
</template>

<script>
	import modal from '../public/modal.vue'
	//数据
	import Admin from '../../store/admin.js'
	export default {
		name: 'memberList',
		data(){
			return {
				memberList: []
			}
		},
		components: {
			modal
		},
		route:{
			data({ to }) {
				return Admin.getMemberList().then(res =>{
					console.log(res.data)
					this.memberList = res.data
				})
			}
		}
	}
</script>