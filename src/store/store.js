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
    initAuth({ commit, dispatch }) {
      //set token to localStorge on page refresh
      let token = localStorage.getItem('token');
      if (token) {
        let expirationDate = localStorage.getItem('expirationDate');
        let time = new Date().getTime();
        // log out if time expires
        if (time >= expirationDate) {
          console.log('token time has passed');
          dispatch('logout');
        } else {
          // if the time has not passed when the page is refreshed
          commit('setToken', token);
          let timerSecond = +expirationDate - time;
          console.log(`timerSecond`, timerSecond);
          dispatch('setTimeoutTimer', timerSecond);
          router.push('/');
        }
      } else {
        return false;
      }
    },
    login({ commit, dispatch }, authData) {
      // signUp
      let authLink = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=';

      if (authData.isUser) {
        // signIn
        authLink = ' https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=';
      }

      return axios.post(authLink + 'AIzaSyBWMgJ1KHSYNFwbQp_Tk8vYCX4Yd-NpwhM', { email: authData.email, password: authData.password, returnSecureToken: true }).then((res) => {
        commit('setToken', res.data.idToken);
        //We set the token to localStorge
        localStorage.setItem('token', res.data.idToken);
        localStorage.setItem('expirationDate', new Date().getTime() + +res.data.expiresIn * 1000);
        dispatch('setTimeoutTimer', res.data.expiresIn * 1000);
      });
    },
    logout({ commit }) {
      // I ran the logout method in the store with dispatch
      commit('clearToken');

      // delete data with id "token" from localStorge
      localStorage.removeItem('token');
      localStorage.removeItem('expirationDate');
      router.replace('/auth');
    },
    // automatic logout process
    setTimeoutTimer({ dispatch }, expiresIn) {
      setTimeout(() => {
        dispatch('logout');
      }, expiresIn);
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
