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
    /*  clearToken(state) {
      state.token = '';
    }, */
  },
  actions: {
    login({ commit, dispatch, state }, authData) {
      let authLink = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=';

      if (authData.isUser) {
        authLink = ' https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=';
      }

      axios.post(authLink + 'AIzaSyBWMgJ1KHSYNFwbQp_Tk8vYCX4Yd-NpwhM', { email: authData.email, password: authData.password, returnSecureToken: true }).then((res) => {
        commit('setToken', res.data.idToken);
        console.log(res);
      });

      dispatch;
      state;
    },
    /*  logout({ commit, dispatch, state }) {}, */
  },
  getters: {},
});

export default store;
