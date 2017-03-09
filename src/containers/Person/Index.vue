<template>
	<div class="container">
		<el-row :gutter = "20">
			<el-col :span = "6">
				<el-menu
					default-active="2" 
					class="el-menu-vertical-demo" 
				>
					<el-menu-item index="1">导航一</el-menu-item>
					<el-menu-item index="2">导航二</el-menu-item>
					<el-menu-item index="3">导航三</el-menu-item>
				</el-menu>
			</el-col>
			<el-col :span = "18">
				<router-view></router-view>
			</el-col>
		</el-row>
	</div>
</template>

<script>
	export default {
		name: 'PersonRoot'
	}
</script>
