/* eslint-disable no-shadow */
import api from '../api';

const state = {
  help: null,
  token: '',
  helpList: null,
  helpCategoryError: null,
  helpCategoryLoading: false,
  helpDetails: null,
  helpDetailsLoading: false,
  helpDetailsError: null,
};

const getters = {
  getHelp(state) { return state.help; },
  getToken(state) { return state.token; },
  getHelpList(state) { return state.helpList; },
  getHelpCategoryError(state) { return state.helpCategoryError; },
  getHelpCategoryLoading(state) { return state.helpCategoryLoading; },
  getHelpListError(state) { return state.helpListError; },
  getHelpListLoading(state) { return state.helpListLoading; },
  getHelpDetails(state) { return state.helpDetails; },
};

const actions = {
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
  },
  requestHelpSave({ commit }, data) {
    commit('SET_LOADING', true);
    return api().post('/help/helprequest/', data).then((success) => {
      console.log(success);
      console.log(data);
    }).catch((error) => {
      commit('SET_LOGIN_ERROR', error.response.data.error);
      commit('SET_LOADING', false);
    });
  },
  requestHelpDetails({ commit }, data) {
    return api().get(`/help/helprequest/${data}/`, data).then((success) => {
      commit('SET_HELP_DETAILS', success.data);
    }).catch((error) => {
      console.log(error);
    });
  },
  deleteDetails({ commit }) {
    commit('SET_HELP_DETAILS', null);
  },
  applyToHelpRequest({ commit }, data) {
    commit('SET_HELP_DETAILS_LOADING', true);
    return api().post(`help/helprequest/${data}/applytohelp/`, data).then((success) => {
      console.log(success);
      commit('SET_HELP_DETAILS_LOADING', false);
      commit('SET_HELP_DETAILS_ERROR', null);
      console.log('Sucesso!');
    }).catch((error) => {
      commit('SET_HELP_DETAILS_LOADING', false);
      commit('SET_HELP_DETAILS_ERROR', error.response.data.detail);
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
  SET_HELP_CATEGORY_LOADING(state, value) {
    state.helpCategoryLoading = value;
  },
  SET_HELP_DETAILS(state, value) {
    state.helpDetails = value;
  },
  SET_HELP_DETAILS_LOADING(state, value) {
    state.helpDetailsLoading = value;
  },
  SET_HELP_DETAILS_ERROR(state, value) {
    state.helpDetailsError = value;
  },
};


export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
