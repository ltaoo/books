<template>
  <div class="container">
    <div class="row">
      <h3>订单结算</h3>
      <hr>
      <div>
        <div class="consignee">
          <h4>{{member.memberName}}</h4>
          <p>联系方式：<span>{{member.memberTel}}</span></p>
          <p>收货地址：<span>{{member.memberAddress}}</span></p>
        </div>
        <a v-link="{ path: '/index' }">返回修改购物车</a>
        <table class="table table-hover">
          <tr>
            <th>序号</th>
            <th>书名</th>
            <th>价格</th>
          </tr>
          <tr v-for="book in cartList">
            <td>{{$index + 1}}</td>
            <td>{{book.bookTitle}}</td>
            <td>{{book.newPrice}}</td>
          </tr>
        </table>
        <textarea class="form-control" rows="3" placeholder="请留言" v-model="message"></textarea>
        <hr>
        <h4>商品数量：<span>{{sumNum}}</span></h4>
        <h4>总价格：<span>{{countPrice}}</span></h4>
      </div>
    </div>
    <button class="btn btn-default form-control" @click="createOrder()">提交订单</button>
  </div>
</template>

<script>
  import store from '../../store/index.js';
  import adminstore from '../../store/admin.js';
  import common from '../../store/common.js';
  //
  import Router from 'vue-router';
  export default {
    data () {
      return {
        cartList: [],
        member: null,
        showInfo: false
      }
    },
    route: {
      data (to) {
        //先判断购物车中是否有商品，如果没有就返回首页
        console.log('cartSession：' + localStorage.cartSession);
        if(!localStorage.cartSession){
          var router = new Router();
          router.replace({path: '/index'});
        }
        //通过userid查找购物车记录
        //购物车列表
        store.cartlist(localStorage.cartSession).then(res=>{
          console.log(res);
          if(res.state == 'err') {
            //查询失败
            this.cartList = [];
          }else{
            this.cartList = res.data;
          }
        }).catch(err=>{
          console.log(err);
        });
        //根据用户id查询用户信息
        adminstore.getMemberById(localStorage.userid).then(res=>{
          console.log(res);
          this.member = res.data;
        }).catch(err => {
          console.log(err);
        })
      }
    },
    computed: {
      countPrice: function(){
        //循环计算购物车内商品总价
        let sum = 0;
        for (let i = 0, len = this.cartList.length ; i < len; i++) {
          //获取购买数量
          let price = this.cartList[i].newPrice;
          sum += parseFloat(price);
        }
        //console.log(sum);
        return sum;
      },
      sumNum () {
        return this.cartList.length;
      }
    },
    methods: {
      createOrder: function(){
        //生成订单保存到数据库中
        //将商品id提取出来
        var bookList = [];
        this.cartList.forEach(function(obj){
          bookList.push(obj.bookId);
        });
        var post = {
          memberId: localStorage.userid,
          booklist: bookList.join("|"),
          message: this.message || ''
        }
        //保存
        store.createOrder(post).then(res=>{
          console.log(res);
          console.log('cartSession：' + localStorage.cartSession);
          //生成订单成功，清空购物车
          store.emptyCart(localStorage.cartSession).then(res=>{
            console.log(res);
            //更新书籍状态为已出售
            bookList.forEach(bookId=>{
              common.updateBookState(bookId, 2).then(res=>{
                //console.log()
                //跳转地址
                //移除localStorage
                localStorage.removeItem('cartSession');
                var router = new Router();
                router.replace({path: '/success'});
              })
            })
          }).catch(err=>{
            console.log(err);
          });
        }).catch(err =>{
          console.log(err);
        })
      }
    }
  }
</script>

<style>
  .consignee{
    border: 1px solid #eee;
    border-radius: 5px;
    padding: 10px;
  }
</style>