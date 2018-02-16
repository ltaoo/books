/**
 * @file book 对应的 module
 * @author ltaoo<litaowork@aliyun.com>
 */
import {
  FETCH_BOOKS,
  SEARCH_DOUBAN,
  ADD_BOOK,
} from '@/common/constants';
import {
  fetchBooks,
  searchByDouban,
  createBook,
} from '@/api/books';

// state
const state = {
  data: [],
  // 从豆瓣搜索到的结果
  douban: [],
};
// getters
const getters = {
  books: state => {
    return state.data;
  },
  douban: state => state.douban,
};
// actions
const actions = {
  /**
   * 搜索图书
   */
  [FETCH_BOOKS] ({
    commit,
  }, params) {
    // 先以 ISBN 码作为条件查询
    let pathParams = null;
    if (params) {
      pathParams = {
        isbn: params,
      };
    }
    fetchBooks(pathParams)
      .then((res) => {
        commit('setData', res.data);
      })
      .catch((err) => {
        console.log(err);
        if (params) {
          pathParams = {
            title: params,
          };
        }
        return fetchBooks(pathParams);
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  },
  /**
   * 豆瓣搜索
   */
  [SEARCH_DOUBAN] ({
    commit,
  }, params) {
    searchByDouban(params)
      .then(res => {
        if (res.books.length === 0) {
          alert('没有结果');
          return;
        }
        commit('setDouban', res.books);
      }, (err) => {
        alert(err);
      });
  },
  [ADD_BOOK] ({
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
  setDouban (state, books) {
    state.douban = books;
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
