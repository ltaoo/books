<template>
  <div class="row">
    <h4>订单列表</h4>
    <hr>
    <table class="table table-hover">
      <tr>
        <th></th>
        <th>订单编号</th>
        <th>商品信息</th>
        <th>订单状态</th>
        <th>操作</th>
      </tr>
      <tr v-for = "order in orderlist">
        <td>{{$index + 1}}</td>
        <td>{{order.orderId}}</td>
        <td>
          <div v-for="book in order.booklist">
            <p>书籍名称：<a v-link = "{ path: '/goods/' + book.bookId}">{{book.bookTitle}}</a></p>
            <p>书籍价格：<span>{{book.bookPrice |sumPriceByBorrowTimes book.borrowTimes}}</span></p>
          </div>
        </td>
        <td>{{order.orderState | orderState}}</td>
        <td v-if="order.orderState==0"><a @click="cancelOrder(order)">取消订单</a></td>
      </tr>
    </table>
  </div>
</template>

<script>
  import store from '../../store/index.js';
  import common from '../../store/common.js';
  export default {
    data () {
      return {
        orderlist: []
      }
    },
    route: {
      data (to) {
        //根据用户id查询订单
        console.log(localStorage.userid);
        store.fetchOrderList(localStorage.userid).then(res=>{
          console.log(res.data);
          //在这个地方处理商品列表
          res.data.forEach(obj=>{
            var booklist = obj.booklist;
            booklist = booklist.split('|');
            //获取到商品id数组，从接口查询商品详情
            var resultlist = [];
            booklist.forEach(id=>{
              store.fetchItem(id).then(res=>{
                //使用过滤器来处理价格显示
                resultlist.push(res.data);
              })
            })
            //resultlist为书籍对象组成的数组
            obj.booklist = resultlist;
          })
          this.orderlist = res.data;
        }).catch(err=>{
          console.log(res);
        })
      }
    },
    computed: {
      fetchBookList: ()=>{
        //根据booklist获取商品列表
      }
    },
    methods: {
      cancelOrder: (obj)=>{
        //更新订单状态
        common.cancelOrder(obj.orderId).then(res=>{
          //更新订单状态成功后，更新书籍状态为正常
          obj.booklist.forEach(book=>{
            common.updateBookState(book.bookId, 0).then(res=>{
              alert('取消成功');
              obj.orderState = 2;
            })
          })
        })
      }
    }
  }
</script>