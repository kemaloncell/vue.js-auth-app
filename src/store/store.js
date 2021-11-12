import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    token: '',
    fbAPIKey: 'AIzaSyBWMgJ1KHSYNFwbQp_Tk8vYCX4Yd-NpwhM',
  },
  mutations: {
    setToken(state, token) {
      state.token = token;
    },
    clearToken(state) {
      state.token = '';
    },
  },
  actions: {
    /* login({ commit, dispatch, state }, autData) {},
    logout({ commit, dispatch, state }) {}, */
  },
  getters: {},
});

export default store;
