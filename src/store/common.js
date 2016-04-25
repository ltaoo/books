import Vue from 'vue'
import { Promise } from 'es6-promise'
import { EventEmitter } from 'events'
//注册监听
const adminStore = new EventEmitter()

export default adminStore;

//更新订单状态
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
//更新书籍状态
adminStore.updateBookState = (param, state) =>{
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