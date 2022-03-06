"use strict";

import { getAuth, signOut } from "firebase/auth";
import router from "@/router";

const state = {};

const getters = {};

const mutations = {};

const actions = {
  logout() {
    signOut(getAuth())
      .then(() => {
        router.push({ path: "/" });
      })
      .catch((error) => {
        console.log(error);
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
