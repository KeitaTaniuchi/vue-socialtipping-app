"use strict";

import { getFirestore, collection, getDocs } from "firebase/firestore";

const state = {
  userNameArr: [],
};

const getters = {
  userNameArr: (state) => state.userNameArr,
};

const mutations = {
  updatedUserNameArr(state, value) {
    state.userNameArr = value;
  },
};

const actions = {
  async createUserNameArr(context) {
    const userNameArr = [];
    const q = collection(getFirestore(), "users");
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      userNameArr.push(doc.data().user_name);
    });
    context.commit("updatedUserNameArr", userNameArr);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
