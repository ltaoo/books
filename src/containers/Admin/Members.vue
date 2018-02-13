<template>
	<div class = "container">
		<el-row :gutter="20">
			<el-col :span="20">
				<el-input
						placeholder="请输入会员姓名或学号查询"
						icon="search"
						v-model = "query"
					>
				</el-input>
			</el-col>
			<el-col :span="4">
				<el-button
					style = "width: 100%;"
					type="primary" @click="dialogVisible = true">添加新会员</el-button>
			</el-col>
		</el-row>
		<el-table
			:data="_members"
			stripe
			style="width: 100%"
		>
			<el-table-column type="expand">
				<template scope="props">
					<el-form label-position="left" inline class="demo-table-expand">
						<el-form-item label="会员名">
							<span>{{ props.row.memberName }}</span>
						</el-form-item>
						<el-form-item label="学号">
							<span>{{ props.row.memberNum }}</span>
						</el-form-item>
						<el-form-item label="联系方式">
							<span>{{ props.row.memberTel }}</span>
						</el-form-item>
						<el-form-item label="地址">
							<span>{{ props.row.memberAddress }}</span>
						</el-form-item>
						<el-form-item label="已借阅量">
							<span>{{ props.row.borrowNum }}</span>
						</el-form-item>
						<el-form-item label="累计借阅量">
							<span>{{ props.row.borrowTimes }}</span>
						</el-form-item>
						<el-form-item label="会员类型">
							<span>{{ props.row.memberRank }}</span>
						</el-form-item>
						<el-form-item label="创建时间">
							<span>{{ props.row.memberCreateTime }}</span>
						</el-form-item>
					</el-form>
				</template>
			</el-table-column>
			<el-table-column
				prop="memberName"
				label="姓名"
			>
			</el-table-column>
			<el-table-column
				prop="memberNum"
				label="学号"
			>
			</el-table-column>
			<el-table-column
				prop="memberTel"
				label="联系方式"
			>
			</el-table-column>
			<el-table-column
				prop="memberRank"
				label="会员类型"
			>
			</el-table-column>
			<el-table-column
				prop="memberCreateTime"
				label="创建时间"
			>
			</el-table-column>
			<el-table-column
				label="操作"
			>
				<template scope="scope">
					<el-button
						size="small"
						type="text"
						@click="editMember(scope.row.memberId, scope.$index)">编辑</el-button>
					<el-button
						size="small"
						type="text"
						:disabled="scope.row.borrowNum !== '0'"
						@click="deleteMember(scope.row.memberId, scope.$index)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
		<el-dialog title="新增会员" v-model="dialogVisible" size="small">
			<MemberForm
				ref="form"
				:member = "member"
				:confirm = "addMember"
				:cancel = "resetForm"
			/>
		</el-dialog>
	</div>
</template>

<script>
	import router from '@/router/index'
	import { fetchMembers, createMember, searchMemberById, deleteMember } from '@/store/admin/member'
	import { rank, resetForm } from '@/utils/index'
	import MemberForm from '@/containers/Admin/MemberForm.vue'
	export default {
		name: 'Members',
		data () {
			return {
				query: null,
				members: [],
				// 新增会员的对话框是否可见
				dialogVisible: false,
				// 保存填写新会员的信息
				member: {
					memberName: '',
					memberNum: '',
					memberTel: '',
					memberAddress: '',
					memberRank: 0
				}
			}
		},
		components: {
			MemberForm
		},
		created () {
			fetchMembers()
				.then(res => {
					this.members = res
				})
				.catch(err => {
					this.$message({
						message: err
					})
				})
		},
		methods: {
			addMember (member) {
				console.log(this.$refs.form)
				// 表单校验
				this.$refs['form'].$refs.form.validate((valid) => {
					if (valid) {
						createMember(member)
							.then(res => {
								if (res.memberId) {
									searchMemberById(res.memberId)
										.then(res => {
											this.members.push(res.data)
										})
										.catch(err => {
											this.$message({
												message: err,
												type: 'info'
											})
										})
									this.$notify({
										title: '成功',
										message: '新建用户成功',
										type: 'success'
									})
									this.dialogVisible = false
									this.member = {
										memberNum: '',
										memberName: '',
										memberRank: 0,
										memberTel: '',
										memberAddress: ''
									}
								} else {
									this.$message({
										type: 'info',
										message: res
									})
								}
							})
							.catch(err => {
								this.$message({
									type: 'info',
									message: err
								})
							})
					} else {
						return false
					}
				})
			},
			editMember (memberId) {
				router.push(`/admin/member/${memberId}`)
			},
			deleteMember (memberId, index) {
				deleteMember(memberId)
					.then(res => {
						this.$message({
							message: '删除会员成功'
						})
						this.members.splice(index, 1)
					})
					.catch(err => {
						this.$message({
							message: err
						})
					})
			},
			resetForm (formName) {
				this.dialogVisible = false
				resetForm(this, formName)
			}
		},
		computed: {
			_members () {
				return this.members.map(member => {
					return {
						...member,
						memberRank: rank(member.memberRank)
					}
				})
			}
		}
	}
</script>
<style>
	.demo-table-expand {
		font-size: 0;
	}
	.demo-table-expand label {
		width: 90px;
		color: #99a9bf;
	}
	.demo-table-expand .el-form-item {
		margin-right: 0;
		margin-bottom: 0;
		width: 50%;
	}
</style>
