"use strict";

import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import router from "@/router";

const state = {
  loadingAnimationDisplay: false,
};

const getters = {
  loadingAnimationDisplay: (state) => state.loadingAnimationDisplay,
};

const mutations = {
  updateLoadingAnimationDisplay(state, value) {
    state.loadingAnimationDisplay = value;
  },
};

const actions = {};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
