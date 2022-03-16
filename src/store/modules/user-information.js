"use strict";

import { getFirestore, collection, getDocs } from "firebase/firestore";

const state = {
  userInformationArr: [],
  currentUserInformationObj: "",
  selectUserInformationObj: "",
};

const getters = {
  userInformationArr: (state) => state.userInformationArr,
  currentUserInformationObj: (state) => state.currentUserInformationObj,
  selectUserInformationObj: (state) => state.selectUserInformationObj,
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
  updateSelectUserInformationObj(state, value) {
    state.selectUserInformationObj = value;
  },
};

const actions = {
  async createUserInformationArr(context, currentUserName) {
    const q = collection(getFirestore(), "users");
    const querySnapshot = await getDocs(q);
    const userInformationArr = querySnapshot.docs.map((doc) => {
      return doc.data();
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
