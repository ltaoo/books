<template>
	<div class="container">
		<h3>修改用户信息</h3>
		<hr>
		<div class="row" v-show="!show">数据加载中....</div>
		<div class="form-group" v-show="show">
			<input type="text" class="form-control" v-model="member.memberName">
			<input type="text" class="form-control" v-model="member.memberNum">
			<input type="text" class="form-control" v-model="member.memberTel">
			<input type="text" class="form-control" v-model="member.memberAddress">
			<p>会员等级：{{member.memberRank}}</p>
			<input type="radio" name="rank" value='0' v-model="member.memberRank">周卡
			<input type="radio" name="rank" value='1' v-model="member.memberRank">月卡
			<input type="radio" name="rank" value='2' v-model="member.memberRank">期卡
			<button class="btn btn-default" @click="update(member)">确定</button>
		</div>
	</div>
</template>

<script>
	import Router from 'vue-router';
	//组件
	//数据
	import Admin from '../../store/admin.js';
	export default {
		name: 'memberdetail',
		components: {
		},
		data() {
			return {
				show: false,
				member: {}
			}
		},
		route: {
			data({to}) {
				return Admin.getMemberById(to.params.memberId).then(res => {
					//可以回调成功后才展现数据
					this.show = true;
					console.log(res.data);
					this.member = res.data;
				})
			}
		},
		methods: {
			update: function(member){
				return Admin.updateMember(member).then(res=> {
					console.log(res);
					if(res.state === 'success'){
						console.log('update success');
						var router = new Router();
						router.go({ path: '/memberList' });
					}else{
						console.log('update fail');
					}
				})
			}
		}
	}
</script>