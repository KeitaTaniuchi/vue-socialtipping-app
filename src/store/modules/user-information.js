"use strict";

import { getFirestore, collection, getDocs, doc, runTransaction } from "firebase/firestore";

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
  async sendPoint(context, { currentUserId, sendOpponentUserId, sendPointQuantity }) {
    const currentUserRef = doc(getFirestore(), "users", currentUserId);
    const sendOpponentUserRef = doc(getFirestore(), "users", sendOpponentUserId);
    try {
      await runTransaction(getFirestore(), async (transaction) => {
        const currentUserDoc = await transaction.get(currentUserRef);
        const sendOpponentUserDoc = await transaction.get(sendOpponentUserRef);
        const newCurrentUserPoint = currentUserDoc.data().point - sendPointQuantity;
        const newSendOpponentUserPoint = sendOpponentUserDoc.data().point + Number(sendPointQuantity);
        transaction.update(currentUserRef, { point: newCurrentUserPoint });
        transaction.update(sendOpponentUserRef, { point: newSendOpponentUserPoint });
      });
    } catch (error) {
      console.error(error);
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
