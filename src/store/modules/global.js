/**
 * @file book 对应的 module
 * @author ltaoo<litaowork@aliyun.com>
 */
import {
  INIT,
} from '@/common/constants';

// state
const state = {
  data: [],
};
// getters
const getters = {
  books: state => {
    return state.data;
  },
};
// actions
const actions = {
  [INIT] ({
    commit,
  }) {
    // 从 localStorage 读信息写入 state
    const userInfo = localStorage.getItem('user');
    console.log(userInfo);
  },
};
// mutations
const mutations = {
  setData (state, books) {
    state.data = books;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
