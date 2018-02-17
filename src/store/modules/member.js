/**
 * @file member 对应的 module
 * @author ltaoo<litaowork@aliyun.com>
 */
import {
  FETCH_MEMBER,
  SEARCH_MEMBER,
  ADD_MEMBER,
} from '@/common/constants';
import {
  fetchMembers,
  createMember,
} from '@/api/admin/member';

// state
const state = {
  data: [],
  res: [],
};
// getters
const getters = {
  members: state => {
    return state.data;
  },
  res: state => state.res,
};
// actions
const actions = {
  /**
   * 搜索会员
   */
  [FETCH_MEMBER] ({
    commit,
  }, {
    params,
    cb,
  }) {
    console.log(params);
    fetchMembers(params)
      .then(res => {
        if (cb) {
          cb(res);
        }
        commit('setData', res.data);
      });
  },
  /**
   * 搜索会员
   */
  [SEARCH_MEMBER] ({
    commit,
  }, {
    params,
    cb,
  }) {
    fetchMembers(params)
      .then(res => {
        if (cb) {
          cb(res.data);
        }
        commit('set_result', res.data);
      });
  },
  [ADD_MEMBER] ({
    commit,
  }, {
    params,
    cb,
  }) {
    createMember(params)
      .then((res) => {
        commit('add_member', res.data);
        if (cb) {
          cb();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
// mutations
const mutations = {
  setData (state, books) {
    state.data = books;
  },
  set_result (state, payload) {
    state.res = payload;
  },
  add_member (state, payload) {
    // 直接 push，而不是给一个新数组，这里和 react 不太一样，因为
    // vue 对数组做了监听，所以可以直接改变原数组，react 是单纯的 diff
    state.data.push(payload);
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};

