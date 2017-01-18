import Vue from 'vue'
import { Promise } from 'es6-promise'
import { EventEmitter } from 'events'
//注册监听
const adminStore = new EventEmitter()

const api = '/service/getMembers.service.php?'
function query(action, query, param) {
	return `${api}action=${action}&${query}=${param}`
}

//根据用户Id获取信息
adminStore.getMemberById = param =>{
	return new Promise(function(resolve, reject){
		if(param){
			Vue.http.get('/service/getMembers.service.php?action=searchById&memberId=' + param).then(res => {
				resolve(res.data)
			}).catch(err => {
				reject(err)
			})
		}else{
			reject('param is empty')
		}
	})
}
//根据会员学号查询会员
adminStore.searchMemberByNum = param => {
	return new Promise(function(resolve, reject){
		// 判断查询条件是否为空
		if(param) {
			Vue.http.get(query('searchByNum', 'memberNum', param))
				.then(res => {
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

//通过书籍id查询借阅记录
adminStore.searchrecordByBookId = function (param) {
	return new Promise(function(resolve, reject){
		//判断条件是否存在或者是否合法
		if(param) {
			Vue.http.get('./service/getRecords.service.php?action=searchByBookId&bookId=' + param).then(res => {
				//在这里还做一个判断，是否查询有结果
				if(res.data.state == 200){
					resolve(res.data)
				}else{
					reject('result is empty')
				}
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
				//在这里还做一个判断，是否查询有结果
				if(res.data.state == 200){
					resolve(res.data)
				}else{
					reject('result is empty')
				}
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
				if(res.data.state == 200){
					resolve(res.data)
				}else{
					reject('result is empty')
				}
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
				if(res.data.state == 200){
					resolve(res.data)
				}else{
					reject('result is empty')
				}
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
				if(res.data.state == 200){
					resolve(res.data)
				}else{
					reject('result is empty')
				}
			}).catch(err => {
				reject(err)
			})
		}else{
			reject('param is empty')
		}
	})
}
//通过会员id查询已借书籍
adminStore.searchRecordByMemberId = function (param) {
	return new Promise(function(resolve, reject){
		//判断条件是否存在或者是否合法
		if(param) {
			Vue.http.get('./service/getRecords.service.php?action=searchByMemberId&memberId=' + param).then(res => {
				if(res.data.state == 200){
					resolve(res.data)
				}else{
					reject('empty')
				}
			}).catch(err => {
				reject(err)
			})
		}else{
			reject('param is empty')
		}
	})
}
//通过会员id查询已借书籍
adminStore.searchAllRecordByMemberId = function (param) {
	return new Promise(function(resolve, reject){
		//判断条件是否存在或者是否合法
		if(param) {
			Vue.http.get('./service/getRecords.service.php?action=searchRecordByMemberId&memberId=' + param).then(res => {
				console.log(res.data);
				if(res.data.state == 200){
					resolve(res.data)
				}else{
					reject('empty')
				}
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
		Vue.http.get('./service/getMembers.service.php?action=getMemberList').then(res => {
			resolve(res)
		}).catch(err => {
			reject(err)
		})
	})
}
//通过豆瓣API查询书籍
//定义一个全局函数
adminStore.searchByDouban = function(param) {
	return new Promise(function(resolve, reject) {
		if(param) {
			//还是需要通过服务器代理转发
			Vue.http.jsonp('https://api.douban.com/v2/book/search?q='+param+'&count=10&callback=resolveDb');
			window.resolveDb = function(data){
				resolve(data)
			};
		}else{
			reject('param is empty')
		}
	})
}
//添加新书籍到数据库中
adminStore.addBook = postData => {
	//console.log(postData)
	return new Promise(function(resolve, reject){
		if(postData){
			Vue.http.options.emulateJSON = true;
			console.log('post data', postData)
			Vue.http.post('/service/addBook.service.php', postData).then(res => {
				resolve(res)
			}).catch(err => {
				reject(err)
			})
		}else{
			reject('postData is empty');
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

//还书，更新records的returnTime字段
adminStore.updateMember = param => {
	return new Promise(function(resolve, reject){
		//判断条件是否存在或者是否合法
		if(param) {
			Vue.http.options.emulateJSON = true;
			Vue.http.post('./service/getMembers.service.php?action=update', param).then(res => {
				resolve(res.data)
			}).catch(err => {
				reject(err)
			})
		}else{
			reject('param is empty')
		}
	})
}
//添加新会员
adminStore.addMember = postData => {
	//console.log(postData)
	return new Promise(function(resolve, reject){
		if(postData){
			Vue.http.options.emulateJSON = true;
			Vue.http.post('./service/addMember.service.php', postData).then(res => {
				resolve(res)
			}).catch(err => {
				reject(err)
			})
		}else{
			reject('postData is empty');
		}
	})
}
adminStore.deleteBook = bookId => {
	return new Promise((resolve, reject) => {
		if(bookId){
			Vue.http.get('./service/getBooks.service.php?action=delete&bookId=' + bookId).then(res=>{
				resolve(res.data);
			}).catch(err=>{
				reject(err);
			})
		}
	})
}
adminStore.deleteMember = memberId => {
	return new Promise((resolve, reject) => {
		if(memberId){
			Vue.http.get('./service/getMembers.service.php?action=delete&memberId=' + memberId).then(res=>{
				resolve(res.data);
			}).catch(err=>{
				reject(err);
			})
		}
	})
}

adminStore.getRecordList = () => {
	return new Promise((resolve, reject) => {
		Vue.http.get('./service/getRecords.service.php?action=recordsList').then(res=>{
			resolve(res.data);
		}).catch(err =>{
			reject(err);
		})
	})
}
//获取所有订单
adminStore.fetchOrderList = () =>{
	return new Promise((resolve, reject) => {
		Vue.http.get('./service/order.php?action=fetchList').then(res=>{
			resolve(res.data);
		}).catch(err=>{
			reject(err);
		})
	})
}
//确认订单
adminStore.confirmOrder = orderId => {
	return new Promise((resolve, reject)=>{
		if(orderId) {
			Vue.http.get('./service/order.php?action=confirmOrder&orderId=' + orderId).then(res=>{
				resolve(res.data);
			}).catch(err=>{
				reject(err);
			})
		}
	})
}
//取消订单
adminStore.cancelOrder = orderId => {
	return new Promise((resolve, reject)=>{
		if(orderId) {
			Vue.http.get('./service/order.php?action=cancelOrder&orderId=' + orderId).then(res=>{
				resolve(res.data);
			}).catch(err=>{
				reject(err);
			})
		}
	})
}
export default adminStore
