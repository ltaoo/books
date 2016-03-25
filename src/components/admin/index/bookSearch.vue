<template>
	<div class="form-inline">
		<input type="text" class="form-control" placeholder="请输入书籍名或ISBN码" v-model="query">
		<input type="button" class="form-control" value="查询" v-on:click="searchBook(query)">
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
			searchBook: function(param) {
				return Admin.searchBookByIsbn(param).then( res => {
					//打印出获取的数据
					//console.log(res.data)
					//如果没有获取到数据
					if(res.state == 404){
						//alert('没有查询到');
						//通过学号查询没有查询到，通过姓名查询试试看。
						Admin.searchBookByName(param).then(resp => {
							if(resp.state == 404) {
								alert('没有查询到')
							}else{
								console.log(resp)
								//获取到数据后传递给父组件
								this.$dispatch('searchBook', resp.data)
							}
						})
					}else{
						console.log(res)
						//获取到数据后传递给父组件
						this.$dispatch('searchBook', res.data)
					}
				})
			}
		}
	}
</script>