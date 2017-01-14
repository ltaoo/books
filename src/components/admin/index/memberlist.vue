<template>
	<div class="member" v-for="member in memberList" v-show="memberList.length > 0" 
		v-bind:class="{ 'choose': $index == i}">
		<h3>{{member.memberName}}（{{member.memberRank | rank}}）</h3>
		<span>{{member.memberCreateTime}}</span>
		<p>学号：{{member.memberNum}}</p>
		<p v-if="member.borrowNum != 0" >已借图书</p>
		<div v-else>
			<p v-if="member.memberCreateTime | sumDaysByRank member.memberRank">会员已超期</p>
			<button v-else @click="chooseMember(member, $index)" class="btn btn-default form-control">选择</button>
		</div>
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
				memberInfo: {},
				i: null
			}
		},
		methods: {
			chooseMember: function(obj, index) {
				//还要在这个地方判断下这个会员是否已经超期或者借了书，如果借了就不能点击？
				//那还是用按钮比较简单
				this.memberInfo = obj
				this.i = index
				this.$dispatch('chooseMember', obj)
			}
		},
		events: {
			//初始化事件
			init: function(){
				console.log('init event is happen')
				this.i = null
				this.memberInfo = null
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
		float:left;
		width:25%;
		margin-left: 10px;
	}
	.choose{
		border:1px solid red;
	}
</style>