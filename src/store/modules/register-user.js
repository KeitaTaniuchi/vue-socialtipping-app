"use strict";

import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import router from "@/router";

const state = {
  emailAlreadyInUseErrorDisplayDecision: true,
  loadingAnimationDisplay: false,
};

const getters = {
  emailAlreadyInUseErrorDisplayDecision: (state) => state.emailAlreadyInUseErrorDisplayDecision,
  loadingAnimationDisplay: (state) => state.loadingAnimationDisplay,
};

const mutations = {
  updateEmailAlreadyInUseErrorDisplayDecision(state, value) {
    state.emailAlreadyInUseErrorDisplayDecision = value;
  },
  updateLoadingAnimationDisplay(state, value) {
    state.loadingAnimationDisplay = value;
  },
};

const actions = {
  registerUser(context, { userName, email, password }) {
    context.commit("updateEmailAlreadyInUseErrorDisplayDecision", true);
    context.commit("updateLoadingAnimationDisplay", true);
    createUserWithEmailAndPassword(getAuth(), email, password)
      .then((userCredential) => {
        context.commit("updateLoadingAnimationDisplay", false);
        const user = userCredential.user;
        user.updateProfile({
          displayName: userName,
        });
        router.push({ path: "/" });
      })
      .catch((error) => {
        console.log(error.code);
        if (error.code === "auth/email-already-in-use") {
          context.commit("updateEmailAlreadyInUseErrorDisplayDecision", false);
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
