import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import { router } from '../router/router';
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
    //this function is executed by the created method in app.vue
    initAuth({ commit }) {
      //set token to localStorge on page refresh
      let token = localStorage.getItem('token');
      if (token) {
        commit('setToken', token);
        router.push('/');
      } else {
        return false;
      }
    },
    login({ commit }, authData) {
      let authLink = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=';

      if (authData.isUser) {
        authLink = ' https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=';
      }

      return axios.post(authLink + 'AIzaSyBWMgJ1KHSYNFwbQp_Tk8vYCX4Yd-NpwhM', { email: authData.email, password: authData.password, returnSecureToken: true }).then((res) => {
        commit('setToken', res.data.idToken);
        //We set the token to localStorge
        localStorage.setItem('token', res.data.idToken);
      });
    },
    logout({ commit, state }) {
      // I ran the logout method in the store with dispatch
      commit('clearToken', state.token);

      // delete data with id "token" from localStorge
      localStorage.removeItem('token');
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
