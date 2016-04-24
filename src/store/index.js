import Vue from 'vue';
import { Promise } from 'es6-promise';
import {EventEmitter} from 'events';

const bookStore = new EventEmitter();

export default bookStore;

//根据id获取书籍
bookStore.fetchItem = function(id){
	return new Promise(function(resolve, reject){
		//这个地方需要根据id去查询不同的记录
		if(id){
			Vue.http.get('./service/getBooks.service.php?action=searchById&bookId=' + id).then(function(res){
				resolve(res.data);
			}).catch(function(err){
				console.log(err);
			})
		}else{
			reject('get fail');
		}
	})
}
//获取全部书籍记录
bookStore.fetchItems = function(){
	return new Promise(function(resolve, reject){
		Vue.http.get('./service/getBooks.service.php?action=getBookList').then(function(res){
			resolve(res.data)
		}).catch(function(err){
			reject(err)
		})
	})
}
//查询书籍是否被借阅
bookStore.isBorrow = function(id){
	return new Promise(function(resolve, reject){
		//这个地方需要根据id去查询不同的记录
		if(id){
			Vue.http.get('./service/getRecords.service.php?action=searchByBookId&bookId=' + id).then(function(res){
				resolve(res.data);
			}).catch(function(err){
				console.log(err);
			})
		}else{
			reject('get fail');
		}
	})
}
//获取购物车列表
bookStore.cartlist = session => {
	return new Promise((resolve, reject) => {
		Vue.http.get('./service/cart.php?action=list&cartSession=' + session).then(res=>{
			if(res.data.msg == 'empty') {
				reject('empty')
			}else{
				resolve(res.data);
			}
		}).catch(err=>{
			reject(err);
		})
	})
}
//加入购物车
bookStore.addCart = obj => {
	return new Promise((resolve, reject) => {
		Vue.http.options.emulateJSON = true;
		Vue.http.post('./service/cart.php?action=addCart', obj).then(res => {
			if(res.data.state == 'success') {
				//如果添加成功
				resolve(res.data);
			}else{
				reject(res.data);
			}
		}).catch(err => {
			reject(err);
		})
	})
}
//从购物车中移除
bookStore.delete = obj =>{
	return new Promise((resolve, reject) => {
		Vue.http.get('./service/cart.php?action=delete&bookId=' + obj.bookId).then(res=>{
			resolve(res.data);
		}).catch(err=>{
			reject(err);
		})
	})
}