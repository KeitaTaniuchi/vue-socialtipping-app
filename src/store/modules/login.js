"use strict";

import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import router from "@/router";

const state = {
  userNotFoundErrorDisplayDecision: false,
  wrongPasswordErrorDisplayDecision: false,
  loadingAnimationDisplay: false,
};

const getters = {
  userNotFoundErrorDisplayDecision: (state) => state.userNotFoundErrorDisplayDecision,
  wrongPasswordErrorDisplayDecision: (state) => state.wrongPasswordErrorDisplayDecision,
  loadingAnimationDisplay: (state) => state.loadingAnimationDisplay,
};

const mutations = {
  updateUserNotFoundErrorDisplayDecision(state, value) {
    state.userNotFoundErrorDisplayDecision = value;
  },
  updateWrongPasswordErrorDisplayDecision(state, value) {
    state.wrongPasswordErrorDisplayDecision = value;
  },
  updateLoadingAnimationDisplay(state, value) {
    state.loadingAnimationDisplay = value;
  },
};

const actions = {
  login(context, { email, password }) {
    context.commit("updateLoadingAnimationDisplay", true);
    context.commit("updateUserNotFoundErrorDisplayDecision", false);
    context.commit("updateWrongPasswordErrorDisplayDecision", false);
    signInWithEmailAndPassword(getAuth(), email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user.displayName);
        context.commit("updateLoadingAnimationDisplay", false);
        router.push({ path: "/DashBoard" });
      })
      .catch((error) => {
        console.log(error.code);
        if (error.code === "auth/user-not-found") {
          context.commit("updateUserNotFoundErrorDisplayDecision", true);
        }
        if (error.code === "auth/wrong-password") {
          context.commit("updateWrongPasswordErrorDisplayDecision", true);
        }
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
