<template>
	<div>
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
				<el-button type="primary">添加新会员</el-button>
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
		</el-table>
			<!-- <table class="table table-hover">
				<tr>
					<th>序号</th>
					<th>会员姓名</th>
					<th>会员学号</th>
					<th>联系方式</th>
					<th>地址</th>
					<th>已借数量</th>
					<th>累计借阅</th>
					<th>会员等级</th>
					<th>登记时间</th>
					<th>操作</th>
				</tr>
				<tr v-for="member in memberList | filterBy query">
					<td>{{$index + 1}}</td>
					<td>{{member.memberName}}</td>
					<td>{{member.memberNum}}</td>
					<td>{{member.memberTel}}</td>
					<td>{{member.memberAddress}}</td>
					<td>{{member.borrowNum}}</td>
					<td>{{member.borrowTimes}}</td>
					<td>{{member.memberRank | rank}}</td>
					<td>{{member.memberCreateTime}}</td>
					<td><a v-link = "{ path: '/member/' + member.memberId}">编辑</a>||<a @click="deleteMember(member.memberId, $index)">删除</a></td>
				</tr>
			</table> -->
		<!-- <modal :show.sync="showModal">
			<div slot="modal-header" class="modal-header">
		    <h4 class="modal-title">添加新书籍</h4>
		  </div>
			<div slot="modal-body">
				<div class="form-group">
					<input type="text" class="form-control" v-model="member.memberName" placeholder="用户名">
					<input type="text" class="form-control" v-model="member.memberNum" placeholder="学号">
					<input type="text" class="form-control" v-model="member.memberTel" placeholder="联系方式">
					<input type="text" class="form-control" v-model="member.memberAddress" placeholder="地址">
					<input type="radio" name="rank" value='0' v-model="member.memberRank">周卡
					<input type="radio" name="rank" value='1' v-model="member.memberRank">月卡
					<input type="radio" name="rank" value='2' v-model="member.memberRank">期卡
				</div>
			</div>
			<div slot="modal-footer">
				<div class="footerBtn">
					<input type="reset" class="btn btn-default" value="重置">
					<input type="submit" class="btn btn-default" value="确定" @click="addMember(member)">
				</div>
			</div>
		</modal> -->
	</div>
</template>

<script>
	// 数据
	import { fetchMembers } from '@/store/admin/member'
	export default {
		name: 'Members',
		data () {
			return {
				query: null,
				members: [],
				member: {}
			}
		},
		components: {
		},
		created () {
			fetchMembers()
				.then(res => {
					console.log(res.data)
					this.members = res
				})
				.catch(err => {
					console.log(err)
				})
		},
		methods: {
			addMember (member) {
				// Admin.addMember(member)
				// 	.then(res => {
				// 		console.log(res)
				// 		if (res.data.memberId) {
				// 			// 如果返回了bookId，就是添加成功
				// 			// 查询这本书
				// 			// Admin.getMemberById(res.data.memberId)
				// 			// 	.then(res => {
				// 			// 		// 查询成功后，将这本书插入到列表中。
				// 			// 		// this.bookList.$set(res);
				// 			// 		// 并关闭modal。
				// 			// 		console.log('search success')
				// 			// 		this.showModal = false
				// 			// 		this.memberList.push(res.data)
				// 			// 		this.member = null
				// 			// 	})
				// 		}
				// 	})
			},
			deleteMember (memberId, index) {
				// Admin.deleteMember(memberId)
				// 	.then(res=> {
				// 		// 这里判断是否成功，如果成功就页面上也同步删除该记录，或者刷新页面。
				// 		// console.log(data);
				// 		console.log(res)
				// 		if (res.state == 'success') {
				// 			// 如果删除成功
				// 			this.memberList.splice(index, 1)
				// 		} else {
				// 			alert('删除失败,请重试')
				// 		}
				// 	})
			}
		}
	}
</script>
<style>
</style>
