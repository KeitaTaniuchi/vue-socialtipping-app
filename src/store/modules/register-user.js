"use strict";

import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const state = {
  emailAlreadyInUseDisplayDecision: true,
};

const getters = {
  emailAlreadyInUseDisplayDecision: (state) => state.emailAlreadyInUseDisplayDecision,
};

const mutations = {
  resetEmailAlreadyInUseDisplayDecision(state) {
    state.emailAlreadyInUseDisplayDecision = true;
  },
  updateEmailAlreadyInUseDisplayDecision(state) {
    state.emailAlreadyInUseDisplayDecision = false;
  },
};

const actions = {
  registerUser(context, { email, password }) {
    context.commit("resetEmailAlreadyInUseDisplayDecision");
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
          context.commit("updateEmailAlreadyInUseDisplayDecision");
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
