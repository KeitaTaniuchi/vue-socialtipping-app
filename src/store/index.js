import Vue from "vue";
import Vuex from "vuex";
import RegisterUser from "./modules/register-user";
import PasswordRegexpDecision from "./modules/password-regexp-decision";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: { RegisterUser, PasswordRegexpDecision },
});
