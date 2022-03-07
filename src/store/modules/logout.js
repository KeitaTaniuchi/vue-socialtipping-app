"use strict";

import { getAuth, signOut } from "firebase/auth";
import router from "@/router";

const state = { loadingAnimationDisplay: false };

const getters = { loadingAnimationDisplay: (state) => state.loadingAnimationDisplay };

const mutations = {
  updateLoadingAnimationDisplay(state, value) {
    state.loadingAnimationDisplay = value;
  },
};

const actions = {
  logout(context) {
    context.commit("updateLoadingAnimationDisplay", true);
    signOut(getAuth())
      .then(() => {
        context.commit("updateLoadingAnimationDisplay", false);
        router.push({ path: "/" });
      })
      .catch((error) => {
        console.log(error);
        context.commit("updateLoadingAnimationDisplay", false);
      });
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
