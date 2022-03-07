"use strict";

import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import router from "@/router";

const state = {
  emailAlreadyInUseErrorDisplayDecision: false,
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
    context.commit("updateEmailAlreadyInUseErrorDisplayDecision", false);
    context.commit("updateLoadingAnimationDisplay", true);
    createUserWithEmailAndPassword(getAuth(), email, password)
      .then(() => {
        updateProfile(getAuth().currentUser, {
          displayName: userName,
        });
      })
      .then(() => {
        context.dispatch("addUserNameToFireStore", userName);
      })
      .then(() => {
        context.commit("updateLoadingAnimationDisplay", false);
        router.push({ path: "/" });
      })
      .catch((error) => {
        console.log(error.code);
        if (error.code === "auth/email-already-in-use") {
          context.commit("updateEmailAlreadyInUseErrorDisplayDecision", true);
        }
        context.commit("updateLoadingAnimationDisplay", false);
      });
  },
  addUserNameToFireStore(context, userName) {
    try {
      addDoc(collection(getFirestore(), "users"), {
        user_name: userName,
        point: 0,
      });
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
