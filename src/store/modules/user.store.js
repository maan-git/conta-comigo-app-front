/* eslint-disable no-shadow */
import routes from '../../router/index';
import api from '../api';


const state = {
  user: null,
  token: '',
  list: null,
  loginError: null,
  loginLoading: false,
  users: null,
  usersError: null,
  usersLoginLoading: false,
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
      commit('SET_USER', success.data);
      //  redirect to page
      routes.replace('/');
      // return api().get('users?page=1').then((success) => {
      //   commit('SET_LIST', success.data.data);
      // });
    }).catch((error) => {
      console.log('error', error.response);
      if (error.response.data.detail) commit('SET_LOGIN_ERROR', error.response.data.detail);
      else commit('SET_LOGIN_ERROR', error.response.statusText);
      commit('SET_LOGIN_LOADING', false);
    });
  },

  logout({ commit }) {
    commit('SET_USER', null);
    commit('SET_TOKEN', null);
    localStorage.removeItem('userInfo');
    // TODO chamar o servico de logout para retirar o token do cookie
    routes.replace('/login');
  },

  register({ commit }, data) {
    commit('SET_LOGIN_LOADING', true);
    /* return api().post('register/', data).then((success) => {
      console.log(success);
      commit('SET_TOKEN', success);
      commit('SET_LOGIN_ERROR', null);
      commit('SET_LOGIN_LOADING', false);
    }).catch((error) => {
      commit('SET_LOGIN_ERROR', error.response.data.error);
      commit('SET_LOGIN_LOADING', false);
    }); */
    console.log(data);
  },
  registerStep1({ commit }, data) {
    commit('SET_NOME', data.nome);
    commit('SET_CPF', data.cpf);
    commit('SET_DATANASCIMENTO', data.datanascimento);
    commit('SET_TELEFONE', data.telefone);
    commit('SET_WHATSAPP', data.whatsapp);
    commit('SET_MORASO', data.moraso);
    commit('SET_GRUPORISCO', data.grupoderisco);
    console.log(data);
  },
  registerStep2({ commit }, data) {
    commit('SET_CEP', data.cep);
    commit('SET_ENDERECO', data.endereco);
    commit('SET_BAIRRO', data.bairro);
    commit('SET_CIDADE', data.cidade);
    commit('SET_ESTADO', data.estado);
    console.log(data);
  },
  registerStep3({ commit }, data) {
    commit('SET_EMAIL', data.email);
    commit('SET_PASSWORD', data.password);
    console.log(data);
  },
  getCurrentUser({ commit }) {
    commit('SET_LOGIN_LOADING', false);
    let isValidated = false;
    const userInfo = localStorage.getItem('userInfo');
    if (userInfo && (Date.now() - JSON.parse(userInfo).xpd) <= 900000) {
      isValidated = true;
      commit('SET_USER', JSON.parse(userInfo));
    } else {
      console.log('getCurrentUser else');
      api().get('app/user/current/').then((success) => {
        const userInfo = success.data;
        const expDate = Date.now();
        // xpd stands for expiration Date
        Object.assign(userInfo, { xpd: expDate });
        localStorage.setItem('userInfo', JSON.stringify(userInfo));
        commit('SET_USER', userInfo);
      }).catch((error) => {
        commit('SET_LOGIN_ERROR', error.response.data.error);
        routes.replace('/login');
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
  SET_USERS(state, value) {
    state.users = value;
  },
  SET_USERS_ERROR(state, value) {
    state.usersError = value;
  },
  SET_USERS_LOGIN_LOADING(state, value) {
    state.usersLoginLoading = value;
  },
};


export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
