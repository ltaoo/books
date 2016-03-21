<template>
	<div v-show="show" class="alert alert-success top" role="alert" style="width:400px;">
		<button v-show="dismissable" type="button" class="close"
		  	@click="show = false">
		  	<span>&times;</span>
		</button>
		<slot>default information</slot>
	</div>
</template>

<script>
	export default {
		name: 'alert',
		props:{
			show: {
				type:Boolean,
				require: true,
				twoWay: true
			},
			dismissable: {
				type: Boolean
			}
		}
	}
</script>

<style>
.fade-transition {
  transition: opacity .3s ease;
}
.fade-enter,
.fade-leave {
  height: 0;
  opacity: 0;
}
.alert.top {
  position: fixed;
  top: 30px;
  margin: 0 auto;
  left: 0;
  right: 0;
  z-index: 2;
}
.alert.top-right {
  position: fixed;
  top: 30px;
  right: 50px;
  z-index: 2;
}
</style>