/**
 * @file 一些全局用 state
 * @author ltaoo<litaowork@aliyun.com>
 */
import {
  INIT,
  INIT_ADMIN,
} from '@/common/constants';

// state
const state = {
  data: null,
};
// getters
const getters = {
  isLogin: state => !!state.data,
};
// actions
const actions = {
  [INIT] ({
    commit,
  }) {
    console.log('init store');
    // 从 localStorage 读信息写入 state
    const userInfo = JSON.parse(localStorage.getItem('user') || '{}');
    commit('INIT', userInfo);
  },
  [INIT_ADMIN] ({
    commit,
  }) {

  },
};
// mutations
const mutations = {
  setData (state, books) {
    state.data = books;
  },
  INIT (state, payload) {
    state.data = payload;
  },
  CLEAR (state) {
    state.data = null;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
