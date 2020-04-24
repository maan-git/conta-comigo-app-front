/* eslint-disable no-shadow */
import routes from '../../router/index';
import api from '../api';


const state = {
  user: null,
  userLoading: false,
  userError: null,
  token: '',
  list: null,
  loginError: null,
  loginLoading: false,
  users: null,
  usersError: null,
  usersLoginLoading: false,
  volunteerDetails: null,
  volunteerDetailsError: null,
  volunteerDetailsLoading: false,
  userAddress: null,
  userAddressError: null,
  userAddressLoading: false,
  forgotUserPassLoading: false,
  forgotUserPassError: null,
  forgotUserPassSuccess: false,
};

const getters = {
  getUser(state) { return state.user; },
  getToken(state) { return state.token; },
  getList(state) { return state.list; },
  getLoginError(state) { return state.loginError; },
  getLoginLoading(state) { return state.loginLoading; },
  getUsers(state) { return state.users; },
  getUsersError(state) { return state.usersError; },
  getUsersLoginLoading(state) { return state.usersLoginLoading; },
  getVolunteerDetailsError(state) { return state.volunteerDetailsError; },
  getVolunteerDetailsLoading(state) { return state.volunteerDetailsLoading; },
  getUsersAddressError(state) { return state.userAddressError; },
  getUsersAddressLoading(state) { return state.userAddressLoading; },
};

const actions = {
  setUserInfo({ commit }, data) {
    const expDate = Date.now();
    // xpd stands for expiration Date
    Object.assign(data, { xpd: expDate });
    localStorage.setItem('userInfo', JSON.stringify(data));
    commit('SET_USER', data);
  },
  async login({ commit, dispatch }, data) {
    commit('SET_LOGIN_LOADING', true);
    await api().post('app/login/', data).then((success) => {
      // dispatch('setUserInfo', success.data);
      commit('SET_TOKEN', success);
      commit('SET_LOGIN_ERROR', null);
      commit('SET_LOGIN_LOADING', false);
      dispatch('getCurrentUser');
      routes.push({ path: '/' });
    }).catch((error) => {
      console.log('error', error.response);
      if (error.response.data.detail) commit('SET_LOGIN_ERROR', error.response.data.detail);
      else commit('SET_LOGIN_ERROR', error.response.statusText);
      commit('SET_LOGIN_LOADING', false);
    });
  },

  async logout({ commit }) {
    await api().post('app/logout/').then(() => {
      commit('SET_USER', null);
      commit('SET_TOKEN', null);
      localStorage.removeItem('userInfo');
      routes.push({ path: '/login' });
    });
  },

  register({ commit }) {
    commit('SET_LOGIN_LOADING', true);
  },
  regeneratePass({ commit }) {
    commit('SET_FORGOT_USER_PASS_SUCCESS', true);
  },
  getCurrentUser({ commit, dispatch }) {
    commit('SET_LOGIN_LOADING', false);
    return api().get('app/user/current/').then((success) => {
      dispatch('setUserInfo', success.data);
    }).catch((error) => {
      localStorage.removeItem('userInfo');
      commit('SET_LOGIN_ERROR', error.response.data.error);
    });
  },

  getUsers({ commit }, queryparams) {
    commit('SET_USERS_LOGIN_LOADING', true);
    let url = 'app/user/';
    if (queryparams) { url += `?${queryparams}`; }
    return api().get(url).then((success) => {
      commit('SET_USERS_ERROR', null);
      commit('SET_USERS_LOGIN_LOADING', false);
      commit('SET_USERS', success.data.results);
    }).catch((error) => {
      if (error.response.data.detail) commit('SET_USERS_ERROR', error.response.data.detail);
      else commit('SET_USERS_ERROR', error.response.statusText);
      commit('SET_USERS_LOGIN_LOADING', false);
    });
  },
  getVolunteerDetails({ commit }, id) {
    commit('SET_VOLUNTEER_DETAILS_LOADING', true);
    return api().get(`/app/user/${id}/`).then((success) => {
      commit('SET_VOLUNTEER_DETAILS_ERROR', null);
      commit('SET_VOLUNTEER_DETAILS_LOADING', false);
      commit('SET_VOLUNTEER_DETAILS', success.data);
    }).catch((error) => {
      if (error.response.data) commit('SET_VOLUNTEER_DETAILS_ERROR', error.response.data);
      else commit('SET_VOLUNTEER_DETAILS_ERROR', error.response.statusText);
      commit('SET_VOLUNTEER_DETAILS_LOADING', false);
    });
  },
  getUserAddress({ commit }, id) {
    commit('SET_USER_ADDRESS_LOADING', true);
    return api().get(`app/user/${id}/getaddresses/`).then((success) => {
      console.log(success);
      commit('SET_USER_ADDRESS_ERROR', null);
      commit('SET_USER_ADDRESS_LOADING', false);
      commit('SET_USER_ADDRESS', success.data[0]);
    }).catch((error) => {
      if (error.response.data) commit('SET_USER_ADDRESS_ERROR', error.response.data);
      else commit('SET_USER_ADDRESS_ERROR', error.response.statusText);
      commit('SET_USER_ADDRESS_LOADING', false);
    });
  },
  /** Edit User Methods */
  updatePersonalData({ commit, state, dispatch }, data) {
    commit('SET_USER_LOADING', true);
    return api().patch(`app/user/${state.user.id}/`, data).then((success) => {
      console.log('updatePersonalData success', success);
      commit('SET_USER_ERROR', null);
      commit('SET_USER_LOADING', false);
      commit('SET_USER', success.data);
      dispatch('getCurrentUser');
    }).catch((error) => {
      if (error.response.data.detail) commit('SET_USER_ERROR', error.response.data.detail);
      else commit('SET_USER_ERROR', error.response.statusText);
      commit('SET_USER_LOADING', false);
    });
  },
  updateAddress({ commit, state, dispatch }, data) {
    return api().patch(`app/user/${state.user.id}/updateaddress/`, data).then(() => {
      commit('SET_USER_ERROR', null);
      commit('SET_USER_LOADING', false);
      dispatch('getCurrentUser');
    }).catch((error) => {
      if (error.response.data.detail) commit('SET_USER_ERROR', error.response.data.detail);
      else commit('SET_USER_ERROR', error.response.statusText);
      commit('SET_USER_LOADING', false);
    });
  },
  clearUserUtils({ commit }) {
    commit('SET_USER_LOADING', false);
    commit('SET_USER_ERROR', null);
  },
};

