import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const translation = new Vuex.Store({
  state: {
    word: "",
  },
  mutations: {
    SET_WORD(state, payload) {
      state.word = payload;
    },
  },
  actions: {
    setWord({ commit }, payload) {
      commit("SET_WORD", payload);
    },
  },
});

export default translation;
