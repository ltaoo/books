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
			</el-col>
		</el-row>
		<el-table
			:data="records"
			stripe
			style="width: 100%"
		>
			<el-table-column
				prop="memberNum"
				label="会员学号"
			>
			</el-table-column>
			<el-table-column
				prop="memberName"
				label="会员名称"
			>
			</el-table-column>
			<el-table-column
				prop="memberRank"
				label="会员等级"
			>
			</el-table-column>
			<el-table-column
				prop="memberCreateTime"
				label="登记时间"
			>
			</el-table-column>
			<el-table-column
				prop="bookIsbn"
				label="书籍ISBN码"
			>
			</el-table-column>
			<el-table-column
				prop="bookTitle"
				label="书籍名称"
			>
			</el-table-column>
			<el-table-column
				prop="borrowTime"
				label="借阅时间"
			>
			</el-table-column>
			<el-table-column
				prop="returnTime"
				label="状态"
			>
			</el-table-column>
		</el-table>
	</div>
</template>

<script>
	import { fetchRecords } from '@/store/admin/records'
	export default {
		name: 'Records',
		data () {
			return {
				query: null,
				records: []
			}
		},
		created () {
			fetchRecords()
				.then(res => {
					this.records = res.data
				})
				.catch(err => {
					this.$message({
						message: err,
						type: 'warning'
					})
				})
		}
	}
</script>
