<template>
  <div class="container">
    <el-row :gutter="20">
      <el-col :span="18">
        <el-input placeholder="请输入会员姓名或学号查询" icon="search" v-model="query">
        </el-input>
      </el-col>
    </el-row>
    <el-table :data="orders" stripe style="margin-top: 20px; width: 100%">
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
/**
 * @file 订单记录页
 * @author ltaoo<litaowork@aliyun.com>
 */
import {
  mapGetters,
} from 'vuex';
import {
  FETCH_ORDERS,
} from '@/common/constants';
import {
  // confirmOrder,
  cancelOrder,
} from '@/api/admin/order';

export default {
  name: 'Orders',
  data () {
    return {
      query: '',
    };
  },
  computed: mapGetters([
    'orders',
  ]),
  mounted () {
    this.$store.dispatch(FETCH_ORDERS);
  },
  methods: {
    confirmOrder (obj) {
      // 更新订单状态为已确认
      // confirmOrder(obj.orderId)
      //   .then(res => {
      //     // 更新书籍状态为已售出
      //     obj.booklist.forEach(obj => {
      //       console.log(obj.bookId);
      //       updateBookState(obj.bookId, 1)
      //         .then(res => {
      //           console.log('更新状态成功');
      //         })
      //         .catch(err => {
      //           this.$message({
      //             message: err,
      //           });
      //         });
      //     });
      //     this.$message({
      //       message: '订单确认成功',
      //     });
      //     obj.orderState = 1;
      //   })
      //   .catch(err => {
      //     this.$message({
      //       message: err,
      //     });
      //   });
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
