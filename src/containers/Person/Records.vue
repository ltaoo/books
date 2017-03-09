<template>
	<div>
		<el-input
			placeholder="请输入书籍名称筛选"
			icon="search"
			v-model = "query"
		>
		</el-input>
		<el-table
			:data="recordlist"
			stripe
			style="width: 100%"
		>
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
				label="归还时间"
			>
			</el-table-column>
		</el-table>
	</div>
</template>

<script>
	import { searchRecordByMemberId } from '@/store/admin/records'
	export default {
		name: 'PersonRecords',
		data () {
			return {
				recordlist: [],
				hasRecord: false,
				query: ''
			}
		},
		created () {
			searchRecordByMemberId(localStorage.getItem('userId'))
				.then(res => {
					this.hasRecord = true
					this.recordlist = res.data
				})
				.catch(err => {
					console.log(err)
				})
		}
	}
</script>
