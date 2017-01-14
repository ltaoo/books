<template>
	<div class="container">
		<ul class="nav">
		  <li><a v-link="{ path: '/admin' }">租书</a></li>
		  <li><a v-link="{ path: '/return' }">还书</a></li>
		  <li><a v-link="{ path: '/bookList' }">书籍列表</a></li>
		  <li><a v-link="{ path: '/memberList' }">用户列表</a></li>
		  <li><a v-link="{ path: '/recordList' }">借阅记录</a></li>
		  <li><a v-link="{ path: '/orderList' }">订单记录</a></li>
		</ul>
		<h3>用户列表页</h3>
		<hr>
		<div class="form-inline">
			<input type="text" class="form-control" placeholder="输入学号或姓名" v-model="query">
			<button class="btn btn-default form-control" @click="showModal=true">添加新会员</button>
		</div>
		<table class="table table-hover">
			<tr>
				<th>序号</th>
				<th>会员姓名</th>
				<th>会员学号</th>
				<th>联系方式</th>
				<th>地址</th>
				<th>已借数量</th>
				<th>累计借阅</th>
				<th>会员等级</th>
				<th>登记时间</th>
				<th>操作</th>
			</tr>
			<tr v-for="member in memberList | filterBy query">
				<td>{{$index + 1}}</td>
				<td>{{member.memberName}}</td>
				<td>{{member.memberNum}}</td>
				<td>{{member.memberTel}}</td>
				<td>{{member.memberAddress}}</td>
				<td>{{member.borrowNum}}</td>
				<td>{{member.borrowTimes}}</td>
				<td>{{member.memberRank | rank}}</td>
				<td>{{member.memberCreateTime}}</td>
				<td><a v-link = "{ path: '/member/' + member.memberId}">编辑</a>||<a @click="deleteMember(member.memberId, $index)">删除</a></td>
			</tr>
		</table>
	</div>
	<modal :show.sync="showModal">
		<div slot="modal-header" class="modal-header">
	    <h4 class="modal-title">添加新书籍</h4>
	  </div>
		<div slot="modal-body">
			<div class="form-group">
				<input type="text" class="form-control" v-model="member.memberName" placeholder="用户名">
				<input type="text" class="form-control" v-model="member.memberNum" placeholder="学号">
				<input type="text" class="form-control" v-model="member.memberTel" placeholder="联系方式">
				<input type="text" class="form-control" v-model="member.memberAddress" placeholder="地址">
				<input type="radio" name="rank" value='0' v-model="member.memberRank">周卡
				<input type="radio" name="rank" value='1' v-model="member.memberRank">月卡
				<input type="radio" name="rank" value='2' v-model="member.memberRank">期卡
			</div>
		</div>
		<div slot="modal-footer">
			<div class="footerBtn">
				<input type="reset" class="btn btn-default" value="重置">
				<input type="submit" class="btn btn-default" value="确定" @click="addMember(member)">
			</div>
		</div>
	</modal>
</template>

<script>
	import { modal } from 'vue-strap';
	//数据
	import Admin from '../../store/admin.js';
	export default {
		name: 'memberList',
		data(){
			return {
				memberList: [],
				showModal: false,
				member: {}
			}
		},
		components: {
			modal
		},
		route:{
			data({ to }) {
				return Admin.getMemberList().then(res =>{
					console.log(res.data);
					this.memberList = res.data;
				})
			}
		},
		methods: {
			addMember: function(member) {
				console.log('add');
				Admin.addMember(member).then(res => {
					console.log(res);
					if(res.data.memberId){
						//如果返回了bookId，就是添加成功
						//查询这本书
						Admin.getMemberById(res.data.memberId).then(res => {
							//查询成功后，将这本书插入到列表中。
							//this.bookList.$set(res);
							//并关闭modal。
							console.log('search success');
							this.showModal = false;
							this.memberList.push(res.data);
							this.member = null;
						})
					}
				})
			},
			deleteMember: function(memberId, index) {
				Admin.deleteMember(memberId).then(res=> {
					//这里判断是否成功，如果成功就页面上也同步删除该记录，或者刷新页面。
					//console.log(data);
					console.log(res);
					if(res.state == 'success'){
						//如果删除成功
						this.memberList.splice(index, 1);
					}else{
						//console.log(data);
						//console.log('删除失败');
						alert('删除失败,请重试');
					}
				})
			}
		}
	}
</script>
<style>
	.form-control{
		margin-bottom: 10px;
	}
	.form-group{
		padding: 10px;
	}
	.footerBtn{
		padding: 10px;
	}
</style>