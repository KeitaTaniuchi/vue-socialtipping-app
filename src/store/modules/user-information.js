"use strict";

import { getFirestore, collection, getDocs } from "firebase/firestore";

const state = {
  userInformationArr: [],
};

const getters = {
  userInformationArr: (state) => state.userInformationArr,
};

const mutations = {
  updatedUserInformationArr(state, value) {
    state.userInformationArr = value;
  },
};

const actions = {
  async createUserInformationArr(context) {
    const userInformationArr = [];
    const q = collection(getFirestore(), "users");
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      userInformationArr.push(doc.data());
    });
    context.commit("updatedUserInformationArr", userInformationArr);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
