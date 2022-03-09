"use strict";

import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore";
import router from "@/router";

const state = {
  loadingAnimationDisplay: false,
  userNameDuplicateErrorDisplayDecision: false,
  emailAlreadyInUseErrorDisplayDecision: false,
};

const getters = {
  loadingAnimationDisplay: (state) => state.loadingAnimationDisplay,
  userNameDuplicateErrorDisplayDecision: (state) => state.userNameDuplicateErrorDisplayDecision,
  emailAlreadyInUseErrorDisplayDecision: (state) => state.emailAlreadyInUseErrorDisplayDecision,
};

const mutations = {
  updateLoadingAnimationDisplay(state, value) {
    state.loadingAnimationDisplay = value;
  },
  updateUserNameDuplicateErrorDisplayDecision(state, value) {
    state.userNameDuplicateErrorDisplayDecision = value;
  },
  updateEmailAlreadyInUseErrorDisplayDecision(state, value) {
    state.emailAlreadyInUseErrorDisplayDecision = value;
  },
};

const actions = {
  async registerUser(context, { userName, email, password }) {
    context.commit("updateLoadingAnimationDisplay", true);
    context.commit("updateUserNameDuplicateErrorDisplayDecision", false);
    context.commit("updateEmailAlreadyInUseErrorDisplayDecision", false);
    try {
      await context.dispatch("confirmIfUserNameNotDuplicate", userName);
      await context.dispatch("createUser", { email, password });
      await context.dispatch("updateDisplayName", userName);
      await context.dispatch("addUserNameToFireStore", userName);
      await router.push({ path: "/" });
    } catch (error) {
      console.error(error.message);
    } finally {
      context.commit("updateLoadingAnimationDisplay", false);
    }
  },
  async confirmIfUserNameNotDuplicate(context, userName) {
    const userNameArr = [];
    try {
      const q = collection(getFirestore(), "users");
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        userNameArr.push(doc.data().user_name);
      });
      if (userNameArr.some((value) => value === userName)) {
        context.commit("updateUserNameDuplicateErrorDisplayDecision", true);
        throw new Error();
      }
    } catch (error) {
      throw new Error("confirmIfUserNameNotDuplicateメソッドでエラーが発生しました");
    }
  },
  async createUser(context, { email, password }) {
    /* createUserメソッドを実行するとコンソール上でPOST...400エラーが発生します(ユーザー登録自体はできます) */
    try {
      await createUserWithEmailAndPassword(getAuth(), email, password);
      await console.log("createUserまでOK");
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        context.commit("updateEmailAlreadyInUseErrorDisplayDecision", true);
      }
      throw new Error("createUserメソッドでエラーが発生しました");
    }
  },
  /* updateDisplayNameメソッドを実行するとエラーが発生します(currentUserメソッドがうまく機能していない?) */
  async updateDisplayName(userName) {
    try {
      await updateProfile(getAuth().currentUser, {
        displayName: userName,
      });
      await console.log("updateDisplayNameまでOK");
    } catch (error) {
      throw new Error("updateDisplayNameメソッドでエラーが発生しました");
    }
  },
  async addUserNameToFireStore(context, userName) {
    try {
      await addDoc(collection(getFirestore(), "users"), {
        user_name: userName,
        point: 0,
      });
    } catch (error) {
      throw new Error("addUserNameToFireStoreメソッドでエラーが発生しました");
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
