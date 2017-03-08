import fetch from 'isomorphic-fetch'

import { prefix } from '@/config/index'
import { url } from '@/utils/index'

const api = `${prefix}/getRecords.service.php?`
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
// 还书，更新records的returnTime字段
export function returnBook (param) {
	return new Promise((resolve, reject) => {
		// 判断条件是否存在或者是否合法
		fetch(url(api, 'update', 'recordId', param))
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

// 获取所有借阅记录
export function fetchRecords () {
	return new Promise((resolve, reject) => {
		fetch(url(api, 'recordsList'))
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
// 通过书籍isbn码查询已借书籍
export function searchRecordByIsbn (param) {
	return new Promise((resolve, reject) => {
		// 判断条件是否存在或者是否合法
		fetch(url(api, 'serachByIsbn', 'bookIsbn', param))
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
// 通过书籍名称查询已借书籍
export function searchRecordByTitle (param) {
	return new Promise((resolve, reject) => {
		// 判断条件是否存在或者是否合法
		fetch(url(api, 'searchByTitle', 'bookTitle', param))
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
// 通过会员名查询已借书籍
export function searchRecordByName (param) {
	return new Promise((resolve, reject) => {
		// 判断条件是否存在或者是否合法
		fetch(url(api, 'searchByName', 'memberName', param))
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
// 通过会员学号查询已借书籍
export function searchRecordByNum (param) {
	return new Promise((resolve, reject) => {
		// 判断条件是否存在或者是否合法
		fetch(url(api, 'searchByNumber', 'memberNum', param))
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

