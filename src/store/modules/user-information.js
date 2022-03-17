"use strict";

import { getFirestore, collection, getDocs, doc, updateDoc, increment } from "firebase/firestore";

const state = {
  userInformationArr: [],
  currentUserInformationObj: "",
  selectUserInformationObj: "",
  sendOpponentUserId: "",
};

const getters = {
  userInformationArr: (state) => state.userInformationArr,
  currentUserInformationObj: (state) => state.currentUserInformationObj,
  selectUserInformationObj: (state) => state.selectUserInformationObj,
  sendOpponentUserId: (state) => state.sendOpponentUserId,
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
  updateSendOpponentUserId(state, value) {
    state.sendOpponentUserId = value;
  },
};

const actions = {
  async createUserInformationArr(context, currentUserName) {
    const q = collection(getFirestore(), "users");
    const querySnapshot = await getDocs(q);
    const userInformationArr = querySnapshot.docs.map((doc) => {
      return { id: doc.id, user_name: doc.data().user_name, point: doc.data().point };
    });
    context.commit("updatedUserInformationArr", userInformationArr);
    context.commit("updatedCurrentUserInformationObj", { userInformationArr: userInformationArr, currentUserName: currentUserName });
  },
  async updatePoint(context, { id, sendPointQuantity }) {
    const ref = doc(getFirestore(), "users", id);
    await updateDoc(ref, {
      point: increment(sendPointQuantity),
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
