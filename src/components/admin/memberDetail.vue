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
			<input type="radio" checked="{{member.memberRank|sumRank 0}}" name="rank">周卡
			<input type="radio" checked="{{member.memberRank|sumRank 1}}" name="rank">月卡
			<input type="radio" checked="{{member.memberRank|sumRank 2}}" name="rank">期卡
		</div>
	</div>
</template>

<script>
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
		}
	}
</script>