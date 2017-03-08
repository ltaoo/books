<template>
	<el-card :body-style="{ padding: '0px' }">
		<!-- <img src="~examples/assets/images/hamburger.png" class="image"> -->
		<div style="padding: 14px;">
			<span>{{member.memberName}}</span>
			<div class="bottom clearfix">
				<time class="time">{{member.memberCreateTime}}</time>
				<el-button type="text" class="button">选择</el-button>
			</div>
		</div>
	</el-card>
	<!-- <div>
		<h3>{{member.memberName}}（{{member.memberRank | rank}}）</h3>
		<span>{{member.memberCreateTime}}</span>
		<p>学号：{{member.memberNum}}</p>
		<p v-if="member.borrowNum != 0" >已借图书</p>
		<div v-else>
			<p v-if="member.memberCreateTime | sumDaysByRank member.memberRank">会员已超期</p>
			<button v-else @click="chooseMember(member, $index)" class="btn btn-default form-control">选择</button>
		</div>
	</div> -->
</template>

<script>
	export default {
		// 组件名
		name: 'Member',
		// 从父组件传过来的属性
		props: ['member'],
		methods: {
			chooseMember (obj, index) {
				// 选择会员，这里要通知父组件
			}
		}
	}
</script>
