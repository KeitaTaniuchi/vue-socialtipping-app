import Vue from "vue";
import Vuex from "vuex";
import Login from "./modules/login";
import Logout from "./modules/logout";
import RegisterUser from "./modules/register-user";
import UserInformation from "./modules/user-information";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: { Login, Logout, RegisterUser, UserInformation },
});
