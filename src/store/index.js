import Vue from 'vue';
import Vuex from 'vuex';
// 购物车 api
import {
  // 获取购物车列表
  fetchCartList,
  // 清空购物车
  emptyCart,
} from '@/store/cart';
import {
  // 创建订单/结算
  createOrder,
} from '@/store/admin/order';
import {
  rank,
  computedPriceByTimes,
} from '@/utils/index';
// 初始化登录信息
import {
  searchMemberById,
} from '@/store/admin/member';
// 更新书籍状态
import {
  updateBookState,
} from '@/store/books';

if (localStorage.getItem('userid')) {
  searchMemberById(localStorage.getItem('userid')).then(res => {
    state.member = Object.assign(res.data, {
      memberRank: rank(res.data.memberRank),
    });
  });
}

// 初始化购物车列表
if (localStorage.getItem('cartSession')) {
  fetchCartList(localStorage.getItem('cartSession')).then(res => {
    // 获取到保存在数据库中的购物车列表
    state.carts = res.data.map(item => {
      const newPrice = computedPriceByTimes(item.bookPrice, item.borrowTimes);
      return Object.assign(item, {
        newPrice,
      });
    });
  });
}
Vue.use(Vuex);
const state = {
  member: {},
  memberLogin: localStorage.getItem('userid'),
  carts: [],
};

const mutations = {
  // 登录
  LOGIN (state, payload) {
    state.member = payload;
    localStorage.setItem('userid', payload.memberId);
    state.memberLogin = payload.memberId;
  },
  // 登出
  LOGOUT (state) {
    localStorage.removeItem('userid');
    state.member = null;
    state.memberLogin = null;
  },
  // 初始化购物车
  INIT_CART (state, payload) {
    state.carts = payload;
  },
  // 添加到购物车
  ADD_TO_CART (state, payload) {
    state.carts.push(payload);
  },
  // 结算
  // CHECKOUT (state) {
  // 	state.carts = []
  // },
  // 结算成功
  CHECKOUT_SUCCESS (state) {
    state.carts = [];
  },
  // 结算失败
  CHECKOUT_FAIL (state, payload) {
    state.carts = payload;
  },
};

const getters = {
  // 循环计算购物车内商品总价
  count (state) {
    let sum = 0;
    const carts = state.carts;
    for (let i = 0, len = carts.length; i < len; i++) {
      // 获取购买数量
      let price = carts[i].newPrice;
      sum += parseFloat(price);
    }
    return sum;
  },
};

const actions = {
  // 购物车结算
  CREATE_ORDER ({ commit, state, }, message) {
    return new Promise((resolve, reject) => {
      console.log('???');
      // 生成订单保存到数据库中
      // 将商品id提取出来
      let bookIdList = state.carts.map(obj => {
        return obj.bookId;
      });
      const post = {
        memberId: localStorage.getItem('userid'),
        booklist: bookIdList.join('|'),
        message,
      };
      // 保存购物车，当结算失败时用来恢复购物车
      const _carts = [
        ...state.carts,
      ];
      // commit('CHECKOUT')
      // 写入数据库
      createOrder(post)
        .then(res => {
          // 生成订单成功，清空购物车
          return emptyCart(localStorage.getItem('cartSession'));
        })
        .then(res => {
          // 更新书籍状态为已出售
          const promiseList = [];
          bookIdList.forEach(bookId => {
            promiseList.push(updateBookState(bookId, 2));
          });
          return Promise.all(promiseList);
        })
        .then(res => {
          // 移除localStorage
          localStorage.removeItem('cartSession');
          // 跳转地址
          commit('CHECKOUT_SUCCESS');
          resolve();
        })
        .catch(() => {
          commit('CHECKOUT_FAIL', _carts);
          reject();
        });
    });
  },
};

export default new Vuex.Store({
  state,
  mutations,
  getters,
  actions,
});
