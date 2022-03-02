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

const actions = {
  login(context, { email, password }) {
    context.commit("updateLoadingAnimationDisplay", true);
    signInWithEmailAndPassword(getAuth(), email, password)
      .then((userCredential) => {
        context.commit("updateLoadingAnimationDisplay", false);
        const user = userCredential.user;
        console.log(user);
        router.push({ path: "/DashBoard" });
      })
      .catch((error) => {
        console.log(error.code);
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
