<template>
	<div class = "container">
		<el-input
			placeholder="请输入会员姓名或学号查询"
			icon="search"
			v-model = "query"
			:on-icon-click="search.bind(this, query)"
		>
		</el-input>
		<el-row :gutter = "10">
			<el-col :span = "8" v-for = "record in records" :key = "record.recordId">
				<Record
					:record = "record"
					:choose = "returnBook"
				/>
			</el-col>
		</el-row>
	</div>
</template>

<script>
	import Record from '@/components/Record.vue'
	// 数据处理
	import {
		returnBook,
		searchRecordByIsbn,
		searchRecordByTitle,
		searchRecordByName,
		searchRecordByNum
	} from '@/store/admin/records'
	export default {
		name: 'Return',
		components: {
			Record
		},
		data () {
			return {
				records: [],
				query: ''
			}
		},
		methods: {
			search (param) {
				// 判断是否存在
				if (!param || !param.trim()) {
					this.$message({
						message: '请输入查询条件'
					})
				} else {
					searchRecordByIsbn(param)
						.then(res => {
							// 这里是处理查询到的情况，就直接赋值
							if (res.data.length === 0) {
								// 这里是处理没有查询到的情况         这里就直接传给Name查询了？
								return searchRecordByTitle(param)
							} else {
								console.log('根据isbn')
								this.reocrds = res.data
							}
						})
						.then(res => {
							// 这里处理的应该是根据标题查询的结果
							if (res.data.length === 0) {
								return searchRecordByName(param)
							} else {
								console.log(res.data)
								console.log('根据title')
								this.records = res.data
							}
						})
						.then(res => {
							if (res.data.length === 0) {
								return searchRecordByNum(param)
							} else {
								console.log('根据name')
								this.records = res.data
							}
						})
						.then(res => {
							if (res.data.length === 0) {
								this.$message({
									message: '没有查询到记录'
								})
							} else {
								console.log('根据num')
								this.records = res.data
							}
						})
						.catch(err => {
							this.$message({
								message: err
							})
						})
				}
			},
			returnBook (record) {
				// 这里处理数据，更新records。
				const recordId = record.recordId
				// console.log(recordId)
				returnBook(recordId)
					.then(res => {
						this.$message({
							message: '归还成功'
						})
						this.query = null
						this.reocrds = []
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
