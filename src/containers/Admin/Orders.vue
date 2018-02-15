<template>
  <div class="container">
    <el-row :gutter="20">
      <el-col :span="18">
        <el-input placeholder="请输入会员姓名或学号查询" icon="search" v-model="query">
        </el-input>
      </el-col>
    </el-row>
    <el-table :data="orders" stripe style="width: 100%">
      <el-table-column prop="orderId" label="订单编号">
      </el-table-column>
      <el-table-column label="商品信息">
        <template scope="scope">
          <div v-for="book in scope.row.booklist" :key="book.bookId">
            <router-link :to="{ path: '/goods/' + book.bookId}">{{book.bookTitle}}
            </router-link>
            <p>书籍编号：
              <span>{{book.bookId}}</span>
            </p>
            <p>书籍价格：
              <span>{{book.bookPrice}}</span>
            </p>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="memberName" label="收货人">
        <template scope="scope">
          <p>{{scope.row.member.memberName}}</p>
          <p>{{scope.row.member.memberTel}}</p>
          <p>{{scope.row.member.memberAddress}}</p>
        </template>
      </el-table-column>
      <el-table-column prop="orderState" label="订单状态">
      </el-table-column>
      <el-table-column label="操作">
        <template scope="scope">
          <el-button @click="confirmOrder(scope.row)" type="success">确认订单</el-button>
          <el-button @click="cancelOrder(scope.row)" type="danger">取消订单</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import {
  fetchOrders,
  confirmOrder,
  cancelOrder,
} from '@/api/admin/order';
import {
  searchMemberById,
} from '@/api/admin/member';
import {
  searchBookById,
  updateBookState,
} from '@/api/books';

export default {
  name: 'Orders',
  data () {
    return {
      orders: [],
      query: '',
    };
  },
  created () {
    // 获取所有订单记录
    fetchOrders()
      .then(res => {
        // 在这个地方处理商品列表
        res.data.forEach(obj => {
          // 处理每条记录
          // 获取到商品id集合
          let booklist = obj.booklist;
          // 分割成数组
          const bookIdList = booklist.split('|');
          const resultlist = bookIdList.map(id => {
            return searchBookById(id);
            // .then(respon => {
            // 	// 使用过滤器来处理价格显示
            // 	resultlist.push(respon.data)
            // })
            // .catch(err => {
            // 	this.$message({
            // 		message: err
            // 	})
            // })
          });
          // Promise.all(resultlist)
          // 	.then(datas => {
          // 		// 根据 id 查询书籍成功
          // 		console.log(datas)
          // 		// resultlist为书籍对象组成的数组
          // 		obj.booklist = datas.map(data => {
          // 			return data.data
          // 		})
          // 	})
          // 	.catch(err => {
          // 		this.$message({
          // 			message: err
          // 		})
          // 	})
          // 获取购买者的详细信息
          const memberId = obj.memberId;
          // searchMemberById(memberId)
          // 	.then(res => {
          // 		obj.memberName = res.data.memberName
          // 		obj.memberAddress = res.data.memberAddress
          // 		obj.memberTel = res.data.memberTel
          // 	})
          // 	.carch(err => {
          // 		this.$message({
          // 			message: err
          // 		})
          // 	})
          Promise.all([
            Promise.all(resultlist),
            searchMemberById(memberId),
          ])
            .then(res => {
              console.log(res);
              obj.booklist = res[0].map(res => {
                return res.data;
              });
              const member = res[1].data;
              // obj.memberName = member.memberName
              // obj.memberTel = member.memberTel
              // obj.memberAddress = member.memberAddress
              obj.member = member;
              this.orders.push(obj);
            })
            .catch(err => {
              this.$message({
                message: err,
              });
            });
        });
        // 循环结束
        // this.orders = res.data
      })
      .catch(err => {
        this.$message({
          message: err,
        });
      });
  },
  methods: {
    confirmOrder (obj) {
      // 更新订单状态为已确认
      confirmOrder(obj.orderId)
        .then(res => {
          // 更新书籍状态为已售出
          obj.booklist.forEach(obj => {
            console.log(obj.bookId);
            updateBookState(obj.bookId, 1)
              .then(res => {
                console.log('更新状态成功');
              })
              .catch(err => {
                this.$message({
                  message: err,
                });
              });
          });
          this.$message({
            message: '订单确认成功',
          });
          obj.orderState = 1;
        })
        .catch(err => {
          this.$message({
            message: err,
          });
        });
    },
    cancelOrder (obj) {
      cancelOrder(obj.orderId)
        .then(res => {
          this.$message({
            message: '订单取消成功',
          });
          obj.orderState = 2;
        })
        .catch(err => {
          this.$message({
            message: err,
          });
        });
    },
  },
};
</script>
