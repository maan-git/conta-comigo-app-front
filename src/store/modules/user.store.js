/* eslint-disable no-shadow */
import routes from '../../router/index';
import api from '../api';
// import notificationClient from '../../plugins/NotificationClient';


const state = {
  user: null,
  token: '',
  list: null,
  loginError: null,
  loginLoading: false,
  users: null,
  usersError: null,
  usersLoginLoading: false,
  userDetails: null,
  userDetailsError: null,
  userDetailsLoginLoading: false,
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
  async login({ commit }, data) {
    commit('SET_LOGIN_LOADING', true);
    await api().post('app/login/', data).then((success) => {
      const userInfo = success.data;
      const expDate = Date.now();
      // xpd stands for expiration Date
      Object.assign(userInfo, { xpd: expDate });
      localStorage.setItem('userInfo', JSON.stringify(userInfo));
      commit('SET_TOKEN', success);
      commit('SET_LOGIN_ERROR', null);
      commit('SET_LOGIN_LOADING', false);
      commit('SET_USER', success.data);
      // notificationClient.startListening();
      routes.push({ path: '/' });
    }).catch((error) => {
      // console.log('error', error.response);
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
      // notificationClient.stopListening();
      routes.push({ path: '/login' });
    });
  },

  register({ commit }) {
    commit('SET_LOGIN_LOADING', true);
  },
  regeneratePass({ commit }) {
    commit('SET_FORGOT_USER_PASS_SUCCESS', true);
  },
  getCurrentUser({ commit }) {
    commit('SET_LOGIN_LOADING', false);
    let isValidated = false;
    const userInfo = localStorage.getItem('userInfo');
    if (userInfo && (Date.now() - JSON.parse(userInfo).xpd) <= 900000) {
      isValidated = true;
      commit('SET_USER', JSON.parse(userInfo));
    //  dispatch('getUserAddress', JSON.parse(userInfo).id);
    } else {
      api().get('app/user/current/').then((success) => {
        const userInfo = success.data;
        const expDate = Date.now();
        // xpd stands for expiration Date
        Object.assign(userInfo, { xpd: expDate });
        localStorage.setItem('userInfo', JSON.stringify(userInfo));
        commit('SET_USER', userInfo);
      //  dispatch('getUserAddress', userInfo.id);
      }).catch((error) => {
        localStorage.removeItem('userInfo');
        commit('SET_LOGIN_ERROR', error.response.data.error);
      });
      isValidated = true;
    }
    return isValidated;
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
  getUserDetails({ commit }) {
    commit('SET_USER_DETAILS_LOADING', true);
    return api().get('app/user/current/').then((success) => {
      commit('SET_USER_DETAILS_ERROR', null);
      commit('SET_USER_DETAILS_LOADING', false);
      commit('SET_USER_DETAILS', success.data);
    }).catch((error) => {
      if (error.response.data) commit('SET_USER_DETAILS_ERROR', error.response.data);
      else commit('SET_USER_DETAILS_ERROR', error.response.statusText);
      commit('SET_USER_DETAILS_LOADING', false);
    });
  },
  getUserAddress({ commit }, id) {
    commit('SET_USER_ADDRESS_LOADING', true);
    return api().get(`app/user/${id}/getaddresses/`).then((success) => {
      // console.log(success);
      commit('SET_USER_ADDRESS_ERROR', null);
      commit('SET_USER_ADDRESS_LOADING', false);
      commit('SET_USER_ADDRESS', success.data[0]);
    }).catch((error) => {
      if (error.response.data) commit('SET_USER_ADDRESS_ERROR', error.response.data);
      else commit('SET_USER_ADDRESS_ERROR', error.response.statusText);
      commit('SET_USER_ADDRESS_LOADING', false);
    });
  },
};

const mutations = {
  SET_USER(state, value) {
    state.user = value;
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
  SET_USER_DETAILS(state, value) {
    state.userDetails = value;
  },
  SET_USER_DETAILS_ERROR(state, value) {
    state.userDetailsError = value;
  },
  SET_USER_DETAILS_LOADING(state, value) {
    state.userDetailsLoading = value;
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
