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
  data: [],
};
// getters
const getters = {
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
};

export default {
  state,
  getters,
  actions,
  mutations,
};
