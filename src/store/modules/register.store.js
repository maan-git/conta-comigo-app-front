/* eslint-disable no-shadow */
import api from '../api';

const state = {
  createUserLoading: false,
  nome: '',
  sobrenome: '',
  cpf: '',
  datanascimento: '',
  telefone: '',
  whatsapp: false,
  moraso: false,
  grupoderisco: false,
  lieAceito: false,

  email: '',
  password: '',
  id: null,
  avatar: null,

  // error handling
  createUserError: '',
  step: 1,
};

const getters = {
  getCreateUserLoading(state) { return state.createUserLoading; },
  getNome(state) { return state.nome; },
  getSobrenome(state) { return state.sobrenome; },
  getCpf(state) { return state.cpf; },
  getDataNascimento(state) { return state.datanascimento; },
  getTelefone(state) { return state.telefone; },
  getWhatsapp(state) { return state.whatsapp; },
  getMoraSo(state) { return state.moraso; },
  getGrupoRisco(state) { return state.grupoderisco; },
  getEmail(state) { return state.email; },
  getCreateUserError(state) { return state.createUserError; },
  getStep(state) { return state.step; },
};

const actions = {
  defaultAvatar({ commit }) {
    commit('SET_AVATAR', 'data:image/jpeg;base64,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');
  },
  registerStep1({ commit }, data) {
    commit('SET_NOME', data.nome);
    commit('SET_SOBRENOME', data.sobrenome);
    commit('SET_CPF', data.cpf);
    commit('SET_DATANASCIMENTO', data.datanascimento);
    commit('SET_TELEFONE', data.telefone);
    commit('SET_WHATSAPP', data.whatsapp);
    commit('SET_MORASO', data.moraso);
    commit('SET_GRUPORISCO', data.grupoderisco);
    commit('SET_CREATE_USER_ERROR', '');
    commit('SET_STEP', 2);
  },
  registerStep3({ commit, dispatch, state }, data) {
    commit('SET_LI_E_ACEITO', data.lieAceito);
    commit('SET_EMAIL', data.email);
    commit('SET_PASSWORD', data.password);
    // console.log('registerStep2 data', data);
    const phoneNumber = `+55${state.telefone.replace(/\(/g, '').replace(/\)/g, '').replace(/ /g, '').replace(/-/g, '')}`;
    const payload = {
      password: data.password,
      email: state.email,
      first_name: state.nome,
      last_name: state.sobrenome,
      avatar: state.avatar,
      is_superuser: false,
      cpf: state.cpf.replace(/\./g, '').replace(/-/, ''),
      birth_date: state.datanascimento,
      phone_number: phoneNumber,
      is_phone_whatsapp: state.whatsapp,
      is_at_risk_group: state.grupoderisco,
      live_alone: state.moraso,
    };
    commit('SET_CREATE_USER_LOADING', true);
    return api().post('/app/user/', payload).then(() => {
      commit('SET_CREATE_USER_LOADING', false);
      commit('SET_CREATE_USER_ERROR', null);
      dispatch('register/fakelogin', {
        username: payload.email,
        password: payload.password,
      }, { root: true });
    }).catch((error) => {
      commit('SET_CREATE_USER_LOADING', false);
      if (error.response.data.detail) commit('SET_CREATE_USER_ERROR', error.response.data.detail);
      else commit('SET_CREATE_USER_ERROR', error.response.statusText);
    });
  },
  fakelogin({ commit, dispatch }, data) {
    commit('SET_CREATE_USER_LOADING', true);
    // console.log('fakelogin data', data);
    return api().post('app/login/', data).then((s) => {
      commit('SET_CREATE_USER_LOADING', false);
      // console.log('fakelogin success', s);
      commit('SET_ID', s.data.id);
      dispatch('registerAddress');
    }).catch((err) => {
      if (err.response.data.detail) commit('SET_CREATE_USER_ERROR', err.response.data.detail);
      else commit('SET_CREATE_USER_ERROR', err.response.statusText);
      commit('SET_CREATE_USER_LOADING', false);
    });
  },
  setStep({ commit }, step) {
    commit('SET_STEP', step);
  },
  registerAddress({
    commit, dispatch, state, rootState,
  }) {
    const data = {
      neighborhood_id: rootState.address.bairro,
      address: rootState.address.endereco,
      zip: rootState.address.cep.replace(/-/g, ''),
    };

    commit('SET_CREATE_USER_LOADING', true);
    return api().post(`/app/user/${state.id}/addaddress/`, data).then(() => {
      commit('SET_CREATE_USER_ERROR', null);
      const loginData = {
        username: state.email,
        password: state.password,
      };
      dispatch('user/login', loginData, { root: true });
      commit('RESET_STATES');
    }).catch((error) => {
      commit('SET_LOGIN_LOADING', false);
      if (error.response.data.detail) commit('SET_CREATE_USER_ERROR', error.response.data.detail);
      else commit('SET_CREATE_USER_ERROR', error.response.statusText);
    });
  },
  setAvatar({ commit }, avatar) { commit('SET_AVATAR', avatar); },
  resetForm({ commit }) {
    commit('RESET_STATES');
  },
};

const mutations = {
  SET_LOGIN_LOADING(state, value) {
    state.createUserLoading = value;
  },
  SET_NOME(state, value) {
    state.nome = value;
  },
  SET_SOBRENOME(state, value) {
    state.sobrenome = value;
  },
  SET_CPF(state, value) {
    state.cpf = value;
  },
  SET_DATANASCIMENTO(state, value) {
    state.datanascimento = value;
  },
  SET_TELEFONE(state, value) {
    state.telefone = value;
  },
  SET_WHATSAPP(state, value) {
    state.whatsapp = value;
  },
  SET_MORASO(state, value) {
    state.moraso = value;
  },
  SET_GRUPORISCO(state, value) {
    state.grupoderisco = value;
  },
  SET_EMAIL(state, value) {
    state.email = value;
  },
  SET_PASSWORD(state, value) {
    state.password = value;
  },
  SET_LI_E_ACEITO(state, value) {
    state.lieAceito = value;
  },
  SET_CREATE_USER_ERROR(state, value) {
    state.createUserError = value;
  },
  SET_STEP(state, value) {
    state.step = value;
  },
  SET_ID(state, value) {
    state.id = value;
  },
  SET_AVATAR(state, value) {
    state.avatar = value;
  },
  SET_CREATE_USER_LOADING(state, value) {
    state.createUserLoading = value;
  },
  RESET_STATES(state) {
    state.createUserLoading = false;
    state.nome = '';
    state.sobrenome = '';
    state.cpf = '';
    state.datanascimento = '';
    state.telefone = '';
    state.whatsapp = false;
    state.moraso = false;
    state.grupoderisco = false;
    state.email = '';
    state.password = '';
    state.id = '';
    state.avatar = null;
    // error handling
    state.createUserError = '';
    state.step = 1;
  },
};


export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
