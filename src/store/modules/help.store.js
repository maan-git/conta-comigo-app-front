/* eslint-disable no-shadow */
import api from '../api';
// eslint-disable-next-line import/no-cycle
import router from '../../router/index';

const state = {
  help: null,
  helpList: null,
  helpLoading: false,
  helpListError: null,

  helpCategoryError: null,

  helpDetails: null,
  helpDetailsLoading: false,

  requestLoad: false,
  requestError: null,
  helpCategory: null,
  helpRequestSuccess: null,

  helpDetailsError: null,
  helpDetailsDisable: false,
  helpDetailsSuccess: false,
};

const getters = {
  getHelp(state) { return state.help; },
  getHelpList(state) { return state.helpList; },
  getHelpCategoryError(state) { return state.helpCategoryError; },
  getHelpListError(state) { return state.helpListError; },
  getHelpListLoading(state) { return state.helpListLoading; },
  getHelpDetails(state) { return state.helpDetails; },
};

const actions = {
  getHelp({ commit }, data) {
    let url = '';
    if (data.userIdNe) {
      url = `/help/helprequest/?limit=${data.limit}&status_id=${data.statusId}&owner_user_id__ne=${data.userIdNe}&city=${data.cityId}&ordering=-created`;
    } else {
      url = `/help/helprequest/?limit=${data.limit}&status_id=${data.statusId}&owner_user_id=${data.userId}&ordering=-created`;
    }
    commit('SET_HELP_LOADING', true);
    api().get(url).then((success) => {
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
      commit('SET_REQUEST_ERROR', error.response.data);
      commit('SET_REQUEST_LOAD', false);
      commit('SET_REQUEST_SUCCESS', false);
    });
  },
  requestHelpNew({ commit }) {
    commit('SET_REQUEST_SUCCESS', false);
  },
  requestHelpDetails({ commit }, data) {
    commit('SET_HELP_DETAILS_LOADING', true);
    return api().get(`/help/helprequest/${data}/`, data).then((success) => {
      commit('SET_HELP_DETAILS', success.data);
      commit('SET_HELP_DETAILS_LOADING', false);
    });
  },
  cancelHelp({ commit }, id) {
    commit('SET_HELP_DETAILS_LOADING', true);
    return api().post(`/help/helprequest/${id}/cancelrequest/`, { reasonId: 100001 }).then((success) => {
      commit('SET_HELP_DETAILS_LOADING', false);
      commit('SET_HELP_DETAILS', success.data);
      router.push('/');
    }).catch((error) => {
      commit('SET_HELP_DETAILS_LOADING', false);
      commit('SET_HELP_DETAILS_ERROR', error.response.data.detail);
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
  clearHelpState({ commit }) {
    commit('SET_CLEAR_STATE');
  },
};

const mutations = {
  SET_HELP(state, value) {
    state.help = value;
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
    state.helpLoading = value;
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
  SET_CLEAR_STATE(state) {
    state.help = null;
    state.helpList = null;
    state.helpCategoryError = null;
    state.helpDetails = null;
    state.helpDetailsLoading = false;
    state.helpDetailsDisable = false;
    state.helpDetailsError = null;
    state.requestLoad = false;
    state.requestError = null;
    state.helpCategory = null;
    state.helpRequestSuccess = null;
    state.helpDetailsSuccess = false;
  },
};


export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
