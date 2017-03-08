<template>
	<div class="container">
		<el-menu 
			theme="dark" 
			class="el-menu-demo" 
			mode="horizontal" 
		>
			<el-menu-item index="1">
				<router-link :to="{ path: '/admin/borrow' }">租书</router-link>
			</el-menu-item>
			<el-menu-item index="2">
				<router-link :to="{ path: '/admin/return' }">还书</router-link>
			</el-menu-item>
			<el-menu-item index="3">
				<router-link :to="{ path: '/admin/books' }">书籍列表</router-link>
			</el-menu-item>
			<el-menu-item index="4">
				<router-link :to="{ path: '/admin/members' }">用户列表</router-link>
			</el-menu-item>
			<el-menu-item index="5">
				<router-link :to="{ path: '/admin/records' }">借阅记录</router-link>
			</el-menu-item>
			<el-menu-item index="6">
				<router-link :to="{ path: '/admin/orders' }">订单列表</router-link>
			</el-menu-item>
			<el-menu-item index="7">
				<a @click="adminlogout()">注销</a>
			</el-menu-item>
		</el-menu>
		<router-view></router-view>
	</div>
  	<!-- <modal v-bind:show.sync="showModal">
			<div slot="modal-header" class="modal-header">
		    <h4 class="modal-title">确定借阅信息</h4>
		  </div>
	    <div slot="modal-body" class="borrowInfo">
	    	<p>姓名：{{choosemember.memberName}}</p>
	    	<p>学号：{{choosemember.memberNum}}</p>
	    	<p>开始日期：{{choosemember.memberCreateTime}}</p>
	    	<p>会员等级：{{choosemember.memberRank | rank}}</p>
	    	<p>图书名称：{{choosebook.bookTitle}}</p>
	    	<p>图书ISBN码：{{choosebook.bookIsbn}}</p>
	    </div>
	    <div slot="modal-footer">
	    	<div class="footerBtn">
	    		<button class="btn btn-default" @click="borrow(choosemember, choosebook)">确认</button>
	    	</div>
	    </div>
	</modal> -->
	<!-- <alert :show.sync="showSuccess" dismissable placement="top" type="success" width="400px" :duration="3000">
			<span class="icon-info-circled alert-icon-float-left"></span>
		  	<strong>借阅成功</strong>
	</alert>
	<alert :show.sync="showDangerNoMember" dismissable placement="top" type="danger" width="400px" :duration="3000">
		<span class="icon-info-circled alert-icon-float-left"></span>
		<strong>请先选择会员</strong>
	</alert>
	<alert :show.sync="showDangerNoInput" dismissable placement="top" type="danger" width="400px" :duration="3000">
		<span class="icon-info-circled alert-icon-float-left"></span>
		<strong>请输入查询条件</strong>
	</alert>
	<alert :show.sync="showInfo" dismissable placement="top" type="info" width="400px" :duration="3000">
		<span class="icon-info-circled alert-icon-float-left"></span>
	  	<strong>没有查询到</strong>
	</alert>
 --></template>

