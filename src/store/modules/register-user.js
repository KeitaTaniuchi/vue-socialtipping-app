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
      await context.dispatch("createUser", { userName, email, password });
      await context.dispatch("addUserNameToFireStore", userName);
      await router.push({ path: "/" });
    } catch (error) {
      console.error(error.message);
    } finally {
      context.commit("updateLoadingAnimationDisplay", false);
    }
  },
  async confirmIfUserNameNotDuplicate(context, userName) {
    try {
      const userNameArr = [];
      const q = collection(getFirestore(), "users");
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        userNameArr.push(doc.data().user_name);
      });
      if (userNameArr.some((value) => value === userName)) {
        context.commit("updateUserNameDuplicateErrorDisplayDecision", true);
        throw new Error("user-name-already-in-use");
      }
    } catch (error) {
      console.error(error);
      throw new Error("confirmIfUserNameNotDuplicateメソッドでエラーが発生しました");
    }
  },
  async createUser(context, { userName, email, password }) {
    try {
      /* createUserWithEmailAndPasswordメソッドを実行するとコンソール上で
      「POST https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyDLGC7AkJBkg6Z1eBaZ-iFEBGdmvFINkgg 400」
      エラーが発生します(ユーザー登録自体は可能なため保留にします) */
      await createUserWithEmailAndPassword(getAuth(), email, password);
      await updateProfile(getAuth().currentUser, {
        displayName: userName,
      });
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        context.commit("updateEmailAlreadyInUseErrorDisplayDecision", true);
      }
      throw new Error("createUserメソッドでエラーが発生しました");
    }
  },
  async addUserNameToFireStore(context, userName) {
    try {
      addDoc(collection(getFirestore(), "users"), {
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
