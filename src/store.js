import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    pathes: [],
  },
  mutations: {
    PUSH_PATH(state, path) {
      state.pathes.push(path);
    },
  },
  actions: {
    pushPath({ commit }, payload) {
      commit('PUSH_PATH', payload);
    },
  },
});
