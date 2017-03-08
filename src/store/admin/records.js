import fetch from 'isomorphic-fetch'

import { prefix } from '@/config/index'
// import { url } from '@/utils/index'

// const api = `${prefix}/getRecords.service.php?`
/* --------------
 * 借阅记录接口
 --------------- */
// 借阅成功，将借阅记录写入数据库。
export function borrow (data) {
	let formData = new FormData()
	for (let key in data) {
		formData.append(key, data[key])
	}
	return new Promise((resolve, reject) => {
		fetch(`${prefix}/addRecords.service.php`, {
			method: 'POST',
			body: formData
		})
			.then(res => {
				return res.json()
			})
			.then(json => {
				resolve(json)
			})
			.catch(err => {
				reject(err)
			})
	})
}
// adminStore.getRecordList = () => {
// 	return new Promise((resolve, reject) => {
// 		Vue.http.get('./service/getRecords.service.php?action=recordsList')
// 			.then(res=>{
// 				resolve(res.data)
// 			})
// 			.catch(err =>{
// 				reject(err)
// 			})
// 	})
// }
// // 通过书籍isbn码查询已借书籍
// adminStore.searchRecordByIsbn = function (param) {
// 	return new Promise(function(resolve, reject){
// 		// 判断条件是否存在或者是否合法
// 		if(param) {
// 			Vue.http.get('./service/getRecords.service.php?action=serachByIsbn&bookIsbn=' + param).then(res => {
// 				// 在这里还做一个判断，是否查询有结果
// 				if(res.data.state == 200){
// 					resolve(res.data)
// 				} else {
// 					reject('result is empty')
// 				}
// 			}).catch(err => {
// 				reject(err)
// 			})
// 		} else {
// 			reject('param is empty')
// 		}
// 	})
// }
// // 通过书籍名称查询已借书籍
// adminStore.searchRecordByTitle = function (param) {
// 	return new Promise(function(resolve, reject){
// 		// 判断条件是否存在或者是否合法
// 		if(param) {
// 			Vue.http.get('./service/getRecords.service.php?action=searchByTitle&bookTitle=' + param).then(res => {
// 				if(res.data.state == 200){
// 					resolve(res.data)
// 				} else {
// 					reject('result is empty')
// 				}
// 			}).catch(err => {
// 				reject(err)
// 			})
// 		} else {
// 			reject('param is empty')
// 		}
// 	})
// }
// // 通过会员名查询已借书籍
// adminStore.searchRecordByName = function (param) {
// 	return new Promise(function(resolve, reject){
// 		// 判断条件是否存在或者是否合法
// 		if(param) {
// 			Vue.http.get('./service/getRecords.service.php?action=searchByName&memberName=' + param).then(res => {
// 				if(res.data.state == 200){
// 					resolve(res.data)
// 				} else {
// 					reject('result is empty')
// 				}
// 			}).catch(err => {
// 				reject(err)
// 			})
// 		} else {
// 			reject('param is empty')
// 		}
// 	})
// }
// // 通过会员学号查询已借书籍
// adminStore.searchRecordByNum = function (param) {
// 	return new Promise(function(resolve, reject){
// 		// 判断条件是否存在或者是否合法
// 		if(param) {
// 			Vue.http.get('./service/getRecords.service.php?action=searchByNumber&memberNum=' + param).then(res => {
// 				if(res.data.state == 200){
// 					resolve(res.data)
// 				} else {
// 					reject('result is empty')
// 				}
// 			}).catch(err => {
// 				reject(err)
// 			})
// 		} else {
// 			reject('param is empty')
// 		}
// 	})
// }
// // 通过会员id查询已借书籍
// adminStore.searchRecordByMemberId = function (param) {
// 	return new Promise(function(resolve, reject){
// 		// 判断条件是否存在或者是否合法
// 		if(param) {
// 			Vue.http.get('./service/getRecords.service.php?action=searchByMemberId&memberId=' + param).then(res => {
// 				if(res.data.state == 200){
// 					resolve(res.data)
// 				} else {
// 					reject('empty')
// 				}
// 			}).catch(err => {
// 				reject(err)
// 			})
// 		} else {
// 			reject('param is empty')
// 		}
// 	})
// }
// // 通过会员id查询已借书籍
// adminStore.searchAllRecordByMemberId = function (param) {
// 	return new Promise(function(resolve, reject){
// 		// 判断条件是否存在或者是否合法
// 		if(param) {
// 			Vue.http.get('./service/getRecords.service.php?action=searchRecordByMemberId&memberId=' + param).then(res => {
// 				console.log(res.data)
// 				if(res.data.state == 200){
// 					resolve(res.data)
// 				} else {
// 					reject('empty')
// 				}
// 			}).catch(err => {
// 				reject(err)
// 			})
// 		} else {
// 			reject('param is empty')
// 		}
// 	})
// }
