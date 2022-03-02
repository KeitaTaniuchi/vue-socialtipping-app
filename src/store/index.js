import Vue from "vue";
import Vuex from "vuex";
import RegisterUser from "./modules/register-user";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: { RegisterUser },
});
