import Vue from 'vue'
import { Promise } from 'es6-promise'
import { EventEmitter } from 'events'
//注册监听
const commonStore = new EventEmitter()

export default commonStore;

//更新订单状态
//取消订单
commonStore.cancelOrder = orderId => {
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
//更新书籍状态
commonStore.updateBookState = (param, state) =>{
  return new Promise(function(resolve, reject){
    if(param){
      Vue.http.get('./service/getBooks.service.php?action=updateState&bookId=' + param +'&state=' + state).then(res => {
        resolve(res.data)
      }).catch(err => {
        reject(err)
      })
    }else{
      reject('param is empty')
    }
  })
}
//根据用户Id获取信息
commonStore.getMemberById = param =>{
  return new Promise(function(resolve, reject){
    if(param){
      Vue.http.get('./service/getMembers.service.php?action=searchById&memberId=' + param).then(res => {
        resolve(res.data)
      }).catch(err => {
        reject(err)
      })
    }else{
      reject('param is empty')
    }
  })
}