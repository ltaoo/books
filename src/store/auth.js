/**
 * @file 身份相关的 module
 * @author ltaoo<litaowork@aliyun.com>
 */

import {
  fetchBooks,
} from '@/api/auth';

// state
const state = {
  data: [],
};
// actions
const actions = {
  fetchBooks ({
    commit,
  }) {
    fetchBooks(books => {
      commit('fetchBooks', books);
    });
  },
};
// mutations
const mutations = {
  setData (state, books) {
    state.data = books;
  },
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
};

export default {
  state,
  actions,
  mutations,
};
