/**
 * @file book 对应的 module
 * @author ltaoo<litaowork@aliyun.com>
 */

import {
  fetchBooks,
} from '@/api/books';

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
  FETCH_BOOKS ({
    commit,
  }) {
    fetchBooks()
      .then((res) => {
        commit('setData', res.data);
      });
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
