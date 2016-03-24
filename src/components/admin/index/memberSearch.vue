<template>
	<div class="form-inline">
		<input type="text" class="form-control" placeholder="请输入会员姓名或学号" v-model="memberQuery">
		<input type="button" class="form-control" value="查询" v-on:click="searchMember(memberQuery)">
		{{memberQuery}}
	</div>
</template>

<script>
	import Admin from '../../../store/admin.js'
	export default {
		name: 'searchMember',
		data () {
			return {
				memberQuery: '',
				members: []
			}
		},
		methods: {
			searchMember: function(param) {
				//先根据学号查，没查到就根据姓名查询。
				return Admin.searchMemberByNum(param).then( res => {
					//打印出获取的数据
					console.log(res.data)
					//如果没有获取到数据
					if(res.state == 0){
						alert('没有查询到');
					}else{
						//获取到数据后传递给父组件
						this.$dispatch('getMember', members)
					}
					
				})
			}
		}
	}
</script>