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
  cep: '',
  endereco: '',
  bairro: '',
  cidade: '',
  estado: '',
  email: '',
  password: '',
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
  getCep(state) { return state.cep; },
  getEndereco(state) { return state.endereco; },
  getBairro(state) { return state.bairro; },
  getCidade(state) { return state.cidade; },
  getEstado(state) { return state.estado; },
  getEmail(state) { return state.email; },
  getPassword(state) { return state.password; },
  getCreateUserError(state) { return state.createUserError; },
  getStep(state) { return state.step; },
};

const actions = {
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
  registerStep2({ commit }, data) {
    commit('SET_CEP', data.cep);
    commit('SET_ENDERECO', data.endereco);
    commit('SET_BAIRRO', data.bairro);
    commit('SET_CIDADE', data.cidade);
    commit('SET_ESTADO', data.estado);
    commit('SET_LOGIN_LOADING', false);
    commit('SET_STEP', 3);
  },
  setStep({ commit }, step) {
    commit('SET_STEP', step);
  },
  registerStep3({ commit }, data) {
    commit('SET_EMAIL', data.email);
    commit('SET_PASSWORD', data.password);
  },
  createAccount({ commit, dispatch }, _data) {
    console.log('chegou aqui o valor ====== ', _data);
    commit('SET_LOGIN_LOADING', true);
    return api().post('/app/user/', _data).then(() => {
      console.log('Usuário criado.');
      commit('SET_LOGIN_LOADING', false);
      commit('SET_CREATE_USER_ERROR', null);
      commit('RESET_STATES');
      // implementar o route guard
      const loginData = {
        username: _data.email,
        password: _data.password,
      };
      dispatch('user/login', loginData, { root: true });
    }).catch((error) => {
      commit('SET_LOGIN_LOADING', false);
      if (error.response.data.detail) commit('SET_CREATE_USER_ERROR', error.response.data.detail);
      else commit('SET_CREATE_USER_ERROR', error.response.statusText);
      console.log(error);
    });
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
  SET_CEP(state, value) {
    state.cep = value;
  },
  SET_ENDERECO(state, value) {
    state.endereco = value;
  },
  SET_BAIRRO(state, value) {
    state.bairro = value;
  },
  SET_CIDADE(state, value) {
    state.cidade = value;
  },
  SET_ESTADO(state, value) {
    state.estado = value;
  },
  SET_EMAIL(state, value) {
    state.email = value;
  },
  SET_PASSWORD(state, value) {
    state.password = value;
  },
  SET_CREATE_USER_ERROR(state, value) {
    state.createUserError = value;
  },
  SET_STEP(state, value) {
    state.step = value;
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
    state.cep = '';
    state.endereco = '';
    state.bairro = '';
    state.cidade = '';
    state.estado = '';
    state.email = '';
    state.password = '';
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
