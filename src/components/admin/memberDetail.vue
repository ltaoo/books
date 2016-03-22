<template>
	<div class="container">
		<h3>修改用户信息</h3>
		<hr>
		<div class="row" v-show="!show">数据加载中....</div>
		<div class="form-group" v-show="show">
			<input type="text" class="form-control" v-model="userInfo.userName">
		</div>
	</div>
</template>

<script>
	//数据
	import Admin from '../../store/admin.js'
	export default {
		name: 'memberdetail',
		data() {
			return {
				show: false,
				userInfo: {}
			}
		},
		route: {
			data({to}) {
				return Admin.getMemberById(to.params.memberId).then(res => {
					//可以回调成功后才展现数据
					this.show = true
					console.log(res.data)
					this.userInfo = res.data
				})
			}
		}
	}
</script>