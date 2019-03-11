import Vue from 'vue';
import Vuex from 'vuex';

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

    connect({ commit }) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          // on resolve
          commit('SET_CONNECTED', true);
          resolve();
        }, 1000);
      });
    },

    disconnect({ commit }) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          // on resolve
          commit('SET_CONNECTED', false);
          resolve();
        }, 1000);
      });
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
