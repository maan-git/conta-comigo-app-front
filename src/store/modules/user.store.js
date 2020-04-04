/* eslint-disable no-shadow */
import routes from '../../router/index';
import api from '../api';


const state = {
  user: null,
  token: '',
  list: null,
  loginError: null,
  loginLoading: false,
};

const getters = {
  getUser(state) { return state.user; },
  getToken(state) { return state.token; },
  getList(state) { return state.list; },
  getLoginError(state) { return state.loginError; },
  getLoginLoading(state) { return state.loginLoading; },
};

const actions = {
  login({ commit }, data) {
    commit('SET_LOGIN_LOADING', true);
    return api().post('app/login/', data).then((success) => {
      const userInfo = success.data;
      const expDate = Date.now();
      // xpd stands for expiration Date
      Object.assign(userInfo, { xpd: expDate });
      localStorage.setItem('userInfo', JSON.stringify(userInfo));
      commit('SET_TOKEN', success);
      commit('SET_LOGIN_ERROR', null);
      commit('SET_LOGIN_LOADING', false);
      commit('SET_USER', success);
      //  redirect to page
      routes.replace('/');
      // return api().get('users?page=1').then((success) => {
      //   commit('SET_LIST', success.data.data);
      // });
    }).catch((error) => {
      // console.log('error', error.response);
      if (error.response.data.detail) commit('SET_LOGIN_ERROR', error.response.data.detail);
      else commit('SET_LOGIN_ERROR', error.response.statusText);
      commit('SET_LOGIN_LOADING', false);
    });
  },

  logout({ commit }) {
    commit('SET_USER', null);
    commit('SET_TOKEN', null);
    localStorage.removeItem('userInfo');
    routes.replace('/login');
  },

  register({ commit }, data) {
    commit('SET_LOGIN_LOADING', true);
    return api().post('register/', data).then((success) => {
      // console.log(success);
      commit('SET_TOKEN', success);
      commit('SET_LOGIN_ERROR', null);
      commit('SET_LOGIN_LOADING', false);
    }).catch((error) => {
      commit('SET_LOGIN_ERROR', error.response.data.error);
      commit('SET_LOGIN_LOADING', false);
    });
  },
  getCurrentUser({ commit }) {
    commit('SET_LOGIN_LOADING', false);
    let isValidated = false;
    const userInfo = localStorage.getItem('userInfo');
    if (userInfo && (Date.now() - JSON.parse(userInfo).xpd) <= 900000) {
      // console.log('user validated');
      isValidated = true;
    } else {
      api().get('app/user/current/').then((success) => {
        const userInfo = success.data;
        const expDate = Date.now();
        // xpd stands for expiration Date
        Object.assign(userInfo, { xpd: expDate });
        localStorage.setItem('userInfo', JSON.stringify(userInfo));
      }).catch((error) => {
        commit('SET_LOGIN_ERROR', error.response.data.error);
        routes.replace('/login');
      });
      isValidated = true;
    }
    return isValidated;
  },
};

const mutations = {
  SET_USER(state, value) {
    state.user = value;
    // console.log('mutations SET_USER', state.data);
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
};


export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
