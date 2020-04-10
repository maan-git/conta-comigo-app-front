/* eslint-disable no-shadow */
import api from '../api';

const state = {
  help: null,
  token: '',
  helpList: null,
  helpCategoryError: null,
  helpCategoryLoading: false,
};

const getters = {
  getHelp(state) { return state.help; },
  getToken(state) { return state.token; },
  getHelpList(state) { return state.helpList; },
  getHelpCategoryError(state) { return state.helpCategoryError; },
  getHelpCategoryLoading(state) { return state.helpCategoryLoading; },
  getHelpListError(state) { return state.helpListError; },
  getHelpListLoading(state) { return state.helpListLoading; },
};

const actions = {
//  getHelpCategory({ commit }) {
//    commit('SET_HELP_CATEGORY_LOADING', true);
//    api().get('/help/helpcategory/').then((success) => {
//      commit('SET_HELPLIST', success.data.results);
//      commit('SET_HELP_CATEGORY_ERROR', null);
//      commit('SET_HELP_CATEGORY_LOADING', false);
//    }).catch((error) => {
//      if (error.response.data.detail) commit('SET_HELP_CATEGORY_ERROR',
//      error.response.data.detail);
//      else commit('SET_HELP_CATEGORY_ERROR', error.response.statusText);
//      commit('SET_HELP_CATEGORY_LOADING', false);
//    });
//    // return api().get('Helps?page=1').then((success) => {
//    //   commit('SET_LIST', success.data.data);
//    // });
//  },
  getHelp({ commit }) {
    commit('SET_HELP_CATEGORY_LOADING', true);
    api().get('/help/helprequest/?limit=10&ordering=-created').then((success) => {
      commit('SET_HELPLIST', success.data.results);
      commit('SET_HELP_ERROR', null);
      commit('SET_HELP_LOADING', false);
    }).catch((error) => {
      if (error.response.data.detail) commit('SET_HELP_ERROR', error.response.data.detail);
      else commit('SET_HELP_ERROR', error.response.statusText);
      commit('SET_HELP_LOADING', false);
    });
    // return api().get('Helps?page=1').then((success) => {
    //   commit('SET_LIST', success.data.data);
    // });
  },
  register({ commit }, data) {
    commit('SET_LOADING', true);
    return api().post('register', data).then((success) => {
      commit('SET_TOKEN', success);
      commit('SET_LOGIN_ERROR', null);
      commit('SET_LOADING', false);
    }).catch((error) => {
      commit('SET_LOGIN_ERROR', error.response.data.error);
      commit('SET_LOADING', false);
    });
  },
};

const mutations = {
  SET_HELP(state, value) {
    state.help = value;
    // console.log('mutations SET_Help', state.data);
  },
  SET_TOKEN(state, value) {
    state.token = value;
  },
  SET_HELPLIST(state, value) {
    state.helpList = value;
  },
  SET_HELP_ERROR(state, value) {
    state.helpListError = value;
  },
  SET_HELP_LOADING(state, value) {
    state.helpListLoading = value;
  },
};


export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
