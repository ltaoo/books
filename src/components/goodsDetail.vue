<template>
	<div class="container">
		<div class="row">
			<div class="col-xs-4">
				<h3>{{book.booksTitle}}</h3>
			</div>
		</div>
	</div>
</template>

<script>
	import store from '../store/index.js'

	export default {
		name: 'book',
		data() {
			return {
				book: {}
			}
		},
		route: {
			data({to}) {
				console.log(to.params.bookId)
				return store.fetchItem(to.params.bookId).then(res => {
					console.log(res.data)
					this.book = res.data
				}) 
			}
		}
	}
</script>