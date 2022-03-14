"use strict";

import { getFirestore, collection, getDocs } from "firebase/firestore";

const state = {
  userInformationArr: [],
  currentUserInformationObj: "",
};

const getters = {
  userInformationArr: (state) => state.userInformationArr,
  currentUserInformationObj: (state) => state.currentUserInformationObj,
};

const mutations = {
  updatedUserInformationArr(state, value) {
    state.userInformationArr = value;
  },
  updatedCurrentUserInformationObj(state, { userInformationArr, currentUserName }) {
    userInformationArr.find((object) => {
      if (object.user_name === currentUserName) {
        state.currentUserInformationObj = object;
      }
    });
  },
};

const actions = {
  async createUserInformationArr(context, currentUserName) {
    const userInformationArr = [];
    const q = collection(getFirestore(), "users");
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      userInformationArr.push(doc.data());
    });
    context.commit("updatedUserInformationArr", userInformationArr);
    context.commit("updatedCurrentUserInformationObj", { userInformationArr: userInformationArr, currentUserName: currentUserName });
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
