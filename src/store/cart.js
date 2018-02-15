/**
 * @file 购物车对应的 module
 * @author ltaoo<litaowork@aliyun.com>
 */
/* eslint-disable */
import {
  fetchBooks,
} from '@/api/cart';

// state
const state = {
  data: [],
};
// actions
const actions = {
  // 购物车结算
  CREATE_ORDER ({ commit, state, }, message) {
    return new Promise((resolve, reject) => {
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
// mutations
const mutations = {
  // 初始化购物车
  INIT_CART (state, payload) {
    state.carts = payload;
  },
  // 添加到购物车
  ADD_TO_CART (state, payload) {
    state.carts.push(payload);
  },
  // 结算成功
  CHECKOUT_SUCCESS (state) {
    state.carts = [];
  },
  // 结算失败
  CHECKOUT_FAIL (state, payload) {
    state.carts = payload;
  },
};

export default {
  state,
  actions,
  mutations,
};
