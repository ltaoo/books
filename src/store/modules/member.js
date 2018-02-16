/**
 * @file member 对应的 module
 * @author ltaoo<litaowork@aliyun.com>
 */
import {
  FETCH_MEMBER,
  ADD_MEMBER,
} from '@/common/constants';
import {
  fetchMembers,
  createBook,
} from '@/api/admin/member';

// state
const state = {
  data: [],
};
// getters
const getters = {
  members: state => {
    return state.data;
  },
};
// actions
const actions = {
  /**
   * 搜索会员
   */
  [FETCH_MEMBER] ({
    commit,
  }, params) {
    // 先以 ISBN 码作为条件查询
    let pathParams = null;
    if (params) {
      pathParams = {
        isbn: params,
      };
    }
    fetchMembers(pathParams)
      .then(res => {
        commit('setData', res.data);
      });
  },
  [ADD_MEMBER] ({
    commit,
  }, {
    params,
    cb,
  }) {
    createBook(params)
      .then((res) => {
        if (cb) {
          cb();
        }
        commit('add_book', res);
      }, (err) => {
        alert(err);
      });
  },
};
// mutations
const mutations = {
  setData (state, books) {
    state.data = books;
  },
  add_book (state, book) {
    // 直接 push，而不是给一个新数组，这里和 react 不太一样，因为
    // vue 对数组做了监听，所以可以直接改变原数组，react 是单纯的 diff
    state.data.push(book);
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};

