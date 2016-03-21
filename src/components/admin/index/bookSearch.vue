<template>
	<div class="form-inline">
		<input type="text" class="form-control" placeholder="请输入书籍名或ISBN码" v-model="query">
		<input type="button" class="form-control" value="查询" v-on:click="searchBooks(query)">
		{{query}}
	</div>
</template>

<script>
	import Admin from '../../../store/admin.js'
	export default {
		name: 'searchBooks',
		data () {
			return {
				query: ''
			}
		},
		methods: {
			searchBooks: function(param) {
				return Admin.getBooks(param).then( res => {
					//打印出获取的数据
					console.log(res.data)
					//获取到数据后传递给父组件
					this.$dispatch('getBooks', res.data)
				})
			}
		}
	}
</script>