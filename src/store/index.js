import Vue from "vue";
import Vuex from "vuex";
import Login from "./modules/login";
import RegisterUser from "./modules/register-user";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: { Login, RegisterUser },
});
