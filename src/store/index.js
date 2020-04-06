import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

import user from './modules/user.store';
import help from './modules/help.store';
import register from './modules/register.store';


Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    user,
    help,
    register,
  },
  plugins: [
    createPersistedState({
      paths: ['register'],
    }),
  ],
});
