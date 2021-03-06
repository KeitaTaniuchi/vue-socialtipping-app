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
      const q = collection(getFirestore(), "users");
      const querySnapshot = await getDocs(q);
      const userNameArr = querySnapshot.docs.map((doc) => {
        return doc.data().user_name;
      });
      if (userNameArr.some((value) => value === userName)) {
        context.commit("updateUserNameDuplicateErrorDisplayDecision", true);
        throw new Error("user-name-already-in-use");
      }
    } catch (error) {
      console.error(error);
      throw new Error("confirmIfUserNameNotDuplicate?????????????????????????????????????????????");
    }
  },
  async createUser(context, { userName, email, password }) {
    try {
      /* createUserWithEmailAndPassword???????????????????????????????????????????????????
      ???POST https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyDLGC7AkJBkg6Z1eBaZ-iFEBGdmvFINkgg 400???
      ???????????????????????????(????????????????????????????????????????????????????????????) */
      await createUserWithEmailAndPassword(getAuth(), email, password);
      await updateProfile(getAuth().currentUser, {
        displayName: userName,
      });
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        context.commit("updateEmailAlreadyInUseErrorDisplayDecision", true);
      }
      throw new Error("createUser?????????????????????????????????????????????");
    }
  },
  async addUserNameToFireStore(context, userName) {
    try {
      addDoc(collection(getFirestore(), "users"), {
        user_name: userName,
        point: 0,
      });
    } catch (error) {
      throw new Error("addUserNameToFireStore?????????????????????????????????????????????");
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
