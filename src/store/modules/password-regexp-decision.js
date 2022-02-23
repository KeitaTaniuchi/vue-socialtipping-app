"use strict";

const state = {
  errorMessage: "テスト",
  test: "",
};

const getters = {
  errorMessage: (state) => state.errorMessage,
};

const mutations = {
  updateErrorMessage(state, value) {
    state.test = value;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
};
