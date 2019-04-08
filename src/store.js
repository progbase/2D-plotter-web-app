import Vue from 'vue';
import Vuex from 'vuex';
import papi from './api';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    pathes: [],
    connected: false,
    mode: 'normal',
  },
  mutations: {
    PUSH_PATH(state, path) {
      state.pathes.push(path);
    },

    SET_CONNECTED(state, connected) {
      state.connected = connected;
    },

    SET_MODE(state, mode) {
      state.mode = mode;
    },
  },
  actions: {
    pushPath({ commit }, payload) {
      commit('PUSH_PATH', payload);
    },

    async connect({ commit }) {
      try {
        await papi.connect();
        commit('SET_CONNECTED', true);
        console.log('Connected');
      } catch (e) {
        console.error('Connection error', e);
      }
    },

    async disconnect({ commit }) {
      try {
        await papi.disconnect();
        commit('SET_CONNECTED', false);
        console.log('Disconnected');
      } catch (e) {
        console.error('Disconnection error', e);
      }
    },

    changeMode({ commit }, mode) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          // on resolve
          commit('SET_MODE', mode);
          resolve();
        }, 1000);
      });
    },
  },
});
