"use strict";

import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const state = {
  emailAlreadyInUseErrorDisplayDecision: true,
};

const getters = {
  emailAlreadyInUseErrorDisplayDecision: (state) => state.emailAlreadyInUseErrorDisplayDecision,
};

const mutations = {
  resetEmailAlreadyInUseErrorDisplayDecision(state) {
    state.emailAlreadyInUseErrorDisplayDecision = true;
  },
  updateEmailAlreadyInUseErrorDisplayDecision(state) {
    state.emailAlreadyInUseErrorDisplayDecision = false;
  },
};

const actions = {
  registerUser(context, { email, password }) {
    context.commit("resetEmailAlreadyInUseErrorDisplayDecision");
    createUserWithEmailAndPassword(getAuth(), email, password)
      .then((userCredential) => {
        this.$router.push("/");
        const user = userCredential.user;
        user.updateProfile({
          displayName: this.userName,
        });
      })
      .catch((error) => {
        console.log(error.code);
        if (error.code === "auth/email-already-in-use") {
          context.commit("updateEmailAlreadyInUseErrorDisplayDecision");
        }
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
