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
  helpDetailsDisable: false,
  helpDetailsError: null,
  requestLoad: false,
  requestError: null,
  helpCategory: null,
  helpRequestSuccess: null,
  helpDetailsSuccess: false,
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
  getHelp({ commit }, data) {
    commit('SET_HELP_CATEGORY_LOADING', true);
    api().get(`/help/helprequest/?limit=10&status_id=1&owner_user_id__ne=${data}&ordering=-created`).then((success) => {
      commit('SET_HELPLIST', success.data.results);
      commit('SET_HELP_ERROR', null);
      commit('SET_HELP_LOADING', false);
    }).catch((error) => {
      if (error.response.data.detail) commit('SET_HELP_ERROR', error.response.data.detail);
      else commit('SET_HELP_ERROR', error.response.statusText);
      commit('SET_HELP_LOADING', false);
    });
  },
  getHelpCategory({ commit }) {
    commit('SET_HELP_LOADING', true);
    api().get('/help/helpcategory/').then((success) => {
      commit('SET_HELP_CATEGORY_LIST', success.data.results);
      commit('SET_HELP_ERROR', null);
      commit('SET_HELP_CATEGORY_LOADING', false);
    }).catch((error) => {
      if (error.response.data.detail) commit('SET_HELP_ERROR', error.response.data.detail);
      else commit('SET_HELP_ERROR', error.response.statusText);
      commit('SET_HELP_LOADING', false);
    });
  },
  requestHelpSave({ commit }, data) {
    commit('SET_REQUEST_LOAD', true);
    return api().post('/help/helprequest/', data).then(() => {
      commit('SET_REQUEST_ERROR', null);
      commit('SET_REQUEST_LOAD', false);
      commit('SET_REQUEST_SUCCESS', true);
    }).catch((error) => {
      console.log(error.response.data);
      commit('SET_REQUEST_ERROR', error.response.data.error);
      commit('SET_REQUEST_LOAD', false);
      commit('SET_REQUEST_SUCCESS', false);
    });
  },
  requestHelpNew({ commit }) {
    commit('SET_REQUEST_SUCCESS', false);
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
    commit('SET_HELP_DETAILS_DISABLE', true);
    return api().post(`help/helprequest/${data}/applytohelp/`, data).then(() => {
      commit('SET_HELP_DETAILS_LOADING', false);
      commit('SET_HELP_DETAILS_SUCCESS', true);
      commit('SET_HELP_DETAILS_ERROR', false);
    }).catch((error) => {
      commit('SET_HELP_DETAILS_LOADING', false);
      commit('SET_HELP_DETAILS_SUCCESS', false);
      commit('SET_HELP_DETAILS_ERROR', error.response.data.detail);
    });
  },
};

const mutations = {
  SET_HELP(state, value) {
    state.help = value;
  },
  SET_TOKEN(state, value) {
    state.token = value;
  },
  SET_REQUEST_LOAD(state, value) {
    state.requestLoad = value;
  },
  SET_REQUEST_ERROR(state, value) {
    state.requestError = value;
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
  SET_HELP_DETAILS_SUCCESS(state, value) {
    state.helpDetailsSuccess = value;
  },
  SET_HELP_DETAILS_LOADING(state, value) {
    state.helpDetailsSuccess = value;
  },
  SET_HELP_DETAILS_ERROR(state, value) {
    state.helpDetailsError = value;
  },
  SET_HELP_DETAILS_DISABLE(state, value) {
    state.helpDetailsDisable = value;
  },
  SET_HELP_CATEGORY_LIST(state, value) {
    state.helpCategory = value;
  },
  SET_REQUEST_SUCCESS(state, value) {
    state.helpRequestSuccess = value;
  },
};


export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
