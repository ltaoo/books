import Vue from 'vue'
import { Promise } from 'es6-promise'
import { EventEmitter } from 'events'
//注册监听
const adminStore = new EventEmitter()

export default adminStore

adminStore.getMembers = function(param){
	return new Promise(function(resolve, reject){
		//先判断查询条件是否存在
		if(param) {
			Vue.http.get('./src/data/member.json').then(res => {
				resolve(res)
			}).catch(err => {
				reject(err)
			})
		}else{
			reject('param is empty')
		}
	})
}
//根据用户Id获取信息
adminStore.getMemberById = function(param){
	return new Promise(function(resolve, reject){
		//先判断查询条件是否存在
		if(param) {
			Vue.http.get('./src/data/'　+ param + 'm.json').then(res => {
				resolve(res)
			}).catch(err => {
				reject(err)
			})
		}else{
			reject('param is empty')
		}
	})
}
adminStore.getBooks = function(param){
	return new Promise(function(resolve, reject){
		//先判断查询条件是否存在
		if(param) {
			Vue.http.get('./src/data/booksList.json').then(res => {
				resolve(res)
			}).catch(err => {
				reject(err)
			})
		}else{
			reject('param is empty')
		}
	})
}
//通过书籍isbn码查询已借书籍
adminStore.searchReturnByIsbn = function (param) {
	return new Promise(function(resolve, reject){
		//判断条件是否存在或者是否合法
		if(param) {
			Vue.http.get('./src/data/booksList.json').then(res => {
				resolve(res)
			}).catch(err => {
				reject(err)
			})
		}else{
			reject('param is empty')
		}
	})
}
//通过书籍名称查询已借书籍
adminStore.searchReturnByTitle = function (param) {
	return new Promise(function(resolve, reject){
		//判断条件是否存在或者是否合法
		if(param) {
			Vue.http.get('./src/data/booksList.json').then(res => {
				resolve(res)
			}).catch(err => {
				reject(err)
			})
		}else{
			reject('param is empty')
		}
	})
}
//通过会员名查询已借书籍
adminStore.searchReturnByName = function (param) {
	return new Promise(function(resolve, reject){
		//判断条件是否存在或者是否合法
		if(param) {
			Vue.http.get('./src/data/booksList.json').then(res => {
				resolve(res)
			}).catch(err => {
				reject(err)
			})
		}else{
			reject('param is empty')
		}
	})
}
//通过会员学号查询已借书籍
adminStore.searchReturnByNumber = function (param) {
	return new Promise(function(resolve, reject){
		//判断条件是否存在或者是否合法
		if(param) {
			Vue.http.get('./src/data/booksList.json').then(res => {
				resolve(res)
			}).catch(err => {
				reject(err)
			})
		}else{
			reject('param is empty')
		}
	})
}

//查询书籍列表
adminStore.searchReturnByNumber = function (param) {
	return new Promise(function(resolve, reject){
		//判断条件是否存在或者是否合法
		if(param) {
			Vue.http.get('./src/data/booksList.json').then(res => {
				resolve(res)
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
		Vue.http.get('./src/data/member.json').then(res => {
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