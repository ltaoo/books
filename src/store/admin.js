import Vue from 'vue'
import { Promise } from 'es6-promise'
import { EventEmitter } from 'events'
//注册监听
const adminStore = new EventEmitter()

export default adminStore

//根据用户Id获取信息
adminStore.getMemberById = param =>{
	return new Promise(function(resolve, reject){
		//先判断查询条件是否存在
		/*
		if(param) {
			Vue.http.get('./src/data/'　+ param + 'm.json').then(res => {
				resolve(res)
			}).catch(err => {
				reject(err)
			})
		}else{
			reject('param is empty')
		}
		*/
		if(param){
			Vue.http.get('../src/service/getMembers.service.php?action=searchById&memberId=' + param).then(res => {
				resolve(res)
			}).catch(err => {
				reject(err)
			})
		}else{
			reject('param is empty')
		}
	})
}
//根据会员学号查询
adminStore.searchMemberByNum = param =>{
	return new Promise(function(resolve, reject){
		if(param) {
			Vue.http.get('./service/getMembers.service.php?action=searchByNum&memberNum=' + param).then(res => {
				//console.log(res)
				resolve(res.data)
			}).catch(err => {
				reject(err)
			})
		}else{
			reject('param is empty')
		}
	})
}
//根据会员姓名查询
adminStore.searchMemberByName = param =>{
	return new Promise(function(resolve, reject){
		if(param) {
			Vue.http.get('./service/getMembers.service.php?action=searchByName&memberName=' + param).then(res => {
				//console.log(res)
				resolve(res.data)
			}).catch(err => {
				reject(err)
			})
		}else{
			reject('param is empty')
		}
	})
}
//通过书籍ISBN码查询书籍
adminStore.searchBookByIsbn = function(param){
	return new Promise(function(resolve, reject){
		//先判断查询条件是否存在
		if(param) {
			Vue.http.get('./service/getBooks.service.php?action=searchByIsbn&bookIsbn=' + param).then(res => {
				resolve(res.data)
			}).catch(err => {
				reject(err)
			})
		}else{
			reject('param is empty')
		}
	})
}
//通过书籍名查询书籍
adminStore.searchBookByName = function(param){
	return new Promise(function(resolve, reject){
		//先判断查询条件是否存在
		if(param) {
			Vue.http.get('./service/getBooks.service.php?action=searchByName&bookName=' + param).then(res => {
				resolve(res.data)
			}).catch(err => {
				reject(err)
			})
		}else{
			reject('param is empty')
		}
	})
}

//通过书籍isbn码查询已借书籍
adminStore.searchRecordByIsbn = function (param) {
	return new Promise(function(resolve, reject){
		//判断条件是否存在或者是否合法
		if(param) {
			Vue.http.get('./service/getRecords.service.php?action=serachByIsbn&bookIsbn=' + param).then(res => {
				resolve(res.data)
			}).catch(err => {
				reject(err)
			})
		}else{
			reject('param is empty')
		}
	})
}
//通过书籍名称查询已借书籍
adminStore.searchRecordByTitle = function (param) {
	return new Promise(function(resolve, reject){
		//判断条件是否存在或者是否合法
		if(param) {
			Vue.http.get('./service/getRecords.service.php?action=searchByTitle&bookTitle=' + param).then(res => {
				resolve(res.data)
			}).catch(err => {
				reject(err)
			})
		}else{
			reject('param is empty')
		}
	})
}
//通过会员名查询已借书籍
adminStore.searchRecordByName = function (param) {
	return new Promise(function(resolve, reject){
		//判断条件是否存在或者是否合法
		if(param) {
			Vue.http.get('./service/getRecords.service.php?action=searchByName&memberName=' + param).then(res => {
				resolve(res.data)
			}).catch(err => {
				reject(err)
			})
		}else{
			reject('param is empty')
		}
	})
}
//通过会员学号查询已借书籍
adminStore.searchRecordByNum = function (param) {
	return new Promise(function(resolve, reject){
		//判断条件是否存在或者是否合法
		if(param) {
			Vue.http.get('./service/getRecords.service.php?action=searchByNumber&memberNum=' + param).then(res => {
				resolve(res.data)
			}).catch(err => {
				reject(err)
			})
		}else{
			reject('param is empty')
		}
	})
}

//获取书籍全部记录
adminStore.getBookList = function () {
	return new Promise(function(resolve, reject){
		Vue.http.get('./src/data/booksList.json').then(res => {
			resolve(res)
		}).catch(err => {
			reject(err)
		})
	})
}
//获取会员全部记录
adminStore.getMemberList = function () {
	return new Promise(function(resolve, reject){
		Vue.http.get('../src/service/getMembers.service.php?action=memberList').then(res => {
			resolve(res)
		}).catch(err => {
			reject(err)
		})
	})
}
//通过豆瓣API查询书籍
adminStore.searchByDouban = function(param) {
	return new Promise(function(resolve, reject) {
		if(param) {
			//还是需要通过服务器代理转发
			Vue.http.jsonp('https://api.douban.com/v2/book/search?q=angular').then(res => {
				resolve(res)
			}).catch(err => {
				reject(err)
			})
		}else{
			reject('param is empty')
		}
	})
}
//借阅成功，将借阅记录写入数据库。
adminStore.addBorrowRecord = postData => {
	//console.log(postData)
	return new Promise(function(resolve, reject){
		if(postData){
			Vue.http.options.emulateJSON = true;
			Vue.http.post('./service/addRecords.service.php', postData).then(res => {
				resolve(res)
			}).catch(err => {
				reject(err)
			})
		}else{
			reject('postData is empty')
		}
	})
}

//还书，更新records的returnTime字段
adminStore.returnBook = param => {
	return new Promise(function(resolve, reject){
		//判断条件是否存在或者是否合法
		if(param) {
			Vue.http.get('./service/getRecords.service.php?action=update&recordId=' + param).then(res => {
				resolve(res.data)
			}).catch(err => {
				reject(err)
			})
		}else{
			reject('param is empty')
		}
	})
}