const mutations = {
  SET_USER(state, value) {
    state.user = value;
  },
  SET_USER_LOADING(state, value) {
    state.userLoading = value;
  },
  SET_USER_ERROR(state, value) {
    state.userError = value;
  },
  SET_TOKEN(state, value) {
    state.token = value;
  },
  SET_LIST(state, value) {
    state.list = value;
  },
  SET_LOGIN_ERROR(state, value) {
    state.loginError = value;
  },
  SET_LOGIN_LOADING(state, value) {
    state.loginLoading = value;
  },
  SET_USERS(state, value) {
    state.users = value;
  },
  SET_USERS_ERROR(state, value) {
    state.usersError = value;
  },
  SET_USERS_LOGIN_LOADING(state, value) {
    state.usersLoginLoading = value;
  },
  SET_VOLUNTEER_DETAILS(state, value) {
    state.volunteerDetails = value;
  },
  SET_VOLUNTEER_DETAILS_ERROR(state, value) {
    state.volunteerDetailsError = value;
  },
  SET_VOLUNTEER_DETAILS_LOADING(state, value) {
    state.volunteerDetailsLoading = value;
  },
  SET_USER_ADDRESS(state, value) {
    state.userAddress = value;
  },
  SET_USER_ADDRESS_ERROR(state, value) {
    state.userAddressError = value;
  },
  SET_USER_ADDRESS_LOADING(state, value) {
    state.userAddressLoading = value;
  },
  SET_FORGOT_USER_PASS_SUCCESS(state, value) {
    state.forgotUserPassSuccess = value;
  },
  SET_FORGOT_USER_PASS_ERROR(state, value) {
    state.forgotUserPassError = value;
  },
  SET_FORGOT_USER_PASS_LOADING(state, value) {
    state.forgotUserPassLoading = value;
  },
};


export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
