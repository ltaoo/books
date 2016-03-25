<template>
	<div class="form-inline">
		<input type="text" class="form-control" placeholder="请输入会员姓名或学号" v-model="memberQuery">
		<input type="button" class="form-control" value="查询" v-on:click="searchMember(memberQuery)">
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
				return Admin.searchMemberByNum(param).then( res => {
					//打印出获取的数据
					//console.log(res)
					//如果没有获取到数据
					if(res.state == 0){
						//alert('没有查询到');
						//通过学号查询没有查询到，通过姓名查询试试看。
						Admin.searchMemberByName(param).then(resp => {
							if(resp.state == 0) {
								alert('没有查询到')
							}else{
								console.log(resp)
								//获取到数据后传递给父组件
								this.$dispatch('searchMember', resp.data)
							}
						})
					}else{
						console.log(res)
						//获取到数据后传递给父组件
						this.$dispatch('searchMember', res.data)
					}
					
					
				})
			}
		}
	}
</script>