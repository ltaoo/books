import Vue from 'vue';
import Vuex from 'vuex';

import books from '@/store/modules/books';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
  modules: {
    books,
  },
  strict: debug,
});
