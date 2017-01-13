<template>
  <div class="container">
    <h3>订单列表</h3>
    <hr>
    <table class="table table-hover">
      <tr>
        <th></th>
        <th>订单编号</th>
        <th>商品信息</th>
        <th>收货人</th>
        <th>订单状态</th>
        <th>操作</th>
      </tr>
      <tr v-for = "order in orderlist">
        <td>{{$index + 1}}</td>
        <td>{{order.orderId}}</td>
        <td>
          <div v-for="book in order.booklist">
            <p><a v-link = "{ path: '/goods/' + book.bookId}">{{book.bookTitle}}</a></p>
            <p>书籍编号：<span>{{book.bookId}}</span></p>
            <p>书籍价格：<span>{{book.bookPrice |sumPriceByBorrowTimes book.borrowTimes}}</span></p>
          </div>
        </td>
        <td>
          <div>
            <p>{{order.memberId.memberName}}</p>
            <p>联系方式：{{order.memberId.memberTel}}</p>
            <p>收货地址：<span>{{order.memberId.memberAddress}}</span></p>
          </div>
        </td>
        <td>{{order.orderState | orderState}}</td>
        <td v-if="order.orderState == 0">
          <a @click="confirmOrder(order)">确认订单</a>|
          <a @click="cancelOrder(order)">取消订单</a>
        </td>
        <td v-else>
          <a>查看订单</a>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
  import store from '../../store/admin.js';
  import indexStore from '../../store/index.js';
  import common from '../../store/common.js';
  export default {
    data () {
      return {
        orderlist: []
      }
    },
    route: {
      data (to) {
        //获取所有订单记录
        store.fetchOrderList().then(res=>{
          //在这个地方处理商品列表
          res.data.forEach(obj=>{
            //处理每条记录
            //获取到商品id集合
            var booklist = obj.booklist;
            //分割成数组
            booklist = booklist.split('|');
            var resultlist = [];
            booklist.forEach(id=>{
              indexStore.fetchItem(id).then(respon=>{
                //使用过滤器来处理价格显示
                resultlist.push(respon.data);
              })
            })
            //resultlist为书籍对象组成的数组
            obj.booklist = resultlist;
            //获取购买者的详细信息
            var memberId = obj.memberId;
            store.getMemberById(memberId).then(member=>{
              obj.memberId = member.data;
              //console.log(member.data);
            })
          })
          //循环结束
          this.orderlist = res.data;
        }).catch(err=>{
          console.log(res);
        })
      }
    },
    methods: {
      confirmOrder: (obj)=>{
        //更新订单状态为已确认
        store.confirmOrder(obj.orderId).then(res=>{
          //更新书籍状态为已售出
          obj.booklist.forEach(obj=>{
            console.log(obj.bookId);
            common.updateBookState(obj.bookId, 1).then(res=>{
              console.log('更新状态成功');
            }).catch(err=>{
              console.log('更新书籍状态失败');
            });
          });
          alert('订单确认成功');
          obj.orderState = 1;
        }).catch(err=>{
          console.log(err);
          alert('确认失败');
        })

      },
      cancelOrder: obj=>{
        store.cancelOrder(obj.orderId).then(res=>{
          alert('取消订单成功');
          obj.orderState = 2;
        }).catch(err=>{
          console.log(err);
          alert('取消失败');
        })
      }
    }
  }
</script>

<style>
  a{
    cursor: pointer;
  }
</style>