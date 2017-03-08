<template>
	<el-row :gutter="20">
		<el-col :span="8" v-for="member in members" :key="member.memberId">
			<Member 
				:member = "member"
				:choose = "choose"
			/>
		</el-col>
	</el-row>
</template>

<script>
	import Member from '@/components/Member.vue'
	export default {
		name: 'MemberList',
		props: ['members', 'choose'],
		components: {
			Member
		}
	}
</script>

<style scoped>
	.el-card {
		margin-bottom: 20px;
	}
</style>
