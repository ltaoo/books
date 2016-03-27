<template>
	<div class="member" v-for="member in memberList" v-show="memberList.length > 0" 
		v-bind:class="{ 'choose': $index == i}" @click="chooseMember(member, $index)">
		<h3>{{member.memberName}}（{{member.memberRank | rank}}）</h3>
		<span>{{member.memberCreateTime}}</span>
		<p>学号：{{member.memberNum}}</p>
		<p v-if="member.memberBorrowNum != 0" >已借图书</p>
		<div v-else>
			<p v-if="member.memberCreateTime | sumDaysByRank member.memberRank">会员已超期</p>
		</div>
	</div>
	<div class="clear"></div>
	{{memberInfo.memberName}}
</template>

<script>
	export default {
		name: 'member',
		props: ['memberList'],
		data(){
			return {
				memberList:[],
				member:{},
				memberInfo: {},
				i: null
			}
		},
		methods: {
			chooseMember: function(obj, index) {
				//还要在这个地方判断下这个会员是否已经超期或者借了书，如果借了就不能点击？
				this.memberInfo = obj
				this.i = index
				this.$dispatch('chooseMember', obj)
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
		width:30%;
	}
	.choose{
		border:1px solid red;
	}
</style>