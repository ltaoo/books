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
  UPDATE_ORDER,
} from '@/common/constants';

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
    /**
     * 更新订单状态为已确认
     */
    confirmOrder (obj) {
      this.$store.dispatch(UPDATE_ORDER, {
        id: obj.orderId,
        params: {
          orderState: 1,
        },
      });
    },
    /**
     * 更新订单状态为取消
     */
    cancelOrder (obj) {
      this.$store.dispatch(UPDATE_ORDER, {
        id: obj.orderId,
        params: {
          orderState: 2,
        },
      });
    },
  },
};
</script>
