import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
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
    login({ commit }, authData) {
      let authLink = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=';

      if (authData.isUser) {
        authLink = ' https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=';
      }

      return axios.post(authLink + 'AIzaSyBWMgJ1KHSYNFwbQp_Tk8vYCX4Yd-NpwhM', { email: authData.email, password: authData.password, returnSecureToken: true }).then((res) => {
        commit('setToken', res.data.idToken);
      });
    },
    logout({ commit, state }) {
      // I ran the logout method in the store with dispatch
      commit('clearToken', state.token);
      this.$router.replace('/');
    },
  },
  getters: {
    isAuthenticated(state) {
      // return true or false for Router.js' BeforeEnter function
      return state.token !== '';
    },
  },
});

export default store;
