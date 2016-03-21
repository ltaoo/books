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
