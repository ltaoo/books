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