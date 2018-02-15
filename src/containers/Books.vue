<template>
  <div class="container">
    <el-row :gutter="20">
      <el-col :span="18">
        <el-input placeholder="请输入书籍名或ISBN码查询" icon="search" v-model="query">
        </el-input>
        <el-row :gutter="20">
          <el-col :span="12" v-for="book in books" :key="book.bookId">
            <Goods :item="book" :choose="addCart" />
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="6">
        <el-input placeholder="请输入书籍名或ISBN码查询" icon="search" v-model="query">
        </el-input>
        <el-row>
          <el-col :span="24" v-for="item in carts" :key="item.bookId">
            <Cart :item="item" :remove="removeFromCart" />
          </el-col>
        </el-row>
        <el-button style="width: 100%;" type="success" @click="order">￥{{sumPrice}} - 结算</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {
  fetchBooks,
} from '@/store/books';
import {
  removeFromCart,
  addToCart,
} from '@/store/cart';
import {
  computedPriceByTimes,
} from '@/utils/index';
import router from '@/router/index';
import Goods from '@/components/Goods.vue';
import Cart from '@/components/Cart.vue';

export default {
  name: 'IndexBooks',
  components: {
    Goods,
    Cart,
  },
  data () {
    return {
      // 书籍列表
      books: [],
      // 用户是否登录
      userLogin: true,
      // 筛选图书条件
      query: '',
    };
  },
  created () {
    fetchBooks()
      .then(res => {
        this.books = res;
      })
      .catch(err => {
        this.$message({
          message: err,
        });
      });
    // console.log(localStorage.userid);
    if (localStorage.getItem('userId')) {
      // 如果用户id存在，就是已登录
      this.userLogin = true;
    } else {
      this.userLogin = false;
    }
  },
  computed: {
    // 购物车列表，从 vuex 中获取
    carts () {
      return this.$store.state.carts;
    },
    sumPrice () {
      return this.$store.getters.count;
    },
  },
  methods: {
    addCart (obj) {
      const carts = this.carts;
      // 要添加的这个商品是否已经存在购物车中了
      const isChong = carts.some(book => {
        return book.bookId === obj.bookId;
      });

      if (isChong === false) {
        obj.newPrice = computedPriceByTimes(obj.bookPrice, obj.borrowTimes);
        // 将商品加入购物车
        this.$store.commit('ADD_TO_CART', obj);
        // // 同时还要写入数据库中
        // // 先获取到userid作为查询依据
        obj.cartsession = localStorage.getItem('userId') || 123;
        localStorage.setItem('cartSession', obj.cartsession);
        // 加入购物车成功不做任何处理
        addToCart(obj).catch(err => {
          this.$message({
            message: err,
          });
          // 如果写入数据库失败，还要从购物车移除，因为是已经加入到购物车中了
          carts.splice(carts.indexOf(obj), 1);
        });
      } else {
        this.$message({
          message: '该商品已经在购物车',
        });
      }
    },
    removeFromCart (obj) {
      const carts = this.carts;
      obj.cartSession = localStorage.getItem('cartSession');
      removeFromCart(obj)
        .then(res => {
          carts.splice(carts.indexOf(obj), 1);
        })
        .catch(err => {
          this.$message({
            message: err,
          });
        });
    },
    order () {
      // 首先判断用户是否登录
      if (!localStorage.getItem('userId')) {
        // this.$message({
        // 	message: '跳转到登录页'
        // })
        router.push('/userLogin');
      } else {
        router.push('/order');
      }
    },
  },
};
</script>
