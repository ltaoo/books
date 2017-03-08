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
			:data="members"
			stripe
			style="width: 100%"
		>
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
				prop="memberAddress"
				label="地址"
				width="180"
			>
			</el-table-column>
			<el-table-column
				prop="borrowNum"
				label="已借书数"
			>
			</el-table-column>
			<el-table-column
				prop="borrowTimes"
				label="累计借阅量"
			>
			</el-table-column>
			<el-table-column
				prop="memberRank"
				label="会员等级"
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
			<!-- <span>这是一段信息</span> -->
			<el-input placeholder="请输入内容" v-model="member.memberName">
				<template slot="prepend">会员名</template>
			</el-input>
			<el-input placeholder="请输入内容" v-model="member.memberNum">
				<template slot="prepend">学号</template>
			</el-input>
			<el-input placeholder="请输入内容" v-model="member.memberTel">
				<template slot="prepend">联系方式</template>
			</el-input>
			<el-input placeholder="请输入内容" v-model="member.memberAddress">
				<template slot="prepend">地址</template>
			</el-input>
			<el-radio-group v-model="member.memberRank">
				<el-radio-button :label="0">周卡</el-radio-button>
				<el-radio-button :label="1">月卡</el-radio-button>
				<el-radio-button :label="2">期卡</el-radio-button>
			</el-radio-group>
			<span slot="footer" class="dialog-footer">
				<el-button @click="dialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="addMember(member)">确 定</el-button>
			</span>
		</el-dialog>	
	</div>
</template>

<script>
	import { fetchMembers, createMember, searchMemberById, deleteMember } from '@/store/admin/member'
	// import { rank } from '@/utils/index'
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
					memberRank: 0
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
			}
		},
		computed: {
			rank () {
				return 'rank()'
			}
		}
	}
</script>
<style>
</style>
