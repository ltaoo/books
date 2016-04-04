<template>
	<div class="container">
		<h3>还书/续借</h3>
		<hr>
		<div class="form-inline">
			<!--无论输入什么，在前端利用回调多次去查询api，优先查询书籍ISBN码-->
			<input type="text" class="form-control" placeholder="请输入查询条件" v-model="query">
			<button class="btn btn-default" v-on:click="search(query)">查询</button>
		</div>
		<div class="row">
			<book :record-list="recordList"></book>
		</div>
	</div>
	<modal :show.sync="showModal">
		<div slot="body">
			确定归还这本书吗？
		</div>
		<div slot="footer">
			<button class="form-control" @click="returnBook()">确定</button>
		</div>
	</modal>
	<alert :show.sync="showNoInput" dismissable placement="top" type="danger" width="400px" :duration="3000">
		<span class="icon-info-circled alert-icon-float-left"></span>
		<strong>请输入查询条件</strong>
	</alert>
	<alert :show.sync="showNoResult" dismissable placement="top" type="danger" width="400px" :duration="3000">
		<span class="icon-info-circled alert-icon-float-left"></span>
		<strong>该书没有被借</strong>
	</alert>
</template>

<script>
	import book from './return/bookList.vue'
	import modal from '../public/modal.vue'
	import {alert} from 'vue-strap'
	//数据处理
	import Admin from '../../store/admin.js'
	export default {
		name: 'returnbooks',
		components: {
			book,
			modal,
			alert
		},
		data(){
			return {
				showModal: false,
				recordList: [],
				chooseRecord: {},
				query: ''
			}
		},
		methods: {
			search: function(param) {
				//判断是否存在
				if(param) {
					//提交给根据isbn码查询接口
					return Admin.searchRecordByIsbn(param).then(res => {
						
						if(res.state == 200){
							//如果按照isbn码查询到了，就可以直接赋值
							this.recordList = res.data
						}else{
							Admin.searchRecordByTitle(param).then(resTitle => {
								if(resTitle.state == 200){
									this.recordList = resTitle.data
								}else{
									Admin.searchRecordByNum(param).then(resNum => {
										if(resNum.state == 200){
											this.recordList = resNum.data
										}else{
											console.log('根据学号没有查询到，根据姓名来查询')
											Admin.searchRecordByName(param).then(resName => {
												console.log(resName)
												if(resName.state == 200){
													this.recordList = resName.data
												}else{
													console.log('没有查询到')
													//这里没有查询到是只没有在借阅记录中查询到，需要告知管理员是该书没有被借还是没有该书或者会员？
													
												}
											}) 
										}
									})
								}
							})
						}
					})
				}else{
          //没有输入查询条件
          console.log('请输入查询条件')
        }
			},
			returnBook: function(){
				//这里处理数据，更新records。
				//console.log(this.chooseRecord.recordId)
				//recordId = this.chooseRecord.recordId
				const recordId = this.chooseRecord.recordId
				console.log(recordId)
				return Admin.returnBook(recordId).then(res => {
					console.log(res)
					if(res.state == 200){
						console.log('更新成功')
            //更新成功后页面初始化
					}else{
						console.log('更新失败')
					}
				})
			}
		},
		events: {
			return: function(obj){
				//console.log('触发了派发事件')
				this.showModal = true
				this.chooseRecord = obj
			}
		}
	}
</script>