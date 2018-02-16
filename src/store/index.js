import Vue from 'vue';
import Vuex from 'vuex';

import global from '@/store/modules/global';
import books from '@/store/modules/books';
import auth from '@/store/modules/auth';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
  modules: {
    global,
    auth,
    books,
  },
  strict: debug,
});
