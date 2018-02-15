<template>
  <div class="container">
    <div>
      <el-card>
        <h4>收货人：{{member.memberName}}</h4>
        <p>联系方式：
          <span>{{member.memberTel}}</span>
        </p>
        <p>收货地址：
          <span>{{member.memberAddress}}</span>
        </p>
      </el-card>
      <router-link to="{ path: '/index' }">返回修改购物车</router-link>
      <el-table :data="cartList" stripe style="width: 100%">
        <el-table-column prop="bookTitle" label="商品名">
        </el-table-column>
        <el-table-column prop="newPrice" label="价格">
        </el-table-column>
      </el-table>
      <el-input style="margin-top: 20px;" type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="留言" v-model="message">
      </el-input>
      <h4>商品数量：
        <span>{{sumNum}}</span>
      </h4>
      <h4>总价格：
        <span>{{countPrice}}</span>
      </h4>
    </div>
    <el-button @click="createOrder()">提交订单</el-button>
  </div>
</template>

<script>
import router from '@/router/index';
export default {
  name: 'Order',
  data () {
    return {
      message: '',
    };
  },
  created () {
    // 先判断购物车中是否有商品，如果没有就返回首页
    if (!localStorage.getItem('cartSession')) {
      router.replace({
        path: '/books',
      });
    }
  },
  computed: {
    member () {
      return this.$store.state.member;
    },
    cartList () {
      return this.$store.state.carts;
    },
    countPrice () {
      return this.$store.getters.count;
    },
    sumNum () {
      return this.cartList.length;
    },
  },
  methods: {
    createOrder () {
      this.$store
        .dispatch('CREATE_ORDER', this.message)
        .then(() => {
          router.replace({
            path: '/success',
          });
        })
        .catch(() => {
          this.$message({
            message: '结算失败',
          });
        });
    },
  },
};
</script>
