import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    host: null
  },
  mutations: {
    setHost(state, payload) {
      state.host = payload.host;
    }
  },
  actions: {},
  modules: {}
});
