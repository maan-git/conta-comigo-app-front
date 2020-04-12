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
  cep: '',
  endereco: '',
  bairro: '',
  bairros: [],
  cidade: '',
  estado: '',
  email: '',
  password: '',
  id: '',

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
  registerStep2({ commit, dispatch, state }, data) {
    console.log(state);
    commit('SET_LI_E_ACEITO', data.lieAceito);
    commit('SET_EMAIL', data.email);
    commit('SET_PASSWORD', data.password);
    console.log('registerStep2 data', data);
    const phoneNumber = `+55${state.telefone.replace(/\(/g, '').replace(/\)/g, '').replace(/ /g, '').replace(/-/g, '')}`;
    const payload = {
      password: data.password,
      email: state.email,
      first_name: state.nome,
      last_name: state.sobrenome,
      // avatar: string,
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
  fakelogin({ commit }, data) {
    commit('SET_CREATE_USER_LOADING', true);
    console.log('fakelogin data', data);
    return api().post('app/login/', data).then((s) => {
      commit('SET_CREATE_USER_LOADING', false);
      console.log('fakelogin success', s);
      commit('SET_ID', s.data.id);
      commit('SET_STEP', 3);
    }).catch((err) => {
      if (err.response.data.detail) commit('SET_CREATE_USER_ERROR', err.response.data.detail);
      else commit('SET_CREATE_USER_ERROR', err.response.statusText);
      commit('SET_CREATE_USER_LOADING', false);
    });
  },
  setStep({ commit }, step) {
    commit('SET_STEP', step);
  },
  registerStep3({ commit, dispatch, state }, data) {
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

  findByZip({ commit, dispatch }, cep) {
    const zip = cep.replace('-', '');
    commit('SET_CREATE_USER_LOADING', true);
    return api().get(`/app/address/findbyzip/?zip=${zip}`).then((s) => {
      commit('SET_CEP', zip);
      commit('SET_ENDERECO', s.data.address);
      if (s.data.neighborhood.description && s.data.neighborhood.description.length > 0) {
        commit('SET_BAIRROS', [s.data.neighborhood]);
        commit('SET_BAIRRO', s.data.neighborhood.id);
      } else if (s.data.city.id) {
        dispatch('findNeighborhood', s.data.city.id);
      } else {
        commit('SET_BAIRROS', []);
        commit('SET_BAIRRO', '');
      }
      commit('SET_CIDADE', s.data.city.description);
      commit('SET_ESTADO', s.data.state.description);
      commit('SET_CREATE_USER_LOADING', false);
    }).catch((err) => {
      commit('SET_CREATE_USER_LOADING', false);
      console.log('searchByCep error', err);
    });
  },

  setBairros({ commit }, bairros) {
    commit('SET_BAIRROS', bairros);
  },

  findNeighborhood({ commit }, cityid) {
    commit('SET_CREATE_USER_LOADING', true);
    return api().get(`/app/neighborhood/?city_id=${cityid}`).then((s) => {
      commit('SET_BAIRROS', s.data.results);
      commit('SET_CREATE_USER_LOADING', false);
    }).catch(() => {
      commit('SET_CREATE_USER_LOADING', false);
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
  SET_BAIRROS(state, value) {
    state.bairros = value;
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
    state.cep = '';
    state.endereco = '';
    state.bairro = '';
    state.bairros = [];
    state.cidade = '';
    state.estado = '';
    state.email = '';
    state.password = '';
    state.id = '';
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
