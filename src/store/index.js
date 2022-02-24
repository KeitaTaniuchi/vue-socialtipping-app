import Vue from "vue";
import Vuex from "vuex";
import RegisterUser from "./modules/register-user";
import PasswordRegexp from "./modules/password-regexp";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: { RegisterUser, PasswordRegexp },
});
