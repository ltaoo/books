<template>
	<div class = "container">
		<el-row :gutter="20">
			<el-col :span="18">
				<el-input
						placeholder="请输入会员姓名或学号查询"
						icon="search"
						v-model = "query"
					>
				</el-input>
			</el-col>
			<el-col :span="6">
				<el-button type="primary" @click="dialogVisible = true">添加新会员</el-button>
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
					<router-link :to = "{path: '/admin/member/' + scope.row.memberId}">编辑</router-link>
					<el-button
						size="small"
						type="danger"
						:disabled="scope.row.borrowNum !== '0'"
						@click="deleteMember(scope.row.memberId, scope.$index)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
		<el-dialog title="新增会员" v-model="dialogVisible" size="small">
			<el-form ref="form" :model="member" :rules="rules" label-width="80px">
				<el-form-item label="会员名" prop="memberName">
					<el-input placeholder="请输入会员名" v-model="member.memberName">
					</el-input>
				</el-form-item>
				<el-form-item label="学号" prop = "memberNum">
					<el-input placeholder="请输入学号" v-model="member.memberNum">
					</el-input>
				</el-form-item>
				<el-form-item label="联系方式" prop = "memberTel">
					<el-input placeholder="请输入联系方式" v-model="member.memberTel">
					</el-input>
				</el-form-item>
				<el-form-item label="地址" prop = "memberAddress">
					<el-input placeholder="请输入地址" v-model="member.memberAddress">
					</el-input>
				</el-form-item>
				<!-- <el-form-item label="活动时间">
					<el-col :span="11">
						<el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
					</el-col>
					<el-col class="line" :span="2">-</el-col>
					<el-col :span="11">
						<el-time-picker type="fixed-time" placeholder="选择时间" v-model="form.date2" style="width: 100%;"></el-time-picker>
					</el-col>
				</el-form-item> -->
				<el-form-item label="会员类型">
					<el-radio-group v-model="member.memberRank">
						<el-radio :label="0">周卡</el-radio>
						<el-radio :label="1">月卡</el-radio>
						<el-radio :label="2">期卡</el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="addMember(member)">确 定</el-button>
					<el-button @click="resetForm('form')">取 消</el-button>
				</el-form-item>
			</el-form>
		</el-dialog>	
	</div>
</template>

<script>
	import { fetchMembers, createMember, searchMemberById, deleteMember } from '@/store/admin/member'
	import { rank, resetForm } from '@/utils/index'
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
				},
				rules: {
					memberName: [{
						required: true,
						message: '请输入活动名称',
						trigger: 'blur'
					}, {
						max: 5,
						message: '长度在不能超过 5 个字符',
						trigger: 'blur'
					}],
					memberNum: [{
						required: true,
						message: '请输入学号',
						trigger: 'blur'
					}, {
						max: 12,
						message: '长度不能超过 12 个字符',
						trigger: 'blur'
					}],
					memberTel: [{
						required: true,
						message: '请输入联系方式',
						trigger: 'blur'
					}, {
						max: 11,
						message: '长度不能超过 11 个字符',
						trigger: 'blur'
					}],
					memberAddress: [{
						required: true,
						message: '请输入地址',
						trigger: 'blur'
					}],
					memberRank: [{
						required: true,
						message: '请选择会员类型',
						trigger: 'blur'
					}]
				}
			}
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
				// 表单校验
				this.$refs['form'].validate((valid) => {
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
