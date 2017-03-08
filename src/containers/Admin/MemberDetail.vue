<template>	
	<div class="container">
		<el-row :gutter="20">
			<el-col :span="8" :offset="8">
				<el-input placeholder="请输入会员名" v-model="member.memberName" />
			</el-col>
			<el-col :span="8" :offset="8">
				<el-input placeholder="请输入会员学号" v-model="member.memberNum" />
			</el-col>
			<el-col :span="8" :offset="8">
				<el-input placeholder="请输入联系方式" v-model="member.memberTel" />
			</el-col>
			<el-col :span="8" :offset="8">
				<el-input placeholder="请输入地址" v-model="member.memberAddress" />
			</el-col>
			<el-col :span="8" :offset="8">
				<el-radio-group v-model="member.memberRank">
					<el-radio-button :label="0">周卡</el-radio-button>
					<el-radio-button :label="1">月卡</el-radio-button>
					<el-radio-button :label="2">期卡</el-radio-button>
				</el-radio-group>
			</el-col>
			<el-col :span="8" :offset="8">
				<el-button 
					style = "width: 100%;"
					type = "primary"
					@click="update(member)"
				>确定</el-button>
			</el-col>
		</el-row>
	</div>
</template>

<script>
	import {
		searchMemberById,
		updateMember
	} from '@/store/admin/member'
	import router from '@/router/index'

	export default {
		name: 'memberdetail',
		data () {
			return {
				member: {}
			}
		},
		created () {
			searchMemberById(this.$route.params.id)
				.then(res => {
					// 可以回调成功后才展现数据
					this.show = true
					console.log(res.data)
					this.member = res.data
				})
				.catch(err => {
					this.$message({
						message: err
					})
					router.push({ path: '/admin/members' })
				})
		},
		methods: {
			// 更新用户信息
			update (member) {
				updateMember(member)
					.then(res => {
						this.$notify({
							title: '成功',
							message: '更新会员信息成功',
							type: 'success'
						})
						router.push({ path: '/admin/members' })
					})
					.catch(err => {
						this.$message({
							message: err
						})
					})
			}
		}
	}
</script>

<style scoped>
	.el-col {
		margin-bottom: 20px;
	}
</style>
